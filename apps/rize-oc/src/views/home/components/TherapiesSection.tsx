import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const therapies = [
  { icon: "ri-scan-line",       title: "EMDR Therapy",                 category: "Trauma",          desc: "Reprocessing deeply rooted trauma through bilateral stimulation, allowing the brain to heal psychological wounds naturally." },
  { icon: "ri-lightbulb-line",  title: "Cognitive Behavioral Therapy", category: "Behavioral",      desc: "Identifying destructive thought patterns and restructuring them into pathways of resilience and lasting clarity." },
  { icon: "ri-walk-line",       title: "Somatic Experiencing",         category: "Nervous System",  desc: "Releasing physical tension and trauma stored in the body, fostering a profound sense of safety and groundedness." },
  { icon: "ri-scales-3-line",   title: "Dialectical Behavior Therapy", category: "Skills",          desc: "Building emotional regulation, distress tolerance, mindfulness, and interpersonal effectiveness for lasting change." },
  { icon: "ri-leaf-line",       title: "Mindfulness-Based Therapy",    category: "Awareness",       desc: "Cultivating present-moment awareness and acceptance to reduce reactivity and enhance emotional balance." },
  { icon: "ri-capsule-line",    title: "Medication-Assisted Treatment",category: "Substance Abuse", desc: "Evidence-based pharmacological support to reduce cravings and stabilize brain chemistry during recovery." },
];

const stats = [
  { value: "12+", label: "Evidence-Based Modalities" },
  { value: "PhD", label: "Clinical Leadership"        },
  { value: "20+", label: "Years Experience"           },
  { value: "1:3", label: "Staff-to-Client Ratio"      },
];

export default function TherapiesSection() {
  return (
    <section className="bg-white">
      <SectionWrapper py="py-[75px] lg:py-[72px]">

        {/* Top header row */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-end mb-16">
          <div>
            <Eyebrow className="mb-5">Methodology</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.05]"
              style={{ fontSize: "clamp(44px, 5vw, 64px)" }}
            >
              Evidence-Based Therapies,{" "}
              <em className="italic text-ink/55">Elegantly Applied</em>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-light leading-relaxed text-ink/65 max-w-md">
              We integrate the most effective clinical modalities with holistic care — treating the whole person, not just the diagnosis.
            </p>
            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-warm/50 mt-2">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-white py-5 px-4 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl text-ink mb-1">{value}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/45 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Therapy grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-warm/40">
          {therapies.map(({ icon, title, category, desc }) => (
            <div
              key={title}
              className="group bg-white hover:bg-cream-alt transition-colors duration-300 p-10 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/35">{category}</span>
                <i className={`${icon} text-xl text-accent/50 group-hover:text-accent transition-colors duration-300`} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink leading-snug">
                {title}
              </h3>
              <p className="text-[15px] font-light leading-relaxed text-ink/60">
                <AutoLinkedText>{desc}</AutoLinkedText>
              </p>
            </div>
          ))}
        </div>

      </SectionWrapper>
    </section>
  );
}
