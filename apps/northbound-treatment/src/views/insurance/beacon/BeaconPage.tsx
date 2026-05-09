import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_beacon.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "MHN", href: "/insurance/mhn/" },
  { name: "First Health", href: "/insurance/first-health/" },
  { name: "Health Net", href: "/insurance/health-net/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Behavioral health professional reviewing Beacon Health Options insurance coverage with a client",
  carrierName: "Beacon Health Options",
  carrierTagline: "Behavioral health coverage accepted",
  heroBody:
    "Beacon Health Options covers drug and alcohol treatment — including detox, residential, PHP, and IOP — for most plan members. Northbound is an accepted provider with Beacon, ensuring your behavioral health benefits are put to full use.",

  aboutHeadline: "Does Beacon Health Options Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Beacon Health Options (now part of Carelon Behavioral Health) provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and intensive outpatient (IOP) programs. As one of the nation's leading behavioral health managed care organizations, Beacon specializes specifically in mental health and substance use disorder coverage.",
    "Beacon does not typically sell direct insurance plans — instead, it manages behavioral health benefits on behalf of large health plans, Medicaid managed care organizations, and employers. If your insurer uses Beacon to administer behavioral health benefits, Beacon is who Northbound contacts for authorization and utilization management. Our admissions team determines whether your coverage runs through Beacon during the verification process.",
    "Northbound's admissions team has extensive experience working with Beacon's authorization processes. We contact Beacon directly on your behalf to confirm your exact benefits and secure pre-authorization before your arrival — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Managed", value: "36+ Million Lives" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "National" },
    { icon: "ri-building-line", label: "Parent Organization", value: "Carelon Behavioral Health" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Specialty", value: "Behavioral Health Only" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What Beacon Typically Covers at Northbound",
  coverageIntro:
    "Beacon covers behavioral health treatment including addiction at most levels of care. Your specific benefits depend on the health plan that uses Beacon for behavioral health management — Northbound's team confirms your exact coverage.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Beacon covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies. Beacon requires clinical necessity documentation — our team manages this.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Beacon covers residential inpatient treatment for substance use disorders when medically necessary. Length of stay is subject to Beacon's utilization management process — Northbound advocates for the full treatment duration needed.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "Beacon covers PHP as a structured step-down from residential care. Northbound's PHP meets Beacon's clinical criteria for this level of care, providing up to 6 hours of daily programming.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Intensive Outpatient (IOP)",
      detail:
        "IOP at Northbound — 6 to 12 hours of weekly structured programming — is covered by most Beacon-managed plans. Beacon often encourages IOP as a cost-effective alternative to higher levels of care when clinically appropriate.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "As a behavioral health specialist, Beacon has strong coverage for co-occurring mental health conditions alongside substance use disorders. PTSD, depression, anxiety, and bipolar disorder are all covered under Northbound's dual-diagnosis program.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Beacon supports ongoing outpatient care following residential or PHP discharge. Northbound's aftercare coordination and alumni programs help sustain recovery after formal treatment ends.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or submit the verification form. You'll need your insurance card — Northbound's team will identify whether your behavioral health benefits run through Beacon.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts Beacon Health Options directly to confirm your coverage — authorized levels of care, prior authorization requirements, and cost-sharing. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With authorization in place and your treatment plan ready, you arrive at Northbound. We manage all Beacon utilization reviews throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does Beacon Health Options cover drug and alcohol rehab?",
      a: "Yes. Beacon Health Options covers substance use disorder treatment including detox, residential, PHP, and IOP. Federal parity law requires Beacon to cover behavioral health treatment on equal terms with physical health. Your specific benefits depend on the health plan that uses Beacon for behavioral health management.",
    },
    {
      q: "How do I know if my insurance uses Beacon Health Options?",
      a: "Beacon manages behavioral health benefits for many large health plans. If your insurance card or plan documents reference Beacon, Carelon Behavioral Health, or a Beacon phone number for behavioral health claims — your benefits likely run through Beacon. Northbound's team identifies this during verification.",
    },
    {
      q: "Is Northbound an accepted provider with Beacon Health Options?",
      a: "Yes. Northbound Treatment Services is an accepted provider with Beacon Health Options (Carelon Behavioral Health). Our admissions team has experience navigating Beacon's authorization and utilization management processes.",
    },
    {
      q: "Does Beacon require prior authorization for inpatient rehab?",
      a: "Yes. Beacon typically requires pre-authorization for inpatient and residential levels of care. Northbound's admissions team handles all authorization requests on your behalf before your arrival.",
    },
    {
      q: "What is utilization management and how does Beacon use it?",
      a: "Utilization management (UM) is the process by which insurance companies review whether treatment is medically necessary and appropriate. Beacon conducts ongoing UM reviews during inpatient and residential treatment. Northbound's clinical team manages all review requests and advocates for continued coverage throughout your stay.",
    },
    {
      q: "Can Beacon cut my treatment coverage short?",
      a: "Beacon conducts regular utilization reviews to verify medical necessity throughout treatment. Northbound's team actively manages all reviews and appeals any decisions to reduce or end coverage when continued treatment is clinically warranted.",
    },
    {
      q: "Does Northbound accept Beacon for both mental health and addiction treatment?",
      a: "Yes. Northbound's dual-diagnosis program treats co-occurring mental health and substance use disorders simultaneously — both typically covered under Beacon's behavioral health benefits.",
    },
    {
      q: "What is Carelon Behavioral Health?",
      a: "Carelon Behavioral Health is the new brand name for Beacon Health Options following its acquisition by Elevance Health (formerly Anthem). If your plan references Carelon Behavioral Health, your benefits are managed through the same organization as Beacon — and Northbound accepts both.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function BeaconPage() {
  return <InsurancePageTemplate data={data} />;
}
