import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const proofColumns = [
  {
    stat: "Pre-bill",
    statLabel: "before claims go out",
    challenge: "Verification & eligibility",
    challengeBody:
      "Patient insurance for SUD treatment is often carved out or heavily managed—billing without upfront verification claims leads to denials that could have been prevented.",
    solution:
      "Cipher verifies insurance coverage and documents benefit limits before patients admit—reducing rework for care providers and treatment facilities.",
    icon: "ri-shield-check-line",
  },
  {
    stat: "High risk",
    statLabel: "when codes misalign",
    challenge: "Accurate abuse billing",
    challengeBody:
      "Billing substance use programs with the wrong HCPCS line, missing assessment documentation, or drug abuse codes on the wrong claim type triggers payer edits fast.",
    solution:
      "Certified billing coding review on every claim—payer-specific crosswalks for detox, residential, outpatient, and co-occurring mental health services.",
    icon: "ri-code-box-line",
  },
  {
    stat: "97%",
    statLabel: "medical appeal success rate",
    challenge: "Denial recovery",
    challengeBody:
      "Substance abuse claim denials tied to authorization or documentation are recoverable when appeals include the right clinical context—not automatic write-offs.",
    solution:
      "Cipher appeals with root-cause fixes and reporting so the same disorder billing error does not repeat on your census.",
    icon: "ri-loop-left-line",
  },
] as const;

export default function SubstanceAbuseDifferentiation() {
  return (
    <section className={`bg-white ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Differentiation</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight text-[#101E3F] md:text-[2.125rem]">
            Why specialized <span className="text-[#166C96]">abuse billing</span> beats generic RCM
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-slate-600">
            Billing software handles workflows—but substance abuse billing services from a dedicated billing company
            bring SUD expertise, customer service for your staff, and denial management that protects patient care
            time at your center.
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
