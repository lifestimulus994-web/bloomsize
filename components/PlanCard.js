"use client";
import { Check, Arrow, Leaf, Sprout, Crown } from "./Icons";

const IC = { start: Leaf, plus: Sprout, pro: Crown };

// Shared plan markup. Every editable string carries data-bz-key, so the plans
// section, the picker modal and the checkout summary all read/write the same
// CMS key and stay identical when an admin edits one of them.
export const planKey = (id, field) => `plan:${id}:${field}`;

export default function PlanCard({ plan: p, onSelect }) {
  const Ic = IC[p.id];
  const k = (field) => planKey(p.id, field);
  return (
    <>
      {p.popular && (
        <span className="badge"><Crown /> <span data-bz-key={k("badge")}>ყველაზე პოპულარული</span></span>
      )}
      <div className="plan-top">
        <span className="badge-ic"><Ic /></span>
        <div>
          <h3 className="plan-name num" data-bz-key={k("name")}>{p.name}</h3>
          <p className="plan-for" data-bz-key={k("tag")}>{p.tag}</p>
        </div>
      </div>
      <div className="plan-price">
        <span className="num" data-bz-key={k("price")}>{`${p.price}₾`}</span>
        <small data-bz-key={k("per")}>/ თვეში</small>
      </div>
      <p className="plan-first"><span data-bz-key={k("firstLabel")}>პირველი თვე: </span><span data-bz-key={k("first")}>{`${p.first}₾`}</span></p>
      <ul className="ticks ticks-full">
        {p.features.map((f, i) => (<li key={f}><Check /> <span data-bz-key={k(`f:${i}`)}>{f}</span></li>))}
      </ul>
      <ul className="ticks ticks-short">
        {p.short.map((f, i) => (<li key={f}><Check /> <span data-bz-key={k(`s:${i}`)}>{f}</span></li>))}
      </ul>
      <button aria-label={`${p.name}: ${p.price}₾`} className={`btn ${p.popular ? "btn-forest" : "btn-ghost"}`} onClick={() => onSelect(p.id)}>
        <span data-bz-key={k("cta")}>{p.id === "pro" ? "დაიწყე" : `აირჩიე ${p.name}`}</span> <Arrow />
      </button>
    </>
  );
}
