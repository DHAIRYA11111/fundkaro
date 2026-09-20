import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/razorpay";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (WEBHOOK_SECRET && !verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventType: string = event.event;

    if (eventType === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId: string = payment.order_id;

      const pledge = await db.pledge.findUnique({ where: { razorpayOrderId: orderId } });
      if (pledge && pledge.paymentStatus !== "SUCCESS") {
        await db.$transaction([
          db.pledge.update({
            where: { razorpayOrderId: orderId },
            data: { paymentStatus: "SUCCESS", razorpayPaymentId: payment.id, paymentMethod: payment.method },
          }),
          db.campaign.update({
            where: { id: pledge.campaignId },
            data: {
              raisedAmount: { increment: pledge.amount + pledge.tipAmount },
              backerCount: { increment: 1 },
            },
          }),
        ]);
      }
    }

    if (eventType === "payment.failed") {
      const payment = event.payload.payment.entity;
      const orderId: string = payment.order_id;
      await db.pledge.updateMany({
        where: { razorpayOrderId: orderId, paymentStatus: "PENDING" },
        data: { paymentStatus: "FAILED" },
      });
    }

    if (eventType === "refund.processed") {
      const refund = event.payload.refund.entity;
      await db.pledge.updateMany({
        where: { razorpayPaymentId: refund.payment_id },
        data: { paymentStatus: "REFUNDED" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
