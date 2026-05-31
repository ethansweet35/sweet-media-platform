import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_hydrocodone_hero01.jpg`,
  heroImageAlt: "Person journaling during early recovery from hydrocodone addiction at Northbound Treatment",
  substanceName: "Hydrocodone",
  heroHeadline: "Hydrocodone Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Hydrocodone — sold as Vicodin, Norco, and Lortab — is the most prescribed opioid painkiller in the United States. Its widespread availability has made it one of the most common starting points for opioid addiction. Northbound provides medically supervised hydrocodone detox and comprehensive treatment to help people reclaim their lives.",

  whatItIsHeadline: "What Is Hydrocodone Addiction?",
  whatItIsBody: [
    "Hydrocodone is a semi-synthetic opioid typically prescribed for moderate-to-severe pain relief, often combined with acetaminophen (Tylenol) in medications like Vicodin and Norco. As one of the most prescribed drugs in the country, hydrocodone is also one of the most commonly misused — with nearly 5 million Americans using it non-medically in any given year.",
    "Physical dependence can develop within weeks of regular use, as the brain adapts to the presence of opioids and begins producing less of its natural pain-relieving and pleasure chemicals. When hydrocodone is reduced or stopped, withdrawal — muscle aching, insomnia, sweating, anxiety, gastrointestinal distress, and intense cravings — makes stopping extremely difficult without clinical support.",
    "Many people who develop hydrocodone addiction were first prescribed it following surgery, injury, or dental procedures. Over time, the dose required to manage pain increases as tolerance builds, and what began as legitimate pain treatment escalates into dependency. Northbound treats both the addiction and the underlying pain experience without shame or judgment.",
  ],
  whatItIsImage: `${BASE}/nbt_fentanyl_therapy01.jpg`,
  whatItIsImageAlt: "Supportive clinical therapy session for hydrocodone addiction recovery at Northbound Treatment",
  quickStats: [
    { value: "5M+", label: "Americans misuse hydrocodone each year" },
    { value: "#1", label: "Most prescribed opioid painkiller in the U.S." },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Because hydrocodone is a widely prescribed medication, dependency often develops gradually and is easy to rationalize. These are the clinical warning signs that use has become problematic.",
  warningSigns: [
    "Using hydrocodone more often or at higher doses than prescribed",
    "Experiencing withdrawal symptoms when medication is delayed or unavailable",
    "Seeking hydrocodone from multiple doctors or obtaining it without a prescription",
    "Using medication primarily to feel 'normal' rather than to manage pain",
    "Continuing to use despite negative consequences at work, in relationships, or health",
    "Craving hydrocodone and experiencing preoccupation with the next dose",
    "Running out of prescription before the refill date",
    "Taking hydrocodone for reasons other than pain — anxiety, sleep, mood",
    "Isolating from family or hiding the level of use",
    "Considering switching to heroin when hydrocodone becomes unavailable or too expensive",
  ],

  recoveryHeadline: "What Hydrocodone Recovery Looks Like at Northbound",
  recoveryIntro:
    "Hydrocodone addiction responds well to comprehensive, medically supervised treatment. Northbound's opioid program provides safe detox, evidence-based therapy, and the full continuum of care needed for lasting recovery.",
  careSteps: [
    {
      phase: "Days 1–7",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Hydrocodone withdrawal typically begins within 6–12 hours of the last dose and peaks around 48–72 hours. Northbound's one-eighty detox program provides 24/7 physician oversight, medications to manage withdrawal symptoms, and clinical monitoring throughout. No client detoxes alone.",
    },
    {
      phase: "Weeks 1–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following medical stabilization, residential treatment addresses the psychological, emotional, and relational factors driving hydrocodone use. Individual therapy, group counseling, family sessions, and evidence-based modalities — CBT, DBT, EMDR — alongside dual-diagnosis treatment for co-occurring anxiety, depression, or chronic pain.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of intensive programming as clients build independence. Pain management alternatives, relapse prevention, and emotional regulation are the focus alongside continuing individual and group therapy.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows reintegration into work, family, and daily life while maintaining 10–12 hours of weekly therapeutic support. Northbound's InVivo® model builds real-world recovery skills in real contexts.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Community",
      icon: "ri-refresh-line",
      body: "Long-term recovery from opioid addiction requires ongoing community and structure. Northbound's alumni network and continued case management provide the support needed to rebuild what addiction threatened.",
    },
  ],

  differentiators: [
    {
      icon: "ri-shield-check-line",
      title: "Safe, Supervised Opioid Detox",
      body: "Northbound's one-eighty detox program manages hydrocodone withdrawal with 24/7 physician oversight and evidence-based medications — the safest foundation for recovery from prescription opioid dependency.",
    },
    {
      icon: "ri-capsule-line",
      title: "Medication-Assisted Treatment",
      body: "When clinically appropriate, Northbound integrates buprenorphine (Suboxone) or naltrexone (Vivitrol) to reduce cravings and relapse risk during the critical early period of recovery.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Chronic Pain Integration",
      body: "Many hydrocodone-dependent clients have real chronic pain. Northbound's clinical team develops non-opioid pain management strategies alongside addiction treatment — addressing both without compromise.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Treatment",
      body: "Anxiety, depression, and trauma are extremely common in opioid-dependent individuals. Northbound treats the full clinical picture simultaneously, not sequentially.",
    },
    {
      icon: "ri-group-line",
      title: "Family Therapy Program",
      body: "Hydrocodone addiction affects everyone who loves you. Northbound's family program rebuilds the communication and trust that addiction damages — a critical component of sustained recovery.",
    },
    {
      icon: "ri-award-line",
      title: "38+ Years of Clinical Excellence",
      body: "Northbound has been treating prescription opioid addiction since before it became a national crisis. Our depth of experience, USC-verified outcomes, and DHCS licensing reflect nearly four decades of refinement.",
    },
  ],

  closingImage: `${BASE}/nbt_hydrocodone_hero01.jpg`,
  closingImageAlt: "Person in early recovery from hydrocodone addiction journaling their progress at Northbound",
  closingHeadline: "Hydrocodone Addiction Has a Way Out — This Is It",
  closingBody: [
    "If a prescription brought you here, you're not alone — and you're not to blame. Hydrocodone addiction is a medical disease, not a character flaw, and it responds to medical treatment.",
    "Northbound's admissions team is available 24 hours a day, 7 days a week, with no cost and no obligation. The call is confidential. Let us verify your insurance and answer your questions — then we can take it one step at a time.",
  ],
  closingQuote: "You don't have to figure out what comes next alone. That's exactly what we're here for.",

  faqs: [
    {
      question: "Is hydrocodone withdrawal dangerous?",
      answer:
        "Hydrocodone withdrawal is rarely life-threatening in otherwise healthy individuals, but it is intensely uncomfortable and associated with powerful cravings that make relapse — and overdose — extremely likely without support. Tolerance drops rapidly during withdrawal, meaning a relapse dose at the previous level can be fatal. Medical supervision is strongly recommended.",
    },
    {
      question: "What is the difference between Vicodin and hydrocodone?",
      answer:
        "Vicodin, Norco, and Lortab are brand names for combination products that contain hydrocodone plus acetaminophen (Tylenol). The opioid component — hydrocodone — is what drives addiction. High-dose acetaminophen in these formulations also poses significant liver risk with prolonged heavy use.",
    },
    {
      question: "Can Northbound treat chronic pain alongside hydrocodone addiction?",
      answer:
        "Yes. Many clients have real, legitimate pain that was initially managed with hydrocodone. Northbound's integrated team develops non-opioid pain management strategies — including physical therapy coordination, non-opioid medications, and CBT-based pain coping — alongside addiction treatment.",
    },
    {
      question: "Does Northbound use Suboxone for hydrocodone addiction?",
      answer:
        "When clinically appropriate, yes. Buprenorphine (Suboxone) is an FDA-approved medication for opioid use disorder that reduces cravings and withdrawal symptoms without producing the same euphoric effect as hydrocodone. Our physicians evaluate each client individually to determine whether MAT is the right approach.",
    },
    {
      question: "How long does hydrocodone treatment take?",
      answer:
        "Clinical guidelines recommend a minimum of 90 days for opioid use disorder treatment, with significantly better outcomes associated with longer periods of care. Most Northbound clients engage in 3–6 months of structured treatment across detox, residential, PHP, and IOP phases.",
    },
    {
      question: "Will insurance pay for hydrocodone treatment?",
      answer:
        "Most major insurance plans cover opioid addiction treatment. Northbound works with Aetna, Anthem, Cigna, Tricare, and other major insurers. Call (866) 311-0003 for a free, confidential benefits check before you make any decisions.",
    },
  ],

  substanceNameShort: "Hydrocodone",
  relatedSubstances: [
    { label: "OxyContin", href: "/treatment/oxycontin/", icon: "ri-capsule-line" },
    { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-heart-pulse-line" },
    { label: "Fentanyl", href: "/treatment/fentanyl/", icon: "ri-alert-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-medicine-bottle-line" },
    { label: "Suboxone", href: "/treatment/suboxone/", icon: "ri-shield-line" },
    { label: "Heroin", href: "/treatment/heroin/", icon: "ri-flask-line" },
  ],
};

export default function HydrocodonePage() {
  return <SubstancePageTemplate data={data} />;
}
