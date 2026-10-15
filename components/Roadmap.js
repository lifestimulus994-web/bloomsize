"use client";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";
import { useApp } from "./Providers";

const CARDS = [
  ["გრაფიკი", ["დღეში 3 კვება", "ადრეული საუზმე", "კვირაში 2 სამუშაო მოგზაურობა"]],
  ["გემოვნება", ["ყვარს თევზი და ბოსტნეული", "არ ჭამს ხორცს ვახშმად", "სწრაფი რეცეპტები"]],
  ["მიზნები", ["წონის კლება 6 კგ", "მეტი ენერგია დღის განმავლობაში", "ჯანსაღი ჩვევები"]],
  ["ალერგიები", ["ლაქტოზა", "თხილეული"]],
  ["ჯანმრთელობა", ["დაბალი რკინა", "ყოველწლიური ანალიზები"]],
  ["ბიუჯეტი", ["საყიდლები კვირაში 80₾-მდე", "სეზონური პროდუქტები"]],
];

export default function Roadmap() {
  const { openCheckout } = useApp();
  return (
    <section className="road on-dark">
      <img src="/img/road.jpg" alt="" loading="lazy" />
      <div className="wrap">
        <Reveal as="h2">კვების გეგმა, რომელიც მხოლოდ შენია</Reveal>
        <Reveal delay={0.1} className="lead">ნუტრიციოლოგი ითვალისწინებს შენს გრაფიკს, გემოვნებას და მიზნებს, შემდეგ კი გეგმას ყოველკვირეულად აახლებს შედეგების მიხედვით.</Reveal>
        <Reveal delay={0.15}><button className="btn btn-cream" onClick={() => openCheckout("pro")}>დაიწყე Pro <Arrow /></button></Reveal>
        <Reveal className="member">
          <img src="/img/t1.jpg" alt="" />
          <div><b>ნინო</b><small>Bloomsize Pro წევრი</small></div>
        </Reveal>
        <div className="gcards">
          {CARDS.map(([t, items], i) => (
            <Reveal key={t} delay={i * 0.06} className="gcard">
              <h4>{t}</h4>
              <ul>{items.map((x) => (<li key={x}>+ {x}</li>))}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
