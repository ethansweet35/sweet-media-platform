import Link from "next/link";

const FEATURES = [
  {
    icon: "ri-brain-line",
    title: "EMDR Reprocessing",
    body: "Directly resolves traumatic memories stored in the brain, reducing emotional charge without requiring clients to re-narrate painful events.",
  },
  {
    icon: "ri-pulse-line",
    title: "Bilateral Stimulation",
    body: "Activates the brain\u2019s natural healing response through guided eye movements, tactile tapping, or alternating tones to regulate the nervous system.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Integrated Approach",
    body: "Every phase of the EMDR protocol is tailored to fit each client\u2019s history, trauma profile, and pace \u2014 never a rigid formula.",
  },
];

export default function EvidenceBasedSection() {
  return (
    <section className="bg-[var(--mvt-forest-deep)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-teal-light)]" />
            Our Approach
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-teal-light)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Grounded In{" "}
            <span className="italic text-[var(--mvt-teal-light)]">Evidence-Based Therapy</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/80">
            Our clinical model centers on one of the most rigorously studied trauma therapies in
            modern mental health care. Endorsed by the American Psychological Association and the
            World Health Organization, EMDR gives clients a proven path to reprocess traumatic
            memories, quiet the symptoms of PTSD, and free themselves from the past patterns
            driving anxiety, depression, and addiction.
          </p>
        </div>

        {/* Feature tiles */}
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="flex flex-col gap-5 border border-white/10 bg-white/[0.04] p-8 transition hover:border-white/20"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mvt-teal-light)]/15 text-[var(--mvt-teal-light)]">
                <i className={`${f.icon} text-xl`} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-white/70">{f.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-12 sm:flex-row sm:justify-between">
          <p className="text-[15px] font-semibold text-white/90">
            Wondering if EMDR is right for you?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/therapies/cognitive-dialectical/"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/90 transition hover:border-white hover:text-white"
            >
              Compare CBT &amp; DBT
            </Link>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-cream)]"
            >
              Verify Insurance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
