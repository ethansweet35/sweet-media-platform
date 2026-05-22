import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type CodeEntry = {
  code: string;
  title: string;
  body: string;
};

const psychotherapyEntries: readonly CodeEntry[] = [
  {
    code: "90791",
    title: "Psychiatric diagnostic evaluation",
    body: "Initial evaluation for psychiatrists and some therapists—often requires distinct documentation from ongoing psychotherapy.",
  },
  {
    code: "90834",
    title: "Psychotherapy, 45 minutes",
    body: "Common therapy code for psychologists psychiatrists and licensed counselors—session length must match note time.",
  },
  {
    code: "90837",
    title: "Psychotherapy, 60 minutes",
    body: "Extended session billing—payers compare 90834 vs 90837 reimbursement; Cipher applies the correct code per documentation.",
  },
  {
    code: "90853",
    title: "Group psychotherapy",
    body: "Group therapy for mental health programs—verify payer rules for group size and licensed facilitator requirements.",
  },
];

const additionalEntries: readonly CodeEntry[] = [
  {
    code: "99213+",
    title: "E/M with psychotherapy",
    body: "Psychiatric practices may bill evaluation and management with psychotherapy when medical necessity supports both on the same date.",
  },
  {
    code: "90832",
    title: "Psychotherapy, 30 minutes",
    body: "Shorter session increments—often used in intensive outpatient or partial programs when billed separately.",
  },
  {
    code: "96130",
    title: "Psych testing / eval",
    body: "Psychological testing codes require separate authorization and documentation on many commercial and Medicaid plans.",
  },
  {
    code: "Modifiers",
    title: "Telehealth (95, GT)",
    body: "Teletherapy claims need correct POS and telehealth modifiers—compliance requirements vary by payer and state.",
  },
];

function CodeCell({ entry }: { entry: CodeEntry }) {
  return (
    <div className="flex h-full gap-4 px-5 py-5 md:px-6">
      <span className="w-14 shrink-0 font-mono text-sm font-semibold leading-snug text-[#166C96] md:w-16">{entry.code}</span>
      <div className="min-w-0 flex-1">
        <p className="font-[var(--font-heading)] text-[15px] font-medium leading-snug text-[#101E3F]">{entry.title}</p>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-600">{entry.body}</p>
      </div>
    </div>
  );
}

export default function MentalHealthBillingCodesEducation() {
  return (
    <section id="mental-health-billing-codes" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">CPT codes</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            Common <span className="text-[#166C96]">mental health billing codes</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            CPT codes for therapy and psychiatry—how billing mental health services differs from other health services
            when session length, provider type, and telehealth rules apply.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid border-b border-slate-200/90 bg-[#F8FAFC] lg:grid-cols-2 lg:divide-x lg:divide-slate-200/90">
            <p className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] md:px-6">
              Psychotherapy CPT codes
            </p>
            <p className="border-t border-slate-100 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] lg:border-t-0 md:px-6">
              Psychiatry &amp; telehealth
            </p>
          </div>
          {psychotherapyEntries.map((left, index) => {
            const right = additionalEntries[index]!;
            return (
              <div
                key={left.code}
                className="grid border-b border-slate-100 last:border-b-0 lg:grid-cols-2 lg:divide-x lg:divide-slate-100"
              >
                <CodeCell entry={left} />
                <div className="border-t border-slate-100 lg:border-t-0">
                  <CodeCell entry={right} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-slate-200/90 bg-white px-5 py-4 text-center text-[13px] leading-[1.65] text-slate-600 md:px-6">
          Cipher maps CPT codes to your credential level and payer contracts—supporting clean claims across solo
          therapists, group practices, and psychiatric billing workflows.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-[1.65] text-slate-500">
          See{" "}
          <a
            href="#mental-health-billing-requirements"
            className="font-semibold text-[#166C96] underline-offset-2 hover:underline"
          >
            billing requirements
          </a>{" "}
          for authorization, HIPAA, and teletherapy compliance.
        </p>
      </div>
    </section>
  );
}
