import TreatmentPageTemplate, { type TreatmentPageData } from "@/views/shared/TreatmentPageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_residential_hero01.jpg";

const data: TreatmentPageData = {
  /* ── Hero ─────────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Residents in a warm, home-like living area at Northbound's residential treatment center in Southern California",
  eyebrow: "Addiction Treatment Programs",
  programName: "Residential Inpatient Treatment",
  italicWord: "Residential",
  tagline: "Immersive, 24/7 inpatient care for lasting recovery in Orange County, CA",
  heroBody:
    "Northbound's residential treatment program provides a structured, full-immersion environment where clients can step away from triggers and focus entirely on healing — supported by a clinical team with over 200 years of combined expertise.",
  breadcrumbs: [
    { label: "Treatment Services", href: "/treatment/" },
    { label: "Residential Treatment" },
  ],

  /* ── Overview ─────────────────────────────────────────────── */
  overviewHeadline: "What Is Residential Treatment?",
  overviewBody: [
    "Residential inpatient treatment is an immersive level of care in which clients live on-site at a structured treatment facility and receive clinical programming daily. It is typically recommended following medically supervised detox and before stepping down to a partial hospitalization program (PHP). At Northbound, residential care goes far beyond stabilization — it is where the foundational work of recovery happens.",
    "Our Orange County residential program is built around the InVivo® (\"in life\") philosophy — Northbound's signature model of care in which clients actively practice living life on life's terms within a safe, supported treatment environment. Rather than isolating clients from the real world, we gradually introduce real-world responsibilities, activities, and choices as clients progress. From evidence-based therapy to gender-responsive programming to experiential modalities, every element of care is designed to build real-world skills alongside clinical insight.",
  ],
  keyFacts: [
    { icon: "ri-time-line", label: "Typical Duration", value: "30–90 Days" },
    { icon: "ri-home-heart-line", label: "Level of Care", value: "24/7 Residential Inpatient" },
    { icon: "ri-team-line", label: "Staffing", value: "1:1 Staff-to-Client Ratio" },
    { icon: "ri-map-pin-2-line", label: "Locations", value: "Orange County, San Diego, Seattle" },
    { icon: "ri-shield-check-line", label: "Insurance", value: "15+ Major Plans Accepted" },
    { icon: "ri-award-line", label: "Accreditation", value: "DHCS Licensed · NAATP Member" },
  ],

  /* ── Steps ────────────────────────────────────────────────── */
  stepsHeadline: "What to Expect in Residential Treatment",
  stepsIntro:
    "From day one, your clinical team creates a personalized path forward — integrating therapy, community, and real-world skill-building into every week of care.",
  steps: [
    {
      number: "01",
      title: "Individualized Assessment & Treatment Planning",
      icon: "ri-file-list-line",
      body: "Upon admission, you are evaluated by a multidisciplinary team — MD, primary therapist, trauma therapist, and counselors — to build a treatment plan tailored to your history, goals, and co-occurring conditions. You are an active participant in this process from the start.",
    },
    {
      number: "02",
      title: "Daily Clinical Programming",
      icon: "ri-calendar-check-line",
      body: "Structured daily schedules include individual therapy, group counseling, psychoeducation, trauma-focused sessions, and specialty programming such as DBT, EMDR, music therapy, and art therapy. Evidence-based modalities are combined with experiential approaches for comprehensive healing.",
    },
    {
      number: "03",
      title: "Gender-Responsive & Specialty Tracks",
      icon: "ri-group-line",
      body: "Northbound offers dedicated men's and women's residential programs, as well as the faith-based LINKS program for those whose spirituality is central to recovery. Research shows that gender-specific programming improves retention and outcomes.",
    },
    {
      number: "04",
      title: "Family Integration",
      icon: "ri-heart-line",
      body: "Four days each month, family members participate in Northbound's Family Program — reconnecting, repairing relationships damaged by addiction, and learning the science of the disease. Family involvement is one of the strongest predictors of long-term recovery.",
    },
    {
      number: "05",
      title: "InVivo® Real-World Practice",
      icon: "ri-refresh-line",
      body: "As clients progress, Northbound's InVivo® model introduces graduated real-world engagement — phones, social interaction, independent activities. You learn to navigate life's challenges with coping skills and clinician support before returning to full independence.",
    },
    {
      number: "06",
      title: "Step-Down Planning to PHP",
      icon: "ri-map-line",
      body: "Residential treatment is one chapter in your continuum of care. Your clinical team coordinates a seamless transition to our Partial Hospitalization Program (PHP), ensuring you maintain momentum, clinical accountability, and community support as you increase independence.",
    },
  ],

  /* ── Differentiators ──────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-refresh-line",
      title: "The InVivo® Model",
      body: "Most residential programs isolate clients from reality. Northbound's InVivo® model does the opposite — clients practice real-world skills, engage with their communities, and build self-efficacy while still in the safety of the clinical environment. The result is a more confident, prepared individual at discharge.",
    },
    {
      icon: "ri-team-line",
      title: "1:1 Ratio · 1/3 Are Alumni",
      body: "Every client is supported by a personal treatment team of up to six clinicians, including an ASAM-certified addiction psychiatrist, licensed primary therapist, trauma therapist, and addictions counselor. About one-third of our staff are program alumni — so you're guided by people who've lived this process.",
    },
    {
      icon: "ri-group-line",
      title: "Gender-Responsive Programming",
      body: "Men and women experience addiction differently, and recovery should reflect that. Our dedicated men's and women's residential tracks address the distinct emotional, relational, and physiological dimensions of addiction — creating an environment of safety and deeper understanding.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Integrated Dual-Diagnosis Care",
      body: "Under Medical Director Dr. Venice Sanchez — double board-certified in Psychiatry and Addiction Medicine — Northbound treats addiction alongside co-occurring mental health conditions from day one. Trauma, PTSD, depression, anxiety, and more are addressed in an integrated, holistic framework.",
    },
    {
      icon: "ri-home-heart-line",
      title: "A True Home Environment",
      body: "Our residential facilities across Orange County and beyond are designed to feel like home, not a hospital. Comfortable furnishings, communal spaces, and peaceful settings create the psychological safety needed for genuine healing and community.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® & Careerbound®",
      body: "For young adults whose education or careers have been derailed by addiction, Northbound offers specialized tracks to support academic and professional reintegration — so recovery strengthens, rather than pauses, your future.",
    },
  ],

  /* ── Continuum ────────────────────────────────────────────── */
  continuum: [
    { label: "Medical Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
    { label: "Residential", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line", current: true },
    { label: "PHP", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
    { label: "IOP", href: "/programs/intensive-outpatient-treatment/", icon: "ri-calendar-check-line" },
    { label: "Sober Living", href: "/treatment/transitional-living-programs/sober-living/", icon: "ri-building-2-line" },
    { label: "Aftercare", href: "/programs/aftercare/", icon: "ri-refresh-line" },
  ],

  /* ── FAQ ──────────────────────────────────────────────────── */
  faqs: [
    {
      q: "How long does residential treatment at Northbound last?",
      a: "The length of residential treatment varies based on individual clinical need. ASAM guidelines inform level-of-care recommendations, but most clients complete residential treatment in 30 to 90 days. Longer stays are associated with better long-term outcomes, and our clinical team evaluates readiness for step-down on an ongoing basis.",
    },
    {
      q: "What does a typical day look like in residential treatment?",
      a: "Days are structured and purposeful. Clients participate in morning check-ins, individual therapy sessions, group counseling, specialty programming (DBT, EMDR, music therapy, art therapy, yoga), psychoeducation groups, and evening community meetings. Schedules are designed to build routine and reduce idle time — two key relapse prevention factors.",
    },
    {
      q: "Can I use my phone during residential treatment?",
      a: "Phone and device access is introduced gradually through Northbound's InVivo® model. Early in treatment, limited device use helps clients focus on recovery. As clients demonstrate clinical progress, real-world responsibilities — including phone access — are progressively reintroduced with therapeutic guidance.",
    },
    {
      q: "Is Northbound's residential program gender-specific?",
      a: "Yes. Northbound offers dedicated men's and women's residential programs. Research consistently shows that gender-responsive programming improves treatment retention and long-term outcomes. Both programs use evidence-based therapies while addressing the unique needs each gender faces in recovery.",
    },
    {
      q: "Does insurance cover residential treatment?",
      a: "Most major insurance plans provide coverage for medically necessary residential treatment. Northbound is a preferred in-network provider with 15+ major carriers including Aetna, Anthem/BCBS, Cigna, Tricare, and more. Our admissions team verifies your benefits at no cost and helps you understand your coverage before admission.",
    },
    {
      q: "What happens after residential treatment is complete?",
      a: "Completing residential treatment is a milestone, not a finish line. Most clients transition to our Partial Hospitalization Program (PHP), which maintains clinical intensity while introducing greater independence. Our team coordinates every step-down to ensure continuity and prevent relapse during vulnerable transitions.",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  ctaHeadline: "Ready to Begin Residential Treatment?",
  ctaBody:
    "Our residential program in Orange County provides the clinical depth, community, and structure that lasting recovery requires. Verify your benefits today — most major insurance plans cover care.",
};

export default function ResidentialPage() {
  return <TreatmentPageTemplate data={data} />;
}
