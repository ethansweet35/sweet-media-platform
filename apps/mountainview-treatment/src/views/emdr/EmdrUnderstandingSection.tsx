const PHASES = [
  { n: "01", title: "History & Treatment Planning", sub: "Identifying target memories" },
  { n: "02", title: "Preparation", sub: "Building coping skills and safety" },
  { n: "03", title: "Assessment", sub: "Measuring emotional distress baselines" },
  { n: "04", title: "Desensitization", sub: "Reprocessing with bilateral stimulation" },
  { n: "05", title: "Installation", sub: "Strengthening positive beliefs" },
  { n: "06", title: "Body Scan", sub: "Releasing somatic trauma responses" },
  { n: "07", title: "Closure", sub: "Returning to stability each session" },
  { n: "08", title: "Reevaluation", sub: "Tracking progress and lasting change" },
];

const HOW_PARAS = [
  "EMDR is a structured, evidence-based therapy founded on the Adaptive Information Processing model, which holds that unresolved traumatic memories are stored differently in the brain and continue to drive present-day distress, anxiety, and addictive behaviors. Using bilateral stimulation \u2014 guided eye movements, tactile tapping, or alternating tones \u2014 EMDR helps the brain reprocess these \u201Cstuck\u201D memories so they lose their emotional charge and integrate naturally with healthier beliefs.",
  "Unlike traditional talk therapy, EMDR does not require clients to discuss traumatic events in extensive detail or complete homework assignments between sessions. Instead, the therapy works with the brain\u2019s innate capacity to heal \u2014 much like the body heals a physical wound when nothing is blocking it. This makes EMDR particularly effective for clients who have struggled to make progress with conventional therapy or who find verbal processing of trauma overwhelming.",
  "In practice, EMDR sessions focus on identifying distressing memories, activating the body\u2019s natural healing response through bilateral stimulation, and replacing negative self-beliefs like \u201CI am unsafe\u201D or \u201CI am powerless\u201D with adaptive truths such as \u201CI am safe now\u201D and \u201CI have control.\u201D Decades of clinical research support EMDR as a first-line treatment for PTSD, complex trauma, anxiety, depression, and substance use disorders.",
];

export default function EmdrUnderstandingSection() {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Understanding EMDR Therapy
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            What is <span className="italic">EMDR Therapy?</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">
            Eye Movement Desensitization and Reprocessing (EMDR) is one of the most extensively
            researched and effective trauma treatments in modern mental health and addiction care.
            Endorsed by the American Psychological Association, the World Health Organization, and
            the Department of Veterans Affairs, EMDR therapy helps individuals process traumatic
            memories, reduce PTSD symptoms, and create lasting emotional change &mdash; often more
            rapidly than traditional talk therapy.
          </p>
        </div>

        {/* Body: prose left, phases right */}
        <div className="mt-16 grid gap-0 lg:grid-cols-[1.15fr_1fr]">

          {/* Left — How EMDR Works */}
          <div className="border-t border-black/10 pr-0 pt-12 lg:border-r lg:border-t-0 lg:pr-14 lg:pt-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-teal)]">
              How It Works
            </p>
            <h3 className="mt-4 font-heading text-[32px] leading-tight tracking-tight text-[var(--mvt-ink)] sm:text-[36px]">
              How EMDR <span className="italic">Therapy Works</span>
            </h3>
            <div className="mt-5 h-px w-12 bg-[var(--mvt-teal)]" />
            <div className="mt-7 space-y-5 text-[15px] leading-7 text-[var(--mvt-text)]">
              {HOW_PARAS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right — 8 Phases */}
          <div className="mt-12 border-t border-black/10 pt-12 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-teal)]">
              The Protocol
            </p>
            <h3 className="mt-4 font-heading text-[32px] leading-tight tracking-tight text-[var(--mvt-ink)] sm:text-[36px]">
              The 8 Phases of <span className="italic">EMDR Therapy</span>
            </h3>
            <div className="mt-5 h-px w-12 bg-[var(--mvt-teal)]" />
            <p className="mt-5 text-[14px] leading-6 text-[var(--mvt-text)]">
              Developed by Dr. Francine Shapiro, EMDR follows a standardized 8-phase protocol
              that guides each client safely from history-taking through full memory reprocessing
              and integration.
            </p>

            <ol className="relative mt-8 space-y-0">
              {PHASES.map((phase, idx) => (
                <li key={phase.n} className="flex gap-5">
                  {/* Connector column */}
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-forest-deep)] text-[11px] font-bold tabular-nums text-white">
                      {phase.n}
                    </span>
                    {idx < PHASES.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mt-1 w-px grow bg-[var(--mvt-forest-deep)]/20"
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className={idx < PHASES.length - 1 ? "pb-5" : ""}>
                    <p className="pt-1.5 text-[13px] font-semibold text-[var(--mvt-ink)]">
                      {phase.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-5 text-[var(--mvt-muted)]">
                      {phase.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
