import type { ReactNode } from "react";

export type ServiceWorkflowStep = {
  num: string;
  label: string;
  title: string;
  body: ReactNode;
};

type ServiceWorkflowStepsProps = {
  steps: readonly ServiceWorkflowStep[];
};

const colClass: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Horizontal process strip with connector line (Envato / Cipher RCM pattern) */
export default function ServiceWorkflowSteps({ steps }: ServiceWorkflowStepsProps) {
  const lgCols = colClass[steps.length] ?? "lg:grid-cols-2";

  return (
    <div>
      <div className="relative mb-4 hidden lg:block">
        <div
          className="absolute left-[10%] right-[10%] top-6 h-px bg-gradient-to-r from-[#166C96] via-slate-300 to-slate-200"
          aria-hidden
        />
        <div className={`grid gap-6 ${lgCols}`}>
          {steps.map((step) => (
            <div key={step.num} className="flex justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#166C96] text-sm font-bold text-white ring-4 ring-[#F5F7FA]">
                {step.num}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`grid gap-6 sm:grid-cols-2 ${lgCols}`}>
        {steps.map((step, i) => (
          <article
            key={step.num}
            className={`flex flex-col rounded-sm border bg-white p-6 shadow-sm ${
              i === 0 ? "border-[#166C96]/35 ring-1 ring-[#166C96]/10" : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i === 0 ? "bg-[#166C96] text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {step.num}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {step.label}
              </span>
            </div>
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:block">
              {step.label}
            </p>
            <h3 className="mt-3 font-[var(--font-heading)] text-lg font-medium text-[#101E3F] lg:mt-4">{step.title}</h3>
            <div className="mt-3 flex-1 text-[14px] leading-[1.65] text-slate-600">{step.body}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
