import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_healthnet.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "MHN", href: "/insurance/mhn/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "First Health", href: "/insurance/first-health/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Healthcare professional reviewing Health Net insurance network coverage for addiction treatment",
  carrierName: "Health Net",
  carrierTagline: "In-network preferred provider",
  heroBody:
    "Health Net covers drug and alcohol treatment — including detox, residential, PHP, and IOP — for most of its California and national plan members. Northbound is an in-network preferred provider with Health Net, ensuring lower out-of-pocket costs and streamlined authorization.",

  aboutHeadline: "Does Health Net Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Health Net provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs for most of its plan members. As a major health insurer with deep roots in California and a strong network nationally, Health Net provides behavioral health coverage with parity protections aligned with state and federal law.",
    "Health Net's behavioral health benefits are managed through its subsidiary Mental Health Network (MHN) for many plan members. Whether your behavioral health claims go through Health Net directly or through MHN, Northbound's team has experience with both authorization processes. Your specific coverage depends on your plan type — HMO, PPO, or employer-sponsored — and your deductible status.",
    "As an in-network preferred provider with Health Net, Northbound's negotiated rates significantly reduce your out-of-pocket costs compared to out-of-network treatment. Northbound's admissions team contacts Health Net directly on your behalf to confirm your exact benefits — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "Millions in CA + National" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "California + National Plans" },
    { icon: "ri-building-line", label: "Behavioral Health Arm", value: "MHN (Mental Health Network)" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "In-Network Preferred Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "Covers SUD + Mental Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What Health Net Typically Covers at Northbound",
  coverageIntro:
    "Health Net covers most levels of addiction treatment at Northbound as an in-network provider. Coverage is verified by Northbound's team — at no cost to you — before your arrival.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Health Net covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program in Garden Grove qualifies as an in-network benefit. Length of stay is determined by clinical necessity.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Most Health Net plans cover residential treatment for substance use disorders. As an in-network provider, Northbound's rates significantly reduce your out-of-pocket cost. Length of stay is determined clinically.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "Health Net covers PHP as a structured intermediate level of care. Northbound's PHP — up to 6 hours of daily programming — is typically covered at in-network rates.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly clinical programming — is covered by most Health Net plans. Day and evening options help clients balance treatment with work and family.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Health Net and MHN are required under state and federal law to cover mental health treatment at parity with physical health. Co-occurring conditions — PTSD, depression, anxiety — are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Health Net supports ongoing outpatient care following residential or PHP discharge. Northbound's aftercare coordination and alumni programs align with Health Net's continuing care coverage model.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your Health Net member ID and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts Health Net or MHN directly to confirm your coverage — deductible status, copays, coinsurance, covered levels of care, and prior authorization requirements. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your coverage confirmed and treatment plan ready, you arrive at Northbound. We manage all ongoing utilization reviews throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does Health Net cover drug and alcohol rehab?",
      a: "Yes. Health Net covers substance use disorder treatment including detox, residential, PHP, and IOP under most plan types. Federal and California state law require Health Net to cover behavioral health at parity with physical health. Your specific benefits depend on your plan — Northbound verifies your coverage at no cost.",
    },
    {
      q: "Is Northbound in-network with Health Net?",
      a: "Yes. Northbound Treatment Services is an in-network preferred provider with Health Net. Your treatment is billed at negotiated in-network rates, significantly reducing your out-of-pocket costs.",
    },
    {
      q: "What is MHN and how does it relate to my Health Net coverage?",
      a: "MHN (Mental Health Network) is Health Net's behavioral health subsidiary that manages mental health and substance use disorder benefits for many Health Net plan members. If your Health Net plan uses MHN for behavioral health, MHN handles authorization and utilization management. Northbound's team has experience working with both Health Net and MHN.",
    },
    {
      q: "Does Health Net require prior authorization for inpatient rehab?",
      a: "Yes. Most Health Net plans require pre-authorization for inpatient and residential treatment. Northbound's admissions team handles all authorization requests on your behalf before your arrival.",
    },
    {
      q: "What is coinsurance, and what does Health Net cover for inpatient rehab?",
      a: "Coinsurance is your percentage share of costs after your deductible is met. As an in-network provider, Northbound's negotiated rates apply — meaning your coinsurance share is based on the contracted rate, not a higher out-of-network rate. Your specific coinsurance percentage is identified during benefits verification.",
    },
    {
      q: "Can Health Net reduce my coverage during treatment?",
      a: "Health Net and MHN conduct utilization reviews throughout treatment to verify ongoing medical necessity. Northbound's clinical team manages all review requests and advocates for continued coverage when clinically appropriate.",
    },
    {
      q: "Does Health Net cover treatment for both addiction and mental health together?",
      a: "Yes. Health Net and MHN cover co-occurring mental health and substance use disorders. California's mental health parity law (SB 855) is among the strongest in the country, requiring comprehensive behavioral health coverage — Northbound's dual-diagnosis program is well-positioned to work within this framework.",
    },
    {
      q: "Does Northbound accept Health Net Covered California plans?",
      a: "Northbound's team confirms eligibility for Covered California Health Net marketplace plans during the verification process. Individual marketplace plans may have different network configurations — confirming in-network access is part of Northbound's standard verification.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function HealthNetPage() {
  return <InsurancePageTemplate data={data} />;
}
