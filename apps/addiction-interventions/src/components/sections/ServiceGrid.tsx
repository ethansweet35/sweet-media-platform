import Link from "next/link";

export type ServiceGridItem = {
  title: string;
  href: string;
  blurb: string;
  icon?: string;
};

export const DEFAULT_SERVICE_GRID: ServiceGridItem[] = [
  {
    title: "Alcohol Addiction Interventions",
    href: "/alcohol-abuse-interventions",
    blurb:
      "Helped over 1,000 people struggling with alcohol take the next step in recovery.",
    icon: "ri-goblet-line",
  },
  {
    title: "Drug Addiction Interventions",
    href: "/drug-abuse-interventions",
    blurb:
      "Break the cycle of enabling and codependency that often surrounds drug use.",
    icon: "ri-capsule-line",
  },
  {
    title: "Mental Health Interventions",
    href: "/mental-health-interventions",
    blurb:
      "Support for depression, anxiety, PTSD, and other mental health crises.",
    icon: "ri-mental-health-line",
  },
  {
    title: "Dual Diagnosis Interventions",
    href: "/dual-diagnosis-interventions",
    blurb:
      "Co-occurring mental health and substance use disorders, treated together.",
    icon: "ri-link-m",
  },
  {
    title: "Crisis Interventions",
    href: "/crisis-interventions",
    blurb:
      "Same-day mobilisation when immediate, safe action is required.",
    icon: "ri-alarm-warning-line",
  },
  {
    title: "Family Interventions",
    href: "/family-interventions",
    blurb:
      "Empower the family system to support — without enabling — a loved one.",
    icon: "ri-group-line",
  },
];

export default function ServiceGrid({
  eyebrow = "Intervention Services",
  title = "Interventions for any situation.",
  subtitle = "No two situations are the same. Our specialists guide families through a structured process that breaks through denial and opens the door to treatment.",
  items = DEFAULT_SERVICE_GRID,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: ServiceGridItem[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-[var(--color-divider)] bg-white p-7 transition hover:border-[var(--color-sage)] hover:shadow-md"
            >
              {item.icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                  <i className={`text-2xl ${item.icon}`}></i>
                </div>
              )}
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-ink-muted)]">
                {item.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-sage-deep)] group-hover:gap-2 transition-all">
                Learn more
                <i className="ri-arrow-right-line"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
