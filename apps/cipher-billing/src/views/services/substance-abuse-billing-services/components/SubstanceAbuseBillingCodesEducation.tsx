import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type CodeEntry = {
  code: string;
  title: string;
  body: string;
};

const hCodeEntries: readonly CodeEntry[] = [
  {
    code: "H0015",
    title: "Alcohol/drug services — IOP",
    body: "Common for intensive outpatient SUD treatment—per diem or program-based billing depending on payer and outpatient program design.",
  },
  {
    code: "H0018",
    title: "Short-term residential SUD",
    body: "Non-hospital residential substance abuse treatment, typically 1–30 days—often tied to ASAM Level 3.5 documentation.",
  },
  {
    code: "H0004",
    title: "BH counseling — 15 min",
    body: "Behavioral health counseling increments for outpatient substance abuse sessions when time-based billing applies.",
  },
  {
    code: "H0017",
    title: "Residential — per diem",
    body: "Per-day behavioral health residential rate for longer-stay abuse treatment—room and board excluded from program lines.",
  },
];

const cptEntries: readonly CodeEntry[] = [
  {
    code: "90834",
    title: "Psychotherapy, 45 minutes",
    body: "Individual counseling for SUD and co-occurring mental health—confirm payer bundling with program per diem rates.",
  },
  {
    code: "90837",
    title: "Psychotherapy, 60 minutes",
    body: "Longer psychotherapy sessions—Cipher maps 90834 vs 90837 rules to help avoid underbilling or denials.",
  },
  {
    code: "90853",
    title: "Group therapy",
    body: "Group therapy in outpatient addiction treatment—bill inside or outside bundled program rates per contract.",
  },
  {
    code: "H2036",
    title: "Program services",
    body: "Behavioral health program service lines when payers bundle outpatient SUD treatment as program-based care.",
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

export default function SubstanceAbuseBillingCodesEducation() {
  return (
    <section id="substance-abuse-billing-codes" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing codes</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            Substance abuse <span className="text-[#166C96]">billing codes</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            How to bill for substance abuse outpatient services and higher levels of care—HCPCS and CPT paths for
            treatment substance use programs across detox, residential, and outpatient settings.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid border-b border-slate-200/90 bg-[#F8FAFC] lg:grid-cols-2 lg:divide-x lg:divide-slate-200/90">
            <p className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] md:px-6">
              SUD HCPCS codes
            </p>
            <p className="border-t border-slate-100 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] lg:border-t-0 md:px-6">
              CPT &amp; program lines
            </p>
          </div>
          {hCodeEntries.map((hcpcs, index) => {
            const cpt = cptEntries[index]!;
            return (
              <div
                key={hcpcs.code}
                className="grid border-b border-slate-100 last:border-b-0 lg:grid-cols-2 lg:divide-x lg:divide-slate-100"
              >
                <CodeCell entry={hcpcs} />
                <div className="border-t border-slate-100 lg:border-t-0">
                  <CodeCell entry={cpt} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-slate-200/90 bg-white px-5 py-4 text-center text-[13px] leading-[1.65] text-slate-600 md:px-6">
          Cipher confirms accurate coding before claim submission—whether your center bills institutional UB-04 claims,
          professional CMS-1500 paths, or both for the same sud treatment program.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-[1.65] text-slate-500">
          See{" "}
          <a
            href="#substance-abuse-billing-requirements"
            className="font-semibold text-[#166C96] underline-offset-2 hover:underline"
          >
            compliance &amp; documentation requirements
          </a>{" "}
          for HIPAA, ASAM, and payer-specific rules.
        </p>
      </div>
    </section>
  );
}
