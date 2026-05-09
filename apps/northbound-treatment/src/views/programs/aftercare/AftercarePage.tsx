import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_aftercare_hero01.jpg";

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Individual meeting with a therapist in an aftercare counseling session at Northbound Treatment Services",
  eyebrow: "Continuing Care",
  programName: "Aftercare & Continuing Support",
  italicWord: "Aftercare",
  tagline: "Sustained recovery starts the day you leave — Northbound stays with you",
  heroBody:
    "Treatment is the beginning, not the end. Northbound's aftercare program ensures every client leaves with a detailed plan, community connections, and ongoing support built for the realities of long-term recovery.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Aftercare" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is Aftercare in Addiction Recovery?",
  overviewBody: [
    "Aftercare refers to the structured support, resources, and clinical connections that follow the completion of a formal addiction treatment program. Research consistently shows that individuals who engage in aftercare counseling and ongoing support demonstrate significantly higher rates of long-term sobriety than those who transition out of treatment without a continuing care plan. Recovery from addiction is a lifelong process — and the months immediately following discharge are among the most clinically vulnerable.",
    "At Northbound, aftercare planning begins during treatment, not after. Your discharge planning team works with you well before your last day to establish a comprehensive aftercare plan — including ongoing therapy referrals, sober living connections, 12-step meeting schedules, alumni engagement, and, for eligible clients, Northbound's Work Exchange Program. We don't just say goodbye at the door; we stay connected.",
  ],
  keyFacts: [
    { icon: "ri-refresh-line", label: "Planning Starts", value: "During Treatment" },
    { icon: "ri-calendar-check-line", label: "Format", value: "Therapy, Meetings, Community" },
    { icon: "ri-team-line", label: "Support", value: "Alumni Network + Clinical Team" },
    { icon: "ri-map-pin-2-line", label: "Location", value: "Orange County & Virtual" },
    { icon: "ri-group-line", label: "Alumni Active", value: "500+ Clean & Sober Members" },
    { icon: "ri-phone-line", label: "Ongoing Contact", value: "Regular Check-Ins by Staff" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "What Northbound's Aftercare Looks Like",
  stepsIntro:
    "Aftercare at Northbound is active, personalized, and community-rooted — designed to protect the gains made in treatment and build the life you deserve.",
  steps: [
    {
      number: "01",
      title: "Discharge Planning During Treatment",
      icon: "ri-file-list-line",
      body: "Your aftercare plan doesn't start at discharge — it starts weeks before. Your clinical team works with you to build a tailored plan covering therapy referrals, sober living needs, 12-step integration, family support, employment or school resources, and alumni connection — all confirmed before your last day.",
    },
    {
      number: "02",
      title: "Ongoing Therapy & Outpatient Support",
      icon: "ri-mental-health-line",
      body: "Northbound connects every client with ongoing individual therapy and, where appropriate, continued outpatient counseling after discharge. The clinical relationship built during treatment is the strongest predictor of sustained engagement with care — we work to preserve it wherever possible.",
    },
    {
      number: "03",
      title: "12-Step Meeting Integration",
      icon: "ri-group-line",
      body: "For clients in the Orange County area, Northbound facilitates connections with local AA and NA meetings that fit your schedule, personality, and recovery focus. 12-step community is one of the most extensively researched long-term recovery tools available — and Northbound integrates it into every aftercare plan.",
    },
    {
      number: "04",
      title: "Sober Living Connection",
      icon: "ri-home-2-line",
      body: "For clients who are not returning to a stable, sober home environment, Northbound coordinates sober living placement before discharge — ensuring there is never a gap between the structure of treatment and the safety of a substance-free home. Aftercare and sober living work in tandem.",
    },
    {
      number: "05",
      title: "Work Exchange Program",
      icon: "ri-briefcase-line",
      body: "Eligible Northbound clients can apply for the Work Exchange Program — working at Northbound after completing treatment while studying toward a Licensed Addiction Counseling credential. This program builds purpose, income, professional identity, and community simultaneously, supporting multiple dimensions of recovery.",
    },
    {
      number: "06",
      title: "Alumni Community & Ongoing Check-Ins",
      icon: "ri-community-line",
      body: "Following discharge, Northbound's alumni director makes regular contact with recent graduates. Exit interviews capture satisfaction data, and clients are connected immediately with local Northbound alumni and weekly meeting schedules. Connection isn't optional in long-term recovery — it's essential.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-file-list-line",
      title: "Aftercare Planning Starts in Treatment",
      body: "Most programs treat discharge planning as a final-day checklist. Northbound begins building your aftercare plan during active treatment — giving you time to ask questions, make decisions, and arrive at discharge with a plan you're confident in, not one that was assembled in the last 24 hours.",
    },
    {
      icon: "ri-briefcase-line",
      title: "Work Exchange Program",
      body: "Northbound's unique Work Exchange Program allows eligible clients to work at Northbound post-treatment while pursuing addiction counseling credentials. This creates a direct bridge from recovery to purpose — and keeps former clients embedded in a therapeutic, sober professional environment during the most vulnerable early recovery period.",
    },
    {
      icon: "ri-community-line",
      title: "500+ Active Alumni in Orange County",
      body: "Northbound's Alumni Association has more than 500 active, clean and sober members in Orange County alone. Weekly Monday evening and Friday morning alumni meetings, monthly adventures, quarterly sobriety milestone celebrations, and ongoing volunteer work create a true community — not just a mailing list.",
    },
    {
      icon: "ri-phone-line",
      title: "Regular Alumni Check-Ins",
      body: "Recovery doesn't end at discharge, and neither does Northbound's engagement. Our alumni director maintains regular contact with recent graduates through calls, texts, and emails. Knowing that someone from your treatment team is still checking in is a meaningful accountability and motivation factor.",
    },
    {
      icon: "ri-refresh-line",
      title: "Relapse Response Without Judgment",
      body: "Northbound recognizes that relapse is a part of many people's recovery journeys. If a client relapses after discharge, our team provides immediate, non-judgmental guidance toward the appropriate level of care — relapse prevention groups, 12-step re-engagement, or a return to outpatient treatment — without shame.",
    },
    {
      icon: "ri-heart-line",
      title: "Family Aftercare Support",
      body: "Northbound's weekly Family Support meeting via Zoom continues post-discharge — providing ongoing prevention, intervention guidance, and peer support for families impacted by addiction. Recovery is a family journey, and Northbound provides community for the entire family system, not just the person in treatment.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
    { label: "IOP", href: "/programs/intensive-outpatient-treatment/", icon: "ri-calendar-check-line" },
    { label: "Sober Living", href: "/treatment/transitional-living-programs/sober-living/", icon: "ri-building-2-line" },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line", current: true },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "What does Northbound's aftercare program include?",
      a: "Northbound's aftercare program includes a personalized discharge plan developed during treatment, therapy referrals, 12-step meeting integration, sober living placement (when needed), alumni community connection, the Work Exchange Program for eligible clients, and regular check-ins from Northbound's alumni director after discharge. It is a comprehensive, ongoing support system — not a one-time referral sheet.",
    },
    {
      q: "Is aftercare planning included in treatment at no extra cost?",
      a: "Yes. Discharge planning and aftercare coordination are integrated components of Northbound's treatment programs and are included as part of care. Your clinical team begins building your aftercare plan during treatment — there is no additional fee for discharge planning and initial aftercare coordination.",
    },
    {
      q: "What is the Work Exchange Program?",
      a: "The Work Exchange Program is a unique Northbound initiative in which eligible clients work at Northbound's facilities after completing treatment. During this time, they can pursue licensure as an addiction counselor while remaining embedded in a therapeutic, sober professional community. The program is a powerful bridge between personal recovery and professional purpose.",
    },
    {
      q: "What if I relapse after leaving treatment?",
      a: "Northbound responds to relapse with compassion, not judgment. If you relapse after discharge, our team is available to help you get back on track. Depending on the severity of the relapse and your clinical situation, we may recommend return to outpatient treatment, engagement with relapse prevention groups, 12-step re-engagement, or re-admission to a higher level of care. Reaching out immediately after a relapse improves outcomes dramatically.",
    },
    {
      q: "How does Northbound stay in touch after discharge?",
      a: "Northbound's alumni director conducts an exit interview on or near your last day of treatment, connects you with local alumni meetings and contacts, and maintains regular ongoing communication through calls, texts, and emails. You are also connected to the weekly alumni meetings and Northbound's social and event calendar. The goal is to ensure you never feel alone in your recovery.",
    },
    {
      q: "Does my family get aftercare support too?",
      a: "Yes. Northbound hosts a weekly Family Support meeting every Wednesday evening via Zoom for family members impacted by a loved one's addiction — providing peer support, education, and a safe community even after the client's formal treatment has concluded. Recovery is a family process, and Northbound supports the entire family system.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Recovery Doesn't End at Discharge",
  ctaBody:
    "Northbound's aftercare program keeps you connected to the community, resources, and clinical support that sustain long-term sobriety. Your relationship with Northbound begins when you arrive — and it doesn't end when you leave.",
};

export default function AftercarePage() {
  return <TreatmentPageTemplate data={data} />;
}
