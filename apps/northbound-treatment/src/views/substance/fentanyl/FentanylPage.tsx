import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_fentanyl_hero01.jpg`,
  heroImageAlt: "Person in therapy session seeking help for fentanyl addiction at Northbound Treatment",
  substanceName: "Fentanyl",
  heroHeadline: "Fentanyl Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Fentanyl is 50 to 100 times more potent than morphine and now drives the majority of overdose deaths in America. At Northbound, our medically supervised fentanyl addiction program combines evidence-based detox, medication-assisted treatment, and long-term therapeutic support to give clients a real chance at lasting recovery.",

  whatItIsHeadline: "What Is Fentanyl Addiction?",
  whatItIsBody: [
    "Fentanyl is a synthetic opioid originally developed for managing severe pain in cancer patients and post-surgical settings. Because of its extreme potency, even tiny amounts can trigger rapid physical dependence. Today, illicitly manufactured fentanyl — often pressed into counterfeit pills or mixed into heroin, cocaine, and methamphetamine — is responsible for more than 70% of drug overdose deaths in the United States.",
    "Physical dependence on fentanyl develops quickly. Tolerance builds within days of regular use, requiring ever-larger doses to avoid withdrawal. Withdrawal from fentanyl is intensely uncomfortable — muscle cramping, sweating, anxiety, insomnia, and powerful cravings — making self-detox dangerous and rarely successful. Medical supervision is essential.",
    "Fentanyl addiction is a chronic brain disease, not a moral failure. It rewires the brain's reward pathways in ways that make stopping without professional help extraordinarily difficult. With the right clinical support, however, recovery is absolutely achievable.",
  ],
  whatItIsImage: `${BASE}/nbt_fentanyl_therapy01.jpg`,
  whatItIsImageAlt: "Compassionate therapist conducting a one-on-one session for opioid addiction recovery",
  quickStats: [
    { value: "80,000+", label: "Fentanyl-involved overdose deaths in the U.S. annually" },
    { value: "100×", label: "More potent than morphine" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Fentanyl addiction can develop in weeks. These are the clinical warning signs that use has crossed into physical and psychological dependence — for yourself or someone you love.",
  warningSigns: [
    "Using more fentanyl than intended, or being unable to stop despite wanting to",
    "Developing tolerance — needing higher doses for the same effect",
    "Experiencing withdrawal when not using: sweating, cramping, nausea, insomnia, anxiety",
    "Using fentanyl primarily to feel 'normal' or to avoid being sick",
    "Doctor shopping or obtaining fentanyl through illicit channels",
    "Neglecting work, family, finances, or health due to fentanyl use",
    "Continuing to use despite knowing the risk of overdose",
    "Isolating from friends and family; secrecy around drug use",
    "Mood swings, irritability, or depression between uses",
    "Carrying naloxone (Narcan) or having witnessed a peer overdose",
  ],

  recoveryHeadline: "What Fentanyl Recovery Looks Like at Northbound",
  recoveryIntro:
    "Because of fentanyl's extreme potency, a structured medical approach to recovery is not optional — it's life-saving. Northbound provides the full continuum of opioid addiction care, from medically managed detox through long-term aftercare.",
  careSteps: [
    {
      phase: "Days 1–7",
      title: "Medical Detox & Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Fentanyl withdrawal begins within hours of the last dose and peaks at 36–72 hours. Northbound's one-eighty medical detox program provides 24/7 physician oversight, medication management (buprenorphine, clonidine, anti-nausea agents), and comfort care to safely navigate this phase. No client detoxes alone.",
    },
    {
      phase: "Weeks 1–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following medical stabilization, most clients transition into residential treatment. Structured daily programming includes individual therapy, group counseling, family sessions, and evidence-based modalities — CBT, DBT, EMDR — alongside medication-assisted treatment (MAT) where clinically indicated. Co-occurring mental health conditions (anxiety, depression, PTSD) are treated simultaneously.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of intensive clinical programming while clients begin building independent routines. This phase bridges the intensity of inpatient care with growing personal responsibility within a supported outpatient environment.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Northbound's virtual IOP (HomeBound) delivers 10–12 hours of weekly therapy — allowing clients to reintegrate into work and family life while maintaining robust therapeutic support. The InVivo® model practices real-world skills and stress responses within a treatment context, dramatically reducing relapse risk.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Community",
      icon: "ri-refresh-line",
      body: "Long-term sobriety depends on community and accountability. Northbound's alumni network, continuing care plan, and specialized tracks — Collegebound® and Careerbound® — help clients rebuild the lives that addiction threatened, with support that doesn't end at discharge.",
    },
  ],

  differentiators: [
    {
      icon: "ri-shield-check-line",
      title: "Medically Supervised Detox",
      body: "Our one-eighty detox program manages fentanyl withdrawal with 24/7 physician oversight and evidence-based medications — the safest possible foundation for recovery.",
    },
    {
      icon: "ri-capsule-line",
      title: "Medication-Assisted Treatment",
      body: "Northbound integrates buprenorphine (Suboxone) and naltrexone where clinically appropriate, dramatically reducing cravings and relapse risk during the most vulnerable period of recovery.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Expertise",
      body: "Most clients with fentanyl addiction carry co-occurring mental health conditions. Our integrated clinical team treats both simultaneously — because treating one without the other rarely works.",
    },
    {
      icon: "ri-team-line",
      title: "200+ Years Combined Expertise",
      body: "Our multidisciplinary team — physicians, psychiatrists, licensed therapists, and certified addiction counselors — brings decades of specialized opioid treatment experience.",
    },
    {
      icon: "ri-award-line",
      title: "DHCS Licensed & NAATP Member",
      body: "Northbound holds California DHCS licensure and is a member of the National Association of Addiction Treatment Providers — hallmarks of clinical integrity and accountability.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Outcomes-Verified Results",
      body: "An independent study by USC verified a greater than 97% drug abstinence rate among Northbound clients — a benchmark that reflects genuine clinical excellence.",
    },
  ],

  closingImage: `${BASE}/nbt_fentanyl_hero01.jpg`,
  closingImageAlt: "Person beginning their recovery journey from fentanyl addiction at Northbound Treatment",
  closingHeadline: "Recovery from Fentanyl Is Possible — Starting Today",
  closingBody: [
    "Fentanyl addiction is one of the most dangerous and difficult substance use disorders to overcome — but thousands of people do it every year, with the right support. Northbound has helped individuals and families navigate opioid addiction for nearly four decades.",
    "You don't have to figure this out alone. Our admissions team is available 24 hours a day, 7 days a week, with no cost and no obligation. The first call is confidential. Insurance is verified free of charge. And every step of this process, we'll walk with you.",
  ],
  closingQuote: "Recovery isn't something that happens to you — it's something you choose, and we're here to help you choose it every day.",

  faqs: [
    {
      question: "How dangerous is fentanyl withdrawal?",
      answer:
        "Fentanyl withdrawal itself is rarely life-threatening in otherwise healthy adults, but it is intensely uncomfortable and associated with severe cravings that make relapse — and overdose — extremely dangerous. Tolerance drops rapidly during withdrawal, meaning a dose that felt 'normal' before detox can kill after just a few days of abstinence. Medical supervision is strongly recommended.",
    },
    {
      question: "Does Northbound use medication-assisted treatment (MAT) for fentanyl?",
      answer:
        "Yes. When clinically appropriate, Northbound's physicians prescribe buprenorphine (Suboxone) or naltrexone (Vivitrol) as part of a comprehensive treatment plan. MAT is not a substitute for therapy — it's a tool that reduces cravings and overdose risk while clients do the therapeutic work of recovery.",
    },
    {
      question: "How long does fentanyl addiction treatment take?",
      answer:
        "The standard recommendation for opioid use disorder is a minimum of 90 days of structured treatment, with longer periods associated with significantly better outcomes. Most Northbound clients engage in 3–6 months of care spanning medical detox, residential, PHP, and IOP phases, with ongoing aftercare support beyond that.",
    },
    {
      question: "I started using fentanyl through a prescription. Does that change my treatment?",
      answer:
        "No — the clinical pathway for opioid use disorder is the same regardless of how use began. Many clients arrive at Northbound after a legitimate medical prescription escalated into dependence. There is no judgment here. Opioid addiction is a disease, and it deserves medical treatment.",
    },
    {
      question: "Will my insurance cover fentanyl treatment at Northbound?",
      answer:
        "Northbound is in-network with many major insurance plans including Aetna, Anthem, Cigna, and Tricare. Our admissions team verifies your benefits at no cost before treatment begins, so you know exactly what's covered. Call (866) 311-0003 for a free, confidential benefits check.",
    },
    {
      question: "What if someone I love is using fentanyl but won't seek help?",
      answer:
        "This is one of the most painful situations a family can face. Northbound's clinical team can walk you through intervention strategies, and we offer family therapy as a core component of treatment. Call us — we can help you navigate this, even before your loved one is ready.",
    },
  ],

  substanceNameShort: "Fentanyl",
  relatedSubstances: [
    { label: "Heroin", href: "/treatment/heroin/", icon: "ri-capsule-line" },
    { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-heart-pulse-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-medicine-bottle-line" },
    { label: "Suboxone", href: "/treatment/suboxone/", icon: "ri-shield-line" },
    { label: "Methadone", href: "/treatment/methadone/", icon: "ri-flask-line" },
    { label: "OxyContin", href: "/treatment/oxycontin/", icon: "ri-capsule-line" },
  ],
};

export default function FentanylPage() {
  return <SubstancePageTemplate data={data} />;
}
