import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { verifyPaymentSignature } from "@/lib/razorpay";

const VerifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  paymentMethod: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = VerifySchema.parse(body);

    // Verify HMAC signature
    const isValid = verifyPaymentSignature({
      orderId: data.razorpayOrderId,
      paymentId: data.razorpayPaymentId,
      signature: data.razorpaySignature,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed. Invalid signature." }, { status: 400 });
    }

    // Find the pending pledge
    const pledge = await db.pledge.findUnique({
      where: { razorpayOrderId: data.razorpayOrderId },
      include: { campaign: true },
    });

    if (!pledge) return NextResponse.json({ error: "Pledge not found" }, { status: 404 });
    if (pledge.backerId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (pledge.paymentStatus === "SUCCESS") {
      return NextResponse.json({ success: true, message: "Already verified" });
    }

    // Atomic transaction: update pledge + campaign stats
    await db.$transaction([
      db.pledge.update({
        where: { razorpayOrderId: data.razorpayOrderId },
        data: {
          paymentStatus: "SUCCESS",
          razorpayPaymentId: data.razorpayPaymentId,
          paymentMethod: data.paymentMethod,
        },
      }),
      db.campaign.update({
        where: { id: pledge.campaignId },
        data: {
          raisedAmount: { increment: pledge.amount + pledge.tipAmount },
          backerCount: { increment: 1 },
        },
      }),
      ...(pledge.rewardTierId
        ? [
            db.rewardTier.update({
              where: { id: pledge.rewardTierId },
              data: { claimedQuantity: { increment: 1 } },
            }),
          ]
        : []),
    ]);

    // Check if campaign is now fully funded
    const updated = await db.campaign.findUnique({ where: { id: pledge.campaignId } });
    if (updated && updated.raisedAmount >= updated.goalAmount && updated.status === "active") {
      await db.campaign.update({
        where: { id: pledge.campaignId },
        data: { status: "funded" },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified! Thank you for backing this campaign.",
      campaignSlug: pledge.campaign.slug,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Payment verify error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
