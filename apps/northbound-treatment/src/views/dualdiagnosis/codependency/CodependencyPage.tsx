import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_codependency_hero01.jpg`,
  heroImageAlt: "Two people on couch — one on phone, the other anxiously waiting for approval — the dynamic of codependency",
  substanceName: "Codependency",
  substanceNameShort: "Codependency",
  heroHeadline: "Codependency & Addiction Treatment",
  heroItalicWord: "Codependency",
  heroBody:
    "Codependency is one of the most common — and most overlooked — patterns in addiction recovery. It erodes relationships, enables substance use, and increases relapse risk. Northbound addresses codependency directly as part of integrated dual diagnosis and family-focused treatment.",

  whatItIsHeadline: "What Is Codependency — and How Does It Intersect with Addiction?",
  whatItIsBody: [
    "Codependency describes a pattern of learned behaviors in which a person becomes so focused on another's thoughts, feelings, and needs that they neglect their own. In the context of addiction, codependency often manifests as enabling — family members or partners who, out of love, cover for the addict, manage their consequences, and unwittingly allow addiction to continue and deepen.",
    "Codependency typically stems not from malice but from over-loving — an excessive emotional investment in another person's reality that collapses healthy boundaries and creates a loss of self. Over time, this pattern breeds resentment, depression, anxiety, and in many cases, the codependent person develops their own substance use problem as a coping mechanism.",
    "At Northbound, codependency treatment is integrated throughout our programming. We work with both clients in recovery and their family members to identify root causes, build healthy communication skills, establish limits that support recovery rather than enable, and develop the self-esteem that doesn't depend on another person's approval or sobriety.",
  ],
  whatItIsImage: `${BASE}/nbt_codependency_therapy01.jpg`,
  whatItIsImageAlt: "Couple in relationship therapy session for codependency treatment at Northbound Treatment Services",
  quickStats: [
    { value: "1 in 3", label: "Adults in families affected by addiction exhibit codependent patterns" },
    { value: "Monthly", label: "Northbound family program for codependency education and support" },
    { value: ">95%", label: "Alcohol abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Codependency is easy to mistake for love, loyalty, or caregiving. These warning signs — in yourself or someone close to someone in addiction — point to patterns that require professional attention.",
  warningSigns: [
    "Consistently putting another person's needs, feelings, and preferences ahead of your own",
    "Making excuses for, covering up, or minimizing a loved one's substance use or behavior",
    "Feeling responsible for another person's happiness, sobriety, or problems",
    "An inability to say no — even when saying yes causes real harm to yourself",
    "Extreme anxiety, mood swings, or emotional distress tied to another person's behavior",
    "Doing things for others they are capable of doing for themselves",
    "Loss of your own identity, hobbies, friendships, or interests in service of the relationship",
    "Staying in harmful relationships because leaving feels impossible or catastrophic",
    "Using substances yourself to cope with the stress of the codependent relationship",
    "Feeling worthless or incomplete without the validation of the person you're focused on",
  ],

  recoveryHeadline: "What Codependency Recovery Looks Like at Northbound",
  recoveryIntro:
    "Healing codependency is a long-term process that requires professional guidance, introspection, and sustained behavioral change. Northbound's treatment integrates individual codependency work, family therapy, and addiction treatment for a complete recovery.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Individual & Family Assessment",
      icon: "ri-mental-health-line",
      body: "Our clinical team evaluates relationship patterns, communication dynamics, substance use history, and underlying psychological factors in a comprehensive biopsychosocial assessment — for both the client and participating family members.",
    },
    {
      phase: "Week 1–3",
      title: "Stabilization & Detox (If Applicable)",
      icon: "ri-heart-pulse-line",
      body: "When substance use is co-occurring for the codependent individual, safe medical detox is prioritized. Psychiatric stabilization begins in parallel, addressing the anxiety, depression, or mood dysregulation that often drives codependent patterns.",
    },
    {
      phase: "Weeks 3–12+",
      title: "Residential Treatment with Codependency Focus",
      icon: "ri-home-heart-line",
      body: "Individual therapy explores the origins and dynamics of codependent patterns. Group programming provides peer perspective and validation. CBT helps clients identify and reframe maladaptive thinking. Family sessions build the foundation for new, healthier relationship dynamics.",
    },
    {
      phase: "Months 2–4",
      title: "Intensive Outpatient & Family Continued Care",
      icon: "ri-calendar-check-line",
      body: "IOP programming allows clients to practice new relationship skills in real-world environments while maintaining therapeutic support. Family members continue their own work through Northbound's monthly family program.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare, Alumni & Ongoing Support",
      icon: "ri-community-line",
      body: "Codependency recovery, like addiction recovery, benefits from long-term community support. Northbound's alumni program and aftercare resources provide sustained connection and continued access to clinical guidance.",
    },
  ],

  differentiators: [
    {
      icon: "ri-group-line",
      title: "Dedicated Monthly Family Program",
      body: "Northbound's monthly family program was built specifically for loved ones navigating codependency and addiction. It provides education, therapeutic support, and a community of families in similar situations.",
    },
    {
      icon: "ri-brain-line",
      title: "Strengths-Based, Non-Shaming Approach",
      body: "Codependency often comes from a place of love. Our clinical approach honors that origin while building the awareness and skills needed to transform over-loving into healthy connection.",
    },
    {
      icon: "ri-microscope-line",
      title: "CBT & Interpersonal Therapy Integration",
      body: "Cognitive Behavioral Therapy and interpersonal therapy address the thinking patterns and communication deficits that underlie codependency — providing practical tools that work in everyday relationships.",
    },
    {
      icon: "ri-heart-line",
      title: "1/3 of Staff Are Program Alumni",
      body: "One-third of Northbound's team are graduates of our own programs — many of whom have personal experience with codependent family dynamics and can relate with genuine empathy.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Family Treatment as Core, Not Optional",
      body: "At Northbound, family involvement is integrated into the treatment model — not a supplemental add-on. Codependency cannot heal in isolation; it requires relational work.",
    },
    {
      icon: "ri-team-line",
      title: "38 Years Treating Families",
      body: "Founded in 1988, Northbound has nearly four decades of experience helping not just people in addiction, but the family systems that surround them — including the complex, painful dynamics of codependency.",
    },
  ],

  closingImage: `${BASE}/nbt_codependency_recovery01.jpg`,
  closingImageAlt: "Two people laughing naturally over coffee — the healthy, unguarded connection of codependency recovery",
  closingHeadline: "Real Connection Doesn't Require You to Lose Yourself",
  closingQuote:
    "Codependency is built over a lifetime — but with professional support and genuine effort, these harmful patterns can shift, and healthy, lasting relationships can flourish.",
  closingBody: [
    "At Northbound, we've helped hundreds of families untangle the painful, complex dynamics of codependency and addiction. Our clinical team brings both expertise and compassion to this work — helping clients and families build the communication skills, healthy limits, and self-esteem needed for relationships that truly support recovery and growth.",
  ],
  faqs: [
    {
      question: "Can codependency be treated alongside addiction?",
      answer:
        "Yes, and it must be. Codependency and addiction reinforce each other — treating one without the other leaves the relapse risk high and the relationship patterns intact. Northbound's integrated model addresses both simultaneously.",
    },
    {
      question: "Does my family member need to be in treatment for me to get help for codependency?",
      answer:
        "No. Codependency work is done with the individual regardless of whether their loved one is in treatment. In fact, sometimes the most important recovery work happens in the family member — not in the person with the addiction.",
    },
    {
      question: "What is the difference between supportive and codependent behavior?",
      answer:
        "The key distinction is whether the support enables avoidance of consequences. Healthy support encourages accountability. Codependent behavior protects the addicted person from the natural consequences of their use — which extends and deepens the addiction. Our clinical team helps families identify and shift these patterns.",
    },
    {
      question: "Is codependency a mental health disorder?",
      answer:
        "Codependency is not a formal DSM diagnosis, but it is a recognized clinical pattern with well-documented psychological, relational, and behavioral features. It is treatable through professional therapy and is taken seriously by Northbound's clinical team.",
    },
    {
      question: "What does Northbound's family program include?",
      answer:
        "Northbound's monthly family program includes psychoeducation about addiction and codependency, individual family therapy sessions, group programming with other families, and practical tools for building healthy boundaries and communication.",
    },
    {
      question: "Does Northbound accept insurance for codependency and addiction treatment?",
      answer:
        "Yes. We are in-network with more than 15 major insurance plans. Our admissions team will verify your benefits quickly and manage the process on your behalf.",
    },
  ],

  relatedSubstances: [
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-emotion-sad-line" },
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-heart-pulse-line" },
    { label: "Trauma & PTSD", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-mental-health-line" },
    { label: "Borderline Personality Disorder", href: "/treatment/mental-health-disorders/borderline-personality-disorder/", icon: "ri-user-heart-line" },
  ],
};

export default function CodependencyPage() {
  return <SubstancePageTemplate data={data} />;
}
