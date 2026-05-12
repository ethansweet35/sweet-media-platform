import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_adhd_hero01.jpg",
  heroImageAlt: "Warm organized creative workspace in California afternoon light representing focus and clarity in ADHD treatment",
  category: "ADHD",
  headline: "ADHD &",
  headlineEmphasis: "Attention Disorders",
  subhead: "ADHD is a neurodevelopmental condition with effective, evidence-based treatment options. Proper diagnosis, medication management, and skills-based therapy significantly improve functioning, self-regulation, and quality of life at any age.",
  quickFacts: [
    { value: "10%",    label: "Adults Affected" },
    { value: "3 Types",label: "Inattentive / Hyper / Combined" },
    { value: "Often",  label: "Misdiagnosed or Missed" },
    { value: "Treat",  label: "At Any Age" },
  ],
  overviewTitle: "Understanding ADHD in Adults",
  overviewCol1: [
    "Attention-Deficit/Hyperactivity Disorder (ADHD) is one of the most common neurodevelopmental conditions — and one of the most frequently misunderstood. In adults, it presents differently than the hyperactive child stereotype: executive function deficits, emotional dysregulation, chronic disorganization, time blindness, and difficulty sustaining attention on low-stimulation tasks are often the dominant features.",
    "Adult ADHD is significantly underdiagnosed, particularly in women (who more often present with the inattentive subtype) and in high-achieving individuals who have compensated through tremendous effort and intelligence — but are exhausted by the effort required.",
  ],
  overviewCol2: [
    "ADHD frequently co-occurs with anxiety, depression, substance use disorders, and sleep problems. The substance use connection is particularly important: stimulant substances (cocaine, meth, nicotine) are commonly used to self-medicate ADHD symptoms, and untreated ADHD is a significant risk factor for stimulant use disorder.",
    "Effective ADHD treatment at Rize OC combines accurate diagnosis, medication management (including non-stimulant options for those in substance use recovery), and CBT-based skills work targeting the executive function deficits that medication alone does not fully address.",
  ],
  signsLabel1: "Cognitive & Attentional Signs",
  signsLabel2: "Behavioural & Emotional Signs",
  signsIcon1: "ri-brain-line",
  signsIcon2: "ri-emotion-line",
  symptoms1: [
    { text: "Difficulty sustaining attention on tasks that require mental effort" },
    { text: "Easily distracted by external stimuli or unrelated thoughts" },
    { text: "Frequently losing items needed for tasks (keys, phone, wallet)" },
    { text: "Forgetfulness in daily activities — missed appointments, unpaid bills" },
    { text: "Difficulty following through on tasks from start to completion" },
    { text: "Hyperfocus on highly stimulating activities while neglecting necessary ones" },
  ],
  symptoms2: [
    { text: "Time blindness — chronic lateness, difficulty estimating time" },
    { text: "Emotional dysregulation — intense, rapid emotional reactions" },
    { text: "Impulsive decisions — speaking without thinking, spending, risky behavior" },
    { text: "Chronic inner restlessness even when outwardly still" },
    { text: "Difficulty initiating tasks despite knowing they are important" },
    { text: "Low frustration tolerance and quick to anger or overwhelm" },
  ],
  consequences: [
    {
      icon: "ri-briefcase-line",
      title: "Occupational & Academic",
      desc: "Untreated ADHD in adults produces measurable impairment in professional performance, career advancement, and academic attainment. Executive function deficits make sustained performance in conventional work structures genuinely difficult — not a matter of motivation or effort.",
    },
    {
      icon: "ri-group-line",
      title: "Relational Impact",
      desc: "Forgetfulness, impulsivity, emotional dysregulation, and inconsistency strain intimate relationships, friendships, and parenting. Partners and family members often experience the person with ADHD as unreliable or uncaring — when the behavior is neurological rather than volitional.",
    },
    {
      icon: "ri-drop-line",
      title: "Substance Use Risk",
      desc: "Untreated ADHD significantly increases risk of substance use disorders — both as self-medication and because impulsivity is a core risk factor for substance experimentation and escalation. Treating ADHD appropriately is often a key component of addiction treatment for individuals with this co-occurring presentation.",
    },
  ],
  treatmentSteps: [
    {
      title: "Comprehensive Neuropsychological Assessment",
      desc: "Thorough diagnostic evaluation distinguishing ADHD from anxiety, depression, bipolar disorder, sleep disorders, and trauma — all of which can produce ADHD-like symptoms. Assessment of ADHD subtype, severity, and specific executive function profile.",
      detail: "Adult ADHD diagnosis requires careful evaluation. Anxiety and depression can both produce attentional symptoms that mimic ADHD, and the conditions frequently co-occur.",
    },
    {
      title: "Medication Management",
      desc: "For individuals without substance use history: stimulant medications (methylphenidate, amphetamine-based) are first-line and highly effective. For individuals in substance use recovery: non-stimulant medications (Strattera, Wellbutrin, Intuniv) provide effective ADHD management without abuse potential.",
      detail: "Non-stimulant ADHD treatment is equally evidence-based and appropriate for all clients in addiction recovery. The choice of medication is made collaboratively with full transparency.",
    },
    {
      title: "CBT for ADHD",
      desc: "CBT adapted specifically for ADHD addresses the executive function deficits, emotional dysregulation, and negative self-belief patterns that persist despite medication. Skills include time management systems, task initiation strategies, and cognitive restructuring for the shame and self-criticism common in adult ADHD.",
      detail: "Medication addresses neurotransmitter availability. CBT builds the behavioral habits and compensatory strategies that help individuals use their brain more effectively.",
    },
    {
      title: "Co-occurring Condition Treatment",
      desc: "Assessment and treatment of co-occurring anxiety, depression, or substance use disorders. ADHD and anxiety in particular are closely intertwined and require careful clinical differentiation and simultaneous treatment.",
      detail: "Treating ADHD without addressing co-occurring depression or anxiety often produces incomplete results. Our integrated team manages all conditions in parallel.",
    },
    {
      title: "Skills & Supports",
      desc: "Building practical systems for organization, time management, and self-regulation that work with the ADHD brain rather than against it. Workplace accommodations guidance, relationship communication skills, and sleep optimization are all components.",
      detail: "Many high-functioning adults with ADHD have spent decades fighting their neurology. Learning to work with it — rather than against it — is transformative.",
    },
  ],
  faqs: [
    {
      q: "Is ADHD real in adults?",
      a: "Yes — absolutely. ADHD was historically considered a childhood condition, but the research is unambiguous: it persists into adulthood in approximately 60–70% of those diagnosed in childhood, and many adults were never diagnosed as children. ADHD in adults is well-established in the DSM-5 and is recognized by every major medical and psychiatric authority. The presentation changes with age — hyperactivity becomes internal restlessness, and executive function deficits become the dominant feature — but the underlying neurological condition is the same.",
    },
    {
      q: "Can I get ADHD medication if I have a history of substance use?",
      a: "Yes, but the approach is individualized. For individuals in early recovery from substance use disorders, stimulant medications require careful risk-benefit assessment — they carry abuse potential and may not be appropriate in early recovery. Non-stimulant medications (atomoxetine/Strattera, bupropion/Wellbutrin, viloxazine/Qelbree, guanfacine/Intuniv) are effective alternatives with no abuse potential and are the preferred approach for clients in addiction recovery. Our psychiatrists are experienced in navigating this clinical territory.",
    },
    {
      q: "How is ADHD different from just being disorganized or busy?",
      a: "ADHD is characterized by executive function deficits that are pervasive, persistent, and cross-situational — they appear in multiple settings (work, home, relationships) and have been present since childhood. They represent a genuine impairment in the brain's self-regulation capacity, not a character trait or lifestyle choice. Most people with ADHD are highly aware of their difficulties and have tried extensively to compensate — often with significant effort. The impairment persists despite this effort, which is what distinguishes it from normal individual variation in organizational style.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily psychiatric management and CBT for complex ADHD with co-occurring conditions.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "ADHD-focused CBT and co-occurring condition management alongside daily life.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth IOP and OP — flexible scheduling that works with ADHD's time management challenges.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
