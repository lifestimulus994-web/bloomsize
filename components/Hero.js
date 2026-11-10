"use client";
import { useEffect, useRef } from "react";
import { Arrow, Check, Leaf, Heart, Sprout } from "./Icons";
import { useApp } from "./Providers";

export default function Hero() {
  const { openCheckout } = useApp();
  const blur = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:900px)");
    let tick = false;
    const run = () => {
      tick = false;
      if (blur.current) blur.current.style.opacity = mq.matches ? Math.min(1, Math.max(0, window.scrollY / 380)) : 0;
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(run); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    run();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-blur" ref={blur} aria-hidden="true" />

      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="eyebrow">უფრო ჯანსაღი, უფრო ბედნიერი შენ</p>
          <h1>
            რეალური ცვლილება <span>აქ იზრდება</span>
          </h1>
          <p className="lead">
            მდგრადი წონის კლება, უკეთესი კვება და ჯანსაღი ცხოვრების წესი. შექმნილია იმისთვის, რომ შენი საუკეთესო ვერსია გაიფურჩქნოს.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-forest" onClick={() => openCheckout("plus")}>დაიწყე გზა <Arrow /></button>
            <a href="#programs" className="btn btn-ghost">გაიგე მეტი</a>
          </div>
          <ul className="hero-points">
            <li><i><Leaf /></i><span>მეცნიერულად დასაბუთებული კვება</span></li>
            <li><i><Heart /></i><span>მდგრადი შედეგები</span></li>
            <li><i><Sprout /></i><span>უფრო ჯანსაღი, ბედნიერი შენ</span></li>
          </ul>
        </div>

        <div className="hero-cards">
          <div className="hcard hc-ring">
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
          </div>
          <div className="hcard hc-prog">
            <div className="hc-in">
              <span className="hc-leaf"><Leaf /></span>
              <h3>პროგრესი სხვანაირად იგრძნობა</h3>
              <p>პატარა ნაბიჯები.<br />დიდი ცვლილებები.</p>
              <div className="bars" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
