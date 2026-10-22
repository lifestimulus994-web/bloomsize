"use client";
import Reveal from "./Reveal";
import { Arrow, Leaf, Dumbbell, Lotus, Heart } from "./Icons";

const ITEMS = [
  [Leaf, "დრო არ მაქვს", "მზა პროგრამა მათთვის, ვისაც საჭმლის მომზადება არ სცალია."],
  [Dumbbell, "სწრაფი შედეგი მინდა", "დიეტა ბუსტი: 3-დან 5 კგ-მდე 10 დღეში."],
  [Lotus, "შეზღუდვები არ მინდა", "დიეტა ბალანსი: ყველა პროდუქტით და მშვიდი ტემპით."],
  [Heart, "მარტო ვერ ვახერხებ", "ლაივ მხარდაჭერა: პირადი გეგმა, მოტივაცია და პასუხი კითხვებზე."],
];

export default function Programs() {
  return (
    <section className="section plate" id="programs">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">ყველას თავისი გზა აქვს</p>
          <h2>იპოვე ის, რაც შენთვის მუშაობს</h2>
          <p className="lead">Bloomsize-ში ბევრი დიეტაა ნებისმიერი რიტმისა და მიზნისთვის. აირჩიე ის, რომელიც შენს ცხოვრებას ერგება და ნაბიჯ-ნაბიჯ მიაღწიე შედეგს.</p>
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
