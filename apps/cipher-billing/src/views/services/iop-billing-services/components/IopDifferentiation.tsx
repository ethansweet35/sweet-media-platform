import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const proofColumns = [
  {
    stat: "Weekly+",
    statLabel: "authorization touchpoints",
    challenge: "Authorization frequency",
    challengeBody:
      "IOP services census turns quickly. Many plans expect concurrent review and re-authorization on a weekly cadence—miss a renewal and intensive outpatient claims stop while patients are still in program.",
    solution:
      "Cipher aligns your UR calendar to billed program days, tracks expirations before services render, and escalates when auth windows are about to lapse.",
    icon: "ri-calendar-check-line",
  },
  {
    stat: "High risk",
    statLabel: "when H-codes misalign",
    challenge: "H-code compliance risk",
    challengeBody:
      "Institutional intensive outpatient claims fail when HCPCS codes, revenue code 0905, service units, or condition code 92 do not match payer edits—errors outpatient program teams rarely catch on the first pass.",
    solution:
      "Pre-bill crosswalks and coding review on every IOP claim, with payer-specific rules—not a generic cheat sheet applied to your census.",
    icon: "ri-code-box-line",
  },
  {
    stat: "97%",
    statLabel: "medical appeal success rate",
    challenge: "Denial reversal",
    challengeBody:
      "IOP denials are recoverable when worked with the right clinical documentation and appeal path—but only if someone owns the follow-through instead of writing off the balance.",
    solution:
      "Cipher appeals denials with root-cause fixes so the same edit does not repeat on the next week of program billing.",
    icon: "ri-loop-left-line",
  },
] as const;

export default function IopDifferentiation() {
  return (
    <section className={`bg-[#F5F7FA] ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Differentiation</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            Why <span className="text-[#166C96]">IOP billing</span> needs a behavioral health specialist
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Generic billers can submit claims. Behavioral health outpatient programs need a team that understands Medicare
            coverage rules, intensive outpatient authorization cadence, and how to reverse denials without slowing census on
            IOP services.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-slate-200/90 py-6">
          <div className="text-center">
            <p className="font-[var(--font-heading)] text-3xl font-medium text-[#101E3F]">97%</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#166C96]">
              Medical appeal success rate
            </p>
          </div>
          <div className="hidden h-10 w-px bg-slate-200 sm:block" aria-hidden />
          <div className="text-center">
            <p className="font-[var(--font-heading)] text-3xl font-medium text-[#101E3F]">30 days</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#166C96]">To first payment</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {proofColumns.map((col, i) => (
            <article
              key={col.challenge}
              className={`flex h-full flex-col rounded-xl border p-6 md:p-7 ${
                i === 1 ? "border-[#166C96]/35 bg-[#166C96]/5 shadow-sm" : "border-slate-200/90 bg-[#F8FAFC]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-[var(--font-heading)] text-3xl font-medium leading-none text-[#101E3F]">{col.stat}</p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {col.statLabel}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/10 text-[#166C96]">
                  <i className={`${col.icon} text-lg`} aria-hidden />
                </span>
              </div>

              <h3 className="mt-6 font-[var(--font-heading)] text-lg font-medium text-[#101E3F]">{col.challenge}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-[1.65] text-slate-600">{col.challengeBody}</p>

              <div className="mt-6 border-l-2 border-[#166C96] pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#166C96]">Cipher&apos;s approach</p>
                <p className="mt-2 text-[13px] leading-[1.65] text-slate-700">{col.solution}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
