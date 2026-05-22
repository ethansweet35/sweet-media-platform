import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const includedServices = [
  {
    icon: "ri-shield-check-line",
    title: "Insurance verification",
    description:
      "Verify patient insurance and benefits before admission—Cipher confirms SUD coverage with insurance companies so treatment services bill against active plans.",
  },
  {
    icon: "ri-code-box-line",
    title: "SUD coding & claim submission",
    description:
      "HCPCS and CPT mapped across detox, residential, PHP, and outpatient abuse treatment—accurate coding based on payer crosswalks, not generic medical billing templates.",
  },
  {
    icon: "ri-file-shield-line",
    title: "Auth & utilization review",
    description:
      "Prior authorization and concurrent review for substance disorder programs—assessment documentation aligned to ASAM and payer medical necessity rules.",
  },
  {
    icon: "ri-loop-left-line",
    title: "Denial management",
    description:
      "Claim denials worked through appeals with root-cause fixes—reimbursement services that help avoid repeat edits on the same abuse billing issues.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Payment posting & A/R",
    description:
      "Daily posting, ERA reconciliation, and A/R follow-up—stabilizing cash flow for addiction treatment centers and co-occurring mental health programs.",
  },
  {
    icon: "ri-file-search-line",
    title: "Compliance & reporting",
    description:
      "HIPAA-aligned billing processes, documentation reviews, and denial trend reporting—staying compliant without pulling clinicians into administrative tasks.",
  },
] as const;

export default function SubstanceAbuseWhatsIncluded() {
  return (
    <section className={`bg-white ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">What&apos;s included</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            <span className="text-[#166C96]">Substance abuse billing services</span> for treatment centers
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Six revenue cycle workstreams for SUD treatment—substance abuse billing, practice management support, and
            denial patterns generic billing providers rarely own for addiction treatment facilities.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {includedServices.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-6 transition hover:border-[#166C96]/35 hover:shadow-sm md:p-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#166C96]/30 bg-white text-[#166C96]">
                <i className={`${item.icon} text-xl leading-none`} aria-hidden />
              </span>
              <h3 className="mt-5 font-[var(--font-heading)] text-lg font-medium leading-snug text-[#101E3F]">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
