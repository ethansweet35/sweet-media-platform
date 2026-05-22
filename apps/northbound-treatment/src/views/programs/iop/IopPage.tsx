import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";
import { SERVICE_IMAGES } from "@/views/home/assets";

const HERO = SERVICE_IMAGES.supportGroup;

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Small outpatient therapy group engaged in conversation at Northbound's intensive outpatient program in Orange County",
  eyebrow: "Addiction Treatment Programs",
  programName: "Intensive Outpatient Program (IOP)",
  italicWord: "Intensive",
  tagline: "Flexible, structured outpatient care built around your life — Orange County, CA",
  heroBody:
    "Northbound's IOP delivers a minimum of nine clinical hours per week with flexible day and evening scheduling — so you can maintain your recovery without stepping away from work, school, or family.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Intensive Outpatient (IOP)" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is an Intensive Outpatient Program?",
  overviewBody: [
    "An Intensive Outpatient Program (IOP) is a structured level of addiction treatment in which clients attend clinical programming for 6 to 12 hours per week while continuing daily life outside of treatment sessions. IOP sits between Partial Hospitalization (PHP) and ongoing outpatient support on the continuum of care, and is appropriate for those who are ready to begin reintegrating into daily life with continued clinical accountability.",
    "At Northbound, IOP is not a lesser version of residential care — it is the phase where clients apply everything learned in earlier treatment to real-world situations: careers, relationships, routines, and triggers. With flexible scheduling options and access to trauma-focused therapy, DBT skills groups, and the faith-based LINKS track where clinically appropriate, IOP is individualized to meet each client exactly where they are.",
  ],
  keyFacts: [
    { icon: "ri-time-line", label: "Hours per Week", value: "6–12 Hours" },
    { icon: "ri-calendar-check-line", label: "Schedule", value: "Day, Evening, or Combination" },
    { icon: "ri-hospital-line", label: "Level of Care", value: "Intensive Outpatient" },
    { icon: "ri-map-pin-2-line", label: "Location", value: "Orange County, CA" },
    { icon: "ri-shield-check-line", label: "Insurance", value: "15+ Major Plans Accepted" },
    { icon: "ri-wifi-line", label: "Also Available", value: "Virtual IOP (HomeBound)" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "What to Expect in IOP",
  stepsIntro:
    "IOP is where recovery meets real life. Every component of the program is designed to build the skills, accountability, and community you need to thrive outside of treatment.",
  steps: [
    {
      number: "01",
      title: "Intake & Individualized Scheduling",
      icon: "ri-file-list-line",
      body: "Your admissions coordinator and clinical team work with you to build an IOP schedule that fits your life — day programming, evening sessions, or a combination. From the start, Northbound's approach centers on meeting you where you are, not the other way around.",
    },
    {
      number: "02",
      title: "Individual & Group Therapy",
      icon: "ri-group-line",
      body: "Regular individual sessions with your licensed primary therapist continue throughout IOP, complemented by structured group therapy sessions covering relapse prevention, life skills, emotional regulation, peer accountability, and process groups rooted in evidence-based models.",
    },
    {
      number: "03",
      title: "Specialty Tracks & Signature Services",
      icon: "ri-award-line",
      body: "IOP clients have access to DBT skills groups, the faith-based LINKS track, trauma-focused therapy, and dual-diagnosis psychiatric care — tailored to your treatment plan. Collegebound® and Careerbound® are available only during residential treatment.",
    },
    {
      number: "04",
      title: "Dual-Diagnosis & Psychiatric Care",
      icon: "ri-brain-line",
      body: "Northbound's IOP maintains full dual-diagnosis capability. Psychiatric services, medication management, and co-occurring mental health treatment continue at the IOP level — so recovery from addiction and mental health disorders progresses together, not separately.",
    },
    {
      number: "05",
      title: "12-Step Engagement & Community",
      icon: "ri-community-line",
      body: "IOP integrates 12-Step engagement, alumni connection, and peer recovery community as core components. Recovery is a team sport — and Northbound's alumni network, combined with the accountability of the IOP community, significantly improves long-term outcomes.",
    },
    {
      number: "06",
      title: "Step-Down to Outpatient & Aftercare",
      icon: "ri-arrow-right-line",
      body: "As you build confidence and stability in IOP, your clinical team develops your aftercare plan for the transition to standard outpatient or Addiction Support Services. This includes relapse prevention strategies, community resources, alumni engagement, and ongoing therapy referrals.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-calendar-check-line",
      title: "Flexible Scheduling for Real Life",
      body: "Northbound's IOP offers day, evening, and combination schedules — because recovery shouldn't require leaving your job, family, or responsibilities. Flexible programming removes the barriers to treatment so that more people can access the care they need.",
    },
    {
      icon: "ri-refresh-line",
      title: "Practice Recovery in Real Life",
      body: "IOP is where clinical learning meets real-world application. Clients practice navigating workplace dynamics, relationships, financial stress, and social situations — with the safety net of ongoing clinical support. This real-world practice, paired with continued therapy, significantly reduces post-treatment relapse risk.",
    },
    {
      icon: "ri-mental-health-line",
      title: "DBT & Trauma-Focused Therapy",
      body: "Our masters-prepared DBT therapists deliver evidence-based skills training in awareness, distress tolerance, interpersonal effectiveness, and emotional regulation. Trauma-focused programming continues for those with PTSD or trauma histories, addressing the root causes of addiction.",
    },
    {
      icon: "ri-team-line",
      title: "Continuity of Your Clinical Team",
      body: "Transitioning to IOP doesn't mean starting over. Northbound's clinical team maintains relationships built through residential and PHP — preserving therapeutic momentum, trust, and insight through every step of the continuum.",
    },
    {
      icon: "ri-leaf-line",
      title: "Experiential Therapy",
      body: "Experiential modalities — yoga, meditation, and art therapy — remain available in IOP. These non-traditional therapeutic tools provide meaningful emotional outlets and positive coping mechanisms that serve clients well beyond treatment.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
    { label: "Virtual IOP", href: "/telehealth-iop-services/", icon: "ri-wifi-line", current: true },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line" },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "Who is IOP appropriate for?",
      a: "IOP is ideal for individuals who have completed residential treatment or PHP and are ready for a step-down level of care, those transitioning from a higher level of care, or those who need structured clinical support while maintaining work, school, or family commitments. Clients must be safely detoxed prior to entering IOP. It is also appropriate following a relapse as a re-entry point to treatment.",
    },
    {
      q: "How many hours per week is Northbound's IOP?",
      a: "Northbound's IOP provides a minimum of 9 service hours per week. Depending on clinical need and scheduling, participation can range from 6 to 12 hours per week. Schedules are individualized through a combination of day, evening, and flexible programming options.",
    },
    {
      q: "Can I work or go to school while in IOP?",
      a: "Yes — that is one of IOP's primary design goals. Flexible scheduling allows most clients to maintain employment or academic commitments while attending treatment.",
    },
    {
      q: "Does insurance cover IOP?",
      a: "Most major insurance plans cover medically necessary intensive outpatient treatment. Northbound is in-network with 15+ major carriers and verifies your benefits at no cost before admission. Our admissions team walks you through coverage details and any out-of-pocket responsibility.",
    },
    {
      q: "What therapies are offered in IOP?",
      a: "Northbound's IOP includes individual therapy, group counseling, DBT skills groups, trauma-focused therapy, psychoeducation, 12-step engagement, psychiatric services as needed, drug testing, case management, and access to signature programs such as LINKS and the family program where clinically appropriate.",
    },
    {
      q: "What happens after IOP is complete?",
      a: "Following IOP, most clients transition to Northbound's outpatient Addiction Support Services or a structured aftercare plan that includes ongoing therapy, alumni community engagement, and relapse prevention planning. Your clinical team builds your aftercare plan in advance so the transition is supported and seamless.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Start IOP on Your Schedule",
  ctaBody:
    "Northbound's Intensive Outpatient Program fits recovery into your life — flexible scheduling, evidence-based clinical care, and the full support of a team that's been there. Most insurance plans accepted.",
};

export default function IopPage() {
  return <TreatmentPageTemplate data={data} />;
}
