import { PROGRAM_PILLARS } from "@/data/programs";

export default function ProgramsPillars() {
  return (
    <section className="bg-[var(--sr-linen)] py-14 md:py-20">
      <div className="sr-container">
        <p className="sr-eyebrow mb-8 text-center md:mb-10">How we care for you</p>
        <div className="grid gap-px border border-[var(--sr-sand)] bg-[var(--sr-sand)] sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAM_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="bg-[var(--sr-parchment)] p-6 md:p-7"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]">
                <i className={`${pillar.icon} text-lg`} aria-hidden />
              </span>
              <h3
                className="mb-2 text-lg font-light text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-[13px] leading-[1.75] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
