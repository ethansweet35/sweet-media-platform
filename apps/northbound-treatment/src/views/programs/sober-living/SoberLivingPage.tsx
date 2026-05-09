import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_sober_living_hero01.jpg";

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Modern sober living home exterior in Southern California at golden hour — peaceful residential recovery environment",
  eyebrow: "Transitional Living Programs",
  programName: "Sober Living Homes",
  italicWord: "Sober",
  tagline: "Bridging treatment and independence in a safe, accountable community",
  heroBody:
    "Sober living provides the structured environment, peer accountability, and real-world practice necessary to protect your recovery as you transition from intensive treatment back into everyday life.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Transitional Living", href: "/treatment/transitional-living-programs/" },
    { label: "Sober Living" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is Sober Living?",
  overviewBody: [
    "Sober living homes are safe, structured, substance-free residences that bridge the gap between intensive treatment and full independent living. They provide recovering individuals with peer community, house accountability, routine, and real-world responsibility — without the clinical intensity of residential treatment or the isolation of returning home alone too soon.",
    "Choosing sober living after treatment is one of the most evidence-supported decisions a person in recovery can make. Research consistently shows that structured transitional housing significantly reduces relapse risk, improves employment outcomes, and strengthens long-term sobriety. Northbound partners with quality sober living networks across California and nationwide — and our team works personally with each client to find the right fit.",
  ],
  keyFacts: [
    { icon: "ri-home-2-line", label: "Setting", value: "Community Residential Home" },
    { icon: "ri-shield-check-line", label: "Environment", value: "100% Substance-Free" },
    { icon: "ri-team-line", label: "Accountability", value: "Peer Community + House Staff" },
    { icon: "ri-map-pin-2-line", label: "Locations", value: "Orange County & Nationwide" },
    { icon: "ri-calendar-check-line", label: "Duration", value: "Typically 3–12 Months" },
    { icon: "ri-refresh-line", label: "Treatment Access", value: "Concurrent IOP Recommended" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "What to Expect in Sober Living",
  stepsIntro:
    "Sober living is structured, purposeful, and community-driven — every element reinforces the habits and accountability that support lasting recovery.",
  steps: [
    {
      number: "01",
      title: "Placement & Matching",
      icon: "ri-search-line",
      body: "Northbound's team works with you before discharge to identify sober living options that fit your needs, location preferences, budget, and recovery goals. We partner with established networks including Recovery and Wellness (RAW) Sober Living and others across California and beyond.",
    },
    {
      number: "02",
      title: "House Rules & Community Agreement",
      icon: "ri-file-list-line",
      body: "Every sober living home operates under clear, consistent expectations: no substances, regular drug testing, curfew guidelines, chore responsibilities, and active engagement with recovery. These structure-based rules are not restrictive — they are the framework that makes recovery sustainable.",
    },
    {
      number: "03",
      title: "Daily Routine & Productive Engagement",
      icon: "ri-sun-line",
      body: "Residents are expected to spend daytime hours productively — working, attending school, seeking employment, or volunteering. This daily structure rebuilds the routines and identity that addiction disrupts, developing confidence and momentum in real-world independence.",
    },
    {
      number: "04",
      title: "Concurrent Outpatient Treatment",
      icon: "ri-calendar-check-line",
      body: "Most residents in sober living attend concurrent IOP or outpatient treatment at Northbound. This combination — structured housing plus ongoing clinical care — is one of the most effective models for preventing relapse during the high-risk transitional period.",
    },
    {
      number: "05",
      title: "Peer Accountability & Community",
      icon: "ri-group-line",
      body: "Sober living homes create a community of people at similar stages of recovery. Housemates hold each other accountable, share their journeys, and provide real-time peer support — the kind that no therapist can fully replicate. This community is often what makes sober living transformative.",
    },
    {
      number: "06",
      title: "Transition to Full Independence",
      icon: "ri-arrow-right-line",
      body: "Sober living is a stepping stone, not a permanent solution. With Northbound's continued clinical guidance and your growing confidence in routines, relationships, and sobriety, your team helps you plan and execute the transition to fully independent living at the right time.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-heart-line",
      title: "Why We Recommend Sober Living",
      body: "Returning directly to the environment where addiction took hold is one of the highest relapse risk factors. Sober living creates physical and psychological distance from triggers while allowing clients to build new routines, relationships, and coping strategies in a supported setting — at their own pace.",
    },
    {
      icon: "ri-map-pin-2-line",
      title: "Curated Placement Network",
      body: "Northbound partners with vetted sober living networks across California and the country. Our team personally evaluates options and helps each client find a home that matches their needs — proximity to Northbound's outpatient programs, work/school location, budget, and personal preferences.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Accountability That Protects Recovery",
      body: "Sober living provides the structured accountability that protects early recovery — regular drug testing, communal living standards, and staff oversight — without the clinical intensity of inpatient care. This graduated responsibility prepares clients for full independence, not just sobriety.",
    },
    {
      icon: "ri-group-line",
      title: "Peer Community With Lived Experience",
      body: "In sober living, you are surrounded by people who understand exactly what you're going through — not because they've studied it, but because they've lived it. Peer community is one of the most powerful predictors of sustained recovery, and Northbound's sober living network facilitates this naturally.",
    },
    {
      icon: "ri-refresh-line",
      title: "The Right Next Step",
      body: "Northbound's continuum of care is designed so that sober living feels like a natural extension of treatment — not a jarring leap into independence. The clinical tools, routines, and coping strategies built during residential, PHP, and IOP are exactly what sober living asks you to practice daily.",
    },
    {
      icon: "ri-community-line",
      title: "Alumni Support Network",
      body: "Northbound's robust alumni program provides ongoing events, connections, and community resources to sober living residents and beyond. One-third of Northbound's own staff are program alumni — and the extended alumni community is an invaluable lifelong resource for recovery.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
    { label: "IOP", href: "/programs/intensive-outpatient-treatment/", icon: "ri-calendar-check-line" },
    { label: "Sober Living", href: "/treatment/transitional-living-programs/sober-living/", icon: "ri-building-2-line", current: true },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line" },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "Does Northbound operate its own sober living homes?",
      a: "Northbound does not operate its own sober living facilities, but we have established deep partnerships with quality sober living networks across California and nationwide — including Recovery and Wellness (RAW) Sober Living. Our team works personally with each client to identify and place them in a home that fits their needs, location, and recovery goals.",
    },
    {
      q: "How long do people typically stay in sober living?",
      a: "The optimal length of sober living varies by individual. Research suggests that longer stays — 6 months or more — are associated with significantly better long-term sobriety outcomes. Most clients stay between 3 and 12 months, though some choose to remain longer as they build independence. There is no one-size-fits-all timeline.",
    },
    {
      q: "Can I work or go to school while in sober living?",
      a: "Yes — in fact, most sober living homes require residents to be actively engaged in work, school, or job-seeking during daytime hours. This expectation is intentional: it rebuilds structure, identity, and productivity. Northbound's Careerbound® and Collegebound® programs provide direct support for residents navigating these reintegration challenges.",
    },
    {
      q: "Do I need to attend IOP while living in sober living?",
      a: "While not always required, concurrent IOP is strongly recommended for sober living residents — especially in the first 90 days of transitional living. The combination of structured housing and ongoing clinical programming is one of the most effective relapse-prevention models available. Northbound's team helps coordinate scheduling between sober living and IOP.",
    },
    {
      q: "Is sober living covered by insurance?",
      a: "Sober living housing itself is typically not covered by health insurance. However, concurrent IOP or outpatient treatment — which is highly recommended alongside sober living — is usually covered by major insurance plans. Northbound's admissions team can help you understand what is covered and identify affordable sober living options.",
    },
    {
      q: "What happens if a resident relapses in sober living?",
      a: "Relapse is addressed swiftly and compassionately in sober living. Most homes have clear protocols: the resident is identified, support is mobilized immediately, and clinical re-entry — typically returning to a higher level of care such as IOP or residential — is arranged. The goal is to protect the community and get the individual the help they need as quickly as possible.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Find the Right Sober Living for You",
  ctaBody:
    "Northbound's team helps place clients in vetted sober living homes across California and the country. Call us today — we'll help you find a home that fits your recovery, your schedule, and your life.",
};

export default function SoberLivingPage() {
  return <TreatmentPageTemplate data={data} />;
}
