import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const painPoints = [
  {
    icon: "ri-shield-cross-line",
    title: "Verification & auth gaps",
    body: "SUD benefits vary by plan—when insurance verification slips before admission, abuse treatment services bill against inactive or wrong coverage.",
  },
  {
    icon: "ri-code-box-line",
    title: "Disorder billing complexity",
    body: "Substance abuse billing codes differ by level of care—detox, residential, and outpatient programs each carry distinct HCPCS, documentation, and healthcare regulations.",
  },
  {
    icon: "ri-close-circle-line",
    title: "Denials that drain revenue",
    body: "Wrong abuse disorder coding, weak assessment notes, and dual-diagnosis bundling errors drive claim denials that hurt financial performance at treatment centers.",
  },
] as const;

const trustSignals = [
  "Behavioral health RCM only",
  "Detox, residential & outpatient SUD",
  "Co-occurring mental health billing",
] as const;

export default function SubstanceAbuseCredibilityBar() {
  return (
    <section className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="lg:py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
              The substance abuse billing challenge
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
              Substance use disorder billing is not general medical billing
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              Addiction treatment and co-occurring mental health programs run on ASAM criteria, payer-specific abuse
              billing rules, and authorization windows that standard practices rarely handle day to day.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              <span className="font-semibold text-[#101E3F]">Cipher</span> is a billing company focused on revenue cycle
              management for SUD treatment—substance abuse billing services are core to our business, not an add-on line.
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
