import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_usamco.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "First Health", href: "/insurance/first-health/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Admissions coordinator reviewing USAMCO managed care insurance documentation for addiction treatment",
  carrierName: "USAMCO",
  carrierTagline: "Managed care coverage — accepted at Northbound",
  heroBody:
    "USAMCO provides managed care coverage for addiction treatment — including detox, residential, PHP, and IOP. Northbound is an accepted provider with USAMCO, and our admissions team navigates the authorization process on your behalf.",

  aboutHeadline: "Does USAMCO Cover Addiction Treatment?",
  aboutBody: [
    "Yes — USAMCO provides managed care coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs for eligible members. USAMCO is a managed care organization that works with employers, health plans, and third-party administrators to manage behavioral health and medical benefits for their covered populations.",
    "Coverage under USAMCO depends on the specific plan or employer arrangement you are enrolled in. Like many managed care organizations, USAMCO manages utilization and authorizes care on behalf of the underlying health plan. Federal mental health parity law requires coverage for behavioral health treatment on equal terms with physical health for most USAMCO-managed plans.",
    "Northbound's admissions team accepts USAMCO coverage and is experienced working with managed care organization authorization processes. We contact USAMCO directly on your behalf to determine your exact benefits and secure pre-authorization before your arrival — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Organization Type", value: "Managed Care Organization" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "National" },
    { icon: "ri-building-line", label: "Serves", value: "Employers, Plans & TPAs" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Coverage", value: "Medical + Behavioral Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What USAMCO Typically Covers at Northbound",
  coverageIntro:
    "USAMCO-managed plans cover addiction treatment at multiple levels of care. Your specific benefits depend on your underlying health plan — Northbound's team verifies your exact coverage before admission.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "USAMCO covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies under managed care medical necessity standards. Prior authorization is typically required.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Residential inpatient treatment is covered by most USAMCO-managed plans when medically necessary. Length of stay is subject to utilization review — Northbound advocates for the full clinically appropriate duration.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of structured daily clinical programming — is typically covered as an intermediate level of care under USAMCO-managed plans.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly programming — is covered by most USAMCO-managed plans as a clinically appropriate step-down from residential or PHP.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Federal mental health parity law applies to most USAMCO-managed plans. Co-occurring mental health conditions — depression, anxiety, PTSD — are treated alongside substance use disorders at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "USAMCO-managed plans support ongoing outpatient care following inpatient discharge. Northbound's aftercare coordination helps clients transition smoothly from residential treatment to community-based recovery.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your USAMCO member ID or insurance card and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts USAMCO directly to confirm your coverage — authorized levels of care, prior authorization requirements, and cost-sharing. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your coverage confirmed and treatment plan ready, you arrive at Northbound. We manage all ongoing utilization reviews and authorizations throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does USAMCO cover drug and alcohol rehab?",
      a: "Yes. USAMCO managed care plans cover substance use disorder treatment including detox, residential, PHP, and IOP when medically necessary. Federal parity law requires behavioral health coverage at par with physical health for most managed care plans. Your specific benefits depend on your underlying plan — Northbound verifies your coverage at no cost.",
    },
    {
      q: "Does Northbound accept USAMCO?",
      a: "Yes. Northbound Treatment Services accepts USAMCO managed care coverage. Our admissions team has experience working with managed care organization authorization and utilization management processes.",
    },
    {
      q: "What is a managed care organization (MCO) like USAMCO?",
      a: "A managed care organization coordinates health services and manages costs by overseeing the network of providers, authorizing care, and conducting utilization management. USAMCO works on behalf of employers, health plans, and third-party administrators to manage member benefits and ensure appropriate use of healthcare services.",
    },
    {
      q: "Does USAMCO require prior authorization for inpatient treatment?",
      a: "Yes. Most USAMCO-managed plans require prior authorization for inpatient and residential levels of care. Northbound's admissions team manages all authorization requests before your arrival.",
    },
    {
      q: "Can USAMCO reduce my treatment coverage during my stay?",
      a: "USAMCO conducts utilization reviews throughout treatment to verify ongoing medical necessity. Northbound's clinical team manages all review requests and advocates for continued coverage when continued treatment is clinically warranted.",
    },
    {
      q: "How do I find out if my plan uses USAMCO?",
      a: "Your insurance card or plan documents may reference USAMCO. If USAMCO is listed as your plan administrator or utilization management organization, your benefits run through USAMCO. Northbound's admissions team can also identify this during the initial verification inquiry.",
    },
    {
      q: "Does USAMCO cover both mental health and addiction treatment?",
      a: "Yes. Most USAMCO-managed plans cover co-occurring mental health and substance use disorders under federal parity requirements. Northbound's dual-diagnosis program treats both conditions simultaneously under the same authorization.",
    },
    {
      q: "Can Northbound verify my USAMCO benefits for free before I decide?",
      a: "Yes. Northbound's admissions team provides free benefits verification — we contact USAMCO directly to confirm your coverage, cost-sharing, and authorized levels of care before you make any commitment to treatment. Call (866) 311-0003 or use the verification form on this page.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function UsamcoPage() {
  return <InsurancePageTemplate data={data} />;
}
