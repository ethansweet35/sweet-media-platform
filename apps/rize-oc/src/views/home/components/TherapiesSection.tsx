import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";

const therapies = [
  { category: "Trauma",          icon: "ri-eye-line", title: "EMDR Therapy",                 desc: "Reprocessing deeply rooted trauma through bilateral stimulation, allowing the brain to heal psychological wounds naturally." },
  { category: "Behavioral",      icon: "ri-eye-line", title: "Cognitive Behavioral Therapy",  desc: "Identifying the quiet, destructive narratives in the mind and gently restructuring them into pathways of resilience." },
  { category: "Nervous System",  icon: "ri-eye-line", title: "Somatic Experiencing",          desc: "Releasing the physical tension of anxiety and trauma trapped within the body, fostering a profound sense of physical safety." },
  { category: "Skills",          icon: "ri-eye-line", title: "Dialectical Behavior Therapy",  desc: "Building emotional regulation, distress tolerance, mindfulness, and interpersonal effectiveness for lasting change." },
  { category: "Awareness",       icon: "ri-eye-line", title: "Mindfulness-Based Therapy",     desc: "Cultivating present-moment awareness and acceptance to reduce reactivity and enhance emotional balance." },
  { category: "Substance Abuse", icon: "ri-eye-line", title: "Medication-Assisted Treatment", desc: "Evidence-based pharmacological support to reduce cravings and stabilize brain chemistry during recovery." },
];

const stats = [
  { value: "12+", label: "Evidence-Based Modalities", icon: "ri-user-heart-line" },
  { value: "PhD", label: "Clinical Leadership",        icon: "ri-bookmark-3-line" },
  { value: "20+", label: "Years Experience",           icon: "ri-heart-2-line" },
  { value: "1:3", label: "Client Ratio",               icon: "ri-group-line" },
];

export default function TherapiesSection() {
  return (
    <section className="bg-white">
      <SectionWrapper>
        {/* Centered header */}
        <div className="text-center pb-14">
          <Eyebrow className="mb-5 flex justify-center">Methodology</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal text-ink leading-[1.05]">
            Evidence-Based Therapies,
            <br />
            <em className="italic text-ink/70">Elegantly Applied</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-0">
          {/* Left dark sidebar */}
          <div className="bg-ink px-10 py-14 flex flex-col justify-start">
            <Eyebrow className="mb-6">Our Approach</Eyebrow>
            <h3 className="font-[family-name:var(--font-display)] text-4xl font-normal text-white leading-[1.1]">
              Clinical Rigor<br />Meets Coastal<br />Tranquility
            </h3>
            <p className="mt-6 text-sm font-light leading-relaxed text-white/60">
              We integrate the most effective evidence-based therapies with holistic modalities, creating a comprehensive treatment experience that addresses the whole person—mind, body, and spirit.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              {stats.map(({ value, label, icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <IconCircle icon={icon} variant="accent" size="sm" />
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-normal text-white">{value}</p>
                    <p className="text-xs font-light text-white/50">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 2x3 grid of therapy cards */}
          <div className="grid sm:grid-cols-2 border-l border-warm">
            {therapies.map(({ category, icon, title, desc }) => (
              <div key={title} className="border-b border-r border-warm p-7 flex flex-col min-h-[281px]">
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/40 mb-5">{category}</p>
                <div className="flex items-center gap-4 mb-5">
                  <IconCircle icon={icon} variant="ink" size="lg" iconSize="text-lg" />
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-semibold text-ink leading-snug">
                    {title}
                  </h3>
                </div>
                <p className="text-[15px] font-light leading-relaxed text-ink/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
