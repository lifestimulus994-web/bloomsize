"use client";
import Reveal from "./Reveal";
import { Star } from "./Icons";

const T = [
  ["/img/t3.jpg", "ანა", "4 თვე Bloomsize-თან", "ბოლოს ვიპოვე დიეტა, რომელსაც მართლა მივყვები. მენიუ მრავალფეროვანია და არასდროს მშია."],
  ["/img/t1.jpg", "ნინო", "7 თვე Bloomsize-თან", "ნუტრიციოლოგი ყოველ კვირას მიკორექტირებს გეგმას. ორ თვეში 6 კგ დავიკელი და თავს საუკეთესოდ ვგრძნობ."],
  ["/img/t2.jpg", "მარიამი", "3 თვე Bloomsize-თან", "ძალიან მარტივი და გასაგებია. საყიდლების სიამ დრო და ფული დამიზოგა."],
];

export default function Testimonials() {
  return (
    <section className="section plate rev" id="reviews">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow center">წარმატების ისტორიები</p>
          <h2>რეალური ადამიანები, რეალური შედეგები</h2>
        </Reveal>
        <Reveal className="rate">
          <span className="stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</span>
          <span><b className="num">4.9/5</b> შეფასება</span><i />
          <span><b className="num">94%</b> აგრძელებს მეორე თვეს</span>
        </Reveal>
        <div className="tgrid">
          {T.map(([img, n, m, q], i) => (
            <Reveal key={n} delay={i * 0.1} className="tcard">
              <blockquote>„{q}“</blockquote>
              <figure>
                <img src={img} alt="" loading="lazy" width="56" height="56" />
                <figcaption><b>{n}</b><small>{m}</small></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="foot-note">* დემო ვერსიაში შეფასებები და სტატისტიკა საილუსტრაციოა და რეალურით ჩანაცვლდება.</p>
      </div>
    </section>
  );
}
