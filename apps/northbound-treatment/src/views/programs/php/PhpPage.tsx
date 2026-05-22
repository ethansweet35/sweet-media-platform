import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";
import { NEWPORT_BEACH_IMAGES } from "@/views/home/assets";

const HERO = NEWPORT_BEACH_IMAGES.interior;

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Small group therapy session at Northbound Treatment's partial hospitalization program in Newport Beach, California",
  eyebrow: "Addiction Treatment Programs",
  programName: "Partial Hospitalization Program (PHP)",
  italicWord: "Partial",
  tagline: "Structured daytime clinical care — Newport Beach, CA",
  heroBody:
    "Northbound's PHP at our Newport Beach campus provides up to 6 hours of clinical programming per day, most days of the week — keeping the intensity of residential care while clients begin applying recovery skills to everyday life.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Partial Hospitalization" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is a Partial Hospitalization Program?",
  overviewBody: [
    "A Partial Hospitalization Program (PHP) is a highly structured level of care that sits between residential treatment and virtual IOP on the continuum of care. Clients attend treatment most days of the week — up to 6 hours per day — while continuing to practice therapeutic skills between sessions. It is the ideal next step for those completing residential treatment who need continued clinical intensity without full-time inpatient admission.",
    "At Northbound, PHP is delivered at our Newport Beach campus — a deliberate, skills-building phase where clients begin applying therapeutic gains to everyday life, testing coping strategies in real situations with clinical guidance close at hand. Individual therapy, group programming, and specialty modalities continue uninterrupted through this phase.",
  ],
  keyFacts: [
    { icon: "ri-time-line", label: "Hours per Day", value: "Up to 6 Hours" },
    { icon: "ri-calendar-check-line", label: "Frequency", value: "5–6 Days per Week" },
    { icon: "ri-hospital-line", label: "Level of Care", value: "Partial Hospitalization" },
    { icon: "ri-map-pin-2-line", label: "Location", value: "Newport Beach, CA" },
    { icon: "ri-shield-check-line", label: "Insurance", value: "15+ Major Plans Accepted" },
    { icon: "ri-hospital-line", label: "Format", value: "Day Treatment Program" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "What to Expect in PHP",
  stepsIntro:
    "PHP is a structured bridge between immersive residential care and virtual outpatient treatment — every phase is designed to build confidence, skills, and accountability.",
  steps: [
    {
      number: "01",
      title: "Step-Down Assessment",
      icon: "ri-file-list-line",
      body: "As you transition from residential care, your clinical team reassesses your treatment plan for PHP. Goals, therapy modalities, and scheduling are aligned to the graduated independence this phase introduces — ensuring continuity and momentum.",
    },
    {
      number: "02",
      title: "Daily Group Therapy",
      icon: "ri-group-line",
      body: "PHP programming centers on daily group sessions covering relapse prevention, emotional regulation, life skills, trauma processing, and peer accountability. Group therapy builds the community and shared accountability that supports lasting recovery.",
    },
    {
      number: "03",
      title: "Individual & Specialty Therapy",
      icon: "ri-mental-health-line",
      body: "Regular individual sessions with your primary therapist continue throughout PHP. Specialty modalities such as EMDR for trauma processing, experiential therapies (art, yoga, meditation), and DBT skills groups are integrated based on your individualized treatment plan.",
    },
    {
      number: "04",
      title: "Relapse Prevention Skills",
      icon: "ri-shield-check-line",
      body: "PHP introduces real-world triggers in a controlled way. Clients learn to identify the stages of relapse, develop personalized coping plans, and practice responding to high-risk situations with clinical guidance available — building confidence before full independence.",
    },
    {
      number: "05",
      title: "Real-World Skills Practice",
      icon: "ri-home-2-line",
      body: "Outside of programming hours, clients practice the coping skills, routines, and emotional regulation tools built during residential care — applying what they learn in therapy to everyday situations with clinical guidance close at hand.",
    },
    {
      number: "06",
      title: "Transition to Virtual IOP",
      icon: "ri-wifi-line",
      body: "Successful PHP completion leads to a coordinated step-down to Northbound's virtual IOP (HomeBound). Your care team evaluates clinical readiness, coordinates scheduling, and ensures you have a support network and aftercare plan in place before reducing the level of care.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-refresh-line",
      title: "Real-World Integration with Clinical Backup",
      body: "PHP is where clinical gains from residential care get applied to real life. Clients spend structured hours in programming and the remainder of the day navigating work, family, and daily routines — applying therapeutic tools in actual situations, with their clinical team a call away.",
    },
    {
      icon: "ri-brain-line",
      title: "EMDR & Trauma-Focused Therapy",
      body: "Northbound's PHP includes EMDR therapy for clients with unresolved trauma — one of the most evidence-based trauma modalities available. Because trauma is at the root of most addiction, processing it in PHP prevents the patterns that lead to relapse.",
    },
    {
      icon: "ri-leaf-line",
      title: "Experiential Recovery",
      body: "Experiential therapies — including art, yoga, and meditation — continue through PHP, providing positive emotional outlets and coping tools clients carry with them long after treatment ends. These modalities complement traditional therapy by engaging the whole person.",
    },
    {
      icon: "ri-pray-line",
      title: "Faith-Based Recovery Option",
      body: "For clients whose spirituality is foundational to recovery, Northbound's faith-centered track provides PHP programming that integrates faith principles with evidence-based clinical care — offering additional meaning, community, and accountability.",
    },
    {
      icon: "ri-team-line",
      title: "Continuity of Your Clinical Team",
      body: "Transitioning levels of care doesn't mean starting over. Where possible, clients maintain therapeutic relationships with their primary therapist and counselors through PHP — preserving trust, continuity of insight, and therapeutic momentum.",
    },
    {
      icon: "ri-map-line",
      title: "Flexible Scheduling for Life",
      body: "PHP programming is structured but accommodating. For clients returning to work, school, or family obligations, our admissions team works to find scheduling that supports real-life responsibilities while maintaining the clinical intensity PHP requires.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line", current: true },
    { label: "Virtual IOP", href: "/telehealth-iop-services/", icon: "ri-wifi-line" },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line" },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "Who is PHP appropriate for?",
      a: "PHP is ideal for individuals who have completed residential treatment and are ready for a step-down level of care but still need significant clinical support. It is also appropriate as a primary level of care for those with a lower severity of addiction or who cannot commit to full-time inpatient care.",
    },
    {
      q: "How many hours per day and days per week is PHP?",
      a: "Northbound's PHP provides up to 6 hours of treatment per day, most days of the week — typically 5 to 6 days. This allows clients to maintain intensive clinical programming while balancing treatment with work, family, and other daily responsibilities.",
    },
    {
      q: "What therapies are offered in PHP?",
      a: "PHP includes individual therapy, group counseling, DBT skills groups, EMDR therapy, relapse prevention, psychoeducation, experiential therapies (art, music, yoga, meditation), and specialty tracks such as faith-based recovery. Treatment plans are individualized based on clinical assessment.",
    },
    {
      q: "Does insurance cover PHP?",
      a: "Yes. Most major insurance plans cover medically necessary partial hospitalization. Northbound is in-network with 15+ major carriers and verifies benefits at no cost prior to admission. Our admissions team will walk you through your coverage and any out-of-pocket costs.",
    },
    {
      q: "What comes after PHP?",
      a: "Most clients who complete PHP step down to Northbound's virtual IOP (HomeBound), which provides continued structured therapy online with greater flexibility for work, school, and family life. Your clinical team coordinates the step-down and ensures all aftercare plans are in place.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Take the Next Step with PHP",
  ctaBody:
    "Whether you're stepping down from residential care or beginning your recovery journey, Northbound's Partial Hospitalization Program provides the clinical intensity you need while you build real-world recovery skills.",
};

export default function PhpPage() {
  return <TreatmentPageTemplate data={data} />;
}
