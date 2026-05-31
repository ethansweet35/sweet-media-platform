import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_heroin_hero01.jpg`,
  heroImageAlt: "Person at rock bottom with heroin addiction — the quiet moment before reaching for help",
  substanceName: "Heroin",
  heroHeadline: "Heroin Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Heroin is one of the most physically and psychologically destructive drugs available — and one of the most difficult to overcome without expert clinical support. At Northbound, we've helped clients break free from heroin dependency for over 38 years, with a full continuum of care from medically supervised detox through long-term recovery.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Heroin Addiction",
  whatItIsBody: [
    "Heroin is a highly addictive opioid derived from morphine that binds rapidly to opioid receptors in the brain, producing an intense euphoric rush followed by a prolonged state of sedation. Chemical dependence can develop almost immediately — the drug induces neurological changes that increase tolerance and push users toward escalating quantities.",
    "The behavioral consequences of heroin addiction are comprehensive and devastating. Heroin can replace hobbies, relationships, career, and in some cases even basic survival instincts. Criminal behavior, social isolation, infectious disease risk (through shared needles), and profound mental health deterioration are all common downstream effects.",
    "Heroin addiction is a 'family disease' — its effects extend far beyond the individual struggling with dependency. Northbound's treatment approach reflects this: we treat the whole person and involve the family system in recovery. Our goal is not just detox, but the tools and support system needed for a genuinely productive, drug-free life.",
  ],
  whatItIsImage: `${BASE}/nbt_heroin_therapy01.jpg`,
  whatItIsImageAlt: "Medical supervision during heroin detox at Northbound Treatment's one-eighty detox program",
  quickStats: [
    { value: "1M+", label: "Americans with a heroin use disorder" },
    { value: "38 yrs", label: "Of opioid addiction treatment experience at Northbound" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Heroin addiction takes hold rapidly and often in secret. These are the clinical warning signs that heroin dependency has developed and that immediate professional treatment is needed.",
  warningSigns: [
    "Constricted pupils, droopy eyelids, slurred speech, or 'nodding out'",
    "Track marks or bruising at injection sites; wearing long sleeves in warm weather",
    "Sudden changes in behavior: withdrawal from family, friends, and previously enjoyed activities",
    "Extreme drowsiness or alternating wakefulness and sleepiness ('on the nod')",
    "Unexplained financial problems; missing money, valuables, or prescriptions",
    "Paraphernalia: needles, spoons, tin foil, small plastic bags",
    "Significant weight loss, poor nutrition, and declining personal hygiene",
    "Intense anxiety, irritability, or physical illness when heroin is not available (withdrawal)",
    "Risky behavior: sharing needles, unprotected sex, criminal activity to fund use",
    "Inability to stop using despite desperate desire to quit",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Heroin Recovery Looks Like at Northbound",
  recoveryIntro:
    "Heroin addiction requires medically sophisticated treatment — from the critical detoxification phase through the months of clinical work needed to rebuild a life free from opioids. Northbound provides the complete clinical continuum.",
  careSteps: [
    {
      phase: "Days 1–10",
      title: "Medical Detox & Withdrawal Management",
      icon: "ri-heart-pulse-line",
      body: "Heroin detox involves intense physical withdrawal symptoms — severe muscle pain, nausea, vomiting, insomnia, and profound psychological distress. Northbound's one-eighty detox program provides 24/7 medical supervision with medication-assisted treatment (MAT), using methadone, suboxone, or other evidence-based medications to manage withdrawal safely and minimize suffering.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following successful detox, clients enter residential treatment — immersive 24/7 clinical care in Northbound's Orange County facilities. Individual and group therapy, family counseling, EMDR, CBT, DBT, psychiatric care, and trauma-informed modalities address both the opioid dependency and the underlying psychological trauma that most often drives it.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of structured clinical programming as clients transition toward greater independence. Continued therapy, medication management, and skill-building prepare clients for the realities of sober daily life while maintaining a clinical safety net.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows clients to reintegrate into work, family, or school life while maintaining 10–12 hours of weekly therapeutic support. Clients practice navigating real-world triggers — with Northbound's clinical team alongside them — building the genuine self-efficacy that underpins lasting sobriety.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni",
      icon: "ri-refresh-line",
      body: "Long-term recovery from heroin requires long-term support. Northbound's aftercare and alumni program provides lifelong community, accountability, and resources as clients transition back to independent life.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-heart-pulse-line",
      title: "38+ Years of Opioid Expertise",
      body: "Northbound has been treating heroin addiction since 1988 — combining 12-step principles, evidence-based therapies, and MAT protocols developed over decades of clinical experience. Our team has seen and treated heroin addiction at every stage and severity.",
    },
    {
      icon: "ri-brain-line",
      title: "Medication-Assisted Treatment (MAT)",
      body: "Northbound uses evidence-based medications — methadone, suboxone, naltrexone, and others — to safely manage heroin withdrawal and reduce cravings during early recovery. MAT is always part of a comprehensive treatment plan, not a standalone intervention.",
    },
    {
      icon: "ri-user-line",
      title: "2:1 Staff-to-Client Ratio",
      body: "Heroin recovery is intensive work. Northbound's 2:1 staff-to-client ratio ensures every client receives the individualized clinical attention their recovery demands — particularly critical in the dangerous early weeks of opioid detox.",
    },
    {
      icon: "ri-group-line",
      title: "Family Counseling Program",
      body: "Northbound recognizes that heroin addiction is a family disease. Our Family Program helps loved ones understand what the person in recovery is going through, heal relational damage, and develop the tools to provide healthy, non-enabling support throughout recovery.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Trauma-Informed Clinical Care",
      body: "Trauma is at the root of most heroin addiction. Northbound's trauma-informed approach — including EMDR, trauma-focused CBT, and individual therapy — treats the underlying wound that drives opioid use, not just the dependency itself.",
    },
    {
      icon: "ri-award-line",
      title: "Insurance-Accepted, Fully Accredited",
      body: "DHCS licensed (#300661CP) and NAATP member, Northbound is in-network with 15+ major insurance plans. Our team verifies your benefits at no cost before you commit to anything — including Aetna, Anthem, Cigna, Tricare, and more.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_heroin_recovery01.jpg`,
  closingImageAlt: "Client journaling in the garden of Northbound Treatment — peaceful, grounded, rebuilding life after heroin",
  closingHeadline: "Recovery From Heroin Is Possible. We've Seen It Thousands of Times.",
  closingBody: [
    "Heroin can take everything — health, relationships, career, identity. But it does not have to be the end of the story. Northbound's clinical team has helped thousands of people navigate the most difficult withdrawal, the most broken relationships, and the most shattered lives — and rebuild something better.",
    "If you or someone you love is fighting heroin addiction, don't wait. Call Northbound any time. Our Orange County admissions team will help you take the first step toward a new, healthy, drug-free life.",
  ],
  closingQuote:
    "Lasting recovery can only begin after a heroin addict successfully completes detox. We give people the foundation for exactly that.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "How dangerous is heroin withdrawal?",
      answer:
        "Heroin withdrawal is extremely uncomfortable and can be medically complex — though it is rarely life-threatening in healthy adults. Symptoms include severe muscle cramping, nausea, vomiting, extreme anxiety, insomnia, and powerful cravings. For individuals with cardiac or other medical conditions, withdrawal poses greater risk. Northbound's medically supervised detox ensures all clients are monitored around the clock and receive appropriate medication-assisted support.",
    },
    {
      question: "What medications are used during heroin detox?",
      answer:
        "Northbound uses evidence-based MAT protocols for heroin withdrawal, which may include methadone (to manage withdrawal and cravings), suboxone/buprenorphine (a partial opioid agonist that reduces withdrawal intensity), and naltrexone (to block opioid effects post-detox). The specific protocol is determined by the client's medical history, severity of use, and individualized treatment plan.",
    },
    {
      question: "How long does heroin treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day programs. Given the severity of opioid dependency and the risk of relapse, research supports 90 days or more as the standard for achieving durable recovery. Many clients also continue through PHP, virtual IOP, and alumni support beyond their initial residential stay.",
    },
    {
      question: "Can I receive treatment for heroin and another mental health condition?",
      answer:
        "Yes — and it is important to treat both. Heroin use disorder co-occurs with depression, PTSD, anxiety disorders, and other mental health conditions at very high rates. Northbound's dual-diagnosis program provides integrated treatment for both the addiction and the co-occurring condition, with psychiatrists and licensed therapists on staff.",
    },
    {
      question: "Will insurance cover heroin detox and rehabilitation?",
      answer:
        "In most cases, yes — particularly since the Mental Health Parity and Addiction Equity Act requires most insurance plans to cover substance use disorder treatment comparably to medical care. Northbound is in-network with 15+ major plans. Our team verifies your specific benefits at no cost before you commit to anything.",
    },
    {
      question: "What happens after I complete residential treatment for heroin?",
      answer:
        "After residential treatment, Northbound clients typically step down through PHP and virtual IOP as clinically appropriate — maintaining robust clinical support while gradually reintegrating into real-world life. The alumni program then provides lifelong community and accountability. Our goal is for every client to achieve and maintain one year of continuous sobriety.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
    { label: "Marijuana", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
    { label: "Adderall", href: "/treatment/adderall/", icon: "ri-capsule-line" },
  ],

  substanceNameShort: "Heroin",
};

export default function HeroinPage() {
  return <SubstancePageTemplate data={data} />;
}
