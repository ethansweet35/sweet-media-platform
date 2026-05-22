import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";

const requirementPoints = [
  {
    title: "ASAM & medical necessity",
    body: "Substance use and co-occurring mental health residential programs often require ASAM Level 3.5 for H0018 where applicable. Medical necessity criteria from MCG Health and ASAM must support continued inpatient care.",
  },
  {
    title: "Authorization on LOC changes",
    body: "Any change in level of care—including transition within the same agency—requires a new authorization number before patients receive services at the new LOC.",
  },
  {
    title: "Documentation standards",
    body: "Records must include date of service, provider credentials, length of service, and clinical notes tied to the treatment plan—aligned to payer regulations.",
  },
  {
    title: "Room & board exclusions",
    body: "H0017, H0018, and H0019 cover program treatment—not lodging. Billing room and board under residential HCPCS codes triggers audits and claim denials.",
  },
] as const;

const complianceNotes = [
  "Place of service 55 for residential mental health & substance use sites",
  "ASAM assessment documentation when applicable",
  "Per diem H0017 excludes room and board costs",
  "Electronic health record exports matched to billed dates",
] as const;

export default function ResidentialBillingRequirements() {
  return (
    <section id="residential-billing-requirements" className={`bg-white ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing requirements</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            Residential <span className="text-[#166C96]">billing requirements</span> &amp; compliance
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Inpatient residential programs demand payer-specific documentation and HCPCS codes—Cipher aligns your treatment
            facility before insurance claims are submitted.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {requirementPoints.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200/90 bg-[#F8FAFC] px-4 py-4">
              <h3 className="font-[var(--font-heading)] text-[15px] font-medium leading-snug text-[#101E3F]">{item.title}</h3>
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
