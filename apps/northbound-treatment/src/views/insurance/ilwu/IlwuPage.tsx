import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_ilwu.jpg";

const OTHER_CARRIERS = [
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "GEHA", href: "/insurance/geha-insurance/" },
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "First Health", href: "/insurance/first-health/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Union benefits coordinator reviewing ILWU health plan coverage for addiction treatment with a member",
  carrierName: "ILWU",
  carrierTagline: "Union health plan — accepted at Northbound",
  heroBody:
    "The ILWU (International Longshore and Warehouse Union) provides health benefits to eligible union members and their families. Northbound accepts ILWU health plan coverage for addiction treatment — including detox, residential, PHP, and virtual IOP.",

  aboutHeadline: "Does the ILWU Health Plan Cover Addiction Treatment?",
  aboutBody: [
    "Yes — the International Longshore and Warehouse Union (ILWU) health plan provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) programs for eligible union members and their covered dependents. The ILWU-PMA Welfare Plan is one of the most comprehensive union health plans in the country, designed to protect the health and wellbeing of longshore workers along the Pacific Coast.",
    "The ILWU health plan is administered through the ILWU-PMA Welfare Plan, a joint labor-management trust fund that operates independently from commercial insurers. Coverage is subject to the plan's Summary Plan Description and may require prior authorization for higher levels of care. Federal law requires the plan to cover mental health and substance use treatment at parity with physical health benefits.",
    "Northbound's admissions team has experience working with union health plan administrators. We contact the ILWU-PMA Welfare Plan directly on your behalf to determine your exact coverage — authorized levels of care, cost-sharing, and prior authorization requirements — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Covered", value: "Pacific Coast Longshore Workers" },
    { icon: "ri-map-pin-2-line", label: "Plan Coverage", value: "West Coast Ports + National" },
    { icon: "ri-building-line", label: "Administered By", value: "ILWU-PMA Welfare Plan" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "SUD + Mental Health Covered" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1–2 Business Days" },
  ],

  coverageHeadline: "What the ILWU Health Plan Typically Covers at Northbound",
  coverageIntro:
    "The ILWU health plan provides comprehensive coverage for eligible members seeking addiction treatment. Specific benefits are confirmed by Northbound's team during the pre-admission verification process.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "The ILWU health plan covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies under standard behavioral health criteria. Prior authorization is typically required.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Residential inpatient treatment is covered when medically necessary under the ILWU health plan. Length of stay is subject to utilization review — Northbound advocates for the full treatment duration needed for successful recovery.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of daily clinical programming — is typically covered as an intermediate step between residential care and standard outpatient treatment.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) is covered under most ILWU health plan configurations. Flexible scheduling allows union members to balance treatment with work commitments and union obligations.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Federal mental health parity law applies to the ILWU health plan. Co-occurring mental health conditions — depression, anxiety, PTSD — are treated alongside substance use disorders at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "The ILWU health plan supports ongoing outpatient care following inpatient discharge. Northbound's aftercare coordination helps members maintain recovery and return to productive work lives.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your ILWU membership number and plan information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts the ILWU-PMA Welfare Plan administrator to confirm your exact coverage — authorized levels of care, prior authorization requirements, and cost-sharing. Typically completed within one to two business days.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your benefits confirmed and treatment plan ready, you arrive at Northbound. We manage all ongoing authorizations throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does the ILWU health plan cover drug and alcohol rehab?",
      a: "Yes. The ILWU-PMA Welfare Plan covers substance use disorder treatment including detox, residential, PHP, and virtual IOP when medically necessary. Federal mental health parity law requires coverage at par with physical health benefits. Your specific benefits depend on your plan configuration — Northbound verifies this at no cost.",
    },
    {
      q: "Does Northbound accept ILWU health plan coverage?",
      a: "Yes. Northbound Treatment Services is an accepted provider for ILWU health plan members. Our admissions team has experience working directly with union health plan administrators and their authorization processes.",
    },
    {
      q: "Does the ILWU plan require prior authorization for inpatient treatment?",
      a: "Yes. Most union health plans including ILWU require prior authorization for inpatient and residential levels of care. Northbound's admissions team manages all authorization requests on your behalf.",
    },
    {
      q: "Can my family members use the ILWU health plan at Northbound?",
      a: "Yes. The ILWU health plan typically extends coverage to eligible dependents and family members of enrolled union members. Coverage details for dependents are confirmed during Northbound's verification process.",
    },
    {
      q: "What if I am a retired ILWU member?",
      a: "Retired ILWU members may retain health benefits through the ILWU-PMA Welfare Plan depending on their retirement status and years of service. Northbound's team can verify your eligibility and coverage as a retiree during the admissions inquiry.",
    },
    {
      q: "Can Northbound treat ILWU members from out of state?",
      a: "Yes. Northbound's California facilities serve clients from across the country. The ILWU health plan may cover out-of-area treatment when clinically appropriate — Northbound's team confirms your out-of-state access during benefits verification.",
    },
    {
      q: "How is the ILWU health plan different from commercial insurance?",
      a: "Union health plans like ILWU operate as jointly-administered labor-management trust funds rather than commercial insurance products. They are self-funded and governed by ERISA, with benefits defined in the plan's Summary Plan Description. They often provide very comprehensive coverage — particularly for skilled trades and maritime workers who face occupational stressors.",
    },
    {
      q: "Does the ILWU plan cover both substance use and mental health treatment?",
      a: "Yes. Federal mental health parity law requires ERISA-governed plans like ILWU to cover mental health and substance use disorders at par with physical health. Northbound's dual-diagnosis program treats co-occurring conditions simultaneously under the same authorization.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function IlwuPage() {
  return <InsurancePageTemplate data={data} />;
}
