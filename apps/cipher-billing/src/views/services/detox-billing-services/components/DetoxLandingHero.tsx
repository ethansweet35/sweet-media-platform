import Image from "next/image";

import { cipherHomeMetricBullets } from "@/lib/cipherHomeSocialProof";
import {
  LANDING_SECTION_PY,
  SERVICE_CONTAINER,
  SERVICE_TEL_DISPLAY,
  SERVICE_TEL_HREF,
} from "@/views/services/components/servicePageConstants";
import { DETOX_LANDING_IMAGES } from "@/views/services/components/serviceLandingImages";

import ServiceLandingLeadForm from "@/components/services/ServiceLandingLeadForm";

const trustBullets = [
  "Detox billing for hospital inpatient, residential, ambulatory, and outpatient detox programs",
  "Insurance verification and prior auth before patients admit—SUD and co-occurring mental health",
  "HIPAA-aligned medical billing with H-codes, revenue code 0116, and denial management",
  ...cipherHomeMetricBullets.slice(0, 2),
] as const;

export default function DetoxLandingHero() {
  return (
    <section className={`relative overflow-hidden bg-[#101E3F] ${LANDING_SECTION_PY}`}>
      <div className="absolute inset-0">
        <Image
          src={DETOX_LANDING_IMAGES.hero}
          alt="Medical detox unit for addiction treatment detox billing and revenue cycle management"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16, 30, 63, 0.97) 0%, rgba(16, 30, 63, 0.88) 42%, rgba(16, 30, 63, 0.72) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className={`relative ${SERVICE_CONTAINER}`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5eb5e0]">
                Addiction &amp; co-occurring mental health detox
              </p>
            </div>

            <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white md:text-5xl lg:text-[3.25rem]">
              Detox billing services that{" "}
              <span className="text-[#5eb5e0]">protect cash flow</span>
            </h1>

            <p className="mt-6 text-[15px] leading-[1.75] text-white/85 md:text-base">
              Cipher&apos;s detox billing services help addiction treatment centers and behavioral health programs bill
              medically supervised detoxification services with clean claims—hospital inpatient detox, residential detox,
              and outpatient detox—so your team is not buried in claim denials, auth delays, or inaccurate coding.
            </p>

            <ul className="mt-8 space-y-3">
              {trustBullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-white/80">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#166C96]/30 text-[#5eb5e0]"
                    aria-hidden
                  >
                    <i className="ri-check-line text-xs" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={SERVICE_TEL_HREF}
              suppressHydrationWarning
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-md bg-[#1a8fd4] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_28px_rgba(26,143,212,0.45)] ring-2 ring-[#5eb5e0]/40 transition hover:bg-[#166C96] hover:shadow-[0_10px_32px_rgba(22,108,150,0.55)]"
            >
              <i className="ri-phone-fill text-base" aria-hidden />
              Call now — {SERVICE_TEL_DISPLAY}
            </a>
          </div>

          <div
            id="get-started"
            className="rounded-xl border border-white/10 bg-[#0d1833]/95 p-6 shadow-2xl backdrop-blur-sm md:p-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5eb5e0]">Free consultation</p>
            <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-medium leading-snug text-white md:text-[1.65rem]">
              Request your detox billing review
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              Tell us about your detox program or treatment facilities. We&apos;ll review your detox billing setup
              against payer rules—so you see where gaps may be costing maximum reimbursement.
            </p>
            <div className="mt-6">
              <ServiceLandingLeadForm programLabel="Detox Billing Services" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
