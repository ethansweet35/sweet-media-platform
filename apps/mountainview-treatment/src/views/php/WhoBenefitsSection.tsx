const CARDS = [
  {
    icon: "ri-hospital-line",
    title: "Step-Down from Inpatient",
    body:
      "Perfect for those transitioning from residential or inpatient care who need continued intensive support.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Dual Diagnosis Treatment",
    body:
      "Comprehensive care for co-occurring mental health conditions alongside addiction treatment.",
  },
  {
    icon: "ri-shield-cross-line",
    title: "Relapse Prevention",
    body:
      "Intensive support for individuals who've experienced relapse and need to rebuild their foundation.",
  },
  {
    icon: "ri-alert-line",
    title: "High-Risk Situations",
    body:
      "For those facing significant life stressors or triggers who need daily clinical intervention.",
  },
  {
    icon: "ri-calendar-todo-line",
    title: "Need for Structure",
    body:
      "Individuals who require daily accountability and therapeutic programming to maintain sobriety.",
  },
  {
    icon: "ri-seedling-line",
    title: "Early Recovery",
    body:
      "Those in early stages of recovery who need intensive clinical support to build a strong foundation.",
  },
];

export default function WhoBenefitsSection() {
  return (
    <section className="bg-[var(--mvt-forest-deep)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-white/85" />
            Is PHP Right For You?
            <span aria-hidden="true" className="inline-block h-px w-7 bg-white/85" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Who Benefits From A <span className="italic">PHP?</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="border border-white/10 bg-white/[0.03] p-7 transition hover:border-white/25"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-[var(--mvt-teal-light)]">
                <i className={`${c.icon} text-xl`} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-white/75">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
