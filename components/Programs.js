"use client";
import Reveal from "./Reveal";
import { Arrow, Leaf, Dumbbell, Lotus, Heart } from "./Icons";

const ITEMS = [
  [Leaf, "კვება", "მარტივი, გემრიელი და მდგრადი კვების გეგმები."],
  [Dumbbell, "ჯანსაღი ჩვევები", "რუტინები, რომლებიც შენს რეალურ ცხოვრებას ერგება."],
  [Lotus, "ხანგრძლივი შედეგი", "იგრძენი თავი ძლიერად, მსუბუქად და თავდაჯერებულად."],
  [Heart, "ბედნიერი შენ", "მეტი ენერგია იმ წუთებისთვის, რომლებიც მნიშვნელოვანია."],
];

export default function Programs() {
  return (
    <section className="section plate" id="programs">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">ჯანსაღი ცხოვრების ახალი გზა</p>
          <h2>იკვებე. დაბალანსდი. გაიფურჩქნე.</h2>
          <p className="lead">Bloomsize-ში გვჯერა, რომ ხანგრძლივი ცვლილება დაბალანსებული მიდგომიდან მოდის: კვებიდან, გონებიდან და ცხოვრების წესიდან, და არა სწრაფი გამოსწორებებიდან.</p>
        </Reveal>
        <div className="vcards">
          {ITEMS.map(([Ic, t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="vcard">
              <span className="badge-ic"><Ic /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
              <a href="#plans" className="go" aria-label={t}><Arrow /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
