import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_firsthealth.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "Health Net (MHN)", href: "/insurance/health-net/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "USAMCO", href: "/insurance/usamco/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Healthcare navigator reviewing First Health Network PPO coverage options with a patient",
  carrierName: "First Health Network",
  carrierTagline: "PPO network — accepted at Northbound",
  heroBody:
    "First Health Network is a large PPO network that enables access to Northbound's addiction treatment services. If your health plan uses the First Health Network for out-of-area or specialty care, Northbound's admissions team can verify your benefits and confirm in-network access.",

  aboutHeadline: "Does First Health Network Cover Addiction Treatment at Northbound?",
  aboutBody: [
    "First Health Network is a Preferred Provider Organization (PPO) network — not an insurance company itself, but rather a rental network used by many self-funded employer plans, workers' compensation carriers, and third-party administrators to access negotiated provider rates nationwide. If your health plan accesses the First Health Network, you may have in-network access to Northbound's addiction treatment programs through that network arrangement.",
    "Coverage specifics depend entirely on the health plan that is accessing the First Health Network rather than First Health itself. Your employer's self-funded plan, for example, might use First Health Network to provide access to California providers like Northbound while your benefits are managed by a separate third-party administrator. Northbound's admissions team identifies whether your plan uses First Health Network during the verification process.",
    "Northbound's admissions team has experience working with First Health Network arrangements. We contact the relevant benefits administrator directly to verify your exact coverage — including authorized levels of care, cost-sharing, and prior authorization requirements — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Network Type", value: "PPO Rental Network" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "National" },
    { icon: "ri-building-line", label: "Part of", value: "Aetna / CVS Health" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Network Access Available" },
    { icon: "ri-hospital-line", label: "Common Users", value: "Self-Funded & TPAs" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What First Health Network Plans Typically Cover at Northbound",
  coverageIntro:
    "Plans accessing the First Health Network typically cover addiction treatment at multiple levels of care. Your specific benefits depend on the underlying health plan — Northbound's team verifies your exact coverage.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Plans accessing First Health Network typically cover medically supervised detox when clinically indicated. Northbound's IMS-certified detox program in Garden Grove qualifies under standard behavioral health criteria.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Residential inpatient treatment is covered by most First Health Network plans when medically necessary. Length of stay is based on clinical need and utilization review — Northbound advocates for the full stay required.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — up to 6 hours of daily structured clinical programming — is typically covered by plans accessing the First Health Network as an intermediate level of care.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) — 6 to 12 hours of weekly programming — is covered by most First Health Network plans. Flexible scheduling allows clients to continue work or family obligations.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Federal mental health parity law applies to most plans using First Health Network. Co-occurring mental health conditions like depression, anxiety, and PTSD are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Most plans provide coverage for ongoing outpatient care following residential or PHP discharge. Northbound's aftercare coordination helps facilitate a smooth transition back to daily life.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or use the verification form. You'll need your insurance card — Northbound's team will determine if your plan accesses the First Health Network.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts the relevant plan administrator to confirm your exact coverage — authorized levels of care, prior authorization requirements, and cost-sharing. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your benefits confirmed and treatment plan ready, you arrive at Northbound. We manage all ongoing utilization reviews and authorizations throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "What is First Health Network?",
      a: "First Health Network is a large PPO network owned by Aetna (CVS Health) that provides negotiated provider access to self-funded employer plans, workers' compensation plans, and third-party administrators. It is not an insurer — rather, it allows various health plans to access in-network providers like Northbound at pre-negotiated rates.",
    },
    {
      q: "Does Northbound accept First Health Network?",
      a: "Yes. Northbound Treatment Services can be accessed through the First Health Network by plans that use this network for provider access. Our admissions team will confirm whether your specific plan accesses First Health Network during the verification process.",
    },
    {
      q: "How do I know if my plan uses First Health Network?",
      a: "Your insurance card may display a First Health logo or network name. Check your Summary of Benefits or call the member services number on your card. Northbound's admissions team can also identify this during the initial verification call.",
    },
    {
      q: "Does my First Health Network plan require prior authorization?",
      a: "Most self-funded plans using First Health Network require prior authorization for inpatient and residential treatment. The authorization requirements are set by your underlying plan, not by First Health Network itself. Northbound's admissions team handles all authorization requests for you.",
    },
    {
      q: "Is addiction treatment covered under workers' compensation plans using First Health Network?",
      a: "Workers' compensation coverage for addiction treatment varies significantly by state and policy. If your injury or condition has a substance use component, coverage may be available. Northbound's team can help evaluate your workers' comp plan specifics during the admissions inquiry.",
    },
    {
      q: "What is a self-funded employer plan?",
      a: "A self-funded (or self-insured) plan is one where your employer directly bears the financial risk of providing health benefits rather than paying premiums to an insurance company. Self-funded plans often use networks like First Health and third-party administrators to handle claims. They may have more flexibility in benefit design — and Northbound's team is experienced navigating their varying requirements.",
    },
    {
      q: "Can Northbound verify my First Health Network benefits before I commit to treatment?",
      a: "Yes. Northbound's admissions team provides free benefits verification for all prospective clients. We contact your plan administrator directly to confirm your coverage, cost-sharing, and authorized levels of care — no cost, no commitment required.",
    },
    {
      q: "Is there anything First Health Network plans typically don't cover?",
      a: "Coverage exclusions vary by the underlying health plan. Common exclusions may include certain types of experimental treatment or out-of-network charges above negotiated rates. Northbound's team identifies any exclusions specific to your plan during benefits verification.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function FirstHealthPage() {
  return <InsurancePageTemplate data={data} />;
}
