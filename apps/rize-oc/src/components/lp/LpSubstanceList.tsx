const DEFAULT_SUBSTANCES = [
  { icon: "ri-goblet-line",      title: "Alcohol Addiction" },
  { icon: "ri-flashlight-line",  title: "Meth Addiction" },
  { icon: "ri-drop-line",        title: "Opiate Addiction" },
  { icon: "ri-contrast-2-line",  title: "Cocaine Addiction" },
  { icon: "ri-pill-line",        title: "Xanax Addiction" },
  { icon: "ri-fire-line",        title: "Fentanyl Addiction" },
  { icon: "ri-capsule-line",     title: "Suboxone Addiction" },
  { icon: "ri-heart-pulse-line", title: "Polysubstance Use" },
];

interface LpSubstanceListProps {
  headline?: string;
  intro?: string;
  substances?: string[];
}

export default function LpSubstanceList({
  headline = "Evidence-Based Treatment Designed Around Your Unique Needs",
  intro = "Substance use disorders can affect anyone, regardless of age, background, or lifestyle. At Rize OC, we specialize in treating a wide range of substance use disorders — providing the support and tools to build lasting sobriety.",
}: LpSubstanceListProps) {
  return (
    <section id="substances" className="bg-ink">
      <div className="mx-auto max-w-[1300px] w-full px-[30px] py-14 lg:px-6 lg:py-16">
        <div className="grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-center">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-5">
              Substance Use Disorders We Treat
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white leading-[1.05] mb-6"
              style={{ fontSize: "clamp(34px, 4vw, 50px)" }}
            >
              {headline.split(" ").slice(0, 3).join(" ")}<br />
              <em className="italic text-white/45">{headline.split(" ").slice(3).join(" ")}</em>
            </h2>
            <p className="text-[14px] font-light leading-relaxed text-white/55 mb-8">{intro}</p>
            <p className="text-[13px] font-light leading-relaxed text-white/40">
              Our approach addresses not just addiction symptoms but the underlying issues driving substance use — enabling more holistic, sustained recovery.
            </p>
          </div>

          {/* Right — substance grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {DEFAULT_SUBSTANCES.map((s) => (
              <div
                key={s.title}
                className="group bg-ink hover:bg-white/5 transition-colors duration-300 px-5 py-4 flex items-center gap-4"
              >
                <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/40 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <i className={`${s.icon} text-lg`} />
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg text-white/80 group-hover:text-white transition-colors duration-300 leading-snug">
                  {s.title}
                </span>
                <i className="ri-arrow-right-line ml-auto text-white/15 group-hover:text-accent group-hover:translate-x-1 transform transition-all duration-300 shrink-0" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
