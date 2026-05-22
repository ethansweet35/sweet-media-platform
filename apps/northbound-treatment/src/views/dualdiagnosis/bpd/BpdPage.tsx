import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_bpd_hero01.jpg`,
  heroImageAlt: "Woman sitting on edge of bathtub arms wrapped around herself — the emotional storm of borderline personality disorder",
  substanceName: "Borderline Personality Disorder",
  substanceNameShort: "BPD",
  heroHeadline: "Borderline Personality Disorder & Addiction Treatment",
  heroItalicWord: "Borderline",
  heroBody:
    "BPD is characterized by pervasive instability in mood, identity, and relationships — and it carries one of the highest rates of co-occurring substance use disorder of any mental health diagnosis. At Northbound, we treat both with the specialized clinical depth each requires.",

  whatItIsHeadline: "What Is Borderline Personality Disorder — and Why Does It Often Co-Occur with Addiction?",
  whatItIsBody: [
    "Borderline Personality Disorder (BPD) is a serious mental health condition characterized by pervasive instability in emotions, self-image, and interpersonal relationships. The National Institute of Mental Health describes it as a pattern of problematic thinking, feeling, and behavior that disrupts family and work life, long-term planning, and sense of self-identity.",
    "People with BPD often experience intense emotional pain, a deep fear of abandonment, unstable relationships marked by idealization and devaluation, chronic feelings of emptiness, and impulsive self-destructive behaviors — including substance abuse. Because the emotional dysregulation is so intense and so persistent, substances often become the only available coping mechanism.",
    "At Northbound, our clinicians are trained to treat BPD and addiction simultaneously using evidence-based modalities, particularly Dialectical Behavior Therapy (DBT) — one of the most effective treatments available for borderline personality disorder. We also respect each client's right to dispute a diagnosis; our focus is on helping people, not labeling them.",
  ],
  whatItIsImage: `${BASE}/nbt_bpd_therapy01.jpg`,
  whatItIsImageAlt: "DBT therapy session for borderline personality disorder treatment at Northbound Treatment Services",
  quickStats: [
    { value: "78%", label: "Of people with BPD meet criteria for a substance use disorder at some point in their lives" },
    { value: "2:1", label: "Staff-to-client ratio at Northbound for individualized care" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "BPD is frequently misdiagnosed or missed when substance use is present. These signs — in yourself or someone you love — indicate a need for professional dual diagnosis assessment.",
  warningSigns: [
    "Extreme difficulty maintaining stable relationships — intense attachment followed by sudden rejection or idealization",
    "Chronic feelings of emptiness or not knowing who you really are",
    "Impulsive behaviors: substance use, reckless spending, risky sex, binge eating",
    "Intense, rapidly shifting moods that can last hours to days",
    "Explosive anger that feels disproportionate and hard to control",
    "Self-harming behaviors or recurring suicidal thoughts or threats",
    "Intense fear of abandonment — real or imagined — driving desperate behaviors",
    "Paranoid thoughts or dissociative episodes during stress",
    "Using substances to numb overwhelming emotional pain",
    "Pattern of stormy relationships with a cycle of idealization and devastation",
  ],

  recoveryHeadline: "BPD & Addiction Recovery at Northbound",
  recoveryIntro:
    "Treating BPD requires specialized clinical expertise, a safe environment, and a therapeutic approach designed specifically for emotional dysregulation. Northbound provides this alongside integrated addiction treatment throughout the full continuum of care.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Thorough Dual Diagnosis Assessment",
      icon: "ri-mental-health-line",
      body: "Our clinical team conducts a comprehensive biopsychosocial evaluation covering mood history, trauma, relationship patterns, and substance use to build a fully individualized treatment plan.",
    },
    {
      phase: "Week 1–3",
      title: "Stabilization & Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "When substances are involved, safe medical detox is prioritized first. Our 24/7 clinical team monitors for withdrawal complications and begins psychiatric stabilization in parallel.",
    },
    {
      phase: "Weeks 3–12+",
      title: "DBT-Centered Residential Treatment",
      icon: "ri-home-heart-line",
      body: "Residential programming at Northbound integrates individual therapy, DBT skills groups, group counseling, family programming, and experiential therapies — creating the structured safety BPD recovery requires.",
    },
    {
      phase: "Months 2–4",
      title: "Partial Hospitalization & Intensive Outpatient",
      icon: "ri-calendar-check-line",
      body: "Step-down programming maintains structure as clients re-enter daily life — continuing DBT skills development, individual therapy, and medication management as warranted.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Community",
      icon: "ri-community-line",
      body: "BPD recovery is an ongoing process. Northbound's alumni program provides continued peer connection, relapse prevention, and access to clinical resources long after structured treatment ends.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "DBT — The Gold Standard for BPD",
      body: "Dialectical Behavior Therapy is the most evidence-supported treatment for borderline personality disorder. Northbound integrates DBT into both individual therapy and group skills training.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Dual Board-Certified Psychiatric Care",
      body: "Our Medical Director is double board-certified in Psychiatry and Addiction Medicine — bringing the psychiatric expertise that BPD dual diagnosis treatment demands.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Trauma-Informed Approach",
      body: "BPD and trauma are deeply intertwined. Our trauma-informed care ensures that treatment never retraumatizes — creating the safety required for genuine therapeutic progress.",
    },
    {
      icon: "ri-group-line",
      title: "Family Education & Boundary-Setting Support",
      body: "Northbound's monthly family program helps loved ones understand BPD, recognize enabling patterns, and learn communication strategies that support recovery rather than crisis.",
    },
    {
      icon: "ri-microscope-line",
      title: "Cognitive-Behavioral & Experiential Integration",
      body: "Beyond DBT, we integrate CBT, art therapy, music therapy, and other experiential modalities that help clients develop emotion regulation skills in engaging, evidence-supported ways.",
    },
    {
      icon: "ri-team-line",
      title: "No Labels — Just Help",
      body: "Northbound's clinical philosophy respects each client's autonomy. Treatment focuses on building a healthier life — not assigning and reinforcing a diagnosis that can feel stigmatizing.",
    },
  ],

  closingImage: `${BASE}/nbt_bpd_recovery01.jpg`,
  closingImageAlt: "Woman standing at window looking at garden — the self-recognition and steadiness of BPD recovery",
  closingHeadline: "A Stable Identity Is Within Reach",
  closingQuote:
    "People with BPD often feel like they're at the mercy of their emotions. Our job is to give them the tools to become the author of their own lives.",
  closingBody: [
    "Borderline Personality Disorder is among the most misunderstood and undertreated conditions in mental health. At Northbound, we've seen hundreds of people with BPD build stable, sober, fulfilling lives through integrated dual diagnosis treatment. Recovery isn't just possible — it's happening every day in our programs.",
  ],
  faqs: [
    {
      question: "What makes DBT effective for BPD?",
      answer:
        "DBT teaches concrete, practical skills in four domains — mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. These skills directly address the core deficits of BPD, giving clients tools they can use in real-world situations rather than just insights gained in session.",
    },
    {
      question: "Do I need a BPD diagnosis to receive treatment at Northbound?",
      answer:
        "No. Our clinical team evaluates each client individually and builds a treatment plan based on the person's actual presentation — not a label. If BPD symptoms and substance use are present, we can begin treatment immediately.",
    },
    {
      question: "How is BPD treated differently than other personality disorders?",
      answer:
        "BPD responds particularly well to DBT, which was specifically developed for this condition. Unlike generalized CBT or talk therapy, DBT's skills-based format and validation-plus-change dialectic are highly effective at reducing self-destructive behaviors and improving emotional regulation.",
    },
    {
      question: "Is BPD a lifelong condition?",
      answer:
        "Research shows that many BPD symptoms diminish significantly with appropriate treatment — especially DBT. Many people achieve full remission with consistent therapeutic work. Northbound's treatment is oriented toward building long-term skills, not managing a permanent crisis.",
    },
    {
      question: "What if my loved one with BPD refuses treatment?",
      answer:
        "Our admissions team can help. We offer intervention support for families of individuals who are resistant to seeking help. Contact us at (866) 311-0003 to speak with an admissions counselor about next steps.",
    },
    {
      question: "Does Northbound accept insurance for BPD treatment?",
      answer:
        "Yes. We're in-network with more than 15 major insurance plans. Our admissions team verifies your benefits within 24 hours and manages the process so you can focus on getting help.",
    },
  ],

  relatedSubstances: [
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-emotion-sad-line" },
    { label: "Trauma & PTSD", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-mental-health-line" },
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-heart-pulse-line" },
    { label: "Bipolar Disorder", href: "/treatment/mental-health-disorders/bipolar-disorder/", icon: "ri-exchange-line" },
  ],
};

export default function BpdPage() {
  return <SubstancePageTemplate data={data} />;
}
