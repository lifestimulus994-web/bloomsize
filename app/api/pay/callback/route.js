import { verify } from "../../../../lib/flitt";

// Server-to-server notification from Flitt. It is the only place where a
// payment counts as paid — the browser redirect that follows can be faked.
export async function POST(req) {
  const secret = process.env.FLITT_SECRET_KEY;
  if (!secret) return new Response(null, { status: 503 });

  const body = await req.json().catch(() => null);
  if (!body || !verify(secret, body)) {
    console.warn("[flitt] callback with a bad signature rejected");
    return new Response(null, { status: 403 });
  }

  const parse = (s) => { try { return JSON.parse(s); } catch { return null; } };
  const meta = parse(body.merchant_data) || {};

  if (body.order_status === "approved") {
    // TODO: unlock the program for meta.planId / meta.programId and email the
    // starter material to body.sender_email. Needs the Supabase service role key.
    console.log("[flitt] paid", JSON.stringify({
      order: body.order_id,
      payment: body.payment_id,
      amount: body.amount,
      currency: body.currency,
      email: body.sender_email,
      plan: meta.planId,
      program: meta.programId,
      rectoken: body.rectoken || null,
      test: body.additional_info?.includes('"is_test": true') ?? false,
    }));
  } else {
    console.log("[flitt] order", body.order_id, "status", body.order_status);
  }

  // Only a 200 stops Flitt from retrying.
  return new Response(null, { status: 200 });
}
