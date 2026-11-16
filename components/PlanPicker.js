"use client";
import { useEffect, useState } from "react";
import { Close } from "./Icons";
import PlanCard from "./PlanCard";
import usePresence from "./usePresence";
import { PLANS } from "../lib/data";

export default function PlanPicker({ open, onClose, onPick }) {
  const { mounted, shown } = usePresence(open);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (!open) { setPicked(null); return; }
    const k = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open, onClose]);

  // Press → the card settles, then the chooser fades into the next step.
  const pick = (id) => {
    if (picked) return;
    setPicked(id);
    setTimeout(() => { setPicked(null); onPick(id); }, 170);
  };

  if (!mounted) return null;
  return (
    <div className={`ov${shown ? " on" : ""}`} data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="picker" role="dialog" aria-modal="true" data-lenis-prevent aria-label="აირჩიე პაკეტი">
        <button className="m-close" aria-label="დახურვა" onClick={onClose}><Close /></button>
        <div className="picker-head">
          <h3>აირჩიე შენი პაკეტი</h3>
          <p>პირველი თვე ნახევარ ფასად. გააუქმე ნებისმიერ დროს.</p>
        </div>
        <div className="picker-grid">
          {PLANS.map((p) => (
            <div key={p.id} className={`plan pk${p.popular ? " pop" : ""}${picked === p.id ? " picked" : ""}`}>
              <PlanCard plan={p} onSelect={pick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
