import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SignaturePageData = {
  heroImage: `${BASE}/nbt_wolf_hero01.jpg`,
  heroImageAlt: "Therapy group seated in a forest circle with wolf ambassadors during wolf-assisted therapy at Northbound",
  serviceName: "Wolf-Assisted Therapy",
  heroItalicWord: "Wolf-Assisted",
  heroBody:
    "Northbound's pioneering Wolf-Assisted Therapy program merges the ancient wisdom of wolves with evidence-based clinical practice — offering a path to recovery unlike anything else available in addiction treatment today.",

  pullQuote: "Wolves don't judge. They sense. And in that sensing, something in us opens.",
  pullQuoteItalicPart: "something in us opens.",
  pullQuoteBody:
    "Wolf-Assisted Therapy at Northbound is grounded in the science of animal-assisted intervention and the clinical principles of experiential learning. When clients engage with wolf ambassadors, they encounter the unconscious — the non-verbal, instinctual parts of themselves that talk therapy alone rarely reaches.",

  whatItIsEyebrow: "The Approach",
  whatItIsHeadline: "Ancient Wisdom,",
  whatItIsHeadlineItalic: "Modern Healing",
  whatItIsBody: [
    "Wolf-Assisted Therapy at Northbound provides a unique opportunity for experiential learning and deep therapeutic intervention. Clients engage directly with our wolf ambassadors in a structured, clinician-guided setting that fosters profound introspection, insight, and behavioral change.",
    "Through these interactions, clients gain access to non-verbal communication patterns and unconscious biological processes that underlie human behavior — developing a clearer understanding of their own instincts, emotional triggers, and relational patterns.",
  ],
  whatItIsChecklist: [
    "Guided by licensed therapists trained in animal-assisted intervention",
    "Integrates CBT, mindfulness, and somatic awareness",
    "Challenges misconceptions about wolves — and about the self",
    "Builds empathy, resilience, and a renewed sense of purpose",
    "Available to residential and PHP-level clients",
  ],
  whatItIsImage: `${BASE}/nbt_wolf_touch01.jpg`,
  whatItIsImageAlt: "Client's hand gently resting on a calm wolf ambassador during therapy at Northbound",
  whatItIsFloatingHeadline: "Science-Backed\nAnimal-Assisted Therapy",

  featuresEyebrow: "What You'll Experience",
  featuresHeadline: "The Elements of",
  featuresHeadlineItalic: "Wolf Therapy",
  featuresIntro:
    "Each Wolf-Assisted Therapy session is purposefully designed to surface clinical insight through direct, supervised interaction with the wolf ambassadors. No previous experience required — only openness.",
  features: [
    {
      title: "Wolf Ambassador Encounters",
      focus: "Connection & Presence",
      description:
        "Meet and interact directly with Northbound's wolf ambassadors in a safe, supervised setting. Wolves respond to energy and authenticity — rewarding presence and calm with connection.",
      image: `${BASE}/nbt_wolf_nature01.jpg`,
      imageAlt: "Majestic wolf ambassador in the golden California landscape — symbol of wisdom and healing",
      tag: "Core Experience",
      tagIcon: "ri-focus-3-line",
    },
    {
      title: "Non-Verbal Communication",
      focus: "Instinct & Awareness",
      description:
        "Wolves communicate almost entirely without words. Clients learn to read and respond to body language — developing skills in emotional attunement that transfer directly to human relationships.",
      image: null,
      tag: "Clinical Skill",
      tagIcon: "ri-eye-line",
      accent: "navy",
    },
    {
      title: "Group Debrief & Integration",
      focus: "Insight & Processing",
      description:
        "After each encounter, a licensed therapist facilitates structured group processing — connecting what happened in the circle with each client's individual treatment themes.",
      image: null,
      tag: "Clinical Integration",
      tagIcon: "ri-group-line",
      accent: "terracotta",
    },
    {
      title: "Challenging Stigma",
      focus: "Purpose & Advocacy",
      description:
        "As clients form bonds with wolf ambassadors, they naturally challenge common misconceptions about wolves — and, in parallel, the stigma surrounding addiction and their own recovery.",
      image: null,
      tag: "Identity Work",
      tagIcon: "ri-shield-check-line",
      accent: "agave",
    },
    {
      title: "Somatic Grounding",
      focus: "Body & Regulation",
      description:
        "Time spent in proximity to wolves activates the parasympathetic nervous system. Clients practice staying regulated in the presence of powerful stimuli — a skill directly applicable to cravings and stress.",
      image: null,
      tag: "Nervous System",
      tagIcon: "ri-heart-pulse-line",
      accent: "navy",
    },
  ],

  evidenceEyebrow: "Evidence-Based Methodology",
  evidenceHeadline: "Why It",
  evidenceHeadlineItalic: "Works",
  evidenceBody:
    "Wolf-Assisted Therapy is grounded in decades of research on animal-assisted intervention, somatic therapy, and experiential learning — all proven to accelerate lasting recovery.",
  evidencePoints: [
    {
      icon: "ri-brain-line",
      title: "Animal-Assisted Intervention",
      body: "Peer-reviewed research shows AAI reduces anxiety, depression, and PTSD symptoms — all common co-occurring conditions in clients seeking addiction treatment.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Nervous System Regulation",
      body: "Interaction with calm animals measurably lowers cortisol levels and activates the parasympathetic nervous system — reducing the physiological pull of cravings.",
    },
    {
      icon: "ri-eye-line",
      title: "Non-Verbal Processing",
      body: "Wolves respond to body language and energy — not words. This forces clients to access and regulate emotional states that verbal therapy often cannot reach.",
    },
    {
      icon: "ri-focus-3-line",
      title: "Mindfulness in Action",
      body: "Sustained presence is required in the wolf circle. Clients practice moment-to-moment awareness — the foundation of mindfulness-based relapse prevention.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Identity Reformation",
      body: "Advocating for misunderstood creatures — the wolves — mirrors advocating for a misunderstood self. Clients leave with a deeper sense of purpose and agency.",
    },
    {
      icon: "ri-group-line",
      title: "Community & Empathy",
      body: "Wolves are deeply social animals who model loyalty and pack interdependence — reinforcing the community bonds that are central to sustainable recovery.",
    },
  ],
  stats: [
    { value: "38+", label: "Years of clinical innovation" },
    { value: "2:1", label: "Staff-to-client ratio every session" },
    { value: ">97%", label: "Abstinence rate in USC outcomes study" },
  ],

  closingEyebrow: "A Program Unlike Any Other",
  closingHeadline: "Healing That",
  closingHeadlineItalic: "Goes Beyond Words",
  closingBody: [
    "There are things inside us that talk therapy alone cannot reach — instincts, patterns, and wounds that live in the body and the unconscious mind. Wolf-Assisted Therapy at Northbound reaches those places.",
    "As you form a bond with a wolf ambassador, you challenge not only your assumptions about wolves, but your assumptions about yourself. You discover resilience, empathy, and presence you may not have known you had. You leave each session changed — and that change compounds throughout your treatment journey.",
  ],
  closingQuote:
    "We invite you to embark on this transformative experience. Embrace the journey towards a brighter, healthier future filled with newfound strength and freedom.",
  closingQuoteAttribution: "Northbound Treatment Services",
  closingImage: `${BASE}/nbt_wolf_touch01.jpg`,
  closingImageAlt: "The intimate moment of connection between client and wolf ambassador at Northbound",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "View Gallery", href: "/locations/" },

  relatedServices: [
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Signature Service", icon: "ri-compass-3-line" },
    { name: "Family Therapy Services", href: "/programs/family-therapy/", tag: "Signature Service", icon: "ri-family-line" },
    { name: "Dual-Diagnosis Treatment", href: "/treatment/dual-diagnosis/", tag: "Specialty Program", icon: "ri-brain-line" },
  ],

  ctaHeadline: "Ready to Experience Something Extraordinary?",
  ctaBody:
    "Wolf-Assisted Therapy is available to eligible residential and PHP clients at Northbound. Call our admissions team 24/7 to learn more.",
};

export default function WolfPage() {
  return <SignaturePageTemplate data={data} />;
}
