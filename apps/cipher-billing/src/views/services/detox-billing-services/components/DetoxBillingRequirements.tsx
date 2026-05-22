import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";

const requirementPoints = [
  {
    title: "Prior authorization",
    body: "Inpatient detox and many residential stays need pre-authorization—Cipher tracks authorization numbers and concurrent review so detox services bill without preventable holds.",
  },
  {
    title: "Medical necessity",
    body: "Withdrawal risk, vitals, nursing notes, and physician orders must support medically necessary detox—documentation errors are a top cause of insurance claims rejections.",
  },
  {
    title: "Medicare Medicaid vs commercial",
    body: "Medicaid detox billing uses state-specific edits and rates; commercial plans vary by contract—Cipher applies payer requirements at verification and claim submission.",
  },
  {
    title: "Dual diagnosis compliance",
    body: "Concurrent detox and mental health treatment needs separate auth and diagnosis codes where required—billing requirements differ by payer for co-occurring care.",
  },
] as const;

const complianceNotes = [
  "HIPAA-compliant outsourced billing",
  "Benefits verification before admit",
  "Utilization management support",
  "Level-of-care transition coding",
] as const;

export default function DetoxBillingRequirements() {
  return (
    <section id="detox-billing-requirements" className={`bg-white ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Requirements</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            Detox <span className="text-[#166C96]">billing requirements</span>
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Medical detox billing demands strong clinical documentation, payer-specific authorization, and coding
            compliance—Cipher helps treatment facilities stay audit-ready before claims filing.
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
