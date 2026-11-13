"use client";
import Reveal from "./Reveal";
import { Shield, Lock } from "./Icons";
import PlanCard from "./PlanCard";
import { PLANS } from "../lib/data";
import { useApp } from "./Providers";

export default function Plans() {
  const { choosePlan } = useApp();
  return (
    <section className="section plate flip" id="plans">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">შენი გზა, შენი გეგმა</p>
          <h2>აირჩიე შენი პროგრამა</h2>
          <p className="lead">კვება, კვება ვიდეოებით ან პირადი მხარდაჭერა: სამი გზა შენი საჭიროებისთვის. პირველი თვე ნახევარ ფასად.</p>
        </Reveal>
        <div className="plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className={`plan${p.popular ? " pop" : ""}`}>
              <PlanCard plan={p} onSelect={choosePlan} />
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
