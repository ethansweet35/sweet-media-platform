import Link from "next/link";
import { SITE } from "@/lib/site";

export type LegalSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type LegalPageProps = {
  badge: string;
  title: string;
  subtitle?: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  contactNote?: string;
};

export default function LegalPage({
  badge,
  title,
  subtitle,
  lastUpdated,
  intro,
  sections,
  contactNote,
}: LegalPageProps) {
  return (
    <div className="flex flex-col bg-white text-[var(--mvt-text)]">
      {/* Header */}
      <section className="bg-[var(--mvt-ink)] pb-14 pt-36 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mvt-eyebrow-light mb-4 text-xs tracking-[0.2em]">{badge}</p>
          <h1 className="font-heading max-w-2xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base text-white/60 lg:text-lg">{subtitle}</p>
          )}
          <p className="mt-5 text-xs text-white/35">Last updated: {lastUpdated}</p>
        </div>
        <svg className="mt-10 block w-full" viewBox="0 0 1280 32" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,32 1280,0 1280,32" fill="white" />
        </svg>
      </section>

      {/* Body */}
      <section className="bg-white">
        <div className="mx-auto max-w-[860px] px-6 py-14 lg:px-8 lg:py-20">
          {intro && (
            <p className="mb-12 border-l-4 border-[var(--mvt-teal)] pl-6 text-base leading-[1.85] text-[var(--mvt-forest)] lg:text-lg">
              {intro}
            </p>
          )}

          <div className="flex flex-col gap-12">
            {sections.map((sec, i) => (
              <div key={i}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-heading text-4xl font-bold leading-none text-[var(--mvt-cream-2)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-[var(--mvt-cream-2)]" />
                </div>
                <h2 className="font-heading mb-4 text-2xl font-bold text-[var(--mvt-ink)] lg:text-3xl">
                  {sec.heading}
                </h2>
                {sec.body.map((para, pi) => (
                  <p key={pi} className="mb-4 text-base leading-[1.85] text-[var(--mvt-text)] last:mb-0">
                    {para}
                  </p>
                ))}
                {sec.list && sec.list.length > 0 && (
                  <ul className="mt-5 grid gap-2.5">
                    {sec.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
                          <i className="ri-check-line text-[10px]" />
                        </span>
                        <span className="text-sm leading-relaxed text-[var(--mvt-text)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact note */}
          {contactNote && (
            <div className="mt-14 rounded-2xl border border-[var(--mvt-cream-2)] bg-[var(--mvt-cream)] p-7">
              <p className="mvt-eyebrow mb-3 text-[10px] tracking-[0.2em]">QUESTIONS?</p>
              <p className="text-sm leading-relaxed text-[var(--mvt-text)]">{contactNote}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={SITE.phone.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-teal)] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--mvt-forest)]"
                >
                  <i className="ri-phone-line" />
                  {SITE.phone.display}
                </a>
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--mvt-cream-2)] px-5 py-2.5 text-xs font-semibold text-[var(--mvt-forest)] transition hover:border-[var(--mvt-teal)]"
                >
                  Send a Message
                </Link>
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-10 flex flex-wrap gap-4 border-t border-[var(--mvt-cream-2)] pt-8 text-xs text-[var(--mvt-muted)]">
            <Link href="/privacy-policy/" className="transition hover:text-[var(--mvt-teal)]">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms-service/" className="transition hover:text-[var(--mvt-teal)]">Terms of Service</Link>
            <span>·</span>
            <Link href="/hipaa-notice-of-privacy-practices/" className="transition hover:text-[var(--mvt-teal)]">HIPAA Notice</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
