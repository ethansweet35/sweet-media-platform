import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";
import { SERVICE_IMAGES, SIGNATURE_PAGE_IMAGES } from "@/views/home/assets";

const data: SignaturePageData = {
  heroImage: SIGNATURE_PAGE_IMAGES.musicHero,
  heroImageAlt: "Communal lounge at The Grove — a gathering space for Northbound's Music Recovery Program",
  serviceName: "Music Recovery Program",
  heroItalicWord: "Music",
  heroBody:
    "Music is a universal language — and at Northbound, it's a clinical tool. Our Music Recovery Program helps clients express what words cannot, build community through shared creativity, and discover what sobriety sounds like in their own voice.",

  pullQuote: "Some wounds can't be spoken. They have to be played.",
  pullQuoteItalicPart: "They have to be played.",
  pullQuoteBody:
    "Northbound's Music Program goes far beyond listening. Clients compose, record, perform, and share original work — building a tangible artifact of their recovery journey and discovering a creative identity that can sustain sobriety long after treatment ends.",

  whatItIsEyebrow: "The Approach",
  whatItIsHeadline: "Sound as",
  whatItIsHeadlineItalic: "Medicine",
  whatItIsBody: [
    "Music impacts the brain in ways that other therapies cannot. It regulates mood, evokes memory, creates social connection, and opens emotional channels that verbal processing often cannot access. For clients whose addiction is intertwined with a musical lifestyle, Northbound's program provides a safe path forward — proving that recovery and music can coexist.",
    "Whether a client is a professional musician, an occasional listener, or someone who has never touched an instrument, the Music Program is designed to meet them where they are — empowering self-expression, building coping skills, and creating a community of shared creativity.",
  ],
  whatItIsChecklist: [
    "Weekly gender-specific music experiential groups",
    "Monthly recording studio sessions — 8 hours to produce original work",
    "Composition, lyric writing, and group music exploration",
    "Music-oriented community outings in real-world settings",
    "Available in both residential and outpatient programs",
  ],
  whatItIsImage: SERVICE_IMAGES.supportGroup,
  whatItIsImageAlt: "Support group session at The Grove — community connection through Northbound's Music Recovery Program",
  whatItIsFloatingHeadline: "Composition,\nRecording & Expression",

  featuresEyebrow: "Program Elements",
  featuresHeadline: "The",
  featuresHeadlineItalic: "Full Program",
  featuresIntro:
    "Northbound's Music Program is comprehensive — encompassing creative expression, community performance, professional recording, and structured therapeutic integration.",
  features: [
    {
      title: "Experiential Music Groups",
      focus: "Expression & Emotion",
      description:
        "Once a week, each gender-specific group explores the intersection of music and addiction — examining the role music has played in their lives and discovering new ways to engage with it in recovery.",
      image: SERVICE_IMAGES.communalLounge,
      imageAlt: "Communal lounge at The Grove used for group music experiential sessions",
      tag: "Core Program",
      tagIcon: "ri-music-2-line",
    },
    {
      title: "Recording Studio Sessions",
      focus: "Creativity & Craft",
      description:
        "Once a month, each group spends eight hours in a professional recording studio producing original work. Clients learn from one another and from industry professionals — leaving with a tangible product they're proud of.",
      image: null,
      tag: "Monthly Experience",
      tagIcon: "ri-mic-line",
      accent: "navy",
    },
    {
      title: "Songwriting & Composition",
      focus: "Storytelling & Identity",
      description:
        "Clients write lyrics and compose melodies — finding words for experiences that previously felt inexpressible. The creative process surfaces emotions and insights that deepen the clinical work.",
      image: null,
      tag: "Creative Outlet",
      tagIcon: "ri-quill-pen-line",
      accent: "terracotta",
    },
    {
      title: "Real-World Music Outings",
      focus: "Recovery in Real Life",
      description:
        "Clients attend live music events and music-oriented outings under clinical supervision — learning to enjoy music-filled environments while maintaining sobriety. A direct application of InVivo® real-world practice.",
      image: null,
      tag: "Community Outing",
      tagIcon: "ri-map-pin-2-line",
      accent: "agave",
    },
    {
      title: "Mood & Coping Skills",
      focus: "Regulation & Resilience",
      description:
        "Clients learn to use music intentionally — to calm, energize, process grief, or access motivation. These evidence-based skills become lasting tools in the sobriety toolkit.",
      image: null,
      tag: "Clinical Skills",
      tagIcon: "ri-brain-line",
      accent: "navy",
    },
  ],

  evidenceEyebrow: "Evidence-Based Methodology",
  evidenceHeadline: "How Music",
  evidenceHeadlineItalic: "Heals",
  evidenceBody:
    "The therapeutic power of music is backed by extensive neuroscience and clinical research — making it one of the most effective complements to traditional addiction treatment.",
  evidencePoints: [
    {
      icon: "ri-brain-line",
      title: "Neurological Regulation",
      body: "Music activates the brain's reward system, releases dopamine, and regulates the limbic system — providing a natural, non-addictive pathway to the same brain states that substances artificially induced.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Emotional Processing",
      body: "Music is uniquely capable of bypassing cognitive defenses — accessing grief, anger, joy, and longing in ways that talk therapy often cannot. Clients process emotion through sound.",
    },
    {
      icon: "ri-group-line",
      title: "Social Connection",
      body: "Group music-making is one of the most powerful builders of social cohesion. Clients who make music together form bonds of trust and mutual accountability — core to lasting recovery.",
    },
    {
      icon: "ri-quill-pen-line",
      title: "Identity Construction",
      body: "Composing and sharing original music builds a creative identity in recovery — giving clients a sense of self and purpose that is wholly separate from substance use.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Musician-Specific Recovery",
      body: "For clients who are musicians, recovery can feel incompatible with their lifestyle. Northbound proves it isn't — showing that the musician's life and sobriety not only coexist but thrive together.",
    },
    {
      icon: "ri-focus-3-line",
      title: "Tangible Achievement",
      body: "Recording original music in a professional studio produces a physical artifact of recovery — something clients can share, revisit, and point to as evidence of what they've built.",
    },
  ],
  stats: [
    { value: "38+", label: "Years of clinical innovation" },
    { value: "2:1", label: "Staff-to-client ratio" },
    { value: "8hrs", label: "Monthly recording studio access" },
  ],

  closingEyebrow: "A Creative Path to Lasting Recovery",
  closingHeadline: "Your Story",
  closingHeadlineItalic: "Deserves a Song",
  closingBody: [
    "Recovery is not just the absence of substances. It's the presence of meaning — and for many, music is where meaning lives. Northbound's Music Program gives clients back their relationship with music in a way that is healthy, sustainable, and deeply personal.",
    "Graduates of the program leave with original recordings, new skills, and a community of fellow musicians in recovery. They have proven — to themselves — that they can create something real, something lasting, in sobriety.",
  ],
  closingQuote:
    "It is possible to be a career or recreational musician while staying sober. Northbound helps you find that version of yourself.",
  closingQuoteAttribution: "Northbound Treatment Services",
  closingImage: SERVICE_IMAGES.outdoorMeditation,
  closingImageAlt: "Clients in guided outdoor meditation at The Grove — wellness and community in recovery",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "View Gallery", href: "/locations/" },

  relatedServices: [
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Signature Service", icon: "ri-compass-3-line" },
    { name: "Wolf-Assisted Therapy", href: "/wolf-assisted-therapy/", tag: "Signature Service", icon: "ri-leaf-line" },
    { name: "Family Therapy Services", href: "/programs/family-therapy/", tag: "Signature Service", icon: "ri-family-line" },
    { name: "Dual-Diagnosis Treatment", href: "/treatment/dual-diagnosis/", tag: "Specialty Program", icon: "ri-brain-line" },
  ],

  ctaHeadline: "Find Your Voice in Recovery",
  ctaBody:
    "Northbound's Music Recovery Program is available in residential and outpatient care. Call our admissions team 24/7 to learn how music fits into your treatment plan.",
};

export default function MusicPage() {
  return <SignaturePageTemplate data={data} />;
}
