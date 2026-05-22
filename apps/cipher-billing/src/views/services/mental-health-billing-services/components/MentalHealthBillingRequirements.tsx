import {
  SERVICE_CONTAINER,
  SERVICE_SECTION_PY_COMPACT,
} from "@/views/services/components/servicePageConstants";

const requirementPoints = [
  {
    title: "Authorization & pre-cert",
    body: "Some Medicaid and commercial payers require authorization numbers for ongoing mental health treatment—Cipher tracks pre-certification so therapy sessions bill without preventable holds.",
  },
  {
    title: "Medical necessity",
    body: "Progress notes must support continued care—documentation errors are a top cause of health claims rejections for behavioral health services.",
  },
  {
    title: "Medicaid vs commercial",
    body: "Medicaid mental health billing often uses different codes, rates, and prior auth rules than commercial insurance billing—Cipher applies state-specific edits.",
  },
  {
    title: "Teletherapy compliance",
    body: "Virtual mental health services require HIPAA-compliant workflows plus payer telehealth policies—modifiers and POS must match the delivery model.",
  },
] as const;

const complianceNotes = [
  "HIPAA compliant data handling",
  "Benefits verification before care",
  "Credentialing for new providers",
  "Dual diagnosis coding review",
] as const;

export default function MentalHealthBillingRequirements() {
  return (
    <section id="mental-health-billing-requirements" className={`bg-white ${SERVICE_SECTION_PY_COMPACT}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Requirements</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2rem]">
            Mental health <span className="text-[#166C96]">billing requirements</span>
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-slate-600">
            Outpatient mental health billing demands strong documentation, payer-specific authorization, and compliance
            HIPAA standards—Cipher helps practices stay audit-ready before claims filing.
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
