const TRAUMA = [
  "Post-Traumatic Stress Disorder (PTSD)",
  "Complex PTSD (C-PTSD)",
  "Childhood Trauma & Abuse",
  "Sexual Assault & Domestic Violence Trauma",
  "Combat & First Responder Trauma",
  "Grief & Traumatic Loss",
  "Medical Trauma & Chronic Illness",
];

const CO_OCCURRING = [
  "Substance Use Disorders & Addiction",
  "Anxiety Disorders & Panic Attacks",
  "Major Depressive Disorder",
  "Phobias & Performance Anxiety",
  "Dissociative Disorders",
  "Negative Self-Beliefs & Low Self-Worth",
  "Attachment & Relationship Wounds",
];

export default function EmdrConditionsSection() {
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
            Conditions Treated by <span className="italic">EMDR Therapy</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">
            EMDR therapy is backed by decades of clinical research and
            recognized by the American Psychological Association, World Health
            Organization, and Department of Veterans Affairs as a first-line
            treatment for trauma. Our Seattle therapists use EMDR to address a
            wide range of mental health and substance use conditions rooted in
            unprocessed traumatic experience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          <ConditionCard
            title="Trauma-Related Conditions"
            subtitle="Treated with EMDR"
            intro="EMDR is especially effective for conditions rooted in distressing memories, traumatic events, and unresolved emotional experiences."
            items={TRAUMA}
            icon="ri-shield-cross-line"
          />
          <ConditionCard
            title="Co-Occurring Conditions"
            subtitle="Treated with EMDR"
            intro="EMDR also helps clients whose anxiety, mood, or addictive symptoms are driven by underlying trauma and unprocessed emotional pain."
            items={CO_OCCURRING}
            icon="ri-mental-health-line"
          />
        </div>
      </div>
    </section>
  );
}

function ConditionCard({
  title,
  subtitle,
  intro,
  items,
  icon,
}: {
  title: string;
  subtitle: string;
  intro: string;
  items: string[];
  icon: string;
}) {
  return (
    <article className="bg-white p-10 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
          <i className={`${icon} text-xl`} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-heading text-[24px] leading-tight text-[var(--mvt-ink)] sm:text-[28px]">
            {title}
          </h3>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-muted)]">
            {subtitle}
          </p>
        </div>
      </div>
      <p className="mt-6 text-[14px] leading-6 text-[var(--mvt-text)]">{intro}</p>
      <ul className="mt-6 grid gap-3">
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
