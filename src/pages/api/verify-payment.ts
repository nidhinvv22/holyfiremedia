import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { songs } from '../../data/songs';
import { verifyPaymentSignature } from '../../lib/razorpay';
import { markPurchaseAsPaid, generateDownloadUrl, markEmailSent } from '../../lib/supabase';
import { getPurchaseConfirmationEmail } from '../../lib/email-templates';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      songSlug,
      email,
      name,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !songSlug || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required payment verification fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the Razorpay payment signature
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      console.error('Invalid Razorpay signature for order:', razorpay_order_id);
      return new Response(
        JSON.stringify({ error: 'Payment verification failed. Invalid signature.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Look up song details
    const song = songs.find((s) => s.slug === songSlug);
    if (!song) {
      return new Response(
        JSON.stringify({ error: 'Song not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update purchase record to 'paid'
    await markPurchaseAsPaid({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // Generate a signed download URL (valid for 24 hours)
    let downloadUrl: string;
    try {
      downloadUrl = await generateDownloadUrl(songSlug, 'mp3');
    } catch {
      // If file not yet uploaded to Supabase storage, return a message
      console.error('Download file not found for:', songSlug);
      return new Response(
        JSON.stringify({
          success: true,
          downloadUrl: null,
          message: 'Payment successful! The file will be sent to your email within a few hours.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send confirmation email via Resend
    let emailSent = false;
    try {
      const resendApiKey = import.meta.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const emailContent = getPurchaseConfirmationEmail({
          songTitle: song.title,
          artistName: song.artist,
          paymentId: razorpay_payment_id,
          downloadUrl,
          customerName: name,
        });

        await resend.emails.send({
          from: 'HolyfireMedia <noreply@holyfiremedia.in>',
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        emailSent = true;
        await markEmailSent(razorpay_order_id);
      }
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the entire request if email fails — user still has the download URL
    }

    // Update purchase with email status
    if (emailSent) {
      await markPurchaseAsPaid({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        email_sent: true,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl,
        emailSent,
        message: emailSent
          ? 'Payment successful! Download your track below. A confirmation email has been sent.'
          : 'Payment successful! Download your track below.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(
      JSON.stringify({ error: 'Payment verification failed. Please contact support.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
