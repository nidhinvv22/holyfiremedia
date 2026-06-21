import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { songs } from '../../../data/songs';
import { verifyWebhookSignature } from '../../../lib/razorpay';
import {
  getPurchaseByOrderId,
  markPurchaseAsPaid,
  markPurchaseAsFailed,
  generateDownloadUrl,
  markEmailSent,
} from '../../../lib/supabase';
import { getPurchaseConfirmationEmail } from '../../../lib/email-templates';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Missing webhook signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid webhook signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;
    const payload = event.payload;

    console.log(`Razorpay webhook received: ${eventType}`);

    if (eventType === 'payment.captured') {
      const payment = payload.payment?.entity;
      const orderId = payment?.order_id;

      if (!orderId) {
        console.error('No order_id in webhook payment payload');
        return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
      }

      // Check if purchase already processed
      const purchase = await getPurchaseByOrderId(orderId);
      if (!purchase) {
        console.error('Purchase record not found for order:', orderId);
        return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
      }

      // If already paid and email sent, skip
      if (purchase.status === 'paid' && purchase.email_sent) {
        console.log('Purchase already processed, skipping webhook:', orderId);
        return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
      }

      // Mark as paid via webhook
      await markPurchaseAsPaid({
        razorpay_order_id: orderId,
        razorpay_payment_id: payment.id,
        razorpay_signature: '', // Webhook doesn't have the same signature
        webhook_verified: true,
      });

      // Send email if not already sent
      if (!purchase.email_sent) {
        try {
          const song = songs.find((s) => s.slug === purchase.song_slug);
          if (song) {
            const downloadUrl = await generateDownloadUrl(purchase.song_slug, 'mp3');

            const resendApiKey = import.meta.env.RESEND_API_KEY;
            if (resendApiKey) {
              const resend = new Resend(resendApiKey);
              const emailContent = getPurchaseConfirmationEmail({
                songTitle: song.title,
                artistName: song.artist,
                paymentId: payment.id,
                downloadUrl,
                customerName: purchase.customer_name,
              });

              await resend.emails.send({
                from: 'HolyfireMedia <noreply@holyfiremedia.in>',
                to: purchase.customer_email,
                subject: emailContent.subject,
                html: emailContent.html,
              });

              await markEmailSent(orderId);
              console.log('Webhook: confirmation email sent for order:', orderId);
            }
          }
        } catch (emailError) {
          console.error('Webhook: failed to send email for order:', orderId, emailError);
        }
      }
    } else if (eventType === 'payment.failed') {
      const payment = payload.payment?.entity;
      const orderId = payment?.order_id;

      if (orderId) {
        await markPurchaseAsFailed(orderId);
        console.log('Payment marked as failed for order:', orderId);
      }
    }

    // Always return 200 to Razorpay to prevent retries
    return new Response(
      JSON.stringify({ status: 'ok' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Still return 200 to prevent Razorpay from retrying on unexpected errors
    return new Response(
      JSON.stringify({ status: 'ok' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
