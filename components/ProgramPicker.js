"use client";
import { useEffect, useState } from "react";
import { Close, Arrow } from "./Icons";
import { PROGRAMS, PLANS } from "../lib/data";

const PLAN = PLANS[0];
const k = (id, field) => `prog:${id}:${field}`;

export default function ProgramPicker({ onClose, onPay }) {
  const [sel, setSel] = useState(null);
  const chosen = PROGRAMS.find((p) => p.id === sel);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="ov" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="picker prog-picker" role="dialog" aria-modal="true" data-lenis-prevent aria-label="აირჩიე პროგრამა">
        <button className="m-close" aria-label="დახურვა" onClick={onClose}><Close /></button>
        <div className="picker-head">
          <h3 data-bz-key="prog:head">რომელი პროგრამა შეგეფერება?</h3>
          <p data-bz-key="prog:lead">გაეცანი სამივე ვარიანტს და აირჩიე ერთი პროგრამა.</p>
        </div>
        <div className="prog-grid">
          {PROGRAMS.map((pr) => (
            <div key={pr.id} className={`prog${sel === pr.id ? " on" : ""}`}>
              <h4 data-bz-key={k(pr.id, "title")}>{`„${pr.name}“ — ${pr.headline}`}</h4>
              <div className="prog-row">
                <b data-bz-key={`prog:who:label`}>ვისთვისაა</b>
                <p data-bz-key={k(pr.id, "who")}>{pr.who}</p>
              </div>
              <div className="prog-row">
                <b data-bz-key={`prog:why:label`}>რატომ გამოგადგება</b>
                <p data-bz-key={k(pr.id, "why")}>{pr.why}</p>
              </div>
              <button className={`btn ${sel === pr.id ? "btn-forest" : "btn-ghost"}`} onClick={() => setSel(pr.id)}>
                <span data-bz-key={k(pr.id, "cta")}>{`ავირჩიო „${pr.name}“`}</span> <Arrow />
              </button>
            </div>
          ))}
        </div>
        {chosen && (
          <div className="prog-pay" role="status" aria-live="polite">
            <p data-bz-key="prog:chosen">არჩეულია <b>{`„${chosen.name}“`}</b></p>
            <button className="btn btn-forest" onClick={() => onPay(sel)}>
              <span data-bz-key="prog:pay">გადახდა · </span><span className="num" data-bz-key="plan:food:price">{`${PLAN.price}₾`}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
