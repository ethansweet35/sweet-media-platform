import Link from "next/link";
import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Confidential Consult",
    body:
      "Connect with our team for a private, preliminary clinical assessment and to answer your immediate questions.",
  },
  {
    n: "02",
    title: "Insurance Verification",
    body:
      "A complimentary verification of benefits (VOB) to maximize insurance coverage and provide complete cost transparency.",
  },
  {
    n: "03",
    title: "Clinical Review",
    body:
      "Our medical directors review your assessment to tailor your bespoke treatment plan before arrival.",
  },
  {
    n: "04",
    title: "Seamless Arrival",
    body:
      "Upon arrival, our team handles all logistics — from travel to luggage — ensuring a peaceful transition.",
  },
];

export default function JourneySection() {
  return (
    <section className="bg-[var(--mvt-forest)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mvt-eyebrow-light">Admissions Process</p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              A Seamless Journey to <span className="italic text-[var(--mvt-cream)]">Sanctuary</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80">
              We understand that reaching out is often the hardest step. Our
              admissions concierge is available 24/7 for a completely
              confidential, compassionate, and transparent onboarding
              experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] hover:bg-[var(--mvt-cream)]"
              >
                <i className="ri-phone-fill text-base" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:border-white hover:bg-white/10"
              >
                Begin Admission
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 hidden w-px bg-white/15 md:block" />
            <ol className="space-y-6">
              {STEPS.map((step) => (
                <li key={step.n} className="relative pl-0 md:pl-20">
                  <span className="absolute left-0 top-0 hidden h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[var(--mvt-forest-deep)] font-heading text-xl text-[var(--mvt-cream)] md:inline-flex">
                    {step.n}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                    <div className="font-heading text-2xl text-white">
                      <span className="text-[var(--mvt-cream)] md:hidden">
                        {step.n} ·{" "}
                      </span>
                      {step.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
