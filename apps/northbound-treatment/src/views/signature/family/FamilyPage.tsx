import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SignaturePageData = {
  heroImage: `${BASE}/nbt_family_hero01.jpg`,
  heroImageAlt: "Family group session at Northbound Treatment — parents and adult children reconnecting in a warm therapy circle",
  serviceName: "Family Therapy Program",
  heroItalicWord: "Family",
  heroBody:
    "Addiction doesn't only affect the person using — it wounds the entire family. Northbound's Family Therapy Program is built on a simple truth: lasting recovery requires healing the system, not just the individual.",

  pullQuote: "Addiction is a family illness. Recovery must be a family journey.",
  pullQuoteItalicPart: "Recovery must be a family journey.",
  pullQuoteBody:
    "At Northbound, we view addiction through a systemic lens — recognizing that the patterns, roles, and wounds within a family both contribute to and are shaped by substance use. Our Family Program provides structured, compassionate space for families to begin their own healing alongside their loved one.",

  whatItIsEyebrow: "The Approach",
  whatItIsHeadline: "Healing the",
  whatItIsHeadlineItalic: "Whole System",
  whatItIsBody: [
    "Too often, family members are left on the outside of treatment — worrying, waiting, and carrying burdens they were never meant to hold alone. Northbound's Family Program brings the family into the healing process. It is not about fixing blame. It is about restoring connection.",
    "Through structured group sessions, individual family counseling, and our unique Family Sculpt process, we help families identify their roles, improve communication, and begin to let go of the caretaking, codependency, and self-neglect that addiction so often creates.",
  ],
  whatItIsChecklist: [
    "Monthly multi-day Family Program — no additional cost to family",
    "Group sessions with clients and their families together",
    "Family-only processing groups with licensed therapists",
    "Family Sculpt — an experiential perspective-taking process",
    "Al-Anon step work integrated into the program structure",
    "Ongoing family counseling and updates with the primary clinician",
  ],
  whatItIsImage: `${BASE}/nbt_family_session01.jpg`,
  whatItIsImageAlt: "Family member speaking openly during a therapy session at Northbound's Family Program",
  whatItIsFloatingHeadline: "At No Additional\nCost to Family",

  featuresEyebrow: "Program Elements",
  featuresHeadline: "The",
  featuresHeadlineItalic: "Family Program",
  featuresIntro:
    "Northbound's Family Program is a multi-day, immersive experience designed to give families practical tools, emotional processing, and a renewed understanding of the system they are healing together.",
  features: [
    {
      title: "Back to Basics",
      focus: "Education & Foundation",
      description:
        "A foundational session introducing family members to the disease model of addiction, the impact on family systems, and the principles that guide Northbound's approach to recovery.",
      image: `${BASE}/nbt_family_walk01.jpg`,
      imageAlt: "Family walking together along the California coast — reconnecting through Northbound's program",
      tag: "Day 1 Session",
      tagIcon: "ri-book-open-line",
    },
    {
      title: "Healthy Communication",
      focus: "Connection & Understanding",
      description:
        "Families learn and practice active listening, validation, and conflict resolution — building the communication foundation that recovery requires at home.",
      image: null,
      tag: "Day 1 Session",
      tagIcon: "ri-chat-3-line",
      accent: "navy",
    },
    {
      title: "Co-Dependency & Roles",
      focus: "Boundaries & Self-Care",
      description:
        "Family members identify the roles they've taken on — caretaker, enabler, scapegoat — and begin the work of releasing those roles in favor of healthier patterns of relating.",
      image: null,
      tag: "Day 2 Session",
      tagIcon: "ri-links-line",
      accent: "terracotta",
    },
    {
      title: "Family Sculpt",
      focus: "Perspective & Empathy",
      description:
        "An experiential group process where each family member's perspective is made visible — illuminating how the same family is experienced differently by each person, deepening empathy and intimacy.",
      image: null,
      tag: "Day 2 Experience",
      tagIcon: "ri-focus-3-line",
      accent: "agave",
    },
    {
      title: "Knee to Knee",
      focus: "Repair & Reconnection",
      description:
        "A guided face-to-face conversation process where clients and family members practice direct, honest, and compassionate communication — often the most powerful session of the program.",
      image: null,
      tag: "Day 3 Session",
      tagIcon: "ri-heart-line",
      accent: "navy",
    },
  ],

  evidenceEyebrow: "Evidence-Based Methodology",
  evidenceHeadline: "Why Family Therapy",
  evidenceHeadlineItalic: "Matters",
  evidenceBody:
    "Research consistently shows that involving family in addiction treatment significantly improves outcomes — for the client and for every member of the family system.",
  evidencePoints: [
    {
      icon: "ri-family-line",
      title: "Systemic Healing",
      body: "Addiction develops within a relational context. Family therapy addresses the systemic patterns — communication breakdowns, enabling, enmeshment — that both contribute to and sustain substance use.",
    },
    {
      icon: "ri-heart-line",
      title: "Improved Outcomes",
      body: "Clients with engaged, informed family support have significantly higher rates of treatment completion and long-term sobriety. Family involvement is not optional — it's clinical.",
    },
    {
      icon: "ri-links-line",
      title: "Co-Dependency Recovery",
      body: "Family members develop their own unhealthy patterns in response to addiction. The Family Program gives them space to heal — not just support their loved one's recovery, but pursue their own.",
    },
    {
      icon: "ri-chat-3-line",
      title: "Communication Restoration",
      body: "Addiction erodes trust and communication. Through structured practice, families rebuild the honest, compassionate dialogue that forms the foundation of lasting relational repair.",
    },
    {
      icon: "ri-focus-3-line",
      title: "Perspective-Taking",
      body: "The Family Sculpt process is a clinically powerful technique that creates genuine empathy — helping family members understand how addiction is experienced through their loved one's eyes.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Long-Term Sustainability",
      body: "What's learned in the Family Program doesn't stay at Northbound. Families leave with tools, language, and practices that support recovery in the home for years to come.",
    },
  ],
  stats: [
    { value: "38+", label: "Years treating addiction as a family illness" },
    { value: "$0", label: "Additional cost to family members" },
    { value: "1/3", label: "Of staff are program alumni" },
  ],

  closingEyebrow: "Our Commitment to Your Family",
  closingHeadline: "No Family",
  closingHeadlineItalic: "Left Behind",
  closingBody: [
    "At Northbound, we don't treat an individual in isolation. We believe in coming alongside the entire family — providing education, processing space, and practical tools so that everyone in the system has the best possible chance to heal.",
    "Our Family Program is offered monthly, at no additional cost, and family members are welcome to attend more than once. We hold space for the complexity of your situation — without judgment, without pressure, without pretense.",
  ],
  closingQuote:
    "Our family here at Northbound is committed to providing families impacted by addiction with the tools to guide them along their recovery journey — leaving no stone unturned.",
  closingQuoteAttribution: "Northbound Treatment Services",
  closingImage: `${BASE}/nbt_family_walk01.jpg`,
  closingImageAlt: "Family walking together along the California coast — the journey of reconnection at Northbound",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "Call (866) 311-0003", href: "tel:8663110003" },

  relatedServices: [
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Signature Service", icon: "ri-compass-3-line" },
    { name: "Wolf-Assisted Therapy", href: "/wolf-assisted-therapy/", tag: "Signature Service", icon: "ri-leaf-line" },
    { name: "Dual-Diagnosis Treatment", href: "/treatment/dual-diagnosis/", tag: "Specialty Program", icon: "ri-brain-line" },
  ],

  ctaHeadline: "Your Family's Healing Starts Here",
  ctaBody:
    "Northbound's Family Program is available monthly at no cost to family members. Call our admissions team 24/7 to ask about upcoming program dates.",
};

export default function FamilyPage() {
  return <SignaturePageTemplate data={data} />;
}
