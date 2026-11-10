"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { Plus } from "./Icons";
import { FAQ } from "../lib/data";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section plate" id="faq">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">კითხვები</p>
          <h2>ხშირად დასმული კითხვები</h2>
        </Reveal>
        <Reveal className="faq">
          {FAQ.map(([q, a], i) => (
            <div key={q} className={`fq${open === i ? " open" : ""}`}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span><Plus />
              </button>
              {open === i && (
                <p>{a}</p>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
