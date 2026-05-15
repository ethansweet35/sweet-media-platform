import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/admissions-1.webp";

const TRUST_PILLS = ["Same Day Admissions", "Insurance Accepted", "Free Assessment"];

const STEPS = [
  {
    n: "01",
    icon: "ri-phone-fill",
    title: "Initial Contact",
    body: "Call us 24/7 or fill out our online form. A compassionate admissions specialist will discuss your situation and answer all your questions.",
  },
  {
    n: "02",
    icon: "ri-clipboard-line",
    title: "Free Assessment",
    body: "Complete a confidential clinical assessment. We\u2019ll evaluate your needs and recommend the appropriate level of care for your situation.",
  },
  {
    n: "03",
    icon: "ri-shield-check-line",
    title: "Insurance Verification",
    body: "Our team verifies your insurance benefits at no cost. We\u2019ll explain your coverage, out-of-pocket costs, and payment options.",
  },
  {
    n: "04",
    icon: "ri-calendar-check-line",
    title: "Admission & Start",
    body: "Coordinate your start date (often same-day). Arrange housing if needed. Begin your personalized treatment program.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-[70vh] flex-col justify-end overflow-hidden text-white lg:min-h-[640px]">
        <Image
          src={HERO_IMG}
          alt="Mountain View Treatment — Admissions"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--mvt-forest-deep)] via-[var(--mvt-forest-deep)]/65 to-[var(--mvt-forest-deep)]/5"
        />

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-24 lg:px-12 lg:pb-20">
          <div className="flex max-w-2xl flex-col">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
              Admissions
            </p>

            <h1 className="mt-5 font-heading text-[52px] leading-[1.0] tracking-tight text-white sm:text-[64px] lg:text-[80px]">
              Start Your Recovery <span className="italic text-[var(--mvt-teal-light)]">Today</span>
            </h1>

            <p className="mt-6 text-[16px] leading-7 text-white/75 sm:text-[17px]">
              Taking the first step toward recovery is the most important decision
              you&rsquo;ll make. Our compassionate admissions team is here to guide
              you through every step of the process&mdash;24 hours a day, 7 days a week.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[var(--mvt-ink)]"
              >
                <i className="ri-phone-fill text-base" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <Link
                href="#process"
                className="inline-flex items-center gap-2 border border-white/35 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:border-white hover:text-white"
              >
                How It Works
              </Link>
            </div>

            {/* Trust pills */}
            <ul className="mt-10 flex flex-wrap gap-3 border-t border-white/15 pt-7">
              {TRUST_PILLS.map((pill) => (
                <li
                  key={pill}
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--mvt-teal-light)]"
                  />
                  {pill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section id="process" className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
              Simple &amp; Straightforward
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            </p>
            <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
              The Admissions <span className="italic">Process</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--mvt-text)]">
              Getting started at Mountain View Treatment Center is easy. Our
              streamlined admissions process gets you into treatment quickly,
              often within 24 hours of your first call.
            </p>
          </div>

          {/* 4-step grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <article
                key={step.title}
                className="relative flex flex-col bg-[var(--mvt-cream)] p-8"
              >
                {/* Large ghosted number */}
                <span className="absolute right-5 top-4 font-heading text-[64px] font-light leading-none text-[var(--mvt-ink)]/5 select-none">
                  {step.n}
                </span>

                {/* Icon */}
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mvt-forest-deep)] text-white">
                  <i className={`${step.icon} text-xl`} aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-[16px] font-semibold text-[var(--mvt-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--mvt-text)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-14 flex flex-col items-center gap-6 border-t border-black/8 pt-12 sm:flex-row sm:justify-between">
            <div>
              <p className="text-[15px] font-semibold text-[var(--mvt-ink)]">
                Ready to start? Our team is available around the clock.
              </p>
              <p className="mt-1 text-[13px] text-[var(--mvt-text)]">
                Same-day admissions available &mdash; call or submit your information now.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--mvt-ink)]"
              >
                <i className="ri-phone-fill" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <Link
                href="/admissions/insurance/"
                className="inline-flex items-center gap-2 border border-[var(--mvt-ink)]/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-ink)] transition hover:border-[var(--mvt-ink)]"
              >
                Verify Insurance
                <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </>
  );
}
