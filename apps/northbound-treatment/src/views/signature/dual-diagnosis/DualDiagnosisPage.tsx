import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";
import { GARDEN_GROVE_IMAGES, SERVICE_IMAGES } from "@/views/home/assets";

const data: SignaturePageData = {
  heroImage: SERVICE_IMAGES.campusExterior,
  heroImageAlt: "The Grove campus — integrated dual-diagnosis treatment at Northbound in Orange County",
  serviceName: "Dual-Diagnosis Treatment",
  heroItalicWord: "Dual-Diagnosis",
  heroBody:
    "Addiction and mental illness rarely travel alone. At Northbound, we treat both simultaneously — because addressing one without the other is not treatment, it's postponement.",

  pullQuote: "You cannot heal addiction while ignoring the wound underneath it.",
  pullQuoteItalicPart: "the wound underneath it.",
  pullQuoteBody:
    "Dual-diagnosis treatment is not simply combining two programs. It is an integrated, holistic approach in which every clinical decision — therapy selection, medication management, group structure — accounts for the full picture of who you are. At Northbound, that is the standard, not the exception.",

  whatItIsEyebrow: "The Approach",
  whatItIsHeadline: "Treating the",
  whatItIsHeadlineItalic: "Whole Person",
  whatItIsBody: [
    "A dual diagnosis — also called a co-occurring disorder — means that a person is managing both a substance use disorder and a mental health condition simultaneously. These disorders are deeply intertwined: each one shapes and sustains the other. Treating only one dramatically increases the risk of relapse and ongoing suffering.",
    "Northbound's dual diagnosis program in Southern California uses a fully integrated model: every client undergoes a comprehensive biopsychosocial assessment upon admission, receives a psychiatric evaluation, and is assigned both a primary therapist and a case manager who collaborate throughout treatment. The result is care that is coordinated, compassionate, and clinically precise.",
  ],
  whatItIsChecklist: [
    "Biopsychosocial assessment at admission to map the full clinical picture",
    "Psychiatric evaluation and ongoing psychiatric care throughout treatment",
    "Gender-specific dual diagnosis programs for men and women",
    "Coordinated team of therapist, case manager, and medical staff",
    "Short- and long-term medication protocols where clinically appropriate",
    "Evidence-based therapies selected to match each client's unique needs",
  ],
  whatItIsImage: SERVICE_IMAGES.supportGroup,
  whatItIsImageAlt: "Support group at The Grove — integrated dual-diagnosis treatment at Northbound",
  whatItIsFloatingHeadline: "Integrated Care\nFrom Day One",

  featuresEyebrow: "What We Treat",
  featuresHeadline: "Co-Occurring",
  featuresHeadlineItalic: "Conditions",
  featuresIntro:
    "Northbound's dual diagnosis program addresses a wide range of co-occurring mental health disorders alongside substance use — all treated simultaneously within a single, integrated care framework.",
  features: [
    {
      title: "Depression & Mood Disorders",
      focus: "Comprehensive Mental Health Care",
      description:
        "Depression is one of the most common co-occurring conditions in addiction. Northbound addresses it directly — through therapy, medication management, and evidence-based interventions — while simultaneously treating substance use.",
      image: SERVICE_IMAGES.outdoorMeditation,
      imageAlt: "Guided outdoor meditation at The Grove — building regulation skills for dual-diagnosis recovery",
      tag: "Co-Occurring Disorder",
      tagIcon: "ri-mental-health-line",
    },
    {
      title: "Anxiety & Panic Disorders",
      focus: "CBT · DBT · Mindfulness",
      description:
        "Many clients use substances to manage overwhelming anxiety. Northbound teaches healthier regulation strategies — so anxiety no longer drives substance use.",
      image: null,
      tag: "Co-Occurring Disorder",
      tagIcon: "ri-heart-pulse-line",
      accent: "navy",
    },
    {
      title: "PTSD & Trauma",
      focus: "EMDR · Trauma-Informed Care",
      description:
        "Trauma sits at the root of a significant portion of addiction. Northbound's trauma-informed approach — including EMDR — processes the underlying wound alongside the addiction it fuels.",
      image: null,
      tag: "Co-Occurring Disorder",
      tagIcon: "ri-focus-3-line",
      accent: "terracotta",
    },
    {
      title: "Bipolar Disorder",
      focus: "Mood Stabilization & Recovery",
      description:
        "Bipolar disorder and substance use are frequently linked. Northbound's integrated psychiatric care provides the mood stabilization and therapeutic support needed to address both.",
      image: null,
      tag: "Co-Occurring Disorder",
      tagIcon: "ri-bar-chart-grouped-line",
      accent: "agave",
    },
    {
      title: "ADHD & Personality Disorders",
      focus: "Individualized Clinical Matching",
      description:
        "Complex presentations require a flexible toolbox. Northbound's clinical team selects therapeutic modalities — CBT, DBT, motivational interviewing — matched to each client's specific diagnosis and learning style.",
      image: null,
      tag: "Co-Occurring Disorder",
      tagIcon: "ri-brain-line",
      accent: "navy",
    },
  ],

  evidenceEyebrow: "Evidence-Based Methodology",
  evidenceHeadline: "How Integration",
  evidenceHeadlineItalic: "Changes Outcomes",
  evidenceBody:
    "Decades of clinical research confirm that integrated dual-diagnosis treatment produces dramatically better long-term outcomes than treating addiction and mental illness separately.",
  evidencePoints: [
    {
      icon: "ri-brain-line",
      title: "Integrated Assessment",
      body: "Every client's biopsychosocial assessment establishes a comprehensive clinical baseline — mapping the full interaction between substance use and mental health to guide every subsequent treatment decision.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Evidence-Based Therapies",
      body: "CBT, DBT, motivational interviewing, EMDR, and experiential therapies are selected based on each client's unique profile — not applied uniformly. No single modality is universally effective.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Psychiatric Care",
      body: "All clients receive a psychiatric evaluation at admission and ongoing care throughout treatment. Medication protocols — short and long-term — are managed by board-certified psychiatrists.",
    },
    {
      icon: "ri-group-line",
      title: "Coordinated Team",
      body: "Each client is assigned a primary therapist, a case manager, and medical staff who collaborate continuously. This ensures the clinical plan evolves with the client's progress.",
    },
    {
      icon: "ri-focus-3-line",
      title: "Gender-Specific Programs",
      body: "Men and women experience co-occurring disorders differently. Gender-specific treatment structures ensure clients receive the specialized care that matches their experience and needs.",
    },
    {
      icon: "ri-refresh-line",
      title: "Relapse Prevention",
      body: "Treating both disorders together is the most effective relapse prevention strategy available. Clients who receive integrated care are significantly less likely to return to substance use.",
    },
  ],
  stats: [
    { value: "2×", label: "More likely — drug disorders + mood/anxiety overlap" },
    { value: ">97%", label: "Drug abstinence in USC outcomes study" },
    { value: "38+", label: "Years of integrated clinical experience" },
  ],

  closingEyebrow: "Full-Spectrum Recovery",
  closingHeadline: "Both Conditions.",
  closingHeadlineItalic: "One Integrated Plan.",
  closingBody: [
    "At Northbound, dual diagnosis is not a specialty add-on. It is the foundation of every treatment plan. From admission assessment through discharge and aftercare, every clinical decision accounts for the full complexity of who our clients are.",
    "Substance use and mental health disorders do not have to control your life or the life of someone you love. With effective, integrated treatment and a full continuum of care, long-term recovery is possible.",
  ],
  closingQuote:
    "Responding to different therapeutic approaches varies in our dual diagnosis centers. Having a large toolbox to draw from enhances our ability to meet each client where they are.",
  closingQuoteAttribution: "Northbound Treatment Services",
  closingImage: GARDEN_GROVE_IMAGES.community,
  closingImageAlt: "Commons area at The Grove — integrated dual-diagnosis care at Northbound",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "Verify Your Insurance", href: "/insurance/" },

  relatedServices: [
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Signature Service", icon: "ri-compass-3-line" },
    { name: "Wolf-Assisted Therapy", href: "/wolf-assisted-therapy/", tag: "Signature Service", icon: "ri-leaf-line" },
    { name: "Family Therapy Services", href: "/programs/family-therapy/", tag: "Signature Service", icon: "ri-family-line" },
  ],

  ctaHeadline: "You Deserve Treatment That Sees the Whole Picture",
  ctaBody:
    "Northbound's dual-diagnosis program treats addiction and co-occurring mental health conditions together. Call our admissions team 24/7 to verify your benefits.",
};

export default function DualDiagnosisPage() {
  return <SignaturePageTemplate data={data} />;
}
