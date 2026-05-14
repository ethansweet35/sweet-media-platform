const DETOX_LEVELS = [
  {
    intensity: "24/7 Care | Most Intensive",
    title: "Medically-Supervised Detox",
    timeline: "Typically 3–10 days, varying based on the substance and individual needs, ensuring safe withdrawal.",
    activities:
      "Continuous medical monitoring and assessment, medication management for withdrawal symptoms, supportive individual check-ins, foundational psychoeducation on addiction and recovery, nutritional support for physical stabilization, and a focus on rest in a calming environment.",
  },
  {
    intensity: "24/7 Care | Medium Intensive",
    title: "Inpatient Rehab",
    timeline: "Typically 28–90 days, offering immersive support tailored to individual progress and needs.",
    activities:
      "Regular individual therapy addressing underlying issues, diverse group therapy sessions for peer support and learning, psychoeducational workshops on recovery skills, experiential therapies like art and movement, participation in 12-Step or similar meetings, mindfulness and meditation practices for emotional regulation, and development of personalized relapse prevention strategies.",
  },
  {
    intensity: "3–5 Days | Least Intensive",
    title: "Outpatient Rehab",
    timeline: "Ranges from several weeks to ongoing, providing flexible support as you reintegrate into daily life.",
    activities:
      "Continued individual therapy for ongoing support, regular group therapy sessions focusing on relapse prevention and life skills, psychoeducational groups reinforcing recovery concepts, family therapy to address relationship dynamics, and support for vocational or educational reintegration.",
  },
];

export default function LpDetoxJourney() {
  return (
    <section className="bg-[#F8F6F3] py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">The Detox Journey</p>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
          >
            Your Path To Lasting Recovery
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {DETOX_LEVELS.map((level, i) => (
            <div key={level.title} className="bg-white border border-warm/40 p-8 relative">
              <div className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-ink/15">
                <span className="text-[11px] font-medium text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-accent mb-3">{level.intensity}</p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-4">{level.title}</h3>
              <div className="w-8 h-[1px] bg-accent mb-4" />
              <p className="text-xs font-medium text-ink/60 mb-2">Timeline</p>
              <p className="text-sm font-light leading-relaxed text-ink/70 mb-4">{level.timeline}</p>
              <p className="text-xs font-medium text-ink/60 mb-2">Activities &amp; Therapies</p>
              <p className="text-sm font-light leading-relaxed text-ink/70">{level.activities}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
