import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type CodeEntry = {
  code: string;
  title: string;
  body: string;
};

const hCodeEntries: readonly CodeEntry[] = [
  {
    code: "S9480",
    title: "Intensive outpatient psychiatric services — per diem",
    body: "Medicare and commercial IOP for mental health and substance use—psychiatric program services (S9480) billed per diem when the day meets payer definitions.",
  },
  {
    code: "H0015",
    title: "Alcohol and/or drug services — IOP",
    body: "Substance use IOP services, often per diem when the payer treats the day as program services—not a single visit.",
  },
  {
    code: "H2036",
    title: "Behavioral health program service",
    body: "Medicaid and commercial structured outpatient treatment—map to the active fee schedule and contract.",
  },
  {
    code: "H0004",
    title: "Behavioral health counseling / therapy (15 min)",
    body: "When therapy is outside a bundled IOP per diem; documentation must show it is distinct from program hours.",
  },
];

const cptEntries: readonly CodeEntry[] = [
  {
    code: "90853",
    title: "Group psychotherapy",
    body: "IOP group therapy as professional outpatient services—confirm bundling into the per diem vs separate payment.",
  },
  {
    code: "90834",
    title: "Psychotherapy, 45 minutes",
    body: "Session 45 minutes or more (under 60). Separate psychotherapy when payers allow it alongside program services.",
  },
  {
    code: "90837",
    title: "Psychotherapy, 60 minutes",
    body: "Individual therapy within or alongside IOP—medical necessity and auth when not included in the program rate.",
  },
  {
    code: "96130",
    title: "Psychological testing evaluation",
    body: "CPT code 96130 (and add-on 96131) when testing is distinct from the IOP per diem—bundling rules vary by payer.",
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

export default function IopBillingCodesEducation() {
  return (
    <section id="iop-billing-codes" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Education</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            IOP billing codes: <span className="text-[#166C96]">HCPCS and CPT</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Whether you are mapping HCPCS or CPT for an intensive outpatient program, this reference explains how billing
            codes fit together for mental health and substance use IOP services—and when each may apply under your
            payer&apos;s billing
            requirements.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid border-b border-slate-200/90 bg-[#F8FAFC] lg:grid-cols-2 lg:divide-x lg:divide-slate-200/90">
            <p className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] md:px-6">
              HCPCS codes &amp; program services
            </p>
            <p className="border-t border-slate-100 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] lg:border-t-0 md:px-6">
              CPT codes for IOP services
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
          Many payers bundle group and individual psychotherapy into the IOP per diem. Cipher confirms HCPCS and CPT
          bundling rules before billing CPT codes separately from program services.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-[1.65] text-slate-500">
          Institutional intensive outpatient claims often pair HCPCS codes with revenue code{" "}
          <span className="font-mono font-semibold text-[#166C96]">0905</span> (intensive outpatient services—psychiatric)
          and Medicare condition code <span className="font-mono font-semibold text-[#166C96]">92</span> on UB-04 hospital
          outpatient claims. Under OPPS, Medicare uses APCs based on program services furnished per day. Cipher maps the
          full IOP billing codes crosswalk—including when to use HCPCS or CPT on the same outpatient program. See{" "}
          <a href="#iop-billing-requirements" className="font-semibold text-[#166C96] underline-offset-2 hover:underline">
            IOP billing requirements
          </a>{" "}
          for Medicare coverage and documentation rules.
        </p>
      </div>
    </section>
  );
}
