import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

const substanceConditions = [
  { icon: "ri-goblet-line",       title: "Alcohol Use Disorder",       path: "/addiction/alcohol" },
  { icon: "ri-capsule-line",      title: "Opioid Addiction",           path: "/addiction/opiate" },
  { icon: "ri-flashlight-line",   title: "Stimulant Addiction",        path: "/addiction/meth" },
  { icon: "ri-fire-line",         title: "Benzodiazepine Dependence",  path: "/addiction/benzodiazepine" },
  { icon: "ri-heart-pulse-line",  title: "Polysubstance Use",          path: "/addiction/alcohol" },
  { icon: "ri-drop-line",         title: "Heroin & Fentanyl",          path: "/addiction/opiate" },
  { icon: "ri-contrast-2-line",   title: "Cocaine Addiction",          path: "/addiction/cocaine" },
  { icon: "ri-pill-line",         title: "Prescription Drug Abuse",    path: "/addiction/xanax" },
];

const mentalConditions = [
  { icon: "ri-cloud-line",           title: "Depression & Mood Disorders", path: "/mental-health/depression" },
  { icon: "ri-mental-health-line",   title: "Anxiety Disorders",           path: "/mental-health/anxiety" },
  { icon: "ri-hearts-line",          title: "Trauma & PTSD",               path: "/mental-health/ptsd" },
  { icon: "ri-ghost-line",           title: "Schizophrenia",               path: "/mental-health/schizophrenia" },
  { icon: "ri-emotion-unhappy-line", title: "Stress & Burnout",            path: "/mental-health/anxiety" },
  { icon: "ri-contrast-drop-line",   title: "Bipolar Disorder",            path: "/mental-health/bipolar-disorder" },
  { icon: "ri-focus-3-line",         title: "OCD",                         path: "/mental-health/ocd" },
  { icon: "ri-brain-line",           title: "ADHD",                        path: "/mental-health/adhd" },
];

function ConditionGrid({ items, accent }: { items: typeof substanceConditions; accent: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-warm/40">
      {items.map((c) => (
        <Link
          key={c.title}
          href={c.path}
          className="group bg-white hover:bg-cream-alt transition-colors duration-300 p-7 flex items-center gap-5"
        >
          <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            accent
              ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
              : "bg-muted/10 text-muted group-hover:bg-muted group-hover:text-white"
          }`}>
            <i className={`${c.icon} text-lg`} />
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl text-ink group-hover:text-accent transition-colors duration-300 leading-snug">
            {c.title}
          </span>
          <i className="ri-arrow-right-line ml-auto text-ink/15 group-hover:text-accent group-hover:translate-x-1 transform transition-all duration-300 shrink-0" />
        </Link>
      ))}
    </div>
  );
}

export default function ConditionsSection() {
  return (
    <>
      {/* ── Substance Use ───────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px]">
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">

            {/* Left — sticky header */}
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="mb-5">Addiction Treatment</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink leading-none mb-6"
                style={{ fontSize: "clamp(44px, 5vw, 64px)" }}
              >
                Substance Use<br />
                <em className="italic text-ink/60">Disorders</em>
              </h2>
              <p className="text-base font-light leading-relaxed text-ink/65 mb-8">
                Medically supervised detox, evidence-based therapies, and integrated dual-diagnosis support to help you build lasting freedom from addiction.
              </p>
              <Link
                href="/addiction"
                className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-all duration-300"
              >
                All Addiction Programs <i className="ri-arrow-right-line" />
              </Link>
            </div>

            {/* Right — condition grid */}
            <ConditionGrid items={substanceConditions} accent={true} />
          </div>
        </div>
      </section>

      {/* ── Mental Health ────────────────────────────────────────────────── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px]">
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

            {/* Header — first in DOM so it renders above grid on mobile; pushed to col 2 on desktop */}
            <div className="lg:order-2 lg:sticky lg:top-28">
              <Eyebrow colorClass="text-muted" className="mb-5">Mental Health Treatment</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-white leading-none mb-6"
                style={{ fontSize: "clamp(44px, 5vw, 64px)" }}
              >
                Mental Health<br />
                <em className="italic text-white/50">Conditions</em>
              </h2>
              <p className="text-base font-light leading-relaxed text-white/60 mb-8">
                Integrated dual-diagnosis treatment and primary mental health care tailored to your unique needs, delivered by expert clinicians.
              </p>
              <Link
                href="/mental-health"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-ink transition-all duration-300"
              >
                All Mental Health Programs <i className="ri-arrow-right-line" />
              </Link>
            </div>

            {/* Condition grid — second in DOM (below header on mobile); pushed to col 1 on desktop */}
            <div className="lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
                {mentalConditions.map((c) => (
                  <Link
                    key={c.title}
                    href={c.path}
                    className="group bg-ink hover:bg-white/5 transition-colors duration-300 p-7 flex items-center gap-5"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/50 group-hover:bg-muted group-hover:text-white transition-all duration-300">
                      <i className={`${c.icon} text-lg`} />
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-xl text-white/85 group-hover:text-white transition-colors duration-300 leading-snug">
                      {c.title}
                    </span>
                    <i className="ri-arrow-right-line ml-auto text-white/15 group-hover:text-muted group-hover:translate-x-1 transform transition-all duration-300 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
