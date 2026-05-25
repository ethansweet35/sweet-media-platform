import { INSURANCE_PROCESS_STEPS } from "@/data/insurance";

export default function InsuranceProcess() {
  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="sr-eyebrow mb-4">The process</p>
            <h2
              className="max-w-lg text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.06] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              From verification to{" "}
              <span className="italic text-[var(--sr-fern)]">admission</span>
            </h2>
          </div>
          <p
            className="max-w-md text-[14px] leading-[1.85] text-[var(--sr-muted)] md:text-right"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            We handle carrier communication, authorization paperwork, and cost transparency
            so you can focus on recovery.
          </p>
        </div>

        <ol className="border-t border-[var(--sr-sand)]">
          {INSURANCE_PROCESS_STEPS.map((step) => (
            <li
              key={step.num}
              className="grid grid-cols-1 gap-4 border-b border-[var(--sr-sand)] py-9 md:grid-cols-12 md:gap-8 md:py-11"
            >
              <div className="flex items-center gap-4 md:col-span-3 md:flex-col md:items-start md:gap-3">
                <span
                  className="text-[clamp(2.5rem,4vw,3.5rem)] font-light tabular-nums leading-none text-[var(--sr-sand)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  aria-hidden
                >
                  {step.num}
                </span>
                <span className="flex h-11 w-11 items-center justify-center bg-[var(--sr-moss)] text-[var(--sr-parchment)]">
                  <i className={`${step.icon} text-lg`} aria-hidden />
                </span>
              </div>
              <div className="md:col-span-9">
                <p
                  className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.phase}
                </p>
                <h3
                  className="mb-2 text-xl font-light text-[var(--sr-ink)] md:text-2xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="max-w-2xl text-[14px] leading-[1.8] text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
