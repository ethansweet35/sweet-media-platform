export type Faq = { q: string; a: string };

export type FaqAccordionProps = {
  eyebrow?: string;
  headline: React.ReactNode;
  faqs: Faq[];
};

export default function FaqAccordion({
  eyebrow = "Common Questions",
  headline,
  faqs,
}: FaqAccordionProps) {
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
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/10 border-y border-black/10">
          {faqs.map((item, idx) => (
            <details
              key={item.q}
              className="group py-5"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[16px] font-semibold text-[var(--mvt-ink)] [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--mvt-ink)]/30 text-[var(--mvt-ink)] transition group-open:rotate-45"
                >
                  <i className="ri-add-line text-base" />
                </span>
              </summary>
              <p className="mt-3 max-w-3xl pr-10 text-[14px] leading-7 text-[var(--mvt-text)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
