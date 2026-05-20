const DETOX_LEVELS = [
  {
    num: "01",
    intensity: "Most Intensive",
    duration: "3–10 Days · 24/7 Medical Care",
    title: "Medical Detox",
    desc: "Safe, supervised withdrawal with continuous medical monitoring, medication management, and round-the-clock clinical support.",
    activities: [
      "24/7 medical monitoring",
      "Medication-assisted withdrawal",
      "Nutritional stabilization",
      "Individual check-ins",
    ],
    accent: true,
  },
  {
    num: "02",
    intensity: "High Intensity",
    duration: "28–90 Days · Structured Care",
    title: "Inpatient Rehab",
    desc: "Immersive residential healing — removing you from daily triggers while rebuilding the neural pathways of habit and identity.",
    activities: [
      "Individual & group therapy",
      "Psychoeducational workshops",
      "Experiential therapies",
      "Relapse prevention planning",
    ],
    accent: false,
  },
  {
    num: "03",
    intensity: "Flexible",
    duration: "8–16 Weeks · 3–9 Hrs/Week",
    title: "Outpatient (IOP/OP)",
    desc: "The gentle return — targeted therapy supporting your reintegration into career, family, and community with sustained clinical backing.",
    activities: [
      "Continued individual therapy",
      "Life skills & relapse prevention",
      "Family therapy sessions",
      "Vocational reintegration",
    ],
    accent: false,
  },
];

export default function LpDetoxJourney() {
  return (
    <section className="bg-[#F5F3E7]">
      <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px]">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-end mb-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-4">
              The Detox Journey
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.05]"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Your Path To<br />
              <em className="italic text-ink/50">Lasting Recovery</em>
            </h2>
          </div>
          <p className="text-[14px] font-light leading-relaxed text-ink/60">
            Recovery is a progression, not a single event. We match you to the right level of intensity and walk alongside you through each stage.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-px bg-ink/10">
          {DETOX_LEVELS.map((level) => (
            <div
              key={level.title}
              className={`flex flex-col gap-6 p-8 lg:p-10 ${level.accent ? "bg-ink" : "bg-white"}`}
            >
              {/* Top meta row */}
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`font-[family-name:var(--font-display)] font-normal leading-none select-none ${level.accent ? "text-white/15" : "text-ink/10"}`}
                  style={{ fontSize: "clamp(52px, 6vw, 72px)" }}
                >
                  {level.num}
                </span>
                <span className={`text-[9px] font-semibold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full shrink-0 mt-1 ${level.accent ? "bg-accent/20 text-accent" : "bg-ink/8 text-ink/55"}`}>
                  {level.intensity}
                </span>
              </div>

              {/* Title + desc */}
              <div>
                <h3
                  className={`font-[family-name:var(--font-display)] font-normal leading-snug mb-3 ${level.accent ? "text-white" : "text-ink"}`}
                  style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
                >
                  {level.title}
                </h3>
                <p className={`text-[13.5px] font-light leading-relaxed ${level.accent ? "text-white/55" : "text-ink/60"}`}>
                  {level.desc}
                </p>
              </div>

              {/* Divider */}
              <div className={`h-px w-full ${level.accent ? "bg-white/10" : "bg-ink/10"}`} />

              {/* Duration */}
              <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${level.accent ? "text-accent" : "text-accent"}`}>
                {level.duration}
              </p>

              {/* Activities */}
              <ul className="flex flex-col gap-2.5">
                {level.activities.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className={`w-1 h-1 rounded-full shrink-0 mt-[7px] ${level.accent ? "bg-accent/70" : "bg-ink/30"}`} />
                    <span className={`text-[13px] font-light leading-relaxed ${level.accent ? "text-white/50" : "text-ink/60"}`}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-ink px-8 py-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-1">Not sure which level is right for you?</p>
            <p className="text-[13px] font-light text-white/55">Our admissions team will assess your situation and give you an honest recommendation — no pressure.</p>
          </div>
          <a
            href="tel:9494612620"
            suppressHydrationWarning
            className="shrink-0 inline-flex items-center gap-2 bg-accent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <i className="ri-phone-fill text-xs" />
            Free Assessment
          </a>
        </div>

      </div>
    </section>
  );
}
