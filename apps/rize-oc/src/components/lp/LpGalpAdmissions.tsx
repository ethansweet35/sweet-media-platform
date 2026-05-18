const PHONE_HREF = "tel:9494612620";
const PHONE_DISPLAY = "(949) 461-2620";

const steps = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Give Us a Call",
    body: "Speak confidentially with a counselor who understands the struggle. Available 24/7 — no judgment, just guidance.",
  },
  {
    num: "02",
    icon: "ri-shield-check-line",
    title: "Verify Insurance",
    body: "We work with most PPO providers. Our team contacts your insurer directly and walks you through your exact coverage.",
  },
  {
    num: "03",
    icon: "ri-heart-pulse-line",
    title: "Begin Treatment",
    body: "Same-day admissions available. We coordinate transportation, prepare your private suite, and walk you through every step.",
  },
];

const insurers = ["Cigna", "Aetna", "United Health", "Anthem", "Blue Cross", "+ More"];

export default function LpGalpAdmissions() {
  return (
    <section id="admissions" className="bg-ink relative overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/30" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/10" />

      <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px] relative">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-end mb-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-5">
              3-Step Admission Process
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white leading-[1.05]"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Getting Started Is<br />
              <em className="italic text-white/45">Easier Than You Think</em>
            </h2>
          </div>
          <p className="text-[14px] font-light leading-relaxed text-white/55">
            We accept most private insurance including Cigna, Aetna, United Health, and Anthem. Our team handles the complexity so you can focus on healing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10 mb-12">
          {steps.map((step) => (
            <div key={step.num} className="bg-ink hover:bg-white/5 transition-colors duration-300 p-8 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 border border-accent/25 text-accent">
                  <i className={`${step.icon} text-lg`} />
                </span>
                <span className="font-[family-name:var(--font-display)] text-5xl font-normal text-white/8 leading-none select-none">
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[13.5px] font-light leading-relaxed text-white/55">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA + insurer strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2.5 bg-accent px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:opacity-90 transition-opacity shrink-0"
          >
            <i className="ri-phone-fill" />
            Call Now — {PHONE_DISPLAY}
          </a>
          <div className="flex flex-wrap items-center gap-3">
            {insurers.map((ins) => (
              <span key={ins} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                {ins}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
