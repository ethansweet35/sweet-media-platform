const LEVELS = [
  {
    intensity: "25–30 Hrs/Week | Most Intensive",
    title: "Partial Hospitalization (PHP)",
    body: "Our PHP provides structured daytime programming five days a week for those who need intensive support but don't require 24-hour residential care. Includes individual therapy, group sessions, medication management, and psychiatric oversight.",
  },
  {
    intensity: "9–12 Hrs/Week | Medium Intensive",
    title: "Intensive Outpatient (IOP)",
    body: "IOP offers 3–5 days of clinical programming per week — morning, afternoon, or evening tracks available. Ideal for working professionals and those stepping down from PHP while maintaining daily responsibilities.",
  },
  {
    intensity: "1–2 Sessions/Week | Ongoing Support",
    title: "Outpatient Program (OP)",
    body: "Standard outpatient care provides continued therapeutic support as you reintegrate into daily life. Sessions focus on relapse prevention, coping skills, and reinforcing recovery tools learned at higher levels of care.",
  },
  {
    intensity: "Integrated | Dual Diagnosis",
    title: "Mental Health Treatment",
    body: "Co-occurring mental health conditions — anxiety, depression, trauma, PTSD, bipolar disorder — are treated concurrently alongside addiction. Every clinical plan addresses both substance use and mental wellness.",
  },
];

export default function LpLevels() {
  return (
    <section id="levels" className="bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 text-center">
          <p className="mvt-eyebrow mb-3">Levels of Care</p>
          <h2
            className="font-heading font-light text-[var(--mvt-ink)]"
            style={{ fontSize: "clamp(28px, 3.2vw, 46px)", lineHeight: 1.1 }}
          >
            A Continuum of Outpatient Recovery
          </h2>
        </div>
        <div className="grid gap-px bg-[var(--mvt-cream-2)] sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((level, i) => (
            <div key={level.title} className="bg-white p-7 hover:bg-[var(--mvt-cream)] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--mvt-forest)]/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[1px] bg-[var(--mvt-forest)]/15" />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--mvt-muted)] mb-3">{level.intensity}</p>
              <h3 className="font-heading text-lg font-light text-[var(--mvt-ink)] mb-3 leading-snug">{level.title}</h3>
              <p className="text-sm font-light leading-relaxed text-[var(--mvt-muted)]">{level.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
