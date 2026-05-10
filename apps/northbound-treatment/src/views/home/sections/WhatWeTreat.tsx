import { AutoLinkedText } from "@sweetmedia/blog-core";
/**
 * What We Treat — two stacked sections (Substance Abuse on light bg,
 * Dual Diagnosis on espresso bg). Each has 8 condition cards in a 4-col
 * grid. Per Figma WhatWeTreat.tsx.
 *
 * lucide-react icons → Remix Icon equivalents (one icon system per platform).
 */

const SUBSTANCE_ITEMS = [
  {
    name: "Alcohol Addiction",
    icon: "ri-drop-line",
    shortDesc: "Most common dependency",
    description:
      "Alcohol use disorder often co-occurs with anxiety, depression, and trauma. Our medical detox safely manages potentially life-threatening withdrawal symptoms including seizures.",
    treatment:
      "Medical detox, individual & group therapy, relapse prevention, and evidence-based behavioral interventions.",
  },
  {
    name: "Heroin & Opioids",
    icon: "ri-heart-pulse-line",
    shortDesc: "Epidemic-level crisis",
    description:
      "Opioid addiction including heroin, fentanyl, and prescription painkillers has reached epidemic levels. Our program addresses severe withdrawal and high relapse rates comprehensively.",
    treatment:
      "Medication-Assisted Treatment (MAT), behavioral counseling, group therapy, and pain management strategies.",
  },
  {
    name: "Prescription Drugs",
    icon: "ri-file-list-line",
    shortDesc: "Often medically started",
    description:
      "Prescription drug misuse includes painkillers, sedatives, and stimulants. Many develop dependency after legitimate medical prescriptions, requiring specialized judgment-free support.",
    treatment:
      "Supervised tapering, symptom management, psychiatric evaluation, and addressing underlying conditions.",
  },
  {
    name: "Crack & Cocaine",
    icon: "ri-alert-line",
    shortDesc: "Powerful stimulant use",
    description:
      "Cocaine and crack create intense psychological dependency with powerful cravings. While withdrawal is not medically dangerous, the psychological impact requires intensive therapeutic care.",
    treatment:
      "Dopamine regulation therapy, CBT for craving management, mood stabilization, and stress coping skills.",
  },
  {
    name: "Meth Addiction",
    icon: "ri-fire-line",
    shortDesc: "Severe neurotoxicity",
    description:
      "Methamphetamine causes devastating neurotoxicity, cognitive impairment, and severe psychological effects including paranoia and hallucinations. Extended recovery time is needed for brain healing.",
    treatment:
      "Psychiatric support, cognitive rehabilitation, nutritional therapy, dental coordination, and sleep restoration.",
  },
  {
    name: "Adderall & Stimulants",
    icon: "ri-time-line",
    shortDesc: "Prescription misused",
    description:
      "Stimulant medications prescribed for ADHD are frequently misused by students and professionals seeking enhanced focus. Understanding the difference between therapeutic use and dependency is crucial.",
    treatment:
      "Therapeutic vs. dependency assessment, natural focus strategies, ADHD evaluation, and medication alternatives.",
  },
  {
    name: "Benzodiazepines",
    icon: "ri-shield-line",
    shortDesc: "Requires medical taper",
    description:
      "Benzodiazepines like Xanax, Klonopin, and Valium are among the most dangerous substances to withdraw from. Abrupt cessation can cause life-threatening seizures and complications.",
    treatment:
      "Slow medical tapering, alternative anxiety management, mindfulness techniques, and root cause therapy.",
  },
  {
    name: "Polysubstance Use",
    icon: "ri-layers-line",
    shortDesc: "Multiple dependencies",
    description:
      "Many struggle with multiple substance dependencies simultaneously such as alcohol and cocaine, or opioids and benzodiazepines. This creates unique medical challenges requiring comprehensive treatment.",
    treatment:
      "Integrated whole-person treatment, complex withdrawal management, and comprehensive psychiatric support.",
  },
] as const;

const MENTAL_HEALTH_ITEMS = [
  {
    name: "Anxiety Disorders",
    icon: "ri-heart-pulse-line",
    shortDesc: "Panic and persistent fear",
    description:
      "Anxiety disorders including generalized anxiety, panic disorder, and social anxiety often drive substance use as a coping mechanism. Overwhelming fear and constant worry create dependency on substances for relief.",
    treatment:
      "Cognitive behavioral therapy, exposure therapy, mindfulness practices, medication management, and regulation skills.",
  },
  {
    name: "Major Depression",
    icon: "ri-cloud-line",
    shortDesc: "Persistent low mood",
    description:
      "Clinical depression and substance use create a destructive cycle where substances temporarily numb emotional pain but ultimately worsen depressive symptoms. Persistent sadness and hopelessness drive continued use.",
    treatment:
      "Antidepressant medication, evidence-based psychotherapy (CBT/IPT), lifestyle changes, exercise, and trauma work.",
  },
  {
    name: "Bipolar Disorder",
    icon: "ri-refresh-line",
    shortDesc: "Extreme mood cycling",
    description:
      "Bipolar disorder involves cycling between depressive episodes and manic or hypomanic states. Substance use frequently occurs during manic phases or as self-medication for depressive episodes.",
    treatment:
      "Mood stabilization medication, recognizing warning signs and triggers, daily routines, and dual relapse prevention.",
  },
  {
    name: "Borderline Personality",
    icon: "ri-user-line",
    shortDesc: "Emotional dysregulation",
    description:
      "Borderline Personality Disorder is characterized by intense unstable emotions, turbulent relationships, impulsivity, and profound fear of abandonment. Substance use often serves as maladaptive emotional regulation.",
    treatment:
      "Dialectical Behavior Therapy (DBT), distress tolerance, emotion regulation, interpersonal effectiveness, and mindfulness.",
  },
  {
    name: "Emotional Trauma / PTSD",
    icon: "ri-shield-line",
    shortDesc: "Unresolved traumatic stress",
    description:
      "Post-Traumatic Stress Disorder and complex trauma are among the most common underlying causes of addiction. Substances temporarily quiet intrusive thoughts, flashbacks, and constant hypervigilance.",
    treatment:
      "Trauma-informed care, EMDR therapy, somatic experiencing, creating emotional safety, and stabilization skills.",
  },
  {
    name: "Co-Dependency",
    icon: "ri-team-line",
    shortDesc: "Unhealthy relationship patterns",
    description:
      "Co-dependency involves losing one's sense of self in relationships, often enabling others' destructive behaviors while neglecting personal needs. This relational pattern frequently accompanies addiction cycles.",
    treatment:
      "Family systems therapy, boundary establishment, developing independent self-worth, and healthier relationships.",
  },
  {
    name: "OCD",
    icon: "ri-focus-line",
    shortDesc: "Intrusive thoughts/rituals",
    description:
      "Obsessive-Compulsive Disorder involves unwanted intrusive thoughts causing significant anxiety and repetitive behaviors performed to reduce distress. Some use substances attempting to quiet obsessive thinking.",
    treatment:
      "Exposure and Response Prevention (ERP), anxiety management, cognitive restructuring, mindfulness, and medication.",
  },
  {
    name: "ADHD",
    icon: "ri-brain-line",
    shortDesc: "Attention and impulsivity",
    description:
      "Attention-Deficit Hyperactivity Disorder is significantly more common in individuals with substance use disorders. Impulsivity, difficulty with delayed gratification, and self-medication all contribute to addiction risk.",
    treatment:
      "ADHD assessment, non-stimulant medications when appropriate, behavioral strategies, and time management skills.",
  },
] as const;

export default function WhatWeTreat() {
  return (
    <section className="architectural-border-top relative overflow-hidden bg-sand-light py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-terracotta/5 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-navy/10 blur-3xl"></div>
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(#2C2416 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-navy"></div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
              Comprehensive Care
            </p>
            <div className="h-[1px] w-8 bg-navy"></div>
          </div>
          <h2 className="mb-6 font-serif text-4xl text-espresso lg:text-5xl">
            What We Treat.
          </h2>
          <p className="mx-auto max-w-2xl font-light leading-relaxed text-espresso/70">
            <AutoLinkedText>{"We provide specialized, evidence-based care tailored to the\n            individual. By utilizing a whole-person approach, we effectively\n            treat the root causes of both addiction and co-occurring mental\n            health disorders."}</AutoLinkedText>
          </p>
        </div>

        <div className="mb-16">
          <div className="architectural-border relative mb-8 overflow-hidden bg-sand p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-navy/10 blur-3xl"></div>
            <p className="relative z-10 mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-navy">
              Primary Focus
            </p>
            <h3 className="relative z-10 mb-4 font-serif text-3xl text-espresso">
              Substance Abuse Treatment
            </h3>
            <p className="relative z-10 max-w-4xl text-sm font-light leading-relaxed text-espresso/70">
              <AutoLinkedText>{"Our clinical team utilizes proven protocols to safely manage\n              withdrawal and address the deep psychological and behavioral\n              impacts of chemical dependency. We specialize in treating\n              complex, severe, and polysubstance addictions with a focus on\n              sustainable, long-term sobriety."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {SUBSTANCE_ITEMS.map((item) => (
              <div
                key={item.name}
                className="architectural-border group flex items-center gap-4 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/10 transition-colors duration-300 group-hover:bg-navy/20">
                  <i className={`${item.icon} text-lg leading-none text-navy`}></i>
                </div>
                <div>
                  <h4 className="font-serif text-sm text-espresso">{item.name}</h4>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/60"><AutoLinkedText>{item.shortDesc}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="relative mb-8 overflow-hidden bg-navy p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-terracotta/20 blur-3xl"></div>
            <p className="relative z-10 mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
              Integrated Approach
            </p>
            <h3 className="relative z-10 mb-4 font-serif text-3xl text-white">
              Dual Diagnosis & Mental Health
            </h3>
            <p className="relative z-10 max-w-4xl text-sm font-light leading-relaxed text-white/60">
              <AutoLinkedText>{"Mental health and substance use are deeply intertwined. Treating\n              one without the other inevitably leads to relapse. Our\n              specialized psychiatric professionals treat co-occurring\n              disorders concurrently, ensuring that underlying traumas and\n              mental health barriers are resolved."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {MENTAL_HEALTH_ITEMS.map((item) => (
              <div
                key={item.name}
                className="group flex items-center gap-4 border border-white/10 bg-navy p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <i className={`${item.icon} text-lg leading-none text-terracotta`}></i>
                </div>
                <div>
                  <h4 className="font-serif text-sm text-white">{item.name}</h4>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-terracotta/70"><AutoLinkedText>{item.shortDesc}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
