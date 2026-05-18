"use client";

import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

export type GuideSection = {
  heading: string;
  body: string[];
  callout?: string;
  list?: string[];
};

export type RelatedGuide = {
  title: string;
  href: string;
  excerpt: string;
};

export type GuideArticlePageProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  readTime: string;
  topics: string[];
  heroImage: string;
  heroAlt: string;
  keyFacts?: { label: string; value: string }[];
  sections: GuideSection[];
  relatedGuides?: RelatedGuide[];
};

export default function GuideArticlePage({
  eyebrow = "MOUNTAIN VIEW GUIDE",
  title,
  intro,
  readTime,
  topics,
  heroImage,
  heroAlt,
  keyFacts,
  sections,
  relatedGuides,
}: GuideArticlePageProps) {
  return (
    <div className="flex flex-col bg-white text-[var(--mvt-text)]">
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] flex-col justify-end overflow-hidden text-white lg:min-h-[680px]">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0a100d 0%, #0a100dec 38%, #0a100d88 60%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="mvt-eyebrow-light mb-4 text-xs tracking-[0.2em]">{eyebrow}</p>
          <h1 className="font-heading max-w-4xl text-[42px] font-bold leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[72px]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 lg:text-lg">
            {intro}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              <i className="ri-time-line text-[var(--mvt-teal-light)]" />
              {readTime}
            </span>
            {topics.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts strip */}
      {keyFacts && keyFacts.length > 0 && (
        <section className="border-b border-[var(--mvt-cream-2)] bg-[var(--mvt-ink)]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-x divide-white/10 px-6 lg:grid-cols-4 lg:px-12">
            {keyFacts.map((f) => (
              <div key={f.label} className="px-6 py-8 text-center lg:px-8">
                <p className="font-heading text-3xl font-bold text-[var(--mvt-teal-light)] lg:text-4xl">
                  {f.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Article body */}
      <section className="bg-white">
        <div className="mx-auto max-w-[820px] px-6 py-20 lg:px-8 lg:py-28">
          {sections.map((sec, i) => (
            <div key={sec.heading} className="mb-16 last:mb-0">
              {/* Section label */}
              <div className="mb-5 flex items-center gap-4">
                <span className="font-heading text-5xl font-bold leading-none text-[var(--mvt-cream-2)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-[var(--mvt-cream-2)]" />
              </div>
              <h2 className="font-heading mb-5 text-3xl font-bold leading-tight text-[var(--mvt-ink)] lg:text-4xl">
                {sec.heading}
              </h2>
              {sec.body.map((para, pi) => (
                <p key={pi} className="mb-4 text-base leading-[1.8] text-[var(--mvt-text)] last:mb-0">
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
                      <span className="text-sm leading-relaxed text-[var(--mvt-text)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {sec.callout && (
                <div className="mt-7 rounded-xl border-l-4 border-[var(--mvt-teal)] bg-[var(--mvt-cream)] px-6 py-5">
                  <p className="text-sm leading-relaxed text-[var(--mvt-forest)]">
                    <i className="ri-information-line mr-2 text-[var(--mvt-teal)]" />
                    {sec.callout}
                  </p>
                </div>
              )}

              {/* Mid-article CTA after section 3 */}
              {i === 2 && (
                <div className="relative mt-12 overflow-hidden rounded-3xl bg-[var(--mvt-ink)]">
                  {/* Decorative circles */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--mvt-teal)]/20" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-[var(--mvt-teal-light)]/10" />

                  <div className="relative grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
                    {/* Left: text */}
                    <div>
                      <p className="mvt-eyebrow-light mb-3 text-xs tracking-[0.2em]">
                        CONFIDENTIAL ADMISSIONS
                      </p>
                      <h3 className="font-heading mb-3 text-2xl font-bold leading-snug text-white lg:text-3xl">
                        Speak With Our Team — Any Hour, Any Day
                      </h3>
                      <p className="mb-6 max-w-md text-sm leading-relaxed text-white/65">
                        Our admissions concierge is available 24/7. One call is all it takes to
                        understand your options — no judgment, no obligation.
                      </p>
                      {/* Trust strip */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {[
                          { icon: "ri-shield-check-line", label: "HIPAA Protected" },
                          { icon: "ri-time-line", label: "Available 24/7" },
                          { icon: "ri-secure-payment-line", label: "Insurance Verified Free" },
                        ].map((t) => (
                          <span key={t.label} className="flex items-center gap-1.5 text-xs font-semibold text-[var(--mvt-teal-light)]">
                            <i className={`${t.icon} text-sm`} />
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTAs */}
                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                      <a
                        href={SITE.phone.href}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--mvt-teal-light)] px-6 py-3.5 text-sm font-semibold text-[var(--mvt-ink)] transition hover:opacity-90"
                      >
                        <i className="ri-phone-fill" />
                        {SITE.phone.display}
                      </a>
                      <Link
                        href="/admissions/"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
                      >
                        Verify Insurance
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related guides */}
      {relatedGuides && relatedGuides.length > 0 && (
        <section className="bg-[var(--mvt-cream)] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <p className="mvt-eyebrow mb-3 text-xs tracking-[0.2em]">CONTINUE READING</p>
            <h2 className="font-heading mb-10 text-3xl font-bold text-[var(--mvt-ink)] lg:text-4xl">
              Related Guides
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mvt-teal)] text-white transition group-hover:bg-[var(--mvt-forest)]">
                    <i className="ri-book-open-line text-sm" />
                  </span>
                  <h3 className="font-heading mt-4 text-xl font-bold leading-snug text-[var(--mvt-ink)]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mvt-muted)]">
                    {g.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--mvt-teal)] transition group-hover:gap-2">
                    Read guide <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinancialConcierge />
    </div>
  );
}
