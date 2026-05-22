import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type CodeEntry = {
  code: string;
  title: string;
  body: string;
};

const hCodeEntries: readonly CodeEntry[] = [
  {
    code: "H0017",
    title: "Behavioral health residential — per diem",
    body: "HCPCS Level II per-day rate for behavioral health residential services—program treatment only; room and board costs are excluded from H0017 billing.",
  },
  {
    code: "H0018",
    title: "Short-term residential (1–30 days)",
    body: "Non-hospital short-term residential treatment—often requires ASAM Level 3.5 documentation for substance use programs; mental health residential may follow parallel payer rules.",
  },
  {
    code: "H0019",
    title: "Long-term residential (30+ days)",
    body: "Non-hospital long-term residential behavioral health—room and board are not included under H0019 program billing codes.",
  },
  {
    code: "POS 55",
    title: "Place of service — residential",
    body: "Place of service code 55 identifies a residential substance use treatment facility on professional claims; mental health residential sites follow payer-specific POS rules when required.",
  },
];

const cptEntries: readonly CodeEntry[] = [
  {
    code: "90837",
    title: "Psychotherapy, 60 minutes",
    body: "Individual counseling when billed outside the residential per diem—confirm payer bundling rules for concurrent sessions.",
  },
  {
    code: "90834",
    title: "Psychotherapy, 45 minutes",
    body: "Shorter psychotherapy sessions—many insurers distinguish 90834 vs 90837 reimbursement; Cipher maps the correct code.",
  },
  {
    code: "90853",
    title: "Group therapy",
    body: "Group therapy in residential settings—bill alongside or within per diem depending on payer and treatment services design.",
  },
  {
    code: "H0004",
    title: "BH counseling, 15 minutes",
    body: "Behavioral health counseling increments when payers allow time-based billing outside the residential program rate.",
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

export default function ResidentialBillingCodesEducation() {
  return (
    <section id="residential-billing-codes" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing codes</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            Residential <span className="text-[#166C96]">HCPCS codes</span> &amp; CPT
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            How CPT and HCPCS apply to services residential treatment centers bill—mapped to the procedure coding system
            rules insurers expect on mental health and addiction treatment programs.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid border-b border-slate-200/90 bg-[#F8FAFC] lg:grid-cols-2 lg:divide-x lg:divide-slate-200/90">
            <p className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] md:px-6">
              Residential HCPCS codes
            </p>
            <p className="border-t border-slate-100 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] lg:border-t-0 md:px-6">
              CPT for treatment services
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
          Modifiers UC (care coordination), UD (PACT team), and HD (pregnant/parenting programs) may apply on select
          claims—Cipher confirms CPT and HCPCS combinations before submission.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-[1.65] text-slate-500">
          See{" "}
          <a
            href="#residential-billing-requirements"
            className="font-semibold text-[#166C96] underline-offset-2 hover:underline"
          >
            residential billing requirements
          </a>{" "}
          for ASAM, documentation, and authorization rules.
        </p>
      </div>
    </section>
  );
}
