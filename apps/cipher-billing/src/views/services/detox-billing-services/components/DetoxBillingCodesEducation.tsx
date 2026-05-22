import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type CodeEntry = {
  code: string;
  title: string;
  body: string;
};

const hCodeEntries: readonly CodeEntry[] = [
  {
    code: "H0008",
    title: "Sub-acute detox — hospital inpatient",
    body: "HCPCS for sub-acute detoxification in hospital inpatient settings—typically with revenue code 0116 on institutional claims and 24/7 medical supervision documentation.",
  },
  {
    code: "H0009",
    title: "Acute detox — hospital inpatient",
    body: "Acute inpatient detox when withdrawal severity requires higher-intensity hospital care—pair with correct bill type and admission status.",
  },
  {
    code: "H0010",
    title: "Sub-acute detox — residential",
    body: "Non-hospital residential sub-acute detox—distinct from hospital inpatient detox; confirm payer allows residential detox vs inpatient only.",
  },
  {
    code: "H0011",
    title: "Acute detox — residential",
    body: "Acute residential detox program lines—ASAM level and length-of-stay rules apply before per diem billing continues.",
  },
];

const pairedEntries: readonly CodeEntry[] = [
  {
    code: "0116",
    title: "Revenue code — inpatient detox",
    body: "UB-04 revenue code 0116 identifies inpatient detoxification for substance abuse treatment—used with institutional inpatient detox claims alongside appropriate HCPCS.",
  },
  {
    code: "H0012",
    title: "Sub-acute detox — ambulatory",
    body: "Ambulatory detox is detoxification undertaken with medical professional oversight outside a 24-hour facility—documentation must support medical necessity.",
  },
  {
    code: "H0013",
    title: "Acute detox — ambulatory",
    body: "Higher-acuity ambulatory detox—Cipher confirms payer coverage for outpatient detox vs facility-based care.",
  },
  {
    code: "H0014",
    title: "Detox per diem / program",
    body: "Program-based detox per diem when contracts bundle outpatient detox services—coordinate with concurrent mental health treatment billing.",
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

export default function DetoxBillingCodesEducation() {
  return (
    <section id="detox-billing-codes" className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Billing codes</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            Detox <span className="text-[#166C96]">HCPCS codes</span> &amp; CPT
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Main billing codes for addiction treatment detox—H-codes (CPT/HCPCS codes beginning with H), institutional
            revenue lines, and services codes payers expect on medical detox and sud treatment claims.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid border-b border-slate-200/90 bg-[#F8FAFC] lg:grid-cols-2 lg:divide-x lg:divide-slate-200/90">
            <p className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] md:px-6">
              Detox HCPCS (H0008–H0011)
            </p>
            <p className="border-t border-slate-100 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96] lg:border-t-0 md:px-6">
              Revenue &amp; ambulatory lines
            </p>
          </div>
          {hCodeEntries.map((hcpcs, index) => {
            const paired = pairedEntries[index]!;
            return (
              <div
                key={hcpcs.code}
                className="grid border-b border-slate-100 last:border-b-0 lg:grid-cols-2 lg:divide-x lg:divide-slate-100"
              >
                <CodeCell entry={hcpcs} />
                <div className="border-t border-slate-100 lg:border-t-0">
                  <CodeCell entry={paired} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-slate-200/90 bg-white px-5 py-4 text-center text-[13px] leading-[1.65] text-slate-600 md:px-6">
          CPT codes are five-digit alphanumeric strings describing medical services; HCPCS codes are maintained by CMS for
          programs like Medicare Medicaid. Cipher confirms accurate coding before claim submission—whether your center
          bills institutional UB-04, professional CMS-1500, or both for the same detox program.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-[1.65] text-slate-500">
          See{" "}
          <a
            href="#detox-billing-requirements"
            className="font-semibold text-[#166C96] underline-offset-2 hover:underline"
          >
            detox billing requirements
          </a>{" "}
          for medical necessity, authorization, and dual-diagnosis rules.
        </p>
      </div>
    </section>
  );
}
