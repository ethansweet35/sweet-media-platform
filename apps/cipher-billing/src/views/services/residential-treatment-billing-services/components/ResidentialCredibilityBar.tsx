import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const painPoints = [
  {
    icon: "ri-shield-cross-line",
    title: "Authorization gaps",
    body: "Any change in level of care—including PHP step-down or outpatient discharge—requires a new authorization number. Miss a renewal and residential treatment services stop paying while patients remain in care.",
  },
  {
    icon: "ri-code-box-line",
    title: "Per diem & HCPCS complexity",
    body: "H0017, H0018, and H0019 rules exclude room and board from program billing. Billing lodging under residential HCPCS codes is a top audit trigger general health billing teams miss.",
  },
  {
    icon: "ri-close-circle-line",
    title: "Denials that stick",
    body: "Weak ASAM documentation, wrong place of service, and concurrent group plus individual therapy conflicts drive claim denials that drain cash flow at treatment centers.",
  },
] as const;

const trustSignals = [
  "Behavioral health RCM only",
  "Residential mental health & addiction billing",
  "Medicaid, Medicare & commercial",
] as const;

export default function ResidentialCredibilityBar() {
  return (
    <section className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="lg:py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
              The residential billing challenge
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
              Residential treatment billing is not outpatient or PHP billing
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              Mental health and addiction treatment programs run on long authorization windows, ASAM criteria, and HCPCS
              per diem rules that practices billing office visits rarely handle. That is where revenue quietly leaks at
              treatment facilities.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              <span className="font-semibold text-[#101E3F]">Cipher</span> focuses on behavioral healthcare revenue cycle
              management—residential treatment billing requirements for mental health and substance use programs are core to
              what we do, not a side offering.
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
