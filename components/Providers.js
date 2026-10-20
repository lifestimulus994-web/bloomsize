"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import { Check } from "./Icons";

const Ctx = createContext({ openCheckout() {}, toast() {} });
export const useApp = () => useContext(Ctx);

export default function Providers({ children }) {
  const [plan, setPlan] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = useCallback((m) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 4200);
  }, []);
  const close = useCallback(() => setPlan(null), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = a.getAttribute("href") === "#top" ? 0 : document.querySelector(a.getAttribute("href"));
      if (el === null) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: el === 0 ? 0 : -96, duration: 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("click", onClick); lenis.destroy(); };
  }, []);

  return (
    <Ctx.Provider value={{ openCheckout: (id) => setPlan(id), toast }}>
      {children}
      <AnimatePresence>{plan && <Checkout key="co" planId={plan} onClose={close} onDone={toast} />}</AnimatePresence>
      <AnimatePresence>
        {msg && (
          <motion.div className="toast" role="status" aria-live="polite" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.3 }}>
            <Check /> {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
