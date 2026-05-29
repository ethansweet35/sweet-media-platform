import Link from "next/link";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

/**
 * Section 5 — Benefits of Seeking Professional Help
 * Design: white bg, two-column split. Left: checklist. Right: body + CTA.
 * Uses the forest.png real WP image as a side accent where appropriate.
 */

const BENEFITS = [
  "Access to evidence-based treatments and therapies",
  "Support from experienced, licensed professionals",
  "A safe, structured environment for recovery",
  "Community and peer connection opportunities",
  "Coping skills and relapse-prevention strategies",
  "Improved mental and physical well-being",
  "Personalized care plans addressing the full picture",
];

export default function HomeBenefits() {
  return (
    <section className="bg-white pt-[100px] pb-0">
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">

          {/* Left — checklist */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Understanding Treatment
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
              Benefits of seeking professional help.
            </h2>

            <ul className="mt-8 space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/15">
                    <i className="ri-check-line text-[11px] text-mbh-green" aria-hidden />
                  </span>
                  <span className="font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — body + stat + CTA */}
          <div className="flex flex-col justify-center gap-8">
            <div className="rounded-2xl bg-cream p-8 ring-1 ring-mbh-forest/8">
              <i className="ri-stethoscope-line text-3xl text-mbh-green" aria-hidden />
              <p className="mt-5 font-body text-base leading-relaxed text-mbh-body">
                Seeking professional help is a crucial step in overcoming addiction and achieving
                long-term recovery. Our licensed clinical team works with each person to build a
                personalized care plan — combining medical support, behavioral therapy, and peer
                connection to address the full picture.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">
                We accept most private health insurance plans and offer private-pay options, with our
                administrative team available to verify your coverage at no cost.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/20 transition hover:bg-mbh-green-hover"
              >
                <i className="ri-phone-fill" aria-hidden />
                Call Now — {PHONE_DISPLAY}
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-mbh-forest/20 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
              >
                Verify insurance
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
