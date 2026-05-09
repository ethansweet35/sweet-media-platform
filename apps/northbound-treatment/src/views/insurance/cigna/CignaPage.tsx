import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_cigna.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Blue Cross Blue Shield", href: "/insurance/blue-cross-blue-shield/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "First Health", href: "/insurance/first-health/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Healthcare professional verifying Cigna insurance coverage for addiction treatment",
  carrierName: "Cigna",
  carrierTagline: "In-network preferred provider",
  heroBody:
    "Cigna covers drug and alcohol treatment — including detox, residential, PHP, and IOP — for most of its members. Northbound is an in-network preferred provider with Cigna, ensuring lower out-of-pocket costs and faster prior authorization.",

  aboutHeadline: "Does Cigna Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Cigna provides coverage for drug and alcohol treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs for most of its plan members. As one of the largest health insurance companies in the United States, Cigna offers behavioral health coverage through its subsidiary Evernorth, with strong parity protections for substance use and mental health treatment.",
    "Cigna's coverage depends on your specific plan type — employer-sponsored, individual marketplace, or Cigna Medicare Advantage — as well as your deductible status and medical necessity determination. Northbound's admissions team contacts Cigna directly on your behalf to determine exactly what your policy covers, at no cost to you.",
    "As an in-network preferred provider with Cigna, Northbound's negotiated rates mean your out-of-pocket costs are significantly lower than an out-of-network facility. A majority of Northbound clients with Cigna coverage receive substantial coverage — and many pay little to nothing out-of-pocket.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "~17 Million+ Customers" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "National + International" },
    { icon: "ri-building-line", label: "Behavioral Health Arm", value: "Evernorth" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "In-Network Preferred Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "Covers SUD + Mental Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What Cigna Typically Covers at Northbound",
  coverageIntro:
    "Cigna covers most levels of addiction treatment at Northbound as an in-network provider. Coverage is verified by Northbound's team — at no cost to you — before your arrival.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Cigna covers medically supervised detox under most plan types. Northbound's IMS-certified detox program in Garden Grove qualifies as an in-network benefit. Approved length of stay is based on clinical necessity.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Most Cigna plans include residential treatment coverage. As an in-network provider, Northbound's negotiated rates significantly reduce your out-of-pocket cost. Length of stay is clinically determined and advocated by Northbound's team.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "Cigna covers PHP as a structured intermediate level of care. Northbound's PHP provides up to 6 hours of daily clinical programming — typically covered at in-network rates.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly programming — is covered under most Cigna plans. Day and evening scheduling helps clients balance treatment with work or family responsibilities.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Cigna is required under federal law to cover mental health treatment on equal terms with physical health. Co-occurring conditions such as PTSD, anxiety, depression, and bipolar disorder are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Cigna supports continuity of care after residential or PHP discharge, including outpatient therapy. Northbound's aftercare coordination and alumni programs support a long-term recovery beyond formal treatment.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team by phone or use the verification form. You'll need your Cigna member ID and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts Cigna (Evernorth) directly to confirm your coverage — deductible status, copays, coinsurance, covered levels of care, and authorized length of stay. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With coverage confirmed and your treatment plan ready, you arrive at Northbound. We manage all utilization reviews and ongoing authorizations throughout your stay — you focus entirely on recovery.",
    },
  ],

  faqs: [
    {
      q: "Does Cigna cover drug and alcohol rehab?",
      a: "Yes. Cigna covers drug and alcohol rehabilitation including detox, residential, PHP, and IOP under most plan types. Federal law also requires Cigna to cover mental health treatment on equal terms with physical health. Your specific benefits depend on your plan — Northbound verifies your Cigna benefits directly at no cost.",
    },
    {
      q: "Is Northbound in-network with Cigna?",
      a: "Yes. Northbound Treatment Services is an in-network preferred provider with Cigna. Your treatment is billed at negotiated in-network rates, significantly reducing your out-of-pocket costs.",
    },
    {
      q: "What is Evernorth and how does it relate to my Cigna coverage?",
      a: "Evernorth is Cigna's health services subsidiary that manages behavioral health and pharmacy benefits for many Cigna plan members. If your Cigna plan uses Evernorth for behavioral health, Northbound's admissions team has experience navigating Evernorth authorization requirements on your behalf.",
    },
    {
      q: "Does Cigna require pre-authorization for inpatient treatment?",
      a: "Yes. Most Cigna plans require prior authorization before admission for inpatient or residential levels of care. Northbound's admissions team handles all authorization requests on your behalf before your arrival.",
    },
    {
      q: "What is a deductible, and does it affect my Cigna rehab coverage?",
      a: "Your deductible is the amount you pay out-of-pocket before Cigna begins covering a larger share of costs. Once met, coinsurance rates apply — often very low for in-network services. Northbound checks your deductible status during verification.",
    },
    {
      q: "Can Cigna reduce or end my treatment coverage early?",
      a: "Cigna conducts utilization reviews during treatment to verify ongoing medical necessity. Northbound's clinical team manages all review requests and advocates for continued coverage when clinically appropriate throughout your full treatment stay.",
    },
    {
      q: "Does Northbound accept Cigna employer group plans?",
      a: "Yes. Northbound accepts most Cigna employer-sponsored group plans, as well as individual marketplace and Medicare Advantage plans. The specific benefits under your employer group plan are verified during the pre-admission process.",
    },
    {
      q: "How long will Cigna approve for residential treatment?",
      a: "Approved length of stay is based on clinical necessity, your specific Cigna plan, and utilization review outcomes. Northbound's clinical team advocates for the full treatment duration medically appropriate for a successful recovery.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function CignaPage() {
  return <InsurancePageTemplate data={data} />;
}
