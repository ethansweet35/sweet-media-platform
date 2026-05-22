import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_suboxone_hero01.jpg`,
  heroImageAlt: "Person in a clinical waiting room — the weight of Suboxone dependency and the resolve to finally get help",
  substanceName: "Suboxone",
  heroHeadline: "Suboxone Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Suboxone is prescribed to help people recover from opioids — but it carries its own real potential for dependency and abuse. At Northbound, we help people get off Suboxone safely and completely, without trading one dependency for another.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Suboxone Dependency",
  whatItIsBody: [
    "Suboxone (buprenorphine/naloxone) is a synthetic opioid most commonly used in medication-assisted treatment (MAT) to help people manage withdrawal from heroin and prescription opioids. While it is a valuable clinical tool when properly supervised, Suboxone is still an opioid — and like all opiates, continued use can result in physical dependency, even when taken under a doctor's direction.",
    "Because Suboxone is typically administered on an outpatient basis with limited oversight, it is vulnerable to a number of misuse patterns: taking higher doses than prescribed, obtaining multiple prescriptions from different doctors ('doctor shopping'), and using it recreationally for its opioid effects. Those who develop a dependency on Suboxone often experience the same compulsive behaviors associated with other opiate dependencies — secrecy, social withdrawal, preoccupation with obtaining more.",
    "The most dangerous risk of Suboxone abuse is overdose — particularly when combined with alcohol, benzodiazepines, or other CNS depressants. Opiates depress the central nervous system, slowing breathing and impairing brain and motor function. Respiratory failure is a direct overdose risk. Long-term Suboxone abuse can also damage the liver and kidneys, compounding the physiological harm over time.",
  ],
  whatItIsImage: `${BASE}/nbt_suboxone_therapy01.jpg`,
  whatItIsImageAlt: "Patient in a deep therapy session — addressing the root causes of Suboxone dependency at Northbound Treatment",
  quickStats: [
    { value: "16M+", label: "Suboxone prescriptions written annually in the US" },
    { value: "30–90", label: "Day programs available at Northbound for Suboxone recovery" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Suboxone dependency often develops quietly — justified as 'medication' rather than addiction. These are the clinical warning signs that use has crossed into dependency requiring treatment.",
  warningSigns: [
    "Taking Suboxone in higher doses or more frequently than prescribed",
    "Obtaining Suboxone from multiple doctors or without a valid prescription",
    "Powerful physical craving for Suboxone that is difficult to resist",
    "Painful withdrawal symptoms when Suboxone is unavailable or doses are reduced",
    "Secretive behavior about Suboxone use; hiding the drug from family members",
    "Social isolation and withdrawal from relationships to protect access to Suboxone",
    "Difficulties at work or school directly caused by Suboxone use",
    "Combining Suboxone with alcohol or other drugs — highly dangerous",
    "Failed attempts to reduce or stop Suboxone despite a desire to",
    "Telling yourself 'it's just my medication' while using it addictively",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Suboxone Recovery Looks Like at Northbound",
  recoveryIntro:
    "Getting off Suboxone completely — without substituting another opiate — requires medical expertise, individualized care, and a comprehensive therapeutic approach. Northbound provides exactly that.",
  careSteps: [
    {
      phase: "Days 1–14",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Suboxone withdrawal, while generally less acute than heroin or short-acting opioids, requires careful medical management — particularly the tapering process, which must be done slowly to avoid precipitated withdrawal. Northbound's one-eighty detox program provides 24/7 medical supervision, individualized taper protocols, and comfort medications to ensure a safe, monitored transition.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following detox, residential treatment provides 24/7 immersive clinical care. Many Suboxone-dependent clients are coming off years of chronic opiate use — the residential environment provides the structure, support, and therapeutic depth needed to address both the physical dependency and its psychological roots through individual therapy, group counseling, CBT, DBT, EMDR, and dual-diagnosis care.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of intensive clinical programming as clients begin building greater independence. This phase focuses on the foundational work of opioid recovery: developing genuine coping strategies, processing trauma, and establishing a sober daily life structure — without pharmaceutical support.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP provides 10–12 hours of weekly programming while clients reintegrate into work, family, or school. For Suboxone clients, this phase is particularly focused on demonstrating self-sufficiency — building the lived evidence that they can function, feel, and thrive without any opioid support.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Program",
      icon: "ri-refresh-line",
      body: "Northbound's transitional and aftercare programs help clients reintegrate into everyday life with the network of support needed to reach the critical one-year sobriety milestone. Alumni programming provides ongoing community, accountability, and events for long-term recovery maintenance.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-heart-pulse-line",
      title: "Complete Opioid Recovery — No Drug Substitution",
      body: "Many Suboxone clients specifically want recovery that doesn't involve remaining on any opiate indefinitely. Northbound is prepared to help clients achieve complete opioid freedom — with a clinically safe taper process and comprehensive therapeutic support to replace Suboxone's role in their life.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Treatment",
      body: "Most Suboxone dependency exists in a complex clinical context — co-occurring depression, anxiety, PTSD, and chronic pain are extremely common. Northbound's dual-diagnosis program treats both the Suboxone dependency and any underlying conditions simultaneously — reducing the risk of relapse back to opioids.",
    },
    {
      icon: "ri-user-line",
      title: "Individualized Treatment Planning",
      body: "Every Northbound client receives a customized treatment plan accounting for their individual needs, history, and challenges — including the specific opiate dependency history that preceded Suboxone use, and any co-occurring disorders that could otherwise interfere with recovery.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® & Careerbound®",
      body: "Many clients coming off Suboxone are in the process of rebuilding educational or professional trajectories disrupted by years of opiate dependency. Collegebound® and Careerbound® — available exclusively during residential treatment — provide academic advising and career support alongside clinical care.",
    },
    {
      icon: "ri-leaf-line",
      title: "Experiential & Active Recovery",
      body: "Northbound places a strong emphasis on experiential therapy and active living — helping clients discover genuine enjoyment and reward in an addiction-free lifestyle. This is particularly important for Suboxone clients who may have been chemically 'comfortable' but never truly free.",
    },
    {
      icon: "ri-award-line",
      title: "Insurance Access & Accreditation",
      body: "DHCS licensed (#300661CP) and NAATP member, Northbound is in-network with 15+ major insurance plans. Our admissions team verifies your specific benefits at no cost before you commit to anything.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_suboxone_recovery01.jpg`,
  closingImageAlt: "Woman at peace in the sunny garden of Northbound Treatment — the calm clarity of Suboxone-free recovery",
  closingHeadline: "True Freedom Means Not Needing Any Pill to Feel Like Yourself.",
  closingBody: [
    "Suboxone was meant to be a bridge — not a destination. If you or someone you love has found themselves dependent on Suboxone, Northbound can help you cross that bridge and arrive at genuine, sustainable, drug-free sobriety.",
    "Contact our caring and experienced staff any time, night or day. We will answer your questions and do everything in our power to put you on the path to a new, healthy, and sober life.",
  ],
  closingQuote:
    "Northbound is prepared to help clients achieve recovery without further reliance on drugs — real freedom, real sobriety.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Can you really get addicted to Suboxone if a doctor prescribed it?",
      answer:
        "Yes. Suboxone is a partial opioid agonist and carries a real potential for physical dependence, even when taken as directed. If you are taking more than prescribed, obtaining it from multiple sources, or experiencing strong cravings and withdrawal when doses are missed, clinical dependency has likely developed. Northbound's team can help you assess this and develop a treatment plan.",
    },
    {
      question: "How is Suboxone detox different from heroin or prescription opioid detox?",
      answer:
        "Suboxone has a longer half-life than most opioids, which means withdrawal symptoms typically begin later and persist longer — often stretching over weeks rather than days. A medically supervised taper (gradually reducing the dose) is the standard approach. Northbound's one-eighty detox program uses individualized taper protocols designed to minimize withdrawal discomfort throughout this process.",
    },
    {
      question: "Will Northbound put me on another medication to get off Suboxone?",
      answer:
        "Many clients specifically seek complete opioid freedom — no indefinite medication management. Northbound is prepared to support this goal. The specific clinical approach (complete taper vs. alternative MAT) is determined by each client's medical history, severity of dependency, and individualized treatment plan — developed collaboratively with your clinical team.",
    },
    {
      question: "How long does Suboxone treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day programs. Given the longer withdrawal timeline of Suboxone compared to shorter-acting opioids, 90 days or more is typically recommended. The right duration depends on how long Suboxone has been used, the dose, and any co-occurring conditions — all assessed during your initial evaluation.",
    },
    {
      question: "What if I also have a mental health condition?",
      answer:
        "Very common — and Northbound's dual-diagnosis program is specifically designed for this. Depression, anxiety, PTSD, and chronic pain co-occur with Suboxone dependency at high rates. Our psychiatric team and licensed therapists provide integrated treatment for both conditions simultaneously.",
    },
    {
      question: "Will insurance cover Suboxone addiction treatment?",
      answer:
        "In most cases, yes. Northbound is in-network with 15+ major plans including Aetna, Anthem, Cigna, and Tricare. Our admissions team verifies your specific benefits at no cost before you make any commitment.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-capsule-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
  ],

  substanceNameShort: "Suboxone",
};

export default function SuboxonePage() {
  return <SubstancePageTemplate data={data} />;
}
