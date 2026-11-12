"use client";
import { useEffect, useRef } from "react";
import { Arrow } from "./Icons";
import { useApp } from "./Providers";

export default function Hero() {
  const { openPlans } = useApp();
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
            <button className="btn btn-forest" onClick={openPlans}>დაიწყე გზა <Arrow /></button>
            <a href="#programs" className="btn btn-ghost">გაიგე მეტი</a>
          </div>
        </div>
      </div>
    </section>
  );
}
