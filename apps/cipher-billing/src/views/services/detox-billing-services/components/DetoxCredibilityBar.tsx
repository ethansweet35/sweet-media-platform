import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const painPoints = [
  {
    icon: "ri-shield-cross-line",
    title: "Auth & medical necessity",
    body: "Inpatient detox and residential detox often require prior authorization—when insurance verification slips, detox services bill against inactive coverage or wrong level-of-care rules.",
  },
  {
    icon: "ri-code-box-line",
    title: "H-code & revenue complexity",
    body: "Detox billing codes span H0008–H0014, revenue code 0116, and institutional vs professional paths—sub-acute vs acute and hospital vs ambulatory mismatches drive disorder billing denials.",
  },
  {
    icon: "ri-close-circle-line",
    title: "Denials that stall revenue",
    body: "Weak withdrawal documentation, AMA discharges without proper coding, and dual-diagnosis bundling errors hurt financial performance at treatment centers focused on quality care.",
  },
] as const;

const trustSignals = [
  "Behavioral health RCM only",
  "Hospital & residential detox",
  "Co-occurring mental health billing",
] as const;

export default function DetoxCredibilityBar() {
  return (
    <section className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="lg:py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
              The detox billing challenge
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
              Medical detox billing is not routine facility billing
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              Addiction treatment detox requires 24/7 medical supervision for alcohol and drug withdrawal that can be
              life-threatening—payers scrutinize medical necessity, ASAM level, and documentation more than standard
              abuse treatment stays.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              <span className="font-semibold text-[#101E3F]">Cipher</span> is a billing company focused on revenue cycle
              management for detox programs—detox billing services are core to our business, not a general medical billing
              add-on.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Cipher credentials">
              {trustSignals.map((label) => (
                <li key={label}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#166C96]/25 bg-white px-3.5 py-2 text-[11px] font-semibold leading-none text-[#166C96]">
                    <i className="ri-check-line text-xs" aria-hidden />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
              {painPoints.map((item) => (
                <li key={item.title} className="flex min-h-[5.75rem] gap-4 px-5 py-5 md:px-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/10 text-[#166C96]">
                    <i className={`${item.icon} text-lg`} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-col justify-center">
                    <h3 className="font-[var(--font-heading)] text-base font-medium leading-snug text-[#101E3F]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-[1.6] text-slate-600">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
