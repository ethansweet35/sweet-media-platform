import Link from "next/link";

import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const processSteps = [
  {
    num: "01",
    label: "Onboard",
    title: "IOP-specific onboarding",
    focus: "Audit-ready before your first institutional claim hits the payer.",
    summary: "We review your billing setup before IOP claims go live—not after denials start.",
    details: [
      "H-code and payer crosswalk (HCPCS, revenue code 0905, condition code 92)",
      "IOP billing requirements, documentation, and level-of-care templates",
      "UB-04 vs CMS-1500 routing and VOB workflow for admissions",
    ],
  },
  {
    num: "02",
    label: "Manage",
    title: "Daily UR workflow",
    focus: "Authorization and billing stay aligned to your census week to week.",
    summary: "Cipher works alongside clinical staff while the program is running.",
    details: [
      "Daily utilization review and payer communication",
      "Weekly authorization renewal tracking on billed dates",
      "Pre-bill validation on every institutional IOP claim",
    ],
  },
  {
    num: "03",
    label: "Optimize",
    title: "Ongoing optimization",
    focus: "Denials and payer changes handled without losing momentum on cash flow.",
    summary: "We tighten the cycle as rules change and your census grows.",
    details: [
      "Denial trend reviews with root-cause fixes at the source",
      "Medicare IOP and commercial policy updates on your crosswalks",
      "A/R follow-up and medical appeals when payers push back",
    ],
  },
] as const;

export default function IopProcess() {
  return (
    <section id="iop-process" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="lg:self-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#166C96]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Process</p>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
              How Cipher delivers <span className="text-[#166C96]">IOP billing services</span>
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-slate-600">
              Onboard → Manage → Optimize. Our engagement model, condensed for intensive outpatient program revenue cycle
              work—not a generic handoff after the first week of IOP services claims.
            </p>
            <p className="mt-4 text-[14px] leading-[1.6] text-slate-600">
              Cipher stays involved from HCPCS and CPT crosswalk review through daily UR and ongoing denial management, so
              your clinical and billing teams are not rebuilding payer requirements every time census shifts.
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
