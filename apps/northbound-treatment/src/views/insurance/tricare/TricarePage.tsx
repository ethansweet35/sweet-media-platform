import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_tricare.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "GEHA", href: "/insurance/geha-insurance/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Health Net (MHN)", href: "/insurance/health-net/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Veteran reviewing Tricare insurance benefits for addiction treatment with a healthcare advisor",
  carrierName: "Tricare",
  carrierTagline: "Accepted for active duty, veterans & military families",
  heroBody:
    "Tricare covers addiction treatment — including detox, residential, PHP, and virtual IOP — for eligible active duty service members, veterans, and their families. Northbound accepts Tricare and has experience navigating its authorization requirements to maximize your benefits.",

  aboutHeadline: "Does Tricare Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Tricare provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) programs for eligible beneficiaries. Tricare is the health insurance program for active duty service members, retirees, National Guard and Reserve members, and their families — administered by the Department of Defense.",
    "Tricare coverage depends on your specific plan — Tricare Prime, Tricare Select, Tricare for Life, or Tricare Reserve Select — as well as whether your treatment provider is within the Tricare network and prior authorization requirements. Northbound's admissions team contacts Tricare directly on your behalf to determine your exact coverage before arrival, at no cost to you.",
    "Tricare's behavioral health benefits are comprehensive under federal law — substance use treatment is covered at par with physical health conditions. Northbound's team has experience working with Tricare's authorization and utilization review processes specifically, helping military families navigate the system with minimal stress.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Covered Population", value: "9+ Million Beneficiaries" },
    { icon: "ri-map-pin-2-line", label: "Administered By", value: "U.S. Dept. of Defense" },
    { icon: "ri-building-line", label: "Plans Available", value: "Prime, Select, TFL, Reserve" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Tricare Accepted" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "SUD + Mental Health Covered" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1–2 Business Days" },
  ],

  coverageHeadline: "What Tricare Typically Covers at Northbound",
  coverageIntro:
    "Tricare covers most levels of addiction treatment at Northbound. Specific coverage depends on your plan type and prior authorization status — Northbound's team manages the verification and authorization process for you.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Tricare covers medically supervised detox for eligible beneficiaries. Northbound's IMS-certified detox program qualifies. Prior authorization is typically required and is managed by Northbound's admissions team.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Tricare covers residential inpatient treatment for substance use disorders. The approved length of stay is based on clinical necessity and Tricare's utilization review process — Northbound advocates for the full stay required.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "Tricare covers PHP as an intermediate level of care — structured daily clinical programming without 24-hour residential support. Northbound's PHP is a qualifying program under Tricare's criteria.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) is covered by most Tricare plans. Flexible scheduling options help veterans and service members balance treatment with family and work obligations.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Tricare covers treatment for co-occurring mental health conditions — PTSD, depression, anxiety, TBI-related disorders — alongside substance use disorders. Northbound's dual-diagnosis program treats the whole person.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Tricare supports ongoing outpatient care following residential or PHP discharge. Northbound's aftercare and alumni programs help service members and veterans maintain long-term sobriety.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team by phone or submit the verification form. You'll need your Tricare beneficiary ID, sponsor's Social Security number, and plan information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts Tricare directly to confirm your coverage — plan type, referral requirements, prior authorization needs, cost-sharing, and covered levels of care. Typically completed within one to two business days.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With authorization confirmed and your treatment plan in place, you arrive at Northbound. Our team manages all ongoing utilization reviews throughout your stay — you focus on recovery.",
    },
  ],

  faqs: [
    {
      q: "Does Tricare cover drug and alcohol rehab?",
      a: "Yes. Tricare covers substance use disorder treatment including detox, residential, PHP, and virtual IOP for eligible beneficiaries. Federal law requires behavioral health parity — substance use and mental health treatment must be covered on equal terms with physical health. Specific benefits depend on your Tricare plan type — Northbound verifies your coverage at no cost.",
    },
    {
      q: "Does Northbound accept Tricare?",
      a: "Yes. Northbound Treatment Services accepts Tricare for eligible active duty service members, veterans, retirees, and their families. Our admissions team has experience navigating Tricare's specific authorization and utilization review requirements.",
    },
    {
      q: "Does Tricare Prime require a referral for rehab?",
      a: "Tricare Prime typically requires a referral from your Primary Care Manager (PCM) before accessing specialty care, including inpatient addiction treatment. Northbound's admissions team will guide you through the referral process — or in some cases, we can assist in requesting a direct referral to an approved treatment facility.",
    },
    {
      q: "What is the difference between Tricare Prime and Tricare Select for rehab coverage?",
      a: "Tricare Prime is an HMO-style plan requiring referrals and coordinated care through a PCM — lower out-of-pocket costs but more process steps. Tricare Select is a PPO-style plan offering more flexibility to choose providers without a referral, typically with higher cost-sharing. Northbound's team will confirm your specific plan type during benefits verification.",
    },
    {
      q: "Does Tricare cover PTSD treatment alongside addiction?",
      a: "Yes. Tricare covers treatment for co-occurring mental health conditions, including PTSD, alongside substance use disorders. Northbound's dual-diagnosis program specifically addresses trauma-related disorders common among veterans and active duty personnel — all under the same Tricare authorization.",
    },
    {
      q: "Does Tricare require pre-authorization for inpatient rehab?",
      a: "Yes. Most Tricare plans require pre-authorization before inpatient or residential treatment. Northbound's admissions team manages this process on your behalf — we are experienced in Tricare's requirements and will complete all necessary approvals before your arrival.",
    },
    {
      q: "Does Northbound accept Tricare for Life (TFL)?",
      a: "Yes. Northbound accepts Tricare for Life, which serves military retirees and their dependents who are also enrolled in Medicare. TFL acts as a wraparound to Medicare, covering costs Medicare does not. Our team will verify your TFL benefits during the admissions process.",
    },
    {
      q: "Can family members of active duty service members use Tricare at Northbound?",
      a: "Yes. Tricare covers eligible dependents of active duty service members, retirees, and National Guard/Reserve members. Coverage for dependents may differ slightly from active duty coverage — Northbound's team confirms all eligibility during verification.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function TricarePage() {
  return <InsurancePageTemplate data={data} />;
}
