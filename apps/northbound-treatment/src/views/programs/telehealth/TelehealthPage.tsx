import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";
import { GARDEN_GROVE_IMAGES } from "@/views/home/assets";

const HERO = GARDEN_GROVE_IMAGES.interior;

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Person attending a telehealth therapy session on a laptop from their home — Northbound's virtual IOP program",
  eyebrow: "Virtual Addiction Treatment",
  programName: "Online IOP & Telehealth Services",
  italicWord: "Online",
  tagline: "Northbound's full-spectrum IOP and outpatient care — from the safety of your home",
  heroBody:
    "Northbound's HomeBound program delivers evidence-based individual therapy, group counseling, psychiatry, and case management virtually — available to clients in California with the same clinical rigor as our in-person programs.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Online IOP & Telehealth" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is Northbound's HomeBound Virtual Program?",
  overviewBody: [
    "Northbound's HomeBound online treatment program has been operating since January 2016 — well before virtual care became mainstream. HomeBound offers IOP (Intensive Outpatient), OP (Outpatient), and Addiction Support Services through secure video sessions from our Garden Grove clinical hub, serving clients in California with the same clinical quality as our in-person programs.",
    "Online substance abuse treatment removes the barriers of geography, stigma, and scheduling. Whether you've just completed residential treatment and need to continue care, are managing a relapse, or are seeking a first-step intervention without disrupting work or family, HomeBound meets you where you are. All you need is a phone, computer, or tablet — and our team handles the rest through an easy-to-navigate video conferencing platform.",
  ],
  keyFacts: [
    { icon: "ri-computer-line", label: "Format", value: "Secure Video (Zoom-Based)" },
    { icon: "ri-calendar-check-line", label: "Frequency", value: "Flexible Scheduling" },
    { icon: "ri-hospital-line", label: "Levels of Care", value: "IOP, OP, Support Services" },
    { icon: "ri-map-pin-2-line", label: "Available In", value: "California" },
    { icon: "ri-home-2-line", label: "Clinical Hub", value: "Garden Grove, CA" },
    { icon: "ri-shield-check-line", label: "Insurance", value: "Most Major Plans Accepted" },
    { icon: "ri-time-line", label: "Program Start", value: "Since January 2016" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "How HomeBound Virtual Treatment Works",
  stepsIntro:
    "Getting started with virtual treatment at Northbound is straightforward — our team walks you through setup and builds a schedule that fits your life.",
  steps: [
    {
      number: "01",
      title: "Call & Initial Assessment",
      icon: "ri-phone-line",
      body: "Your journey begins with a confidential call to our admissions team. We assess your clinical needs, verify your insurance benefits, and determine the appropriate level of virtual care — IOP, outpatient, or support services. Most clients are scheduled within days.",
    },
    {
      number: "02",
      title: "Tech Setup & Onboarding",
      icon: "ri-computer-line",
      body: "All you need is a smartphone, tablet, or computer with an internet connection. Our team walks you through our secure Zoom-based platform so you're comfortable and connected before your first session. Technical difficulty is never a barrier to care.",
    },
    {
      number: "03",
      title: "Individualized Schedule",
      icon: "ri-calendar-check-line",
      body: "Working with your care coordinator, you build a virtual treatment schedule that accommodates your work, school, or family commitments. Day, evening, and combination scheduling options are available — flexibility is central to HomeBound's design.",
    },
    {
      number: "04",
      title: "Virtual Group & Individual Therapy",
      icon: "ri-group-line",
      body: "Your weekly programming includes live group therapy sessions, regular individual therapy with your assigned licensed therapist, psychoeducation groups, and case management check-ins — all delivered through high-quality secure video.",
    },
    {
      number: "05",
      title: "Ongoing Psychiatric Care",
      icon: "ri-mental-health-line",
      body: "Psychiatric services and medication management are available through HomeBound for clients who need them. Dual-diagnosis care for co-occurring mental health conditions continues virtually — ensuring recovery from addiction and mental health disorders progress together.",
    },
    {
      number: "06",
      title: "Step-Down & Aftercare Planning",
      icon: "ri-map-line",
      body: "As you progress through virtual IOP, your clinical team builds your aftercare plan — connecting you with alumni programming, ongoing therapy referrals, recovery support networks, and the resources needed to sustain recovery beyond formal treatment.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-map-pin-2-line",
      title: "Geographic Freedom",
      body: "Northbound's HomeBound program serves clients across California — removing the limit of distance from high-quality, specialized addiction care. Clients in rural areas, those unable to drive, or those who simply prefer home-based care all access the same clinical rigor.",
    },
    {
      icon: "ri-eye-off-line",
      title: "Privacy Without Stigma",
      body: "Virtual treatment eliminates the stigma concern of being seen at a treatment facility. Clients attend from home, their office, or any private space — giving them the privacy to focus on recovery without worrying about who might recognize them in a waiting room.",
    },
    {
      icon: "ri-time-line",
      title: "Continuous Support Between Sessions",
      body: "HomeBound's digital-first structure improves therapist availability and responsiveness between sessions. Clients benefit from timely check-ins, motivational communication, and faster escalation pathways if clinical situations require immediate attention.",
    },
    {
      icon: "ri-award-line",
      title: "8+ Years of Virtual Care Experience",
      body: "Northbound launched HomeBound in January 2016 — long before telehealth became standard practice. Our clinical team has refined virtual treatment delivery for nearly a decade, creating a program that genuinely replicates the engagement and effectiveness of in-person care.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Signature Programs Available Virtually",
      body: "Northbound's signature programs — including trauma-focused therapy and 12-step engagement — are available through HomeBound. Your treatment plan is individualized with the same access to specialty programming as in-person participants.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Dual-Diagnosis Care Included",
      body: "HomeBound fully integrates mental health treatment alongside addiction care. Psychiatry, medication management, EMDR, DBT, and trauma therapy are all available virtually — because true recovery requires treating the whole person, not just the substance use.",
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
      q: "Is virtual IOP as effective as in-person treatment?",
      a: "Research shows no significant difference in outcomes or patient satisfaction between videoconference-based addiction treatment and in-person care when delivered by qualified clinicians. Northbound has been delivering virtual IOP since 2016 and has refined our HomeBound program over nearly a decade. For many clients, the accessibility and privacy of virtual care actually improves engagement and completion rates.",
    },
    {
      q: "What do I need to participate in HomeBound?",
      a: "All you need is a smartphone, tablet, or computer with a reliable internet connection and a private space to attend sessions. Northbound's team walks you through setup on our secure Zoom-based platform before your first session — no prior technical experience required.",
    },
    {
      q: "Who is virtual IOP appropriate for?",
      a: "HomeBound is appropriate for clients stepping down from residential or PHP care; those who need IOP but cannot attend in person due to geography, work, family, or health constraints; and those who want privacy from the stigma of attending an in-person facility. It is not appropriate for clients in active crisis or who lack adequate support between sessions.",
    },
    {
      q: "Is online addiction treatment covered by insurance?",
      a: "Most major insurance plans cover virtual IOP and outpatient treatment, particularly following federal telehealth expansion policies. Northbound verifies your insurance benefits at no cost before your first session. Coverage varies by plan and state, and our admissions team will walk you through your specific benefits and any out-of-pocket responsibility.",
    },
    {
      q: "What states is HomeBound available in?",
      a: "Northbound's HomeBound virtual IOP is currently available to residents of California. If you are located in another state, please call our admissions team — we will help identify appropriate treatment resources in your area.",
    },
    {
      q: "Can I transition from virtual to in-person treatment?",
      a: "Yes. Northbound's HomeBound program is integrated into the same clinical continuum as our in-person programs. If you begin with virtual care and want to transition to an in-person level of care, or vice versa, your clinical team coordinates that transition seamlessly — maintaining continuity of therapeutic relationships and treatment planning wherever possible.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Start Virtual Treatment Today",
  ctaBody:
    "Northbound's HomeBound program brings clinically rigorous IOP and outpatient care directly to you — no travel required. Most insurance accepted. Available in California.",
};

export default function TelehealthPage() {
  return <TreatmentPageTemplate data={data} />;
}
