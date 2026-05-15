type Row = {
  feature: string;
  inpatient: string;
  php: string;
  iop: string;
  outpatient: string;
};

const ROWS: Row[] = [
  {
    feature: "Hours per Week",
    inpatient: "24/7",
    php: "25-30 hours",
    iop: "9-12 hours",
    outpatient: "1-3 hours",
  },
  {
    feature: "Days per Week",
    inpatient: "7 days",
    php: "5-6 days",
    iop: "3-5 days",
    outpatient: "1-2 days",
  },
  {
    feature: "Medical Support",
    inpatient: "24/7 On-Site",
    php: "Daily + 24/7 Access",
    iop: "As Needed",
    outpatient: "Referral",
  },
  {
    feature: "Living Arrangement",
    inpatient: "On-Site",
    php: "Home / Sober Living",
    iop: "Home",
    outpatient: "Home",
  },
  {
    feature: "Individual Therapy",
    inpatient: "1-2x / week",
    php: "3-5x / week",
    iop: "1-2x / week",
    outpatient: "1x / week",
  },
  {
    feature: "Group Therapy",
    inpatient: "Daily",
    php: "Daily",
    iop: "3-5x / week",
    outpatient: "Optional",
  },
  {
    feature: "Best For",
    inpatient: "Severe addiction, detox",
    php: "Moderate-severe, step-down",
    iop: "Stable recovery",
    outpatient: "Maintenance",
  },
];

export default function ComparisonSection() {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            How It Compares
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            PHP vs. Other <span className="italic">Levels of Care</span>
          </h2>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-hidden border border-black/10 lg:block">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="bg-[var(--mvt-forest-deep)] text-white">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Feature
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Inpatient / Residential
                </th>
                <th className="bg-[var(--mvt-teal)] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  PHP (Our Program)
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  IOP
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Outpatient
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-white" : "bg-[var(--mvt-cream)]"}
                >
                  <td className="px-5 py-4 font-semibold text-[var(--mvt-ink)]">
                    {row.feature}
                  </td>
                  <td className="px-5 py-4 text-[var(--mvt-text)]">
                    {row.inpatient}
                  </td>
                  <td className="bg-[var(--mvt-teal)]/10 px-5 py-4 font-semibold text-[var(--mvt-teal)]">
                    {row.php}
                  </td>
                  <td className="px-5 py-4 text-[var(--mvt-text)]">{row.iop}</td>
                  <td className="px-5 py-4 text-[var(--mvt-text)]">
                    {row.outpatient}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-10 grid gap-6 lg:hidden">
          {ROWS.map((row) => (
            <div
              key={row.feature}
              className="border border-black/10 bg-white p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--mvt-muted)]">
                {row.feature}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-y-3 text-[13px]">
                <dt className="text-[var(--mvt-muted)]">Inpatient</dt>
                <dd className="text-right text-[var(--mvt-ink)]">{row.inpatient}</dd>
                <dt className="font-semibold text-[var(--mvt-teal)]">PHP</dt>
                <dd className="text-right font-semibold text-[var(--mvt-teal)]">
                  {row.php}
                </dd>
                <dt className="text-[var(--mvt-muted)]">IOP</dt>
                <dd className="text-right text-[var(--mvt-ink)]">{row.iop}</dd>
                <dt className="text-[var(--mvt-muted)]">Outpatient</dt>
                <dd className="text-right text-[var(--mvt-ink)]">{row.outpatient}</dd>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
