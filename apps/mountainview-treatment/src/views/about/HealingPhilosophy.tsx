const PILLARS = [
  {
    icon: "ri-microscope-line",
    title: "Evidence-Based",
    body: "All treatments grounded in neuroscience and clinical research.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Trauma-Informed",
    body: "Addressing underlying trauma with compassion and expertise.",
  },
  {
    icon: "ri-team-line",
    title: "Community Focused",
    body: "Building authentic connections that support lasting recovery.",
  },
  {
    icon: "ri-plant-line",
    title: "Nature-Integrated",
    body: "Harnessing the healing power of the Pacific Northwest.",
  },
];

export default function HealingPhilosophy() {
  return (
    <section className="bg-[var(--mvt-forest-deep)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-white/85" />
            Philosophy
            <span aria-hidden="true" className="inline-block h-px w-7 bg-white/85" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Healing Through Nature &amp; Science
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/80">
            We believe that true recovery happens at the intersection of
            evidence-based clinical care and the restorative power of the
            natural world. The Pacific Northwest provides more than just a
            beautiful backdrop&mdash;it&rsquo;s an integral part of our
            treatment philosophy.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-white/25"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-2xl text-[var(--mvt-teal-light)]">
                <i className={p.icon} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-[13px] leading-6 text-white/75">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
