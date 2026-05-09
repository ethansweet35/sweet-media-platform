import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_meth_hero01.jpg`,
  heroImageAlt: "The devastating physical toll of methamphetamine addiction — a face unrecognizable from who it was before",
  substanceName: "Meth",
  heroHeadline: "Methamphetamine Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Methamphetamine is the most powerful stimulant available — and one of the most destructive addictions to live with or to watch in someone you love. At Northbound, we treat meth addiction with the clinical depth, compassion, and full continuum of care it demands. Recovery is possible. We've seen it.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Methamphetamine Addiction",
  whatItIsBody: [
    "Methamphetamine is a synthetic stimulant that floods the brain with dopamine — producing an intense, long-lasting euphoria that can last 12 hours or more. The brain's dopamine system is fundamentally rewired by chronic meth use: tolerance develops rapidly, natural dopamine production is suppressed, and the ability to experience pleasure from everyday life becomes increasingly inaccessible without the drug.",
    "Crystal meth is the solid, crystalline form of methamphetamine — typically purer and more potent than the powdered form, and therefore more rapidly addictive. Street-purchased meth is almost always adulterated with additional substances (talcum powder, antifreeze, drain cleaner, other drugs), creating compounding toxicity risks beyond the meth itself.",
    "The physical consequences of prolonged meth use are starkly visible: dramatic aging, severe dental deterioration ('meth mouth'), skin sores, emaciation, and neurological damage affecting behavior, emotional regulation, and cognitive function. Psychosis — paranoia, hallucinations, violent behavior, talking to people who aren't there — is common in heavy users, making meth addiction both medically and clinically complex to treat.",
  ],
  whatItIsImage: `${BASE}/nbt_meth_therapy01.jpg`,
  whatItIsImageAlt: "Clinical assessment and first contact with a doctor — the first step in meth addiction treatment at Northbound",
  quickStats: [
    { value: "2.5M+", label: "Americans reported past-year meth use" },
    { value: "12 hrs", label: "The duration of a single meth high — longer than most stimulants" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Methamphetamine addiction progresses rapidly and often begins to be visible in dramatic physical and behavioral changes. These are the clinical warning signs that meth dependency has developed.",
  warningSigns: [
    "Extreme weight loss, emaciation, and severe dental deterioration",
    "Skin sores or scabs from compulsive picking or scratching (formication)",
    "Staying awake for days at a time followed by prolonged 'crashes'",
    "Paranoia, aggression, or irrational fear of persecution",
    "Auditory or visual hallucinations — talking to people who aren't there",
    "Dramatic behavioral changes: erratic, unpredictable, or violent behavior",
    "Obsessive or repetitive activities (cleaning, organizing, taking apart objects for hours)",
    "Financial collapse — spending all available resources on meth",
    "Total neglect of family, parenting, work, and basic responsibilities",
    "Unable to experience pleasure or feel normal without meth use",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Meth Recovery Looks Like at Northbound",
  recoveryIntro:
    "Meth recovery is a long-term neurological and psychological rebuilding process — not simply stopping use. Northbound provides the full clinical continuum needed to support genuine, durable recovery from methamphetamine.",
  careSteps: [
    {
      phase: "Days 1–14",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Meth withdrawal produces profound psychological symptoms — severe depression, extreme fatigue, cognitive fog, intense cravings, and in some cases psychosis. Northbound's one-eighty residential detox provides 24/7 clinical supervision, psychiatric care for withdrawal-related psychosis, and medication support to ensure a safe and monitored transition.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Meth recovery requires extended residential care to allow the brain time to begin neurological recovery. Northbound's Orange County facilities provide 24/7 clinical support, individual and group therapy, psychiatric care, CBT, DBT, EMDR, and dual-diagnosis treatment for co-occurring depression, anxiety, and psychosis.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of structured clinical programming as clients begin transitioning from residential care. This phase is particularly important for meth recovery — building the daily structure, cognitive rehabilitation, and emotional regulation skills that meth has degraded.",
    },
    {
      phase: "Month 3–6",
      title: "Intensive Outpatient Program (IOP)",
      icon: "ri-calendar-check-line",
      body: "IOP allows clients to gradually reintegrate into real life while maintaining 10–12 hours of weekly therapeutic support. For meth clients, this phase focuses on rebuilding motivation, functional capacity, and genuine connection — things the drug systematically destroyed. Northbound's approach introduces real-world stressors within a supported treatment context.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare, Sober Living & Alumni",
      icon: "ri-refresh-line",
      body: "Long-term meth recovery requires long-term support. Northbound's aftercare and alumni program provides ongoing community and accountability. Careerbound® and Collegebound® programs help clients rebuild their professional and educational lives — disrupted by meth addiction — while in treatment.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Neurological Recovery Expertise",
      body: "Meth damages the brain regions responsible for reward, motivation, emotional regulation, and cognition. Northbound's clinical team is experienced in supporting the extended neurological recovery meth requires — using evidence-based therapies, psychiatric care, and patience.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Psychiatric Care for Meth Psychosis",
      body: "Meth-induced psychosis — paranoia, hallucinations, violent behavior — requires specialized psychiatric management. Northbound's Medical Director and clinical team are equipped to manage withdrawal-related and chronic psychotic symptoms safely throughout the treatment process.",
    },
    {
      icon: "ri-user-line",
      title: "1:1 Staff-to-Client Ratio",
      body: "Meth recovery demands intensive, individualized support — particularly in early recovery when cognitive and behavioral function is significantly impaired. Northbound's 1:1 staff-to-client ratio ensures every client receives the focused clinical attention their recovery requires.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® & Careerbound®",
      body: "Meth destroys careers, education, and productive life trajectories. Northbound's specialized programs help clients rebuild their professional and academic goals while in treatment — providing structure, motivation, and accountability alongside clinical care.",
    },
    {
      icon: "ri-family-line",
      title: "Family Recovery Support",
      body: "Living with or loving someone with a meth addiction is profoundly disorienting and traumatic. Northbound's Family Program helps loved ones understand meth addiction, heal from the damage it causes, and develop the tools to support recovery without enabling continued use.",
    },
    {
      icon: "ri-shield-check-line",
      title: "38+ Years & Insurance Access",
      body: "Northbound has treated meth addiction since 1988 — through every phase of the methamphetamine epidemic. We are DHCS licensed, NAATP member, and in-network with 15+ major insurance plans. Our team verifies your benefits at no cost before you commit to anything.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_meth_recovery01.jpg`,
  closingImageAlt: "Person journaling with coffee outdoors — calm, grounded, rebuilding life after meth addiction at Northbound",
  closingHeadline: "Meth Addiction Doesn't Have to Be the End. Recovery Is a Beautiful New Beginning.",
  closingBody: [
    "Someone you know and love may have become unrecognizable because of meth. They may not remember what life felt like before. Their bottom may not have come yet. But with the right clinical team and genuine commitment, recovery from meth is possible — and thousands of Northbound alumni have proven it.",
    "We'd love to help you or your loved one regain control and get a second chance at life through sobriety. Call us today.",
  ],
  closingQuote:
    "At Northbound, we walk with our clients as they put down the pipe and pick up new life skills — real recovery, in real life.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Can the brain recover from meth damage?",
      answer:
        "Yes — to a significant degree. Research shows that many of the neurological changes caused by meth use (particularly in dopamine system function) show measurable recovery after extended abstinence, often beginning at 6–12 months. The recovery is not always complete, but it is real and clinically significant. Treatment begins supporting this neurological healing process from day one.",
    },
    {
      question: "How long does meth treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day programs. Given the neurological complexity of meth addiction and the time required for brain recovery, 90 days or more of treatment is strongly recommended. Many clients also continue through PHP, IOP, sober living, and alumni support beyond their initial residential stay.",
    },
    {
      question: "Is meth psychosis treatable?",
      answer:
        "Yes. Meth-induced psychosis (paranoia, hallucinations, disorganized behavior) is typically managed with antipsychotic medications during detox and early recovery. In most cases, psychotic symptoms resolve significantly with sustained abstinence and appropriate psychiatric care. Northbound's clinical and psychiatric team is experienced in managing this aspect of meth recovery.",
    },
    {
      question: "My loved one doesn't think they need help. What should I do?",
      answer:
        "Denial is extremely common in meth addiction — the drug literally rewires the brain's self-assessment. Crystal Meth Anonymous (CMA) recommends learning about meth addiction first, then determining what kind of intervention support your loved one may need. Northbound offers free assessment and intervention support — call us any time to discuss the situation and next steps.",
    },
    {
      question: "Will insurance cover meth rehab?",
      answer:
        "In most cases, yes. Northbound is in-network with 15+ major plans including Aetna, Anthem, Cigna, and Tricare. Our admissions team verifies your specific benefits at no cost before you commit to anything.",
    },
    {
      question: "Does Northbound treat meth addiction alongside other mental health conditions?",
      answer:
        "Yes — and it's essential. Meth use disorder co-occurs with depression, anxiety, ADHD, and trauma at very high rates. Our dual-diagnosis program provides integrated treatment for both the meth dependency and any co-occurring psychiatric conditions, with psychiatrists and licensed therapists on staff.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
    { label: "Adderall Addiction", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Marijuana", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
  ],

  substanceNameShort: "Meth",
};

export default function MethPage() {
  return <SubstancePageTemplate data={data} />;
}
