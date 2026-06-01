import { cn } from "@/lib/cn";

export type ComparisonTableRow = {
  label: string;
  baseline: string;
  highlighted: string;
};

type ComparisonTableProps = {
  baselineLabel: string;
  highlightedLabel: string;
  rows: ComparisonTableRow[];
  /** Homepage style: strikethrough baseline + check/x icons */
  variant?: "default" | "emphasis";
  className?: string;
};

export default function ComparisonTable({
  baselineLabel,
  highlightedLabel,
  rows,
  variant = "default",
  className,
}: ComparisonTableProps) {
  const emphasis = variant === "emphasis";

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10", className)}>
      {/* Desktop header */}
      <div className="hidden border-b border-white/10 bg-white/[0.03] px-4 py-4 md:grid md:grid-cols-[1fr_1fr_1fr] md:gap-4 md:px-6">
        <div />
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">
          {baselineLabel}
        </p>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {highlightedLabel}
        </p>
      </div>

      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn(
            "border-b border-white/5 last:border-b-0",
            i % 2 === 0 && "bg-white/[0.02]",
          )}
        >
          {/* Mobile: stacked cards per row */}
          <div className="space-y-3 p-4 sm:p-5 md:hidden">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">{row.label}</p>
            <div className="grid gap-2">
              <div className="rounded-xl bg-white/[0.03] px-4 py-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                  {baselineLabel}
                </p>
                {emphasis ? (
                  <div className="flex items-start gap-2">
                    <i className="ri-close-line mt-0.5 shrink-0 text-sm text-red-400/70" aria-hidden />
                    <span className="text-sm leading-snug text-white/35 line-through">{row.baseline}</span>
                  </div>
                ) : (
                  <p className="text-sm leading-snug text-white/35">{row.baseline}</p>
                )}
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
                  {highlightedLabel}
                </p>
                {emphasis ? (
                  <div className="flex items-start gap-2">
                    <i className="ri-check-line mt-0.5 shrink-0 text-sm text-accent" aria-hidden />
                    <span className="text-sm font-semibold leading-snug text-white">{row.highlighted}</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold leading-snug text-white">{row.highlighted}</p>
                )}
              </div>
            </div>
          </div>

          {/* Desktop: three-column row */}
          <div className="hidden gap-4 px-4 py-5 md:grid md:grid-cols-[1fr_1fr_1fr] md:px-6">
            <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">
              {row.label}
            </p>

            {emphasis ? (
              <div className="flex items-center justify-center gap-2 text-center">
                <i className="ri-close-line shrink-0 text-sm text-red-400/70" aria-hidden />
                <span className="text-sm text-white/35 line-through">{row.baseline}</span>
              </div>
            ) : (
              <p className="flex items-center justify-center text-center text-sm text-white/35">
                {row.baseline}
              </p>
            )}

            {emphasis ? (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 text-center">
                <i className="ri-check-line shrink-0 text-sm text-accent" aria-hidden />
                <span className="text-sm font-semibold text-white">{row.highlighted}</span>
              </div>
            ) : (
              <p className="flex items-center justify-center text-center text-sm font-semibold text-white">
                {row.highlighted}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
