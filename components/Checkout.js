"use client";
import { useEffect, useState } from "react";
import { Check, Close, Lock } from "./Icons";
import usePresence from "./usePresence";
import { PLANS, PROGRAMS } from "../lib/data";

const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const fmtExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + " / " + d.slice(2) : d; };
const BLANK = { email: "", name: "", card: "", exp: "", cvc: "" };

export default function Checkout({ open, planId, programId, onClose, onDone }) {
  const { mounted, shown } = usePresence(open, 380);
  // Keep the last real choice on screen while the modal fades out.
  const [lastId, setLastId] = useState(planId || "food");
  const [lastProg, setLastProg] = useState(programId);
  useEffect(() => { if (planId) setLastId(planId); }, [planId]);
  useEffect(() => { setLastProg(programId); }, [programId]);

  const plan = PLANS.find((p) => p.id === (planId || lastId)) || PLANS[0];
  const prog = PROGRAMS.find((p) => p.id === (programId || lastProg)) || null;
  const discounted = plan.first !== plan.price;
  const pk = (field) => `plan:${plan.id}:${field}`;
  const [f, setF] = useState(BLANK);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(false);
  const [live, setLive] = useState(null);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (!open) return;
    setF(BLANK); setErr({}); setBusy(false); setPaid(false); setAgree(false);
    const k = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    let on = true;
    fetch("/api/pay")
      .then((r) => r.json())
      .then((j) => on && setLive(j.live === true))
      .catch(() => on && setLive(false));
    return () => { on = false; document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open, onClose]);

  const set = (k, fn = (v) => v) => (e) => setF((s) => ({ ...s, [k]: fn(e.target.value) }));

  const finish = () => {
    setBusy(true);
    setTimeout(() => { setBusy(false); setPaid(true); onDone("გადახდა წარმატებით შესრულდა"); }, 1200);
  };

  // Real gateway: we only pass the choice and the email, Flitt's own page
  // collects the card. Without keys the demo flow below stays in place.
  const goLive = async () => {
    setBusy(true);
    try {
      const r = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, programId: plan.id === "food" ? prog?.id || null : null, email: f.email }),
      });
      const j = await r.json();
      if (j.url) { window.location.href = j.url; return; }
      if (j.demo) { finish(); return; }
      setErr({ form: "გადახდის სისტემა დროებით მიუწვდომელია. სცადე ცოტა ხანში." });
    } catch {
      setErr({ form: "კავშირი ვერ დამყარდა. გადაამოწმე ინტერნეტი და სცადე თავიდან." });
    }
    setBusy(false);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!agree) { setErr({ agree: "გამოწერის გასაფორმებლად საჭიროა წესების მიღება" }); return; }
    if (live) {
      if (!/^\S+@\S+\.\S+$/.test(f.email)) { setErr({ email: "შეიყვანე სწორი ელფოსტა" }); return; }
      setErr({});
      goLive();
      return;
    }
    const x = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "შეიყვანე სწორი ელფოსტა";
    if (f.name.trim().length < 3) x.name = "შეიყვანე სახელი ბარათზე";
    if (f.card.replace(/\s/g, "").length < 16) x.card = "ბარათის ნომერი 16 ციფრია";
    if (!/^\d{2} \/ \d{2}$/.test(f.exp)) x.exp = "თვე / წელი";
    if (f.cvc.length < 3) x.cvc = "3 ციფრი";
    setErr(x);
    if (!Object.keys(x).length) finish();
  };

  const field = (k, label, props = {}) => (
    <div className="fld">
      <label htmlFor={"c-" + k}>{label}</label>
      <input id={"c-" + k} className={err[k] ? "bad" : ""} value={f[k]} aria-invalid={!!err[k]} {...props} />
      {err[k] && <span className="err" role="alert">{err[k]}</span>}
    </div>
  );

  // Explicitly agreed before the button: Flitt's Annex 2 and Georgian consumer
  // law both require the buyer to see and accept the terms before paying.
  const termsRow = (
    <div className="terms-row">
      <label className="terms-check">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => { setAgree(e.target.checked); if (e.target.checked) setErr((s) => ({ ...s, agree: null })); }}
          aria-invalid={!!err.agree}
        />
        <span className="terms-box" aria-hidden="true"><Check /></span>
        <span>
          ვეთანხმები <a href="/terms" target="_blank" rel="noreferrer">მომსახურების პირობებს</a>,{" "}
          <a href="/privacy" target="_blank" rel="noreferrer">კონფიდენციალურობის პოლიტიკას</a> და{" "}
          <a href="/refund" target="_blank" rel="noreferrer">გაუქმების პირობებს</a>. ვეთანხმები დაუყოვნებლივ მიწოდებას და ვადასტურებ, რომ PDF ფაილის მიღების შემდეგ ხელშეკრულებაზე უარის თქმის უფლებას ვკარგავ.
        </span>
      </label>
      <p className="terms-auto">
        ერთჯერადი გადახდა — თანხა ავტომატურად ხელახლა არ ჩამოგეჭრება. შეკვეთაზე უარის თქმა შესაძლებელია 14 დღის განმავლობაში (გამონაკლისების გარდა), იხ. გაუქმების პირობები.
      </p>
      {err.agree && <span className="err" role="alert">{err.agree}</span>}
    </div>
  );

  if (!mounted) return null;
  return (
    <div className={`ov${shown ? " on" : ""}`} data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" data-lenis-prevent aria-label="გადახდა">
        <button className="m-close" aria-label="დახურვა" onClick={onClose}><Close /></button>
        {paid ? (
          <div className="done">
            <div className="done-ic"><Check /></div>
            <h3>გადახდა წარმატებულია</h3>
            <p className="lead" style={{ margin: "0 auto" }}>პროგრამა {plan.name} გააქტიურებულია. დეტალებს ელფოსტაზე გამოგიგზავნით.</p>
            <button className="btn btn-forest" onClick={onClose}>დახურვა</button>
          </div>
        ) : (
          <>
            <aside className="m-sum on-dark">
              <small>თქვენი არჩევანი</small>
              <h3 className={plan.geo ? "" : "num"} data-bz-key={pk("name")}>{plan.name}</h3>
              {prog && <small className="m-prog">{`არჩეულია „${prog.name}“`}</small>}
              <div className="m-price">
                <span className="num" data-bz-key={pk("price")}>{`${plan.price}₾`}</span>
                <small>{discounted ? "პირველი თვე" : "თვეში"}</small>
              </div>
              {discounted ? (
                <small>შემდეგ <span data-bz-key={pk("priceAfter")}>{`${plan.price}₾`}</span> / თვეში. გააუქმე ნებისმიერ დროს.</small>
              ) : (
                <small>გადახდა ყოველთვიურია. გააუქმე ნებისმიერ დროს.</small>
              )}
              {plan.features.length > 0 && (
                <ul className="ticks">{plan.features.slice(0, 4).map((x, i) => (<li key={x}><Check /> <span data-bz-key={pk(`f:${i}`)}>{x}</span></li>))}</ul>
              )}
            </aside>
            <form className="m-form" onSubmit={submit} noValidate>
              {live ? (
                <>
                  {field("email", "ელფოსტა", { type: "email", inputMode: "email", autoComplete: "email", placeholder: "name@email.com", onChange: set("email") })}
                  {err.form && <p className="err form-err" role="alert">{err.form}</p>}
                  {termsRow}
                  <button className="btn btn-forest" type="submit" disabled={busy} style={busy ? { opacity: 0.7 } : null}>
                    {busy ? "მუშავდება..." : <>გადაიხადე <span data-bz-key={pk(discounted ? "first" : "price")}>{`${plan.first}₾`}</span></>}
                  </button>
                  <p className="secure"><Lock /> გადახდა გაიხსნება Flitt-ის დაცულ გვერდზე — ბარათის მონაცემები ჩვენ არ გვაქვს</p>
                  <p className="demo-tag">ბარათი, Apple Pay და Google Pay ხელმისაწვდომია გადახდის გვერდზე.</p>
                </>
              ) : (
                <>
                  <div className="wallets">
                    <button type="button" className="wallet" onClick={finish} disabled={busy}>Apple Pay</button>
                    <button type="button" className="wallet g" onClick={finish} disabled={busy}>Google Pay</button>
                  </div>
                  <div className="or">ან ბარათით</div>
                  {field("email", "ელფოსტა", { type: "email", inputMode: "email", autoComplete: "email", placeholder: "name@email.com", onChange: set("email") })}
                  {field("name", "სახელი ბარათზე", { autoComplete: "cc-name", placeholder: "NINO MAISURADZE", onChange: set("name") })}
                  {field("card", "ბარათის ნომერი", { inputMode: "numeric", autoComplete: "cc-number", placeholder: "0000 0000 0000 0000", onChange: set("card", fmtCard) })}
                  <div className="row2">
                    {field("exp", "ვადა", { inputMode: "numeric", autoComplete: "cc-exp", placeholder: "MM / YY", onChange: set("exp", fmtExp) })}
                    {field("cvc", "CVC", { inputMode: "numeric", autoComplete: "cc-csc", placeholder: "123", maxLength: 3, onChange: set("cvc", (v) => v.replace(/\D/g, "")) })}
                  </div>
                  {termsRow}
                  <button className="btn btn-forest" type="submit" disabled={busy} style={busy ? { opacity: 0.7 } : null}>{busy ? "მუშავდება..." : <>გადაიხადე <span data-bz-key={pk(discounted ? "first" : "price")}>{`${plan.first}₾`}</span></>}</button>
                  <p className="secure"><Lock /> დაცული გადახდა · 30 დღეში თანხის დაბრუნება</p>
                  <p className="demo-tag">დემო რეჟიმი: რეალური თანხა არ ჩამოიჭრება და ბარათის მონაცემები არ ინახება.</p>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
