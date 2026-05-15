export type UnderstandingProps = {
  eyebrow: string;
  /** Headline with `{italic}` markers that wrap the italicized portion. */
  headline: React.ReactNode;
  /** Optional intro paragraph below the headline, above the two cards. */
  intro?: string;
  /** Left (light) card. */
  primary: {
    title: string;
    body: string;
  };
  /** Right (dark) card with bulleted checklist. */
  secondary: {
    title: string;
    intro?: string;
    bullets: string[];
  };
};

export default function UnderstandingSection({
  eyebrow,
  headline,
  intro,
  primary,
  secondary,
}: UnderstandingProps) {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            {eyebrow}
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            {headline}
          </h2>
          {intro && (
            <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Light primary card */}
          <article className="bg-[var(--mvt-cream)] p-10 shadow-sm">
            <h3 className="font-heading text-[28px] leading-tight text-[var(--mvt-ink)] sm:text-[32px]">
              {primary.title}
            </h3>
            <div className="mt-5 h-px w-14 bg-[var(--mvt-teal)]" />
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[var(--mvt-text)]">
              {primary.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </article>

          {/* Dark secondary card */}
          <article className="bg-[var(--mvt-forest-deep)] p-10 text-white shadow-sm">
            <h3 className="font-heading text-[28px] leading-tight text-white sm:text-[32px]">
              {secondary.title}
            </h3>
            <div className="mt-5 h-px w-14 bg-[var(--mvt-teal-light)]" />
            {secondary.intro && (
              <p className="mt-6 text-[15px] leading-7 text-white/80">
                {secondary.intro}
              </p>
            )}
            <ul className="mt-6 grid gap-3">
              {secondary.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14px] leading-6">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal-light)] text-[var(--mvt-forest-deep)]">
                    <i className="ri-check-line text-xs" aria-hidden="true" />
                  </span>
                  <span className="text-white/85">{b}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
