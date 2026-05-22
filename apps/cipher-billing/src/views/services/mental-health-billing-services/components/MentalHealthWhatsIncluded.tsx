import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const includedServices = [
  {
    icon: "ri-shield-check-line",
    title: "Benefits verification",
    description:
      "Insurance verification and benefits verification before appointments—Cipher confirms mental health coverage with insurance companies so sessions bill to active benefits.",
  },
  {
    icon: "ri-code-box-line",
    title: "CPT & medical coding",
    description:
      "90834, 90837, 90791, and psychiatric E/M codes mapped to session length and provider type—billing coding aligned to ICD-10 and payer fee schedules.",
  },
  {
    icon: "ri-id-card-line",
    title: "Credentialing services",
    description:
      "Insurance credentialing for new psychologists psychiatrists therapists and nurse practitioners—panels active before health claims go out.",
  },
  {
    icon: "ri-loop-left-line",
    title: "Denial management",
    description:
      "Claim denial and unpaid claims worked through appeals—billing service help that protects your bottom line without extra admin staff.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Payment posting & A/R",
    description:
      "Payment posting, ERA reconciliation, and accounts receivable follow-up—patient billing and patient collections handled with clear reporting.",
  },
  {
    icon: "ri-file-search-line",
    title: "HIPAA & compliance",
    description:
      "HIPAA compliant processes and compliance HIPAA monitoring—OIG-aware billing practices so health claims meet regulatory expectations.",
  },
] as const;

export default function MentalHealthWhatsIncluded() {
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
            <span className="text-[#166C96]">Mental health billing services</span> for health practices
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Six revenue cycle workstreams for outpatient mental health—billing solutions that top mental health billing
            companies should offer, delivered as consulting services and daily operations support.
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
