import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_magellan.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "MHN", href: "/insurance/mhn/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "First Health", href: "/insurance/first-health/" },
  { name: "Health Net", href: "/insurance/health-net/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Clinical case manager reviewing Magellan Health behavioral health coverage with a patient",
  carrierName: "Magellan Health",
  carrierTagline: "Behavioral health coverage accepted",
  heroBody:
    "Magellan Health manages behavioral health and addiction treatment benefits for millions of plan members nationwide. Northbound is an accepted provider with Magellan, helping members navigate coverage for detox, residential, PHP, and IOP treatment.",

  aboutHeadline: "Does Magellan Health Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Magellan Health provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs through its behavioral health managed care services. Magellan is one of the nation's largest specialty behavioral health managed care organizations, managing benefits for commercial health plans, government programs, and employer-sponsored plans nationwide.",
    "Magellan does not typically sell direct insurance — instead, it manages behavioral health benefits on behalf of health plans, employers, and government agencies. If your insurer uses Magellan to manage behavioral health, Magellan handles prior authorization and utilization management for mental health and addiction treatment. Northbound's team identifies whether your coverage runs through Magellan during the verification process.",
    "Northbound's admissions team has extensive experience working with Magellan's authorization processes. We contact Magellan directly on your behalf to confirm your exact benefits and secure pre-authorization before your arrival — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Lives Managed", value: "Millions Nationally" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "National + Government Programs" },
    { icon: "ri-building-line", label: "Parent Organization", value: "Molina Healthcare (acquired)" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Specialty", value: "Behavioral Health Management" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What Magellan Typically Covers at Northbound",
  coverageIntro:
    "Magellan-managed plans cover behavioral health treatment including addiction at most levels of care. Your specific benefits depend on the health plan using Magellan — Northbound's team verifies exact coverage.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Magellan covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies under Magellan's criteria. Clinical necessity documentation is required — our team manages this.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Magellan covers residential inpatient treatment for substance use disorders when medically necessary. Length of stay is subject to Magellan's utilization management — Northbound advocates for the full clinically required duration.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of daily structured clinical programming — is covered by most Magellan-managed plans as a step-down from residential care.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly programming — is typically covered by Magellan-managed plans. Magellan often supports IOP as a clinically appropriate alternative to higher levels of care.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "As a behavioral health specialist, Magellan covers co-occurring mental health conditions alongside addiction. PTSD, depression, anxiety, and bipolar disorder are treated at Northbound under the same Magellan authorization.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Magellan supports ongoing outpatient care following inpatient discharge. Northbound's aftercare coordination and alumni programs align with Magellan's model of sustained behavioral health support.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your insurance card — our team will confirm if your behavioral health benefits run through Magellan.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts Magellan Health directly to confirm your coverage — authorized levels of care, prior authorization, and cost-sharing. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With authorization secured and your treatment plan ready, you arrive at Northbound. We manage all Magellan utilization reviews throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does Magellan Health cover drug and alcohol rehab?",
      a: "Yes. Magellan Health covers substance use disorder treatment including detox, residential, PHP, and IOP for most members of health plans that use Magellan for behavioral health management. Federal parity law requires coverage at par with physical health benefits. Your specific benefits depend on your underlying health plan.",
    },
    {
      q: "How do I know if my insurance uses Magellan Health?",
      a: "Your insurance card or plan documents may reference Magellan Health or a Magellan phone number for behavioral health. If your benefits documents list Magellan as the behavioral health administrator, your addiction treatment coverage runs through Magellan. Northbound's team can also identify this during the verification call.",
    },
    {
      q: "Is Northbound an accepted provider with Magellan Health?",
      a: "Yes. Northbound Treatment Services is an accepted provider with Magellan Health. Our admissions team has extensive experience navigating Magellan's authorization and utilization management processes.",
    },
    {
      q: "Does Magellan require prior authorization for inpatient treatment?",
      a: "Yes. Magellan requires prior authorization for inpatient and residential levels of care. Northbound's admissions team handles all authorization requests before your arrival.",
    },
    {
      q: "What is utilization management, and how does Magellan use it?",
      a: "Utilization management (UM) is how Magellan ensures treatment is medically necessary and clinically appropriate. Magellan conducts regular UM reviews during inpatient and residential treatment. Northbound's clinical team manages all review requests and appeals any adverse decisions when continued treatment is clinically warranted.",
    },
    {
      q: "Can Magellan reduce my coverage during treatment?",
      a: "Magellan conducts regular utilization reviews. Northbound's team actively manages these reviews and advocates for continued coverage throughout your stay when treatment is medically appropriate.",
    },
    {
      q: "What government programs use Magellan Health for behavioral health?",
      a: "Magellan manages behavioral health benefits for various state Medicaid programs and government-sponsored health plans. However, Northbound does not accept Medicaid in its standard programs — your eligibility is based on your specific commercial or employer-sponsored plan that uses Magellan.",
    },
    {
      q: "Does Magellan cover treatment for both addiction and mental health?",
      a: "Yes. As a behavioral health specialist, Magellan covers co-occurring substance use and mental health disorders. Northbound's dual-diagnosis program treats both conditions simultaneously under the same Magellan authorization.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function MagellanPage() {
  return <InsurancePageTemplate data={data} />;
}
