import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const includedServices = [
  {
    icon: "ri-shield-check-line",
    title: "IOP VOB & eligibility",
    description:
      "Benefits and Medicare coverage for IOP services verified before patients start—so admissions are not held up by slow eligibility turnaround.",
  },
  {
    icon: "ri-code-box-line",
    title: "H-code claims management",
    description:
      "S9480, H0015, and other HCPCS codes with revenue code 0905—program services and service units aligned to payer crosswalks, not generic outpatient claim paths.",
  },
  {
    icon: "ri-file-shield-line",
    title: "Auth & UR management",
    description:
      "Prior authorization, concurrent review, and extensions tied to your treatment plan and the program days you bill.",
  },
  {
    icon: "ri-loop-left-line",
    title: "Denial management",
    description:
      "Every denial and return is worked with appeals and root-cause fixes—recoverable revenue is not written off by default.",
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Payment posting & A/R",
    description:
      "Daily posting, ERA reconciliation, and follow-up on outstanding IOP claims until they are paid or exhausted.",
  },
  {
    icon: "ri-file-search-line",
    title: "Compliance & audit-readiness",
    description:
      "Documentation and coding reviews against IOP billing requirements—Medicare condition code 92, audits, and IOP/PHP overlap risk for mental health and substance use programs.",
  },
] as const;

export default function IopWhatsIncluded() {
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
            <span className="text-[#166C96]">IOP billing services</span> for mental health &amp; addiction programs
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Six workstreams built for behavioral health intensive outpatient programs—mental health and substance use IOP
            billing, institutional claims, and IOP services
            authorization, and denial patterns standard outpatient billing rarely sees.
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
