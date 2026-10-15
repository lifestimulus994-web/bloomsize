"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Arrow, Check, Star } from "./Icons";
import { useApp } from "./Providers";

const up = (d) => ({ initial: { opacity: 0, y: 36 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] } });

export default function Hero() {
  const reduce = useReducedMotion();
  const { openCheckout } = useApp();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 120]);
  const float = (d) => (reduce ? {} : { animate: { y: [0, -9, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: d } });

  return (
    <section className="hero" id="top">
      <motion.div className="hero-img" style={{ y }}>
        <motion.div style={{ width: "100%", height: "100%", position: "relative" }} initial={{ scale: reduce ? 1 : 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}>
          <Image src="/img/hero.jpg" alt="გოგონა ახალი პომიდვრით ოქროსფერ მინდორზე" fill priority sizes="100vw" quality={75} />
        </motion.div>
      </motion.div>

      <div className="wrap hero-in">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...up(0.05)}>ჯანსაღი სხეული. მშვიდი გონება.</motion.p>
          <motion.h1 {...up(0.15)}>
            <span>იკვებე ჭკვიანურად.</span>
            <span className="acc">იცოცხლე უკეთ.</span>
          </motion.h1>
          <motion.p className="lead" {...up(0.28)}>
            დიეტები, სამოტივაციო ვიდეოები და პერსონალური კვების გეგმა ერთ სივრცეში. აირჩიე პროგრამა და დაიწყე დღესვე.
          </motion.p>
          <motion.div className="hero-ctas" {...up(0.4)}>
            <button className="btn btn-olive" onClick={() => openCheckout("plus")}>დაიწყე ახლავე <Arrow /></button>
            <a href="#plans" className="btn btn-line">ფასები</a>
          </motion.div>
          <motion.p className="price-line" {...up(0.5)}>
            <span><b className="num">15₾</b> პირველი თვე, შემდეგ <b className="num">30₾</b>-დან</span>
            <span>30 დღეში თანხის დაბრუნება</span>
          </motion.p>
          <motion.div className="trust" {...up(0.6)}>
            <div className="avs"><img src="/img/t1.jpg" alt="" /><img src="/img/t2.jpg" alt="" /><img src="/img/t3.jpg" alt="" /></div>
            <div>
              <div className="stars" aria-label="5 ვარსკვლავი">{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</div>
              <small><b className="num">4.9/5</b> · 1 000+ კმაყოფილი მომხმარებელი</small>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="hchip" style={{ right: "6%", top: "56%" }} {...float(0)}>
        <img src="/img/f-salmon.jpg" alt="" />
        <div><small>ლანჩი · 13:30</small><b>ორაგულის ბოული</b><em>610 კკალ · 38g ცილა</em></div>
        <span className="ok"><Check /></span>
      </motion.div>
      <motion.div className="hchip" style={{ right: "26%", top: "26%" }} {...float(1.5)}>
        <div><small>ამ კვირის შედეგი</small><b className="num" style={{ fontSize: 22 }}>−1.8 კგ</b></div>
      </motion.div>
    </section>
  );
}
