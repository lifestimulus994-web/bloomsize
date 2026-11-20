import Link from "next/link";
import { LegalPage, H2, P, KV } from "../../components/Legal";
import { ORG, DATES } from "../../lib/legal";

export const metadata = {
  title: "ინფორმაცია Bloomsize-ის შესახებ — Bloomsize",
  description: "მომსახურების მიმწოდებელი, რეკვიზიტები და საკონტაქტო მონაცემები.",
  alternates: { canonical: "/about-us" },
  robots: { index: true, follow: true },
};

const TOC = [{ id: "about", title: "ინფორმაცია და კონტაქტი" }];

export default function About() {
  return (
    <LegalPage
      eyebrow="სამართლებრივი ინფორმაცია"
      title="ინფორმაცია Bloomsize-ის შესახებ"
      updated={DATES.termsUpdated}
      version={DATES.termsVersion}
      intro="Bloomsize (bloomsize.co) არის ვებგვერდი, სადაც შეგიძლია შეიძინო მზა კვების პროგრამები PDF ფორმატში ან Private პაკეტი, რომელიც მოიცავს ინდივიდუალურ კვების გეგმასა და 30-დღიან მხარდაჭერას."
      toc={TOC}
      crossLink={
        <>
          იხილე ასევე: <Link href="/terms">მომსახურების პირობები</Link> ·{" "}
          <Link href="/privacy">კონფიდენციალურობა</Link> · <Link href="/refund">გაუქმება და თანხის დაბრუნება</Link>
        </>
      }
    >
      <H2 id="about" n={1}>ინფორმაცია Bloomsize-ის შესახებ და საკონტაქტო მონაცემები</H2>
      <KV
        rows={[
          ["მომსახურების მიმწოდებელი", ORG.legalName],
          ["საიდენტიფიკაციო ნომერი", ORG.idCode],
          ["იურიდიული მისამართი", "საქართველო, თბილისი, ვარლამ ჩერქეზიშვილის ქ. 52"],
          ["ტელეფონი", ORG.phone],
          ["ელფოსტა", <a key="m" href={`mailto:${ORG.email}`}>{ORG.email}</a>],
          ["ვებგვერდი", <a key="s" href="https://www.bloomsize.co/">https://www.bloomsize.co/</a>],
        ]}
      />
      <P>
        შეკვეთასთან, პროგრამის მიღებასთან, თანხის დაბრუნებასთან ან პერსონალურ მონაცემებთან დაკავშირებულ
        საკითხებზე მოგვწერე მისამართზე <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
      </P>
    </LegalPage>
  );
}
