import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";
import { SERVICE_IMAGES } from "@/views/home/assets";

const HERO = SERVICE_IMAGES.supportGroup;

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Family gathered with a professional interventionist — staging a compassionate addiction intervention in Orange County",
  eyebrow: "Family & Admissions Support",
  programName: "Addiction Intervention Services",
  italicWord: "Intervention",
  tagline: "Helping families guide loved ones toward treatment — with compassion and a clear plan",
  heroBody:
    "An intervention is one of the most powerful actions a family can take. Northbound's team helps you plan, prepare, and execute a structured intervention — and has a treatment bed ready when your loved one says yes.",
  breadcrumbs: [
    { label: "Admissions", href: "/admissions/" },
    { label: "Interventions" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is an Addiction Intervention?",
  overviewBody: [
    "An intervention is a professionally guided process that brings together the people who care most about an addicted individual to communicate the impact of their addiction and present a clear, specific plan for treatment. When thoughtfully organized and delivered with compassion — not confrontation — interventions are among the most effective catalysts for treatment entry available to families.",
    "Many families feel helpless watching a loved one struggle with addiction. They fear saying the wrong thing, causing greater harm, or pushing the person further away. At Northbound, we help families move from fear to action — guiding you through every step of the intervention planning process, connecting you with professional interventionists, and ensuring that when your loved one is ready to say yes, a treatment bed and individualized care plan are already waiting.",
  ],
  keyFacts: [
    { icon: "ri-team-line", label: "Approach", value: "Professional Interventionist-Guided" },
    { icon: "ri-phone-line", label: "Support", value: "24/7 Family Admissions Line" },
    { icon: "ri-map-pin-2-line", label: "Service Area", value: "Orange County & Beyond" },
    { icon: "ri-shield-check-line", label: "Treatment Ready", value: "Bed Available Upon Acceptance" },
    { icon: "ri-heart-line", label: "Approach", value: "Compassionate, Non-Confrontational" },
    { icon: "ri-time-line", label: "Response", value: "Same-Day Admissions Available" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "How to Stage a Successful Intervention",
  stepsIntro:
    "A well-organized intervention dramatically improves the likelihood your loved one accepts help. Here is the process Northbound recommends — and helps families execute.",
  steps: [
    {
      number: "01",
      title: "Seek Professional Guidance First",
      icon: "ri-user-star-line",
      body: "Before approaching your loved one, connect with a professional interventionist or addiction counselor who can help you build an effective, safe plan. Northbound's admissions team can connect you with experienced interventionists in Orange County and across California who specialize in addiction intervention.",
    },
    {
      number: "02",
      title: "Assemble Your Intervention Team",
      icon: "ri-group-line",
      body: "Choose team members carefully — people your loved one trusts, respects, and who are genuinely committed to the goal. Avoid individuals who might deviate from the plan, escalate emotions, or undermine the group's resolve. Typically four to eight people is the ideal group size.",
    },
    {
      number: "03",
      title: "Develop and Rehearse the Plan",
      icon: "ri-file-list-line",
      body: "Each participant prepares specific, factual statements describing the impact of the addiction on them personally — and rehearses delivering these statements calmly and compassionately. Having a written script reduces the risk of emotional derailment in the moment. Practice responses to common defensive reactions in advance.",
    },
    {
      number: "04",
      title: "Select the Right Time and Setting",
      icon: "ri-map-pin-2-line",
      body: "Choose a familiar, private, neutral location — the family home, a trusted friend's home, or a counselor's office. Avoid holding the intervention when your loved one is under the influence of substances if possible. Select a time when the group can stay as long as needed without outside pressure.",
    },
    {
      number: "05",
      title: "Have Treatment Ready",
      icon: "ri-hospital-line",
      body: "Before the intervention, confirm that a treatment center has an available bed, accepts the family's insurance, and offers the right level of care for your loved one's situation. Northbound's admissions team coordinates this in advance — so if your loved one says yes, they can be admitted the same day.",
    },
    {
      number: "06",
      title: "Hold the Intervention with Compassion",
      icon: "ri-heart-line",
      body: "Deliver your prepared statements one at a time, clearly and without blame. After presenting the impact and offering a specific treatment solution, be clear about the boundaries your family will hold if the person declines help. End with unified encouragement — you are doing this because you love them.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-hospital-line",
      title: "Treatment Ready on Day One",
      body: "Northbound coordinates bed availability and insurance verification before the intervention so that when your loved one accepts help, same-day admission is possible. There is no waiting period, no scramble for placement — the path to care is already open.",
    },
    {
      icon: "ri-phone-line",
      title: "24/7 Family Support Line",
      body: "Addiction doesn't wait for business hours, and neither does Northbound. Our admissions team is available around the clock to answer questions, provide guidance for family members in crisis, and walk you through the intervention planning process — whenever you need us.",
    },
    {
      icon: "ri-user-star-line",
      title: "Professional Interventionist Network",
      body: "Northbound can connect families with experienced, licensed interventionists in Orange County and across California. Having a professional facilitate the intervention — rather than managing it alone — significantly improves the likelihood of a successful outcome and reduces the risk of the situation escalating.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Insurance Verified in Advance",
      body: "One of the most common barriers to immediate treatment following a successful intervention is insurance uncertainty. Northbound's admissions team verifies benefits and cost before the intervention so the financial picture is clear from day one — removing one more obstacle between your loved one and care.",
    },
    {
      icon: "ri-heart-line",
      title: "Compassion-Centered Approach",
      body: "Northbound coaches families to approach intervention with love, not confrontation. The goal is not to attack or shame — it is to clearly communicate the devastating impact of addiction and present a concrete, ready solution. This approach is more effective and more likely to preserve the relationships that are vital to long-term recovery.",
    },
    {
      icon: "ri-group-line",
      title: "Ongoing Family Support",
      body: "The intervention is just the beginning of the family's role in recovery. Northbound's Family Program — four days each month — provides structured family therapy, education about addiction as a disease, and tools for rebuilding the trust and relationships that addiction has strained.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Intervention", href: "/admissions/interventions/", icon: "ri-heart-line", current: true },
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
    { label: "Virtual IOP", href: "/telehealth-iop-services/", icon: "ri-wifi-line" },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line" },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "What if my loved one refuses treatment during the intervention?",
      a: "Not all interventions result in immediate acceptance — and that is okay. The groundwork laid during a well-organized intervention plants seeds that often lead to treatment entry days or weeks later. It is important that family members follow through on the boundaries they stated during the intervention, as this consistency communicates that the change is real and that the family is unified.",
    },
    {
      q: "Should I hire a professional interventionist?",
      a: "We strongly recommend working with a professional interventionist, especially when the situation involves long-standing addiction, previous failed attempts to address the problem, unstable mental health, or potential volatility. A professional interventionist provides structure, manages emotions, and significantly improves the likelihood of a successful outcome. Northbound can connect you with experienced interventionists in Orange County and beyond.",
    },
    {
      q: "How do I know if an intervention is the right approach?",
      a: "If your loved one is in denial about the severity of their addiction, has refused help in the past, or if the addiction is causing serious harm to themselves or others, an intervention may be appropriate. Northbound's admissions team can help you assess your loved one's situation confidentially and advise on whether an intervention is the right next step.",
    },
    {
      q: "Can the intervention happen on short notice?",
      a: "While careful planning significantly improves outcomes, Northbound understands that some situations are urgent. Our admissions team can expedite intervention planning support and ensure that if your loved one is ready for immediate treatment, a bed and care plan are available. Call us at (866) 311-0003 to discuss your timeline.",
    },
    {
      q: "Does insurance cover addiction treatment after a successful intervention?",
      a: "Yes — most major insurance plans cover medically necessary addiction treatment, including detox, residential, PHP, and IOP. Northbound is in-network with 15+ major carriers and verifies benefits in advance so you know exactly what is covered before the intervention. Our team handles benefits verification at no cost to you.",
    },
    {
      q: "What kind of support does Northbound offer to families during treatment?",
      a: "Northbound's Family Program includes four structured family program days each month in which family members reconnect with their loved one in treatment, participate in family therapy, and receive education about addiction as a disease. Our team also provides ongoing communication with approved family contacts throughout the treatment process.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Ready to Help Your Loved One? We're Here.",
  ctaBody:
    "You don't have to navigate this alone. Northbound's admissions team is available 24/7 to guide your family through the intervention process — and has a treatment program ready for when your loved one says yes.",
};

export default function InterventionsPage() {
  return <TreatmentPageTemplate data={data} />;
}
