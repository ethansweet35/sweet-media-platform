import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  heroImage: "add_hallucinogen_hero01.jpg",
  heroImageAlt: "California wildflower meadow at golden hour representing clarity and grounding in recovery near Orange County",
  category: "Hallucinogen Addiction",
  headline: "Hallucinogen",
  headlineEmphasis: "Use Disorder",
  subhead: "While classic hallucinogens like LSD and psilocybin have low physical dependence potential, persistent perceptual disturbances, psychological distress, and problematic use patterns are real clinical concerns requiring specialized treatment.",
  quickFacts: [
    { value: "Low",    label: "Physical Dependence Risk" },
    { value: "HPPD",   label: "Persistent Perception Risk" },
    { value: "CBT",    label: "Primary Treatment Approach" },
    { value: "Psych",  label: "Assessment Required" },
  ],
  overviewTitle: "Understanding Hallucinogen Use Disorder",
  overviewCol1: [
    "Hallucinogens include a wide range of substances — classic psychedelics (LSD, psilocybin, DMT, peyote/mescaline), dissociatives (ketamine, PCP, DXM), and others (MDMA/ecstasy, salvia). Their pharmacological mechanisms vary significantly, as do their risk profiles.",
    "Classic psychedelics like LSD and psilocybin act primarily through serotonin receptors and have relatively low physical dependence potential. However, they can produce profound and sometimes deeply distressing psychological experiences — and problematic use patterns do occur.",
  ],
  overviewCol2: [
    "Hallucinogen Persisting Perception Disorder (HPPD) — a condition where perceptual disturbances from hallucinogen use persist long after the drug has cleared — affects a subset of users and can significantly impair daily functioning. Differentiation from primary psychotic disorders requires careful psychiatric assessment.",
    "MDMA (ecstasy/molly) deserves particular mention as a highly prevalent substance with distinct risks — serotonin neurotoxicity with heavy use, cardiovascular risk, and significant psychological sequelae. At Rize OC, any hallucinogen-related presentation receives thorough psychiatric assessment before treatment planning.",
  ],
  physicalSymptoms: [
    { text: "Perceptual disturbances during and after use — visual hallucinations, distortions, synesthesia" },
    { text: "Persistent perceptual disturbances between or after use episodes (HPPD)" },
    { text: "Elevated heart rate, dilated pupils, and hyperthermia during use" },
    { text: "Sleep disruption — stimulating effects interfere with normal sleep patterns" },
    { text: "Physical exhaustion following MDMA use ('comedown')" },
    { text: "Worsening anxiety and depressive symptoms with recurring use" },
  ],
  behavioralSymptoms: [
    { text: "Using hallucinogens frequently or compulsively despite negative consequences" },
    { text: "Persistent preoccupation with psychedelic experiences" },
    { text: "Inability to function normally between use episodes" },
    { text: "Using to escape reality, manage emotions, or avoid distress" },
    { text: "Relationship and professional deterioration linked to use" },
    { text: "Difficulty distinguishing altered perceptions from baseline reality (persisting)" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Perceptual & Psychological",
      desc: "HPPD — persistent visual disturbances, flashbacks, and perceptual abnormalities — can become chronically disabling for some users. Difficult ('bad') trips can precipitate acute panic, paranoia, and in rare cases, trigger or worsen underlying psychotic disorders. Heavy MDMA use is associated with measurable serotonergic neurotoxicity.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Mental Health Impact",
      desc: "Repeated hallucinogen use in individuals with vulnerability to psychotic or mood disorders can trigger or accelerate psychiatric illness. Post-acute anxiety, depression, and emotional dysregulation following heavy hallucinogen use are clinically significant and require psychiatric assessment and management.",
    },
    {
      icon: "ri-group-line",
      title: "Functioning & Relationships",
      desc: "While often minimized compared to other substances, problematic hallucinogen use disrupts occupational functioning, educational progress, and relationships. The dissociation from baseline reality common in heavy hallucinogen use can erode the capacity for authentic connection and grounded engagement with daily life.",
    },
  ],
  treatmentSteps: [
    {
      title: "Psychiatric Evaluation & Differential Diagnosis",
      desc: "Thorough assessment to differentiate substance-induced perceptual and psychiatric symptoms from primary psychotic, mood, or anxiety disorders. HPPD evaluation and management plan where present.",
      detail: "This step is particularly important with hallucinogen presentations given the overlap between substance-induced symptoms and primary psychiatric conditions.",
    },
    {
      title: "Medical Stabilization",
      desc: "Management of any acute psychiatric symptoms, sleep disruption, or physiological effects of heavy use. SSRI or antipsychotic medication where clinically indicated for persistent perceptual disturbances or anxiety.",
      detail: "Certain antipsychotics have shown efficacy for HPPD symptom reduction. Benzodiazepines are sometimes used short-term for acute anxiety. Treatment is symptom-specific.",
    },
    {
      title: "CBT & Psychological Processing",
      desc: "Addressing the psychological drivers of hallucinogen use — existential distress, trauma avoidance, emotional dysregulation, or seeking spiritual experience through external means. Processing difficult experiences and integrating their psychological content.",
      detail: "Many individuals drawn to hallucinogens are seeking genuine psychological or spiritual experiences. Therapy explores what these needs are and how they can be addressed sustainably.",
    },
    {
      title: "Trauma-Informed Care",
      desc: "Trauma frequently underlies hallucinogen use — both as a driver of use and as a consequence of disturbing experiences. EMDR and trauma-focused CBT address these dimensions as clinically indicated.",
      detail: "Difficult psychedelic experiences can themselves be psychologically traumatic and benefit from trauma-focused processing.",
    },
    {
      title: "Relapse Prevention & Grounded Living",
      desc: "Developing sustainable approaches to meaning, connection, and altered states — through mindfulness, somatic practices, and authentic community — that reduce the pull toward chemical experience.",
      detail: "For many hallucinogen users, the most effective relapse prevention involves genuinely addressing the experiential needs that hallucinogens were serving.",
    },
  ],
  faqs: [
    {
      q: "Are psychedelics actually addictive?",
      a: "Classic psychedelics (LSD, psilocybin) have low physical dependence potential and do not cause the compulsive use pattern seen with stimulants or opioids in most users. However, psychological dependence — using them compulsively to manage distress, avoid emotions, or seek experience — does occur. And the psychiatric consequences of problematic use (HPPD, triggering of underlying conditions, difficult experiences) are real clinical concerns. We treat hallucinogen-related presentations based on the actual clinical picture, not on categorical assumptions about whether they 'should' be addictive.",
    },
    {
      q: "What is HPPD and can it be treated?",
      a: "Hallucinogen Persisting Perception Disorder (HPPD) is a condition where perceptual disturbances associated with hallucinogen use persist beyond the acute drug effect — typically visual phenomena such as trailing, afterimages, geometric patterns, and halos around objects. It ranges from mild and barely noticeable to severely disabling. Treatment is symptom-based: certain antipsychotics, antiseizure medications, and benzodiazepines have shown efficacy in case reports and small trials. Complete cessation of all psychoactive substances is essential.",
    },
    {
      q: "Can hallucinogens trigger a permanent mental illness?",
      a: "Heavy hallucinogen use in individuals with a genetic or personal vulnerability to psychotic disorders can trigger a psychotic episode. In rare cases, this has persisted and evolved into a chronic psychotic illness, though establishing clear causation versus precipitation of a condition that would have emerged anyway is clinically complex. More commonly, hallucinogens may trigger or worsen mood disorders, anxiety disorders, or depressive episodes. Psychiatric assessment for any new psychiatric symptoms following hallucinogen use is strongly recommended.",
    },
    {
      q: "What about MDMA — is it different from psychedelics?",
      a: "MDMA (ecstasy, molly) is technically an entactogen with both stimulant and mild psychedelic properties. Its primary action is on serotonin, dopamine, and norepinephrine — flooding the brain with these neurotransmitters and producing euphoria, empathy, and stimulation. Heavy MDMA use is associated with serotonergic neurotoxicity, significant comedown depression, and cardiovascular risk. Problematic MDMA use is treated with the same clinical rigor as other substance use disorders, with attention to the specific psychiatric and physiological dimensions of MDMA use.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily psychiatric oversight and evidence-based therapy for complex hallucinogen presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "CBT, group therapy, and psychiatric support for ongoing psychological recovery.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth IOP and OP programming available throughout California.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
