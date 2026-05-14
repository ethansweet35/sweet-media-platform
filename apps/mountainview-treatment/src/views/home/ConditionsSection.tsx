import Link from "next/link";

const MENTAL = [
  {
    title: "Depression",
    body: "Including major depression, treatment-resistant depression, and persistent depressive disorder.",
    href: "/what-we-treat/mental-health/depression/",
  },
  {
    title: "Anxiety",
    body: "Generalized anxiety, panic disorders, and severe social anxiety affecting daily function.",
    href: "/what-we-treat/mental-health/anxiety/",
  },
  {
    title: "Trauma",
    body: "Evidence-based somatic and cognitive therapies for profound, root-cause healing.",
    href: "/what-we-treat/mental-health/trauma/",
  },
  {
    title: "Bipolar",
    body: "Comprehensive mood stabilization and ongoing psychiatric management.",
    href: "/what-we-treat/mental-health/bipolar/",
  },
  {
    title: "Personality Disorders",
    body: "Specialized DBT and CBT modalities for borderline and dependent personality profiles.",
    href: "/what-we-treat/mental-health/personality-disorders/",
  },
];

const ADDICTION = [
  {
    title: "Alcohol",
    body: "Safe, medically monitored withdrawal process followed by intensive psychological therapy.",
    href: "/what-we-treat/addiction/alcohol/",
  },
  {
    title: "Prescription",
    body: "Navigating the complexities of benzodiazepine, stimulant, and pain medication reliance.",
    href: "/what-we-treat/addiction/prescription/",
  },
  {
    title: "Opioids",
    body: "Advanced MAT (Medication-Assisted Treatment) protocols paired with holistic care.",
    href: "/what-we-treat/addiction/opioids/",
  },
  {
    title: "Dual Diagnosis",
    body: "Simultaneous treatment of addiction and its underlying psychological catalysts.",
    href: "/what-we-treat/",
  },
  {
    title: "Stimulants",
    body: "Targeted interventions are designed to break the cycle and establish permanent sobriety.",
    href: "/what-we-treat/addiction/stimulants/",
  },
];

type Column = { eyebrow: string; title: string; items: typeof MENTAL };

const COLUMNS: Column[] = [
  { eyebrow: "Primary Mental Health", title: "Mental Health", items: MENTAL },
  { eyebrow: "Substance Use & Dual Diagnosis", title: "Addiction", items: ADDICTION },
];

export default function ConditionsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <p className="mvt-eyebrow">Treatment Pathways</p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-[var(--mvt-ink)] sm:text-5xl">
              Comprehensive Treatment <br className="hidden md:block" />
              For <span className="italic text-[var(--mvt-forest)]">Complex Conditions</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--mvt-text)]">
            We treat the underlying mental health and substance use challenges
            most rehabs miss — with a tailored, evidence-based, and integrated
            clinical model.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mvt-eyebrow">{col.eyebrow}</p>
              <div className="mt-5 divide-y divide-[var(--mvt-cream-2)] border-y border-[var(--mvt-cream-2)]">
                {col.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-start justify-between gap-6 py-5 transition hover:bg-[var(--mvt-cream)]"
                  >
                    <div>
                      <h3 className="font-heading text-2xl leading-snug text-[var(--mvt-ink)]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--mvt-text)]">
                        {item.body}
                      </p>
                    </div>
                    <span className="mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--mvt-forest)]/40 text-[var(--mvt-forest)] transition group-hover:bg-[var(--mvt-forest)] group-hover:text-white">
                      <i className="ri-arrow-right-line text-base" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
