const CONDITIONS = [
  {
    n: "01",
    icon: "ri-shield-cross-line",
    title: "Trauma & PTSD",
    body: "The most extensively researched application of EMDR. Ideal for individuals with single-incident trauma, complex PTSD, or unresolved childhood experiences that continue to drive distress in the present.",
  },
  {
    n: "02",
    icon: "ri-link-m",
    title: "Co-Occurring Disorders",
    body: "Comprehensive support for clients managing both trauma and substance use. EMDR addresses the unprocessed memories that often fuel addiction, helping resolve the root cause rather than only the symptoms.",
  },
  {
    n: "03",
    icon: "ri-pulse-line",
    title: "Anxiety & Panic",
    body: "Targeted care for individuals working through chronic anxiety, panic attacks, or hypervigilance. EMDR helps the nervous system release the stored experiences keeping the body locked in a state of alarm.",
  },
  {
    n: "04",
    icon: "ri-cloud-line",
    title: "Depression",
    body: "For those whose depression is rooted in painful past experiences and core beliefs like \u201CI am not enough.\u201D EMDR reprocesses the memories that formed these beliefs and installs healthier, truer ones in their place.",
  },
  {
    n: "05",
    icon: "ri-heart-3-line",
    title: "Grief & Traumatic Loss",
    body: "Individuals navigating the death of a loved one, sudden loss, or complicated grief benefit from EMDR\u2019s ability to gently process painful memories while preserving the connection and meaning of the relationship.",
  },
  {
    n: "06",
    icon: "ri-medal-line",
    title: "Addiction Recovery",
    body: "Clients in early or ongoing recovery who recognize that trauma, shame, or unresolved pain drive their cravings. EMDR helps reprocess the underlying experiences fueling addictive behavior, supporting sustainable, long-term sobriety.",
  },
];

export default function EmdrWhoBenefitsSection() {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
              Who It Helps
            </p>
            <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
              Who Benefits From{" "}
              <span className="italic">EMDR Therapy</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[var(--mvt-text)] lg:pb-2">
            EMDR is especially effective for conditions rooted in distressing memories,
            traumatic events, and unresolved emotional experiences.
          </p>
        </div>

        {/* Condition grid */}
        <div className="mt-14 grid gap-px border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-5 bg-white p-8 transition hover:bg-[var(--mvt-cream)]/60"
            >
              {/* Number + icon row */}
              <div className="flex items-center justify-between">
                <span className="font-heading text-[42px] font-light leading-none text-[var(--mvt-ink)]/10">
                  {c.n}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
                  <i className={`${c.icon} text-lg`} aria-hidden="true" />
                </span>
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-[var(--mvt-ink)]">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--mvt-text)]">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
