import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = import.meta.env.RAZORPAY_KEY_ID;
const keySecret = import.meta.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error('Missing Razorpay environment variables. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
}

// Razorpay SDK instance
export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

/**
 * Create a Razorpay order.
 * @param amountInPaise - Amount in paise (e.g., 60000 for ₹600)
 * @param receipt - Unique receipt ID (e.g., song slug)
 * @param notes - Additional notes to attach to the order
 */
export async function createOrder(
  amountInPaise: number,
  receipt: string,
  notes: Record<string, string> = {}
) {
  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt,
    notes,
  });

  return order;
}

/**
 * Verify Razorpay payment signature (client-side callback verification).
 * Uses HMAC-SHA256: sign(order_id + "|" + payment_id) with key_secret.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}

/**
 * Verify Razorpay webhook signature.
 * Uses HMAC-SHA256 of the raw request body with the webhook secret.
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const webhookSecret = import.meta.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('RAZORPAY_WEBHOOK_SECRET is not set');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}
