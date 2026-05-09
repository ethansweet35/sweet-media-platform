import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_geha.jpg";

const OTHER_CARRIERS = [
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "NYSHIP", href: "/insurance/nyship/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "ILWU", href: "/insurance/ilwu/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Federal government employee reviewing GEHA health benefits for addiction treatment coverage",
  carrierName: "GEHA",
  carrierTagline: "Federal employee health benefits — accepted at Northbound",
  heroBody:
    "GEHA (Government Employees Health Association) provides health coverage for federal employees, retirees, and their families through the Federal Employees Health Benefits (FEHB) Program. Northbound is an accepted provider for GEHA members seeking addiction treatment.",

  aboutHeadline: "Does GEHA Cover Addiction Treatment?",
  aboutBody: [
    "Yes — GEHA provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs for eligible federal employees, retirees, annuitants, and their families through the Federal Employees Health Benefits (FEHB) Program. GEHA is one of the largest nonprofit federal employee health benefits carriers in the country.",
    "GEHA offers several plan options — Standard Option, High Option, HDHP, and others — each with different cost-sharing for behavioral health services. Federal law and FEHB regulations require all GEHA plans to cover mental health and substance use treatment at parity with medical and surgical benefits. Northbound's admissions team confirms which GEHA plan you have and what your specific coverage entails.",
    "Northbound accepts GEHA coverage and has experience working with the FEHB system. Our admissions team contacts GEHA directly on your behalf to determine your exact behavioral health benefits — including authorized levels of care and cost-sharing — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "2+ Million Federal Members" },
    { icon: "ri-map-pin-2-line", label: "Program", value: "Federal Employees Health Benefits (FEHB)" },
    { icon: "ri-building-line", label: "Organization Type", value: "Nonprofit Federal Carrier" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "SUD + Mental Health Covered" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What GEHA Typically Covers at Northbound",
  coverageIntro:
    "GEHA covers most levels of addiction treatment for eligible federal employees and their families. Your specific benefits depend on your GEHA plan option — Northbound's team verifies your coverage.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "GEHA covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program in Garden Grove qualifies. Prior authorization is typically required and managed by Northbound's team.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "GEHA covers residential inpatient treatment for substance use disorders when medically necessary. Length of stay is subject to utilization review — Northbound advocates for the full treatment duration needed.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of structured daily clinical programming — is covered by most GEHA plans as an intermediate level of care between residential and outpatient.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly structured programming — is covered by most GEHA plans. Flexible scheduling supports federal employees balancing treatment with work obligations.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "FEHB regulations require GEHA to cover mental health treatment at parity with physical health. Co-occurring conditions — depression, anxiety, PTSD — are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "GEHA supports ongoing outpatient care following inpatient discharge. Northbound's aftercare coordination and alumni programs help federal employees and their families sustain long-term recovery.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or submit the verification form. You'll need your GEHA member ID, plan option, and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts GEHA directly to confirm your coverage — plan option, deductible status, cost-sharing, covered levels of care, and prior authorization requirements. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your GEHA benefits confirmed and your treatment plan ready, you arrive at Northbound. We manage all ongoing authorizations and utilization reviews throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does GEHA cover drug and alcohol rehab?",
      a: "Yes. GEHA covers substance use disorder treatment including detox, residential, PHP, and IOP under the Federal Employees Health Benefits Program. FEHB regulations require parity between behavioral health and physical health coverage. Your specific benefits depend on your GEHA plan option — Northbound verifies your coverage at no cost.",
    },
    {
      q: "Does Northbound accept GEHA insurance?",
      a: "Yes. Northbound Treatment Services is an accepted provider for GEHA-covered federal employees, retirees, and their families. Our admissions team has experience working with GEHA and the FEHB system.",
    },
    {
      q: "What GEHA plan options cover addiction treatment?",
      a: "GEHA's Standard Option, High Option, and HDHP plans all provide behavioral health coverage including substance use disorder treatment. The level of cost-sharing differs between options — the High Option typically has lower copays for inpatient services. Northbound's team confirms your specific plan's benefits during verification.",
    },
    {
      q: "Does GEHA require prior authorization for inpatient rehab?",
      a: "Yes. Most GEHA plans require prior authorization for inpatient and residential treatment. Northbound's admissions team handles all authorization requests on your behalf before your arrival.",
    },
    {
      q: "Can retired federal employees use GEHA at Northbound?",
      a: "Yes. GEHA covers retired federal employees and federal annuitants through the FEHB Program. Retirees maintain their GEHA coverage and behavioral health benefits into retirement. Northbound's team confirms retiree eligibility during verification.",
    },
    {
      q: "Can family members of federal employees use GEHA at Northbound?",
      a: "Yes. GEHA extends coverage to eligible dependents and family members of enrolled federal employees. Coverage details for dependents are confirmed during Northbound's benefits verification process.",
    },
    {
      q: "Is Northbound's California location accessible for out-of-state federal employees?",
      a: "Yes. Many GEHA plans include national network access, allowing federal employees from across the country to receive treatment at Northbound's California facilities. The nationwide nature of FEHB plans supports out-of-state treatment access — your team confirms network access during verification.",
    },
    {
      q: "How does GEHA work as a self-funded federal plan?",
      a: "GEHA is a nonprofit that participates in the FEHB Program — meaning benefits are set under OPM regulations with GEHA administering the plan. Like self-funded employer plans, GEHA has flexibility in benefit design but must meet all federal parity requirements. This structure means your benefits are typically comprehensive for behavioral health.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function GehaPage() {
  return <InsurancePageTemplate data={data} />;
}
