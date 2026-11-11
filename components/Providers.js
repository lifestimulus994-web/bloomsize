"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
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
      {plan && <Checkout key="co" planId={plan} onClose={close} onDone={toast} />}
      {msg && <div className="toast" role="status" aria-live="polite"><Check /> {msg}</div>}
    </Ctx.Provider>
  );
}
