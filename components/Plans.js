"use client";
import Reveal from "./Reveal";
import { Check, Shield, Lock } from "./Icons";
import { PLANS } from "../lib/data";
import { useApp } from "./Providers";

export default function Plans() {
  const { openCheckout } = useApp();
  return (
    <section className="section plans-sec" id="plans">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">ფასები</p>
          <h2>აირჩიე შენთვის შესაფერისი</h2>
          <p className="lead">ყველა პროგრამაზე პირველი თვე ნახევარ ფასად. გააუქმე ნებისმიერ დროს.</p>
        </Reveal>
        <div className="plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className={`plan${p.popular ? " pop" : ""}`}>
              {p.popular && <span className="badge">ყველაზე პოპულარული</span>}
              <h3 className="plan-name num">{p.name}</h3>
              <p className="plan-for"><b style={{ fontWeight: 600 }}>{p.tag}.</b> {p.desc}</p>
              <div className="plan-price"><span className="num">{p.price}₾</span><small>/ თვეში</small></div>
              <p className="plan-first">პირველი თვე — {p.first}₾</p>
              <ul className="ticks">{p.features.map((f) => (<li key={f}><Check /> {f}</li>))}</ul>
              <button className={`btn ${p.popular ? "btn-terra" : "btn-olive"}`} onClick={() => openCheckout(p.id)}>აირჩიე {p.name}</button>
            </Reveal>
          ))}
        </div>
        <Reveal className="pay-note">
          <span><Lock /> დაცული გადახდა</span>
          <div className="chips"><span className="chip">ბარათი</span><span className="chip">Apple Pay</span><span className="chip">Google Pay</span></div>
          <span><Shield /> 30 დღეში თანხის დაბრუნება</span>
        </Reveal>
      </div>
    </section>
  );
}
