import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type CodeEntry = {
  code: string;
  title: string;
  body: string;
};

const hCodeEntries: readonly CodeEntry[] = [
  {
    code: "S0201",
    title: "Partial hospitalization — per diem",
    body: "Primary HCPCS for many PHP per diem claims—partial hospitalization program services on institutional UB-04 bills.",
  },
  {
    code: "H0035",
    title: "Mental health PHP — under 24 hours",
    body: "Partial hospitalization treatment furnished less than a full day—pair with payer rules on minimum 4 hours per day.",
  },
  {
    code: "H0015",
    title: "Alcohol/drug PHP — per diem",
    body: "Substance use partial hospitalization per diem when the PHP program is billed as program services—paired with mental health PHP lines on many censuses.",
  },
  {
    code: "0912",
    title: "Revenue code — less intensive PHP",
    body: "Revenue code 0912 is used for behavioral health services in a less intensive partial hospitalization program when the payer requires it on the claim.",
  },
];

const cptEntries: readonly CodeEntry[] = [
  {
    code: "90832",
    title: "Psychotherapy, 30 minutes",
    body: "CPT psychotherapy for thirty-minute sessions—confirm whether the payer bundles into the PHP per diem.",
  },
  {
    code: "G0410",
    title: "Group therapy",
    body: "Group therapy billing for PHP group sessions when billed outside or inside the program rate.",
  },
  {
    code: "G0129",
    title: "Occupational therapy, 45 min",
    body: "Occupational therapy per forty-five-minute session when therapeutic services are separately reimbursable.",
  },
  {
    code: "90837",
    title: "Psychotherapy, 60 minutes",
    body: "Individual therapy alongside PHP—requires medical necessity and payer approval when not in the per diem.",
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

export default function PhpBillingCodesEducation() {
  return (
    <section id="php-billing-codes" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing codes</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            PHP <span className="text-[#166C96]">billing codes</span>: CPT and HCPCS
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            How CPT and HCPCS apply to behavioral health partial hospitalization—billing codes for PHP services rendered
            in your hospitalization program, mapped to revenue codes and per diem rules.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid border-b border-slate-200/90 bg-[#F8FAFC] lg:grid-cols-2 lg:divide-x lg:divide-slate-200/90">
            <p className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] md:px-6">
              HCPCS &amp; revenue codes
            </p>
            <p className="border-t border-slate-100 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] lg:border-t-0 md:px-6">
              CPT for PHP services
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
          Cipher confirms CPT and HCPCS bundling before you bill psychotherapy or group therapy separately from PHP program
          services—protecting billing accuracy on every claim.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-[1.65] text-slate-500">
          Bill type codes 131 and 132 track admission context from inpatient plans. See{" "}
          <a href="#php-billing-requirements" className="font-semibold text-[#166C96] underline-offset-2 hover:underline">
            PHP billing requirements
          </a>{" "}
          for certification, hours, and compliance rules.
        </p>
      </div>
    </section>
  );
}
