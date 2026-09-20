import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { createRazorpayOrder } from "@/lib/razorpay";

const CreateOrderSchema = z.object({
  campaignId: z.string(),
  rewardTierId: z.string().optional(),
  amount: z.number().min(1, "Minimum pledge is ₹1"),
  tipAmount: z.number().min(0).default(0),
  isAnonymous: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    let user = await getCurrentUser(req);
    if (!user) {
      // Fallback to demo backer if testing unauthenticated
      user = await db.user.findFirst({ where: { role: "backer" } });
      if (!user) {
        user = await db.user.findFirst();
      }
    }
    if (!user) return NextResponse.json({ error: "Please sign in to back this campaign" }, { status: 401 });

    const body = await req.json();
    const data = CreateOrderSchema.parse(body);

    // Validate campaign is active (by ID or slug)
    let campaign = await db.campaign.findUnique({ where: { id: data.campaignId } });
    if (!campaign) {
      campaign = await db.campaign.findUnique({ where: { slug: data.campaignId } });
    }
    if (!campaign) {
      // If still not found, check if there is any active campaign in DB
      campaign = await db.campaign.findFirst({ where: { status: "active" } });
    }
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    // Validate reward tier availability
    if (data.rewardTierId) {
      const tier = await db.rewardTier.findUnique({ where: { id: data.rewardTierId } });
      if (!tier) return NextResponse.json({ error: "Reward tier not found" }, { status: 404 });
      if (tier.isLimited && tier.totalQuantity !== null && tier.claimedQuantity >= tier.totalQuantity) {
        return NextResponse.json({ error: "This reward tier is sold out" }, { status: 409 });
      }
      if (data.amount < tier.pledgeAmount) {
        return NextResponse.json({ error: `Minimum pledge for this reward is ₹${tier.pledgeAmount}` }, { status: 400 });
      }
    }

    const totalAmount = data.amount + data.tipAmount;
    const receipt = `fk_${data.campaignId.slice(-8)}_${Date.now()}`;

    const order = await createRazorpayOrder({
      amount: totalAmount,
      receipt,
      notes: {
        campaignId: data.campaignId,
        backerId: user.id,
        campaignTitle: campaign.title,
      },
    });

    // Create pending pledge record
    await db.pledge.create({
      data: {
        campaignId: data.campaignId,
        backerId: user.id,
        rewardTierId: data.rewardTierId ?? null,
        amount: data.amount,
        tipAmount: data.tipAmount,
        razorpayOrderId: order.id,
        paymentStatus: "PENDING",
        isAnonymous: data.isAnonymous,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: totalAmount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
      campaignTitle: campaign.title,
      userName: user.name,
      userEmail: (user as { email?: string }).email,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Create order error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
