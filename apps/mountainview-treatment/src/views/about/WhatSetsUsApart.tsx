const CARDS = [
  {
    icon: "ri-medal-2-line",
    title: "Clinical Excellence",
    body:
      "JCAHO-accredited and licensed therapists that lead every aspect of care.",
  },
  {
    icon: "ri-shield-keyhole-line",
    title: "Complete Privacy",
    body:
      "Secluded estates and strict confidentiality protocols ensure absolute discretion.",
  },
  {
    icon: "ri-group-line",
    title: "3:1 Staff Ratio",
    body:
      "Exceptional staff-to-client ratio means you receive unparalleled personal attention.",
  },
  {
    icon: "ri-scales-3-line",
    title: "Dual Diagnosis",
    body:
      "Specialized treatment for co-occurring mental health conditions and addiction.",
  },
  {
    icon: "ri-star-line",
    title: "Luxury Amenities",
    body:
      "An upscale, distraction-free clinical setting featuring modern amenities, comfortable seating, and a peaceful atmosphere.",
  },
  {
    icon: "ri-rocket-2-line",
    title: "Aftercare Support",
    body:
      "Lifetime alumni support and continued care planning for sustained recovery.",
  },
];

export default function WhatSetsUsApart() {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Why Mountain View
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[56px]">
            What Sets Us Apart
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="border border-black/5 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--mvt-teal)]/40 text-[var(--mvt-teal)]">
                <i className={`${c.icon} text-xl`} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold text-[var(--mvt-ink)]">
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-[var(--mvt-text)]">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
