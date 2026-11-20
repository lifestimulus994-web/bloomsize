"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// ── სამართლებრივი გვერდის ჩარჩო ────────────────────────────────────────────
// საერთო სათაური, სარჩევი (მარცხნივ, წებოვანი), ბეჭდვის ღილაკი და უკან დაბრუნება.
export function LegalPage({ eyebrow, title, updated, version, intro, toc, children, crossLink }) {
  const [active, setActive] = useState(toc[0]?.id || "");

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (es) => {
        const vis = es.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  return (
    <main className="legal">
      <div className="wrap">
        <nav className="legal-top" aria-label="ნავიგაცია">
          <Link href="/" className="logo" aria-label="Bloomsize — მთავარი გვერდი">
            <img src="/img/logo.png" alt="Bloomsize" width="160" height="45" />
          </Link>
          <div className="legal-top-r">
            <button type="button" className="legal-print" onClick={() => window.print()}>
              ბეჭდვა / PDF
            </button>
            <Link href="/" className="legal-back">
              ← მთავარ გვერდზე
            </Link>
          </div>
        </nav>

        <header className="legal-head">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="legal-meta">
            ბოლო განახლება: {updated} · ვერსია {version} · ძალაშია {updated}-დან
          </p>
          <p className="lead legal-intro">{intro}</p>
          {crossLink && <p className="legal-cross">{crossLink}</p>}
        </header>

        <div className="legal-grid">
          <aside className="legal-toc" aria-label="სარჩევი">
            <p className="legal-toc-h">სარჩევი</p>
            <ol>
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={active === t.id ? "on" : ""}>
                    <span className="legal-toc-n">{i + 1}</span>
                    {t.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="legal-body">{children}</div>
        </div>
      </div>
    </main>
  );
}

export const H2 = ({ id, n, children }) => (
  <section id={id} className="legal-sec">
    <h2 className="legal-h">
      {n !== undefined && <span className="legal-h-n">{n}.</span>}
      {children}
    </h2>
  </section>
);

export const H3 = ({ children }) => <h3 className="legal-h3">{children}</h3>;

export const P = ({ children }) => <p className="legal-p">{children}</p>;

export const UL = ({ items, tight }) => (
  <ul className={`legal-list${tight ? " tight" : ""}`}>
    {items.map((x, i) => (
      <li key={i}>{x}</li>
    ))}
  </ul>
);

export const OL = ({ items }) => (
  <ol className="legal-ol">
    {items.map((x, i) => (
      <li key={i}>
        <span className="legal-ol-n">{i + 1}</span>
        <span>{x}</span>
      </li>
    ))}
  </ol>
);

// ხაზგასმული ყუთი: მნიშვნელოვანი, გაფრთხილება ან სამართლებრივი შენიშვნა
export const Note = ({ title, children, tone = "info" }) => (
  <div className={`legal-note ${tone}`}>
    {title && <b>{title}</b>}
    <div>{children}</div>
  </div>
);

// ორსვეტიანი ცხრილი — label/value
export const KV = ({ rows }) => (
  <dl className="legal-kv">
    {rows.map(([k, v], i) => (
      <div key={i}>
        <dt>{k}</dt>
        <dd>{v}</dd>
      </div>
    ))}
  </dl>
);

// სრული ცხრილი — თავსართები + რიგები
export const Table = ({ head, rows, note }) => (
  <div className="legal-table-wrap">
    <table className="legal-table">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} scope="col">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {note && <p className="legal-table-note">{note}</p>}
  </div>
);
