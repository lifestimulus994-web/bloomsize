import Link from "next/link";
import { Check, Close, Arrow } from "../../../components/Icons";

export const metadata = {
  title: "გადახდის შედეგი — Bloomsize",
  robots: { index: false, follow: false },
};

const COPY = {
  approved: {
    ok: true,
    title: "გადახდა წარმატებით შესრულდა",
    text: "გამოწერა გააქტიურებულია. პროგრამის მასალას და შემდეგ ნაბიჯებს ელფოსტაზე მიიღებთ რამდენიმე წუთში.",
  },
  processing: {
    ok: true,
    title: "გადახდა მუშავდება",
    text: "ბანკი ტრანზაქციას ამოწმებს. დადასტურებისთანავე მიიღებთ შეტყობინებას ელფოსტაზე.",
  },
  declined: {
    ok: false,
    title: "გადახდა არ დასრულდა",
    text: "ბარათი უარყოფილია ან ოპერაცია გაუქმდა. სცადეთ სხვა ბარათით — თანხა არ ჩამოჭრილა.",
  },
  expired: {
    ok: false,
    title: "გადახდის დრო ამოიწურა",
    text: "სესია დაიხურა გადახდის დაწყებიდან ხანგრძლივი დაყოვნების გამო. თანხა არ ჩამოჭრილა — დაიწყეთ თავიდან.",
  },
  reversed: {
    ok: false,
    title: "გადახდა გაუქმებულია",
    text: "ტრანზაქცია გაუქმდა და თანხა არ ჩამოჭრილა.",
  },
  unverified: {
    ok: false,
    title: "შედეგი ვერ დადასტურდა",
    text: "გვერდზე მოვიდა მონაცემები, რომლის ავთენტურობაც ვერ შევამოწმეთ. თუ თანხა ჩამოგეჭრათ, მოგვწერეთ და დაგიბრუნებთ.",
  },
};

export default async function PaymentReturn({ searchParams }) {
  const sp = await searchParams;
  const status = String(sp?.status || "").toLowerCase();
  const c = COPY[status] || {
    ok: false,
    title: "გადახდის სტატუსი უცნობია",
    text: "ვერ დავადგინეთ გადახდის შედეგი. შეამოწმეთ ელფოსტა ან მოგვწერეთ info@bloomsize.co-ზე.",
  };

  return (
    <main className="legal">
      <div className="wrap">
        <nav className="legal-top" aria-label="ნავიგაცია">
          <Link href="/" className="logo" aria-label="Bloomsize — მთავარი გვერდი">
            <img src="/img/logo.png" alt="Bloomsize" width="160" height="45" />
          </Link>
        </nav>

        <div className={`pay-done${c.ok ? " ok" : " bad"}`} role="status">
          <span className="pay-done-ic">{c.ok ? <Check /> : <Close />}</span>
          <h1>{c.title}</h1>
          <p>{c.text}</p>
          {sp?.order && <small className="pay-done-ref">შეკვეთა: {String(sp.order).slice(0, 40)}</small>}
          <div className="pay-done-actions">
            <Link href="/" className="btn btn-forest">
              მთავარ გვერდზე <Arrow />
            </Link>
            <Link href="/#plans" className="btn btn-ghost">
              პაკეტების ნახვა
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
