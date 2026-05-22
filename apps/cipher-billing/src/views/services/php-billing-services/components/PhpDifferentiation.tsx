import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const proofColumns = [
  {
    stat: "Weekly+",
    statLabel: "authorization touchpoints",
    challenge: "Recurring billing cadence",
    challengeBody:
      "PHP census turns quickly. Many plans expect concurrent review and recertification on a weekly rhythm—miss a renewal and partial hospitalization claims stop while patients still receive therapeutic services.",
    solution:
      "Cipher aligns UR to billed program days, tracks day-eighteen and thirty-day recertification, and escalates before authorization lapses affect claim submissions.",
    icon: "ri-calendar-check-line",
  },
  {
    stat: "High risk",
    statLabel: "when codes misalign",
    challenge: "Inpatient vs PHP billing codes",
    challengeBody:
      "Institutional psychiatric hospital stays use different bill types and revenue paths than PHP partial hospitalization. Wrong revenue codes, per diem HCPCS, or bill type 131/132 selection triggers denials general medical billers miss.",
    solution:
      "Pre-bill crosswalks on S0201, H0035, H0015, revenue code 0912, and CPT psychotherapy—payer-specific PHP billing guidelines, not a one-size IOP per diem cheat sheet.",
    icon: "ri-code-box-line",
  },
  {
    stat: "97%",
    statLabel: "medical appeal success rate",
    challenge: "Financial recovery",
    challengeBody:
      "PHP denials tied to documentation requirements or dual-diagnosis session limits are recoverable—but only when someone owns appeals instead of accepting lost reimbursement.",
    solution:
      "Cipher works denials with root-cause fixes so the same compliance edit does not repeat across your hospitalization program census.",
    icon: "ri-loop-left-line",
  },
] as const;

export default function PhpDifferentiation() {
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
            Why behavioral health <span className="text-[#166C96]">PHP billing</span> needs specialist RCM
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Billing software alone does not solve PHP program billing. Health providers need revenue cycle management that
            understands Medicare coverage, mental health and substance use documentation, and the unique challenges of
            hospitalization services billed on institutional claims—allowing focus on patient care instead of billing staff
            fire drills.
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
