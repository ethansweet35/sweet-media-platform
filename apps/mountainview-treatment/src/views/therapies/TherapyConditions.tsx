export type TherapyConditionsProps = {
  headline: React.ReactNode;
  intro: string;
  col1: { title: string; icon: string; items: string[] };
  col2: { title: string; icon: string; items: string[] };
};

export default function TherapyConditions({ headline, intro, col1, col2 }: TherapyConditionsProps) {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Our Approach
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            {headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">{intro}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {[col1, col2].map((col) => (
            <article key={col.title} className="bg-white p-10 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
                  <i className={`${col.icon} text-xl`} aria-hidden="true" />
                </span>
                <h3 className="font-heading text-[22px] leading-tight text-[var(--mvt-ink)] sm:text-[26px]">
                  {col.title}
                </h3>
              </div>
              <ul className="mt-6 grid gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
                      <i className="ri-check-line text-xs" aria-hidden="true" />
                    </span>
                    <span className="text-[var(--mvt-text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
