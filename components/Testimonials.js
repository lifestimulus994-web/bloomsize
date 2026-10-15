"use client";
import Reveal from "./Reveal";
import { Star, Play } from "./Icons";

const T = [
  ["/img/t3.jpg", "ანა", "4 თვე Bloomsize-თან", "ბოლოს ვიპოვე დიეტა, რომელსაც მართლა მივყვები. მენიუ მრავალფეროვანია და არასდროს მშია."],
  ["/img/t1.jpg", "ნინო", "7 თვე Bloomsize-თან", "ნუტრიციოლოგი ყოველ კვირას მიკორექტირებს გეგმას. ორ თვეში 6 კგ დავიკელი და თავს საუკეთესოდ ვგრძნობ."],
  ["/img/t2.jpg", "მარიამი", "3 თვე Bloomsize-თან", "ძალიან მარტივი და გასაგებია. საყიდლების სიამ დრო და ფული დამიზოგა."],
];

export default function Testimonials() {
  return (
    <section className="section rev" id="reviews">
      <div className="wrap">
        <Reveal as="h2">ჩვენი მომხმარებლები რეალურ შედეგებს აღწევენ</Reveal>
        <Reveal className="rate">
          <span className="stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</span>
          <span><b className="num">4.9/5</b> შეფასება</span><i />
          <span><b className="num">94%</b> აგრძელებს მეორე თვეს</span>
        </Reveal>
        <div className="tgrid">
          {T.map(([img, n, m, q], i) => (
            <Reveal key={n} delay={i * 0.1} className="tcard">
              <figure>
                <img src={img} alt="" loading="lazy" style={{ objectPosition: "50% 22%" }} />
                <figcaption>
                  <div><b>{n}</b><small>{m}</small></div>
                  <span className="pbtn" aria-hidden="true"><Play /></span>
                </figcaption>
              </figure>
              <blockquote>„{q}“</blockquote>
            </Reveal>
          ))}
        </div>
        <p className="foot-note">* დემო ვერსიაში შეფასებები და სტატისტიკა საილუსტრაციოა და რეალურით ჩანაცვლდება.</p>
      </div>
    </section>
  );
}
