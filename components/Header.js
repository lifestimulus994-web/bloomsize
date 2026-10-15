"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Close } from "./Icons";
import { useApp } from "./Providers";

const LINKS = [
  ["#how", "როგორ მუშაობს"],
  ["#programs", "პროგრამები"],
  ["#plans", "ფასები"],
  ["#reviews", "შეფასებები"],
  ["#faq", "კითხვები"],
];

export default function Header() {
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const tick = useRef(false);
  const { openCheckout } = useApp();

  useEffect(() => {
    const onScroll = () => {
      if (tick.current) return;
      tick.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 200 && y > last.current + 4) setHide(true);
        else if (y < last.current - 4 || y < 200) setHide(false);
        last.current = y;
        tick.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`hdr${hide && !open ? " hide" : ""}`}>
        <div className="promo">ახალი: პერსონალური კვების გეგმა ნუტრიციოლოგთან · პირველი თვე <b>ნახევარ ფასად</b></div>
        <nav className="nav" aria-label="მთავარი ნავიგაცია">
          <div className="nav-in">
            <a href="#top" className="logo" aria-label="Bloomsize"><img src="/img/logo.png" alt="Bloomsize" /></a>
            <div className="links">
              {LINKS.map(([h, t]) => (<a key={h} href={h}>{t}</a>))}
            </div>
            <button className="btn btn-olive nav-cta" onClick={() => openCheckout("plus")}>დაიწყე ახლავე</button>
            <button className="burger" aria-label="მენიუს გახსნა" onClick={() => setOpen(true)}><Menu /></button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mnav on-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="mnav-top">
              <span className="logo"><img src="/img/logo-light.png" alt="Bloomsize" /></span>
              <button className="burger" aria-label="დახურვა" style={{ display: "inline-flex" }} onClick={() => setOpen(false)}><Close /></button>
            </div>
            <div style={{ marginTop: 24 }}>
              {LINKS.map(([h, t]) => (<a key={h} href={h} className="m-link" onClick={() => setOpen(false)}>{t}</a>))}
            </div>
            <button className="btn btn-terra" onClick={() => { setOpen(false); openCheckout("plus"); }}>დაიწყე ახლავე</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
