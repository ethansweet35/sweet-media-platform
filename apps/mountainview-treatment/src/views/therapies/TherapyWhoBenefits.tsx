export type TherapyBenefitCard = {
  n: string;
  icon: string;
  title: string;
  body: string;
};

export type TherapyWhoBenefitsProps = {
  headline: React.ReactNode;
  intro: string;
  cards: TherapyBenefitCard[];
};

export default function TherapyWhoBenefits({ headline, intro, cards }: TherapyWhoBenefitsProps) {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
              Who It Helps
            </p>
            <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
              {headline}
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[var(--mvt-text)] lg:pb-2">{intro}</p>
        </div>

        <div className="mt-14 grid gap-px border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-5 bg-white p-8 transition hover:bg-[var(--mvt-cream)]/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-[42px] font-light leading-none text-[var(--mvt-ink)]/10">
                  {c.n}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
                  <i className={`${c.icon} text-lg`} aria-hidden="true" />
                </span>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[var(--mvt-ink)]">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--mvt-text)]">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
