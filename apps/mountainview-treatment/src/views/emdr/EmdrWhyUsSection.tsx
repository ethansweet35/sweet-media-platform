import Link from "next/link";

const DIFFERENTIATORS = [
  {
    icon: "ri-award-line",
    title: "EMDRIA-Certified Therapists",
    body: "Every EMDR session at Mountain View is led by therapists credentialed through the EMDR International Association — the governing body for clinical EMDR standards and training.",
  },
  {
    icon: "ri-links-line",
    title: "Integrated Dual-Diagnosis Care",
    body: "We treat trauma and substance use simultaneously. EMDR is woven directly into our PHP and IOP programs so clients address the root experiences driving both conditions at once.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Individualized Pacing",
    body: "No two trauma histories are the same. Our clinicians adapt the 8-phase protocol to each client\u2019s pace, ensuring preparation and stabilization are thorough before any reprocessing begins.",
  },
  {
    icon: "ri-shield-check-line",
    title: "HIPAA-Compliant & Confidential",
    body: "Your privacy is protected at every step. Strict confidentiality is a core part of our clinical culture \u2014 not just a legal obligation \u2014 so you can engage in trauma work with full peace of mind.",
  },
];

const STATS = [
  { value: "84–90%", label: "of single-trauma clients no longer meet PTSD criteria after 3 sessions" },
  { value: "30+", label: "randomized controlled trials confirming EMDR\u2019s effectiveness for PTSD" },
  { value: "3 orgs", label: "WHO, APA, and VA all recognize EMDR as a first-line PTSD treatment" },
];

export default function EmdrWhyUsSection() {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">

        {/* Header row */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
              Why Mountain View
            </p>
            <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
              EMDR Done <span className="italic">The Right Way</span>
            </h2>
          </div>
          <Link
            href="/admissions/"
            className="hidden items-center gap-2 border border-[var(--mvt-ink)]/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-ink)] transition hover:border-[var(--mvt-ink)] lg:inline-flex"
          >
            Start Intake
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-black/8 bg-black/8 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value} className="bg-[var(--mvt-cream)] px-8 py-7">
              <p className="font-heading text-[44px] font-light leading-none text-[var(--mvt-teal)] sm:text-[52px]">
                {s.value}
              </p>
              <p className="mt-3 max-w-[22ch] text-[13px] leading-5 text-[var(--mvt-text)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Differentiator grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {DIFFERENTIATORS.map((d) => (
            <article
              key={d.title}
              className="flex gap-5 border border-black/8 bg-white p-7"
            >
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
                <i className={`${d.icon} text-xl`} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-[var(--mvt-ink)]">{d.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--mvt-text)]">{d.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 lg:hidden">
          <Link
            href="/admissions/"
            className="inline-flex items-center gap-2 border border-[var(--mvt-ink)]/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-ink)] transition hover:border-[var(--mvt-ink)]"
          >
            Start Intake
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
