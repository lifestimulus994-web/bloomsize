"use client";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { Arrow, Leaf, Fish, Drop, Flame } from "./Icons";

export default function Panels() {
  const reduce = useReducedMotion();
  const bob = (d) => (reduce ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: d } });
  return (
    <section className="section panels-sec on-dark" id="how">
      <div className="wrap">
        <Reveal className="pn-head">
          <div>
            <p className="eyebrow">როგორ მუშაობს</p>
            <h2>ერთად უფრო შორს წახვალ</h2>
          </div>
          <div>
            <p className="lead" style={{ marginBottom: 22 }}>არავითარი გამოცნობა. ყოველ დილას იცი, რა მიირთვა და რატომ არის ეს შენთვის სწორი.</p>
            <a href="#plans" className="btn btn-cream">აირჩიე პროგრამა <Arrow /></a>
          </div>
        </Reveal>

        <div className="panels">
          <Reveal className="panel">
            <h3>დღის გეგმა ერთ ეკრანზე</h3>
            <p>მენიუ, კალორიები და მაკროები. დააჭირე და ნახე რეცეპტი.</p>
            <motion.div className="phone" {...bob(0)}>
              <div className="scr">
                <div className="ps-head"><small>ოთხშაბათი · დღევანდელი გეგმა</small><strong>დილა მშვიდობისა, ნინო</strong></div>
                <div className="rings">
                  <div><b className="num">1640</b><span>კკალ</span></div>
                  <div><b className="num">112g</b><span>ცილა</span></div>
                  <div><b className="num">3</b><span>კვება</span></div>
                </div>
                <div className="meal"><img src="/img/f-breakfast.jpg" alt="" /><div><small>საუზმე · 08:30</small><b>შვრია კენკრით</b><em>420 კკალ</em></div></div>
                <div className="meal"><img src="/img/f-salmon.jpg" alt="" /><div><small>ლანჩი · 13:30</small><b>ორაგულის ბოული</b><em>610 კკალ</em></div></div>
                <div className="meal"><img src="/img/f-plate.jpg" alt="" /><div><small>ვახშამი · 19:00</small><b>თევზი და ლობიო</b><em>520 კკალ</em></div></div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal className="panel" delay={0.1}>
            <h3>ექსპერტების შედგენილი დიეტები</h3>
            <p>12+ მიდგომა სხვადასხვა მიზნისთვის, მრავალფეროვანი და გემრიელი.</p>
            <div className="collage">
              <img className="c-big" src="/img/f-bowl.jpg" alt="" loading="lazy" />
              <img src="/img/f-greens.jpg" alt="" loading="lazy" />
              <img src="/img/f-jar.jpg" alt="" loading="lazy" />
              <img src="/img/f-salmon.jpg" alt="" loading="lazy" />
              <img src="/img/f-salad.jpg" alt="" loading="lazy" />
              <img src="/img/f-hands.jpg" alt="" loading="lazy" />
              <motion.span className="round-ic" style={{ left: "6%", top: "34%" }} {...bob(0.3)}><Leaf /></motion.span>
              <motion.span className="round-ic" style={{ left: "38%", top: "56%" }} {...bob(1)}><Fish /></motion.span>
              <motion.span className="round-ic" style={{ right: "6%", top: "22%" }} {...bob(1.8)}><Drop /></motion.span>
              <motion.span className="round-ic" style={{ right: "12%", bottom: "8%" }} {...bob(2.4)}><Flame /></motion.span>
            </div>
          </Reveal>

          <Reveal className="panel" delay={0.2}>
            <h3>ნუტრიციოლოგი გვერდით გიდგას</h3>
            <p>ყოველკვირეული check-in და პასუხები კითხვებზე.</p>
            <div className="chat">
              <div className="chat-user"><img src="/img/t1.jpg" alt="" /><div><b>თქვენი ნუტრიციოლოგი</b><small>ონლაინ</small></div></div>
              <div className="cm out">ამ კვირას ბევრი ვიმოძრავე, ვახშამზე რას მირჩევთ?<small>20:12</small></div>
              <div className="cm in">დღეს მსუბუქი ცილოვანი ვახშამი. გეგმა უკვე განვაახლე.<small>20:14</small></div>
            </div>
            <div className="chat-photo"><img src="/img/t2.jpg" alt="" loading="lazy" style={{ objectPosition: "50% 30%" }} /></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
