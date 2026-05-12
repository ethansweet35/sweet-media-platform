import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_depression_hero01.jpg",
  heroImageAlt: "Single shaft of warm light breaking through grey clouds over a California hillside representing hope in depression treatment",
  category: "Depression",
  headline: "Depression &",
  headlineEmphasis: "Mood Disorders",
  subhead: "Depression is one of the most common and most treatable mental health conditions. Evidence-based therapy, psychiatric medication management, and integrated dual-diagnosis care produce lasting, meaningful improvement.",
  quickFacts: [
    { value: "1 in 5",  label: "US Adults Affected" },
    { value: "80%",     label: "Respond to Treatment" },
    { value: "Dual",    label: "Diagnosis Integrated" },
    { value: "EMDR",    label: "Trauma-Focused Option" },
  ],
  overviewTitle: "Understanding Depression and Mood Disorders",
  overviewCol1: [
    "Major depressive disorder (MDD), persistent depressive disorder (dysthymia), bipolar depression, and seasonal affective disorder all fall under the broad category of mood disorders. They share a common feature: a disruption in mood regulation that significantly impairs functioning and quality of life.",
    "Depression is not sadness. It is a neurobiological condition characterized by persistent dysphoria, anhedonia (inability to experience pleasure), cognitive impairment, disrupted sleep and appetite, fatigue, and in severe cases, suicidal ideation. It involves measurable changes in brain chemistry, structure, and function.",
  ],
  overviewCol2: [
    "The causes of depression are multifactorial — genetic vulnerability, neurochemical imbalances, trauma history, chronic stress, medical conditions, and substance use all contribute. This complexity is why effective treatment requires a thorough clinical assessment rather than a one-size-fits-all approach.",
    "Rize OC's integrated model addresses depression comprehensively: psychiatric medication management, evidence-based therapy (CBT, DBT, EMDR for trauma-related depression), and attention to the lifestyle, relational, and co-occurring factors that maintain depressive cycles.",
  ],
  signsLabel1: "Emotional & Cognitive Signs",
  signsLabel2: "Physical & Behavioural Signs",
  signsIcon1: "ri-mental-health-line",
  signsIcon2: "ri-heart-pulse-line",
  symptoms1: [
    { text: "Persistent sad, empty, or hopeless mood most of the day, nearly every day" },
    { text: "Loss of interest or pleasure in activities once enjoyed (anhedonia)" },
    { text: "Feelings of worthlessness, excessive guilt, or self-blame" },
    { text: "Difficulty concentrating, remembering, or making decisions" },
    { text: "Recurrent thoughts of death or suicide, or a suicide attempt" },
    { text: "Irritability, frustration, or low frustration tolerance" },
  ],
  symptoms2: [
    { text: "Persistent fatigue and loss of energy" },
    { text: "Significant weight loss or gain, or changes in appetite" },
    { text: "Insomnia or hypersomnia (sleeping too much)" },
    { text: "Psychomotor agitation or slowing — observable by others" },
    { text: "Withdrawal from social activities, relationships, and responsibilities" },
    { text: "Neglect of self-care, hygiene, and basic daily functioning" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Neurological Progression",
      desc: "Untreated depression is not static — it progresses. Each depressive episode increases the risk and severity of subsequent episodes. Chronic depression produces measurable structural brain changes and increasing treatment resistance. Early, effective intervention produces substantially better long-term outcomes.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Physical Health Impact",
      desc: "Depression significantly increases risk of cardiovascular disease, immune dysfunction, chronic pain conditions, and metabolic disorders. The link between depression and physical health is bidirectional — each worsens the other. Untreated depression shortens life expectancy through both suicide and accelerated physical disease.",
    },
    {
      icon: "ri-group-line",
      title: "Relational & Occupational",
      desc: "Depression impairs every dimension of functioning — professional performance, intimate relationships, parenting, and social engagement. Untreated, it causes progressive deterioration in these domains. Effective treatment reverses this — most people who receive adequate treatment return to full functioning.",
    },
  ],
  treatmentSteps: [
    {
      title: "Psychiatric Assessment & Diagnosis",
      desc: "Comprehensive psychiatric evaluation establishing diagnosis, severity, prior treatment history, and any co-occurring conditions. Differentiation of unipolar depression from bipolar disorder is clinically critical — the treatment approaches differ significantly.",
      detail: "Bipolar depression misdiagnosed as MDD and treated with antidepressants alone can trigger mania. Accurate diagnosis at this stage is foundational.",
    },
    {
      title: "Medication Management",
      desc: "SSRIs, SNRIs, atypical antidepressants, and mood stabilizers are selected based on the specific depression subtype, prior medication history, and individual clinical profile. Medication monitoring and titration continue throughout treatment.",
      detail: "Response to antidepressants typically requires 4–8 weeks. Regular check-ins allow for timely adjustments if the initial selection is suboptimal.",
    },
    {
      title: "CBT & Behavioral Activation",
      desc: "Cognitive Behavioral Therapy addresses the negative thought patterns central to depression. Behavioral activation — systematically increasing engagement with meaningful activities — directly counters the withdrawal cycle that maintains and deepens depressive episodes.",
      detail: "Behavioral activation is particularly powerful in early treatment when motivation is low. It creates momentum that cognitive work builds on.",
    },
    {
      title: "Trauma Processing (Where Applicable)",
      desc: "Trauma history is a major contributor to depression for many individuals. EMDR and trauma-focused CBT process the underlying traumatic material maintaining depressive patterns — particularly for individuals who do not respond adequately to standard antidepressant treatment.",
      detail: "Research suggests that trauma-driven depression responds better to trauma-focused therapies than to antidepressants alone.",
    },
    {
      title: "Relapse Prevention & Maintenance",
      desc: "Developing an individualized relapse prevention plan — identifying early warning signs, building a response plan, establishing maintenance therapy, and connecting to ongoing clinical support. Depression has a high recurrence rate; maintenance planning significantly reduces relapse risk.",
      detail: "Mindfulness-Based Cognitive Therapy (MBCT) has strong evidence for preventing depressive relapse in individuals with three or more prior episodes.",
    },
  ],
  faqs: [
    {
      q: "Is depression a chemical imbalance?",
      a: "The 'chemical imbalance' model is an oversimplification that doesn't fully capture the neuroscience of depression. Depression involves complex interactions between neurotransmitter systems (serotonin, norepinephrine, dopamine), neuroinflammatory processes, structural brain changes, and stress response system dysregulation. This complexity is actually good news — it means there are multiple therapeutic targets, and for most people, some combination of approaches produces meaningful improvement.",
    },
    {
      q: "How long does depression treatment take?",
      a: "Initial response to treatment (improvement in acute symptoms) typically occurs within 4–12 weeks of starting appropriate medication and therapy. Full remission — a return to baseline functioning — may take longer. Maintenance treatment is recommended for at least 6–12 months after remission to prevent recurrence, and longer for individuals with recurrent or chronic depression.",
    },
    {
      q: "Can depression come back after treatment?",
      a: "Yes — depression has a high recurrence rate, particularly for individuals with multiple prior episodes. However, each episode that is treated effectively, and the relapse prevention strategies developed in treatment, reduce both the risk and severity of future episodes. Many people with recurrent depression benefit from long-term maintenance medication and periodic 'booster' therapy sessions.",
    },
    {
      q: "What if antidepressants haven't worked for me before?",
      a: "Prior antidepressant failure doesn't mean treatment can't work — it means the specific approach tried wasn't right for you. Treatment-resistant depression (typically defined as failure to respond to two adequate trials) has multiple evidence-based options: augmentation strategies, different antidepressant classes, lithium augmentation, and for severe cases, TMS or ECT. Our psychiatrists conduct thorough medication reviews and bring expertise in treatment-resistant presentations.",
    },
    {
      q: "What is the difference between depression and sadness?",
      a: "Sadness is a normal emotion — a proportionate response to loss, disappointment, or difficulty that comes and goes. Depression is a clinical syndrome characterized by persistent low mood (at least 2 weeks), affecting multiple domains of functioning, often with no clear precipitant, or disproportionate to any trigger. The loss of pleasure (anhedonia), the cognitive symptoms, and the physical symptoms (fatigue, sleep changes, appetite changes) are what distinguish clinical depression from normal grief or sadness.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily psychiatric oversight and structured therapy — the appropriate level for significant or treatment-resistant depression.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "CBT, group therapy, and psychiatric management woven into daily life.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote Option",
      title: "Virtual Outpatient",
      desc: "Full IOP and OP programming via secure telehealth throughout California.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
