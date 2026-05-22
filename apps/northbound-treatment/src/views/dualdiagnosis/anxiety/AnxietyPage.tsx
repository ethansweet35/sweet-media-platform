import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_anxiety_hero01.jpg`,
  heroImageAlt: "Person sitting with clasped hands overwhelmed by anxiety — invisible weight of an anxiety disorder",
  substanceName: "Anxiety",
  substanceNameShort: "Anxiety",
  heroHeadline: "Anxiety Disorder & Addiction Treatment",
  heroItalicWord: "Anxiety",
  heroBody:
    "Anxiety disorders affect more than 40 million Americans — and many self-medicate with alcohol or drugs, creating a dangerous dual diagnosis. At Northbound, we treat both conditions together so recovery is complete and lasting.",

  whatItIsHeadline: "What Is an Anxiety Disorder — and How Does It Lead to Addiction?",
  whatItIsBody: [
    "Anxiety is far more than everyday nervousness. Anxiety disorders are characterized by persistent, excessive fear and dread that disrupts daily functioning — at work, in relationships, and in one's ability to feel safe in the world. More than 40 million people in the United States are affected every year, making it the most common mental health condition in the country.",
    "The most prevalent types include Generalized Anxiety Disorder (GAD), panic disorder, social anxiety disorder, OCD, and phobia-related anxiety. Each is marked by different symptoms, but all share one core feature: anxiety that cannot be controlled or reasoned away, even when the person knows their fear is disproportionate.",
    "Because the symptoms are often misunderstood or dismissed, many people with anxiety disorders turn to alcohol, benzodiazepines, or other substances to find relief. Over time, what began as self-medication becomes a substance use disorder — a dual diagnosis that requires integrated treatment to address both conditions at their root.",
  ],
  whatItIsImage: `${BASE}/nbt_anxiety_therapy01.jpg`,
  whatItIsImageAlt: "Individual therapy session for anxiety disorder treatment at Northbound Treatment Services",
  quickStats: [
    { value: "40M+", label: "Americans affected by anxiety disorders annually" },
    { value: "1 in 5", label: "Adults with anxiety also develop a substance use disorder" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Anxiety disorders are often invisible to those around you — but the signs of a co-occurring anxiety and substance use disorder are recognizable with the right frame. If these patterns sound familiar, professional dual diagnosis treatment can help.",
  warningSigns: [
    "Persistent, excessive worry that you cannot control or turn off",
    "Using alcohol, benzodiazepines, or cannabis to calm anxiety symptoms",
    "Panic attacks — sudden episodes of overwhelming fear, chest pain, and shortness of breath",
    "Avoidance of social situations, crowds, or ordinary daily activities",
    "Physical symptoms without medical cause: rapid heartbeat, sweating, trembling, GI distress",
    "Insomnia, difficulty concentrating, or constant sense of impending doom",
    "Increased substance use when anxiety escalates or when attempting to stop",
    "Withdrawal from relationships, work, or activities you previously enjoyed",
    "Feeling like you can't function without a substance to 'take the edge off'",
    "Failed attempts to manage anxiety through willpower, exercise, or lifestyle changes alone",
  ],

  recoveryHeadline: "What Anxiety & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "Treating anxiety without addressing addiction — or addiction without addressing anxiety — is clinically incomplete. Northbound's dual diagnosis model treats both simultaneously with a structured, evidence-based continuum of care.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Comprehensive Dual Diagnosis Assessment",
      icon: "ri-mental-health-line",
      body: "Every client at Northbound undergoes a thorough biopsychosocial evaluation. Our clinical team identifies anxiety type, severity, trauma history, and substance use patterns to build an individualized treatment plan from day one.",
    },
    {
      phase: "Week 1–4",
      title: "Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "If substances such as alcohol or benzodiazepines are involved, a medically managed detox is often required. Our 24/7 clinical team ensures safety and comfort, using evidence-based medication protocols to minimize withdrawal risks.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Treatment with Anxiety-Focused Therapy",
      icon: "ri-home-heart-line",
      body: "Residential programming combines individual therapy, group counseling, and evidence-based approaches including CBT, DBT, and exposure therapy — specifically adapted for anxiety disorders — alongside experiential and holistic modalities.",
    },
    {
      phase: "Months 2–4",
      title: "Partial Hospitalization & Intensive Outpatient",
      icon: "ri-calendar-check-line",
      body: "As clients stabilize, they step down to PHP or IOP — structured day programs that maintain clinical intensity while reintroducing real-world responsibilities. This phased approach supports the anxiety management skills learned in residential.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Support",
      icon: "ri-community-line",
      body: "Long-term recovery from anxiety and addiction requires ongoing support. Northbound's alumni program provides relapse prevention coaching, community connection, and continued access to clinical resources — for life.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "True Dual Diagnosis Expertise",
      body: "Our clinical team is double board-certified in psychiatry and addiction medicine. We treat anxiety disorders and substance use simultaneously — not one after the other.",
    },
    {
      icon: "ri-microscope-line",
      title: "Evidence-Based Anxiety Therapies",
      body: "CBT, DBT, EMDR, and exposure-based therapies are integrated into every treatment plan — the same modalities proven in clinical trials to produce lasting anxiety reduction.",
    },
    {
      icon: "ri-team-line",
      title: "2:1 Staff-to-Client Ratio",
      body: "Anxiety treatment requires a high level of individual attention. Our staffing ratio ensures every client receives personalized support at every stage of their recovery.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Medication-Assisted Treatment When Needed",
      body: "We take a measured, evidence-based approach to psychiatric medication — using it when clinically appropriate and tapering thoughtfully as therapy progresses.",
    },
    {
      icon: "ri-sun-line",
      title: "Southern California Healing Environment",
      body: "Sunlight, ocean access, and outdoor activities are integral to our approach — research consistently shows their positive impact on anxiety and mood regulation.",
    },
    {
      icon: "ri-heart-line",
      title: "200+ Years Combined Clinical Expertise",
      body: "Northbound's leadership team brings more than 200 years of combined behavioral healthcare expertise — and one-third of our staff are program alumni themselves.",
    },
  ],

  closingImage: `${BASE}/nbt_anxiety_recovery01.jpg`,
  closingImageAlt: "Person walking along Southern California coastline in recovery from anxiety — peaceful and grounded",
  closingHeadline: "Anxiety Doesn't Have to Run Your Life",
  closingQuote:
    "When we treat both the anxiety and the addiction together, our clients don't just get sober — they find a version of themselves they didn't know existed.",
  closingBody: [
    "At Northbound, we've helped thousands of people break the cycle of anxiety and self-medication. Our integrated dual diagnosis model gives you the clinical tools, the personalized support, and the Southern California environment to build a life where anxiety no longer defines you.",
  ],
  faqs: [
    {
      question: "Can you treat anxiety and addiction at the same time?",
      answer:
        "Yes — and in fact, treating them separately is a major cause of relapse. Northbound's dual diagnosis model integrates anxiety treatment and addiction treatment into one cohesive program. Our clinical team addresses both conditions from day one, ensuring neither is overlooked.",
    },
    {
      question: "What types of anxiety disorders does Northbound treat?",
      answer:
        "We treat Generalized Anxiety Disorder (GAD), panic disorder, social anxiety disorder, phobia-related anxiety, and anxiety co-occurring with PTSD or OCD. Each requires a slightly different clinical approach, which is why individualized assessment is essential.",
    },
    {
      question: "Is medication always used in anxiety treatment?",
      answer:
        "Not always. Our philosophy is to limit medication to when it's clinically necessary. For many clients, evidence-based therapies like CBT and DBT are highly effective without long-term medication. When medication is appropriate, it's managed carefully under the direction of our board-certified psychiatrists.",
    },
    {
      question: "What if I've tried therapy before and it didn't work?",
      answer:
        "Prior therapy attempts that didn't produce lasting results often reflect incomplete treatment — either the anxiety was addressed without the addiction, or the addiction was treated without the anxiety. Northbound's integrated model addresses this directly.",
    },
    {
      question: "Does Northbound accept insurance for anxiety and addiction treatment?",
      answer:
        "Yes. Northbound is in-network with more than 15 major insurance plans including Aetna, Anthem/BCBS, Cigna, and others. Our admissions team verifies your benefits within 24 hours and navigates the process on your behalf.",
    },
    {
      question: "How long does dual diagnosis treatment take?",
      answer:
        "Treatment duration depends on the severity of both the anxiety disorder and the substance use disorder. Most clients benefit from 30–90 days of structured treatment, followed by a stepped-down IOP and ongoing aftercare support.",
    },
  ],

  relatedSubstances: [
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-emotion-sad-line" },
    { label: "Trauma & PTSD", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-mental-health-line" },
    { label: "OCD", href: "/treatment/dual-diagnosis/ocd-treatment-and-counseling/", icon: "ri-repeat-line" },
    { label: "Bipolar Disorder", href: "/treatment/mental-health-disorders/bipolar-disorder/", icon: "ri-exchange-line" },
  ],
};

export default function AnxietyPage() {
  return <SubstancePageTemplate data={data} />;
}
