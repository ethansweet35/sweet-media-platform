import { AutoLinkedText } from "@sweetmedia/blog-core";
/**
 * Clinical Modalities — navy background with icon-forward therapy cards.
 * Sticky left intro column, 2-col scrolling grid right.
 */
const THERAPIES = [
  {
    abbr: "CBT",
    icon: "ri-brain-line",
    title: "Cognitive Behavioral",
    description:
      "Identifying and reshaping deeply ingrained, negative thought patterns. CBT is highly effective in breaking the cycle of addiction and severe anxiety.",
  },
  {
    abbr: "DBT",
    icon: "ri-heart-line",
    title: "Dialectical Behavioral",
    description:
      "Focuses on emotional regulation, distress tolerance, and mindfulness. Essential for clients dealing with trauma, self-harm, and intense emotional swings.",
  },
  {
    abbr: "EMDR",
    icon: "ri-eye-line",
    title: "Trauma Resolution",
    description:
      "Eye Movement Desensitization and Reprocessing safely rewires how the brain stores traumatic memories, neutralizing their emotional sting without extensive verbal processing.",
  },
  {
    abbr: "1-ON-1",
    icon: "ri-user-heart-line",
    title: "Individual Therapy",
    description:
      "Deep, confidential 1-on-1 sessions with a dedicated master's level clinician to safely unpack your unique history, triggers, and goals.",
  },
  {
    abbr: "PEER",
    icon: "ri-team-line",
    title: "Group Processing",
    description:
      "Facilitated group sessions rebuild a sense of community, allowing clients to learn from peers, practice vulnerability, and realize they are not alone.",
  },
  {
    abbr: "FAMILY",
    icon: "ri-home-heart-line",
    title: "Family Systems",
    description:
      "Addiction is a family disease. We offer structured therapy to rebuild broken trust, establish healthy boundaries, and heal the family unit as a whole.",
  },
];

export default function ClinicalModalities() {
  return (
    <section className="relative overflow-hidden bg-navy py-24">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-terracotta/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-terracotta/8 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">

          {/* Left sticky intro */}
          <div className="relative lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="mb-6 h-[2px] w-12 bg-terracotta"></div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
                <AutoLinkedText>{"Evidence-Based Practices"}</AutoLinkedText>
              </p>
              <h2 className="mb-6 font-serif text-4xl leading-[1.1] text-white lg:text-5xl">
                Clinical Modalities.
              </h2>
              <p className="mb-8 text-sm font-light leading-relaxed text-white/60">
                <AutoLinkedText>{"Healing is not a guessing game. We utilize highly effective,\n                rigorously researched therapeutic frameworks. By combining\n                these modalities, our clinical team creates a custom blueprint\n                for your psychological recovery."}</AutoLinkedText>
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:text-terracotta"
              >
                Discuss Your Plan
                <i className="ri-arrow-right-line text-base leading-none"></i>
              </a>
            </div>
          </div>

          {/* Right grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {THERAPIES.map((therapy) => (
                <div
                  key={therapy.abbr}
                  className="group relative overflow-hidden border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-terracotta/40 hover:bg-white/10"
                >
                  {/* Terracotta left bar on hover */}
                  <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-terracotta opacity-0 transition-all duration-300 group-hover:opacity-100" />

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/15 transition-colors duration-300 group-hover:bg-terracotta/25">
                      <i className={`${therapy.icon} text-xl leading-none text-terracotta`}></i>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
                      {therapy.abbr}
                    </span>
                  </div>

                  <h4 className="mb-3 font-serif text-xl text-white">
                    {therapy.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-white/55"><AutoLinkedText>{therapy.description}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
