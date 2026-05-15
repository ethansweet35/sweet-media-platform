const SUBSTANCE = [
  "Alcohol Addiction",
  "Opiate Dependence",
  "Stimulant Abuse",
  "Benzodiazepine Addiction",
  "Marijuana Dependence",
  "Prescription Drug Abuse",
  "Polysubstance Use",
];

const MENTAL = [
  "Major Depressive Disorder",
  "Anxiety Disorders",
  "Post-Traumatic Stress Disorder",
  "Bipolar Disorder",
  "ADD / ADHD",
  "Personality Disorders",
  "Mood Disorders",
];

export default function ConditionsTreatedSection() {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            What We Treat
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            Conditions Treated <span className="italic">in PHP</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">
            Our Partial Hospitalization Program provides specialized treatment
            for a wide range of substance use disorders and co-occurring mental
            health conditions.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          <ConditionList
            title="Substance Use Disorders"
            icon="ri-capsule-line"
            items={SUBSTANCE}
          />
          <ConditionList
            title="Mental Health Disorders"
            icon="ri-mental-health-line"
            items={MENTAL}
          />
        </div>
      </div>
    </section>
  );
}

function ConditionList({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: string[];
}) {
  return (
    <article className="bg-white p-10 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
          <i className={`${icon} text-xl`} aria-hidden="true" />
        </span>
        <h3 className="font-heading text-[24px] leading-tight text-[var(--mvt-ink)] sm:text-[28px]">
          {title}
        </h3>
      </div>
      <ul className="mt-7 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[14px] leading-6">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
              <i className="ri-check-line text-xs" aria-hidden="true" />
            </span>
            <span className="text-[var(--mvt-text)]">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
