"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { Arrow, Dumbbell, Lotus, Heart } from "./Icons";
import { useApp } from "./Providers";

const WK = [
  [Heart, "სახლში", "ვარჯიშები აღჭურვილობის გარეშე"],
  [Dumbbell, "დარბაზში", "ძალისა და მასის პროგრამები"],
  [Lotus, "იოგა და გაჭიმვა", "ბალანსი სხეულისა და გონებისთვის"],
];

export default function Workouts() {
  const [email, setEmail] = useState("");
  const [bad, setBad] = useState(false);
  const { toast } = useApp();
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setBad(true); return; }
    setBad(false); setEmail(""); toast("დაგამატეთ სიაში — პირველებს შეგატყობინებთ");
  };
  return (
    <section className="section plate flip wk-sec" id="workouts">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">მალე</p>
          <h2>კვებას ვარჯიშებიც დაემატება</h2>
          <p className="lead">სრული ჯანსაღი ცხოვრების სისტემა: კვება და მოძრაობა ერთ სივრცეში.</p>
        </Reveal>
        <div className="wk-grid">
          {WK.map(([Ic, t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="wk">
              <span className="badge-ic"><Ic /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
              <span className="soon">მალე</span>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <form className="wait" onSubmit={submit} noValidate>
            <label className="sr" htmlFor="wl">ელფოსტა</label>
            <input id="wl" type="email" inputMode="email" autoComplete="email" placeholder="შენი ელფოსტა" value={email} onChange={(e) => setEmail(e.target.value)} style={bad ? { borderColor: "#b3261e" } : null} aria-invalid={bad} />
            <button className="btn btn-forest" type="submit">შემატყობინეთ <Arrow /></button>
          </form>
          {bad && <p role="alert" style={{ textAlign: "center", color: "#b3261e", fontSize: 14, marginTop: 8 }}>შეიყვანე სწორი ელფოსტა</p>}
        </Reveal>
      </div>
    </section>
  );
}
