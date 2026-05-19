import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";

const HERO = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_detox_hero01.jpg";

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt: "Medically supervised detox room with coastal view at Northbound Treatment's Orange County facility",
  eyebrow: "Addiction Treatment Programs",
  programName: "Drug & Alcohol Medical Detox Program",
  italicWord: "Detox",
  tagline: "Safe, supervised withdrawal management in Orange County, CA",
  heroBody:
    "Northbound is proud to offer a fully licensed medical detox center in Orange County, California. This sub-acute residential detox center provides a safe, supervised environment where clients can achieve abstinence, overcome the symptoms of withdrawal, and begin the healing process.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Drug & Alcohol Detox" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Are Medical Detoxification Services?",
  overviewBody: [
    "Medical detoxification is the process of safely clearing substances from the body while managing withdrawal symptoms through 24/7 clinical monitoring, medication-assisted treatment (MAT) when indicated, and therapeutic support — so your mind and body can begin healing simultaneously. At Northbound, detox is not an endpoint; it is a carefully designed bridge into the next phase of your recovery.",
    "Our Orange County detox center is led by Dr. Venice Sanchez, MD — double board-certified in Psychiatry and Addiction Medicine (UCLA, MSU, UCI), named Women in Medicine Top Doctor 2024 and Best of Newport Beach Psychiatrist 2024. We hold IMS (Incidental Medical Services) certification, allowing on-site physician visits and lab draws at our Garden Grove facility — a level of care most detox programs cannot offer.",
  ],
  keyFacts: [
    { icon: "ri-time-line", label: "Typical Duration", value: "5–10 Days (ASAM-guided)" },
    { icon: "ri-hospital-line", label: "Level of Care", value: "Sub-Acute Residential" },
    { icon: "ri-stethoscope-line", label: "Supervision", value: "24/7 Medical Monitoring" },
    { icon: "ri-map-pin-2-line", label: "Location", value: "Garden Grove, Orange County CA" },
    { icon: "ri-shield-check-line", label: "Insurance", value: "15+ Major Plans Accepted" },
    { icon: "ri-award-line", label: "Certification", value: "IMS Certified · DHCS Licensed" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "What to Expect During Detox",
  stepsIntro:
    "Our compassionate clinical team guides you through every phase — managing symptoms, monitoring health, and preparing you for lasting recovery.",
  steps: [
    {
      number: "01",
      title: "Intake & Assessment",
      icon: "ri-file-list-line",
      body: "Upon arrival, you'll meet with our clinical and medical team for a comprehensive evaluation. Your Care Coordinator will review your medical history, substance use history, and any co-occurring mental health conditions to build your individualized treatment plan.",
    },
    {
      number: "02",
      title: "24/7 Medical Monitoring",
      icon: "ri-heart-pulse-line",
      body: "Around-the-clock supervision by qualified medical professionals ensures your safety and comfort. Our team manages withdrawal symptoms proactively — including medication-assisted treatment (MAT) when clinically indicated.",
    },
    {
      number: "03",
      title: "Therapeutic Support",
      icon: "ri-mental-health-line",
      body: "Detox at Northbound goes beyond the physical. Daily therapeutic sessions, group support, and individual counseling help you address the emotional and psychological dimensions of addiction from day one.",
    },
    {
      number: "04",
      title: "Dual-Diagnosis Screening",
      icon: "ri-brain-line",
      body: "We screen all clients for underlying mental health conditions — anxiety, depression, PTSD, and more. Uncovering co-occurring disorders during detox leads to a more robust, integrated treatment plan and better long-term outcomes.",
    },
    {
      number: "05",
      title: "Transition Planning",
      icon: "ri-map-line",
      body: "As withdrawal symptoms subside, your clinical team works with you to plan the next phase of your recovery — typically residential treatment or PHP. Detox is the foundation; we ensure a seamless, supported transition forward.",
    },
  ],

  /* ── Warning ──────────────────────────────────────────────── */
  warningHeadline: "Why You Should Not Detox at Home",
  warningBody: [
    "It can be tempting to attempt detox at home. However, withdrawal symptoms range in severity from discomfort to life-threatening. Severe symptoms include delirium tremens (DTs), hallucinations, seizures, rapid heart rate, and cardiac arrest.",
    "Without immediate medical access and close monitoring, most individuals who attempt home detox are unsuccessful — and at serious risk. At Northbound's medical detox center, each person receives an individualized treatment plan that keeps them safe and as comfortable as possible throughout the process.",
  ],
  warningPoints: [
    "Nausea & Vomiting",
    "Seizures",
    "Body Aches & Tremors",
    "Hallucinations",
    "Insomnia",
    "Delirium Tremens",
    "Rapid Heart Rate",
    "Cardiac Arrest Risk",
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-shield-star-line",
      title: "Fully Licensed & IMS Certified",
      body: "Our Orange County detox center holds DHCS licensure and IMS certification — meaning physicians can see clients and perform lab draws directly on-site. This is a level of on-site medical capability most detox programs don't offer.",
    },
    {
      icon: "ri-stethoscope-line",
      title: "Led by Dr. Venice Sanchez, MD",
      body: "Our Medical Director is double board-certified in Psychiatry and Addiction Medicine — UCLA undergrad, Michigan State MD, UCI residency (Outstanding Resident of the Year). Named Women in Medicine Top Doctor 2024 and Best of Newport Beach Psychiatrist 2024. Her integrative approach treats the whole person, not just the withdrawal.",
    },
    {
      icon: "ri-team-line",
      title: "1:1 Staffing · 1/3 Are Alumni",
      body: "Our 1:1 staff-to-client ratio means you always have dedicated clinical attention. And because approximately one-third of our team are program alumni themselves, you'll be supported by people who genuinely understand what you're going through.",
    },
    {
      icon: "ri-brain-line",
      title: "Trauma-Informed & Dual-Diagnosis Care",
      body: "Trauma is at the root of almost every addiction. Our trauma-informed detox approach addresses co-occurring mental health conditions from the first day, leading to better outcomes and more personalized treatment planning.",
    },
    {
      icon: "ri-home-heart-line",
      title: "Comfort-First Facility in Garden Grove",
      body: "Our Garden Grove detox facility was designed to feel nothing like a hospital. Memory foam beds, flat-screen TVs, a fire pit, and chef-catered meals — real comfort that supports real healing during an already difficult time.",
    },
    {
      icon: "ri-refresh-line",
      title: "A Foundation for What Comes Next",
      body: "Detox at Northbound is not an isolated event — it is the first phase of a carefully orchestrated continuum of care. From day one, our team is planning your next step: residential treatment, PHP, or the level of care that best fits your clinical needs. You leave detox with a plan, not just a discharge slip.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line", current: true },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
    { label: "IOP", href: "/programs/intensive-outpatient-treatment/", icon: "ri-calendar-check-line" },
    { label: "Sober Living", href: "/treatment/transitional-living-programs/sober-living/", icon: "ri-building-2-line" },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line" },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "How long does medical detox at Northbound take?",
      a: "The length of detox varies based on the type and severity of addiction. We follow ASAM (American Society of Addiction Medicine) criteria to determine appropriate length of stay. On average, clients spend 5 to 10 days in our detox program, though some cases may require more time — particularly when underlying mental health conditions are uncovered.",
    },
    {
      q: "Is medication-assisted treatment (MAT) available during detox?",
      a: "Yes. Medication-assisted treatment is available and administered by our medical team when clinically appropriate. MAT helps manage withdrawal symptoms, reduce cravings, and stabilize the client safely — making the detox process significantly more comfortable and effective.",
    },
    {
      q: "What substances can you detox from at Northbound?",
      a: "Our detox program is equipped to manage withdrawal from alcohol, opioids (heroin, fentanyl, oxycodone, suboxone), benzodiazepines, methamphetamine, cocaine, and other substances. Each client receives an individualized medical plan based on their specific substance use history.",
    },
    {
      q: "Does insurance cover medical detox?",
      a: "Most major insurance plans cover medically necessary detox. Northbound is a preferred in-network provider with 15+ major insurance companies including Aetna, Anthem, BCBS, Cigna, Health Net, TriCare, and more. Our admissions team verifies your benefits at no cost before you arrive.",
    },
    {
      q: "What happens after detox is complete?",
      a: "Detox is the first step — critical but not standalone. Following detox, our clinical team will recommend the appropriate next level of care, typically residential treatment or a partial hospitalization program (PHP). We coordinate the transition directly to ensure continuity of care and prevent relapse during the vulnerable post-detox period.",
    },
    {
      q: "What outcomes can I expect from treatment at Northbound?",
      a: "A 2015 independent outcomes study conducted with University of Southern California researchers found that Northbound clients who completed treatment showed greater than 97% abstinence from illicit drugs, greater than 95% abstinence from alcohol, and a 97% reduction in depressive and anxiety symptoms — along with a significant increase in employment days per month. These results are measured via validated questionnaires at admission, 30 days, and discharge, and are benchmarked against industry standards with third-party validation.",
    },
    {
      q: "Can family members visit during detox?",
      a: "Family visitation during the detox phase is determined on a case-by-case basis by the clinical team. Detox is a medically intensive period, and we prioritize the client's stability and comfort. Our team will keep approved family contacts informed of general progress throughout. Structured family therapy and education programs begin at the appropriate phase of treatment.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Ready for a Safe, Supervised Detox?",
  ctaBody:
    "Our medically supervised detox program in Orange County is available now. One call starts the process — confidential, no-pressure, and covered by most insurance plans.",
};

export default function DetoxPage() {
  return <TreatmentPageTemplate data={data} />;
}
