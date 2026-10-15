"use client";
import Reveal from "./Reveal";
import { Arrow, Target, Trend, Heart } from "./Icons";
import { useApp } from "./Providers";

export default function Banner() {
  const { openCheckout } = useApp();
  return (
    <section className="banner on-dark">
      <img src="/img/banner.jpg" alt="" loading="lazy" />
      <div className="wrap">
        <div className="bn-in">
          <Reveal as="p" className="quote">სასურველი ცხოვრება არ გვჩუქდება — მას ვქმნით.</Reveal>
          <Reveal as="h2" delay={0.08}>ააშენე ჩვევები. <em>შექმენი ცხოვრება.</em></Reveal>
          <div className="feats">
            <Reveal className="feat" delay={0.1}><i><Target /></i>პერსონალური მიდგომა</Reveal>
            <Reveal className="feat" delay={0.18}><i><Trend /></i>რეალური, ხანგრძლივი შედეგი</Reveal>
            <Reveal className="feat" delay={0.26}><i><Heart /></i>მხარდაჭერა ყოველ ნაბიჯზე</Reveal>
          </div>
          <Reveal delay={0.3}><button className="btn btn-terra" onClick={() => openCheckout("plus")}>დაიწყე ახლავე <Arrow /></button></Reveal>
        </div>
      </div>
    </section>
  );
}
