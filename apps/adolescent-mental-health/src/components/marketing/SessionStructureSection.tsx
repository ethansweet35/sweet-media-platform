import { CONTAINER } from "@/lib/site";
import { SECTION_PY } from "./tokens";

export type SessionPhase = {
  num: string;
  icon: string;
  title: string;
  body: string;
};

type SessionStructureSectionProps = {
  phases: SessionPhase[];
  eyebrow?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  bg?: "white" | "surface";
};

/**
 * Horizontal phase timeline on white — lighter than ClinicalMethodsSection's dark inset panel.
 */
export default function SessionStructureSection({
  phases,
  eyebrow = "Session structure",
  title = "What to expect in sessions",
  description,
  footer,
  bg = "white",
}: SessionStructureSectionProps) {
  const bgClass = bg === "surface" ? "bg-surface" : "bg-white";

  return (
    <section className={`${bgClass} px-6 ${SECTION_PY} lg:px-10`}>
      <div className={`${CONTAINER} w-full`}>
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-10 bg-accent" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
          </div>
          <h2 className="text-4xl font-bold text-ink md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
            {title}
          </h2>
          {description ? <p className="mt-4 text-sm leading-8 text-body">{description}</p> : null}
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-border lg:block" aria-hidden />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {phases.map((phase) => (
              <div key={phase.num} className="relative flex flex-col lg:items-start">
                <div className="mb-6 flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                  <div
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent"
                    style={{ boxShadow: "0 0 0 4px rgba(131,179,220,0.15)" }}
                  >
                    <i className={`${phase.icon} text-sm text-white`} aria-hidden />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-body/40 lg:hidden">
                    Step {phase.num}
                  </p>
                </div>

                <p className="mb-2 hidden text-xs font-bold uppercase tracking-[0.2em] text-body/40 lg:block">
                  Step {phase.num}
                </p>

                <h3 className="text-lg font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-body">{phase.body}</p>
              </div>
            ))}
          </div>
        </div>

        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </section>
  );
}
