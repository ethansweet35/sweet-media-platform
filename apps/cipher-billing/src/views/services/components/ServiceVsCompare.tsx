import type { ReactNode } from "react";

type ServiceVsSide = {
  label: string;
  range: string;
  unit: string;
  body: string;
  highlight?: boolean;
};

type ServiceVsCompareProps = {
  left: ServiceVsSide;
  right: ServiceVsSide;
  footer?: ReactNode;
};

/** Side-by-side comparison with center divider — Envato pricing/compare pattern */
export default function ServiceVsCompare({ left, right, footer }: ServiceVsCompareProps) {
  return (
    <div>
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[1fr_auto_1fr]">
        <div className={`p-6 md:p-8 ${left.highlight ? "bg-[#166C96]/5" : "bg-white"}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#166C96]">{left.label}</p>
          <p className="mt-3 font-[var(--font-heading)] text-5xl font-medium text-[#101E3F] md:text-6xl">{left.range}</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">{left.unit}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-600">{left.body}</p>
        </div>

        <div
          className="flex items-center justify-center border-y border-slate-200 bg-[#101E3F] px-4 py-3 md:border-x md:border-y-0 md:px-5 md:py-0"
          aria-hidden
        >
          <span className="font-[var(--font-heading)] text-sm font-medium uppercase tracking-[0.2em] text-white/90">
            vs
          </span>
        </div>

        <div className={`p-6 md:p-8 ${right.highlight ? "bg-[#166C96]/5" : "bg-[#F5F7FA]/80"}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{right.label}</p>
          <p className="mt-3 font-[var(--font-heading)] text-5xl font-medium text-[#101E3F] md:text-6xl">{right.range}</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">{right.unit}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-600">{right.body}</p>
        </div>
      </div>
      {footer ? <div className="mt-8 text-[15px] leading-[1.75] text-slate-600">{footer}</div> : null}
    </div>
  );
}
