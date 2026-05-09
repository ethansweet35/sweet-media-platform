import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_mhn.jpg";

const OTHER_CARRIERS = [
  { name: "Health Net", href: "/insurance/health-net/" },
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "First Health", href: "/insurance/first-health/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Mental health professional reviewing MHN insurance coverage for addiction treatment with a patient",
  carrierName: "MHN",
  carrierTagline: "Mental Health Network — accepted at Northbound",
  heroBody:
    "MHN (Mental Health Network) is Health Net's behavioral health subsidiary covering mental health and addiction treatment for millions of plan members in California and nationally. Northbound is an in-network provider with MHN, ensuring streamlined authorization and lower out-of-pocket costs.",

  aboutHeadline: "Does MHN Cover Addiction Treatment?",
  aboutBody: [
    "Yes — MHN (Mental Health Network) provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs for eligible Health Net plan members. MHN is Health Net's specialized behavioral health subsidiary, managing mental health and addiction treatment benefits for millions of members in California and across the country.",
    "If you have Health Net insurance, your behavioral health benefits — including addiction treatment — are likely managed through MHN. MHN handles prior authorization and utilization management for all behavioral health services. California's strong mental health parity law (SB 855) requires MHN to cover substance use disorder treatment comprehensively, at par with physical health benefits.",
    "As an in-network provider with MHN, Northbound's negotiated rates significantly reduce your out-of-pocket costs. Northbound's admissions team contacts MHN directly on your behalf to determine your exact coverage — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "Health Net Members in CA + National" },
    { icon: "ri-map-pin-2-line", label: "Primary Coverage Area", value: "California + National" },
    { icon: "ri-building-line", label: "Parent Organization", value: "Health Net" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "In-Network Provider" },
    { icon: "ri-hospital-line", label: "Specialty", value: "Behavioral Health Only" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What MHN Typically Covers at Northbound",
  coverageIntro:
    "MHN covers most levels of addiction treatment at Northbound as an in-network provider. Your specific benefits depend on your Health Net plan — Northbound's team verifies your coverage before admission.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "MHN covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program in Garden Grove qualifies as an in-network benefit. Prior authorization is required and managed by Northbound's team.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "MHN covers residential inpatient treatment for substance use disorders when medically necessary. As an in-network provider, Northbound's rates significantly lower your cost. Length of stay is determined clinically.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of daily structured clinical programming — is covered by most MHN plans as an intermediate level of care.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly programming — is covered by most MHN plans. Flexible scheduling supports clients maintaining work and family obligations.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "As a behavioral health specialist, MHN covers co-occurring mental health and substance use disorders. California SB 855 provides comprehensive parity protections — PTSD, depression, and anxiety are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "MHN supports ongoing outpatient care following inpatient discharge. Northbound's aftercare coordination and alumni programs align with MHN's continuity of care model.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your Health Net member ID — Northbound's team will confirm MHN as your behavioral health administrator.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts MHN directly to confirm your coverage — deductible status, copays, coinsurance, authorized levels of care, and prior authorization requirements. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With MHN authorization secured and your treatment plan ready, you arrive at Northbound. We manage all utilization reviews and ongoing authorizations throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "What is MHN?",
      a: "MHN (Mental Health Network) is Health Net's behavioral health subsidiary that manages mental health and substance use disorder benefits for Health Net plan members. If you have Health Net insurance, your behavioral health benefits — including addiction treatment — are likely administered through MHN.",
    },
    {
      q: "Does MHN cover drug and alcohol rehab?",
      a: "Yes. MHN covers substance use disorder treatment including detox, residential, PHP, and IOP for eligible Health Net members. California's strong mental health parity law (SB 855) requires comprehensive coverage for behavioral health at par with physical health.",
    },
    {
      q: "Is Northbound in-network with MHN?",
      a: "Yes. Northbound Treatment Services is an in-network provider with MHN (Mental Health Network). Your treatment is billed at negotiated in-network rates, reducing your out-of-pocket costs.",
    },
    {
      q: "Does MHN require prior authorization for inpatient treatment?",
      a: "Yes. MHN requires pre-authorization for inpatient and residential levels of care. Northbound's admissions team handles all authorization requests before your arrival.",
    },
    {
      q: "How is MHN different from Health Net?",
      a: "Health Net is the primary health insurer handling medical and surgical benefits. MHN is Health Net's behavioral health subsidiary that separately manages mental health and substance use disorder benefits. Your mental health and addiction treatment claims go through MHN, while medical claims go through Health Net. Northbound's team works with both.",
    },
    {
      q: "Does California's parity law help my MHN coverage?",
      a: "Yes. California SB 855 is one of the strongest mental health parity laws in the nation. It requires MHN to cover substance use disorder and mental health treatment on equal terms with physical health — including inpatient, residential, and outpatient levels of care. This provides strong protections for Northbound clients with MHN coverage.",
    },
    {
      q: "Can MHN reduce my treatment coverage during my stay?",
      a: "MHN conducts utilization reviews throughout treatment. Northbound's clinical team manages all review processes and advocates for continued coverage when continued treatment is medically necessary.",
    },
    {
      q: "Does MHN cover treatment for co-occurring mental health conditions?",
      a: "Yes. MHN specializes in behavioral health — co-occurring mental health conditions like PTSD, depression, and anxiety are covered alongside substance use disorders. Northbound's dual-diagnosis program addresses both simultaneously under the same MHN authorization.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function MhnPage() {
  return <InsurancePageTemplate data={data} />;
}
