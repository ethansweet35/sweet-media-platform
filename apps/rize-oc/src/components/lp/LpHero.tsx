"use client";

import InsuranceForm from "@/views/home/components/InsuranceForm";

const PHONE_DISPLAY = "(949) 461-2620";
const PHONE_HREF = "tel:9494612620";

const TRUST_BADGES = [
  "Joint Commission Accredited",
  "Licensed Clinicians",
  "Insurance Accepted",
  "24/7 Admissions",
];

interface LpHeroProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
}

export default function LpHero({
  headline,
  subheadline = "Looking for treatment near you? Rize offers safe, medically-supervised care and executive privacy in a premium coastal sanctuary. We accept most major insurances. Call 24/7 for a confidential assessment.",
  eyebrow = "1,000+ Successful Recoveries",
  stat,
  statLabel,
}: LpHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #F8F6F3 0%, #F4F4F6 55%, #EEEEF1 100%)" }}
    >
      {/* Decorative arcs */}
      <div className="pointer-events-none absolute bottom-0 left-0" style={{ width: 520, height: 520 }} aria-hidden>
        <svg width="520" height="520" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="520" r="200" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.07" />
          <circle cx="0" cy="520" r="300" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.05" />
          <circle cx="0" cy="520" r="400" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.035" />
          <circle cx="0" cy="520" r="500" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.02" />
        </svg>
      </div>
      <div className="pointer-events-none absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-accent/25" aria-hidden />

      <div className="mx-auto max-w-[1300px] w-full px-6 grid lg:grid-cols-[1fr_500px] min-h-[760px] items-center gap-0">

        {/* Left — content */}
        <div className="relative flex flex-col justify-center px-4 py-16 lg:px-16 lg:py-24">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <div className="border border-ink/20 px-4 py-1.5 flex items-center gap-2.5">
              <i className="ri-star-fill text-accent text-sm" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-ink">
                {eyebrow}
              </span>
            </div>
          </div>

          {/* Star rating strip */}
          <div className="flex items-center gap-1.5 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="ri-star-fill text-accent text-sm" />
            ))}
            <span className="ml-2 text-xs text-ink/60">5-Star Rated Rehab Facility · 140+ Reviews</span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(38px, 5vw, 74px)", lineHeight: 1.0 }}
          >
            {headline}
          </h1>

          <div className="mt-5 mb-6 w-16 h-[2px] bg-accent" />

          <p className="max-w-md text-base font-light leading-relaxed text-ink/70">
            {subheadline}
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-sm font-normal text-ink/80">{badge}</span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-line text-sm" />
              Call Now — {PHONE_DISPLAY}
            </a>
            <a
              href="#verify"
              className="flex items-center gap-2 border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-white transition-colors"
            >
              Verify Insurance
            </a>
          </div>

          {/* Optional stat */}
          {stat && (
            <div className="mt-8 inline-flex items-center gap-4 border-l-2 border-accent pl-5">
              <span
                className="font-[family-name:var(--font-display)] text-4xl font-normal text-ink"
                style={{ lineHeight: 1 }}
              >
                {stat}
              </span>
              {statLabel && (
                <span className="text-xs uppercase tracking-[0.2em] text-ink/60">{statLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Right — insurance form card */}
        <div id="verify" className="flex items-center justify-center px-6 py-16 lg:px-10">
          <div
            className="w-full bg-white border border-warm/50"
            style={{
              boxShadow:
                "0 48px 100px 0px rgba(217,138,83,0.42), 0 4px 16px -2px rgba(44,48,46,0.08)",
            }}
          >
            <div className="flex items-center gap-3 px-8 pt-8 pb-5">
              <div className="w-9 h-9 flex items-center justify-center border border-ink/20 shrink-0">
                <i className="ri-shield-check-line text-ink text-base" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink">
                  Speak With a Care Coordinator
                </p>
                <p className="text-xs text-ink/50 mt-0.5">
                  Or check your insurance coverage — 100% confidential
                </p>
              </div>
            </div>

            <div className="px-8 pb-3">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 w-full border border-ink py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-colors mb-5"
              >
                <i className="ri-phone-fill" />
                Call Now — {PHONE_DISPLAY}
              </a>
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-5">
                or
              </p>
            </div>

            <div className="px-8 pb-8">
              <InsuranceForm showNotesField />
              <p className="mt-4 text-xs text-ink/40 leading-relaxed">
                Your information is confidential and HIPAA compliant. We&apos;ll contact you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
