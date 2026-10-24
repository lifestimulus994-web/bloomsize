"use client";
import Reveal from "./Reveal";
import { Arrow, Dumbbell, Leaf, Heart } from "./Icons";
import { useApp } from "./Providers";

const WK = [
  [Dumbbell, "სახლის კარდიო", "დაწვი იმდენი კალორია, რამდენსაც დარბაზში, აპარატების გარეშე"],
  [Leaf, "ერთი თვის მარაგი", "როგორ მოამზადო საჭმელი წინასწარ და ყოველდღე აღარ იწვალო"],
  [Heart, "ბევრი მუშაობა და ღამის ცვლა", "როგორ დაალაგო კვება, რომ ფორმა დაიკლო ან შეინარჩუნო"],
];

export default function Workouts() {
  const { openCheckout } = useApp();
  return (
    <section className="section plate flip wk-sec" id="workouts">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">Plus პაკეტში</p>
          <h2>ვიდეოები, რომლებიც ყოველდღიურობას გიმარტივებს</h2>
          <p className="lead">კვების გეგმას თან მოჰყვება პრაქტიკული ვიდეოები ცხოვრების რეალური სიტუაციებისთვის.</p>
        </Reveal>
        <div className="wk-grid">
          {WK.map(([Ic, t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="wk">
              <span className="badge-ic"><Ic /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
              <span className="soon">Plus</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="wk-cta">
          <button className="btn btn-forest" onClick={() => openCheckout("plus")}>დაიწყე Plus <Arrow /></button>
        </Reveal>
      </div>
    </section>
  );
}
