import { PLANS, PROGRAMS } from "../../../lib/data";
import { createCheckout } from "../../../lib/flitt";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/$/, "");
const LIVE = !!process.env.FLITT_MERCHANT_ID && !!process.env.FLITT_SECRET_KEY;

// The checkout modal asks once whether a real gateway is configured.
export async function GET() {
  return Response.json({ live: LIVE });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const plan = PLANS.find((p) => p.id === body.planId);
  if (!plan) return Response.json({ error: "unknown_plan" }, { status: 400 });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: "bad_email" }, { status: 400 });

  const prog = plan.id === "food" ? PROGRAMS.find((p) => p.id === body.programId) : null;
  if (plan.id === "food" && !prog) return Response.json({ error: "bad_program" }, { status: 400 });

  // No gateway keys → the site keeps its demo checkout.
  if (!LIVE) return Response.json({ demo: true });

  const orderId = `bz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    const { url } = await createCheckout({
      merchantId: process.env.FLITT_MERCHANT_ID,
      secret: process.env.FLITT_SECRET_KEY,
      orderId,
      // tetri: Flitt takes the amount as an integer in the currency's minor unit
      amount: Math.round(plan.first * 100),
      currency: "GEL",
      desc: `Bloomsize — ${plan.name}${prog ? ` / ${prog.name}` : ""}`,
      email,
      siteUrl: SITE,
      merchantData: { orderId, planId: plan.id, programId: prog?.id || null },
    });
    return Response.json({ url });
  } catch (e) {
    console.error("[flitt] checkout failed:", e.message);
    return Response.json({ error: "gateway_unavailable" }, { status: 502 });
  }
}
