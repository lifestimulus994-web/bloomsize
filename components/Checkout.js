"use client";
import { useEffect, useState } from "react";
import { Check, Close, Lock } from "./Icons";
import { PLANS, PROGRAMS } from "../lib/data";

const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const fmtExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + " / " + d.slice(2) : d; };

export default function Checkout({ planId, programId, onClose, onDone }) {
  const plan = PLANS.find((p) => p.id === planId) || PLANS[1];
  const prog = PROGRAMS.find((p) => p.id === programId) || null;
  const discounted = plan.first !== plan.price;
  const pk = (field) => `plan:${plan.id}:${field}`;
  const [f, setF] = useState({ email: "", name: "", card: "", exp: "", cvc: "" });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [onClose]);

  const set = (k, fn = (v) => v) => (e) => setF((s) => ({ ...s, [k]: fn(e.target.value) }));

  const finish = () => {
    setBusy(true);
    setTimeout(() => { setBusy(false); setPaid(true); onDone("გადახდა წარმატებით შესრულდა"); }, 1200);
  };

  const submit = (e) => {
    e.preventDefault();
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

  return (
    <div className="ov" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
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
              <button className="btn btn-forest" type="submit" disabled={busy} style={busy ? { opacity: 0.7 } : null}>{busy ? "მუშავდება..." : <>გადაიხადე <span data-bz-key={pk(discounted ? "first" : "price")}>{`${plan.first}₾`}</span></>}</button>
              <p className="secure"><Lock /> დაცული გადახდა · 30 დღეში თანხის დაბრუნება</p>
              <p className="demo-tag">დემო რეჟიმი: რეალური თანხა არ ჩამოიჭრება და ბარათის მონაცემები არ ინახება.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
