import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_bipolar_hero01.jpg",
  heroImageAlt: "Dramatic California sky with sunlight and storm clouds representing the duality of bipolar disorder and the path to stability",
  category: "Bipolar Disorder",
  headline: "Bipolar",
  headlineEmphasis: "Disorder",
  subhead: "Bipolar disorder requires specialized psychiatric expertise and integrated care. Accurate diagnosis, evidence-based mood stabilization, and psychoeducation produce the stability that allows for a full and meaningful life.",
  quickFacts: [
    { value: "2.8%",   label: "US Adult Prevalence" },
    { value: "Often",  label: "Misdiagnosed as MDD" },
    { value: "Psych",  label: "Specialist Required" },
    { value: "Highly", label: "Treatable Condition" },
  ],
  overviewTitle: "Understanding Bipolar Disorder",
  overviewCol1: [
    "Bipolar disorder is a mood disorder characterized by episodes of mania or hypomania alternating with episodes of depression. Bipolar I involves full manic episodes (lasting at least 7 days, often requiring hospitalization); Bipolar II involves hypomanic episodes (less severe, shorter) and major depressive episodes. Cyclothymia involves chronic mood instability that does not fully meet criteria for either.",
    "The depressive episodes in bipolar disorder are often more prolonged, frequent, and functionally impairing than the manic episodes — and are the primary reason most people with bipolar disorder seek treatment. However, treating bipolar depression with antidepressants alone (without a mood stabilizer) can trigger mania or rapid cycling — making accurate diagnosis essential before any medication is prescribed.",
  ],
  overviewCol2: [
    "Bipolar disorder is one of the most frequently misdiagnosed psychiatric conditions — most commonly mistaken for unipolar depression, ADHD, borderline personality disorder, or anxiety disorders. The average time from symptom onset to accurate diagnosis is over 7 years. During this time, inappropriate treatment can worsen the course of illness.",
    "With accurate diagnosis and appropriate treatment, people with bipolar disorder achieve mood stability, maintain functioning, and live full lives. Our psychiatrists bring deep expertise in bipolar spectrum presentations — including the nuanced clinical judgment required to navigate the differential diagnosis and the complex pharmacology of mood stabilization.",
  ],
  signsLabel1: "Manic / Hypomanic Episode Signs",
  signsLabel2: "Depressive Episode Signs",
  signsIcon1: "ri-flashlight-line",
  signsIcon2: "ri-cloud-line",
  symptoms1: [
    { text: "Elevated or expansive mood — unusually good, euphoric, or irritable" },
    { text: "Decreased need for sleep without feeling tired" },
    { text: "Inflated self-esteem or grandiosity" },
    { text: "Racing thoughts and rapid, pressured speech" },
    { text: "Increased goal-directed activity or agitation" },
    { text: "Impulsive, risky behavior — spending, sexual behavior, poor business decisions" },
  ],
  symptoms2: [
    { text: "Persistent depressed mood, tearfulness, emptiness" },
    { text: "Loss of interest in activities once enjoyed" },
    { text: "Fatigue, loss of energy, psychomotor slowing" },
    { text: "Cognitive slowing — difficulty concentrating and making decisions" },
    { text: "Excessive guilt or worthlessness" },
    { text: "Thoughts of death or suicide (more common in bipolar than unipolar depression)" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Illness Progression",
      desc: "Untreated bipolar disorder is associated with episode acceleration — over time, the intervals between episodes shorten and episodes may become more severe. Substance use, sleep disruption, and stress are common triggers. Each episode also increases the risk of cognitive impairment and treatment resistance.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Suicide Risk",
      desc: "Bipolar disorder carries one of the highest suicide rates of any psychiatric condition — up to 20–30 times higher than the general population. Suicidality is highest during depressive and mixed episodes. This is one of the most important reasons why accurate diagnosis and appropriate mood stabilization cannot be delayed.",
    },
    {
      icon: "ri-group-line",
      title: "Relational & Occupational",
      desc: "The behavioral consequences of manic episodes — financial recklessness, impulsivity, grandiose decisions, hypersexuality — cause profound relational and occupational damage. Depressive episodes cause progressive withdrawal and functional decline. Mood stability with effective treatment preserves and restores these domains.",
    },
  ],
  treatmentSteps: [
    {
      title: "Accurate Diagnosis & Differential",
      desc: "Comprehensive psychiatric evaluation differentiating bipolar I, II, and cyclothymia from unipolar depression, ADHD, BPD, and other mood presentations. Review of full psychiatric history, family history, and prior medication responses.",
      detail: "A thorough mood chart — documenting mood states, sleep patterns, and energy levels over time — is often the most useful diagnostic tool in bipolar disorder.",
    },
    {
      title: "Mood Stabilization",
      desc: "Evidence-based mood stabilizers — lithium, valproate, lamotrigine, or atypical antipsychotics — selected based on the specific bipolar subtype, episode predominance (manic vs. depressive), and individual clinical profile. Close medication monitoring throughout.",
      detail: "Lithium remains the gold-standard mood stabilizer with the strongest evidence for both mania prevention and suicide risk reduction. Lamotrigine is preferred for bipolar II with predominantly depressive presentation.",
    },
    {
      title: "Psychoeducation",
      desc: "Understanding bipolar disorder — its neurobiology, its episodic nature, its triggers, and its treatment — is itself therapeutic. Psychoeducation significantly reduces relapse rates and improves treatment adherence. Structured psychoeducation programs are integrated into PHP and IOP programming.",
      detail: "Research shows that structured psychoeducation reduces bipolar relapse rates by approximately 50% compared to medication alone.",
    },
    {
      title: "Interpersonal and Social Rhythm Therapy (IPSRT)",
      desc: "IPSRT — an evidence-based therapy specifically developed for bipolar disorder — stabilizes circadian rhythms and interpersonal routines that play a critical role in triggering and preventing bipolar episodes. Sleep regulation is particularly central.",
      detail: "Disruptions to sleep-wake rhythm are among the most potent triggers for bipolar episodes. IPSRT directly targets this mechanism.",
    },
    {
      title: "Long-Term Maintenance & Relapse Prevention",
      desc: "Building a personalized relapse prevention plan — identifying individual episode triggers, establishing early warning signs, developing a crisis response plan, and maintaining the clinical relationships and medication management needed for long-term stability.",
      detail: "Bipolar disorder is a lifelong condition requiring lifelong management — but 'management' does not mean limitation. With appropriate support, people with bipolar disorder achieve full professional and personal lives.",
    },
  ],
  faqs: [
    {
      q: "How is bipolar disorder different from normal mood swings?",
      a: "Normal mood variation involves feeling good or bad in response to circumstances, with mood shifting over hours to days. Bipolar mood episodes are qualitatively different — they are sustained (lasting days to weeks), often disproportionate to or independent of circumstances, involve distinct physiological changes (altered sleep need, energy, and cognition), and are impairing enough to be observable to others. The key features — particularly the decreased need for sleep without fatigue in hypomania/mania, and the severity and duration of the depressive episodes — distinguish bipolar disorder from normal mood variation.",
    },
    {
      q: "Why is antidepressant monotherapy dangerous in bipolar disorder?",
      a: "Antidepressants (SSRIs, SNRIs, TCAs) can trigger mania, hypomania, or rapid cycling in individuals with bipolar disorder when used without a concurrent mood stabilizer. This is why accurate diagnosis before starting antidepressants is clinically critical — treating bipolar depression as unipolar depression with antidepressants alone can significantly worsen the course of illness. Current treatment guidelines recommend mood stabilizers as the foundation of bipolar treatment, with antidepressants used cautiously and usually in combination with mood stabilizers.",
    },
    {
      q: "Does bipolar disorder get better with age?",
      a: "Without treatment, bipolar disorder typically does not improve with age — and may worsen as episodes become more frequent and the intervals between them shorten. With consistent treatment (medication plus psychotherapy), many people with bipolar disorder achieve progressively better stability over time, develop stronger insight into their episode patterns, and build more effective coping and prevention strategies. Long-term outcomes are substantially better with early, sustained treatment than with delayed or intermittent treatment.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily psychiatric oversight and mood stabilization monitoring — the appropriate starting level for acute bipolar presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Step-Down",
      title: "Intensive Outpatient (IOP)",
      desc: "Ongoing IPSRT, psychoeducation, and psychiatric management following PHP stabilization.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-outbox-line",
      label: "Maintenance",
      title: "Outpatient Program (OP)",
      desc: "Long-term maintenance support and psychiatric management for sustained bipolar stability.",
      href: "/outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
