import Image from "next/image";
import Link from "next/link";
import type { InsuranceCarrierHighlight } from "@/lib/insurance-carrier-pages";
import { CONTAINER, SITE } from "@/lib/site";
import { SECTION_PY } from "./tokens";

type InsuranceCarrierHighlightsSectionProps = {
  carrierName: string;
  logoSrc: string;
  highlights: InsuranceCarrierHighlight[];
  verifyHref?: string;
};

export default function InsuranceCarrierHighlightsSection({
  carrierName,
  logoSrc,
  highlights,
  verifyHref = "/contact",
}: InsuranceCarrierHighlightsSectionProps) {
  return (
    <section className={`bg-white px-6 ${SECTION_PY} lg:px-10`}>
      <div className={CONTAINER}>
        <div className="overflow-hidden rounded-3xl ring-1 ring-border">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
            <div className="bg-surface px-8 py-10 lg:px-12 lg:py-12">
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-10 bg-accent" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Coverage support</p>
              </div>

              <h2
                className="max-w-xl text-3xl font-bold leading-tight text-ink md:text-4xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                How we work with {carrierName}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-body">
                Admissions handles verification, authorizations, and cost clarity — so you are not navigating
                {` ${carrierName} `}
                benefits alone.
              </p>

              <ul className="mt-10 divide-y divide-border/80">
                {highlights.map((item, index) => (
                  <li key={item.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                    <div className="flex flex-col items-center gap-2">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-accent shadow-sm ring-1 ring-border">
                        <i className={`${item.icon} text-xl`} aria-hidden />
                      </span>
                      <span
                        className="text-[10px] font-bold tabular-nums text-accent/70"
                        style={{ fontFamily: "var(--font-heebo)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="min-w-0 pt-1">
                      <p className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-body">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col justify-between border-t border-border bg-dark px-8 py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
              <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-accent/15 blur-[80px]" />

              <div className="relative">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <Image
                    src={logoSrc}
                    alt={`${carrierName} insurance logo`}
                    width={120}
                    height={40}
                    className="h-9 w-auto object-contain brightness-0 invert"
                  />
                </div>

                <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                  Before you enroll
                </p>
                <p
                  className="mt-4 text-2xl font-bold leading-snug text-white"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  We confirm benefits first — not after your teen starts care.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "In-network status for your plan",
                    "Copays, deductibles & out-of-pocket max",
                    "Pre-authorization when required",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <i className="ri-check-line text-xs" aria-hidden />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-10 flex flex-col gap-3">
                <Link
                  href={verifyHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-white/90"
                >
                  Verify {carrierName} benefits
                  <i className="ri-arrow-right-line text-accent" aria-hidden />
                </Link>
                <a
                  href={SITE.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  <i className="ri-phone-fill text-accent" aria-hidden />
                  {SITE.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
