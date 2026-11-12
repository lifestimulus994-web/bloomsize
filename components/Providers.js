"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Checkout from "./Checkout";
import PlanPicker from "./PlanPicker";
import { Check } from "./Icons";

const Ctx = createContext({ openCheckout() {}, openPlans() {}, toast() {} });
export const useApp = () => useContext(Ctx);

export default function Providers({ children }) {
  const [plan, setPlan] = useState(null);
  const [picking, setPicking] = useState(false);
  const [msg, setMsg] = useState("");

  const toast = useCallback((m) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 4200);
  }, []);
  const close = useCallback(() => setPlan(null), []);
  const closePicker = useCallback(() => setPicking(false), []);
  const pick = useCallback((id) => { setPicking(false); setPlan(id); }, []);

  return (
    <Ctx.Provider value={{ openCheckout: (id) => setPlan(id), openPlans: () => setPicking(true), toast }}>
      {children}
      {picking && <PlanPicker onClose={closePicker} onPick={pick} />}
      {plan && <Checkout key="co" planId={plan} onClose={close} onDone={toast} />}
      {msg && <div className="toast" role="status" aria-live="polite"><Check /> {msg}</div>}
    </Ctx.Provider>
  );
}
