import crypto from "crypto";

// Flitt (ex-Fondy/Payze) hosted checkout.
// Signature: SHA1 of `secret|values of non-empty params sorted by key`, lowercase hex.
export const FLITT_CHECKOUT_URL = "https://pay.flitt.com/api/checkout/url";

const SKIP = new Set(["signature", "response_signature_string"]);

const flat = (v) => (v === null || v === undefined ? "" : String(v));

export function signParams(secret, params) {
  const values = Object.keys(params)
    .filter((k) => !SKIP.has(k))
    .filter((k) => flat(params[k]) !== "")
    .sort()
    .map((k) => flat(params[k]));
  return crypto.createHash("sha1").update([secret, ...values].join("|"), "utf8").digest("hex");
}

// Constant-time compare so a wrong signature cannot be guessed by timing.
export function verify(secret, params) {
  const given = flat(params?.signature).toLowerCase();
  if (!/^[0-9a-f]{40}$/.test(given)) return false;
  const mine = Buffer.from(signParams(secret, params), "utf8");
  const theirs = Buffer.from(given, "utf8");
  return mine.length === theirs.length && crypto.timingSafeEqual(mine, theirs);
}

export async function createCheckout({
  merchantId,
  secret,
  orderId,
  amount,
  currency = "GEL",
  desc,
  email,
  siteUrl,
  merchantData,
}) {
  const request = {
    version: "1.0.1",
    merchant_id: Number(merchantId),
    order_id: orderId,
    order_desc: desc,
    amount,
    currency,
    lang: "ka",
    sender_email: email,
    response_url: `${siteUrl}/api/pay/return`,
    server_callback_url: `${siteUrl}/api/pay/callback`,
    merchant_data: JSON.stringify(merchantData),
    // keep the card token so the next month can be charged server-side
    required_rectoken: "Y",
  };
  request.signature = signParams(secret, request);

  const res = await fetch(FLITT_CHECKOUT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ request }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  const r = json?.response || {};
  if (r.response_status !== "success" || !r.checkout_url) {
    throw new Error(`flitt: ${r.error_code || r.response_code || "unknown"} ${r.error_message || r.response_description || ""}`.trim());
  }
  return { url: r.checkout_url, paymentId: r.payment_id || null };
}
