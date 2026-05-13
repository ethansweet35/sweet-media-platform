import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const substanceConditions = [
  { icon: "ri-goblet-line",        title: "Alcohol Use Disorder",       desc: "Medically-supervised detox and evidence-based treatment for alcohol dependency." },
  { icon: "ri-capsule-line",       title: "Opioid Addiction",           desc: "Specialized care for opioid dependence including MAT and comprehensive support." },
  { icon: "ri-flashlight-line",    title: "Stimulant Addiction",        desc: "Treatment for cocaine, methamphetamine, and prescription stimulant abuse." },
  { icon: "ri-fire-line",          title: "Benzodiazepine Dependence",  desc: "Safe, medically-monitored tapering and therapeutic intervention." },
  { icon: "ri-heart-pulse-line",   title: "Polysubstance Use",          desc: "Comprehensive treatment for multiple substance dependencies." },
];

const mentalConditions = [
  { icon: "ri-cloud-line",          title: "Depression & Mood Disorders", desc: "Evidence-based treatment for major depression, bipolar disorder, and dysthymia." },
  { icon: "ri-mental-health-line",  title: "Anxiety Disorders",           desc: "Specialized care for generalized anxiety, panic disorder, and social anxiety." },
  { icon: "ri-hearts-line",         title: "Trauma & PTSD",               desc: "Trauma-informed care addressing complex trauma, PTSD, and adverse childhood experiences." },
  { icon: "ri-ghost-line",          title: "Schizophrenia",               desc: "Expert care for schizophrenia, schizoaffective disorder, and first-episode psychosis intervention." },
  { icon: "ri-emotion-unhappy-line",title: "Stress & Burnout",            desc: "Executive care for professionals experiencing chronic stress and occupational burnout." },
];

function ConditionCard({ icon, title, desc, accent = false }: {
  icon: string; title: string; desc: string; accent?: boolean;
}) {
  return (
    <div className="border border-warm p-7 flex items-start gap-5">
      <IconCircle
        icon={icon}
        variant={accent ? "accent-subtle" : "muted-subtle"}
        size="xl"
        iconSize="text-2xl"
      />
      <div>
        <h4 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink leading-snug">{title}</h4>
        <p className="mt-1.5 text-sm font-light leading-relaxed text-ink/60"><AutoLinkedText>{desc}</AutoLinkedText></p>
      </div>
    </div>
  );
}

export default function ConditionsSection() {
  return (
    <>
      {/* Main conditions — white bg */}
      <section className="bg-white">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Comprehensive Care"
            heading="Conditions We Treat"
            headingStyle={{ fontSize: "clamp(48px, 5vw, 68px)" }}
            body="Integrated, evidence-based treatment for substance use disorders and co-occurring mental health conditions"
            mb="mb-16"
          />

          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-0">
            {/* Left — Substance Use */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink mb-2">
                Substance Use Disorders
              </h3>
              <p className="text-sm font-light text-ink/60 mb-4">
                <AutoLinkedText>{"Medical detox, evidence-based therapies, and long-term support"}</AutoLinkedText>
              </p>
              <div className="h-[2px] bg-accent mb-5" />
              <div className="flex flex-col gap-4">
                {substanceConditions.map((c) => <ConditionCard key={c.title} {...c} accent />)}
              </div>
            </div>

            {/* Right — Mental Health */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink mb-2">
                Mental Health Conditions
              </h3>
              <p className="text-sm font-light text-ink/60 mb-4">
                <AutoLinkedText>{"Integrated dual diagnosis treatment for co-occurring disorders"}</AutoLinkedText>
              </p>
              <div className="h-[2px] bg-warm mb-5" />
              <div className="flex flex-col gap-4">
                {mentalConditions.map((c) => <ConditionCard key={c.title} {...c} accent={false} />)}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Dual Diagnosis dark callout */}
      <div className="bg-ink px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <IconCircle icon="ri-group-line" variant="accent" size="xl" iconSize="text-2xl" className="mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-normal text-white mb-8">
            Dual Diagnosis Expertise
          </h2>
          <p className="font-[family-name:var(--font-display)] text-2xl font-normal text-white leading-snug">
            <AutoLinkedText>{"More than 50% of individuals with substance use disorders also experience co-occurring mental health conditions.\n            Our integrated treatment approach addresses both simultaneously for lasting recovery."}</AutoLinkedText>
          </p>
          <p className="mt-6 text-sm font-light text-white/50 italic">
            <AutoLinkedText>{"If you don&apos;t see your specific condition listed, please reach out. We provide individualized\n            assessments and treatment plans for a wide range of challenges."}</AutoLinkedText>
          </p>
        </div>
      </div>
    </>
  );
}
