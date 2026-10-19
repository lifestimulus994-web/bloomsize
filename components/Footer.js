"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { Arrow, Send } from "./Icons";
import { useApp } from "./Providers";

export default function Footer() {
  const { openCheckout, toast } = useApp();
  const [email, setEmail] = useState("");
  const sub = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast("შეიყვანე სწორი ელფოსტა"); return; }
    setEmail(""); toast("გამოწერა დაფიქსირდა");
  };
  return (
    <footer className="plate flip ftr">
      <div className="wrap">
        <div className="final">
          <Reveal as="h2">იპოვე შენი გეგმა დღესვე</Reveal>
          <Reveal delay={0.1}><button className="btn btn-forest" onClick={() => openCheckout("plus")}>დაიწყე ახლავე <Arrow /></button></Reveal>
        </div>
        <div className="ftr-grid">
          <div>
            <span className="logo"><img src="/img/logo.png" alt="Bloomsize" width="170" height="48" /></span>
            <p>ჯანსაღი კვება, რომელიც შენს რიტმს მოერგება.</p>
          </div>
          <div>
            <h4>პროგრამები</h4>
            <ul><li><a href="#plans">Start</a></li><li><a href="#plans">Plus</a></li><li><a href="#plans">Pro</a></li><li><a href="#workouts">ვარჯიშები</a></li></ul>
          </div>
          <div>
            <h4>კომპანია</h4>
            <ul><li><a href="#how">როგორ მუშაობს</a></li><li><a href="#reviews">შეფასებები</a></li><li><a href="#faq">კითხვები</a></li></ul>
          </div>
          <div>
            <h4>კვირის რჩევები</h4>
            <form className="news" onSubmit={sub} noValidate>
              <label className="sr" htmlFor="nl">ელფოსტა</label>
              <input id="nl" type="email" inputMode="email" autoComplete="email" placeholder="შენი ელფოსტა" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" aria-label="გამოწერა"><Send /></button>
            </form>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
              <span className="chip">ბარათი</span><span className="chip">Apple Pay</span><span className="chip">Google Pay</span>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <span>© 2026 Bloomsize. ყველა უფლება დაცულია.</span>
          <span>დემო ვერსია</span>
        </div>
      </div>
    </footer>
  );
}
