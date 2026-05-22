import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_ptsd_hero01.jpg`,
  heroImageAlt: "Peaceful, safe therapy space for PTSD treatment at Northbound Treatment Services",
  substanceName: "PTSD",
  heroHeadline: "PTSD & Addiction Treatment",
  heroItalicWord: "PTSD",
  heroBody:
    "Post-traumatic stress disorder is one of the most powerful drivers of substance use — and one of the most underdiagnosed. At Northbound, our trauma-informed, dual diagnosis program treats PTSD and addiction together, because healing one without the other simply doesn't work.",

  whatItIsHeadline: "What Is PTSD — and How Does It Connect to Addiction?",
  whatItIsBody: [
    "Post-traumatic stress disorder (PTSD) develops after exposure to traumatic events — combat, physical or sexual abuse, accidents, natural disasters, or witnessing violence. It is characterized by four core symptom clusters: intrusive re-experiencing (flashbacks, nightmares), avoidance, negative alterations in mood and cognition, and hyperarousal. PTSD affects approximately 20 million Americans at any given time.",
    "The relationship between PTSD and substance use disorder is profound and bidirectional. Research consistently shows that 30–60% of people seeking treatment for substance use disorders meet criteria for PTSD — and that substances are frequently used as a form of self-medication to manage intrusive symptoms, emotional numbing, hypervigilance, and insomnia. Over time, the substances that once provided relief become their own problem.",
    "Treating addiction without addressing PTSD leaves the root cause intact — and vice versa. When trauma symptoms are unmanaged, the pull to self-medicate is overwhelming. Northbound's integrated dual diagnosis model treats both simultaneously, using trauma-informed therapy approaches including EMDR, trauma-focused CBT, and somatic interventions.",
  ],
  whatItIsImage: `${BASE}/nbt_ptsd_hero01.jpg`,
  whatItIsImageAlt: "Safe, therapeutic environment for trauma and PTSD treatment at Northbound Treatment",
  quickStats: [
    { value: "20M+", label: "Americans living with PTSD" },
    { value: "30–60%", label: "Of substance use disorder clients also have PTSD" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "PTSD often goes unrecognized — especially when substances are being used to manage symptoms. These are the warning signs that trauma and substance use may be co-occurring.",
  warningSigns: [
    "Intrusive memories, flashbacks, or nightmares of traumatic events",
    "Avoiding people, places, or situations associated with trauma",
    "Emotional numbness, detachment, or inability to feel positive emotions",
    "Hypervigilance — constant state of being 'on guard' or easily startled",
    "Using alcohol, opioids, cannabis, or other substances to manage intrusive symptoms or sleep",
    "Insomnia, chronic nightmares, or fear of sleeping",
    "Intense guilt, shame, or negative beliefs about oneself related to a traumatic event",
    "Irritability, emotional outbursts, or reckless behavior",
    "Difficulty concentrating or feeling detached from reality",
    "Relationship difficulties — withdrawal, distrust, or explosive anger",
  ],

  recoveryHeadline: "What PTSD & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "Integrated dual diagnosis treatment for PTSD and addiction requires both trauma-informed clinical expertise and the full continuum of addiction care. Northbound delivers both — from medical stabilization through long-term trauma recovery.",
  careSteps: [
    {
      phase: "Week 1",
      title: "Trauma-Informed Assessment",
      icon: "ri-mental-health-line",
      body: "Every client receives a comprehensive trauma-informed biopsychosocial evaluation. Our clinical team assesses trauma history, PTSD symptom severity, substance use patterns, and co-occurring conditions to build an individualized treatment plan.",
    },
    {
      phase: "Week 1–2",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "When substance use requires medical detox, Northbound's one-eighty program provides 24/7 physician oversight. The detox process is designed to be as safe and comfortable as possible — trauma-sensitive in every way.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Trauma-Focused Treatment",
      icon: "ri-home-heart-line",
      body: "Residential treatment integrates evidence-based trauma therapies — EMDR (Eye Movement Desensitization and Reprocessing), trauma-focused CBT, somatic therapies, and DBT — with addiction recovery programming. PTSD and addiction are treated together in every clinical session.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP maintains intensive trauma therapy and addiction recovery programming — 5 days per week — while clients begin building independent routines. Particular focus on emotional regulation, PTSD symptom management, and relapse prevention.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Continued Trauma Support",
      icon: "ri-refresh-line",
      body: "PTSD recovery is not linear, and triggers can emerge months after treatment. Northbound's aftercare plan includes continued psychiatric monitoring, alumni support, and referrals for ongoing trauma therapy as needed.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "EMDR Therapy",
      body: "Eye Movement Desensitization and Reprocessing is one of the most evidence-supported therapies for PTSD. Northbound's EMDR-trained clinicians integrate it into residential treatment for clients with trauma-driven addiction.",
    },
    {
      icon: "ri-shield-flash-line",
      title: "Trauma-Informed Culture",
      body: "Every staff member at Northbound is trained in trauma-informed care principles — safety, trustworthiness, choice, collaboration, and empowerment guide every clinical interaction.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Dual Diagnosis Integrated Care",
      body: "PTSD and addiction are treated simultaneously by a multidisciplinary team — psychiatrists, trauma therapists, addiction counselors — in a single, coherent treatment plan.",
    },
    {
      icon: "ri-group-line",
      title: "Specialized Trauma Group Therapy",
      body: "Northbound's group therapy tracks include trauma-specific groups where clients with PTSD can process experiences and build coping skills alongside peers who share their clinical reality.",
    },
    {
      icon: "ri-shield-flash-line",
      title: "Trauma-Informed Military & First Responder Care",
      body: "Northbound's trauma-informed clinical team has extensive experience treating combat-related PTSD, first-responder trauma, and co-occurring substance use — integrating military culture and identity into individualized care plans.",
    },
    {
      icon: "ri-award-line",
      title: "38+ Years of Trauma Expertise",
      body: "Northbound's clinical team has treated complex trauma and co-occurring addiction for nearly four decades. Our USC-verified outcomes and JCAHO accreditation reflect the depth of that expertise.",
    },
  ],

  closingImage: `${BASE}/nbt_ptsd_hero01.jpg`,
  closingImageAlt: "Safe, supportive environment for beginning PTSD and addiction recovery at Northbound Treatment",
  closingHeadline: "Trauma Doesn&apos;t Have to Define the Rest of Your Life",
  closingBody: [
    "PTSD can make the world feel permanently dangerous and the past feel permanently present. But trauma is treatable — and so is the addiction that grew around it. Northbound's clinical team has walked this path with thousands of clients, and we know that healing is real.",
    "Our admissions team is available 24 hours a day, 7 days a week. The call is confidential, costs nothing, and comes with no obligation. If trauma and substance use are connected for you or someone you love, we're ready to help.",
  ],
  closingQuote: "What happened to you does not define what happens next. Recovery from PTSD and addiction is possible — and we know how to get there.",

  faqs: [
    {
      question: "What is the relationship between PTSD and addiction?",
      answer:
        "PTSD and addiction are deeply connected. Trauma symptoms — nightmares, hypervigilance, emotional numbing, and intrusive memories — are intensely uncomfortable, and substances often provide the only relief that feels real. Over time, self-medication becomes dependency. Research shows 30–60% of people seeking addiction treatment also meet criteria for PTSD.",
    },
    {
      question: "Does Northbound use EMDR for PTSD treatment?",
      answer:
        "Yes. EMDR (Eye Movement Desensitization and Reprocessing) is one of the most evidence-based therapies for PTSD, and Northbound has EMDR-trained clinicians who integrate it into residential and outpatient treatment. EMDR helps the brain reprocess traumatic memories, reducing their emotional intensity and their pull toward self-medication.",
    },
    {
      question: "What types of trauma does Northbound treat?",
      answer:
        "Northbound treats all forms of trauma — childhood abuse, sexual assault, domestic violence, combat trauma, accidents and injuries, sudden loss, and complex or developmental trauma. Our trauma-informed clinical team is experienced with the full spectrum of traumatic experiences and their relationship to substance use.",
    },
    {
      question: "Do I need to talk about my trauma in group therapy?",
      answer:
        "No. At Northbound, trauma processing is done primarily in individual therapy — one-on-one with your therapist in a safe, controlled environment. Group therapy focuses on skill-building, connection, and shared recovery experience. You will never be pressured to disclose trauma details you're not ready to share.",
    },
    {
      question: "Does Northbound treat veterans and active military with PTSD?",
      answer:
        "Yes. Northbound's trauma-informed dual diagnosis program treats active military, veterans, and first responders with combat-related PTSD and co-occurring addiction. Clinical teams integrate military culture, identity, and the unique profile of service-related trauma into individualized treatment plans.",
    },
    {
      question: "Will insurance cover PTSD and addiction treatment at Northbound?",
      answer:
        "Most major insurance plans cover dual diagnosis treatment for PTSD and substance use disorder. Northbound works with Aetna, Anthem, Cigna, Tricare, and other major insurers. Call (866) 311-0003 for a free, confidential benefits verification — no obligation required.",
    },
  ],

  substanceNameShort: "PTSD",
  relatedSubstances: [
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-mental-health-line" },
    { label: "Trauma Therapy", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-pulse-line" },
    { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis/", icon: "ri-brain-line" },
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-heart-line" },
    { label: "Alcohol", href: "/treatment/alcoholism/", icon: "ri-drop-line" },
  ],
};

export default function PtsdPage() {
  return <SubstancePageTemplate data={data} />;
}
