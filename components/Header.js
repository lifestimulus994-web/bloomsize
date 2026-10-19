"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Close, Arrow } from "./Icons";
import { useApp } from "./Providers";

const LINKS = [
  ["#top", "მთავარი"],
  ["#programs", "პროგრამები"],
  ["#how", "როგორ მუშაობს"],
  ["#plans", "ფასები"],
  ["#reviews", "ისტორიები"],
  ["#faq", "კითხვები"],
];

export default function Header() {
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const last = useRef(0);
  const tick = useRef(false);
  const { openCheckout } = useApp();

  useEffect(() => {
    const onScroll = () => {
      if (tick.current) return;
      tick.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 240 && y > last.current + 4) setHide(true);
        else if (y < last.current - 4 || y < 240) setHide(false);
        last.current = y;
        tick.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(([h]) => { const el = document.querySelector(h); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`hdr${hide && !open ? " hide" : ""}`}>
        <nav className="nav" aria-label="მთავარი ნავიგაცია">
          <a href="#top" className="logo" aria-label="Bloomsize"><img src="/img/logo.png" alt="Bloomsize" /></a>
          <div className="links">
            {LINKS.map(([h, t]) => (<a key={h} href={h} className={active === h ? "on" : ""}>{t}</a>))}
          </div>
          <button className="btn btn-forest nav-cta" onClick={() => openCheckout("plus")}>დაიწყე <Arrow /></button>
          <button className="burger" aria-label="მენიუს გახსნა" onClick={() => setOpen(true)}><Menu /></button>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mnav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="mnav-top">
              <span className="logo"><img src="/img/logo.png" alt="Bloomsize" /></span>
              <button className="burger" aria-label="დახურვა" style={{ display: "inline-flex" }} onClick={() => setOpen(false)}><Close /></button>
            </div>
            <div className="mnav-links">
              {LINKS.map(([h, t]) => (<a key={h} href={h} className="m-link" onClick={() => setOpen(false)}>{t}</a>))}
            </div>
            <button className="btn btn-forest" onClick={() => { setOpen(false); openCheckout("plus"); }}>დაიწყე გზა <Arrow /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
