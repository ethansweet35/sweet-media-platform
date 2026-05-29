import Link from "next/link";
import { CONTAINER } from "@/data/site";

/**
 * Section 9 — Insurance
 * Design: cream bg, centered heading, logo wall of carrier names, CTA.
 * Carrier logo assets aren't in WP at good resolution — use styled name pills instead.
 */

const CARRIERS = [
  "Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield",
  "Cigna", "Beacon Health Options", "Carelon Behavioral Health",
  "GEHA", "Cox Health", "Private Pay",
];

export default function HomeInsurance() {
  return (
    <section className="bg-cream py-[100px]">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-mbh-green" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
              Insurance & Costs
            </span>
            <div className="h-px w-8 bg-mbh-green" aria-hidden />
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
            Insurance plans and average costs.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-mbh-body">
            Missouri Behavioral Health accepts most private health insurance and private-pay options.
            Our administrative team verifies your benefits at no cost so you can focus on recovery,
            not paperwork.
          </p>
        </div>

        {/* Carrier pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CARRIERS.map((carrier) => (
            <span
              key={carrier}
              className="rounded-full border border-mbh-forest/15 bg-white px-5 py-2.5 font-body text-sm font-medium text-mbh-ink shadow-sm"
            >
              {carrier}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/verify-insurance"
            className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-8 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/20 transition hover:bg-mbh-green-hover"
          >
            Verify your insurance
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/20 px-8 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
          >
            Ask about private pay
          </Link>
        </div>
      </div>
    </section>
  );
}
