export type ProcessStep = {
  title: string;
  body: string;
  icon?: string;
};

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Free Confidential Consultation",
    body:
      "A private call with a certified interventionist. We listen, assess, and explain the next step for your family — no obligation, ever.",
    icon: "ri-phone-line",
  },
  {
    title: "Family Education & Planning",
    body:
      "We help every member of the family understand their role, set healthy boundaries, and prepare for the intervention conversation.",
    icon: "ri-discuss-line",
  },
  {
    title: "On-site Intervention",
    body:
      "Your interventionist meets you in person, leads the conversation, and presents pre-arranged treatment options for an immediate yes.",
    icon: "ri-user-heart-line",
  },
  {
    title: "Treatment & Family Support",
    body:
      "We coordinate transport to treatment and stay engaged with the family throughout the recovery journey — long after day one.",
    icon: "ri-route-line",
  },
];

export default function ProcessSteps({
  eyebrow = "How It Works",
  title = "What you can expect from our intervention process.",
  subtitle,
  steps = DEFAULT_PROCESS_STEPS,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-[var(--color-divider)] bg-white p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                {step.icon ? (
                  <i className={`text-2xl ${step.icon}`}></i>
                ) : (
                  <span className="text-base font-semibold">{i + 1}</span>
                )}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-sage-deep)]">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
