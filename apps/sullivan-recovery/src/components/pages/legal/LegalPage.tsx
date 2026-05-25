import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";

export type LegalSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type LegalPageProps = {
  badge: string;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  intro?: string;
  notice?: string;
  sections: LegalSection[];
  contactNote?: string;
};

export default function LegalPage({
  badge,
  title,
  subtitle,
  lastUpdated,
  intro,
  notice,
  sections,
  contactNote,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[var(--sr-linen)]">
      <section
        className="relative overflow-hidden bg-[var(--sr-charcoal)] text-white"
        style={{ marginTop: "-88px", paddingTop: "calc(88px + 2.5rem)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(74, 92, 66, 0.5) 0%, transparent 55%)",
          }}
          aria-hidden
        />
        <div className="sr-container relative z-10 pb-14 pt-4 md:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            <Link href="/" className="transition hover:text-[var(--sr-sage)]">
              Home
            </Link>
            <i className="ri-arrow-right-s-line text-white/25" aria-hidden />
            <span className="text-white/70">{title}</span>
          </nav>
          <p className="sr-eyebrow mb-3 text-[var(--sr-sage)]">{badge}</p>
          <h1
            className="max-w-3xl text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.06] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-white/70"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {subtitle}
            </p>
          ) : null}
          {lastUpdated ? (
            <p
              className="mt-4 text-[12px] text-white/45"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Last updated: {lastUpdated}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
        <div className="sr-container">
          <div className="mx-auto max-w-3xl">
            {notice ? (
              <div className="mb-10 border border-[var(--sr-moss)]/30 bg-[var(--sr-moss)]/8 p-6 md:p-8">
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--sr-moss)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Important
                </p>
                <p
                  className="mt-3 text-[14px] leading-[1.8] text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {notice}
                </p>
              </div>
            ) : null}

            {intro ? (
              <p
                className="mb-10 border-l-2 border-[var(--sr-sage)] pl-6 text-[16px] leading-[1.85] text-[var(--sr-body)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {intro}
              </p>
            ) : null}

            <div className="space-y-12">
              {sections.map((sec) => (
                <article key={sec.heading}>
                  <h2
                    className="mb-4 text-[clamp(1.35rem,2.5vw,1.75rem)] font-light text-[var(--sr-ink)]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {sec.heading}
                  </h2>
                  {sec.body.map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="mb-4 text-[15px] leading-[1.8] text-[var(--sr-body)] last:mb-0"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {para}
                    </p>
                  ))}
                  {sec.list && sec.list.length > 0 ? (
                    <ul className="mt-4 space-y-2.5">
                      {sec.list.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sr-moss)] text-white">
                            <i className="ri-check-line text-[10px]" aria-hidden />
                          </span>
                          <span
                            className="text-[14px] leading-[1.65] text-[var(--sr-body)]"
                            style={{ fontFamily: "var(--font-dm-sans)" }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>

            {contactNote ? (
              <div className="mt-12 border border-[var(--sr-sand)] bg-[var(--sr-linen)] p-6 md:p-8">
                <p className="sr-eyebrow mb-3">Questions</p>
                <p
                  className="mb-5 text-[14px] leading-[1.75] text-[var(--sr-body)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {contactNote}
                </p>
                <CallRailPhoneLink className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]">
                  <i className="ri-phone-line" aria-hidden />
                  Call admissions
                </CallRailPhoneLink>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
