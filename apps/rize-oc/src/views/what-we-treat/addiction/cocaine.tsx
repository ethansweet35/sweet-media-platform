import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  heroImage: "add_cocaine_hero01.jpg",
  heroImageAlt: "Dramatic coastal sunrise over the Pacific Ocean representing hope and recovery in Orange County California",
  category: "Cocaine Addiction",
  headline: "Cocaine",
  headlineEmphasis: "Addiction",
  subhead: "Cocaine use disorder produces intense psychological dependence through powerful dopamine dysregulation. Evidence-based behavioral therapies, psychiatric support, and community-based recovery address the full clinical picture.",
  quickFacts: [
    { value: "1.5M",   label: "US Adults with CUD" },
    { value: "Intense",label: "Psychological Cravings" },
    { value: "48hrs",  label: "Acute Crash Window" },
    { value: "CBT",    label: "Gold-Standard Treatment" },
  ],
  overviewTitle: "Understanding Cocaine Use Disorder",
  overviewCol1: [
    "Cocaine is a powerful stimulant that works primarily by blocking the reuptake of dopamine in the brain's reward circuit — producing an intense but brief surge of euphoria, energy, and confidence. The crash that follows — characterized by fatigue, depression, irritability, and powerful cravings — drives the compulsive use cycle.",
    "Unlike alcohol or opioids, cocaine does not produce significant physical withdrawal that requires medical management. But the psychological withdrawal — particularly the profound anhedonia (inability to experience pleasure) and intense cravings during the early recovery period — can be among the most challenging aspects of any substance use disorder.",
  ],
  overviewCol2: [
    "Chronic cocaine use produces lasting changes in the brain's dopamine system — the same system responsible for motivation, reward, and executive function. These changes underlie the cognitive impairment, motivational deficits, and emotional dysregulation that characterize cocaine use disorder and persist well into recovery.",
    "Co-occurring mental health conditions — particularly depression, anxiety, and ADHD — are highly prevalent in individuals with cocaine use disorder, and often predate cocaine use. At Rize OC, psychiatric evaluation and treatment of co-occurring conditions is integrated from the beginning.",
  ],
  physicalSymptoms: [
    { text: "Periods of hyperactivity, talkativeness, and reduced need for sleep during use" },
    { text: "Nasal damage — chronic nosebleeds, loss of smell, septal perforation (with snorting)" },
    { text: "Cardiovascular effects — elevated heart rate, blood pressure, arrhythmias" },
    { text: "Significant energy and appetite crash following use" },
    { text: "Weight loss and nutritional neglect" },
    { text: "Sleep disruption — insomnia during use, hypersomnia during crashes" },
  ],
  behavioralSymptoms: [
    { text: "Bingeing — using cocaine repeatedly over hours or days without stopping" },
    { text: "Inability to stop despite wanting to and repeated attempts" },
    { text: "Significant financial consequences from purchasing cocaine" },
    { text: "Risky behavior during use — impaired judgment, high-risk activities" },
    { text: "Relationship and professional deterioration as use escalates" },
    { text: "Intense preoccupation with obtaining and using cocaine" },
  ],
  consequences: [
    {
      icon: "ri-heart-pulse-line",
      title: "Cardiovascular Risk",
      desc: "Cocaine is one of the most common causes of drug-related heart attacks and strokes, even in young, otherwise healthy individuals. Repeated use causes arterial inflammation, premature atherosclerosis, cardiomyopathy, and dangerous arrhythmias. These risks persist and accumulate with continued use.",
    },
    {
      icon: "ri-brain-line",
      title: "Neurological Impact",
      desc: "Chronic cocaine use depletes dopamine receptors and disrupts prefrontal cortical function — producing lasting impairments in attention, decision-making, impulse control, and emotional regulation. Severe anhedonia in early recovery can last weeks to months before the dopamine system recovers.",
    },
    {
      icon: "ri-group-line",
      title: "Financial & Social Consequences",
      desc: "Cocaine is expensive and the compulsive use cycle rapidly escalates costs. Financial devastation, professional failure, and relationship breakdown are common. The behavioral patterns of active addiction — dishonesty, unreliability, and volatility — severely damage the social support structures essential to recovery.",
    },
  ],
  treatmentSteps: [
    {
      title: "Clinical Assessment & Stabilization",
      desc: "Comprehensive assessment of cocaine use patterns, co-occurring conditions, physical health status, and social circumstances. Medical management of acute symptoms — fatigue, depression, sleep disruption — during the initial stabilization period.",
      detail: "The acute crash period (24–72 hours) may involve significant fatigue, irritability, and depression. Medical support and monitoring during this period improves comfort and reduces early dropout.",
    },
    {
      title: "Psychiatric Evaluation & Dual Diagnosis",
      desc: "Assessment and treatment of co-occurring ADHD, depression, anxiety, or trauma — conditions that frequently underlie cocaine use. Appropriate psychiatric medication management where indicated.",
      detail: "Untreated ADHD is a significant risk factor for stimulant use disorder. Appropriate ADHD treatment with non-stimulant medications can be an important component of CUD recovery.",
    },
    {
      title: "CBT & Contingency Management",
      desc: "Cognitive Behavioral Therapy for cocaine specifically addresses use triggers, cravings management, and the thought patterns underlying cocaine use. Contingency Management — a reinforcement-based approach — has among the strongest evidence of any intervention for stimulant use disorders.",
      detail: "Contingency Management (CM) has robust clinical trial evidence for cocaine use disorder, improving abstinence rates significantly versus therapy alone.",
    },
    {
      title: "Group Therapy & Community Support",
      desc: "Peer group therapy provides accountability, shared experience, and community connection — among the strongest protective factors in cocaine recovery. Recovery community organizations and peer support are connected during treatment.",
      detail: "Social isolation is a major relapse risk factor. Building recovery community during treatment significantly improves long-term outcomes.",
    },
    {
      title: "Relapse Prevention & Long-Term Recovery Planning",
      desc: "Identifying high-risk situations, building coping skills for cocaine cravings (which can remain intense for months), and establishing the social, professional, and clinical supports needed for sustainable long-term recovery.",
      detail: "Cocaine cravings can be powerful and persistent — sometimes triggered years into recovery by environmental cues. Robust relapse prevention planning is essential.",
    },
  ],
  faqs: [
    {
      q: "Is cocaine withdrawal physically dangerous like alcohol or opioids?",
      a: "No — cocaine withdrawal does not produce the medically dangerous physical syndrome seen with alcohol or benzodiazepine withdrawal. However, the psychological withdrawal can be extremely challenging — characterized by intense depression, profound fatigue, anhedonia (inability to feel pleasure), and powerful cravings. The severity of psychological distress during cocaine withdrawal is itself a significant risk factor for relapse and in rare cases, suicidal ideation — making clinical support during this period important.",
    },
    {
      q: "Is there a medication for cocaine addiction?",
      a: "There is currently no FDA-approved medication specifically for cocaine use disorder, unlike opioid or alcohol use disorder. Research is ongoing on several candidates. In practice, medications are used to manage specific symptoms: antidepressants for co-occurring depression or protracted dysphoria, and appropriate treatment of co-occurring ADHD (non-stimulant medications) where present. The primary evidence-based treatments for cocaine use disorder are behavioral: CBT and Contingency Management.",
    },
    {
      q: "How long do cocaine cravings last?",
      a: "The acute craving period — intense cravings in the first days to weeks of abstinence — typically resolves within 1–4 weeks. However, conditioned cue-induced cravings — triggered by environmental stimuli associated with past cocaine use — can persist for months to years. Treatment builds the cognitive and behavioral tools to recognize, tolerate, and move through these cravings without relapsing, rather than simply waiting for them to stop.",
    },
    {
      q: "My loved one insists they can control their cocaine use. What should I do?",
      a: "This is an extremely common presentation with stimulant use disorders. The combination of cocaine's effect on prefrontal cortical function (impairing insight and self-assessment) and the psychological mechanisms of denial means that people in the midst of cocaine use disorder genuinely do not perceive the problem accurately. Family and intervention strategies — including professional interventionists — can help. Contact our admissions team for guidance on how to approach this situation.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Six hours of daily structured programming — intensive enough to address the psychological complexity of cocaine use disorder.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible Recovery",
      title: "Intensive Outpatient (IOP)",
      desc: "Group and individual therapy woven into daily life — evening schedule options available.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote Option",
      title: "Virtual Outpatient",
      desc: "IOP and OP programming via secure telehealth — available throughout California.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
