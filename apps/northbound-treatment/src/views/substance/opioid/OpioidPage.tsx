import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_opioid_hero01.jpg`,
  heroImageAlt: "First responder at an opioid overdose scene — the life-or-death urgency of the opioid and fentanyl epidemic",
  substanceName: "Opioids",
  heroHeadline: "Opioid Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Opioids — from prescription painkillers to heroin to fentanyl — are at the center of the most deadly drug crisis in American history. In Orange County alone, 576 people died from opioid-related causes in 2023. At Northbound, we've been treating opioid addiction for over 38 years — and we know exactly what it takes to achieve lasting recovery.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Opioid Use Disorder",
  whatItIsBody: [
    "Opioids are a class of natural (morphine, codeine, opium), semi-synthetic (heroin, oxycodone, hydrocodone), and synthetic (fentanyl) drugs that relieve pain by binding to opioid receptors in the brain and nervous system. At higher doses, they produce intense feelings of euphoria — the neurological basis of their addictive potential. Fentanyl, now the dominant opioid in the illicit drug supply, is 50–100 times more potent than morphine, making even trace amounts potentially fatal.",
    "Opioid use disorder (OUD) develops through a predictable neurological process: tolerance builds (requiring higher doses for the same effect), physical dependence follows (the body requires opioids to function normally), and compulsive use persists despite serious consequences. The DSM-5 defines OUD as two or more diagnostic criteria met within a 12-month period — and the criteria cover behavioral, physical, and psychological dimensions of the dependency.",
    "The fentanyl crisis has transformed the risk calculus of opioid addiction: illicitly manufactured fentanyl is now cut into nearly every street drug (cocaine, meth, counterfeit pills, heroin), meaning that users may unknowingly be exposed even without intentionally seeking opioids. This makes professional treatment more urgent than ever — every use carries overdose risk.",
  ],
  whatItIsImage: `${BASE}/nbt_opioid_therapy01.jpg`,
  whatItIsImageAlt: "Doctor reviewing a personalized opioid treatment plan with a patient at Northbound Treatment Services",
  quickStats: [
    { value: "576", label: "Opioid-related deaths in Orange County in 2023 alone" },
    { value: "50–100×", label: "More potent than morphine — the danger of fentanyl" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "The DSM-5 defines opioid use disorder as two or more of the following criteria within a 12-month period. These are not character flaws — they are clinical symptoms of a recognized brain disease.",
  warningSigns: [
    "Taking opioids in larger amounts or over a longer period than intended",
    "Persistent desire or repeated unsuccessful efforts to cut down or stop",
    "Spending significant time obtaining, using, or recovering from opioids",
    "Strong cravings or urges to use opioids that are difficult to resist",
    "Failing to meet obligations at work, school, or home due to opioid use",
    "Continued use despite social or interpersonal problems caused by opioids",
    "Giving up important activities (work, relationships, hobbies) because of opioid use",
    "Using opioids in physically dangerous situations (driving, operating equipment)",
    "Tolerance — needing more opioids to achieve the same effect",
    "Withdrawal symptoms when stopping, or using opioids to prevent withdrawal",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Opioid Recovery Looks Like at Northbound",
  recoveryIntro:
    "Opioid addiction treatment requires medical precision from day one. Northbound's full continuum of care — from medically supervised detox through long-term alumni support — is built around the clinical realities of opioid use disorder.",
  careSteps: [
    {
      phase: "Days 1–10",
      title: "Medical Withdrawal Management",
      icon: "ri-heart-pulse-line",
      body: "Opioid withdrawal symptoms begin within 8–24 hours of the last dose, peak in 1–3 days, and generally resolve in 7–10 days for short-acting opioids (longer for methadone or extended-release formulations). Northbound's withdrawal management center provides 24/7 medical supervision with medication-assisted treatment (MAT) — methadone, buprenorphine, and supportive medications — to ensure a safe, monitored, and as-comfortable-as-possible detox.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following stabilization, residential treatment provides the immersive 24/7 clinical environment where the deep work of opioid recovery happens. Individual therapy, group counseling, family therapy, CBT, DBT, EMDR, psychiatric care, and trauma-informed modalities — all delivered in Northbound's Orange County facilities — address the addiction and its underlying neurological and psychological drivers.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of structured clinical programming as clients transition toward independence. Continued therapy, medication management, and skills-building prepare clients for reintegration into daily life while maintaining the robust clinical safety net that opioid recovery requires.",
    },
    {
      phase: "Month 3–6",
      title: "Intensive Outpatient Program (IOP)",
      icon: "ri-calendar-check-line",
      body: "IOP allows clients to re-engage with work, family, and school while maintaining 10–12 hours of weekly therapeutic support. Northbound walks alongside clients as they practice navigating real-world triggers — building the genuine self-efficacy that underpins durable opioid recovery.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare, Sober Living & Alumni",
      icon: "ri-refresh-line",
      body: "Northbound's alumni program provides the lifelong community, accountability, and support events that sustain long-term opioid recovery. Sober living provides additional structured transitional housing. Careerbound® and Collegebound® programs help clients rebuild the trajectories — professional and educational — that opioid addiction disrupted.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-heart-pulse-line",
      title: "38+ Years of Opioid Treatment Expertise",
      body: "Northbound has been treating opioid addiction since 1988 — through every phase of the prescription opioid epidemic and the fentanyl crisis that followed. Our team brings 200+ combined years of behavioral healthcare expertise, with a specific and deep track record in opioid use disorder.",
    },
    {
      icon: "ri-brain-line",
      title: "Evidence-Based MAT Protocols",
      body: "Northbound uses evidence-based MAT protocols — methadone, buprenorphine, naltrexone, and supportive medications — to safely manage opioid withdrawal and reduce cravings during early recovery. MAT is always part of a comprehensive, individualized treatment plan.",
    },
    {
      icon: "ri-user-line",
      title: "1:1 Staff-to-Client Ratio",
      body: "Every client receives deeply individualized clinical attention. Our 1:1 staff-to-client ratio means treatment plans can be adjusted in real time — particularly critical during the medically complex early stages of opioid detox and early recovery.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Dual-Diagnosis Integrated Care",
      body: "Depression, anxiety, PTSD, and chronic pain co-occur with opioid use disorder at very high rates. Northbound's integrated dual-diagnosis program treats both conditions simultaneously — with psychiatrists and licensed therapists working together to ensure neither condition undermines the other's treatment.",
    },
    {
      icon: "ri-family-line",
      title: "Family Therapy & Recovery Support",
      body: "Opioid addiction devastates families. Northbound's Family Program helps loved ones understand OUD, heal relational damage, and develop the tools to support recovery without enabling. We treat the family system alongside the individual.",
    },
    {
      icon: "ri-award-line",
      title: "Multiple SoCal Locations + Insurance",
      body: "With locations in Garden Grove and Newport Beach, Northbound offers beautiful Southern California settings for healing — with access to beaches and nature as part of the experiential recovery approach. DHCS licensed and in-network with 15+ major insurance plans.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_opioid_recovery01.jpg`,
  closingImageAlt: "Mother and son embracing in tears of joy at a recovery milestone — family restoration after opioid addiction",
  closingHeadline: "Every Person Deserves a Second Chance. We're Here to Help You Take It.",
  closingBody: [
    "The opioid crisis is taking lives every day. But for every statistic, there are thousands of people who found the right help at the right moment — and rebuilt lives they're proud of. Northbound has been that help for thousands of families over 38 years.",
    "Offering a team of top doctors, therapists, psychologists, and addiction counselors, we ensure every client receives the best possible treatment from the moment they walk through our doors. Contact us today and verify your insurance — your recovery can begin now.",
  ],
  closingQuote:
    "Everyone deserves a second chance to realize their greatest potential. At Northbound, quality and personal attention are our founding principles.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "What are opioids, and why are they so addictive?",
      answer:
        "Opioids are a class of drugs — including prescription painkillers (oxycodone, hydrocodone, morphine), heroin, and synthetic opioids like fentanyl — that bind to opioid receptors in the brain and produce powerful pain relief and euphoria. They are highly addictive because they rapidly alter brain chemistry, building tolerance (needing more for the same effect) and physical dependence (experiencing withdrawal without them). Fentanyl is 50–100x more potent than morphine, making even small doses potentially fatal.",
    },
    {
      question: "How dangerous is opioid withdrawal?",
      answer:
        "Opioid withdrawal itself is rarely life-threatening in healthy adults, but it produces severe physical symptoms — intense muscle aches, nausea, vomiting, insomnia, anxiety, chills, and powerful cravings — that are very difficult to manage without medical support. For individuals with cardiac conditions or other health complications, withdrawal poses greater risk. Northbound's medically supervised detox ensures every client is monitored around the clock and receives appropriate MAT support.",
    },
    {
      question: "What is MAT (Medication-Assisted Treatment), and does Northbound use it?",
      answer:
        "MAT uses FDA-approved medications — primarily methadone, buprenorphine (Suboxone), and naltrexone — combined with therapy to treat opioid use disorder, manage withdrawal, and reduce cravings. Northbound uses evidence-based MAT protocols as part of individualized treatment plans. MAT is not 'replacing one drug with another' — it is a clinical approach with decades of research support for improving treatment outcomes.",
    },
    {
      question: "How long does opioid addiction treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day programs. Research consistently supports 90 days or more as the standard for durable opioid recovery. The appropriate duration depends on the specific opioid (fentanyl and methadone produce longer withdrawal timelines), severity of dependency, and co-occurring conditions — all assessed in your initial evaluation.",
    },
    {
      question: "Can I receive treatment if I've relapsed before?",
      answer:
        "Absolutely — and it is common. Relapse is a recognized feature of opioid use disorder for many people, not a sign of failure. Northbound's clinical team is experienced in treating clients with multiple treatment episodes. We identify what wasn't working before and develop a more targeted, effective plan — informed by your full history.",
    },
    {
      question: "Will my insurance cover opioid addiction treatment?",
      answer:
        "In most cases, yes. Northbound is in-network with 15+ major plans including Aetna, Anthem/Blue Cross Blue Shield, Cigna, and Tricare. Our admissions team handles verification quickly and confidentially — at no cost to you — before you commit to anything. Call now to check your coverage.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Suboxone Addiction", href: "/treatment/suboxone/", icon: "ri-capsule-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
  ],

  substanceNameShort: "Opioids",
};

export default function OpioidPage() {
  return <SubstancePageTemplate data={data} />;
}
