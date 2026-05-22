import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";

const requirementPoints = [
  {
    title: "Hours & medical necessity",
    body: "Many insurers require a minimum of four hours of programming per day and twenty hours per week. Physician certification of necessity and treatment plans must support continued PHP level of care.",
  },
  {
    title: "Recertification timeline",
    body: "First PHP recertification is typically signed on day eighteen of partial hospitalization; subsequent documents follow thirty-day intervals, signed by a physician or clinical therapist.",
  },
  {
    title: "Insurance & Medicare",
    body: "Medicare and commercial insurance coverage apply when documentation and billing guidelines are met. ACA plans in participating states must cover mental health and substance use disorder PHP treatment benefits.",
  },
  {
    title: "Dual diagnosis rules",
    body: "Patients with co-occurring mental health and substance use diagnoses may be limited to one billable PHP session per day—pre-bill checks prevent duplicate claims.",
  },
] as const;

const complianceNotes = [
  "Bill type 132: interim first admission to PHP",
  "Bill type 131: admission from inpatient discharge",
  "Revenue code 0912 for less intensive PHP where required",
  "Documentation requirements aligned to payer billing guidelines",
] as const;

export default function PhpBillingRequirements() {
  return (
    <section id="php-billing-requirements" className={`bg-white ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing requirements</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            PHP <span className="text-[#166C96]">billing requirements</span> &amp; compliance
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Partial hospitalization programs require payer-specific documentation, certification, and billing codes—Cipher
            aligns your health facility to industry standards before services are rendered.
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
