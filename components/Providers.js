"use client";
import { createContext, useContext, useState, useCallback } from "react";
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
