import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_bcbs.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Health Net (MHN)", href: "/insurance/health-net/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "First Health", href: "/insurance/first-health/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Family reviewing Blue Cross Blue Shield insurance benefits for addiction treatment at Northbound",
  carrierName: "Blue Cross Blue Shield",
  carrierTagline: "In-network preferred provider",
  heroBody:
    "Blue Cross Blue Shield covers drug and alcohol treatment — including detox, residential, PHP, and virtual IOP — for most of its members across all 50 states. Northbound is an in-network preferred provider with BCBS, which means lower costs and faster authorization.",

  aboutHeadline: "Does Blue Cross Blue Shield Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Blue Cross Blue Shield (BCBS) provides coverage for drug and alcohol treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) programs for most of its plan members. As the nation's largest health insurance association covering 1 in 3 Americans across all 50 states, BCBS has extensive behavioral health coverage aligned with federal mental health parity requirements.",
    "BCBS operates through a network of 36 independent regional plans — meaning your specific coverage depends on your state's BCBS plan and your individual policy. Despite this regional structure, most BCBS plans provide comparable behavioral health benefits. Northbound's admissions team contacts BCBS directly on your behalf to determine exactly what your policy covers, at no cost to you.",
    "As an in-network preferred provider, Northbound's negotiated rates with BCBS mean your out-of-pocket costs are significantly lower than choosing an out-of-network facility. A majority of Northbound clients with BCBS coverage pay little to nothing out-of-pocket for treatment.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "~108 Million Members" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "All 50 States" },
    { icon: "ri-building-line", label: "Network Plans", value: "36 Regional Plans" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "In-Network Preferred Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "Covers SUD + Mental Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What BCBS Typically Covers at Northbound",
  coverageIntro:
    "BCBS covers most levels of addiction treatment at Northbound as an in-network provider. Coverage is determined by your specific regional plan and medical necessity — Northbound's team handles the verification.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Most BCBS plans cover medically supervised detox. Northbound's IMS-certified detox program in Garden Grove qualifies as an in-network benefit. Approved length of stay is based on clinical necessity and substance type.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Most BCBS plans include residential treatment coverage. As an in-network provider, Northbound's negotiated rates apply — meaning lower copays and coinsurance for you. Length of stay is determined by medical necessity.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "BCBS covers PHP as a structured intermediate level of care. Northbound's PHP provides up to 6 hours of daily clinical programming and is typically covered at in-network rates.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) — 6 to 12 hours of weekly structured treatment — is covered by most BCBS plans. Flexible scheduling allows clients to maintain work or family obligations.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "BCBS is required by federal law to cover mental health treatment on equal terms with physical health. Co-occurring disorders — PTSD, depression, anxiety, bipolar — are treated alongside addiction at Northbound under the same authorization.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "BCBS supports continuity of care following residential or PHP discharge, including ongoing outpatient therapy. Northbound's aftercare coordination and alumni programs align with this model.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team by phone or submit the verification form. You'll need your BCBS member ID, group number, and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our benefits team contacts your regional BCBS plan directly to determine your exact coverage — deductible status, copays, coinsurance, and covered levels of care. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With coverage confirmed and your treatment plan ready, you check in to Northbound. Our team manages all utilization reviews and authorizations throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does Blue Cross Blue Shield cover drug and alcohol rehab?",
      a: "Yes. BCBS covers drug and alcohol rehabilitation including detox, residential, PHP, and virtual IOP under most plan types. Coverage for mental health is required under federal parity law. Specific benefits vary by your regional BCBS plan and policy — Northbound verifies your benefits directly at no cost to you.",
    },
    {
      q: "Is Northbound in-network with Blue Cross Blue Shield?",
      a: "Yes. Northbound Treatment Services is an in-network preferred provider with Blue Cross Blue Shield. This means your treatment costs are based on negotiated in-network rates, significantly reducing your out-of-pocket expenses.",
    },
    {
      q: "Does my BCBS plan from one state work at Northbound in California?",
      a: "In most cases, yes. BCBS operates a BlueCard program that allows members from any state to access in-network providers nationwide. Your home-state BCBS plan's in-network rates typically apply at Northbound through this program. Northbound's team confirms your BlueCard eligibility during benefits verification.",
    },
    {
      q: "Does BCBS require pre-authorization for inpatient treatment?",
      a: "Yes. Most BCBS plans require pre-certification before admission for inpatient or residential treatment. Northbound's admissions team handles this process on your behalf — we manage all authorization requirements before your arrival.",
    },
    {
      q: "What is a deductible?",
      a: "Your deductible is the amount you pay out-of-pocket before BCBS begins covering a larger share of your costs. Once your deductible is met, coinsurance applies. Northbound reviews your deductible status during verification to give you an accurate cost estimate.",
    },
    {
      q: "How long does BCBS approve for residential treatment?",
      a: "Approved length of stay varies by clinical necessity, plan type, and utilization review outcomes. Northbound's clinical team advocates for the full treatment duration medically appropriate for your recovery.",
    },
    {
      q: "Can BCBS cut my coverage short during treatment?",
      a: "BCBS conducts utilization reviews throughout treatment to verify medical necessity. Northbound's team manages all ongoing reviews and advocates strongly for continued coverage when clinically warranted.",
    },
    {
      q: "Does Northbound accept BCBS Medicaid plans?",
      a: "Northbound does not accept Medicaid in its standard programs. Northbound accepts BCBS commercial, employer-sponsored, and Medicare Advantage plans. Our admissions team can confirm whether your specific BCBS plan qualifies.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function BcbsPage() {
  return <InsurancePageTemplate data={data} />;
}
