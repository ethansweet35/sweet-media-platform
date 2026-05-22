import Link from "next/link";

import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const processSteps = [
  {
    num: "01",
    label: "Onboard",
    title: "Detox-specific onboarding",
    focus: "Clean claims from day one—not a generic billing handoff.",
    summary: "We audit H-code setup, revenue code 0116 mapping, authorization workflows, and payer contracts before scale.",
    details: [
      "H0008–H0014 crosswalk for your levels of care",
      "EHR or EMR admit/discharge alignment",
      "Prior auth and utilization management checklist",
    ],
  },
  {
    num: "02",
    label: "Manage",
    title: "Daily detox billing operations",
    focus: "Claim submission and payment posting aligned to census.",
    summary: "Cipher handles medical billing while clinical staff focus on patient care and medical supervision.",
    details: [
      "Authorization tracking for inpatient detox",
      "Claims filing with accurate billing codes",
      "Payment posting and patient billing support",
    ],
  },
  {
    num: "03",
    label: "Optimize",
    title: "Ongoing optimization",
    focus: "Denial trends, reporting analytics, and payer updates.",
    summary: "We help treatment centers maintain financial health and operational efficiency over time.",
    details: [
      "Denial management with root-cause fixes",
      "Appeal strategies for detox treatment denials",
      "A/R follow-up and step-down coding reviews",
    ],
  },
] as const;

export default function DetoxProcess() {
  return (
    <section id="detox-process" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="lg:self-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Process</p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
              How Cipher delivers <span className="text-[#166C96]">detox billing services</span>
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-slate-600">
              Onboard → Manage → Optimize. Management RCM for detox programs—not a one-size template from billing companies
              that treat addiction treatment as generic healthcare billing.
            </p>
            <p className="mt-4 text-[14px] leading-[1.6] text-slate-600">
              Services across hospital detox units, freestanding detox centers, and programs that also bill residential
              treatment and co-occurring mental health lines.
            </p>

            <ul className="mt-6 space-y-4 border-t border-slate-200/80 pt-6">
              {processSteps.map((step) => (
                <li key={step.num} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#166C96]/10 text-[#166C96]">
                    <i className="ri-check-line text-xs" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#101E3F]">
                      {step.label}: <span className="font-normal text-slate-600">{step.focus}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-[#166C96]/20 bg-white px-5 py-4">
              <p className="font-[var(--font-heading)] text-2xl font-medium text-[#101E3F]">30 days</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Target to first payment after onboarding
              </p>
            </div>

            <p className="mt-5 text-[13px] text-slate-500">
              <Link href="/our-process-2" className="font-semibold text-[#166C96] underline-offset-4 hover:underline">
                See our complete process →
              </Link>
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
            <ol>
              {processSteps.map((step, i) => (
                <li
                  key={step.num}
                  className={`flex gap-4 px-5 py-5 md:px-6 md:py-6 ${i > 0 ? "border-t border-slate-100" : ""}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#166C96] text-[11px] font-bold text-white">
                    {step.num}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#166C96]">{step.label}</p>
                    <p className="mt-0.5 font-[var(--font-heading)] text-base font-medium text-[#101E3F]">{step.title}</p>
                    <p className="mt-2 text-[13px] leading-[1.55] text-slate-600">{step.summary}</p>
                    <ul className="mt-3 space-y-2">
                      {step.details.map((item) => (
                        <li key={item} className="flex gap-2 text-[12px] leading-[1.55] text-slate-600">
                          <i className="ri-arrow-right-s-line mt-0.5 shrink-0 text-[#166C96]" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
