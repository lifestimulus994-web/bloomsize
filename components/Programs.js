"use client";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

const ITEMS = [
  ["/img/prog-1.png", "დრო არ მაქვს", "მზა პროგრამა მათთვის, ვისაც საჭმლის მომზადება არ სცალია."],
  ["/img/prog-2.png", "სწრაფი შედეგი მინდა", "დიეტა ბუსტი: 3-დან 5 კგ-მდე 10 დღეში."],
  ["/img/prog-3.png", "შეზღუდვები არ მინდა", "დიეტა ბალანსი: ყველა პროდუქტით და მშვიდი ტემპით."],
  ["/img/prog-4.png", "მარტო ვერ ვახერხებ", "ლაივ მხარდაჭერა: პირადი გეგმა, მოტივაცია და პასუხი კითხვებზე."],
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
          {ITEMS.map(([src, t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="vcard">
              <span className="plate-ic"><img src={src} alt="" width="68" height="68" loading="lazy" /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
              <a href="#plans" className="go" aria-label={t}><Arrow /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
