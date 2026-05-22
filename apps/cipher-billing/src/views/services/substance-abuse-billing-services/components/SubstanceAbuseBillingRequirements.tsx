import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";

const requirementPoints = [
  {
    title: "HIPAA & patient data",
    body: "Substance abuse facilities must protect patient data through HIPAA-compliant billing systems and workflows—Cipher aligns processes so PHI stays secure across verification, claim submission, and reporting.",
  },
  {
    title: "ASAM & assessment",
    body: "Many payers require ASAM level-of-care assessment and ongoing clinical notes supporting continued abuse treatment—documentation must match services rendered each date of service.",
  },
  {
    title: "State regulations",
    body: "State-specific rules impact substance abuse treatment billing and coding—Cipher applies local payer edits alongside federal and commercial guidelines for treatment facilities nationwide.",
  },
  {
    title: "Dual diagnosis",
    body: "Co-occurring mental health and substance use disorder treatment must follow bundling rules—pre-bill checks help avoid duplicate-day denials when both disorder types are active.",
  },
] as const;

const complianceNotes = [
  "Insurance verification before admission",
  "Prior authorization on level-of-care changes",
  "Medication management coded per payer contract",
  "Telehealth POS/modifier rules for virtual SUD care",
] as const;

export default function SubstanceAbuseBillingRequirements() {
  return (
    <section id="substance-abuse-billing-requirements" className={`bg-white ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Compliance</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            Substance abuse <span className="text-[#166C96]">billing requirements</span>
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Addiction treatment billing demands HIPAA alignment, strong documentation, and payer-specific abuse billing
            rules—Cipher helps treatment centers stay compliant before insurance claims leave your practice.
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
