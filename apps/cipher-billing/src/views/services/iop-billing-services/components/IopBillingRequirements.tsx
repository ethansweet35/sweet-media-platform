import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";

const requirementPoints = [
  {
    title: "Hours & level of care",
    body: "Typically 9+ hours per week (often 9–19). PHP is 20+. Billing must match the level billed.",
  },
  {
    title: "Medicare coverage",
    body: "Part B IOP effective Jan 1, 2024. UB-04 with condition code 92, revenue code 0905, and HCPCS—not CMS-1500 for facility program services.",
  },
  {
    title: "OPPS & service units",
    body: "Per diem under OPPS with APCs by program services per day. HOPDs report line-item dates of service per revenue code.",
  },
  {
    title: "Sites & modifiers",
    body: "HOPDs, CAHs, CMHCs, RHCs, FQHCs, and OTPs. Off-campus provider-based sites may need modifier PN.",
  },
] as const;

const complianceNotes = [
  "Medical necessity & weekly hours on the treatment plan",
  "IOP/PHP overlap within seven days—pre-bill checks",
  "Group vs individual bundling rules",
  "Telehealth place-of-service & modifiers",
] as const;

export default function IopBillingRequirements() {
  return (
    <section id="iop-billing-requirements" className={`bg-white ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing requirements</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            <span className="text-[#166C96]">Medicare coverage</span> &amp; IOP billing requirements
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Mental health and substance use IOP services follow payer-specific rules—Medicare, Medicaid, and commercial.
            Cipher aligns your
            intensive outpatient program to billing requirements before claims hit the payment system.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {requirementPoints.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200/90 bg-[#F8FAFC] px-4 py-4"
            >
              <h3 className="font-[var(--font-heading)] text-[15px] font-medium leading-snug text-[#101E3F]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-slate-200/80 pt-6">
          {complianceNotes.map((note) => (
            <li key={note} className="flex items-center gap-2 text-[12px] text-slate-600">
              <i className="ri-check-line shrink-0 text-sm text-[#166C96]" aria-hidden />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
