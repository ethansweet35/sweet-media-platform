import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_anthem.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Blue Cross Blue Shield", href: "/insurance/blue-cross-blue-shield/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "Health Net (MHN)", href: "/insurance/health-net/" },
  { name: "Magellan", href: "/insurance/magellan/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Northbound admissions counselor reviewing Anthem insurance benefits with a client",
  carrierName: "Anthem",
  carrierTagline: "In-network preferred provider",
  heroBody:
    "Anthem covers drug and alcohol treatment — including detox, residential, PHP, and virtual IOP — for most of its members. Northbound is an in-network preferred provider with Anthem, which means lower costs and streamlined authorization for you.",

  aboutHeadline: "Does Anthem Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Anthem Blue Cross Blue Shield provides coverage for drug and alcohol treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) services for most of its plan members. As one of the nation's largest health insurers with coverage across most states, Anthem provides robust behavioral health coverage aligned with the Mental Health Parity and Addiction Equity Act.",
    "Anthem's plans vary significantly — from employer-sponsored group plans to individual marketplace plans and Medicare Advantage — and your specific coverage depends on your plan type, deductible status, and medical necessity determination. Northbound's admissions team contacts Anthem directly on your behalf to determine exactly what your policy covers before you arrive, at no cost to you.",
    "As an in-network preferred provider with Anthem, Northbound's negotiated rates mean your out-of-pocket costs are significantly lower than using an out-of-network facility. A majority of Northbound clients with Anthem coverage pay substantially less — and in many cases nothing — out-of-pocket.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "~45 Million Members" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "14 States + National" },
    { icon: "ri-building-line", label: "Part of", value: "Elevance Health (BCBS)" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "In-Network Preferred Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "Covers SUD + Mental Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What Anthem Typically Covers at Northbound",
  coverageIntro:
    "Anthem covers most levels of addiction treatment at Northbound as an in-network provider. Coverage is determined by your specific plan and medical necessity — Northbound's team handles this verification for you.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Anthem covers medically supervised detox under most plan types. Our IMS-certified detox program in Garden Grove qualifies as an in-network covered benefit. Length of stay is determined by clinical necessity and the substance being treated.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Most Anthem plans include residential treatment coverage. As an in-network provider, Northbound's negotiated rates apply — meaning lower copays and coinsurance for you. Length of stay is determined by clinical need and ongoing utilization reviews.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "Anthem covers PHP as a structured intermediate level of care. Northbound's PHP provides up to 6 hours of daily clinical programming — typically covered at in-network rates with minimal out-of-pocket cost.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) — 6 to 12 hours of weekly clinical sessions — is covered by most Anthem plans. Day and evening scheduling options allow clients to maintain work or family obligations while continuing treatment.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Federal parity law requires Anthem to cover mental health treatment on equal terms with physical health. Co-occurring conditions like PTSD, anxiety, depression, and bipolar disorder are treated alongside addiction at Northbound under the same authorization.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Anthem supports continuity of care — including ongoing outpatient therapy following residential or PHP discharge. Northbound's aftercare coordination and alumni programs align with Anthem's continuing care coverage model.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team by phone or submit the verification form on this page. You'll need your Anthem member ID and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our benefits team contacts Anthem directly to determine your exact coverage — deductible status, copay, coinsurance, covered levels of care, and authorized length of stay. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your coverage confirmed and your treatment plan in place, you check in to Northbound. Our team handles all utilization reviews and ongoing authorizations throughout your stay — you focus on recovery.",
    },
  ],

  faqs: [
    {
      q: "Does Anthem cover drug and alcohol rehab?",
      a: "Yes. Anthem covers drug and alcohol rehabilitation across most plan types, including inpatient, residential, detox, PHP, and virtual IOP. Coverage for mental health treatment is required under federal parity law. Your specific benefits — deductible, copays, coinsurance — depend on your individual plan. Northbound verifies your Anthem benefits directly at no cost to you.",
    },
    {
      q: "Is Northbound in-network with Anthem?",
      a: "Yes. Northbound Treatment Services is an in-network preferred provider with Anthem Blue Cross Blue Shield. This means your treatment is billed at negotiated in-network rates, significantly reducing your out-of-pocket costs compared to using an out-of-network provider.",
    },
    {
      q: "What is the difference between in-network and out-of-network?",
      a: "In-network providers have pre-negotiated rates with your insurer, meaning you pay a lower, predetermined share of costs. Out-of-network providers are billed at higher rates with less predictable cost-sharing. As an Anthem in-network provider, Northbound ensures you receive maximum benefit from your coverage.",
    },
    {
      q: "Does Anthem require pre-authorization for inpatient treatment?",
      a: "Yes. Most Anthem plans require pre-certification before admission for inpatient and residential levels of care. Northbound's admissions team manages this process on your behalf before your arrival — we are experienced in Anthem's authorization requirements and will handle all necessary approvals.",
    },
    {
      q: "What is a deductible, and how does it affect my Anthem coverage?",
      a: "Your deductible is the amount you must pay out-of-pocket before Anthem begins covering a larger share of costs. Once your deductible is met, Anthem's coinsurance rates apply. Northbound's team checks your deductible status during benefits verification to give you an accurate picture of your cost responsibility.",
    },
    {
      q: "Can Anthem reduce or cut short my treatment coverage?",
      a: "Insurance companies conduct utilization reviews throughout treatment. Northbound's clinical team manages all ongoing authorization requests and advocates strongly for continued coverage when clinically warranted. We work to keep your benefits intact throughout your full course of treatment.",
    },
    {
      q: "Do Anthem Medicaid plans cover addiction treatment at Northbound?",
      a: "Northbound does not accept Medicaid in its standard programs. However, Anthem commercial plans, Medicare Advantage, and employer-sponsored group plans are accepted. Northbound's admissions team can help confirm whether your specific Anthem plan type qualifies for coverage.",
    },
    {
      q: "How long does Anthem approve for residential treatment?",
      a: "Approved length of stay varies by clinical necessity, plan type, and Anthem's utilization review decisions. Northbound's clinical team determines the medically appropriate length of stay and advocates on your behalf for the full treatment duration needed for a successful recovery.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function AnthemPage() {
  return <InsurancePageTemplate data={data} />;
}
