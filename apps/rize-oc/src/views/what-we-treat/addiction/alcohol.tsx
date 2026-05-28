import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  hideHeroForm: true,
  heroImage: "add_alcohol_hero01.jpg",
  heroImageAlt: "Warm morning light streaming through windows in a peaceful recovery space in Orange County California",
  category: "Alcohol Addiction",
  headline: "Alcohol Use",
  headlineEmphasis: "Disorder",
  subhead: "Alcohol use disorder is one of the most medically serious and most treatable substance use disorders. Evidence-based treatment combining medical detox, MAT, and therapy produces lasting recovery.",
  quickFacts: [
    { value: "1 in 8",  label: "American Adults Affected" },
    { value: "72hrs",   label: "Peak Withdrawal Window" },
    { value: "2–3×",    label: "Higher Relapse Risk Untreated" },
    { value: "90%",     label: "Withdrawal Relief with MAT" },
  ],
  overviewTitle: "Understanding Alcohol Use Disorder",
  overviewCol1: [
    "Alcohol use disorder (AUD) is a chronic brain condition characterized by compulsive alcohol use, loss of control over drinking, and a negative emotional state when not drinking. The American Medical Association classifies it as a disease — one that produces measurable, lasting changes in brain chemistry and structure.",
    "Alcohol is a central nervous system depressant that, with chronic use, causes the brain to upregulate excitatory activity to maintain baseline function. This neuroadaptation is what makes alcohol withdrawal medically dangerous — when alcohol is removed, the excitatory rebound can cause seizures and potentially fatal complications.",
  ],
  overviewCol2: [
    "This is why medical supervision of alcohol detox is not optional — it is a clinical necessity for anyone with moderate to severe dependence. Medications including benzodiazepines and anti-seizure agents manage the withdrawal process safely while reducing physical discomfort.",
    "Beyond detox, recovery from AUD requires addressing the psychological dimensions — the thought patterns, coping deficits, trauma histories, and co-occurring mental health conditions that drive and maintain the disorder. At Rize OC, these are treated simultaneously from day one.",
  ],
  physicalSymptoms: [
    { text: "Increasing tolerance — needing more alcohol to achieve the same effect" },
    { text: "Withdrawal symptoms when not drinking (sweating, tremors, nausea, rapid heart rate)" },
    { text: "Continued drinking despite physical health problems" },
    { text: "Blackouts or memory gaps following drinking episodes" },
    { text: "Disrupted sleep — insomnia, frequent waking, or excessive sleeping" },
    { text: "Neglect of nutrition and personal physical care" },
  ],
  behavioralSymptoms: [
    { text: "Inability to stop or reduce drinking despite repeated attempts" },
    { text: "Spending significant time obtaining, using, and recovering from alcohol" },
    { text: "Giving up important activities — work, relationships, hobbies — to drink" },
    { text: "Continuing to drink despite knowing it causes or worsens problems" },
    { text: "Drinking alone or hiding the extent of drinking from others" },
    { text: "Irritability, anxiety, or depression when not drinking" },
  ],
  consequences: [
    {
      icon: "ri-heart-pulse-line",
      title: "Physical Health",
      desc: "Long-term alcohol use causes liver disease (fatty liver, hepatitis, cirrhosis), cardiovascular damage, pancreatitis, peripheral neuropathy, increased cancer risk, and immune system suppression. Many of these conditions are progressive and irreversible without treatment.",
    },
    {
      icon: "ri-brain-line",
      title: "Mental Health",
      desc: "Chronic alcohol use is strongly associated with depression, anxiety, and cognitive impairment. Alcohol disrupts the same neurotransmitter systems that regulate mood — creating a cycle where alcohol temporarily relieves distress while worsening the underlying conditions over time.",
    },
    {
      icon: "ri-group-line",
      title: "Social & Relational",
      desc: "AUD damages professional functioning, finances, and intimate relationships. The behavioral patterns of active addiction — dishonesty, neglect, volatility — erode trust and social support structures that are essential to sustained recovery.",
    },
  ],
  treatmentSteps: [
    {
      title: "Medical Detox & Stabilization",
      desc: "Medically supervised withdrawal management using evidence-based protocols to prevent seizures, manage acute withdrawal symptoms, and achieve physical stabilization safely.",
      detail: "Duration: typically 3–7 days depending on severity. Medications: benzodiazepines, CIWA protocol, anti-seizure agents as indicated.",
    },
    {
      title: "Medication-Assisted Treatment (MAT)",
      desc: "Naltrexone (oral or Vivitrol injection) blocks the reinforcing effects of alcohol and significantly reduces craving. Acamprosate stabilizes the neurochemical changes associated with protracted withdrawal. Both are used alongside therapy.",
      detail: "FDA-approved medications. Naltrexone reduces relapse risk by approximately 36% in clinical trials. Acamprosate is particularly effective for reducing protracted withdrawal discomfort.",
    },
    {
      title: "Psychiatric Assessment & Dual Diagnosis",
      desc: "Co-occurring depression, anxiety, PTSD, or bipolar disorder are assessed and treated in parallel with AUD. Our embedded psychiatrists manage psychiatric medications and provide dual-diagnosis oversight throughout treatment.",
      detail: "More than 60% of individuals with AUD have a co-occurring mood or anxiety disorder. Treating these separately produces significantly worse outcomes.",
    },
    {
      title: "CBT, DBT & Motivational Interviewing",
      desc: "Cognitive Behavioral Therapy addresses the thought patterns and situational triggers underlying alcohol use. DBT provides emotional regulation and distress tolerance skills. MI builds intrinsic motivation for change.",
      detail: "CBT is the most extensively studied psychotherapy for AUD. Skill development in therapy continues alongside MAT for maximum impact.",
    },
    {
      title: "Relapse Prevention & Aftercare Planning",
      desc: "Building a personalized relapse prevention plan — identifying high-risk situations, developing coping strategies, and establishing the community supports and ongoing clinical care needed for sustainable long-term recovery.",
      detail: "Aftercare typically includes step-down to IOP or OP, continued MAT as appropriate, alumni program, and facilitated connection to community recovery support.",
    },
  ],
  faqs: [
    {
      q: "Can I stop drinking on my own at home?",
      a: "For moderate to severe alcohol use disorder, attempting to stop without medical supervision can be life-threatening. Alcohol withdrawal is one of the very few substance withdrawal syndromes that can cause death — through seizures and a condition called delirium tremens (DTs). If you drink heavily or daily, please contact a medical provider before attempting to stop. At Rize OC, our medical team provides safe, supervised withdrawal management.",
    },
    {
      q: "How long does alcohol treatment take?",
      a: "Medical detox typically takes 3–7 days. Following detox, PHP (5–7 days/week, 6 hrs/day) typically runs 2–4 weeks, IOP (3–5 days/week, 3–9 hrs/day) typically 8–12 weeks. Ongoing outpatient support and MAT continue as long as clinically beneficial — research shows longer treatment duration is strongly associated with better long-term outcomes.",
    },
    {
      q: "What is Vivitrol (Naltrexone injection) and is it right for me?",
      a: "Vivitrol is a monthly injectable form of naltrexone — a medication that blocks opioid receptors in the brain, blocking both the rewarding effects of alcohol and reducing cravings. It is particularly useful for patients who struggle with consistent daily oral medication adherence. Its appropriateness depends on your specific clinical picture — our physicians assess and discuss all MAT options during the medical intake process.",
    },
    {
      q: "Do I have to go to AA?",
      a: "No. Rize OC does not require 12-step participation. We introduce multiple pathways to sustained recovery — including 12-step, SMART Recovery, and secular approaches — and help each client identify which resonates most with their values and preferences. Research shows that the community dimension of recovery programs (peer accountability, shared experience) is valuable regardless of the specific framework.",
    },
    {
      q: "Will insurance cover alcohol treatment?",
      a: "Yes. The Mental Health Parity and Addiction Equity Act requires most insurance plans to cover substance use disorder treatment at the same level as other medical conditions. Most major PPO plans cover medical detox, PHP, and IOP. Our insurance verification team contacts your provider directly, determines your exact benefits, and provides a transparent cost breakdown before admission.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-pulse-line",
      label: "First Step",
      title: "Drug & Alcohol Detox",
      desc: "Medically supervised withdrawal management for alcohol dependence — the safe, essential first step.",
      href: "/drug-alcohol-detox",
    },
    {
      icon: "ri-sun-line",
      label: "Intensive Care",
      title: "Partial Hospitalization (PHP)",
      desc: "Six hours of daily structured clinical programming following detox stabilization.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible Recovery",
      title: "Intensive Outpatient (IOP)",
      desc: "Structured therapy integrated into daily life — AM and PM schedule options available.",
      href: "/iop-program-orange-county",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
