import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_compsych.jpg";

const OTHER_CARRIERS = [
  { name: "Aetna", href: "/insurance/aetna/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "Magellan", href: "/insurance/magellan/" },
  { name: "MHN", href: "/insurance/mhn/" },
  { name: "First Health", href: "/insurance/first-health/" },
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Health Net", href: "/insurance/health-net/" },
];

const data: InsurancePageData = {
  heroImage: HERO,
  heroImageAlt:
    "Employee assistance program counselor reviewing ComPsych behavioral health coverage for addiction treatment",
  carrierName: "ComPsych",
  carrierTagline: "EAP & behavioral health coverage accepted",
  heroBody:
    "ComPsych covers addiction treatment — including detox, residential, PHP, and virtual IOP — through its behavioral health and Employee Assistance Program (EAP) benefits. Northbound works with ComPsych to verify your coverage and coordinate care from day one.",

  aboutHeadline: "Does ComPsych Cover Addiction Treatment?",
  aboutBody: [
    "Yes — ComPsych provides coverage for substance use disorder treatment, including medically supervised detox, residential inpatient, partial hospitalization (PHP), and virtual IOP (telehealth) programs through its behavioral health managed care and Employee Assistance Program (EAP) services. As the world's largest provider of employee assistance programs, ComPsych manages behavioral health benefits for more than 137 million employees and their families worldwide.",
    "ComPsych typically functions as a behavioral health benefits manager rather than a primary insurer — meaning your employer's health plan may use ComPsych to manage behavioral health and EAP services while a separate carrier (such as Cigna or Aetna) handles medical coverage. ComPsych's GuidanceResources® program often provides initial counseling sessions and referrals that can connect directly to higher levels of care like Northbound's programs.",
    "Northbound's admissions team has experience working with ComPsych's authorization process. We contact ComPsych directly on your behalf to determine your exact behavioral health benefits and coordinate care — at no cost to you.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "137+ Million Globally" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "National + International" },
    { icon: "ri-building-line", label: "Primary Program", value: "GuidanceResources® EAP" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "Accepted Provider" },
    { icon: "ri-hospital-line", label: "Coverage Type", value: "Behavioral Health + EAP" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  coverageHeadline: "What ComPsych Typically Covers at Northbound",
  coverageIntro:
    "ComPsych provides behavioral health and EAP coverage that may include addiction treatment at multiple levels of care. Your specific benefits depend on your employer's plan — Northbound's team verifies your exact coverage.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "ComPsych behavioral health plans cover medically supervised detox when clinically indicated. Northbound's IMS-certified detox program qualifies under ComPsych's criteria for medically necessary substance use treatment.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "ComPsych covers residential inpatient treatment for substance use disorders when medically necessary. Length of stay is subject to ComPsych's utilization management process — Northbound manages all reviews on your behalf.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "PHP at Northbound — providing up to 6 hours of structured daily clinical programming — is covered by most ComPsych behavioral health plans as an intermediate level of care.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) is covered by most ComPsych plans. EAP programs may also coordinate referrals to IOP directly through the GuidanceResources® referral network.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "ComPsych specializes in behavioral health — mental health and substance use disorders are covered together. Co-occurring conditions like depression, anxiety, and PTSD are treated alongside addiction at Northbound.",
    },
    {
      icon: "ri-group-line",
      label: "EAP Referral to Higher Care",
      detail:
        "ComPsych's GuidanceResources® EAP can provide initial counseling sessions and direct referrals to higher levels of care like Northbound's residential and PHP programs when clinical need is identified.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team or submit the verification form. You'll need your ComPsych member ID, your employer name, and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our team contacts ComPsych directly to confirm your behavioral health coverage — authorized levels of care, EAP sessions available, and cost-sharing. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With coverage confirmed and care coordinated, you arrive at Northbound. We manage all ongoing utilization reviews and authorizations throughout your stay.",
    },
  ],

  faqs: [
    {
      q: "Does ComPsych cover drug and alcohol rehab?",
      a: "Yes. ComPsych covers substance use disorder treatment including detox, residential, PHP, and virtual IOP through its behavioral health managed care plans. EAP programs can also facilitate referrals to higher levels of care. Specific benefits depend on your employer's ComPsych plan — Northbound verifies your coverage at no cost.",
    },
    {
      q: "Is Northbound an accepted provider with ComPsych?",
      a: "Yes. Northbound Treatment Services is an accepted provider with ComPsych. Our admissions team has experience working directly with ComPsych's behavioral health and EAP authorization processes.",
    },
    {
      q: "What is the difference between ComPsych EAP and behavioral health coverage?",
      a: "ComPsych EAP (GuidanceResources®) typically provides a limited number of free counseling sessions as an employee benefit — often 3 to 8 sessions. Behavioral health coverage through ComPsych is more comprehensive and covers higher levels of care including inpatient treatment. Northbound's team identifies which type of coverage applies to your specific situation.",
    },
    {
      q: "Can ComPsych EAP refer me to Northbound?",
      a: "Yes. ComPsych's GuidanceResources® EAP can assess your clinical needs and provide referrals to higher levels of care, including Northbound's residential and PHP programs. Northbound can also work directly with your ComPsych EAP counselor to facilitate a warm handoff into treatment.",
    },
    {
      q: "Does ComPsych require prior authorization for inpatient treatment?",
      a: "Yes. ComPsych requires prior authorization for inpatient and residential levels of care. Northbound's admissions team handles all authorization requests before your arrival.",
    },
    {
      q: "How do I find out if my employer uses ComPsych?",
      a: "Check your employee benefits documents or call your HR department. If your EAP is GuidanceResources® or the behavioral health administrator listed is ComPsych, your benefits run through ComPsych. Northbound's admissions team can also confirm this during the verification process.",
    },
    {
      q: "Can ComPsych reduce or end my treatment coverage early?",
      a: "ComPsych conducts utilization reviews during treatment to verify medical necessity. Northbound's clinical team manages all review requests and appeals any reductions in coverage when continued treatment is clinically warranted.",
    },
    {
      q: "Does ComPsych cover family members of employees?",
      a: "Yes. Most ComPsych plans extend EAP and behavioral health coverage to immediate family members of enrolled employees. Coverage details for dependents are confirmed during Northbound's verification process.",
    },
  ],

  relatedCarriers: OTHER_CARRIERS,
};

export default function CompsychPage() {
  return <InsurancePageTemplate data={data} />;
}
