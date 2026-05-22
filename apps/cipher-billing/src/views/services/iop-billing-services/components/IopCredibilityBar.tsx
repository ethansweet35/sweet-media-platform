import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const painPoints = [
  {
    icon: "ri-shield-cross-line",
    title: "Authorization lapses",
    body: "When authorizations slip or concurrent review lags on IOP services, claims pile up before anyone catches the gap.",
  },
  {
    icon: "ri-code-box-line",
    title: "H-code & institutional complexity",
    body: "HCPCS codes, revenue codes, UB-04 rules, and condition code 92 are not routine outpatient program workflows.",
  },
  {
    icon: "ri-close-circle-line",
    title: "Denials that stick",
    body: "Documentation gaps, IOP/PHP overlap within seven days, and wrong hospital outpatient claim paths drive returns and lost revenue.",
  },
] as const;

const trustSignals = [
  "Behavioral health RCM only",
  "IOP services & PHP level-of-care",
  "Medicare coverage for IOP since 2024",
] as const;

export default function IopCredibilityBar() {
  return (
    <section className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Text column — vertically centered against pain panel (layout rule §2.1) */}
          <div className="lg:py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
              The IOP billing challenge
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
              Intensive outpatient program billing is not standard outpatient billing
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              Mental health and substance use IOP services run on authorization windows, institutional billing codes, and
              payer edits that general health care billing teams rarely handle day to day. That is where revenue quietly
              leaks.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
              <span className="font-semibold text-[#101E3F]">Cipher</span> focuses on behavioral health revenue cycle
              management—intensive outpatient billing requirements and program services coding are core to what we do, not
              a side offering.
            </p>

            {/* Single supporting trust row (layout rule §2.2 — balances column height) */}
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

          {/* Pain panel — one unit so top/bottom edges align with partner column */}
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
