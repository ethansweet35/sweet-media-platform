import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  hideHeroForm: true,
  heroImage: "mh_anxiety_hero01.jpg",
  heroImageAlt: "Misty morning forest path with soft light filtering through eucalyptus trees representing calm emerging from anxiety treatment",
  category: "Anxiety",
  headline: "Anxiety",
  headlineEmphasis: "Disorders",
  subhead: "Anxiety disorders are the most prevalent mental health conditions — and among the most treatable. Evidence-based therapies including CBT and exposure therapy produce lasting relief without lifelong medication dependency.",
  quickFacts: [
    { value: "40M",    label: "US Adults Affected" },
    { value: "CBT",    label: "Gold-Standard Treatment" },
    { value: "Psych",  label: "Medication Management" },
    { value: "EMDR",   label: "For Trauma-Driven Anxiety" },
  ],
  overviewTitle: "Understanding Anxiety Disorders",
  overviewCol1: [
    "Anxiety disorders encompass a range of conditions — generalized anxiety disorder (GAD), panic disorder, social anxiety disorder (SAD), specific phobias, agoraphobia, and separation anxiety. What they share is excessive, persistent fear or worry that is disproportionate to the actual threat and that significantly interferes with daily functioning.",
    "Anxiety is the body's threat-response system operating in overdrive. In healthy functioning, anxiety is a protective signal. In anxiety disorders, this system becomes chronically activated — responding to non-threatening stimuli with full fight-or-flight intensity. The result is exhausting, impairing, and often deeply isolating.",
  ],
  overviewCol2: [
    "The neuroscience of anxiety disorders involves dysregulation of the amygdala (the brain's threat-detection center), prefrontal cortical control systems, and stress hormone pathways. These systems are highly responsive to both pharmacological treatment and evidence-based psychotherapy.",
    "Co-occurring conditions are the norm in anxiety disorders — depression, PTSD, substance use (often as self-medication), and OCD frequently co-occur. At Rize OC, all co-occurring conditions are assessed and treated simultaneously from day one.",
  ],
  signsLabel1: "Cognitive & Emotional Signs",
  signsLabel2: "Physical & Behavioural Signs",
  signsIcon1: "ri-mental-health-line",
  signsIcon2: "ri-heart-pulse-line",
  symptoms1: [
    { text: "Persistent, excessive worry that is difficult to control" },
    { text: "Racing thoughts and inability to 'turn the mind off'" },
    { text: "Fear of losing control, going crazy, or dying (panic disorder)" },
    { text: "Intense fear of social situations and judgment (social anxiety)" },
    { text: "Catastrophic thinking — assuming worst-case outcomes" },
    { text: "Feeling on edge, irritable, or easily startled" },
  ],
  symptoms2: [
    { text: "Heart racing, palpitations, or chest tightness" },
    { text: "Shortness of breath, dizziness, or tingling (panic symptoms)" },
    { text: "Muscle tension, headaches, and jaw clenching" },
    { text: "Sleep disruption — difficulty falling or staying asleep" },
    { text: "Avoidance of situations that trigger anxiety (driving, crowds, social events)" },
    { text: "Fatigue from constant physiological activation" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Psychological Progression",
      desc: "Untreated anxiety disorders tend to expand — avoidance behaviors spread to more situations, the anxiety-inducing stimuli multiply, and functioning narrows progressively. What begins as social anxiety may generalize to agoraphobia. What begins as health anxiety may expand to pervasive generalized anxiety.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Physical Health Consequences",
      desc: "Chronic anxiety produces measurable physical health consequences — elevated cortisol, immune suppression, cardiovascular strain, GI dysfunction, and chronic pain amplification. The physical and psychological burden of untreated anxiety disorders is substantial and progressive.",
    },
    {
      icon: "ri-group-line",
      title: "Substance Use & Self-Medication",
      desc: "Alcohol, benzodiazepines, and cannabis are commonly used to self-medicate anxiety — providing short-term relief while dramatically worsening anxiety over time. The anxiety-substance use cycle is one of the most common dual-diagnosis presentations we treat at Rize OC.",
    },
  ],
  treatmentSteps: [
    {
      title: "Comprehensive Anxiety Assessment",
      desc: "Identifying the specific anxiety disorder(s) present, their severity, any co-occurring conditions, and prior treatment history. Differentiating anxiety from trauma-related conditions (PTSD), OCD, and medical causes of anxiety symptoms.",
      detail: "Accurate diagnosis is particularly important in anxiety — GAD, panic disorder, and social anxiety each have somewhat different optimal treatment approaches.",
    },
    {
      title: "Psychiatric Medication Management",
      desc: "SSRIs and SNRIs are first-line pharmacological treatments for most anxiety disorders — effective without the dependence risks of benzodiazepines. Buspirone, hydroxyzine, and beta-blockers are used for specific symptom management as indicated.",
      detail: "Non-benzo anxiolytics are preferred for any patient with substance use history. Our psychiatrists manage all medication transitions and tapering from any existing benzo prescriptions.",
    },
    {
      title: "Cognitive Behavioral Therapy (CBT)",
      desc: "CBT for anxiety targets the cognitive patterns (catastrophic thinking, overestimation of threat) and behavioral patterns (avoidance) that maintain anxiety disorders. It is the most extensively researched psychotherapy for anxiety, with strong evidence across all anxiety disorder subtypes.",
      detail: "CBT's effects in anxiety disorders are durable — maintained at 1-year and 2-year follow-up without ongoing therapy. This is a key advantage over medication-only approaches.",
    },
    {
      title: "Exposure Therapy",
      desc: "Systematic, graduated exposure to anxiety-triggering stimuli — the most powerful component of CBT for anxiety. Exposure breaks the avoidance cycle, demonstrates that feared outcomes do not occur, and retrains the brain's threat-detection system through direct experience.",
      detail: "Exposure therapy is uncomfortable but effective. The therapeutic relationship and clear clinical structure make the discomfort manageable and the outcomes transformative.",
    },
    {
      title: "Mindfulness & Long-Term Skills",
      desc: "Mindfulness-based practices, somatic grounding skills, and long-term anxiety management tools that extend the gains of active treatment — providing a self-sustaining toolkit for managing anxiety throughout life.",
      detail: "MBSR and MBCT have strong evidence for anxiety disorders and complement CBT particularly well in the maintenance phase.",
    },
  ],
  faqs: [
    {
      q: "Is anxiety just stress? Do I really need treatment?",
      a: "Stress is a response to identifiable external demands that resolves when the demands change. Anxiety disorders persist independently of external circumstances, generate disproportionate responses, and significantly impair functioning. If anxiety is affecting your relationships, professional life, physical health, or quality of life — and particularly if you are avoiding situations because of it — clinical treatment is warranted. Anxiety disorders rarely resolve on their own and typically worsen without treatment.",
    },
    {
      q: "Do I have to take medication for anxiety?",
      a: "No. CBT and exposure therapy alone produce excellent outcomes for most anxiety disorders, and many people prefer a therapy-only approach. Medication can accelerate initial symptom relief and is particularly useful when anxiety is severe enough to make engaging in therapy very difficult. The decision is clinical and collaborative — made between you and your treatment team based on severity, preferences, and prior treatment history.",
    },
    {
      q: "What is a panic attack, and does it mean something is medically wrong?",
      a: "Panic attacks are sudden surges of intense fear accompanied by physical symptoms — racing heart, shortness of breath, chest tightness, dizziness, tingling — that peak within minutes. They are physiologically intense but not medically dangerous. The physical symptoms are caused by the body's fight-or-flight response activating fully in the absence of a real threat. Medical causes (cardiac, thyroid, respiratory) should be ruled out with a first episode, but most panic attacks are psychiatric in origin and respond well to CBT.",
    },
    {
      q: "How long does anxiety treatment take?",
      a: "Most people with anxiety disorders experience significant symptom improvement within 12–16 weeks of CBT. Medication effects begin within 2–6 weeks. Full resolution of avoidance behaviors takes longer — particularly for individuals with agoraphobia or widespread avoidance. The goal is not just symptom reduction but behavioral expansion — returning to full engagement with life — which may take several months of structured work.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily structured CBT and psychiatric management for severe or complex anxiety presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "Group-based CBT and individual therapy scheduled around work and life.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth IOP and OP throughout California — particularly useful for social anxiety and agoraphobia.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
