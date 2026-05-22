import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_nyship.jpg";

const OTHER_CARRIERS = [
  { name: "GEHA", href: "/insurance/geha-insurance/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "ILWU", href: "/insurance/ilwu/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "New York State employee reviewing NYSHIP health insurance benefits with a benefits coordinator",
  carrierName: "NYSHIP",
  carrierTagline: "NY State employee health benefits — accepted at Northbound",
  heroBody:
    "NYSHIP (New York State Health Insurance Program) provides health coverage for New York State employees, retirees, and their dependents. Northbound is an accepted provider for NYSHIP members seeking addiction treatment in California.",

  aboutHeadline: "Does NYSHIP Cover Addiction Treatment at Northbound?",
  aboutBody: [
    "Yes — NYSHIP (New York State Health Insurance Program) provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) programs for eligible New York State employees, retirees, and their covered dependents. NYSHIP is one of the largest state employee health insurance programs in the country, providing comprehensive benefits to more than 1.2 million members.",
    "NYSHIP offers two main plan options through The Empire Plan and NYSHIP HMO options. The Empire Plan — the largest plan — provides access to providers nationwide, making it possible for New York State employees and their family members to seek treatment at Northbound's California facilities. Coverage under NYSHIP is subject to New York State's strong behavioral health parity protections, which require comprehensive coverage for mental health and substance use disorder treatment.",
    "Northbound's admissions team has experience working with NYSHIP and The Empire Plan. We contact NYSHIP directly on your behalf to determine your exact coverage — authorized levels of care, prior authorization requirements, and cost-sharing — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Covered", value: "1.2+ Million NY State Members" },
    { icon: "ri-map-pin-2-line", label: "Administered By", value: "NYS Dept. of Civil Service" },
    { icon: "ri-building-line", label: "Primary Plan", value: "The Empire Plan (BCBS/United)" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "SUD + Mental Health Covered" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1–2 Business Days" },
  ],

  coverageHeadline: "What NYSHIP Typically Covers at Northbound",
  coverageIntro:
    "NYSHIP covers addiction treatment at multiple levels of care for eligible New York State members. Specific coverage depends on your NYSHIP plan option — Northbound's team verifies your benefits.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "NYSHIP covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies under NYSHIP's medical necessity criteria. Prior authorization is required and managed by Northbound's admissions team.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "NYSHIP covers residential inpatient treatment for substance use disorders when medically necessary. Length of stay is determined by clinical need and utilization review — Northbound advocates for the full stay required.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of structured daily clinical programming — is typically covered by NYSHIP plans as an intermediate level of care between residential and outpatient treatment.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) — 6 to 12 hours of weekly programming — is covered by most NYSHIP plans. Virtual IOP options are also available for New York State residents who return home following residential treatment.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "New York State and federal law both require NYSHIP to cover mental health treatment at parity with physical health. Co-occurring conditions — PTSD, depression, anxiety — are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "NYSHIP supports ongoing outpatient care following inpatient discharge. Northbound's aftercare coordination helps New York State members transition smoothly back to their home communities with continued support.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your NYSHIP Empire Plan or HMO member ID and your New York State employment or retiree information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts NYSHIP or the relevant plan administrator to confirm your coverage — authorized levels of care, prior authorization, and cost-sharing. Typically completed within one to two business days.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your coverage confirmed and treatment plan ready, you arrive at Northbound's California facility. We manage all ongoing authorizations and utilization reviews throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does NYSHIP cover drug and alcohol rehab?",
      a: "Yes. NYSHIP covers substance use disorder treatment including detox, residential, PHP, and virtual IOP for eligible New York State members. New York State law and federal parity law require comprehensive behavioral health coverage at par with physical health benefits.",
    },
    {
      q: "Does Northbound accept NYSHIP insurance?",
      a: "Yes. Northbound Treatment Services is an accepted provider for eligible NYSHIP members. Our admissions team has experience working with NYSHIP and The Empire Plan's authorization processes.",
    },
    {
      q: "Can a New York State employee come to Northbound in California for treatment?",
      a: "Yes. The Empire Plan — the main NYSHIP plan — provides access to providers nationwide, including Northbound's California facilities. Out-of-state treatment access is a key benefit of The Empire Plan, and many NYSHIP members choose to seek treatment away from home for privacy and focus. Northbound's team confirms your out-of-state access during verification.",
    },
    {
      q: "What is The Empire Plan?",
      a: "The Empire Plan is the primary health insurance plan available to New York State employees through NYSHIP, administered by multiple carriers including BCBS (hospital coverage), UnitedHealthcare (medical/surgical), and Cigna or Empire (mental health/substance use). Coverage under The Empire Plan is among the most comprehensive available to state employees.",
    },
    {
      q: "Does NYSHIP require prior authorization for inpatient rehab?",
      a: "Yes. NYSHIP (particularly The Empire Plan) requires prior authorization for inpatient and residential levels of care. Northbound's admissions team handles all authorization requests before your arrival.",
    },
    {
      q: "Can retired New York State employees use NYSHIP at Northbound?",
      a: "Yes. Eligible retired New York State employees can maintain NYSHIP coverage and use it for addiction treatment at Northbound. Retiree eligibility depends on years of service and retirement status — Northbound's team confirms retiree coverage during verification.",
    },
    {
      q: "Does NYSHIP cover mental health and addiction treatment together?",
      a: "Yes. New York State has strong mental health parity protections. Co-occurring mental health and substance use disorders are covered simultaneously — Northbound's dual-diagnosis program treats both under the same NYSHIP authorization.",
    },
    {
      q: "Can family members of New York State employees use NYSHIP at Northbound?",
      a: "Yes. NYSHIP covers eligible dependents and family members of enrolled state employees. Family member coverage details are confirmed during Northbound's benefits verification process.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function NyshipPage() {
  return <InsurancePageTemplate data={data} />;
}
