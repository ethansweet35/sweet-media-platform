import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_methadone_hero01.jpg`,
  heroImageAlt: "Person walking a sunlit path toward recovery from methadone addiction at Northbound Treatment",
  substanceName: "Methadone",
  heroHeadline: "Methadone Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Methadone is a long-acting opioid prescribed both for chronic pain and as part of medication-assisted treatment for heroin and opioid addiction — but it carries its own significant risk of dependency. Northbound treats methadone addiction with the same clinical depth and medically supervised care that all opioid use disorders demand.",

  whatItIsHeadline: "What Is Methadone Addiction?",
  whatItIsBody: [
    "Methadone is a synthetic opioid with a much longer half-life than most other opioids — a single dose can remain active in the body for 24 to 36 hours. This pharmacological profile makes it useful for managing opioid withdrawal in clinical settings, but it also means that tolerance, physical dependence, and addiction can develop steadily without the user recognizing it.",
    "Many individuals who become dependent on methadone initially received it legitimately — either for pain management or as part of a methadone maintenance program intended to treat another opioid addiction. When the prescribed dose no longer feels sufficient, or when someone begins using more than prescribed, addiction has taken hold.",
    "Methadone withdrawal is notoriously prolonged compared to shorter-acting opioids like heroin or oxycodone. Acute withdrawal symptoms can last 3–6 weeks, and post-acute withdrawal symptoms — fatigue, depression, insomnia, and cravings — can persist for months. Medical supervision throughout this process is essential for both safety and long-term success.",
  ],
  whatItIsImage: `${BASE}/nbt_fentanyl_therapy01.jpg`,
  whatItIsImageAlt: "Clinical therapy session supporting recovery from methadone dependency at Northbound Treatment",
  quickStats: [
    { value: "36 hrs", label: "Duration methadone stays active in the body" },
    { value: "3–6 wks", label: "Duration of acute methadone withdrawal" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Because methadone is a prescribed medication, many people minimize or miss the signs of addiction. These are the clinical warning signs that use has crossed into dependency.",
  warningSigns: [
    "Taking more methadone than prescribed to feel 'normal' or to get relief",
    "Experiencing strong cravings when a dose is missed or delayed",
    "Obtaining additional methadone outside of a clinical program",
    "Feeling physically ill — sweating, cramping, anxiety — if a dose is late",
    "Escalating doses over time as tolerance develops",
    "Continuing to use methadone despite negative health, relationship, or work consequences",
    "Mixing methadone with alcohol, benzodiazepines, or other opioids",
    "Failed attempts to taper down or stop methadone without clinical support",
    "Hiding methadone use or feeling shame around the level of use",
    "Depression, fatigue, and cognitive dulling between doses",
  ],

  recoveryHeadline: "What Methadone Recovery Looks Like at Northbound",
  recoveryIntro:
    "Recovering from methadone dependency requires a carefully managed medical process — both because of the prolonged withdrawal timeline and the risk of switching one opioid for another. Northbound's opioid-specialized team designs individualized tapers and treatment plans for every client.",
  careSteps: [
    {
      phase: "Days 1–30+",
      title: "Medical Detox & Supervised Taper",
      icon: "ri-heart-pulse-line",
      body: "Methadone taper must be slow and physician-managed — typically 5–10% dose reduction every 1–2 weeks. Northbound's medical team monitors for withdrawal symptoms, manages comfort with adjunctive medications (clonidine, sleep aids, anti-nausea agents), and adjusts the taper rate based on individual response.",
    },
    {
      phase: "Weeks 4–16+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following detox, residential treatment builds the therapeutic foundation for life without opioids. Individual therapy, group counseling, family sessions, and dual-diagnosis care address the psychological and emotional drivers of methadone dependency alongside the physical recovery process.",
    },
    {
      phase: "Month 3–5",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP continues intensive clinical programming — 5 days per week — as clients build capacity for independent functioning. Relapse prevention, emotional regulation, and reintegration skills are the focus of this phase.",
    },
    {
      phase: "Month 4–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows clients to rebuild their lives — work, family, routine — while maintaining structured therapeutic support. Northbound's InVivo® model practices real-world sobriety skills within the treatment context.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Long-Term Support",
      icon: "ri-refresh-line",
      body: "Post-acute withdrawal from methadone can persist for many months. Northbound's aftercare plan includes ongoing psychiatric monitoring, alumni community access, and continued case management support for as long as needed.",
    },
  ],

  differentiators: [
    {
      icon: "ri-heart-pulse-line",
      title: "Prolonged Withdrawal Management",
      body: "Methadone's long half-life makes withdrawal uniquely extended. Northbound's medical team is experienced in managing multi-week taper protocols with the patience and clinical precision this requires.",
    },
    {
      icon: "ri-capsule-line",
      title: "Alternative MAT Options",
      body: "For clients whose opioid dependency warrants medication support, Northbound's physicians evaluate buprenorphine or naltrexone as alternatives — transitioning off methadone while maintaining the stability needed for recovery.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Care",
      body: "Depression, anxiety, and chronic pain are extremely common in methadone-dependent individuals. Our psychiatrists treat the full clinical picture — substance use and co-occurring conditions together.",
    },
    {
      icon: "ri-shield-check-line",
      title: "No Judgment on Past Treatment",
      body: "Many methadone-dependent clients were initially treated in a methadone maintenance program. We recognize the good intentions behind that treatment and focus entirely on what's right for you now.",
    },
    {
      icon: "ri-award-line",
      title: "38+ Years of Opioid Expertise",
      body: "Northbound has been treating opioid use disorders since 1987. Our track record, verified by USC research, reflects the clinical depth that methadone addiction specifically requires.",
    },
    {
      icon: "ri-refresh-line",
      title: "Long-Term Aftercare Structure",
      body: "Because methadone PAWS can extend for 6–12 months, Northbound's aftercare program provides sustained psychiatric monitoring and community support well beyond discharge.",
    },
  ],

  closingImage: `${BASE}/nbt_methadone_hero01.jpg`,
  closingImageAlt: "Individual finding freedom from methadone dependency through recovery at Northbound Treatment",
  closingHeadline: "Methadone Dependency Is Treatable — We Know How",
  closingBody: [
    "Methadone addiction is complex, prolonged, and often misunderstood — even by people who care about you. Northbound's clinical team has deep experience with exactly this type of dependency, and we understand that the path forward requires both medical precision and genuine compassion.",
    "Our admissions team is available 24/7, at no cost and no obligation. The first call is confidential. If methadone has taken more than it was ever supposed to give, we're ready to help.",
  ],
  closingQuote: "What started as treatment became a chain. We can help you break it — safely, with clinical support every step of the way.",

  faqs: [
    {
      question: "Can I just stop taking methadone on my own?",
      answer:
        "Abrupt methadone cessation is not recommended and can be medically dangerous. Because methadone stays in the body for a long time, withdrawal symptoms can be delayed and then severe. A medically supervised, gradual taper is the safest and most effective approach.",
    },
    {
      question: "I was put on methadone to treat another addiction. Is that a problem?",
      answer:
        "Methadone maintenance treatment (MMT) is a legitimate, evidence-based intervention for opioid use disorder. But some clients find that they've become dependent on methadone itself. If that's you, Northbound will help you transition safely — without judgment, and with full recognition of the original intention behind your treatment.",
    },
    {
      question: "How long does methadone withdrawal last?",
      answer:
        "Acute methadone withdrawal symptoms typically peak around days 3–8 and can persist for 3–6 weeks — significantly longer than heroin or oxycodone withdrawal. Post-acute withdrawal symptoms (PAWS) including low energy, mood changes, and sleep disruption can continue for months afterward.",
    },
    {
      question: "Will Northbound put me on another opioid to treat methadone addiction?",
      answer:
        "It depends on the clinical picture. For some clients, buprenorphine (Suboxone) offers a safer, easier-to-taper alternative to methadone during the transition period. For others, naltrexone is appropriate after detox. And for many clients, a straightforward taper with no opioid substitution is the right path. Our physicians evaluate each case individually.",
    },
    {
      question: "Does Northbound treat methadone and chronic pain together?",
      answer:
        "Yes — many clients on methadone for pain management develop dependency. Northbound's integrated team includes physicians who can evaluate non-opioid pain management strategies alongside addiction treatment, creating a plan that addresses both issues.",
    },
    {
      question: "Will insurance cover methadone addiction treatment?",
      answer:
        "Most major insurance plans cover opioid use disorder treatment. Northbound works with Aetna, Anthem, Cigna, Tricare, and others. Call (866) 311-0003 for a free, confidential benefits verification — no obligation required.",
    },
  ],

  substanceNameShort: "Methadone",
  relatedSubstances: [
    { label: "Heroin", href: "/treatment/heroin/", icon: "ri-capsule-line" },
    { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-heart-pulse-line" },
    { label: "Fentanyl", href: "/treatment/fentanyl/", icon: "ri-alert-line" },
    { label: "Suboxone", href: "/treatment/suboxone/", icon: "ri-shield-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-medicine-bottle-line" },
    { label: "MAT", href: "/treatment/medication-assisted-treatment/", icon: "ri-flask-line" },
  ],
};

export default function MethadonePage() {
  return <SubstancePageTemplate data={data} />;
}
