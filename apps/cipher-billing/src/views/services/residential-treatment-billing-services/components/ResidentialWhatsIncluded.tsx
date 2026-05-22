import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const includedServices = [
  {
    icon: "ri-shield-check-line",
    title: "VOB & admission auth",
    description:
      "Coverage verified with insurance companies before patients admit—so treatment billing starts with active authorization and correct inpatient benefits.",
  },
  {
    icon: "ri-code-box-line",
    title: "HCPCS & CPT claims",
    description:
      "H0017, H0018, H0019, and psychotherapy CPT mapped to your residential program—healthcare common procedure coding system rules applied per payer, not one generic template.",
  },
  {
    icon: "ri-file-shield-line",
    title: "ASAM & UR management",
    description:
      "ASAM assessments, treatment plan updates, and concurrent review tracked so substance use disorder and mental health residential levels stay billable.",
  },
  {
    icon: "ri-loop-left-line",
    title: "Denial management",
    description:
      "Insurance claims worked through appeals when documentation or coding can be corrected—recoverable revenue is not written off by default.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Payment posting & A/R",
    description:
      "Daily posting, ERA reconciliation, and follow-up on residential claims until paid—stabilizing cash flow for addiction treatment and mental health facilities.",
  },
  {
    icon: "ri-file-search-line",
    title: "Compliance & audits",
    description:
      "Documentation reviews for place of service 55, modifiers (UC, UD, HD), room-and-board exclusions, and LOC transitions—staying compliant built into the billing process.",
  },
] as const;

export default function ResidentialWhatsIncluded() {
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
            <span className="text-[#166C96]">Residential treatment billing services</span> for treatment centers
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Six revenue cycle workstreams for behavioral health residential programs—medical billing, utilization review, and
            denial patterns that standard billing companies rarely own for mental health and addiction treatment facilities.
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
