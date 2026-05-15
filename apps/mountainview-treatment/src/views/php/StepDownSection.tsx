import Image from "next/image";

const IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/Untitled-design-2026-03-27T162515.018.webp";

const BULLETS = [
  "Evidence-based therapeutic interventions",
  "Medical monitoring and medication management",
  "Individual, group, and family therapy sessions",
  "Psychiatric care and dual diagnosis treatment",
  "Holistic wellness and nature-based therapies",
];

export default function StepDownSection() {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-12 lg:py-24">
        <div className="self-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span
              aria-hidden="true"
              className="inline-block h-px w-7 bg-[var(--mvt-ink)]"
            />
            Daily Programming
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[52px]">
            Step Down From <span className="italic">Inpatient Care</span>
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-[var(--mvt-text)]">
            <p>
              Our Partial Hospitalization Program (PHP) represents the highest
              level of outpatient care available. Designed for individuals who
              need intensive clinical support but don&rsquo;t require 24-hour
              medical supervision, PHP offers comprehensive treatment while
              allowing you to return home each evening.
            </p>
            <p>
              This level of care is ideal for those transitioning from
              inpatient treatment, experiencing a relapse, or needing more
              structure than traditional outpatient therapy provides.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14px] leading-6">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
                  <i className="ri-check-line text-xs" aria-hidden="true" />
                </span>
                <span className="text-[var(--mvt-text)]">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden lg:max-w-[460px] lg:justify-self-end">
          <Image
            src={IMG}
            alt="A person in early recovery enjoying a peaceful moment in the Pacific Northwest"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 460px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
