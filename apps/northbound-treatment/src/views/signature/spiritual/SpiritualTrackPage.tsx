import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";
import {
  GARDEN_GROVE_IMAGES,
  SERVICE_IMAGES,
  SIGNATURE_IMAGES,
  SIGNATURE_PAGE_IMAGES,
} from "@/views/home/assets";

const data: SignaturePageData = {
  heroImage: SIGNATURE_PAGE_IMAGES.spiritualHero,
  heroImageAlt:
    "Outdoor meditation circle on the lawn at Northbound's Garden Grove campus — The Grove",
  serviceName: "Spiritual Track",
  heroItalicWord: "Spiritual",
  heroBody:
    "Northbound's Spiritual Track weaves sound therapy, breathwork, meditation, and somatic yoga into the clinical continuum — helping clients regulate the nervous system, reconnect mind and body, and build daily practices that support lasting recovery at our Garden Grove campus.",

  pullQuote: "Recovery is not only what you stop. It is what you learn to return to — breath, presence, and peace.",
  pullQuoteItalicPart: "breath, presence, and peace.",
  pullQuoteBody:
    "Addiction often disconnects people from their bodies and from the present moment. The Spiritual Track is a structured, clinician-guided pathway of holistic practices — offered alongside evidence-based therapy — so clients can develop regulation skills they carry into PHP, virtual IOP, and life after treatment.",

  whatItIsEyebrow: "Holistic Recovery",
  whatItIsHeadline: "Mind, Body &",
  whatItIsHeadlineItalic: "Spirit",
  whatItIsBody: [
    "The Spiritual Track at Northbound is a non-denominational holistic program integrated into residential and PHP care at The Grove in Garden Grove. It is distinct from our faith-based LINKS track — open to all clients who want structured practices for calm, clarity, and emotional regulation without a specific religious framework.",
    "Sessions take place in dedicated wellness spaces and outdoor areas across the Garden Grove campus — where sound bowls, guided breath, meditation, and yoga support the deeper clinical work happening in individual and group therapy.",
  ],
  whatItIsChecklist: [
    "Sound therapy with singing bowls and vibrational practice",
    "Facilitated breathwork for stress and craving regulation",
    "Guided meditation and mindfulness-based relapse prevention",
    "Somatic yoga integrating movement, breath, and body awareness",
    "Available within residential and PHP programming at Garden Grove",
  ],
  whatItIsImage: SIGNATURE_PAGE_IMAGES.spiritualWellness,
  whatItIsImageAlt:
    "Clients in guided outdoor meditation on the lawn at Northbound's Garden Grove campus — somatic yoga and mindfulness as part of the Spiritual Track",
  whatItIsFloatingHeadline: "Practices for\nDaily Recovery",

  featuresEyebrow: "Program Elements",
  featuresHeadline: "Five Practices,",
  featuresHeadlineItalic: "One Track",
  featuresIntro:
    "Each modality in the Spiritual Track serves a distinct clinical purpose — together they help clients build the inner stability that makes sobriety sustainable.",
  features: [
    {
      title: "Sound Therapy",
      focus: "Regulation & Release",
      description:
        "Crystal and bronze singing bowls guide the nervous system toward calm. Vibrational sound therapy reduces clinical anxiety, supports sleep, and creates a shared meditative container for group processing.",
      image: SIGNATURE_IMAGES.soundBath,
      imageAlt: "Singing bowls arranged for a sound therapy session at Northbound's Garden Grove campus",
      tag: "Sound Healing",
      tagIcon: "ri-disc-line",
    },
    {
      title: "Breathwork",
      focus: "Stress & Craving Response",
      description:
        "Facilitated breathwork teaches clients to interrupt panic, cravings, and dissociation through intentional breathing patterns — a portable skill for high-risk moments in treatment and beyond.",
      image: SIGNATURE_PAGE_IMAGES.spiritualBreathwork,
      imageAlt:
        "Mindfulness circle at The Grove — guided outdoor meditation during the Spiritual Track",
      tag: "Somatic Practice",
      tagIcon: "ri-heart-pulse-line",
    },
    {
      title: "Meditation & Mindfulness",
      focus: "Presence & Awareness",
      description:
        "Guided meditation and mindfulness exercises build the present-moment awareness central to DBT-informed care and relapse prevention — helping clients observe thoughts and urges without acting on them.",
      image: GARDEN_GROVE_IMAGES.interior,
      imageAlt:
        "Calming lounge with meditation décor at Northbound's Garden Grove residential campus — a space for guided mindfulness",
      tag: "Mindfulness",
      tagIcon: "ri-leaf-line",
    },
    {
      title: "Somatic Yoga",
      focus: "Body Reconnection",
      description:
        "Trauma and substance use often live in the body. Somatic yoga integrates gentle movement, breath, and grounding — rebuilding trust in physical sensation and establishing routines clients can continue at home.",
      image: SIGNATURE_IMAGES.yoga,
      imageAlt: "Yoga mat in a warm wellness studio at Northbound's Garden Grove campus",
      tag: "Movement",
      tagIcon: "ri-body-scan-line",
    },
    {
      title: "Outdoor Reflection",
      focus: "Nature & Grounding",
      description:
        "Courtyard gatherings, fire-pit circles, and guided reflection across The Grove's outdoor spaces extend sound, breath, and meditation into the campus itself — anchoring recovery in nature and community.",
      image: GARDEN_GROVE_IMAGES.activities,
      imageAlt:
        "Clients in guided outdoor meditation on the lawn at Northbound's Garden Grove campus",
      tag: "Campus Wellness",
      tagIcon: "ri-plant-line",
    },
  ],

  evidenceEyebrow: "Clinical Integration",
  evidenceHeadline: "Why Holistic",
  evidenceHeadlineItalic: "Practices Matter",
  evidenceBody:
    "Research supports mindfulness, breath regulation, and somatic practices as effective complements to addiction treatment — particularly for anxiety, trauma, and stress-driven relapse.",
  evidencePoints: [
    {
      icon: "ri-heart-pulse-line",
      title: "Nervous System Regulation",
      body: "Breathwork and sound therapy activate parasympathetic responses — lowering the physiological intensity of cravings, panic, and withdrawal-related stress.",
    },
    {
      icon: "ri-brain-line",
      title: "Mindfulness-Based Relapse Prevention",
      body: "Structured meditation builds the awareness to recognize triggers early — a core skill in DBT and evidence-based relapse prevention models.",
    },
    {
      icon: "ri-body-scan-line",
      title: "Trauma-Informed Movement",
      body: "Somatic yoga addresses the body-based storage of trauma that talk therapy alone may not reach — aligned with Northbound's trauma-informed philosophy.",
    },
    {
      icon: "ri-disc-line",
      title: "Anxiety Reduction",
      body: "Sound therapy and guided meditation have demonstrated measurable reductions in clinical anxiety — one of the most common co-occurring conditions in addiction treatment.",
    },
    {
      icon: "ri-refresh-line",
      title: "Portable Daily Practice",
      body: "Unlike modalities that require a clinic, breathwork and meditation become tools clients use every day — in PHP step-down, virtual IOP, and long-term aftercare.",
    },
    {
      icon: "ri-group-line",
      title: "Community Containment",
      body: "Group sound, breath, and yoga sessions build shared calm and accountability — reinforcing the community bonds that sustain recovery.",
    },
  ],
  stats: [
    { value: "5", label: "Holistic practices in one track" },
    { value: "2:1", label: "Staff-to-client ratio campus-wide" },
    { value: "38+", label: "Years integrating holistic care" },
  ],

  closingEyebrow: "The Grove Campus",
  closingHeadline: "Healing in a",
  closingHeadlineItalic: "Grounded Setting",
  closingBody: [
    "The Spiritual Track unfolds at The Grove — Northbound's Garden Grove campus, where a college-campus environment, gender-specific residential wings, and co-ed clinical programming create space for both structure and reflection.",
    "Whether you are in residential treatment or stepping through PHP, these practices meet you where you are — building the inner resources that make every other part of your recovery plan more durable.",
  ],
  closingQuote:
    "When the mind settles and the body breathes, the work of recovery becomes possible in a way that force alone never achieves.",
  closingQuoteAttribution: "Northbound Treatment Services",
  closingImage: GARDEN_GROVE_IMAGES.exterior,
  closingImageAlt:
    "The Grove — Northbound's Garden Grove residential treatment campus exterior in Orange County",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "Tour Garden Grove", href: "/locations/california/garden-grove/" },

  relatedServices: [
    { name: "Faith-Based Recovery (LINKS)", href: "/programs/residential-treatment-center/christ-centered-links-residential-program/", tag: "Signature Program", icon: "ri-heart-2-line" },
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Experiential", icon: "ri-compass-3-line" },
    { name: "Music Recovery Program", href: "/treatment/music-program/", tag: "Expressive Arts", icon: "ri-music-2-line" },
  ],

  ctaHeadline: "Ready to Begin Holistic Recovery?",
  ctaBody:
    "The Spiritual Track is integrated into residential and PHP care at our Garden Grove campus. Call our admissions team 24/7 to learn how sound therapy, breathwork, meditation, and yoga fit your treatment plan.",
};

export default function SpiritualTrackPage() {
  return <SignaturePageTemplate data={data} />;
}
