"use client";
import { createContext, useContext, useState, useCallback } from "react";
import Checkout from "./Checkout";
import PlanPicker from "./PlanPicker";
import ProgramPicker from "./ProgramPicker";
import { Check } from "./Icons";

const Ctx = createContext({ openCheckout() {}, openPlans() {}, choosePlan() {}, toast() {} });
export const useApp = () => useContext(Ctx);

export default function Providers({ children }) {
  const [plan, setPlan] = useState(null);
  const [program, setProgram] = useState(null);
  const [picking, setPicking] = useState(false);
  const [progPicking, setProgPicking] = useState(false);
  const [msg, setMsg] = useState("");

  const toast = useCallback((m) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 4200);
  }, []);
  const close = useCallback(() => setPlan(null), []);
  const closePicker = useCallback(() => setPicking(false), []);
  const closePrograms = useCallback(() => setProgPicking(false), []);

  // The food plan holds one of three programs — picking it opens the program
  // chooser first, everything else goes straight to checkout.
  const choosePlan = useCallback((id) => {
    setPicking(false);
    if (id === "food") setProgPicking(true);
    else setPlan(id);
  }, []);

  const payProgram = useCallback((programId) => {
    setProgPicking(false);
    setProgram(programId);
    setPlan("food");
  }, []);

  const openCheckout = useCallback((id) => {
    setPicking(false); setProgPicking(false);
    // let the chooser fade out first, then slide checkout in
    if (id) setTimeout(() => setPlan(id), 160);
  }, []);

  return (
    <Ctx.Provider value={{ openCheckout, openPlans: () => setPicking(true), choosePlan, toast }}>
      {children}
      <PlanPicker open={picking} onClose={closePicker} onPick={choosePlan} />
      <ProgramPicker open={progPicking} onClose={closePrograms} onPay={payProgram} />
      <Checkout open={!!plan} planId={plan} programId={plan === "food" ? program : null} onClose={close} onDone={toast} />
      {msg && <div className="toast" role="status" aria-live="polite"><Check /> {msg}</div>}
    </Ctx.Provider>
  );
}
