const PHONE_HREF = "tel:9494612620";
const PHONE_DISPLAY = "(949) 461-2620";

const steps = [
  {
    num: "1",
    icon: "ri-phone-line",
    title: "Give Us a Call",
    body: "Speak with a counselor who understands the struggle with drugs and alcohol.",
  },
  {
    num: "2",
    icon: "ri-shield-check-line",
    title: "Verify Insurance",
    body: "We work with most PPO insurance providers. Call now to verify your insurance details.",
  },
  {
    num: "3",
    icon: "ri-heart-pulse-line",
    title: "Get Started",
    body: "We will work with you and come up with a plan you can start today.",
  },
];

export default function LpGalpAdmissions() {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Our 3-Step Admission Process</p>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white"
            style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
          >
            Recover at Home with Low-Cost Options
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm font-light leading-relaxed text-white/60">
            We accept most private health insurance including Cigna, Aetna, United Health, and Anthem. If you&apos;re unsure about coverage, reach out and we&apos;ll help you figure it out.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {steps.map((step) => (
            <div key={step.num} className="border border-white/10 bg-white/5 p-8 text-center">
              <div className="w-12 h-12 flex items-center justify-center border border-accent/40 bg-accent/10 mx-auto mb-5">
                <i className={`${step.icon} text-accent text-xl`} />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent mb-2">Step {step.num}</p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-white mb-3">{step.title}</h3>
              <p className="text-sm font-light leading-relaxed text-white/60">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
          >
            <i className="ri-phone-line" />
            Call Now — {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
