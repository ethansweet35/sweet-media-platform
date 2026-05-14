import Link from "next/link";

const LEVELS = [
  {
    phase: "01",
    label: "Day Treatment",
    intensity: "Highest Intensity",
    days: "5–6 Days / Week",
    name: "Partial Hospitalization Program (PHP)",
    href: "/levels-of-care/partial-hospitalization-program/",
    body:
      "PHP offers the rigorous clinical support of residential care, while allowing clients the autonomy to return home or to our private sober living estates in the evening.",
    ideal:
      "Transitioning directly from detox or residential, severe symptom management, and establishing daily emotional regulation.",
  },
  {
    phase: "02",
    label: "Reintegration",
    intensity: "Flexible Intensity",
    days: "3–5 Days / Week",
    name: "Intensive Outpatient Program (IOP)",
    href: "/levels-of-care/intensive-outpatient-program/",
    body:
      "A flexible yet robust clinical framework designed to support individuals as they reintegrate into their professional careers or academic life. Includes tailored day and evening tracks.",
    ideal:
      "Building community, real-time trigger management, and balancing intensive therapy with personal responsibilities.",
  },
  {
    phase: "03",
    label: "Maintenance",
    intensity: "Least Intensity",
    days: "1–3 Days / Week",
    name: "Outpatient Treatment Program (OP)",
    href: "/levels-of-care/outpatient-program/",
    body:
      "Long-term clinical maintenance focusing on sustained wellness. Clients meet for weekly individual or group therapy to refine coping strategies and maintain accountability in their new life.",
    ideal:
      "Program alumni, sustained independence, and ongoing therapeutic refinement to prevent relapse long-term.",
  },
];

export default function ContinuumSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--mvt-forest-deep)] text-white">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[var(--mvt-forest)]/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[var(--mvt-teal)]/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mvt-eyebrow-light">Treatment Pathways</p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              The <span className="italic text-[var(--mvt-cream)]">Continuum</span> Of Care.
            </h2>
          </div>
          <p className="max-w-xl self-end text-base leading-7 text-white/75">
            Recovery is not a destination, but a structured progression. Our
            tiered programs are meticulously designed to provide the exact level
            of support needed at every stage of your healing journey.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {LEVELS.map((lvl) => (
            <article
              key={lvl.phase}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-white/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-5xl text-[var(--mvt-cream)]/80">
                  {lvl.phase}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Phase {lvl.phase} | {lvl.label}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-2xl leading-tight text-white">
                {lvl.name}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-white/65">
                <span className="rounded-full border border-white/20 px-3 py-1">
                  {lvl.days}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  {lvl.intensity}
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/75">{lvl.body}</p>

              <div className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-white/70">
                <span className="mvt-eyebrow-light text-[var(--mvt-cream)]">
                  Ideal For
                </span>
                <p className="mt-1.5">{lvl.ideal}</p>
              </div>

              <Link
                href={lvl.href}
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-cream)] transition group-hover:gap-3"
              >
                Explore Program
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
