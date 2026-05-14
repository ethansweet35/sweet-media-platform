const CARDS = [
  {
    title: "Our Mission",
    body:
      "To provide world-class, evidence-based addiction treatment in a setting that honors the dignity and individuality of each person. We are committed to addressing not just the symptoms of addiction, but the root causes—trauma, mental health, and the unique circumstances of every client's life.",
  },
  {
    title: "Our Vision",
    body:
      "To redefine addiction recovery by creating an environment where clinical excellence, natural beauty, and human connection converge. We envision a future where every person struggling with addiction has access to compassionate, comprehensive care that addresses mind, body, and spirit.",
  },
];

export default function GuidedByPurpose() {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Our Purpose
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[56px]">
            Guided By <span className="italic">Purpose.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="bg-white p-10 text-center shadow-sm ring-1 ring-black/5 lg:p-12"
            >
              <h3 className="font-heading text-[28px] leading-tight text-[var(--mvt-ink)] sm:text-[32px]">
                {c.title}
              </h3>
              <div className="mx-auto mt-5 h-px w-14 bg-[var(--mvt-teal)]" />
              <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-[var(--mvt-text)]">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
