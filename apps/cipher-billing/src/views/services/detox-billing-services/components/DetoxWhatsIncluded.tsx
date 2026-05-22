import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const includedServices = [
  {
    icon: "ri-shield-check-line",
    title: "Insurance verification",
    description:
      "Benefits verification and insurance verification before detox admission—Cipher confirms SUD and mental health carve-outs with insurance providers so detoxification services bill to active coverage.",
  },
  {
    icon: "ri-code-box-line",
    title: "HCPCS & CPT coding",
    description:
      "H0008–H0014 H-codes, revenue code 0116, and institutional bill types—billing coding and medical coding aligned to ICD-10 codes and payer-specific cpt hcpcs edits.",
  },
  {
    icon: "ri-file-shield-line",
    title: "Prior authorization",
    description:
      "Pre-certification for inpatient detox and residential step-downs—payer requirements tracked so claims submitted meet medical necessity thresholds.",
  },
  {
    icon: "ri-loop-left-line",
    title: "Denial management",
    description:
      "Claim denials and claim rejections worked through appeals—denial management that protects financial stability without adding billing staff burden.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Payment posting & A/R",
    description:
      "Payment posting, ERA reconciliation, and accounts receivable follow-up—patient billing support so care patients are not lost in collections backlogs.",
  },
  {
    icon: "ri-file-search-line",
    title: "HIPAA & compliance",
    description:
      "Coding compliance and HIPAA-aligned processes—outsourced billing services that meet healthcare providers' regulatory expectations for treatment medical records.",
  },
] as const;

export default function DetoxWhatsIncluded() {
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
            <span className="text-[#166C96]">Detox billing services</span> for treatment centers
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Six revenue cycle workstreams for medical detox and sud billing—billing solutions treatment providers expect
            from specialized health billing partners.
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
