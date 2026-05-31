import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_oxycontin_hero01.jpg`,
  heroImageAlt: "Doctor and patient building trust in recovery from OxyContin addiction at Northbound Treatment",
  substanceName: "OxyContin",
  heroHeadline: "OxyContin Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "OxyContin — extended-release oxycodone — became the engine of the opioid epidemic. Millions developed addiction through legitimate prescriptions. At Northbound, we provide comprehensive, medically supervised treatment for oxycodone dependency that addresses both the physical grip and the emotional drivers of addiction.",

  whatItIsHeadline: "What Is OxyContin Addiction?",
  whatItIsBody: [
    "OxyContin (oxycodone extended-release) was introduced in 1996 as a supposedly safer, longer-lasting painkiller. Its rapid adoption — and massive overprescribing — fueled the opioid crisis that now kills more than 80,000 Americans annually. OxyContin works by binding to opioid receptors in the brain and body, suppressing pain while producing feelings of euphoria and deep physical relaxation.",
    "Physical dependence develops quickly — sometimes within 2–4 weeks of regular use. The brain adapts to the presence of oxycodone, downregulating its natural opioid system. When the drug is stopped or reduced, withdrawal kicks in: severe muscle cramping, sweating, insomnia, anxiety, nausea, and crushing cravings. This cycle — use to avoid withdrawal — is the biological foundation of OxyContin addiction.",
    "One of the most tragic patterns in OxyContin addiction is the transition to heroin. When OxyContin becomes too expensive or inaccessible, many individuals switch to heroin as a cheaper opioid substitute. Effective OxyContin treatment interrupts this trajectory — and Northbound has the evidence-based protocols to do it.",
  ],
  whatItIsImage: `${BASE}/nbt_benzo_therapy01.jpg`,
  whatItIsImageAlt: "Physician-led treatment planning for OxyContin addiction recovery at Northbound",
  quickStats: [
    { value: "80,000+", label: "Opioid overdose deaths annually in the U.S." },
    { value: "2–4 wks", label: "Time until OxyContin physical dependence can form" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "OxyContin addiction frequently begins with a legitimate prescription. These are the clinical warning signs that use has escalated beyond therapeutic need.",
  warningSigns: [
    "Taking OxyContin more frequently or at higher doses than prescribed",
    "Running out of medication early each month",
    "Experiencing withdrawal symptoms between doses — sweating, cramping, restlessness",
    "Seeking OxyContin from multiple doctors or obtaining it illegally",
    "Using OxyContin primarily to feel 'normal' rather than to manage pain",
    "Continuing use despite clear harm to health, relationships, or finances",
    "Isolating from family and friends around drug use",
    "Failed attempts to stop or reduce use on your own",
    "Crushing, chewing, or injecting OxyContin to intensify the effect",
    "Considering or using heroin as a substitute when OxyContin is unavailable",
  ],

  recoveryHeadline: "What OxyContin Recovery Looks Like at Northbound",
  recoveryIntro:
    "OxyContin addiction requires a medically supervised approach from day one. Northbound's opioid-specialized program provides the full continuum — from safe medical detox through residential care, PHP, virtual IOP, and long-term aftercare.",
  careSteps: [
    {
      phase: "Days 1–7",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "OxyContin withdrawal begins 8–12 hours after the last dose and peaks at 36–72 hours. Northbound's one-eighty detox program manages withdrawal with 24/7 physician oversight and medications — including buprenorphine where clinically indicated — to make the process as safe and comfortable as possible.",
    },
    {
      phase: "Weeks 1–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Residential treatment addresses the full complexity of OxyContin addiction — the psychological drivers, co-occurring pain conditions, trauma history, and mental health factors that fuel opioid use. Individual therapy, group counseling, family sessions, and evidence-based modalities are delivered in a structured, 24/7 supported environment.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP bridges inpatient intensity and independent living with 5 days per week of structured programming. Relapse prevention, pain management alternatives, and life skills form the core alongside ongoing individual and group therapy.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows clients to reintegrate into daily life while maintaining 10–12 hours of clinical support per week. The InVivo® model builds real-world recovery skills in real-world contexts, dramatically reducing relapse risk.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Support",
      icon: "ri-refresh-line",
      body: "OxyContin cravings and post-acute withdrawal symptoms can persist long after detox. Northbound's aftercare program includes ongoing psychiatric care, community accountability, and alumni support for rebuilding life after addiction.",
    },
  ],

  differentiators: [
    {
      icon: "ri-shield-check-line",
      title: "Medically Supervised Opioid Detox",
      body: "Safe OxyContin detox requires 24/7 medical oversight and evidence-based withdrawal protocols. Northbound's one-eighty detox program has managed hundreds of opioid detox cases with an impeccable safety record.",
    },
    {
      icon: "ri-capsule-line",
      title: "Medication-Assisted Treatment",
      body: "Buprenorphine (Suboxone) and naltrexone (Vivitrol) are proven to reduce OxyContin cravings and relapse risk when integrated into comprehensive treatment. Northbound's physicians evaluate each client individually for MAT appropriateness.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Chronic Pain Management",
      body: "Many OxyContin-dependent clients have genuine chronic pain. Northbound's integrated team develops non-opioid pain management strategies alongside addiction treatment — addressing both conditions without compromising recovery.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Expertise",
      body: "Depression, anxiety, PTSD, and trauma are extremely common in OxyContin-dependent individuals. Northbound's psychiatrists and therapists treat the full clinical picture simultaneously.",
    },
    {
      icon: "ri-group-line",
      title: "Family Therapy & Support",
      body: "OxyContin addiction devastates families. Northbound's family program rebuilds communication, trust, and healthy boundaries — a critical factor in sustained long-term recovery.",
    },
    {
      icon: "ri-award-line",
      title: "USC-Verified Outcomes",
      body: "An independent USC study verified a greater than 97% drug abstinence rate among Northbound clients — direct evidence of the effectiveness of our clinical model.",
    },
  ],

  closingImage: `${BASE}/nbt_oxycontin_hero01.jpg`,
  closingImageAlt: "Beginning recovery from OxyContin addiction with clinical support at Northbound Treatment",
  closingHeadline: "OxyContin Gave You Something — and Then Took Everything",
  closingBody: [
    "You didn't plan for this. OxyContin addiction rarely starts as a choice — it starts as relief from pain, and then becomes a trap. But the trap has a door, and Northbound knows how to open it.",
    "Our admissions team is available 24 hours a day, 7 days a week. The call is confidential, costs nothing, and comes with no obligation. We'll verify your insurance, answer your questions, and help you take the first step today.",
  ],
  closingQuote: "Recovery from OxyContin is not just possible — it's happening for people every single day. Let today be your day.",

  faqs: [
    {
      question: "Is OxyContin withdrawal dangerous?",
      answer:
        "OxyContin withdrawal is rarely life-threatening in otherwise healthy individuals, but it is intensely uncomfortable and associated with overwhelming cravings. The greater danger is relapse — tolerance drops rapidly during withdrawal, and a return to a previous dose can cause fatal overdose. Medical supervision dramatically reduces this risk.",
    },
    {
      question: "I started taking OxyContin for pain. Does that make my addiction different?",
      answer:
        "Not clinically. Regardless of how OxyContin use began, the brain chemistry of addiction is the same. Many Northbound clients developed dependency through legitimate medical treatment. There is no judgment here — only evidence-based care.",
    },
    {
      question: "Can Northbound treat chronic pain alongside OxyContin addiction?",
      answer:
        "Yes. Northbound's integrated clinical team — including physicians and pain management specialists — develops non-opioid treatment strategies for chronic pain alongside addiction recovery. You don't have to choose between managing pain and getting sober.",
    },
    {
      question: "What is the relationship between OxyContin and heroin?",
      answer:
        "Many OxyContin-addicted individuals eventually transition to heroin as a cheaper, more accessible alternative when OxyContin becomes difficult to obtain. Northbound's treatment addresses this risk directly — stabilizing opioid dependency and building the skills and support needed to prevent this trajectory.",
    },
    {
      question: "Does Northbound use medication-assisted treatment for OxyContin?",
      answer:
        "Yes, where clinically appropriate. Buprenorphine (Suboxone) and naltrexone (Vivitrol) are both evidence-based options for opioid use disorder. Northbound's physicians evaluate each client individually to determine whether MAT is right for their recovery plan.",
    },
    {
      question: "Will my insurance cover OxyContin addiction treatment?",
      answer:
        "Most major insurance plans cover opioid use disorder treatment. Northbound is in-network with Aetna, Anthem, Cigna, Tricare, and others. Call (866) 311-0003 for a free, confidential insurance check before you commit to anything.",
    },
  ],

  substanceNameShort: "OxyContin",
  relatedSubstances: [
    { label: "Heroin", href: "/treatment/heroin/", icon: "ri-capsule-line" },
    { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-heart-pulse-line" },
    { label: "Fentanyl", href: "/treatment/fentanyl/", icon: "ri-alert-line" },
    { label: "Hydrocodone", href: "/treatment/hydrocodone-addiction/", icon: "ri-medicine-bottle-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-flask-line" },
    { label: "Suboxone", href: "/treatment/suboxone/", icon: "ri-shield-line" },
  ],
};

export default function OxycontinPage() {
  return <SubstancePageTemplate data={data} />;
}
