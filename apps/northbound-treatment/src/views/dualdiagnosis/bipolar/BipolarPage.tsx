import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_bipolar_hero01.jpg`,
  heroImageAlt: "Person sitting alone in darkened bedroom amid scattered creative projects — the crash of bipolar disorder",
  substanceName: "Bipolar Disorder",
  substanceNameShort: "Bipolar",
  heroHeadline: "Bipolar Disorder & Addiction Treatment",
  heroItalicWord: "Bipolar",
  heroBody:
    "The dramatic swings between mania and depression make bipolar disorder uniquely challenging — and uniquely prone to co-occurring addiction. Northbound specializes in treating both, simultaneously, with the clinical precision this dual diagnosis demands.",

  whatItIsHeadline: "Understanding Bipolar Disorder and Its Connection to Addiction",
  whatItIsBody: [
    "Bipolar disorder is characterized by cyclical episodes of mania (elevated mood, impulsivity, grandiosity, reduced need for sleep) and depression (profound sadness, fatigue, hopelessness, loss of motivation). These cycles can last days, weeks, or months — and their unpredictability makes everyday life feel impossible to manage.",
    "The connection between bipolar disorder and substance use disorder is well-documented. Many individuals with bipolar disorder turn to alcohol or drugs to moderate their symptoms: stimulants to lift depression, alcohol or cannabis to calm mania. Over time, these self-medicating behaviors compound the disorder, destabilize mood even further, and create a co-occurring addiction that requires integrated dual diagnosis treatment.",
    "At Northbound, we never label clients — we treat people. Our clinical team focuses on stabilizing mood, building psychological tools for managing the disorder, and addressing any substance use simultaneously. Treatment doesn't require an official diagnosis to begin; what matters is that the person gets help.",
  ],
  whatItIsImage: `${BASE}/nbt_bipolar_therapy01.jpg`,
  whatItIsImageAlt: "Client writing in mood journal during bipolar disorder therapy session at Northbound Treatment",
  quickStats: [
    { value: "30%", label: "Of people with bipolar disorder have a co-occurring substance use disorder" },
    { value: "200+", label: "Years of combined clinical expertise at Northbound" },
    { value: ">95%", label: "Alcohol abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Bipolar disorder is often misdiagnosed or missed entirely when substance use is present. These signs — in yourself or someone you love — point to a need for professional dual diagnosis evaluation.",
  warningSigns: [
    "Periods of unusually elevated mood, energy, or euphoria (mania) followed by deep depression",
    "Impulsive or reckless behavior during manic phases: overspending, risky sex, substance bingeing",
    "Inability to sleep during manic episodes; excessive sleeping during depressive phases",
    "Rapid speech, racing thoughts, feeling 'unstoppable' that others find concerning",
    "Deep depression: withdrawal, hopelessness, inability to get out of bed, thoughts of self-harm",
    "Using alcohol or drugs to 'level out' extreme highs or lows",
    "Explosive anger, irritability, or agitation without clear cause",
    "Intense relationship conflicts driven by mood shifts",
    "Lost jobs, fractured relationships, or financial crises tied to mood episodes",
    "Prior psychiatric hospitalizations or misdiagnoses (often depression without recognition of mania)",
  ],

  recoveryHeadline: "What Bipolar Disorder & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "Stabilizing bipolar disorder and addressing addiction requires a carefully sequenced, individualized approach. Northbound's dual diagnosis program provides the clinical foundation for lasting recovery across the full continuum of care.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Comprehensive Dual Diagnosis Evaluation",
      icon: "ri-mental-health-line",
      body: "Our clinical team conducts a thorough biopsychosocial assessment to understand mood history, substance use patterns, trauma, and prior treatment. This informs every aspect of the individualized treatment plan.",
    },
    {
      phase: "Week 1–3",
      title: "Stabilization & Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "When substance use is present, safe medically supervised detox is the first clinical priority. Simultaneously, psychiatric stabilization — sometimes including mood-stabilizing medication — begins under the direction of our board-certified psychiatrists.",
    },
    {
      phase: "Weeks 3–12+",
      title: "Residential Treatment with Mood Disorder Focus",
      icon: "ri-home-heart-line",
      body: "Residential programming integrates individual therapy, group sessions, psychoeducation about bipolar disorder, family programming, and evidence-based modalities including CBT and DBT — with the clinical space to explore and build coping skills without substance use.",
    },
    {
      phase: "Months 2–4",
      title: "Partial Hospitalization & Intensive Outpatient",
      icon: "ri-calendar-check-line",
      body: "PHP and IOP provide the structure needed as clients return to daily life — regular therapy, group support, and medication management continue as clients practice managing mood in real-world environments.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Lifelong Alumni Support",
      icon: "ri-community-line",
      body: "Bipolar disorder is a chronic condition that benefits from long-term support. Northbound's alumni program and aftercare resources provide continued connection, relapse prevention, and community — as long as it's needed.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Dual Board-Certified Psychiatric Care",
      body: "Our Medical Director is double board-certified in Psychiatry and Addiction Medicine — providing psychiatric sophistication that most treatment programs cannot match.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Mood Stabilization Without Over-Medicalizing",
      body: "We use medication when it's clinically necessary, and taper thoughtfully as therapy progresses. Our philosophy is to minimize reliance on medication wherever it's safely possible.",
    },
    {
      icon: "ri-group-line",
      title: "Family Education & Support Program",
      body: "Bipolar disorder significantly affects families. Northbound's monthly family program helps loved ones understand the disorder, set healthy limits, and support recovery without enabling.",
    },
    {
      icon: "ri-microscope-line",
      title: "Evidence-Based Therapeutic Modalities",
      body: "CBT, DBT, and psychoeducation are proven to reduce the severity and frequency of bipolar episodes — especially when combined with sobriety from substances that destabilize mood.",
    },
    {
      icon: "ri-shield-check-line",
      title: "38 Years of Continuous Operation",
      body: "Founded in 1988, Northbound has treated complex dual diagnoses for nearly four decades. Our longevity reflects clinical credibility that newer programs simply cannot offer.",
    },
    {
      icon: "ri-team-line",
      title: "1/3 of Staff Are Program Alumni",
      body: "One-third of Northbound's clinical team are graduates of our own programs — bringing lived experience and genuine empathy to every interaction with clients.",
    },
  ],

  closingImage: `${BASE}/nbt_bipolar_recovery01.jpg`,
  closingImageAlt: "Person journaling with coffee in morning sunlight — the mood stability of bipolar disorder recovery",
  closingHeadline: "Stability Is Possible. Recovery Is Real.",
  closingQuote:
    "Our goal is never to label our clients — it's to help them find tools that work, so mood no longer controls every aspect of their lives.",
  closingBody: [
    "Bipolar disorder is complex, but it is treatable. With the right combination of clinical care, evidence-based therapy, and community support, thousands of people have achieved lasting stability and sobriety at Northbound. Your recovery story is waiting to be written.",
  ],
  faqs: [
    {
      question: "Can bipolar disorder and addiction be treated at the same time?",
      answer:
        "Yes — and integrated treatment produces significantly better outcomes than treating each condition separately. Northbound's dual diagnosis program addresses both simultaneously from the first day of treatment.",
    },
    {
      question: "Do I need a formal bipolar diagnosis to get help?",
      answer:
        "No. Northbound's treatment philosophy focuses on the person, not the label. If mood instability and substance use are present, we can evaluate and begin treatment without requiring a prior diagnosis.",
    },
    {
      question: "Will I be on medication permanently?",
      answer:
        "Not necessarily. Medication decisions are made collaboratively with our psychiatric team and are regularly re-evaluated. Our goal is to use medication only when it's clinically necessary, tapering as therapy progresses.",
    },
    {
      question: "What role does family play in bipolar disorder treatment?",
      answer:
        "Family involvement is strongly encouraged. Northbound offers a monthly family program that helps loved ones understand bipolar disorder, avoid enabling behaviors, and support sustainable recovery.",
    },
    {
      question: "How long is treatment typically?",
      answer:
        "Most clients benefit from 45–90 days of structured residential and step-down care. Because bipolar disorder is a chronic condition, aftercare and alumni support continue well beyond the initial treatment period.",
    },
    {
      question: "Does Northbound accept insurance for bipolar and addiction treatment?",
      answer:
        "Yes. We are in-network with more than 15 major insurance plans. Our admissions team verifies benefits promptly and handles insurance navigation on your behalf.",
    },
  ],

  relatedSubstances: [
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-emotion-sad-line" },
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-heart-pulse-line" },
    { label: "Trauma & PTSD", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-mental-health-line" },
    { label: "Borderline Personality Disorder", href: "/treatment/mental-health-disorders/borderline-personality-disorder/", icon: "ri-user-heart-line" },
  ],
};

export default function BipolarPage() {
  return <SubstancePageTemplate data={data} />;
}
