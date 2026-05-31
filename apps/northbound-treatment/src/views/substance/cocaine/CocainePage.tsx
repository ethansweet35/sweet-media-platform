import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_cocaine_hero01.jpg`,
  heroImageAlt: "Person in recovery from cocaine addiction looking toward the future at Northbound Treatment",
  substanceName: "Cocaine",
  heroHeadline: "Cocaine Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Cocaine and crack cocaine addiction carry intense psychological cravings that can feel impossible to escape. Northbound's evidence-based stimulant addiction program addresses both the neurological patterns of cocaine dependency and the underlying factors that drive use — delivering real, measurable recovery.",

  whatItIsHeadline: "What Is Cocaine Addiction?",
  whatItIsBody: [
    "Cocaine is a powerful stimulant derived from coca plant leaves that floods the brain with dopamine, producing short-lived euphoria followed by a sharp crash. Crack cocaine is a freebase form of cocaine that is smoked and produces an even more rapid, intense — and briefer — high. Both forms produce a similar addiction profile: intense psychological cravings, compulsive use patterns, and escalating doses over time.",
    "Unlike opioids or alcohol, cocaine doesn't produce the same severe physical withdrawal syndrome. But this doesn't make it less dangerous — cocaine addiction is primarily a psychological disease, driven by intense cravings, anxiety, depression, and anhedonia (the inability to feel pleasure without the drug) that can persist for weeks or months after stopping.",
    "Cocaine causes serious cardiovascular damage over time, including elevated risk of heart attack and stroke, even in young, otherwise healthy people. When cocaine and alcohol are used together, the liver produces cocaethylene — a more toxic compound — significantly multiplying the health risk.",
  ],
  whatItIsImage: `${BASE}/nbt_cocaine_therapy01.jpg`,
  whatItIsImageAlt: "Group therapy session for stimulant addiction recovery at Northbound Treatment",
  quickStats: [
    { value: "5M+", label: "Americans use cocaine in any given year" },
    { value: "72 hrs", label: "Typical cocaine crash duration after a binge" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Cocaine addiction often escalates in the context of social or professional environments, making it easy to minimize or deny. These are the warning signs that use has become a clinical problem.",
  warningSigns: [
    "Using cocaine more frequently or in larger amounts than planned",
    "Spending significant time obtaining, using, or recovering from cocaine",
    "Strong cravings or urges to use cocaine between episodes",
    "Continued use despite relationship, financial, or legal problems",
    "Withdrawing from activities that were previously enjoyed",
    "Experiencing crashes: fatigue, depression, irritability, hypersomnia after use",
    "Escalating to crack cocaine or polysubstance use (mixing with alcohol, opioids)",
    "Paranoia, anxiety, or psychosis during or after use",
    "Significant weight loss or neglect of personal hygiene",
    "Using cocaine to manage emotional pain, stress, or low mood",
  ],

  recoveryHeadline: "What Cocaine Recovery Looks Like at Northbound",
  recoveryIntro:
    "Because cocaine addiction is primarily psychological, effective treatment focuses on restructuring thought patterns, building emotional regulation skills, and treating co-occurring mental health conditions. Northbound's stimulant-specialized program provides the clinical depth this requires.",
  careSteps: [
    {
      phase: "Days 1–14",
      title: "Assessment & Medical Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Every client begins with a comprehensive biopsychosocial evaluation. The cocaine crash phase — characterized by fatigue, depression, and intense cravings — is managed with clinical support, psychiatric care, and in some cases short-term medication assistance to ensure stability.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Residential care is the foundation of cocaine addiction recovery at Northbound. Daily programming includes individual therapy (CBT, DBT), group counseling, family sessions, and dual-diagnosis treatment for co-occurring depression, anxiety, or ADHD — which are extremely common in cocaine-addicted individuals.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of intensive outpatient-style programming while clients live in a supported environment. This phase builds on residential gains, with particular focus on relapse prevention skills and high-risk social situation management.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Northbound's virtual IOP (HomeBound) allows clients to return to work, school, and family life while maintaining 10–12 hours of weekly clinical support. The InVivo® model specifically addresses the social and professional triggers that often drive cocaine use.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Network",
      icon: "ri-refresh-line",
      body: "Cocaine cravings can resurface months after cessation. Northbound's alumni community and continued case management provide the long-term structure and community that support lasting sobriety.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Stimulant-Specific Expertise",
      body: "Cocaine addiction presents differently from opioid or alcohol addiction. Our clinical team specializes in stimulant use disorders — the cravings, psychological patterns, and co-occurring conditions that make cocaine addiction uniquely challenging.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Dual-Diagnosis Integrated Care",
      body: "Depression, anxiety, ADHD, and bipolar disorder frequently co-occur with cocaine use. Northbound's psychiatrists and therapists treat the full picture — substance use and mental health together.",
    },
    {
      icon: "ri-group-line",
      title: "Group Therapy That Works",
      body: "Northbound's group therapy model creates genuine peer accountability and community — a critical factor in stimulant recovery, where social environments often drive use.",
    },
    {
      icon: "ri-refresh-line",
      title: "Relapse Prevention Focus",
      body: "Our InVivo® model practices real-world coping skills during treatment — not just in a controlled setting — so that when triggers arise after discharge, clients are equipped to respond.",
    },
    {
      icon: "ri-award-line",
      title: "38+ Years of Experience",
      body: "Northbound has been treating substance use disorders since 1987. Our track record, verified by USC research, reflects nearly four decades of refining what works in real clinical practice.",
    },
    {
      icon: "ri-group-line",
      title: "Family Involvement",
      body: "Cocaine addiction damages relationships. Northbound's family therapy program rebuilds the trust and communication skills essential for sustained recovery after treatment.",
    },
  ],

  closingImage: `${BASE}/nbt_cocaine_hero01.jpg`,
  closingImageAlt: "Individual in recovery from cocaine addiction beginning a new chapter at Northbound Treatment",
  closingHeadline: "You Don't Have to Fight Cocaine Alone",
  closingBody: [
    "Cocaine addiction is relentless — the cravings, the crashes, the cycle. But the cycle can be broken with the right clinical support, the right environment, and the right team behind you.",
    "Northbound's admissions team is available 24 hours a day, 7 days a week. The call is free, confidential, and comes with no obligation. If you or someone you love is struggling with cocaine, today is the right time to reach out.",
  ],
  closingQuote: "The hardest part is making the call. Everything after that, we do together.",

  faqs: [
    {
      question: "Is cocaine withdrawal medically dangerous?",
      answer:
        "Cocaine withdrawal does not typically produce the life-threatening physical symptoms of alcohol or opioid withdrawal. However, the psychological symptoms — severe depression, suicidal ideation, intense cravings — can be very dangerous. Medical supervision during the crash period is strongly recommended to ensure safety and support.",
    },
    {
      question: "What is the difference between cocaine and crack cocaine treatment?",
      answer:
        "Crack cocaine and powder cocaine cause the same type of addiction, but crack's more rapid onset tends to produce more severe psychological dependency faster. The clinical treatment approach is similar for both, though crack cocaine addiction may require longer residential treatment and more intensive cravings management work.",
    },
    {
      question: "Are there medications that help with cocaine addiction?",
      answer:
        "Currently, no FDA-approved medications specifically target cocaine addiction. However, some medications — including those for co-occurring depression or ADHD — can reduce cravings indirectly. Northbound's physicians evaluate each client individually to determine whether adjunctive medication is clinically appropriate.",
    },
    {
      question: "How long does cocaine treatment take?",
      answer:
        "Most clinical guidelines recommend a minimum of 90 days of structured treatment for stimulant use disorders, with longer periods associated with significantly better outcomes. Northbound typically guides clients through a continuum of 3–6 months of care, followed by ongoing aftercare support.",
    },
    {
      question: "Does Northbound treat cocaine and alcohol co-use?",
      answer:
        "Yes. Polysubstance use — particularly cocaine combined with alcohol — is extremely common and requires an integrated treatment approach. Northbound's dual-diagnosis clinical team assesses every substance in use and treats the full picture of each client's addiction.",
    },
    {
      question: "Will insurance cover cocaine addiction treatment?",
      answer:
        "Most major insurance plans — including Aetna, Anthem, Cigna, and Tricare — cover substance use disorder treatment. Northbound's admissions team verifies your benefits at no charge before treatment begins. Call (866) 311-0003 for a free, confidential insurance check.",
    },
  ],

  substanceNameShort: "Cocaine",
  relatedSubstances: [
    { label: "Crack Cocaine", href: "/treatment/crack-cocaine/", icon: "ri-fire-line" },
    { label: "Meth", href: "/treatment/meth/", icon: "ri-alert-line" },
    { label: "Adderall", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Amphetamine", href: "/treatment/amphetamine/", icon: "ri-pulse-line" },
    { label: "Alcohol", href: "/treatment/alcoholism/", icon: "ri-drop-line" },
    { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis/", icon: "ri-brain-line" },
  ],
};

export default function CocainePage() {
  return <SubstancePageTemplate data={data} />;
}
