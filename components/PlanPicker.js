"use client";
import { useEffect } from "react";
import { Close } from "./Icons";
import PlanCard from "./PlanCard";
import { PLANS } from "../lib/data";

export default function PlanPicker({ onClose, onPick }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [onClose]);

  return (
    <div className="ov" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="picker" role="dialog" aria-modal="true" data-lenis-prevent aria-label="აირჩიე პაკეტი">
        <button className="m-close" aria-label="დახურვა" onClick={onClose}><Close /></button>
        <div className="picker-head">
          <h3>აირჩიე შენი პაკეტი</h3>
          <p>პირველი თვე ნახევარ ფასად. გააუქმე ნებისმიერ დროს.</p>
        </div>
        <div className="picker-grid">
          {PLANS.map((p) => (
            <div key={p.id} className={`plan pk${p.popular ? " pop" : ""}`}>
              <PlanCard plan={p} onSelect={onPick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
