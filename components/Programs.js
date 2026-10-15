"use client";
import Reveal from "./Reveal";
import { Arrow, Leaf, Video, User } from "./Icons";

const ITEMS = [
  ["/img/p-diet.jpg", "დიეტები", "Start", "ექსპერტის შედგენილი მენიუები წონის კლებისთვის, მასისთვის და ბალანსისთვის. კალორიები და მაკროები უკვე დათვლილია.", Leaf, ""],
  ["/img/p-video.jpg", "ვიდეოები და რჩევები", "Plus", "მოკლე სამოტივაციო ვიდეოები, სამზარეულო ხრიკები და რჩევები, რომლებიც კვებას ჩვევად აქცევს.", Video, "t"],
  ["/img/p-pro.jpg", "პერსონალური გეგმა", "Pro", "კვება შენი მიზნების, გრაფიკისა და გემოვნების მიხედვით, პირადი ჩატით ნუტრიციოლოგთან.", User, ""],
];

export default function Programs() {
  return (
    <section className="section" id="programs">
      <div className="wrap">
        <Reveal className="sec-top">
          <div>
            <p className="eyebrow">პროგრამები</p>
            <h2>პროგრამები, შექმნილი შენთვის</h2>
          </div>
          <a href="#plans" className="link-arrow">ყველა პროგრამა <Arrow /></a>
        </Reveal>
        <div className="cards3">
          {ITEMS.map(([img, t, tag, d, Ic, cls], i) => (
            <Reveal key={t} delay={i * 0.1} className="pcard">
              <div className="pcard-img">
                <div className="pi-clip"><img src={img} alt="" loading="lazy" /></div>
                <span className={`badge-ic ${cls}`}><Ic /></span>
              </div>
              <div className="pcard-body">
                <span className="tag num">{tag}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <a href="#plans" className="link-arrow">გაიგე მეტი <Arrow /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
