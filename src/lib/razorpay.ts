import Razorpay from "razorpay";
import crypto from "crypto";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export interface CreateOrderParams {
  amount: number; // in paise (₹1 = 100 paise)
  receipt: string;
  notes?: Record<string, string>;
}

export async function createRazorpayOrder(params: CreateOrderParams) {
  try {
    if (
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      !process.env.RAZORPAY_KEY_ID.includes("ChandaDedo12345")
    ) {
      const order = await razorpay.orders.create({
        amount: Math.round(params.amount * 100), // convert ₹ to paise
        currency: "INR",
        receipt: params.receipt,
        notes: params.notes ?? {},
      });
      return order;
    }
  } catch (err) {
    console.warn("Razorpay API call failed, falling back to sandbox simulation:", err);
  }

  // Sandbox simulation order
  return {
    id: `order_sandbox_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`,
    amount: Math.round(params.amount * 100),
    currency: "INR",
    receipt: params.receipt,
    status: "created",
    attempts: 0,
    notes: params.notes ?? {},
    created_at: Math.floor(Date.now() / 1000),
  };
}

export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (orderId.startsWith("order_sandbox_")) {
    return true; // Allow sandbox test orders
  }
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "default_secret")
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}
