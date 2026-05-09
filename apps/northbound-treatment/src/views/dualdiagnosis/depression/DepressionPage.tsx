import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_depression_hero01.jpg`,
  heroImageAlt: "Person lying on couch in dim room staring at ceiling — the pervasive emptiness of clinical depression",
  substanceName: "Depression",
  substanceNameShort: "Depression",
  heroHeadline: "Depression & Addiction Treatment",
  heroItalicWord: "Depression",
  heroBody:
    "Depression and addiction are among the most common co-occurring diagnoses in behavioral health — each making the other worse. Northbound's integrated dual diagnosis model treats both conditions at their root, giving clients the emotional tools and sobriety they need to truly recover.",

  whatItIsHeadline: "Understanding Depression and Its Deep Connection to Substance Use",
  whatItIsBody: [
    "Clinical depression — Major Depressive Disorder — is far more than sadness or a rough patch. It is a pervasive, biological condition characterized by profound loss of motivation, persistent low mood, disrupted sleep, inability to concentrate, and often a loss of interest in everything once meaningful. Left untreated, depression erodes every area of life: work, relationships, physical health, and self-worth.",
    "The link between depression and substance use is bidirectional. Some individuals begin drinking or using drugs to cope with depressive symptoms — finding temporary relief before dependence develops. Others develop depression as a consequence of sustained substance abuse, which chemically depletes the brain's mood-regulating systems. In either case, a co-occurring diagnosis requires integrated treatment.",
    "At Northbound, we treat depression and addiction simultaneously through a multi-modal approach — combining individual therapy, group counseling, evidence-based modalities, medication management when appropriate, and holistic programming including outdoor activity, exercise, and experiential therapy proven to support mood recovery.",
  ],
  whatItIsImage: `${BASE}/nbt_depression_therapy01.jpg`,
  whatItIsImageAlt: "Group therapy session for depression and addiction dual diagnosis treatment at Northbound Treatment Services",
  quickStats: [
    { value: "17M+", label: "Adults in the U.S. experienced major depression in a single year" },
    { value: "2x", label: "People with depression are twice as likely to develop a substance use disorder" },
    { value: "97%", label: "Reduction in depressive symptoms in Northbound's 2015 USC outcomes study" },
  ],

  warningBody:
    "Depression often goes unrecognized when substance use is present — the substances mask symptoms until they don't. These are the clinical warning signs that depression and addiction are co-occurring and require professional evaluation.",
  warningSigns: [
    "Persistent low mood, sadness, or emptiness lasting two weeks or more",
    "Loss of interest in activities, hobbies, or relationships you previously valued",
    "Using alcohol or drugs to feel 'normal' or to get through the day",
    "Significant changes in appetite or weight — either direction",
    "Fatigue, low energy, or physical sluggishness that doesn't improve with sleep",
    "Difficulty concentrating, making decisions, or remembering details",
    "Feelings of worthlessness, guilt, or hopelessness that feel inescapable",
    "Withdrawal from family, friends, and social activities",
    "Sleep disruptions — insomnia, early morning waking, or sleeping far too much",
    "Thoughts of death or suicide, even passively ('I'd be better off gone')",
  ],

  recoveryHeadline: "What Depression & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "Recovering from depression and addiction requires more than willpower — it requires a structured clinical environment, professional therapeutic support, and evidence-based interventions working in parallel. Northbound provides the full continuum.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Dual Diagnosis Assessment",
      icon: "ri-mental-health-line",
      body: "Our clinical team evaluates each client's full history — mood symptoms, substance use timeline, trauma, and prior treatment — to build an individualized plan that treats both depression and addiction with clinical precision.",
    },
    {
      phase: "Week 1–3",
      title: "Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "When substances are involved, safe medical detoxification is prioritized. Our 24/7 clinical staff monitors withdrawal and stabilizes mood concurrently, often using psychiatric medication to support the process.",
    },
    {
      phase: "Weeks 3–12+",
      title: "Residential Treatment with Depression Focus",
      icon: "ri-home-heart-line",
      body: "Residential programming integrates CBT, DBT, individual therapy, group counseling, outdoor activities, and experiential therapies — all proven to support mood recovery alongside sobriety. The 12-step framework is offered as a component of the program.",
    },
    {
      phase: "Months 2–4",
      title: "Partial Hospitalization & Intensive Outpatient",
      icon: "ri-calendar-check-line",
      body: "Step-down programming in PHP and IOP maintains the clinical structure needed as clients transition back to real-world responsibilities — with continued therapy, medication management, and peer support.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Support",
      icon: "ri-community-line",
      body: "Depression requires long-term management. Northbound's aftercare and alumni programs provide continued connection, relapse prevention planning, and ongoing access to clinical resources and community.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Dual Diagnosis Expertise — Not an Add-On",
      body: "Depression treatment is a core clinical competency at Northbound — not a secondary service. Our psychiatric team specializes in the intersection of mood disorders and addiction.",
    },
    {
      icon: "ri-sun-line",
      title: "Environment as Medicine",
      body: "Our Southern California campuses — with ocean access, hiking, surfing, and daily outdoor time — leverage evidence-based research showing that sunlight, exercise, and nature measurably reduce depressive symptoms.",
    },
    {
      icon: "ri-microscope-line",
      title: "Multi-Modal Therapeutic Approach",
      body: "CBT, DBT, trauma therapy, 12-step integration, and holistic experiential modalities are combined to address depression from every angle — not just pharmacologically.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Thoughtful Medication Philosophy",
      body: "We use psychiatric medication when clinically appropriate and taper thoughtfully as therapy progresses — never relying on medication as a substitute for genuine therapeutic work.",
    },
    {
      icon: "ri-group-line",
      title: "Peer Community & Group Healing",
      body: "Depression thrives in isolation. Northbound's group programming creates the sense of belonging and shared experience that is itself a powerful antidepressant and relapse prevention tool.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Proven Outcomes — 97% Symptom Reduction",
      body: "A 2015 USC-affiliated study found a 97% reduction in depressive and anxiety symptoms among Northbound clients who completed treatment — a result that reflects genuine clinical effectiveness.",
    },
  ],

  closingImage: `${BASE}/nbt_depression_recovery01.jpg`,
  closingImageAlt: "Person jogging along coastal path at sunrise — the return of motivation and energy in depression recovery",
  closingHeadline: "The Absence of Joy Is Not Permanent",
  closingQuote:
    "Depression tells you nothing will ever get better. Our job is to prove that wrong — clinically, measurably, sustainably.",
  closingBody: [
    "At Northbound, we've helped thousands of people climb out of depression and sobriety simultaneously. Our integrated model doesn't just treat symptoms — it rebuilds the foundation of a life. With our Southern California environment, proven clinical team, and full continuum of care, recovery from depression and addiction is not only possible — it's probable.",
  ],
  faqs: [
    {
      question: "Is depression a cause or a consequence of addiction?",
      answer:
        "Both are possible, and the relationship is often circular. Some people develop addiction as a result of self-medicating depressive symptoms. Others develop depression as a direct consequence of prolonged substance use. In either case, integrated dual diagnosis treatment that addresses both conditions simultaneously produces the best outcomes.",
    },
    {
      question: "Will I need antidepressants?",
      answer:
        "Not necessarily. Northbound's clinical philosophy prioritizes therapy, lifestyle intervention, and peer support over medication when clinically appropriate. When medication is recommended, it's done in consultation with our board-certified psychiatrists and re-evaluated regularly.",
    },
    {
      question: "What if my depression gets worse during early recovery?",
      answer:
        "It's normal for depressive symptoms to intensify briefly during early sobriety as the brain's chemistry readjusts. Our residential and clinical team monitors this closely and has the psychiatric resources to support you through it safely.",
    },
    {
      question: "How long does treatment for depression and addiction take?",
      answer:
        "Most clients benefit from 45–90 days of structured residential and step-down treatment. The duration depends on the severity of both conditions. Aftercare and alumni support continue indefinitely.",
    },
    {
      question: "Does Northbound treat suicidal ideation?",
      answer:
        "Yes. Our clinical team is trained and equipped to provide safety planning and crisis support for clients experiencing suicidal thoughts. If you or someone you love is in immediate danger, call 988 or your nearest emergency room immediately — then contact Northbound at (866) 311-0003.",
    },
    {
      question: "Does Northbound accept insurance for depression treatment?",
      answer:
        "Yes. We are in-network with more than 15 major insurance plans. Our admissions team will verify your benefits within 24 hours and navigate the process on your behalf.",
    },
  ],

  relatedSubstances: [
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-heart-pulse-line" },
    { label: "Bipolar Disorder", href: "/treatment/mental-health-disorders/bipolar-disorder/", icon: "ri-exchange-line" },
    { label: "Trauma & PTSD", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-mental-health-line" },
    { label: "Codependency", href: "/treatment/mental-health-disorders/codependency/", icon: "ri-group-line" },
  ],
};

export default function DepressionPage() {
  return <SubstancePageTemplate data={data} />;
}
