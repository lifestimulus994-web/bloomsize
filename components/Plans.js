"use client";
import Reveal from "./Reveal";
import { Check, Shield, Lock, Arrow, Leaf, Sprout, Crown } from "./Icons";
import { PLANS } from "../lib/data";
import { useApp } from "./Providers";

const IC = { start: Leaf, plus: Sprout, pro: Crown };

export default function Plans() {
  const { openCheckout } = useApp();
  return (
    <section className="section plate flip" id="plans">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">შენი გზა, შენი გეგმა</p>
          <h2>აირჩიე შენი პროგრამა</h2>
          <p className="lead">ერთი და იგივე გამოცდილი მიდგომა, სამი გზა შენი საჭიროებისთვის. პირველი თვე ნახევარ ფასად.</p>
        </Reveal>
        <div className="plans">
          {PLANS.map((p, i) => {
            const Ic = IC[p.id];
            return (
              <Reveal key={p.id} delay={i * 0.1} className={`plan${p.popular ? " pop" : ""}`}>
                {p.popular && <span className="badge"><Crown /> ყველაზე პოპულარული</span>}
                <div className="plan-top">
                  <span className="badge-ic"><Ic /></span>
                  <div>
                    <h3 className="plan-name num">{p.name}</h3>
                    <p className="plan-for">{p.tag}</p>
                  </div>
                </div>
                <div className="plan-price"><span className="num">{p.price}₾</span><small>/ თვეში</small></div>
                <p className="plan-first">პირველი თვე: {p.first}₾</p>
                <ul className="ticks">{p.features.map((f) => (<li key={f}><Check /> {f}</li>))}</ul>
                <button className={`btn ${p.popular ? "btn-forest" : "btn-ghost"}`} onClick={() => openCheckout(p.id)}>აირჩიე {p.name} <Arrow /></button>
              </Reveal>
            );
          })}
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
