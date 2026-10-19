"use client";
import { motion } from "framer-motion";
import { Arrow, Check, Leaf, Heart, Sprout } from "./Icons";
import { useApp } from "./Providers";

const up = (d) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] } });

export default function Hero() {
  const { openCheckout } = useApp();

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />

      <div className="wrap hero-in">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...up(0.05)}>უფრო ჯანსაღი, უფრო ბედნიერი შენ</motion.p>
          <motion.h1 {...up(0.15)}>
            რეალური ცვლილება <span>აქ იზრდება</span>
          </motion.h1>
          <motion.p className="lead" {...up(0.28)}>
            მდგრადი წონის კლება, უკეთესი კვება და ჯანსაღი ცხოვრების წესი. შექმნილია იმისთვის, რომ შენი საუკეთესო ვერსია გაიფურჩქნოს.
          </motion.p>
          <motion.div className="hero-ctas" {...up(0.4)}>
            <button className="btn btn-forest" onClick={() => openCheckout("plus")}>დაიწყე გზა <Arrow /></button>
            <a href="#programs" className="btn btn-ghost">გაიგე მეტი</a>
          </motion.div>
          <motion.ul className="hero-points" {...up(0.52)}>
            <li><i><Leaf /></i><span>მეცნიერულად დასაბუთებული კვება</span></li>
            <li><i><Heart /></i><span>მდგრადი შედეგები</span></li>
            <li><i><Sprout /></i><span>უფრო ჯანსაღი, ბედნიერი შენ</span></li>
          </motion.ul>
        </div>

        <div className="hero-cards">
          <motion.div className="hcard hc-ring" {...up(0.55)}>
            <div className="hc-in">
              <div className="ring" role="img" aria-label="72 პროცენტი">
                <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" className="r-bg" /><circle cx="50" cy="50" r="42" className="r-fg" pathLength="100" strokeDasharray="72 100" /></svg>
                <b className="num">72%</b>
              </div>
              <div>
                <h3>თავს მსუბუქად იგრძნობ</h3>
                <ul>
                  <li><span><Check /></span>მეტი ენერგია</li>
                  <li><span><Check /></span>ჯანსაღი ჩვევები</li>
                  <li><span><Check /></span>ხანგრძლივი შედეგი</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div className="hcard hc-prog" {...up(0.7)}>
            <div className="hc-in">
              <span className="hc-leaf"><Leaf /></span>
              <h3>პროგრესი სხვანაირად იგრძნობა</h3>
              <p>პატარა ნაბიჯები.<br />დიდი ცვლილებები.</p>
              <div className="bars" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
