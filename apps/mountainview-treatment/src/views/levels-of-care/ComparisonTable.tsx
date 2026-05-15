type Row = {
  feature: string;
  inpatient: string;
  php: string;
  iop: string;
  outpatient: string;
};

const ROWS: Row[] = [
  { feature: "Hours per Week", inpatient: "24/7", php: "25-30 hours", iop: "9-12 hours", outpatient: "1-3 hours" },
  { feature: "Days per Week", inpatient: "7 days", php: "5-6 days", iop: "3-5 days", outpatient: "1-2 days" },
  { feature: "Medical Support", inpatient: "24/7 On-Site", php: "Daily + 24/7 Access", iop: "As Needed", outpatient: "Referral" },
  { feature: "Living Arrangement", inpatient: "On-Site", php: "Home / Sober Living", iop: "Home", outpatient: "Home" },
  { feature: "Individual Therapy", inpatient: "1-2x / week", php: "3-5x / week", iop: "1-2x / week", outpatient: "1x / week" },
  { feature: "Group Therapy", inpatient: "Daily", php: "Daily", iop: "3-5x / week", outpatient: "Optional" },
  { feature: "Best For", inpatient: "Severe addiction, detox", php: "Moderate-severe, step-down", iop: "Stable recovery", outpatient: "Maintenance" },
];

const COLS: Array<{ key: keyof Omit<Row, "feature">; label: string }> = [
  { key: "inpatient", label: "Inpatient / Residential" },
  { key: "php", label: "PHP" },
  { key: "iop", label: "IOP" },
  { key: "outpatient", label: "Outpatient" },
];

export type ComparisonTableProps = {
  /** Which column should be highlighted as "Our Program". */
  highlight: "php" | "iop" | "outpatient";
  /** Section eyebrow + headline (program name varies). */
  eyebrow?: string;
  headline: React.ReactNode;
};

export default function ComparisonTable({
  highlight,
  eyebrow = "How It Compares",
  headline,
}: ComparisonTableProps) {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            {eyebrow}
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            {headline}
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
                {COLS.map((c) => (
                  <th
                    key={c.key}
                    className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      c.key === highlight ? "bg-[var(--mvt-teal)]" : ""
                    }`}
                  >
                    {c.key === highlight ? `${c.label} (Our Program)` : c.label}
                  </th>
                ))}
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
                  {COLS.map((c) => (
                    <td
                      key={c.key}
                      className={
                        c.key === highlight
                          ? "bg-[var(--mvt-teal)]/10 px-5 py-4 font-semibold text-[var(--mvt-teal)]"
                          : "px-5 py-4 text-[var(--mvt-text)]"
                      }
                    >
                      {row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-10 grid gap-6 lg:hidden">
          {ROWS.map((row) => (
            <div key={row.feature} className="border border-black/10 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--mvt-muted)]">
                {row.feature}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-y-3 text-[13px]">
                {COLS.map((c) => (
                  <div key={c.key} className="contents">
                    <dt
                      className={
                        c.key === highlight
                          ? "font-semibold text-[var(--mvt-teal)]"
                          : "text-[var(--mvt-muted)]"
                      }
                    >
                      {c.label}
                    </dt>
                    <dd
                      className={`text-right ${
                        c.key === highlight
                          ? "font-semibold text-[var(--mvt-teal)]"
                          : "text-[var(--mvt-ink)]"
                      }`}
                    >
                      {row[c.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
