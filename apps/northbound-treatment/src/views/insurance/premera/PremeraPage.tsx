import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_premera.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Blue Cross Blue Shield", href: "/insurance/blue-cross-blue-shield/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "First Health", href: "/insurance/first-health/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Benefits advisor reviewing Premera Blue Cross coverage for addiction treatment with a client in a Pacific Northwest office",
  carrierName: "Premera Blue Cross",
  carrierTagline: "In-network access for Premera members",
  heroBody:
    "Premera Blue Cross covers drug and alcohol treatment — including detox, residential, PHP, and virtual IOP — for most of its Pacific Northwest plan members. Northbound accepts Premera Blue Cross, providing California-based treatment for Washington and Alaska members seeking a change of environment for recovery.",

  aboutHeadline: "Does Premera Blue Cross Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Premera Blue Cross provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) programs for most of its plan members in Washington, Alaska, and beyond. Premera Blue Cross is the largest health insurer in the Pacific Northwest, providing comprehensive benefits to individuals, families, and employers throughout the region.",
    "Premera Blue Cross is a BCBS-affiliated plan, meaning members have access to the Blue Card program for out-of-state care — enabling Washington and Alaska members to access Northbound's California treatment facilities at in-network or near in-network rates. Specific coverage depends on your Premera plan type — individual, group, or Premera for Seniors — and your deductible status.",
    "Northbound's admissions team accepts Premera Blue Cross and is experienced navigating its out-of-state care authorization process. We contact Premera directly on your behalf to determine your exact coverage before your arrival — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "2+ Million in Pacific Northwest" },
    { icon: "ri-map-pin-2-line", label: "Coverage Area", value: "Washington, Alaska + BCBS Network" },
    { icon: "ri-building-line", label: "Affiliation", value: "BlueCross BlueShield (BCBS)" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider (BlueCard)" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "Covers SUD + Mental Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What Premera Blue Cross Typically Covers at Northbound",
  coverageIntro:
    "Premera covers most levels of addiction treatment — including out-of-state care through the BCBS BlueCard program. Your specific benefits are verified by Northbound's team before admission.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Premera Blue Cross covers medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies. BlueCard access applies for out-of-state care — Northbound confirms access during verification.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Premera covers residential inpatient treatment for substance use disorders. BlueCard enables Pacific Northwest members to access Northbound's California residential program with in-network-level benefits in many cases.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of structured daily clinical programming — is covered by most Premera plans as an intermediate level of care between residential and outpatient treatment.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) is covered by most Premera plans. For Washington-based Premera members, Northbound's telehealth IOP option allows continuation of care remotely after residential treatment in California.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Federal parity law requires Premera to cover mental health treatment at par with physical health. Co-occurring conditions — PTSD, depression, anxiety — are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Premera supports ongoing outpatient care following residential discharge. Northbound's aftercare team coordinates the transition back to Pacific Northwest-based care, including referrals to local providers.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or submit the verification form. You'll need your Premera Blue Cross member ID and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts Premera directly to confirm your coverage — including BlueCard out-of-state access, deductible status, authorized levels of care, and prior authorization requirements. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your Premera benefits confirmed and your treatment plan ready, you travel to Northbound's California facility. Our team manages all authorizations and utilization reviews throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does Premera Blue Cross cover drug and alcohol rehab?",
      a: "Yes. Premera Blue Cross covers substance use disorder treatment including detox, residential, PHP, and virtual IOP under most plan types. Federal parity law requires comprehensive behavioral health coverage. Your specific benefits depend on your Premera plan — Northbound verifies your coverage at no cost.",
    },
    {
      q: "Can I use Premera Blue Cross at Northbound in California?",
      a: "Yes. Premera Blue Cross is BCBS-affiliated, meaning members can access the BlueCard program for care outside Washington and Alaska. Through BlueCard, Premera members may access Northbound's California facilities at in-network or preferred rates. Northbound's team confirms your BlueCard access during verification.",
    },
    {
      q: "What is the BCBS BlueCard program?",
      a: "BlueCard is a program that allows BCBS members — including Premera members — to access providers in other states at in-network-level rates. If you're a Premera member traveling to California for treatment, your Premera plan's benefits typically apply at participating providers like Northbound through BlueCard.",
    },
    {
      q: "Does Premera require prior authorization for inpatient rehab?",
      a: "Yes. Most Premera Blue Cross plans require prior authorization for inpatient and residential treatment. Northbound's admissions team handles all authorization requests before your arrival.",
    },
    {
      q: "Why might someone from Washington choose to get treatment in California?",
      a: "Many clients prefer out-of-state treatment to create distance from familiar triggers, social circles, and environments associated with substance use. A new environment like Southern California can support greater focus on recovery. Northbound's team regularly works with clients traveling from Washington, Alaska, and other states.",
    },
    {
      q: "Can Northbound coordinate aftercare back in Washington after treatment?",
      a: "Yes. Northbound's discharge planning team helps Pacific Northwest clients identify aftercare providers and outpatient resources near their home. Virtual IOP (HomeBound) is available for Washington state residents following residential treatment.",
    },
    {
      q: "Does Premera cover mental health treatment alongside addiction?",
      a: "Yes. Federal parity law requires Premera to cover mental health at par with physical health. Co-occurring mental health and substance use disorders are covered simultaneously — Northbound's dual-diagnosis program treats both under the same Premera authorization.",
    },
    {
      q: "Does Premera cover telehealth addiction treatment?",
      a: "Yes. Premera Blue Cross covers telehealth services for behavioral health, including telehealth IOP. Northbound offers a telehealth IOP program available to residents of Washington and California — a seamless step-down option for Premera members following residential treatment at Northbound.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function PremeraPage() {
  return <InsurancePageTemplate data={data} />;
}
