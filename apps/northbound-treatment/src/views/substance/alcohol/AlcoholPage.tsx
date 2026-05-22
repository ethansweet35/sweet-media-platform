import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_alcohol_hero01.jpg`,
  heroImageAlt: "Person facing the weight of alcohol dependency — a quiet moment before choosing recovery",
  substanceName: "Alcohol",
  heroHeadline: "Alcohol Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Alcoholism affects millions of American families — and it has a way of making people feel utterly hopeless. At Northbound, we know recovery is possible. With 38 years of experience treating alcohol use disorder, we can help you or your loved one break free for good.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Alcohol Use Disorder",
  whatItIsBody: [
    "Alcohol is a central nervous system depressant that triggers the release of GABA, slowing brain activity and producing the characteristic euphoric and sedative effects. With continued heavy use, the brain adapts — reducing receptor sensitivity and increasing tolerance. This is the neurological foundation of physical dependence.",
    "When alcohol is abruptly removed after prolonged heavy use, the CNS can become dangerously overexcited. Symptoms of alcohol withdrawal — tremors, seizures, hallucinations, and in severe cases delirium tremens — can be life-threatening without medical supervision. This is why professional detoxification is not just recommended, but critical.",
    "Alcohol use disorder is not a character flaw or a lack of willpower. It is a primary, chronic, progressive brain disease recognized by the American Medical Association — and one of the most treatable conditions in medicine when approached with the right clinical support.",
  ],
  whatItIsImage: `${BASE}/nbt_alcohol_therapy01.jpg`,
  whatItIsImageAlt: "One-on-one therapy session for alcohol addiction at Northbound Treatment Services",
  quickStats: [
    { value: "29M+", label: "Americans struggle with alcohol use disorder" },
    { value: ">95%", label: "Alcohol abstinence rate in Northbound's USC outcomes study" },
    { value: "38 yrs", label: "Of experience treating alcohol addiction at Northbound" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Alcohol addiction can develop gradually and is often masked by social norms. These are the clinical warning signs that use has crossed into a disorder requiring treatment.",
  warningSigns: [
    "Drinking more than intended or being unable to control how much you drink",
    "Continued drinking despite negative consequences at work, school, or in relationships",
    "Spending significant time obtaining alcohol, drinking, or recovering",
    "Strong cravings or urges to drink that are difficult to ignore",
    "Giving up activities you once enjoyed in favor of drinking",
    "Needing alcohol to feel relaxed, cope with stress, or get through the day",
    "Hiding or isolating to drink; making excuses for heavy drinking",
    "Experiencing withdrawal symptoms when not drinking: shaking, sweating, anxiety, nausea",
    "Frequently becoming intoxicated, having blackouts, or not remembering events",
    "Legal trouble or accidents related to drinking (e.g., DUI, falls, injuries)",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Alcohol Recovery Looks Like at Northbound",
  recoveryIntro:
    "Alcohol recovery requires clinical precision — especially in the early detox phase. Northbound provides the full continuum from medically supervised detox through long-term alumni support.",
  careSteps: [
    {
      phase: "Days 1–7",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Alcohol withdrawal can be medically dangerous — seizures, cardiac complications, and delirium can occur without supervision. Every Northbound client begins with a full biopsychosocial assessment and, if indicated, enters our one-eighty medically supervised detox program with 24/7 clinical monitoring and medication-assisted support.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following detox, residential treatment provides immersive 24/7 clinical care in our Orange County facilities. Individual therapy, group counseling, family therapy, evidence-based modalities (CBT, DBT, EMDR), psychiatric care, and trauma-informed work address both the addiction and its underlying drivers.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides intensive clinical programming 5 days per week while introducing greater independence. Clients continue individual and group therapy, medication management, and skills-building as they begin preparing for the transition to outpatient care.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP offers 10–12 hours of weekly clinical programming, allowing clients to re-engage with work, family, or school while maintaining therapeutic support. This phase applies Northbound's approach of practicing real-world skills within a treatment context — building genuine self-efficacy for long-term sobriety.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Program",
      icon: "ri-refresh-line",
      body: "Northbound's robust alumni program provides the ongoing community, accountability, and events that sustain recovery for life. One-third of our staff are program alumni themselves — ensuring clients are never truly alone in their recovery journey.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-heart-pulse-line",
      title: "Medically Supervised Alcohol Detox",
      body: "Alcohol withdrawal is one of the few substance withdrawals that can be fatal. Northbound's one-eighty detox program provides 24/7 medical supervision, evidence-based medication-assisted treatment, and clinical monitoring to ensure a safe, as-comfortable-as-possible detoxification.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Treatment",
      body: "Alcohol use disorder frequently co-occurs with depression, anxiety, PTSD, and trauma. Northbound's dual-diagnosis program treats both conditions simultaneously — addressing the root causes of drinking, not just the behavior.",
    },
    {
      icon: "ri-user-line",
      title: "2:1 Staff-to-Client Ratio",
      body: "Every client receives deeply individualized clinical attention. Our 2:1 staff-to-client ratio means treatment plans can be adjusted in real time and each person receives the focused support their recovery requires.",
    },
    {
      icon: "ri-shield-check-line",
      title: "38+ Years of Clinical Experience",
      body: "Founded in 1988, Northbound has treated alcohol addiction across decades of evolving clinical practice. Our leadership team brings 200+ combined years of behavioral healthcare expertise to every case.",
    },
    {
      icon: "ri-family-line",
      title: "Family-Inclusive Recovery",
      body: "Northbound's monthly Family Program helps loved ones understand alcohol use disorder, heal relational damage, and learn how to support recovery without enabling — because alcoholism is a family disease.",
    },
    {
      icon: "ri-award-line",
      title: "Insurance-Accepted, DHCS Licensed",
      body: "DHCS licensed (#300661CP) and NAATP member, Northbound is in-network with 15+ major insurance plans. Our team verifies benefits and navigates coverage before you commit to anything — at no cost to you.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_alcohol_recovery01.jpg`,
  closingImageAlt: "Person walking a coastal boardwalk at sunset — the freedom and clarity of alcohol recovery at Northbound",
  closingHeadline: "Freedom From Alcohol Is Closer Than You Think.",
  closingBody: [
    "Perhaps you've tried to stop before. Perhaps you've been told you'll never change. Northbound knows recovery from alcohol addiction is possible — because we've helped thousands of people achieve it over 38 years.",
    "Our goal is not just sobriety. It is a life of authentic connection, purpose, and lasting freedom. We provide the clinical foundation and long-term community to build exactly that — starting today.",
  ],
  closingQuote:
    "Our client's best interest is our best interest — and your best interest is a life free from addiction.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Is alcohol withdrawal dangerous?",
      answer:
        "Yes — alcohol withdrawal is one of the few substance withdrawals that can be life-threatening. Symptoms including seizures, severe tremors, hallucinations, and delirium tremens can occur without medical supervision. Northbound's medically supervised detox program provides 24/7 clinical oversight to ensure a safe withdrawal process.",
    },
    {
      question: "How long does alcohol treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day treatment programs. Research consistently shows that 90 days or more of treatment produces the strongest long-term outcomes for alcohol use disorder. The appropriate duration depends on the severity of dependence, co-occurring conditions, and individual progress — and is determined collaboratively with your clinical team.",
    },
    {
      question: "Will my insurance cover alcohol rehab?",
      answer:
        "In most cases, yes. Northbound is in-network with Aetna, Anthem/Blue Cross Blue Shield, Cigna, Tricare, and 15+ other major plans. Our admissions team verifies your specific benefits and walks you through your coverage options at no cost — before you commit to anything.",
    },
    {
      question: "What is medication-assisted treatment (MAT) for alcohol?",
      answer:
        "MAT uses FDA-approved medications to manage withdrawal symptoms and reduce cravings during detox and early recovery. Common medications include benzodiazepines (for withdrawal safety), naltrexone, and disulfiram. At Northbound, MAT is always administered under close medical supervision as part of an individualized treatment plan.",
    },
    {
      question: "Can I receive treatment if I've relapsed before?",
      answer:
        "Absolutely. Relapse is a recognized part of the addiction recovery process for many people — not a sign of failure or a reason to stop pursuing sobriety. Northbound's clinical team is experienced in treating individuals with multiple treatment episodes and will help identify what wasn't working before and develop a more effective plan.",
    },
    {
      question: "Does Northbound offer family support during treatment?",
      answer:
        "Yes. Northbound's monthly Family Program involves loved ones in the healing process — providing education about alcohol use disorder, family therapy, and tools to support recovery without enabling. We recognize that alcoholism is a family disease that affects everyone close to the person struggling.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
    { label: "Marijuana", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
    { label: "Adderall", href: "/treatment/adderall/", icon: "ri-capsule-line" },
  ],

  substanceNameShort: "Alcohol",
};

export default function AlcoholPage() {
  return <SubstancePageTemplate data={data} />;
}
