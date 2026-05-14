const LEVELS = [
  {
    intensity: "24/7 Care | Most Intensive",
    title: "Inpatient / Residential",
    body: "Typically 28–90 days, offering immersive support tailored to individual progress and needs. Regular individual therapy addressing underlying issues, diverse group therapy sessions for peer support and learning, psychoeducational workshops on recovery skills, and experiential therapies like art and movement.",
  },
  {
    intensity: "5 Days A Week | High Intensive",
    title: "Partial Hospitalization Program (PHP)",
    body: "Our PHP provides a step-down from inpatient hospitalization or a step-up from traditional outpatient care. You'll attend treatment sessions for a significant portion of the day, typically five days a week, while still residing at home. Our multidisciplinary team provides individual therapy, group therapy, and psychoeducation.",
  },
  {
    intensity: "3–5 Days A Week | Medium Intensive",
    title: "Intensive Outpatient Program (IOP)",
    body: "Our IOP offers a flexible and supportive treatment option for adults seeking to improve their mental health while maintaining their daily routines. You'll attend treatment sessions several times per week, typically for a few hours each day — allowing you to continue with work, school, or family commitments.",
  },
  {
    intensity: "3 Days A Week | Least Intensive",
    title: "Outpatient Program",
    body: "Our standard outpatient program provides ongoing therapeutic support as you integrate back into daily life. Sessions focus on relapse prevention, coping skills maintenance, and reinforcing recovery concepts learned during higher levels of care.",
  },
];

export default function LpMhLevels() {
  return (
    <section className="bg-[#F8F6F3] py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Levels of Care</p>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
          >
            A Continuum of Mental Health Care
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((level, i) => (
            <div key={level.title} className="bg-white border border-warm/40 p-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[1px] bg-accent/20" />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40 mb-3">{level.intensity}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-normal text-ink mb-3">{level.title}</h3>
              <p className="text-sm font-light leading-relaxed text-ink/70">{level.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
