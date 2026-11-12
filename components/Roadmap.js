"use client";
import Reveal from "./Reveal";

const CARDS = [
  ["გრაფიკი", ["დღეში 3 კვება", "ადრეული საუზმე", "კვირაში 2 სამუშაო მოგზაურობა"]],
  ["გემოვნება", ["ყვარს თევზი და ბოსტნეული", "არ ჭამს ხორცს ვახშმად", "სწრაფი რეცეპტები"]],
  ["მიზნები", ["წონის კლება 6 კგ", "მეტი ენერგია დღის განმავლობაში", "ჯანსაღი ჩვევები"]],
  ["ალერგიები", ["ლაქტოზა", "თხილეული"]],
  ["ჯანმრთელობა", ["დაბალი რკინა", "ყოველწლიური ანალიზები"]],
  ["ბიუჯეტი", ["საყიდლები კვირაში 80₾-მდე", "სეზონური პროდუქტები"]],
];

export default function Roadmap() {
  return (
    <section className="section plate flip road">
      <div className="wrap">
        <Reveal className="priv-head">
          <h3>Private-ის უპირატესობები</h3>
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
