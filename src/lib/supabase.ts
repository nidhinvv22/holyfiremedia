import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseSecretKey = import.meta.env.SUPABASE_SECRET_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error('Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY.');
}

// Use the service_role key for server-side operations (bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseSecretKey);

/**
 * Insert a new purchase record when a Razorpay order is created.
 */
export async function createPurchaseRecord(data: {
  razorpay_order_id: string;
  song_slug: string;
  song_title: string;
  amount: number;
  customer_email: string;
  customer_name?: string;
  customer_phone?: string;
}) {
  const { data: record, error } = await supabase
    .from('purchases')
    .insert({
      razorpay_order_id: data.razorpay_order_id,
      song_slug: data.song_slug,
      song_title: data.song_title,
      amount: data.amount,
      customer_email: data.customer_email,
      customer_name: data.customer_name || null,
      customer_phone: data.customer_phone || null,
      status: 'created',
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create purchase record:', error);
    throw error;
  }

  return record;
}

/**
 * Update a purchase record after successful payment verification.
 */
export async function markPurchaseAsPaid(data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  email_sent?: boolean;
  webhook_verified?: boolean;
}) {
  const { data: record, error } = await supabase
    .from('purchases')
    .update({
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_signature: data.razorpay_signature,
      status: 'paid',
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...(data.email_sent !== undefined && { email_sent: data.email_sent }),
      ...(data.webhook_verified !== undefined && { webhook_verified: data.webhook_verified }),
    })
    .eq('razorpay_order_id', data.razorpay_order_id)
    .select()
    .single();

  if (error) {
    console.error('Failed to update purchase record:', error);
    throw error;
  }

  return record;
}

/**
 * Mark a purchase as failed.
 */
export async function markPurchaseAsFailed(razorpay_order_id: string) {
  const { error } = await supabase
    .from('purchases')
    .update({
      status: 'failed',
      updated_at: new Date().toISOString(),
    })
    .eq('razorpay_order_id', razorpay_order_id);

  if (error) {
    console.error('Failed to mark purchase as failed:', error);
  }
}

/**
 * Get a purchase record by Razorpay order ID.
 */
export async function getPurchaseByOrderId(razorpay_order_id: string) {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('razorpay_order_id', razorpay_order_id)
    .single();

  if (error) {
    console.error('Failed to fetch purchase:', error);
    return null;
  }

  return data;
}

/**
 * Generate a signed download URL for a premium karaoke file.
 * The URL is valid for 24 hours.
 */
export async function generateDownloadUrl(songSlug: string, format: string = 'mp3') {
  // Use colon instead of slash since files are in the root bucket
  const filePath = `${songSlug}:premium.${format}`;

  const { data, error } = await supabase
    .storage
    .from('premium-karoke')
    .createSignedUrl(filePath, 60 * 60 * 24, {
      download: `${songSlug}-premium-karaoke.${format}`
    }); // 24 hours

  if (error) {
    console.error('Failed to generate download URL:', error);
    throw error;
  }

  return data.signedUrl;
}

/**
 * Mark that the confirmation email has been sent for a purchase.
 */
export async function markEmailSent(razorpay_order_id: string) {
  const { error } = await supabase
    .from('purchases')
    .update({
      email_sent: true,
      updated_at: new Date().toISOString(),
    })
    .eq('razorpay_order_id', razorpay_order_id);

  if (error) {
    console.error('Failed to mark email as sent:', error);
  }
}
