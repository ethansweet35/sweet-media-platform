export type ProcessStep = {
  title: string;
  body: string;
  icon?: string;
};

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Free Confidential Consultation",
    body: "A private call with a certified interventionist. We listen, assess, and explain the next step for your family — no obligation, ever.",
    icon: "ri-phone-line",
  },
  {
    title: "Family Education & Planning",
    body: "We help every member of the family understand their role, set healthy boundaries, and prepare for the intervention conversation.",
    icon: "ri-group-3-line",
  },
  {
    title: "On-site Intervention",
    body: "Your interventionist meets you in person, leads the conversation, and presents pre-arranged treatment options for an immediate yes.",
    icon: "ri-discuss-line",
  },
  {
    title: "Treatment & Ongoing Support",
    body: "We coordinate transport to treatment and stay engaged with the family throughout the recovery journey — long after day one.",
    icon: "ri-seedling-line",
  },
];

export default function ProcessSteps({
  eyebrow = "The Process",
  title = "What Happens When You Call",
  subtitle,
  steps = DEFAULT_PROCESS_STEPS,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}) {
  return (
    <section className="bg-[#3E5B50] py-24 text-white">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="brand-eyebrow mb-3 text-[#8FAC87]">{eyebrow}</p>
          <h2 className="font-heading text-4xl font-bold md:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line on desktop */}
          <div
            className="pointer-events-none absolute top-10 left-0 right-0 hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent, #8FAC87 15%, #8FAC87 85%, transparent)",
            }}
          />

          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#8FAC87]/40 bg-[#507969]">
                {step.icon ? (
                  <i className={`${step.icon} text-2xl text-[#8FAC87]`}></i>
                ) : (
                  <span className="font-heading text-xl font-bold text-[#8FAC87]">{i + 1}</span>
                )}
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87] text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading mb-3 text-lg font-bold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
