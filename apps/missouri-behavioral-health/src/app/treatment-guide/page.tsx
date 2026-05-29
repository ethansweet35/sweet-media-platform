import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TreatmentGuideHero from "@/components/guide/TreatmentGuideHero";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { INSURANCE_GUIDES } from "@/data/treatmentGuides";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const fallback: Metadata = {
  title: "Treatment & Insurance Guide | Missouri Behavioral Health",
  description:
    "Insurance coverage guides for addiction and mental health treatment at Missouri Behavioral Health — Aetna, Anthem, BCBS, Cigna, Beacon, Carelon, GEHA, Cox Health, and more.",
  alternates: { canonical: "/treatment-guide" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment-guide", fallback);
}

const [featured, ...restGuides] = INSURANCE_GUIDES;

const FAQS = [
  {
    q: "Does Missouri Behavioral Health accept my insurance?",
    a: "We accept most major private insurance plans, including Aetna, Anthem Blue Cross, Blue Cross Blue Shield, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. We do not accept Medicaid or Medicare. Our team verifies your specific benefits at no cost before treatment begins.",
  },
  {
    q: "What does insurance usually cover for addiction treatment?",
    a: "Most private plans cover medically necessary substance use and mental health treatment — including detox (when referred), PHP, IOP, outpatient therapy, and medication-assisted treatment. Your exact coverage depends on your plan tier, deductible, and whether MBH is in-network for your policy.",
  },
  {
    q: "How long does insurance verification take?",
    a: "In most cases we can confirm your benefits within a few hours during business hours, and often the same day for after-hours inquiries. You will know your estimated out-of-pocket costs before your first clinical session.",
  },
  {
    q: "Will my employer find out I am in treatment?",
    a: "Treatment records are protected under HIPAA. Insurance claims use clinical billing codes and do not disclose details of your care to your employer. If you have concerns about EAP or HR involvement, our admissions team can walk through your specific situation confidentially.",
  },
];

export default function TreatmentGuidePage() {
  return (
    <main>
      <TreatmentGuideHero />

      {/* Featured guide */}
      <section className="bg-cream py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-green" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
              Start here
            </span>
          </div>
          <Link
            href={featured.path}
            className="group grid overflow-hidden rounded-3xl border border-mbh-forest/8 bg-white shadow-sm transition hover:border-mbh-green/25 hover:shadow-md lg:grid-cols-[1fr_1.1fr]"
          >
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-mbh-green/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-green">
                <i className={`${featured.icon} text-sm`} aria-hidden />
                Featured guide
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-snug tracking-tight text-mbh-forest transition group-hover:text-mbh-green">
                {featured.title}
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-mbh-forest/10 bg-cream px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-mbh-body/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-7 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-mbh-green transition group-hover:gap-2.5">
                Read guide <i className="ri-arrow-right-line" aria-hidden />
              </span>
            </div>
            <div className="flex flex-col justify-center border-t border-mbh-forest/8 bg-mbh-forest-deep p-8 text-white lg:border-l lg:border-t-0 lg:p-12">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage">
                Not sure where to begin?
              </p>
              <p className="mt-3 font-display text-xl font-semibold leading-snug">
                We verify benefits for every plan listed — at no cost.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                Skip the guesswork. Our admissions team contacts your insurer directly and explains
                what is covered before you commit to a program.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mbh-mint">
                <i className="ri-shield-check-line" aria-hidden />
                Free &amp; confidential verification
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* All guides */}
      <section className="bg-white py-[100px]" id="guides">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Insurance coverage guides
            </h2>
            <p className="mt-3 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Select your carrier to understand how your plan may cover PHP, IOP, outpatient therapy,
              and dual-diagnosis care at MBH. Guides are updated as payer policies change.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {restGuides.map((g) => (
              <Link
                key={g.path}
                href={g.path}
                className="group flex flex-col rounded-2xl border border-mbh-forest/8 bg-cream/40 p-6 transition hover:border-mbh-green/30 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-mbh-forest/8">
                    <i className={`${g.icon} text-lg text-mbh-green`} aria-hidden />
                  </span>
                  <span className="font-display text-xs font-semibold tabular-nums text-mbh-green/80">
                    {g.carrier}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-mbh-forest">
                  {g.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-mbh-body">
                  {g.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.14em] text-mbh-body/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 font-body text-xs font-semibold text-mbh-green transition group-hover:gap-1.5">
                  Read guide <i className="ri-arrow-right-line" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verification steps */}
      <section className="bg-mbh-forest-deep py-[100px] text-white">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  How it works
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Three steps to clarity on coverage.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-white/55">
                You should never have to decode insurance alone. We handle the calls, codes, and
                authorization questions so you can focus on getting well.
              </p>
            </div>
            <ol className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Share your plan details",
                  body: "Provide your insurance card and basic information — online or by phone. Everything is HIPAA-protected.",
                },
                {
                  step: "02",
                  title: "We verify with your insurer",
                  body: "Our team confirms in-network status, covered levels of care, deductibles, and any prior authorization requirements.",
                },
                {
                  step: "03",
                  title: "Review your options together",
                  body: "You receive a clear summary of estimated costs and recommended programming before your first clinical appointment.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="flex gap-5 rounded-2xl border border-white/8 bg-white/5 p-5"
                >
                  <span className="font-display text-2xl font-semibold text-mbh-sage/80">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold">{item.title}</p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-white/50">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[100px]">
        <div className={`${CONTAINER} max-w-3xl`}>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>

      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Ready when you are
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white">
                Get your benefits verified today.
              </h2>
              <p className="mt-2 font-body text-sm text-white/50">
                Admissions coordinators available 24/7 — confidential, no pressure.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/verify-insurance"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint"
              >
                Verify insurance
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                <i className="ri-phone-fill" aria-hidden />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
