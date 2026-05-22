import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const includedServices = [
  {
    icon: "ri-shield-check-line",
    title: "PHP VOB & eligibility",
    description:
      "Insurance coverage and Medicare benefits for partial hospitalization verified before patients receive services—protecting timely reimbursement on admissions.",
  },
  {
    icon: "ri-code-box-line",
    title: "HCPCS & CPT claims management",
    description:
      "S0201, H0015, H0035, and revenue code 0912 mapped to your per diem PHP program—CPT and HCPCS aligned to payer crosswalks, not generic IOP or office billing.",
  },
  {
    icon: "ri-file-shield-line",
    title: "Auth & recertification",
    description:
      "Physician certification, day-eighteen recertification, and thirty-day renewals tracked so PHP treatment plans stay billable under payer documentation requirements.",
  },
  {
    icon: "ri-loop-left-line",
    title: "Denial management",
    description:
      "Claim submissions worked through appeals with billing accuracy in mind—recoverable revenue is not written off when documentation or coding can be corrected.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Payment posting & A/R",
    description:
      "Recurring billing cycles, ERA reconciliation, and A/R follow-up on institutional PHP claims—stabilizing cash flow for health facilities.",
  },
  {
    icon: "ri-file-search-line",
    title: "Compliance & audit-readiness",
    description:
      "Reviews against PHP billing guidelines, bill types 131/132, dual-diagnosis session limits, and PHP-to-IOP step-down overlap—behavioral health compliance built into the billing process.",
  },
] as const;

export default function PhpWhatsIncluded() {
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
            <span className="text-[#166C96]">PHP billing services</span> for behavioral health facilities
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Six revenue cycle management workstreams for mental health and substance use partial hospitalization—medical
            billing, program
            billing, and denial patterns that standard practice management teams rarely own end to end.
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
