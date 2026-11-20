import { verify } from "../../../../lib/flitt";

const toObj = (entries) => Object.fromEntries(entries);

async function readParams(req) {
  const type = req.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    return (await req.json().catch(() => null)) || {};
  }
  const text = await req.text().catch(() => "");
  return toObj(new URLSearchParams(text));
}

// Flitt sends the payer back here with a POST after checkout. We re-check the
// signature, then hand the browser a plain GET page it can render.
export async function POST(req) {
  const secret = process.env.FLITT_SECRET_KEY;
  const params = await readParams(req);
  const ok = secret ? verify(secret, params) : false;
  const status = ok ? params.order_status || "unknown" : "unverified";
  const order = encodeURIComponent(params.order_id || "");

  return new Response(null, {
    status: 303,
    headers: { Location: `/payment/return?status=${encodeURIComponent(status)}&order=${order}` },
  });
}

// Also allow a GET (some browsers retry a redirect) so the page never 405s.
export async function GET(req) {
  const params = toObj(new URL(req.url).searchParams.entries());
  const secret = process.env.FLITT_SECRET_KEY;
  const ok = secret ? verify(secret, params) : false;
  const status = ok ? params.order_status || "unknown" : "unverified";
  return new Response(null, {
    status: 303,
    headers: { Location: `/payment/return?status=${encodeURIComponent(status)}&order=${encodeURIComponent(params.order_id || "")}` },
  });
}
