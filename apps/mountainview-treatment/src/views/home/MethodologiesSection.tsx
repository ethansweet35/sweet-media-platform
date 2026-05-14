import Link from "next/link";

const MODALITIES = [
  {
    name: "Cognitive Behavioral (CBT)",
    href: "/therapies/cognitive-dialectical/",
    icon: "ri-brain-line",
    short: "Reframe destructive thoughts to build healthier coping mechanisms and sustainable recovery.",
    body:
      "A foundational therapy focused on identifying and rewiring the negative thought patterns and core beliefs that fuel addiction and mental health challenges.",
  },
  {
    name: "Dialectical Behavior (DBT)",
    href: "/therapies/cognitive-dialectical/",
    icon: "ri-scales-3-line",
    short: "Master mindfulness and emotional balance through targeted skills training.",
    body:
      "A structured, skills-based approach designed to enhance profound emotional regulation, improve interpersonal relationships, and significantly increase distress tolerance.",
  },
  {
    name: "EMDR",
    href: "/therapies/emdr/",
    icon: "ri-eye-line",
    short: "Help your brain naturally process and integrate traumatic experiences.",
    body:
      "A highly effective, evidence-based therapy designed to alleviate the distress associated with traumatic memories through bilateral stimulation.",
  },
  {
    name: "Holistic Integration",
    href: "/therapies/holistic-integration/",
    icon: "ri-leaf-line",
    short: "Ancient healing practices meet modern therapeutic science.",
    body:
      "Complementary practices including guided mindfulness, acupuncture, and equine therapy to nourish the mind, body, and spirit simultaneously.",
  },
  {
    name: "Medication-Assisted",
    href: "/therapies/medication-assisted/",
    icon: "ri-capsule-line",
    short: "Board-certified addiction psychiatrists oversee every medication protocol.",
    body:
      "Precision medical protocols utilizing carefully monitored medications to ease withdrawal, curb cravings, and provide a stable foundation for therapy.",
  },
  {
    name: "Somatic Experiencing",
    href: "/therapies/somatic-experiencing/",
    icon: "ri-heart-pulse-line",
    short: "Reconnect with your body's innate ability to heal.",
    body:
      "A body-centric approach that releases PTSD & trauma trapped within the nervous system, restoring the physical and emotional baseline safely.",
  },
];

export default function MethodologiesSection() {
  return (
    <section className="bg-[var(--mvt-forest-deep)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mvt-eyebrow-light">Modalities</p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Clinical Methodologies &<br className="hidden md:block" />
              <span className="italic text-[var(--mvt-cream)]"> Holistic Integration</span>
            </h2>
          </div>
          <p className="max-w-xl self-end text-base leading-7 text-white/75">
            We utilize a comprehensive suite of advanced therapeutic modalities,
            meticulously tailoring each element to address the precise
            neurological, emotional, and physical needs of the individual.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODALITIES.map((m) => (
            <Link
              key={m.name}
              href={m.href}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-white/30 hover:bg-white/[0.07]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mvt-forest)] text-white">
                <i className={`${m.icon} text-xl`} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-heading text-2xl leading-tight text-white">
                {m.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{m.body}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-[var(--mvt-cream)]/85">
                {m.short}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-cream)] transition group-hover:gap-3">
                Explore
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
