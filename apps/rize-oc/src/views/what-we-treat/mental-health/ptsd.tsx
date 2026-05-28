import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  hideHeroForm: true,
  heroImage: "mh_ptsd_hero01.jpg",
  heroImageAlt: "Wide open peaceful California meadow at sunrise representing safety and spaciousness in PTSD recovery",
  category: "PTSD",
  headline: "Trauma &",
  headlineEmphasis: "PTSD",
  subhead: "Post-traumatic stress disorder is one of the most treatable psychiatric conditions when approached with evidence-based care. EMDR, trauma-focused CBT, and integrated psychiatric support produce lasting neurological recovery — not just symptom management.",
  quickFacts: [
    { value: "70%",    label: "Adults Experience Trauma" },
    { value: "EMDR",   label: "Gold-Standard Treatment" },
    { value: "Dual",   label: "Diagnosis Common" },
    { value: "Certs",  label: "EMDR-Certified Therapists" },
  ],
  overviewTitle: "Understanding Trauma and PTSD",
  overviewCol1: [
    "Post-traumatic stress disorder (PTSD) develops when the normal process of trauma memory consolidation is disrupted — leaving the traumatic experience stored as raw, fragmented sensory and emotional material that intrudes on present experience as if the trauma is happening now.",
    "PTSD can follow a single traumatic event (acute trauma: accident, assault, disaster) or develop from repeated, prolonged traumatic experiences (complex trauma/C-PTSD: childhood abuse, domestic violence, chronic war exposure). Complex trauma often produces a broader and more pervasive clinical picture affecting identity, relationships, and affect regulation.",
  ],
  overviewCol2: [
    "The neuroscience of PTSD involves dysregulation of the amygdala (threat detection), hippocampus (memory processing), and prefrontal cortex (executive control) — the same network involved in all threat and stress responses. Effective trauma therapies produce measurable changes in the functioning of this network.",
    "Co-occurring conditions are nearly universal in PTSD — depression, anxiety disorders, substance use disorders, and dissociative conditions are all common. At Rize OC, PTSD treatment is integrated with co-occurring condition management from the outset.",
  ],
  signsLabel1: "Re-experiencing & Avoidance",
  signsLabel2: "Arousal & Mood Changes",
  signsIcon1: "ri-mental-health-line",
  signsIcon2: "ri-heart-pulse-line",
  symptoms1: [
    { text: "Intrusive memories, flashbacks, or nightmares of the traumatic event" },
    { text: "Psychological distress or physical reactions to trauma-related cues" },
    { text: "Avoidance of thoughts, feelings, or memories associated with the trauma" },
    { text: "Avoidance of external reminders — places, people, activities, situations" },
    { text: "Emotional numbing and feeling detached from others" },
    { text: "Inability to experience positive emotions (emotional anesthesia)" },
  ],
  symptoms2: [
    { text: "Hypervigilance — constantly scanning for threat" },
    { text: "Exaggerated startle response" },
    { text: "Sleep disturbance — insomnia, nightmares" },
    { text: "Irritability, anger outbursts, or reckless behavior" },
    { text: "Difficulty concentrating" },
    { text: "Persistent negative beliefs about self, others, or the world" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Neurological & Psychological",
      desc: "Untreated PTSD maintains the nervous system in a state of chronic threat activation — producing measurable neurobiological dysregulation that affects every domain of mental functioning. Depression, anxiety disorders, dissociation, and personality changes are all consequences of chronic unprocessed trauma.",
    },
    {
      icon: "ri-drop-line",
      title: "Substance Use",
      desc: "Alcohol, opioids, cannabis, and benzodiazepines are commonly used to manage PTSD symptoms — numbing intrusive memories, reducing hyperarousal, enabling sleep. This self-medication pattern is one of the most common pathways into substance use disorder, and one of the most important reasons to treat trauma and addiction simultaneously.",
    },
    {
      icon: "ri-group-line",
      title: "Relational & Occupational",
      desc: "PTSD significantly impairs intimate relationships, parenting, and occupational functioning. Hypervigilance, emotional numbing, and reactivity create chronic relational strain. Avoidance can progressively narrow life functioning. Effective PTSD treatment restores both the internal experience and the relational engagement that trauma disrupts.",
    },
  ],
  treatmentSteps: [
    {
      title: "Trauma-Informed Assessment",
      desc: "Comprehensive trauma history assessment, PTSD diagnosis, severity measurement, and evaluation of co-occurring conditions. Establishing a sense of safety and therapeutic alliance before beginning active trauma processing.",
      detail: "The assessment phase is itself therapeutic. Many individuals with PTSD have never told their full story in a safe, non-judgmental clinical context.",
    },
    {
      title: "Stabilization & Skills",
      desc: "Building distress tolerance, grounding skills, and emotional regulation capacity before active trauma processing. For complex PTSD, this phase may be extended. Psychiatric stabilization of any co-occurring conditions runs in parallel.",
      detail: "Trauma processing before adequate stabilization can be destabilizing. The sequence matters — safety and stabilization first, processing second.",
    },
    {
      title: "EMDR Therapy",
      desc: "Eye Movement Desensitization and Reprocessing (EMDR) — the most extensively researched and widely endorsed trauma treatment available. Certified EMDR therapists facilitate the processing of traumatic memories through bilateral stimulation, enabling the brain to consolidate and integrate traumatic material adaptively.",
      detail: "EMDR is endorsed by the WHO, the American Psychological Association, the VA, and the DoD as a first-line PTSD treatment. Processing that takes years in conventional therapy often occurs in weeks with EMDR.",
    },
    {
      title: "Trauma-Focused CBT",
      desc: "Cognitive Processing Therapy (CPT) and Prolonged Exposure (PE) — two evidence-based trauma-focused CBT protocols with the strongest clinical trial evidence in PTSD. Particularly useful for cognitive distortions about the trauma and for individuals who prefer a more cognitive approach.",
      detail: "CPT directly targets the 'stuck points' — distorted beliefs about the trauma and its meaning — that maintain PTSD long after processing.",
    },
    {
      title: "Integration & Long-Term Recovery",
      desc: "Integrating the changes produced by trauma therapy into daily living — rebuilding relationships, expanding avoided activities, and developing a post-traumatic identity that incorporates but is not defined by trauma history.",
      detail: "Post-traumatic growth — the development of new meaning, strength, and perspective following trauma — is a real and achievable outcome of effective PTSD treatment.",
    },
  ],
  faqs: [
    {
      q: "What is the difference between trauma and PTSD?",
      a: "Trauma refers to an experience — something overwhelming that exceeds the individual's capacity to process normally. PTSD is a specific clinical syndrome that develops in a subset of people following trauma exposure — characterized by intrusive re-experiencing, avoidance, negative cognitions and mood, and hyperarousal. Not everyone who experiences trauma develops PTSD; individual vulnerability factors, the nature of the trauma, and available social support all influence who develops clinical PTSD versus who recovers naturally.",
    },
    {
      q: "What is EMDR and how does it work?",
      a: "EMDR (Eye Movement Desensitization and Reprocessing) is a trauma-processing therapy developed by Francine Shapiro in the late 1980s. During EMDR, the therapist guides the client to briefly focus on a traumatic memory while simultaneously directing bilateral stimulation — typically eye movements, but sometimes tapping or auditory tones. This bilateral stimulation appears to engage the brain's information processing system in a way that allows traumatic memories to be processed and integrated rather than remaining as raw, unprocessed material. The mechanism is not fully understood but the evidence is overwhelming: EMDR produces rapid, significant, and durable reductions in PTSD symptoms across hundreds of controlled clinical trials.",
    },
    {
      q: "Do I have to talk about my trauma in treatment?",
      a: "The amount of verbal narrative required varies by therapeutic approach. EMDR requires less detailed verbal recounting than some other trauma therapies — clients focus on the memory and the associated sensations and emotions while the therapist guides bilateral processing. Stabilization-focused work early in treatment focuses primarily on building skills rather than processing content. Treatment is always paced to the client's window of tolerance — effective trauma therapy respects the importance of not overwhelming the nervous system's capacity to process.",
    },
    {
      q: "Can PTSD be fully cured?",
      a: "Many people achieve full remission from PTSD — meaning they no longer meet diagnostic criteria and their symptoms no longer significantly impair functioning. The likelihood of full remission is substantially higher with evidence-based treatment (EMDR, CPT, PE) than with general supportive therapy or medication alone. For complex PTSD, the trajectory is often longer and the treatment more intensive, but significant improvement and functional recovery is achievable for the vast majority of individuals who engage in appropriate treatment.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily EMDR, trauma-focused therapy, and psychiatric oversight — the appropriate starting level for significant PTSD presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "Continued trauma processing and group therapy woven into daily life.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth trauma therapy for clients ready for step-down or who prefer remote care.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
