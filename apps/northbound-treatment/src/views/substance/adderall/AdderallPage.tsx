import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_adderall_hero01.jpg`,
  heroImageAlt: "Person facing prescription pill addiction — hands clasped in resolve, choosing recovery",
  substanceName: "Adderall",
  heroHeadline: "Adderall Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Adderall is one of the most widely misused prescription drugs in America — and one of the most underestimated. At Northbound, we treat stimulant addiction with the clinical depth and individualized care it demands.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "What Is Adderall Addiction?",
  whatItIsBody: [
    "Adderall is a prescription stimulant combining amphetamine and dextroamphetamine, primarily prescribed for ADHD. While it can be medically appropriate, Adderall carries a significant potential for misuse and dependency — particularly among high-achieving young adults who use it as a performance enhancer or study drug.",
    "Addiction develops through two distinct pathways: physical tolerance (requiring escalating doses for the same effect) and psychological dependency (the belief that one cannot perform, focus, or succeed without the drug). Both pathways are clinically real, and both require professional treatment to overcome safely.",
    "Because Adderall is a legal prescription drug, many people underestimate the severity of their dependency. But stimulant addiction is a recognized, primary brain disease — and attempting to quit without clinical support can produce dangerous withdrawal symptoms including severe depression, seizures, and cardiac complications.",
  ],
  whatItIsImage: `${BASE}/nbt_adderall_therapy01.jpg`,
  whatItIsImageAlt: "Young adult in individual therapy for Adderall addiction at Northbound Treatment",
  quickStats: [
    { value: "6M+", label: "Americans misuse Adderall annually" },
    { value: "60%", label: "Of college students report peer pressure to use stimulants" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Adderall addiction often develops gradually, making it easy to rationalize or miss. These are the clinical warning signs that use has crossed into dependency — for yourself or someone you care about.",
  warningSigns: [
    "Taking more Adderall than prescribed, or using it without a prescription",
    "Needing Adderall to feel 'normal,' focused, or functional in daily life",
    "Failed attempts to cut down or stop using",
    "Spending significant time obtaining, using, or recovering from Adderall",
    "Continuing use despite negative consequences at work, school, or in relationships",
    "Experiencing withdrawal symptoms when stopping: fatigue, depression, irritability, anxiety",
    "Mood swings, paranoia, or increased aggression during use",
    "Neglecting food, sleep, or personal care due to stimulant effects",
    "Using Adderall recreationally — snorting, taking higher doses for a 'high'",
    "Physical symptoms: elevated heart rate, high blood pressure, significant weight loss",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Adderall Recovery Looks Like at Northbound",
  recoveryIntro:
    "Recovery from Adderall addiction is a structured, clinical process — not just willpower. Northbound provides the full continuum of care, from medically supervised detox through long-term aftercare support.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Medical Assessment & Detoxification",
      icon: "ri-heart-pulse-line",
      body: "Every client begins with a comprehensive biopsychosocial assessment and, if needed, enters Northbound's one-eighty medically supervised detox program. Adderall withdrawal can produce severe depression, fatigue, and in some cases seizures — 24/7 clinical supervision and medication management ensure a safe, as-comfortable-as-possible process.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following detox, most clients transition into residential treatment — 24/7 care in Northbound's Orange County facilities. This is where the deep work happens: individual therapy, group counseling, family therapy, evidence-based modalities (CBT, DBT, EMDR), and dual-diagnosis treatment for co-occurring depression, anxiety, or ADHD.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides structured clinical programming 5 days per week while allowing clients to begin transitioning to greater independence. Clients continue individual and group therapy, psychiatric care, and skill-building while living in sober housing or a Northbound residential setting.",
    },
    {
      phase: "Month 3–6",
      title: "Intensive Outpatient Program (IOP)",
      icon: "ri-calendar-check-line",
      body: "IOP is 10–12 hours of clinical programming per week — allowing clients to reintegrate into work, school, or family life while maintaining robust therapeutic support. This phase leverages Northbound's InVivo® model: practicing real-world skills and stressors within a supported treatment context.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare, Alumni & Sober Living",
      icon: "ri-refresh-line",
      body: "Northbound's aftercare and alumni program provides the long-term community, accountability, and support that sustain sobriety beyond treatment. Clients also have access to Collegebound® and Careerbound® programs — helping them rebuild educational and professional trajectories disrupted by addiction.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Expertise",
      body: "Stimulant addiction frequently co-occurs with ADHD, anxiety, and depression — the very conditions Adderall was meant to treat. Northbound's dual-diagnosis program addresses both the addiction and its underlying drivers simultaneously.",
    },
    {
      icon: "ri-user-line",
      title: "1:1 Staff-to-Client Ratio",
      body: "Every client receives deeply personalized clinical attention. With a 1:1 staff-to-client ratio, our team can monitor withdrawal carefully, adjust treatment plans rapidly, and provide the individualized support Adderall addiction requires.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Collegebound® & Careerbound®",
      body: "Many Adderall-dependent clients are students or young professionals whose education or careers have been disrupted. Northbound's programs help them get back on track — academically and professionally — while in treatment.",
    },
    {
      icon: "ri-shield-check-line",
      title: "38+ Years of Clinical Experience",
      body: "Founded in 1988, Northbound has treated stimulant addiction across every phase of its evolving clinical landscape. Our team has the depth of experience to meet each case with precision and care.",
    },
    {
      icon: "ri-family-line",
      title: "Family-Inclusive Treatment",
      body: "Northbound's monthly Family Program brings loved ones into the healing process — addressing the codependency, enabling, and relational damage that often surround stimulant addiction.",
    },
    {
      icon: "ri-award-line",
      title: "Accreditation & Insurance Access",
      body: "DHCS licensed and NAATP member, Northbound is in-network with 15+ major insurance plans. Our team verifies benefits and navigates coverage so cost is never a barrier to beginning treatment.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_adderall_recovery01.jpg`,
  closingImageAlt: "Client in early Adderall recovery — reflective, peaceful, looking toward a California garden from their room at Northbound",
  closingHeadline: "Life Without Adderall Is Not Only Possible — It's Waiting.",
  closingBody: [
    "The fear that you cannot focus, perform, or function without Adderall is one of the most powerful lies addiction tells. Northbound's clinical team is experienced in helping clients rebuild their natural cognitive capacity, stress tolerance, and sense of self — without stimulants.",
    "Our goal is not just abstinence. It is a life of purpose, clarity, and sustainable achievement. We provide the clinical foundation, the community, and the tools to build that life — and to keep building it long after you leave our care.",
  ],
  closingQuote:
    "It is imperative to us that each patient struggling with addiction feels validated, empowered, and understood.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Can I stop taking Adderall on my own?",
      answer:
        "Stopping Adderall abruptly after a period of heavy use or dependency is not recommended without medical supervision. Withdrawal can cause severe depression, extreme fatigue, increased appetite, irritability, and in some cases seizures. Northbound's medically supervised detox program ensures a safe and monitored transition.",
    },
    {
      question: "Is Adderall addiction real if I have a prescription?",
      answer:
        "Yes. Having a legitimate ADHD diagnosis and prescription does not prevent dependency from developing — particularly when doses are escalated beyond what's prescribed. Psychological dependency on Adderall is clinically recognized and requires professional treatment regardless of how use began.",
    },
    {
      question: "How long does Adderall treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day treatment options. Research consistently shows that 90 days or more produces the strongest long-term outcomes. The right duration depends on the severity of dependency, co-occurring conditions, and individual progress — and is determined collaboratively with your clinical team.",
    },
    {
      question: "Does Northbound treat ADHD alongside the addiction?",
      answer:
        "Yes. Northbound's dual-diagnosis program is specifically designed for co-occurring conditions like ADHD. Psychiatrists on staff can evaluate whether non-stimulant ADHD medications are appropriate and develop a treatment plan that addresses both the addiction and the underlying ADHD — without returning to Adderall.",
    },
    {
      question: "Will insurance cover Adderall addiction treatment?",
      answer:
        "In most cases, yes. Northbound is in-network with Aetna, Anthem/Blue Cross Blue Shield, Cigna, Tricare, and 15+ other major plans. Our admissions team will verify your specific benefits and walk you through your coverage options before you commit to anything — at no cost.",
    },
    {
      question: "Can I continue school or work during outpatient treatment?",
      answer:
        "Many clients do continue educational or professional commitments during IOP (Intensive Outpatient Program). Northbound's Collegebound® program is specifically designed to help clients pursue education while in treatment, with academic advising and accountability built in.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
    { label: "Heroin", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Marijuana", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
  ],

  substanceNameShort: "Adderall",
};

export default function AdderallPage() {
  return <SubstancePageTemplate data={data} />;
}
