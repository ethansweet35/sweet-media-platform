import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_cocaine_hero01.jpg`,
  heroImageAlt: "Person facing the devastation of cocaine and crack addiction — isolated, defeated, on the edge of change",
  substanceName: "Cocaine & Crack",
  heroHeadline: "Cocaine & Crack Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Cocaine and crack addiction are among the most powerful stimulant dependencies — driven by intense dopamine surges that rewire the brain's reward system. At Northbound, we treat the full spectrum of cocaine use disorder with evidence-based, individualized care that addresses addiction at its neurological and psychological roots.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "What Is Cocaine & Crack Addiction?",
  whatItIsBody: [
    "Cocaine is a powerful stimulant derived from the coca plant that floods the brain with dopamine, producing an intense but brief euphoria. Crack cocaine is a freebase, crystallized form of cocaine that produces an almost immediate high when smoked — making it the most rapidly addictive form of the drug. Both are classified as Schedule II controlled substances.",
    "Crack triggers the release of far more dopamine than the brain can naturally replenish in a short timeframe. The result is a compulsive cycle: each subsequent use produces a lower high, driving the user to consume more, more frequently — a binge pattern that can consume days at a time. The brain's reward circuitry becomes dependent on cocaine-level dopamine stimulation, making natural pleasure essentially inaccessible during addiction.",
    "Physical signs of cocaine dependency include dilated pupils, significant weight loss, insomnia, and deteriorating personal care. Prolonged use can cause paranoid psychosis, tactile hallucinations, and in severe cases, hallucinations that cause users to scratch their skin until it bleeds. Cocaine is also frequently adulterated with other substances — creating additional and unpredictable toxicity risks.",
  ],
  whatItIsImage: `${BASE}/nbt_cocaine_therapy01.jpg`,
  whatItIsImageAlt: "Group therapy session for cocaine and crack addiction recovery at Northbound Treatment Services",
  quickStats: [
    { value: "5M+", label: "Americans reported past-year cocaine use" },
    { value: "1%", label: "Of teens will abuse crack cocaine during high school" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Cocaine and crack addiction can escalate rapidly — from recreational use to destructive dependency in weeks. These are the clinical warning signs that professional treatment is needed.",
  warningSigns: [
    "Using cocaine or crack in larger amounts or more frequently than intended",
    "Spending hours or days on a binge with little else happening",
    "Inability to stop using despite serious consequences",
    "Intense cravings for cocaine that are almost impossible to resist",
    "Noticeable physical changes: significant weight loss, poor personal hygiene, dilated pupils",
    "Paranoia, aggression, or extreme mood swings — especially after binging",
    "Tactile hallucinations or 'coke bugs' — the sensation of insects under the skin",
    "Financial problems from spending excessively on cocaine or crack",
    "Neglecting work, school, family, or relationships for drug use",
    "Legal trouble related to obtaining or using cocaine",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Cocaine Recovery Looks Like at Northbound",
  recoveryIntro:
    "Cocaine and crack addiction require comprehensive clinical treatment — addressing both the physiological dependency and the deep psychological hold the drug creates. Northbound provides the full continuum of care.",
  careSteps: [
    {
      phase: "Days 1–14",
      title: "Medical Assessment & Detox",
      icon: "ri-heart-pulse-line",
      body: "Every client begins with a comprehensive biopsychosocial assessment. Cocaine withdrawal, while not physically dangerous in the same way as alcohol or opioids, produces intense psychological symptoms — severe depression, extreme fatigue, and powerful cravings. Northbound's one-eighty detox provides 24/7 clinical supervision and comfort care through this phase.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Residential care provides immersive 24/7 clinical treatment in Northbound's Orange County facilities. Individual therapy, group counseling, family therapy, CBT, DBT, EMDR, and dual-diagnosis treatment address the addiction alongside any co-occurring mental health conditions — typically depression, anxiety, or PTSD.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides structured, intensive clinical programming 5 days per week as clients begin transitioning to greater independence. This phase continues the therapeutic work while building the daily structure and coping strategies that sustain sobriety outside of treatment.",
    },
    {
      phase: "Month 3–6",
      title: "Intensive Outpatient Program (IOP)",
      icon: "ri-calendar-check-line",
      body: "IOP provides 10–12 hours of weekly programming, allowing clients to re-engage with work, school, or family while maintaining robust clinical support. Clients learn to navigate real-world triggers and stressors in real time — with their treatment team alongside them.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Program",
      icon: "ri-refresh-line",
      body: "Northbound's alumni program provides the lifelong community, accountability, and events that sustain sobriety. One-third of our staff are program alumni — ensuring the lived-experience perspective is always present in our clients' recovery journey.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Expertise",
      body: "Cocaine use disorder frequently co-occurs with depression, bipolar disorder, ADHD, and anxiety. Northbound's dual-diagnosis program treats both simultaneously — identifying and addressing the psychological drivers of stimulant use alongside the addiction itself.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Most Skilled Rehabilitation Team",
      body: "The constellation of physical and mental health issues arising from crack cocaine addiction requires the most experienced clinical team. Northbound's leadership team has 200+ years of combined behavioral healthcare expertise — with a specific track record in stimulant addiction.",
    },
    {
      icon: "ri-user-line",
      title: "1:1 Staff-to-Client Ratio",
      body: "Every client at Northbound receives deeply individualized clinical attention. Our 1:1 staff ratio ensures that treatment plans are responsive to each client's evolving needs — particularly critical during the high-risk early stages of cocaine recovery.",
    },
    {
      icon: "ri-family-line",
      title: "Family Recovery Program",
      body: "Northbound's monthly Family Program helps loved ones understand cocaine and crack addiction, heal the relational damage it causes, and learn how to support recovery effectively — because no one recovers in isolation.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® & Careerbound®",
      body: "Many clients recovering from cocaine use disorder have seen their educational or professional trajectories derailed by addiction. Northbound's specialized programs help them rebuild — academically and professionally — while in treatment.",
    },
    {
      icon: "ri-award-line",
      title: "Insurance Access & DHCS Licensed",
      body: "DHCS licensed (#300661CP) and NAATP member, Northbound is in-network with 15+ major plans. Our admissions team verifies benefits at no cost before you make any commitment — so cost is never a barrier to starting.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_cocaine_recovery01.jpg`,
  closingImageAlt: "Man celebrating sobriety on a Southern California hiking trail — freedom from cocaine addiction at Northbound",
  closingHeadline: "There Is Hope. There Is a Way Out.",
  closingBody: [
    "Crack and cocaine addiction can feel inescapable — the cycle of craving, using, crashing, and starting over again consumes everything. But it doesn't have to end that way. Northbound has helped thousands of people break that cycle and build lives they're proud of.",
    "If you or someone you love is suffering from cocaine or crack dependency, don't wait. Contact Northbound today and take the first step toward a healthy, sober life.",
  ],
  closingQuote:
    "From experiential therapies to relearning life skills, Northbound helps those struggling with addiction find the hope and purpose they need for a new start.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Is cocaine addiction physically dangerous to detox from?",
      answer:
        "Cocaine withdrawal is primarily psychological rather than physically dangerous in the way alcohol or opioid withdrawal can be. However, the psychological symptoms — severe depression, anhedonia (inability to feel pleasure), intense cravings, and fatigue — are clinically significant and require professional support. Northbound's supervised detox program ensures a safe and monitored transition.",
    },
    {
      question: "What's the difference between cocaine and crack cocaine treatment?",
      answer:
        "The core treatment approach is similar — addressing stimulant dependency, dopamine dysregulation, and co-occurring psychological conditions. Crack cocaine tends to produce a faster and more intense addiction cycle due to its rapid onset. Northbound individualizes every treatment plan based on the specific substance, severity of use, and each client's unique history and needs.",
    },
    {
      question: "How long does cocaine treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day programs. Research consistently shows that 90 days or more produces the strongest outcomes for stimulant addiction. The right duration is determined by the severity of dependency, co-occurring conditions, and individual progress — assessed collaboratively with your clinical team.",
    },
    {
      question: "Can cocaine addiction be treated alongside depression?",
      answer:
        "Yes — and in most cases, it should be. Cocaine use disorder frequently co-occurs with depression (both as a cause and a consequence of chronic stimulant use). Northbound's dual-diagnosis program treats both conditions simultaneously with psychiatric care, evidence-based therapy, and medication management as appropriate.",
    },
    {
      question: "Will insurance cover cocaine and crack rehab?",
      answer:
        "In most cases, yes. Northbound is in-network with 15+ major insurance plans including Aetna, Anthem, Cigna, and Tricare. Our admissions team verifies your specific benefits and walks you through coverage options — at no cost — before you commit to anything.",
    },
    {
      question: "How does Northbound help after I leave treatment?",
      answer:
        "Northbound's alumni program provides lifelong community, accountability, and resources. After completing residential treatment, clients can continue through PHP, IOP, sober living, and ongoing aftercare support. One-third of our staff are program alumni who understand the long-term work of recovery from personal experience.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Adderall Addiction", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Marijuana", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
  ],

  substanceNameShort: "Cocaine",
};

export default function CocainePage() {
  return <SubstancePageTemplate data={data} />;
}
