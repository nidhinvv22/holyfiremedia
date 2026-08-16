import type { APIRoute } from 'astro';
import { songs } from '../../data/songs';
import { createOrder } from '../../lib/razorpay';
import { createPurchaseRecord } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { songSlug, email, name, phone } = body;

    // Validate required fields
    if (!songSlug || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: songSlug, email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Look up song from our data (server-side price = tamper-proof)
    const song = songs.find((s) => s.slug === songSlug);
    if (!song) {
      return new Response(
        JSON.stringify({ error: 'Song not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!song.hasKaraoke || song.hasPremiumVersion === false || song.price <= 0) {
      return new Response(
        JSON.stringify({ error: 'This karaoke track is free and does not require purchase.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Amount in paise (₹600 = 60000 paise)
    const amountInPaise = song.price * 100;

    // Create Razorpay order
    const order = await createOrder(amountInPaise, `karaoke_${songSlug}`, {
      song_slug: songSlug,
      song_title: song.title,
      customer_email: email,
    });

    // Save purchase record in Supabase
    await createPurchaseRecord({
      razorpay_order_id: order.id,
      song_slug: songSlug,
      song_title: song.title,
      amount: amountInPaise,
      customer_email: email,
      customer_name: name,
      customer_phone: phone,
    });

    // Return order details to the client
    return new Response(
      JSON.stringify({
        orderId: order.id,
        amount: amountInPaise,
        currency: 'INR',
        keyId: import.meta.env.PUBLIC_RAZORPAY_KEY_ID,
        songTitle: song.title,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create order. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
