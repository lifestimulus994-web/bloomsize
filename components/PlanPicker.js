"use client";
import { useEffect } from "react";
import { Check, Close, Arrow, Leaf, Sprout, Crown } from "./Icons";
import { PLANS } from "../lib/data";

const IC = { start: Leaf, plus: Sprout, pro: Crown };

export default function PlanPicker({ onClose, onPick }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [onClose]);

  return (
    <div className="ov" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="picker" role="dialog" aria-modal="true" data-lenis-prevent aria-label="აირჩიე პაკეტი">
        <button className="m-close" aria-label="დახურვა" onClick={onClose}><Close /></button>
        <div className="picker-head">
          <h3>აირჩიე შენი პაკეტი</h3>
          <p>პირველი თვე ნახევარ ფასად. გააუქმე ნებისმიერ დროს.</p>
        </div>
        <div className="picker-grid">
          {PLANS.map((p) => {
            const Ic = IC[p.id];
            return (
              <div key={p.id} className={`plan pk${p.popular ? " pop" : ""}`}>
                {p.popular && <span className="badge"><Crown /> ყველაზე პოპულარული</span>}
                <div className="plan-top">
                  <span className="badge-ic"><Ic /></span>
                  <div>
                    <h3 className="plan-name num">{p.name}</h3>
                    <p className="plan-for">{p.tag}</p>
                  </div>
                </div>
                <div className="plan-price"><span className="num">{p.first}₾</span><small>პირველი თვე</small></div>
                <p className="plan-first">შემდეგ {p.price}₾ / თვეში</p>
                <ul className="ticks">{p.short.map((f) => (<li key={f}><Check /> {f}</li>))}</ul>
                <button className={`btn ${p.popular ? "btn-forest" : "btn-ghost"}`} onClick={() => onPick(p.id)}>აირჩიე {p.name} <Arrow /></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
