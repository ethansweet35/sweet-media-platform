import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_marijuana_hero01.jpg`,
  heroImageAlt: "Young person disconnected and unmotivated — the quiet grip of marijuana dependency",
  substanceName: "Marijuana",
  heroHeadline: "Marijuana Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Popular culture has normalized marijuana use to the point where dependency often goes unrecognized — and untreated. At Northbound, we treat cannabis use disorder with the same clinical depth and personalization we bring to all substance dependencies, addressing the psychological drivers that make marijuana one of the hardest drugs for many people to quit.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Marijuana Addiction",
  whatItIsBody: [
    "The major active chemical in marijuana is delta-9-tetrahydrocannabinol (THC) — the compound responsible for its mind-altering effects. THC potency in marijuana has risen dramatically since the 1980s, making today's cannabis far more addictive than previous generations encountered. Regular use triggers serotonin release in the brain; over time, the brain adapts — reducing natural serotonin production and creating dependency on the drug for any sense of pleasure or reward.",
    "In most cases, daily marijuana use is a sign that the individual is attempting to mask or escape deeper psychological issues — anxiety, depression, trauma, social discomfort. The person becomes as addicted to the escape from reality as to the drug itself. This dual psychological hook — substance dependency plus avoidance behavior — is what makes cannabis use disorder clinically complex to treat.",
    "Although marijuana is not the most physically addictive drug, it is sometimes the hardest for people to quit. A powerful subculture, deep denial patterns, and the rationalization that 'it's just weed' create strong barriers to treatment. Regular users who attempt to stop do experience withdrawal symptoms — irritability, sleep disruption, anxiety, decreased appetite — that require clinical support to manage effectively.",
  ],
  whatItIsImage: `${BASE}/nbt_marijuana_therapy01.jpg`,
  whatItIsImageAlt: "One-on-one therapy session for marijuana and cannabis use disorder at Northbound Treatment",
  quickStats: [
    { value: "30%", label: "Of marijuana users develop some degree of dependency" },
    { value: "4×", label: "More potent: average THC levels today vs. 1990s" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Because marijuana is legal in many states and socially normalized, its dependency often goes unrecognized. These are the clinical warning signs that use has crossed into a disorder requiring treatment.",
  warningSigns: [
    "Using marijuana daily or multiple times per day to feel 'normal'",
    "Inability to enjoy activities, relax, sleep, or eat without marijuana",
    "Failed attempts to cut down or quit — despite wanting to",
    "Isolating from non-using friends and family to avoid judgment",
    "Spending significant time and money obtaining and using marijuana",
    "Neglecting responsibilities at work, school, or home due to marijuana use",
    "Continuing to use despite relationship problems or consequences directly caused by marijuana",
    "Using marijuana to cope with anxiety, depression, stress, or difficult emotions",
    "Withdrawal symptoms when stopping: irritability, sleep disruption, anxiety, decreased appetite",
    "Depressive or suicidal thoughts when unable to use",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Marijuana Recovery Looks Like at Northbound",
  recoveryIntro:
    "Recovery from cannabis use disorder requires relearning the life skills and coping strategies that marijuana has been replacing. Northbound provides clinical treatment that goes far beyond 'just stopping' — rebuilding a rewarding, fulfilling sober life.",
  careSteps: [
    {
      phase: "Day 1",
      title: "Clinical Assessment & Intake",
      icon: "ri-heart-pulse-line",
      body: "Every client begins with a comprehensive biopsychosocial assessment. For marijuana, this includes evaluating co-occurring mental health conditions — depression, anxiety, and PTSD are extremely common among cannabis-dependent individuals. The assessment guides development of an individualized treatment plan.",
    },
    {
      phase: "Weeks 1–8+",
      title: "Residential or Intensive Outpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Depending on severity and co-occurring conditions, clients enter residential treatment (24/7 care) or begin with PHP/IOP. Individual therapy, group counseling, CBT, DBT, and dual-diagnosis treatment address both the cannabis dependency and the underlying psychological factors driving use — including trauma, anxiety, depression, and social isolation.",
    },
    {
      phase: "Month 1–3",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides intensive 5-day-per-week clinical programming as clients begin building structured sober routines. This is where the critical work of 'relearning' happens — developing genuine pleasure, connection, and reward without marijuana, and identifying the avoidance patterns that drove use.",
    },
    {
      phase: "Month 2–5",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP provides 10–12 hours of weekly programming while clients reintegrate into work, school, or family. For marijuana recovery specifically, IOP focuses on building social connection, motivation, and daily structure — replacing the role cannabis played in managing discomfort and avoidance.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Program",
      icon: "ri-refresh-line",
      body: "Northbound's alumni program provides ongoing community and accountability — critical for marijuana recovery, where the subculture and social pressure to use can persist strongly. One-third of our staff are program alumni, offering lived-experience mentorship through every stage of the recovery journey.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Psychological Specialization",
      body: "At Northbound, we are specially equipped to handle the unique psychological issues that accompany marijuana dependency — including the deep avoidance patterns, co-occurring anxiety and depression, and the powerful barrier of denial and rationalization that define cannabis use disorder.",
    },
    {
      icon: "ri-leaf-line",
      title: "Individualized Treatment Planning",
      body: "There is no one-size-fits-all approach to marijuana addiction. Northbound creates individualized treatment plans that meet each client's physical, spiritual, and psychological needs — addressing both the cannabis dependency and the specific life circumstances driving it.",
    },
    {
      icon: "ri-user-line",
      title: "2:1 Staff-to-Client Ratio",
      body: "Every client receives deeply personal clinical attention. Our 2:1 staff ratio ensures that the individualized therapeutic work required for cannabis use disorder recovery is genuinely delivered — not diluted by group-only programming.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® for Young Adults",
      body: "Many marijuana-dependent clients are young adults whose educational trajectories have been disrupted. Collegebound® and Careerbound® — available exclusively during residential treatment at Garden Grove — help them pursue academic and career goals while in the residential program.",
    },
    {
      icon: "ri-group-line",
      title: "Family-Inclusive Recovery",
      body: "Northbound's Family Program helps loved ones understand cannabis use disorder, break enabling patterns, and develop the tools to support recovery effectively. Isolation is a key feature of marijuana dependency — rebuilding family connection is part of the treatment.",
    },
    {
      icon: "ri-award-line",
      title: "Insurance Access & Accreditation",
      body: "DHCS licensed (#300661CP) and NAATP member, Northbound is in-network with 15+ major plans. Our admissions team verifies your specific benefits at no cost — so financial concerns never prevent someone from starting treatment.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_marijuana_recovery01.jpg`,
  closingImageAlt: "Person running along a Southern California coast — the energy, clarity, and motivation of marijuana recovery",
  closingHeadline: "You Can Feel Good Without Marijuana. Let Us Show You How.",
  closingBody: [
    "The only way to break free from cannabis dependency is to stop using marijuana and relearn the life skills that lead to a happy, healthy, fulfilled life. At Northbound, we provide exactly the safe, nurturing, clinically sophisticated environment where that relearning happens.",
    "If you or someone you love is struggling with marijuana dependency, don't wait. Call Northbound today and take the first step toward long-term sobriety and a genuinely rewarding life.",
  ],
  closingQuote:
    "We help marijuana users realize the pleasure and value in their lives — and confront the urge to escape that fed their addiction.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Is marijuana actually addictive?",
      answer:
        "Yes — clinically and neurologically. About 30% of people who use marijuana develop some degree of dependency (cannabis use disorder). Daily users who try to stop experience real withdrawal symptoms: irritability, sleep problems, anxiety, decreased appetite, and cravings. The psychological hold marijuana develops — particularly as a coping mechanism for anxiety, depression, or social discomfort — can make it one of the hardest substances to quit.",
    },
    {
      question: "Why is marijuana so hard to quit even if it's 'just weed'?",
      answer:
        "Several factors make marijuana difficult to quit: neurological dependency (THC rewires the brain's reward system), a powerful subculture with its own beliefs and rituals, deep rationalization and denial patterns, co-occurring mental health conditions, and the fundamental function it serves as an escape from psychological discomfort. Northbound's clinical approach directly addresses all of these layers.",
    },
    {
      question: "Does Northbound treat marijuana addiction alongside mental health conditions?",
      answer:
        "Yes — and for marijuana specifically, treating co-occurring mental health conditions is almost always necessary. Depression, anxiety, and PTSD commonly co-occur with cannabis use disorder, and were often present before marijuana use began. Northbound's dual-diagnosis program treats both simultaneously through psychiatry, evidence-based therapy, and individualized medication management.",
    },
    {
      question: "What level of care does marijuana addiction require?",
      answer:
        "This depends on the severity of dependency, duration of use, and co-occurring mental health conditions. Some clients begin with residential treatment; others start at PHP or IOP. Northbound's clinical team conducts a thorough assessment to recommend the appropriate level of care and develops an individualized treatment plan from there.",
    },
    {
      question: "Will insurance cover marijuana addiction treatment?",
      answer:
        "In most cases, yes. Substance use disorders — including cannabis use disorder — are typically covered by major insurance plans under mental health parity laws. Northbound is in-network with 15+ plans including Aetna, Anthem, Cigna, and Tricare. Our admissions team verifies your specific benefits at no cost.",
    },
    {
      question: "Is Northbound able to help a young adult with marijuana addiction?",
      answer:
        "Northbound specializes in helping young adults. Collegebound® and Careerbound® — available exclusively during residential treatment — help young adults pursue education or career goals while in the residential program. One-third of our staff are alumni who understand the specific challenges young adults face in recovery.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Adderall Addiction", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
    { label: "Heroin", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
  ],

  substanceNameShort: "Marijuana",
};

export default function MarijuanaPage() {
  return <SubstancePageTemplate data={data} />;
}
