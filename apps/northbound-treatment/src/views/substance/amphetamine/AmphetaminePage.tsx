import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_amphetamine_hero01.jpg`,
  heroImageAlt: "Person gaining clarity and focus during recovery from amphetamine addiction at Northbound Treatment",
  substanceName: "Amphetamine",
  heroHeadline: "Amphetamine Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Amphetamines — Adderall, Dexedrine, and illicit forms including methamphetamine — are among the most powerfully addictive stimulants known. Whether the addiction began with a prescription or street drugs, Northbound's specialized stimulant program provides the clinical depth needed for lasting recovery.",

  whatItIsHeadline: "What Is Amphetamine Addiction?",
  whatItIsBody: [
    "Amphetamines are a class of central nervous system stimulants that work by flooding the brain with dopamine, norepinephrine, and serotonin — producing surges of energy, focus, confidence, and euphoria. Prescription amphetamines (Adderall, Dexedrine, Vyvanse) are prescribed for ADHD and narcolepsy. Methamphetamine is a more potent, illicitly manufactured form of amphetamine. All share a similar mechanism of action and a high potential for addiction.",
    "Amphetamine addiction develops through two overlapping pathways: physical tolerance (needing increasingly higher doses for the same effect) and psychological dependency (the belief that one cannot perform, concentrate, or feel good without the drug). Unlike opioids or alcohol, amphetamines don't produce a dramatic physical withdrawal syndrome — but the psychological crash after stopping is severe: profound depression, exhaustion, hypersomnia, and an anhedonia (inability to feel pleasure) that can persist for weeks.",
    "High-achieving professionals, students, and individuals with undiagnosed ADHD are at particular risk for prescription amphetamine addiction. Illicit amphetamine and meth use occurs across all demographics. Both pathways lead to the same place — a brain that has lost its ability to function normally without chemical stimulation.",
  ],
  whatItIsImage: `${BASE}/nbt_cocaine_therapy01.jpg`,
  whatItIsImageAlt: "Group therapy session for stimulant and amphetamine addiction recovery at Northbound Treatment",
  quickStats: [
    { value: "6M+", label: "Americans misuse prescription stimulants annually" },
    { value: "2–3 wks", label: "Duration of acute amphetamine withdrawal" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Amphetamine addiction often develops gradually, masked by performance or productivity. These are the warning signs that stimulant use has become clinically problematic.",
  warningSigns: [
    "Taking amphetamines more frequently or at higher doses than prescribed",
    "Using amphetamines to manage mood, anxiety, or low energy — not just focus",
    "Experiencing a crash — profound fatigue, depression, irritability — when not using",
    "Failed attempts to cut down or stop despite wanting to",
    "Continuing to use despite relationship, health, or work problems",
    "Obtaining amphetamines without a prescription or through illicit channels",
    "Needing amphetamines to feel 'normal,' confident, or capable in daily life",
    "Significant weight loss, reduced appetite, or chronic sleep disruption",
    "Paranoia, anxiety, or psychosis associated with use",
    "Financial problems related to obtaining amphetamines or losing work due to use",
  ],

  recoveryHeadline: "What Amphetamine Recovery Looks Like at Northbound",
  recoveryIntro:
    "Because amphetamine addiction is primarily a psychological disease, effective treatment focuses on restructuring thought patterns, healing the brain's reward system, and addressing the co-occurring conditions that drive use. Northbound's stimulant-specialized program provides the clinical depth this requires.",
  careSteps: [
    {
      phase: "Days 1–14",
      title: "Assessment & Medical Stabilization",
      icon: "ri-heart-pulse-line",
      body: "The amphetamine crash period — characterized by extreme fatigue, depression, hypersomnia, and intense cravings — is medically managed during the first 1–2 weeks. Northbound's physicians provide psychiatric evaluation, safety monitoring, and medication support as needed during this vulnerable phase.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Residential care addresses the psychological and neurological patterns of stimulant addiction. Evidence-based therapies — CBT, DBT, motivational interviewing — alongside group counseling, family therapy, and dual-diagnosis treatment for co-occurring ADHD, depression, anxiety, or trauma form the backbone of this phase.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of intensive programming as clients begin rebuilding independent routines. Relapse prevention, executive function restoration, and management of high-risk social and professional environments are the focus.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows clients to return to work, school, or family life while maintaining 10–12 hours of weekly clinical support. Northbound's InVivo® model specifically practices coping with the performance and productivity pressures that often drive stimulant use.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Support",
      icon: "ri-refresh-line",
      body: "Amphetamine cravings and anhedonia can resurface months after cessation. Northbound's aftercare program provides ongoing psychiatric monitoring and alumni community accountability.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Stimulant-Specialized Clinical Team",
      body: "Amphetamine addiction presents differently from opioid or alcohol addiction. Northbound's clinicians specialize in stimulant use disorders — the neuroscience, the psychological patterns, and the co-occurring conditions that make this addiction uniquely challenging.",
    },
    {
      icon: "ri-mental-health-line",
      title: "ADHD & Dual-Diagnosis Expertise",
      body: "Many amphetamine-addicted individuals have underlying ADHD, depression, or anxiety. Northbound's psychiatrists diagnose and treat co-occurring conditions with non-stimulant alternatives, so recovery doesn't require sacrificing mental health.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® & Careerbound® Programs",
      body: "Amphetamine addiction disproportionately affects students and high-achieving professionals. Collegebound® and Careerbound® — available exclusively during residential treatment — address the unique pressures and trajectories that drive stimulant use in these populations.",
    },
    {
      icon: "ri-refresh-line",
      title: "Anhedonia Recovery Support",
      body: "The inability to feel pleasure after stopping amphetamines can last weeks or months. Northbound's treatment specifically supports the neurological recovery process — with psychiatric monitoring, structured activity, and patience.",
    },
    {
      icon: "ri-group-line",
      title: "Peer Recovery Community",
      body: "Stimulant addiction is often a solitary, high-functioning addiction — making peer connection in recovery uniquely valuable. Northbound's group therapy model builds genuine community and accountability.",
    },
    {
      icon: "ri-award-line",
      title: "38+ Years, USC-Verified Results",
      body: "Northbound's clinical model — developed and refined over nearly four decades — produces a greater than 97% drug abstinence rate at six months as verified by USC researchers.",
    },
  ],

  closingImage: `${BASE}/nbt_amphetamine_hero01.jpg`,
  closingImageAlt: "Person experiencing clarity and focus during amphetamine addiction recovery at Northbound",
  closingHeadline: "Your Brain Can Heal. Recovery From Amphetamines Is Real.",
  closingBody: [
    "Amphetamine addiction steals the very things it promises — focus, energy, confidence, productivity. But the brain's capacity to heal is profound, and with the right clinical support, those qualities return — naturally and sustainably.",
    "Northbound's admissions team is available 24/7, at no cost and no obligation. The call is confidential. If you're struggling with amphetamine addiction — prescription or otherwise — today is the right time to reach out.",
  ],
  closingQuote: "You were capable and driven before amphetamines gave you a shortcut. That person is still there. We help you find them.",

  faqs: [
    {
      question: "Is amphetamine withdrawal physically dangerous?",
      answer:
        "Amphetamine withdrawal is rarely medically life-threatening in the way that alcohol or benzo withdrawal can be. However, severe depression during the crash phase is associated with suicidal ideation, making medical supervision during this period important. The psychological symptoms — depression, fatigue, anhedonia, cravings — are the primary clinical concern.",
    },
    {
      question: "What is the difference between Adderall and meth — are they treated the same way?",
      answer:
        "Adderall and methamphetamine are both amphetamine-class stimulants and work through similar mechanisms, but meth is significantly more potent and produces a more intense, faster-onset high. The addiction treatment approach is similar for both, though meth addiction typically involves more severe neurological impact and may require longer residential care.",
    },
    {
      question: "I have ADHD and was prescribed amphetamines. Can I still get treatment?",
      answer:
        "Yes. Many clients arrive at Northbound with legitimate ADHD diagnoses and prescriptions that escalated into addiction. Our psychiatrists will evaluate your ADHD comprehensively and develop a non-stimulant treatment plan — so recovery doesn't require sacrificing your ability to manage ADHD.",
    },
    {
      question: "Are there medications that help with amphetamine addiction?",
      answer:
        "Currently, no FDA-approved medications specifically target amphetamine use disorder. However, medications for co-occurring conditions — antidepressants for depression, non-stimulant ADHD medications (Strattera, Wellbutrin) — can significantly support recovery. Northbound's physicians evaluate each client individually.",
    },
    {
      question: "How long does amphetamine addiction treatment take?",
      answer:
        "Clinical guidelines recommend a minimum of 90 days for stimulant use disorder treatment. Most Northbound clients engage in 3–6 months of structured care across medical stabilization, residential, PHP, and IOP phases, with ongoing aftercare support.",
    },
    {
      question: "Will insurance cover amphetamine addiction treatment?",
      answer:
        "Most major insurance plans cover stimulant use disorder treatment. Northbound works with Aetna, Anthem, Cigna, Tricare, and other major insurers. Call (866) 311-0003 for a free, confidential benefits check.",
    },
  ],

  substanceNameShort: "Amphetamine",
  relatedSubstances: [
    { label: "Adderall", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Meth", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Cocaine", href: "/treatment/cocaine/", icon: "ri-pulse-line" },
    { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis/", icon: "ri-brain-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-medicine-bottle-line" },
    { label: "MAT", href: "/treatment/medication-assisted-treatment/", icon: "ri-flask-line" },
  ],
};

export default function AmphetaminePage() {
  return <SubstancePageTemplate data={data} />;
}
