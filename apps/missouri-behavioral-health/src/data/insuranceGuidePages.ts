import type { Metadata } from "next";

export interface CoverageItem {
  icon: string;
  label: string;
  detail: string;
}

export interface InsuranceGuidePageData {
  path: string;
  carrierName: string;
  carrierTagline: string;
  icon: string;
  metadata: Metadata;
  heroHeadline: string;
  heroBody: string;
  aboutHeadline: string;
  aboutBody: string[];
  carrierFacts: { icon: string; label: string; value: string }[];
  coverageHeadline: string;
  coverageIntro: string;
  coverageItems: CoverageItem[];
  steps: { number: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaHeadline: string;
  ctaBody: string;
}

const MBH_STEPS = [
  {
    number: "01",
    title: "Share your plan information",
    body: "Call our admissions team or use the online verification form with your insurance card — member ID, group number, and date of birth. Everything is confidential under HIPAA.",
  },
  {
    number: "02",
    title: "We contact your insurer",
    body: "Our team speaks directly with your insurance company to confirm in-network status, covered levels of care, deductibles, copays, and any prior authorization requirements.",
  },
  {
    number: "03",
    title: "Review your options together",
    body: "You receive a clear summary of estimated out-of-pocket costs and a recommended treatment plan before your first clinical appointment at our Springfield facility or via telehealth.",
  },
] as const;

const MBH_LEVELS: CoverageItem[] = [
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    detail:
      "Structured daytime programming — typically 5–6 hours per day — with psychiatric oversight, individual therapy, and group process. Many plans cover PHP as a step-down from residential or an alternative when 24-hour care is not required.",
  },
  {
    icon: "ri-team-line",
    label: "Intensive Outpatient (IOP)",
    detail:
      "Three or more clinical sessions per week while you live at home. IOP at MBH includes individual and group therapy, skills training, and medication management when clinically appropriate.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Outpatient Therapy",
    detail:
      "Weekly or bi-weekly individual sessions, family therapy, and ongoing medication management for clients stepping down from higher levels of care or entering treatment directly.",
  },
  {
    icon: "ri-brain-line",
    label: "Dual-Diagnosis Care",
    detail:
      "Federal parity law requires most private plans to cover mental health treatment comparably to medical care. Co-occurring depression, anxiety, PTSD, and bipolar disorder are treated alongside addiction.",
  },
  {
    icon: "ri-video-chat-line",
    label: "Telehealth (Statewide)",
    detail:
      "Many Missouri plans cover HIPAA-compliant telehealth for IOP and outpatient services — making evidence-based care accessible outside the Springfield area.",
  },
  {
    icon: "ri-capsule-line",
    label: "Medication Management",
    detail:
      "Psychiatric evaluation and ongoing medication support for addiction and co-occurring mental health conditions, integrated with your therapy plan.",
  },
];

function meta(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | Missouri Behavioral Health`,
    description,
    alternates: { canonical: path },
  };
}

const PAGES: InsuranceGuidePageData[] = [
  {
    path: "/aetna-outpatient-services",
    carrierName: "Aetna",
    carrierTagline: "Private plan coverage · Springfield, MO",
    icon: "ri-shield-check-line",
    metadata: meta(
      "Aetna Outpatient Services & Rehab Coverage",
      "How Aetna plans cover PHP, IOP, and outpatient addiction and mental health treatment at Missouri Behavioral Health in Springfield, MO. Free benefits verification.",
      "/aetna-outpatient-services",
    ),
    heroHeadline: "Aetna coverage for addiction & mental health treatment",
    heroBody:
      "Aetna is one of the largest commercial insurers in the United States. Most Aetna members have access to substance use and mental health benefits that can cover partial hospitalization, intensive outpatient, and outpatient therapy at Missouri Behavioral Health — we verify your specific plan at no cost.",
    aboutHeadline: "Does Aetna cover rehab and outpatient treatment?",
    aboutBody: [
      "Yes — most Aetna commercial plans include coverage for medically necessary addiction and mental health treatment. Under the Affordable Care Act and federal parity requirements, Aetna cannot impose more restrictive limits on behavioral health benefits than on medical/surgical benefits for most group and individual plans.",
      "Coverage specifics — copays, deductibles, coinsurance, authorized length of stay, and in-network requirements — vary by employer group, plan tier, and whether you have an open-access or managed plan. Missouri Behavioral Health contacts Aetna on your behalf to determine exactly what your policy covers before you begin treatment.",
      "We are located in Springfield, MO and serve clients throughout Missouri via in-person and telehealth programming. We accept most private Aetna plans; we do not accept Medicaid or Medicare.",
    ],
    carrierFacts: [
      { icon: "ri-global-line", label: "National reach", value: "All 50 states" },
      { icon: "ri-hospital-line", label: "MBH levels covered", value: "PHP · IOP · Outpatient" },
      { icon: "ri-shield-check-line", label: "Verification", value: "Free · Confidential" },
      { icon: "ri-time-line", label: "Typical timeline", value: "Same business day" },
      { icon: "ri-map-pin-2-line", label: "Location", value: "Springfield, MO" },
      { icon: "ri-close-circle-line", label: "Not accepted", value: "Medicaid · Medicare" },
    ],
    coverageHeadline: "What Aetna plans often cover at MBH",
    coverageIntro:
      "Aetna behavioral health benefits typically include the levels of care below when treatment is medically necessary and provided in-network. Our admissions team confirms your exact benefits before admission.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Does Aetna cover drug and alcohol rehab?",
        a: "Most Aetna commercial plans cover substance use disorder treatment, including PHP, IOP, and outpatient levels of care. Residential/inpatient coverage depends on your plan — MBH specializes in structured outpatient and partial hospitalization programming in Springfield, MO.",
      },
      {
        q: "Is Missouri Behavioral Health in-network with Aetna?",
        a: "We work with most major Aetna plans. Network status varies by plan and region — our team verifies in-network participation and contracted rates when you call or submit a verification request.",
      },
      {
        q: "Will I owe anything out of pocket with Aetna?",
        a: "That depends on your deductible, copay, and coinsurance. Many clients have met part or all of their deductible; others owe a per-session copay. We provide a written estimate after verification.",
      },
      {
        q: "Does Aetna require prior authorization?",
        a: "Some Aetna plans require prior authorization for PHP or IOP. If required, our clinical and administrative teams coordinate authorization with Aetna so you can focus on getting well.",
      },
    ],
    ctaHeadline: "Verify your Aetna benefits in minutes",
    ctaBody:
      "Our admissions coordinators verify Aetna coverage at no cost and explain your options before your first appointment.",
  },
  {
    path: "/anthem-blue-cross-coverage",
    carrierName: "Anthem",
    carrierTagline: "Anthem & Blue Cross plans · Missouri",
    icon: "ri-hospital-line",
    metadata: meta(
      "Anthem Blue Cross Coverage for Rehab & Therapy",
      "Anthem and Blue Cross Blue Shield coverage for addiction and mental health treatment at Missouri Behavioral Health. PHP, IOP, and outpatient care in Springfield, MO.",
      "/anthem-blue-cross-coverage",
    ),
    heroHeadline: "Anthem Blue Cross coverage for behavioral health",
    heroBody:
      "Anthem and affiliated Blue Cross Blue Shield plans are widely used in Missouri. Most members have behavioral health benefits that can cover structured addiction and mental health programming at MBH — including dual-diagnosis treatment and statewide telehealth.",
    aboutHeadline: "How Anthem Blue Cross works with MBH",
    aboutBody: [
      "Anthem Blue Cross and Blue Shield plans typically include substance use disorder and mental health benefits subject to medical necessity review. Coverage may be administered directly by Anthem or through a behavioral health carve-out vendor depending on your employer.",
      "Missouri Behavioral Health verifies Anthem/BCBS benefits before treatment begins. We explain covered levels of care, estimated cost-sharing, and any authorization steps so there are no surprises on your first day of programming.",
      "Whether you carry an Anthem employer plan, an individual policy, or a Blue Cross plan sold in Missouri, our team can help you understand how your benefits apply to PHP, IOP, and outpatient services.",
    ],
    carrierFacts: [
      { icon: "ri-map-pin-2-line", label: "Missouri plans", value: "Employer & individual" },
      { icon: "ri-mental-health-line", label: "Dual diagnosis", value: "Integrated care" },
      { icon: "ri-video-chat-line", label: "Telehealth", value: "Statewide IOP options" },
      { icon: "ri-shield-check-line", label: "Benefits check", value: "No cost to you" },
      { icon: "ri-phone-line", label: "Admissions", value: "24/7 availability" },
      { icon: "ri-close-circle-line", label: "Not accepted", value: "Medicaid · Medicare" },
    ],
    coverageHeadline: "Anthem / BCBS benefits at Missouri Behavioral Health",
    coverageIntro:
      "Anthem and Blue Cross plans often cover the following when clinically appropriate. Exact benefits depend on your policy — verification is always plan-specific.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Does Anthem cover IOP and PHP?",
        a: "Yes — most Anthem and BCBS commercial plans include intensive outpatient and partial hospitalization benefits when medically necessary. Our team confirms authorization requirements for your specific policy.",
      },
      {
        q: "What if my card says Blue Cross instead of Anthem?",
        a: "Many Missouri policies are part of the Blue Cross Blue Shield association and may be administered by Anthem. Provide your card to our team — we identify the correct payer and verify benefits accordingly.",
      },
      {
        q: "Can I use Anthem for telehealth at MBH?",
        a: "Many Anthem plans cover telehealth for behavioral health services. MBH offers statewide telehealth for qualifying IOP and outpatient programming.",
      },
      {
        q: "Does Anthem cover family therapy?",
        a: "Family therapy is often a covered benefit under mental health or substance use disorder benefits when included in your treatment plan. We confirm coverage during verification.",
      },
    ],
    ctaHeadline: "Confirm your Anthem or BCBS benefits",
    ctaBody: "Call or verify online — we handle payer calls and authorization paperwork whenever possible.",
  },
  {
    path: "/beacon-health-insurance-rehab-coverage",
    carrierName: "Beacon",
    carrierTagline: "Beacon Health Options · SUD & MH",
    icon: "ri-file-list-3-line",
    metadata: meta(
      "Beacon Health Insurance Rehab Coverage",
      "Beacon Health Options coverage for addiction rehab and mental health at Missouri Behavioral Health. Authorization support and benefits verification.",
      "/beacon-health-insurance-rehab-coverage",
    ),
    heroHeadline: "Beacon Health insurance for rehab coverage",
    heroBody:
      "Beacon Health Options (now part of Carelon in many markets) administers behavioral health benefits for numerous employer and health plans. MBH helps you navigate Beacon authorizations and understand covered PHP, IOP, and outpatient services.",
    aboutHeadline: "Understanding Beacon behavioral health benefits",
    aboutBody: [
      "Beacon historically served as a specialty behavioral health administrator — meaning your medical card may show one insurer while behavioral health claims route through Beacon or Carelon. This is common and does not mean your benefits are reduced.",
      "Missouri Behavioral Health's admissions team is experienced with Beacon authorization workflows, utilization review, and medical necessity documentation for substance use and mental health treatment.",
      "We provide clear communication about what Beacon has approved, what remains subject to review, and your estimated member responsibility before you start programming.",
    ],
    carrierFacts: [
      { icon: "ri-file-list-3-line", label: "Admin model", value: "Behavioral health carve-out" },
      { icon: "ri-hospital-line", label: "Levels of care", value: "PHP · IOP · Outpatient" },
      { icon: "ri-user-heart-line", label: "Authorization", value: "MBH coordinates" },
      { icon: "ri-shield-check-line", label: "Verification", value: "Free" },
      { icon: "ri-time-line", label: "Admissions", value: "24/7" },
      { icon: "ri-map-pin-2-line", label: "Facility", value: "Springfield, MO" },
    ],
    coverageHeadline: "Beacon-covered services at MBH",
    coverageIntro:
      "When Beacon or Carelon administers your behavioral health benefits, the following services are commonly covered subject to plan limits and clinical criteria.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Is Beacon the same as my medical insurance?",
        a: "Not always. Beacon often manages only behavioral health claims while your medical insurer handles other care. Our team identifies the correct behavioral health administrator from your card and employer information.",
      },
      {
        q: "Does Beacon require authorization for treatment?",
        a: "Many Beacon-administered plans require prior authorization for PHP and IOP. MBH submits clinical information and tracks authorization on your behalf.",
      },
      {
        q: "Has Beacon merged with Carelon?",
        a: "Markets vary. Some policies still reference Beacon; others use Carelon. We verify the active administrator for your plan at the time of admission.",
      },
      {
        q: "Will Beacon cover dual-diagnosis treatment?",
        a: "Federal parity and plan design typically require coverage for co-occurring mental health conditions when medically necessary. Both are addressed in MBH treatment plans.",
      },
    ],
    ctaHeadline: "Let us navigate Beacon for you",
    ctaBody: "Authorization and benefits verification are part of our admissions process — at no cost to you.",
  },
  {
    path: "/blue-cross-blue-shield-coverage",
    carrierName: "BCBS",
    carrierTagline: "Blue Cross Blue Shield · Missouri",
    icon: "ri-heart-pulse-line",
    metadata: meta(
      "Blue Cross Blue Shield Coverage for Treatment",
      "Blue Cross Blue Shield of Missouri coverage for addiction and mental health treatment at Missouri Behavioral Health. Free insurance verification.",
      "/blue-cross-blue-shield-coverage",
    ),
    heroHeadline: "Blue Cross Blue Shield treatment coverage",
    heroBody:
      "Blue Cross Blue Shield plans are among the most common in Missouri. MBH accepts most BCBS commercial policies and helps you understand deductibles, copays, and covered levels of care before admission.",
    aboutHeadline: "BCBS of Missouri and MBH",
    aboutBody: [
      "Blue Cross Blue Shield of Missouri and affiliated plans typically include mental health and substance use disorder benefits. Coverage may be subject to deductibles, visit limits, and medical necessity review depending on your employer or individual policy.",
      "Missouri Behavioral Health specializes in partial hospitalization, intensive outpatient, and outpatient programming — allowing many clients to receive intensive care while maintaining connection to home and work when appropriate.",
      "Our team verifies BCBS benefits directly with the plan or behavioral health administrator and provides a written summary of coverage and estimated member costs.",
    ],
    carrierFacts: [
      { icon: "ri-shield-check-line", label: "Plan types", value: "PPO · HMO · POS" },
      { icon: "ri-group-line", label: "Family plans", value: "Dependent coverage varies" },
      { icon: "ri-hospital-line", label: "MBH programming", value: "PHP · IOP · OP" },
      { icon: "ri-money-dollar-circle-line", label: "Cost clarity", value: "Upfront estimates" },
      { icon: "ri-phone-line", label: "Support", value: "24/7 admissions" },
      { icon: "ri-close-circle-line", label: "Excluded", value: "Medicaid · Medicare" },
    ],
    coverageHeadline: "What BCBS plans often include",
    coverageIntro:
      "While every BCBS policy is different, these are the services most often covered when treatment at MBH is medically necessary and in-network.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Does BCBS cover addiction treatment in Missouri?",
        a: "Most BCBS commercial plans cover substance use disorder treatment. MBH provides structured outpatient levels of care in Springfield with telehealth options statewide.",
      },
      {
        q: "How do deductibles work with BCBS?",
        a: "You may owe costs until your annual deductible is met, then copays or coinsurance apply. We tell you where you stand in your benefit year during verification.",
      },
      {
        q: "Can my dependent use BCBS for treatment at MBH?",
        a: "Dependent coverage depends on your policy. If dependents are enrolled and benefits include behavioral health, treatment may be covered — we verify per member.",
      },
      {
        q: "Is pre-authorization required?",
        a: "Some BCBS plans require it for higher levels of care. MBH handles authorization when required.",
      },
    ],
    ctaHeadline: "Check your BCBS benefits today",
    ctaBody: "Free, confidential verification — know your costs before you commit to treatment.",
  },
  {
    path: "/carelon-behavioral-health-insurance",
    carrierName: "Carelon",
    carrierTagline: "Behavioral health administrator",
    icon: "ri-mental-health-line",
    metadata: meta(
      "Carelon Behavioral Health Insurance Guide",
      "Carelon behavioral health insurance for addiction and mental health treatment at Missouri Behavioral Health. PHP, IOP, and outpatient coverage help.",
      "/carelon-behavioral-health-insurance",
    ),
    heroHeadline: "Carelon behavioral health coverage",
    heroBody:
      "Carelon Behavioral Health administers specialty mental health and substance use benefits for many national insurers and employers. MBH coordinates Carelon authorizations and explains your covered benefits clearly.",
    aboutHeadline: "Carelon carve-out plans explained",
    aboutBody: [
      "A Carelon carve-out means your behavioral health claims are processed separately from your general medical insurance — even though you may have a single insurance card. This is standard for many large employers and does not reduce your benefits.",
      "Carelon conducts utilization review to confirm medical necessity for PHP, IOP, and outpatient services. Missouri Behavioral Health provides clinical documentation and stays in communication with Carelon throughout your treatment.",
      "If your plan previously referenced Beacon Health Options, your benefits may now route through Carelon — our team confirms the active administrator when you call.",
    ],
    carrierFacts: [
      { icon: "ri-mental-health-line", label: "Focus", value: "BH specialty admin" },
      { icon: "ri-file-list-3-line", label: "Reviews", value: "Utilization management" },
      { icon: "ri-hospital-line", label: "MBH services", value: "PHP · IOP · Outpatient" },
      { icon: "ri-shield-check-line", label: "Verification", value: "Complimentary" },
      { icon: "ri-team-line", label: "Care team", value: "Coordinates with Carelon" },
      { icon: "ri-map-pin-2-line", label: "Site", value: "Springfield, MO" },
    ],
    coverageHeadline: "Carelon-covered care at MBH",
    coverageIntro:
      "Carelon-administered benefits commonly include the following levels of care when approved through medical necessity review.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Why does Carelon appear on my explanation of benefits?",
        a: "Carelon processes behavioral health claims for many insurers. Your EOB may show Carelon even when your card displays a different brand.",
      },
      {
        q: "Does Carelon cover IOP at MBH?",
        a: "Most Carelon-administered plans include IOP benefits when clinically appropriate. Authorization may be required — we handle that process.",
      },
      {
        q: "What is utilization review?",
        a: "Carelon may review ongoing treatment to confirm continued medical necessity. MBH submits progress documentation as required by your plan.",
      },
      {
        q: "Can I still verify benefits if I am not sure Carelon is my administrator?",
        a: "Yes. Provide your insurance card to our team — we identify the correct behavioral health payer and verify from there.",
      },
    ],
    ctaHeadline: "Understand your Carelon benefits",
    ctaBody: "We translate insurance language into plain answers about cost and coverage.",
  },
  {
    path: "/cigna-outpatient-coverage",
    carrierName: "Cigna",
    carrierTagline: "Commercial & employer plans",
    icon: "ri-user-heart-line",
    metadata: meta(
      "Cigna Outpatient Coverage for Rehab & Therapy",
      "Cigna insurance coverage for outpatient, IOP, and PHP addiction treatment at Missouri Behavioral Health in Springfield, MO.",
      "/cigna-outpatient-coverage",
    ),
    heroHeadline: "Cigna outpatient & IOP coverage",
    heroBody:
      "Cigna commercial plans widely cover behavioral health services. Missouri Behavioral Health helps Cigna members access PHP, IOP, and outpatient programming with transparent cost estimates before treatment starts.",
    aboutHeadline: "Cigna and addiction treatment coverage",
    aboutBody: [
      "Cigna is a major national carrier serving employer groups, individuals, and families. Most Cigna plans include substance use disorder and mental health benefits aligned with parity requirements.",
      "MBH does not provide 24-hour residential care — we focus on intensive outpatient structures that allow many Cigna members to receive robust clinical hours while living at home or in supportive housing.",
      "Our admissions team contacts Cigna or your plan's behavioral health vendor to confirm network status, covered services, and member cost-sharing.",
    ],
    carrierFacts: [
      { icon: "ri-building-line", label: "Common plans", value: "Employer-sponsored" },
      { icon: "ri-capsule-line", label: "MAT support", value: "When clinically indicated" },
      { icon: "ri-hospital-line", label: "Levels", value: "PHP · IOP · Outpatient" },
      { icon: "ri-shield-check-line", label: "EOB support", value: "Billing questions welcome" },
      { icon: "ri-time-line", label: "Verification speed", value: "Often same day" },
      { icon: "ri-close-circle-line", label: "Not accepted", value: "Medicaid · Medicare" },
    ],
    coverageHeadline: "Cigna benefits commonly used at MBH",
    coverageIntro:
      "Cigna members at MBH most often access these covered services after benefits verification and any required authorization.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Does Cigna cover substance abuse treatment?",
        a: "Yes — most Cigna commercial plans cover medically necessary substance use disorder treatment, including structured outpatient programming at MBH.",
      },
      {
        q: "Does Cigna cover medication-assisted treatment (MAT)?",
        a: "Many Cigna plans cover MAT when prescribed as part of an integrated treatment plan. Our psychiatric team coordinates medication with therapy.",
      },
      {
        q: "What is medical necessity?",
        a: "Insurers including Cigna require that treatment be appropriate for your diagnosis and clinical presentation. Our assessment documents medical necessity for authorization.",
      },
      {
        q: "Can I use Cigna for telehealth IOP?",
        a: "Many Cigna plans cover telehealth behavioral health services for Missouri residents. We confirm telehealth benefits during verification.",
      },
    ],
    ctaHeadline: "Verify Cigna coverage before admission",
    ctaBody: "Know what Cigna will cover — and what you may owe — before day one.",
  },
  {
    path: "/cox-health-missouri",
    carrierName: "Cox Health",
    carrierTagline: "Regional Missouri plans",
    icon: "ri-map-pin-2-line",
    metadata: meta(
      "Cox Health Missouri Insurance for Treatment",
      "Cox Health plan coverage for behavioral health and addiction treatment at Missouri Behavioral Health in Springfield and via telehealth.",
      "/cox-health-missouri",
    ),
    heroHeadline: "Cox Health plans & behavioral health care",
    heroBody:
      "Cox Health serves many families in southwest Missouri. If your plan includes behavioral health benefits, MBH can help you use them for PHP, IOP, and outpatient addiction and mental health treatment — in Springfield or through telehealth.",
    aboutHeadline: "Cox Health and MBH in Springfield",
    aboutBody: [
      "As a Springfield-based treatment center, Missouri Behavioral Health is a natural resource for Cox Health members seeking structured addiction and mental health care close to home.",
      "Cox Health plan designs vary — some are employer-specific, others are marketplace or regional products. Our team verifies your exact benefits, network participation, and any referral requirements.",
      "We also offer telehealth for clients elsewhere in Missouri who carry Cox Health or other qualifying plans, expanding access beyond the immediate Springfield area.",
    ],
    carrierFacts: [
      { icon: "ri-map-pin-2-line", label: "Region", value: "SW Missouri focus" },
      { icon: "ri-hospital-line", label: "Local care", value: "Springfield campus" },
      { icon: "ri-video-chat-line", label: "Telehealth", value: "Statewide options" },
      { icon: "ri-shield-check-line", label: "Verification", value: "No charge" },
      { icon: "ri-phone-line", label: "Contact", value: "24/7 admissions" },
      { icon: "ri-close-circle-line", label: "Excluded", value: "Medicaid · Medicare" },
    ],
    coverageHeadline: "Using Cox Health benefits at MBH",
    coverageIntro:
      "Cox Health members may access the following services when covered by their plan and clinically appropriate.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Does Cox Health cover rehab?",
        a: "Coverage depends on your specific Cox Health plan. Many commercial Cox Health policies include behavioral health benefits — we verify yours individually.",
      },
      {
        q: "Do I need a referral from Cox Health?",
        a: "Some plans require a primary care or plan referral. We tell you during verification if a referral is needed before starting PHP or IOP.",
      },
      {
        q: "Is MBH in-network for Cox Health?",
        a: "Network status varies by plan. Our admissions team confirms in-network participation when you verify benefits.",
      },
      {
        q: "Can I attend MBH if I live outside Springfield?",
        a: "Yes — many clients use telehealth IOP or outpatient services. In-person PHP and IOP are available at our Springfield location.",
      },
    ],
    ctaHeadline: "Use your Cox Health benefits locally",
    ctaBody: "Springfield-based care with regional plan expertise — verify benefits today.",
  },
  {
    path: "/geha-insurance-coverage",
    carrierName: "GEHA",
    carrierTagline: "Federal employee health plans",
    icon: "ri-government-line",
    metadata: meta(
      "GEHA Insurance Coverage for Rehab & Therapy",
      "GEHA federal employee and family plan coverage for addiction and mental health at Missouri Behavioral Health. Benefits verification help.",
      "/geha-insurance-coverage",
    ),
    heroHeadline: "GEHA insurance for federal employees",
    heroBody:
      "GEHA provides health benefits for federal employees, retirees, and their families. Most GEHA plans include robust behavioral health benefits that can cover PHP, IOP, and outpatient treatment at Missouri Behavioral Health.",
    aboutHeadline: "GEHA plans and behavioral health parity",
    aboutBody: [
      "Government Employees Health Association (GEHA) plans under the Federal Employees Health Benefits (FEHB) program must provide mental health and substance use disorder benefits comparable to medical care — making GEHA a strong option for addiction and dual-diagnosis treatment.",
      "MBH serves GEHA members in the Springfield area and across Missouri through telehealth. We verify GEHA benefits, explain Tricare/FEHB distinctions when relevant, and coordinate any required authorizations.",
      "Federal employees and retirees often have questions about confidentiality and employment — our admissions team addresses these sensitively during intake.",
    ],
    carrierFacts: [
      { icon: "ri-government-line", label: "Plan type", value: "FEHB · Federal" },
      { icon: "ri-group-line", label: "Who qualifies", value: "Employees · Retirees · Families" },
      { icon: "ri-shield-check-line", label: "Parity", value: "Strong MH/SUD benefits" },
      { icon: "ri-hospital-line", label: "MBH levels", value: "PHP · IOP · Outpatient" },
      { icon: "ri-lock-line", label: "Privacy", value: "HIPAA-compliant" },
      { icon: "ri-close-circle-line", label: "Not accepted", value: "Medicaid · Medicare" },
    ],
    coverageHeadline: "GEHA-covered services at MBH",
    coverageIntro:
      "GEHA members frequently use these covered levels of care when treatment is medically necessary and authorized as required by plan rules.",
    coverageItems: MBH_LEVELS,
    steps: [...MBH_STEPS],
    faqs: [
      {
        q: "Does GEHA cover drug rehab?",
        a: "Yes — FEHB plans through GEHA typically cover substance use disorder treatment including structured outpatient programming at MBH.",
      },
      {
        q: "Will my federal employer know I am in treatment?",
        a: "Treatment records are protected by HIPAA. Insurance claims use clinical codes — not detailed treatment notes — and are handled confidentially.",
      },
      {
        q: "Does GEHA cover family members?",
        a: "Eligible dependents enrolled on your GEHA plan may have behavioral health benefits. We verify coverage per enrolled member.",
      },
      {
        q: "Is prior authorization required for GEHA?",
        a: "Some GEHA service codes require authorization for PHP/IOP. MBH manages authorization as part of admissions.",
      },
    ],
    ctaHeadline: "GEHA members: verify benefits confidentially",
    ctaBody: "Federal employees and families deserve clear answers — we provide them at no cost.",
  },
];

const BY_PATH = new Map(PAGES.map((p) => [p.path, p]));

export function getInsuranceGuidePage(path: string): InsuranceGuidePageData | undefined {
  return BY_PATH.get(path);
}

export function getAllInsuranceGuidePaths(): string[] {
  return PAGES.map((p) => p.path);
}
