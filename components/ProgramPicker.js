"use client";
import { useEffect } from "react";
import { Close } from "./Icons";
import { PROGRAMS } from "../lib/data";

const k = (id, field) => `prog:${id}:${field}`;

export default function ProgramPicker({ onClose, onPay }) {
  // One tap on a program card is the whole decision — go straight to checkout.
  const pick = (id) => onPay(id);

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
            <div
              key={pr.id}
              className="prog"
              role="button"
              tabIndex={0}
              aria-label={`ავირჩიო „${pr.name}“`}
              onClick={() => pick(pr.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(pr.id); }
              }}
            >
              <span className="prog-ic"><img src={pr.icon} alt="" width="56" height="56" loading="lazy" decoding="async" /></span>
              <h4 data-bz-key={k(pr.id, "title")}>{`„${pr.name}“ — ${pr.headline}`}</h4>
              <div className="prog-row">
                <b data-bz-key={`prog:who:label`}>ვისთვისაა</b>
                <p data-bz-key={k(pr.id, "who")}>{pr.who}</p>
              </div>
              <div className="prog-row">
                <b data-bz-key={`prog:why:label`}>რატომ გამოგადგება</b>
                <p data-bz-key={k(pr.id, "why")}>{pr.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
