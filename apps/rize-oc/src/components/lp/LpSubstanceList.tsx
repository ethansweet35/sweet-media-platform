const DEFAULT_SUBSTANCES = [
  "Alcohol Addiction",
  "Meth Addiction",
  "Opiate Addiction",
  "Cocaine Addiction",
  "Xanax Addiction",
  "Fentanyl Addiction",
  "Suboxone Addiction",
];

interface LpSubstanceListProps {
  headline?: string;
  intro?: string;
  substances?: string[];
}

export default function LpSubstanceList({
  headline = "Evidence-Based Treatment Designed Around Your Unique Needs",
  intro = "Substance use disorders can affect anyone, regardless of age, background, or lifestyle. At Rize OC, we specialize in treating a wide range of substance use disorders, providing the necessary support and tools to help clients overcome their addictions and build lasting sobriety.",
  substances = DEFAULT_SUBSTANCES,
}: LpSubstanceListProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-4">Substance Use Disorders We Treat</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
            >
              {headline}
            </h2>
            <p className="text-base font-light leading-relaxed text-ink/70 mb-8">{intro}</p>
            <p className="text-sm font-light leading-relaxed text-ink/60">
              Our approach to treatment focuses on not just addressing the symptoms of addiction but also uncovering and resolving the underlying issues that drive substance use. This allows clients to heal more holistically and sustain their recovery well beyond the initial treatment phase.
            </p>
          </div>
          <div className="grid gap-3">
            {substances.map((substance, i) => (
              <div
                key={substance}
                className="flex items-center gap-5 border border-warm/40 bg-[#F8F6F3] px-6 py-4"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/60 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-ink">{substance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
