import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_bpd_hero01.jpg",
  heroImageAlt: "Perfectly still tidal pool reflecting the evening sky — duality and reflection representing identity work in BPD treatment",
  category: "Borderline Personality Disorder",
  headline: "Borderline",
  headlineEmphasis: "Personality Disorder",
  subhead: "BPD is treatable — and highly so, with the right approach. DBT, developed specifically for BPD, produces dramatic and lasting improvements in emotional regulation, relationships, and quality of life.",
  quickFacts: [
    { value: "DBT",    label: "Developed for BPD" },
    { value: "1.6%",   label: "Adult Prevalence" },
    { value: "Often",  label: "Misunderstood Condition" },
    { value: "Highly", label: "Treatable with DBT" },
  ],
  overviewTitle: "Understanding Borderline Personality Disorder",
  overviewCol1: [
    "Borderline personality disorder (BPD) is characterized by a pervasive pattern of instability in interpersonal relationships, self-image, and affect — along with marked impulsivity. It is one of the most misunderstood and stigmatized psychiatric diagnoses, often described in dehumanizing terms that fail to capture the profound suffering involved.",
    "BPD is best understood as a disorder of emotional regulation and interpersonal sensitivity. Individuals with BPD experience emotions intensely — often more intensely than others — and have difficulty returning to baseline once emotionally activated. This produces the apparent 'volatility' that characterizes the condition from the outside, but which is experienced internally as overwhelming, uncontrollable pain.",
  ],
  overviewCol2: [
    "The development of BPD almost universally involves significant trauma history — particularly childhood emotional invalidation, abuse, or neglect. The emotional dysregulation at the core of BPD is, in part, a learned adaptation to an environment in which emotional expression was unsafe, punished, or ignored.",
    "Dialectical Behavior Therapy (DBT), developed by Marsha Linehan specifically for BPD, is the gold-standard evidence-based treatment — and it works. Comprehensive DBT programs produce large, clinically meaningful improvements in suicidal behavior, self-harm, emotional dysregulation, and interpersonal functioning. Recovery is achievable.",
  ],
  signsLabel1: "Emotional & Relational Signs",
  signsLabel2: "Identity & Behavioural Signs",
  signsIcon1: "ri-emotion-line",
  signsIcon2: "ri-user-heart-line",
  symptoms1: [
    { text: "Frantic efforts to avoid abandonment — real or imagined" },
    { text: "Pattern of intense, unstable relationships (idealization and devaluation)" },
    { text: "Intense, rapidly shifting moods lasting hours to days" },
    { text: "Intense anger that is difficult to control" },
    { text: "Chronic feelings of emptiness" },
    { text: "Paranoid ideation or dissociation under stress" },
  ],
  symptoms2: [
    { text: "Markedly unstable self-image or sense of self" },
    { text: "Impulsive behaviors in at least two areas (spending, sex, reckless driving, binging)" },
    { text: "Recurrent suicidal behavior, gestures, threats, or self-harm" },
    { text: "Difficulty maintaining a consistent sense of identity across contexts" },
    { text: "Intense fear of being alone or unloved" },
    { text: "Difficulty maintaining stable employment or relationships over time" },
  ],
  consequences: [
    {
      icon: "ri-heart-pulse-line",
      title: "Self-Harm & Suicidality",
      desc: "Non-suicidal self-injury (NSSI) is common in BPD — often used as an emotional regulation strategy when other skills are unavailable. Suicidal behavior is a significant risk, with approximately 10% of individuals with BPD dying by suicide. Both require immediate clinical attention and are directly targeted in DBT.",
    },
    {
      icon: "ri-group-line",
      title: "Relational Destruction",
      desc: "The intense relational patterns of BPD — idealization, devaluation, abandonment fears, and reactivity — progressively erode intimate relationships, friendships, and professional connections. Untreated, this creates the isolation that deepens the core wound of BPD.",
    },
    {
      icon: "ri-drop-line",
      title: "Substance Use",
      desc: "Substance use is a common emotional regulation strategy in BPD — providing rapid relief from emotional pain at significant long-term cost. The co-occurrence of BPD and substance use disorders requires integrated treatment that addresses both simultaneously.",
    },
  ],
  treatmentSteps: [
    {
      title: "Compassionate Diagnosis & Psychoeducation",
      desc: "BPD diagnosis delivered with clinical compassion and accompanied by psychoeducation — explaining the condition as a disorder of emotional regulation with developmental origins, not a character flaw. This reframing is itself therapeutic and foundational to treatment engagement.",
      detail: "Many individuals with BPD have been treated pejoratively by clinical systems. Our approach is explicitly non-stigmatizing and grounded in the biosocial model of BPD.",
    },
    {
      title: "Comprehensive DBT Program",
      desc: "Dialectical Behavior Therapy (DBT) — the gold-standard treatment for BPD — is delivered in its comprehensive form: individual DBT therapy, DBT skills training groups, phone coaching for crisis generalization, and therapist consultation team.",
      detail: "DBT skills are organized into four modules: mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. Each addresses a core deficit in BPD.",
    },
    {
      title: "Trauma Processing",
      desc: "The trauma histories that underlie BPD development are addressed through trauma-focused work (EMDR, DBT-PE) once sufficient DBT skills have been established. The sequencing — skills first, trauma processing second — is clinically important.",
      detail: "DBT-PE (Prolonged Exposure integrated into DBT) is an evidence-based protocol specifically for trauma in individuals with BPD.",
    },
    {
      title: "Psychiatric Medication Management",
      desc: "No medication has FDA approval specifically for BPD. However, medications can target specific BPD symptom dimensions: mood stabilizers for affective instability, low-dose antipsychotics for paranoia or dissociation, SSRIs for co-occurring depression and anxiety.",
      detail: "Medications are adjunctive in BPD — not primary treatment. The most important treatment change in BPD is always at the psychotherapy level.",
    },
    {
      title: "Interpersonal Skills & Relationship Repair",
      desc: "Building interpersonal effectiveness skills from DBT — specifically targeting the relationship patterns (idealization/devaluation, abandonment sensitivity) central to BPD — and working to repair and build relationships that support recovery.",
      detail: "Recovery from BPD includes developing a more stable sense of self and the capacity for stable, sustaining relationships — two of the most meaningful outcomes of comprehensive DBT treatment.",
    },
  ],
  faqs: [
    {
      q: "Is BPD treatable?",
      a: "Absolutely — and the evidence is compelling. Longitudinal studies show that 50% of individuals with BPD no longer meet full diagnostic criteria at 2 years, and 88% at 10 years — even without specialized treatment. With comprehensive DBT, outcomes are substantially better and faster. This is one of the most important clinical messages for individuals with BPD: this condition improves. Most people who engage in comprehensive DBT treatment experience meaningful, lasting improvement in emotional regulation, relationships, and quality of life.",
    },
    {
      q: "What is DBT and why was it developed for BPD?",
      a: "Dialectical Behavior Therapy (DBT) was developed by Dr. Marsha Linehan — herself a person with BPD who entered remission through treatment — specifically for chronically suicidal and self-harming individuals, most of whom met criteria for BPD. Standard CBT, she found, was too focused on change and not enough on acceptance for this population. DBT integrates change-focused cognitive-behavioral strategies with acceptance and mindfulness-based strategies — the 'dialectic' of acceptance and change. The four skill modules (mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness) directly address the specific deficits in BPD.",
    },
    {
      q: "Is BPD the same as bipolar disorder?",
      a: "No — these are entirely different conditions that are frequently confused. Both involve mood instability, but the character of that instability is different. In bipolar disorder, mood episodes last days to weeks and have a neurobiological cycling pattern. In BPD, mood shifts are rapid — often minutes to hours — and are typically triggered by interpersonal events, particularly real or perceived rejection or abandonment. The treatment approaches also differ substantially: DBT for BPD, mood stabilizers and IPSRT for bipolar disorder.",
    },
    {
      q: "Can people with BPD have healthy relationships?",
      a: "Yes — and this is one of the most meaningful outcomes of comprehensive DBT treatment. The relational patterns of BPD (idealization/devaluation, abandonment sensitivity, reactivity) are not fixed character traits; they are patterns that develop and can change with the right treatment. Individuals who complete comprehensive DBT programs consistently report improvements in relationship stability, decreased conflict, and the ability to form and maintain genuinely sustaining connections. The development of a stable sense of self makes stable relationships possible.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Comprehensive DBT with daily programming — the appropriate level for significant BPD presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "Continued DBT skills groups and individual therapy woven into daily life.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth DBT skills and individual therapy throughout California.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
