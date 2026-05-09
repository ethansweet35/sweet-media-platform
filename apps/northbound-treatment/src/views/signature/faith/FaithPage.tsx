import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SignaturePageData = {
  heroImage: `${BASE}/nbt_faith_hero01.jpg`,
  heroImageAlt: "Person in quiet prayer inside a chapel with stained glass light — faith as a foundation for recovery",
  serviceName: "Faith-Based Recovery",
  heroItalicWord: "Faith-Based",
  heroBody:
    "For those who draw strength from their Christian faith, Northbound's LINKS program offers a recovery path where spirituality and evidence-based treatment work hand in hand — nestled along the peaceful Orange County coastline.",

  pullQuote: "For the right person, faith is not a supplement to recovery. It is the foundation.",
  pullQuoteItalicPart: "It is the foundation.",
  pullQuoteBody:
    "LINKS is Northbound's Christ-centered residential program — named for the link between the best practices of addiction medicine and the principles of Christianity. Whether you have drifted from your faith, held onto it throughout your addiction, or are encountering it for the first time, LINKS creates space for faith and recovery to grow together.",

  whatItIsEyebrow: "The LINKS Program",
  whatItIsHeadline: "Where Faith Meets",
  whatItIsHeadlineItalic: "Clinical Excellence",
  whatItIsBody: [
    "The LINKS program at Northbound is a Christian treatment track for drug and alcohol addiction — offered to those who want to invite their faith into their recovery and strengthen their relationship with God. It is not a replacement for evidence-based clinical care; it is a powerful enhancement of it.",
    "Participants attend local church services, engage in Christ-centered counseling, and explore how Christian principles — forgiveness, community, purpose, grace — apply directly to the work of recovery. The result is a rich, deeply personal healing experience rooted in both clinical science and spiritual conviction.",
  ],
  whatItIsChecklist: [
    "Christ-centered counseling integrated throughout treatment",
    "Weekly local church attendance with clinical support",
    "LINKS name reflects the bridge between addiction medicine and Christianity",
    "Gender-specific residential program in Orange County, CA",
    "Access to all Northbound Signature Services, including Collegebound® and Careerbound®",
    "Interdisciplinary treatment team including Masters-prepared trauma therapist and music therapist",
  ],
  whatItIsImage: `${BASE}/nbt_faith_group01.jpg`,
  whatItIsImageAlt: "Faith-based recovery group on the California coastline during Northbound's LINKS program",
  whatItIsFloatingHeadline: "Where Recovery\nMeets Redemption",

  featuresEyebrow: "Program Elements",
  featuresHeadline: "Faith, Healing,",
  featuresHeadlineItalic: "and Fellowship",
  featuresIntro:
    "The LINKS program weaves Christian faith into every dimension of treatment — creating a recovery experience that is clinically comprehensive and spiritually alive.",
  features: [
    {
      title: "Christ-Centered Counseling",
      focus: "Faith-Integrated Therapy",
      description:
        "All participants engage in counseling, with LINKS placing particular emphasis on Christ-centered approaches — exploring how faith can be a source of strength in problem-solving, forgiveness, and working through challenges.",
      image: `${BASE}/nbt_faith_hero01.jpg`,
      imageAlt: "Quiet moment of prayer and reflection in the LINKS faith-based recovery program at Northbound",
      tag: "Core Element",
      tagIcon: "ri-heart-2-line",
    },
    {
      title: "Church Attendance",
      focus: "Community & Worship",
      description:
        "Participants attend local church services while in treatment — reconnecting with faith community in a supported, real-world setting that complements the clinical work being done at Northbound.",
      image: null,
      tag: "Weekly Practice",
      tagIcon: "ri-community-line",
      accent: "navy",
    },
    {
      title: "Interdisciplinary Care Team",
      focus: "Full Clinical Support",
      description:
        "Each LINKS participant has an interdisciplinary team including a case manager, ASAM-certified addiction psychiatrist, primary therapist, trauma therapist, music therapist, and academic advisor.",
      image: null,
      tag: "Clinical Excellence",
      tagIcon: "ri-team-line",
      accent: "terracotta",
    },
    {
      title: "Collegebound® & Careerbound®",
      focus: "Education & Career Reintegration",
      description:
        "LINKS participants have full access to Northbound's signature programs — including Collegebound® for educational reintegration and Careerbound® for career building — all within the recovery environment.",
      image: null,
      tag: "Signature Programs",
      tagIcon: "ri-graduation-cap-line",
      accent: "agave",
    },
    {
      title: "Trauma-Informed Spiritual Healing",
      focus: "EMDR · Psychoeducation · Process Groups",
      description:
        "Trauma often underlies addiction. LINKS integrates trauma-focused therapies — including EMDR and experiential processing — within a spiritual framework that offers clients both clinical tools and transcendent meaning.",
      image: null,
      tag: "Trauma Care",
      tagIcon: "ri-heart-pulse-line",
      accent: "navy",
    },
  ],

  evidenceEyebrow: "Why It Works",
  evidenceHeadline: "The Power of",
  evidenceHeadlineItalic: "Faith in Recovery",
  evidenceBody:
    "Research consistently shows that spiritual engagement can strengthen recovery outcomes — and for those with Christian convictions, faith-integrated treatment offers something that clinical science alone cannot: a source of transcendent meaning and community accountability.",
  evidencePoints: [
    {
      icon: "ri-heart-2-line",
      title: "Meaning & Purpose",
      body: "Faith provides a framework for meaning — answering the 'why' of recovery that clinical treatment alone cannot address. For many, reconnecting with God gives them a reason to stay sober that transcends willpower.",
    },
    {
      icon: "ri-community-line",
      title: "Accountability Community",
      body: "Christian community — church services, small groups, shared spiritual disciplines — creates natural accountability structures that extend well beyond the treatment environment and into lasting recovery.",
    },
    {
      icon: "ri-links-line",
      title: "Forgiveness & Self-Compassion",
      body: "Shame is one of the most powerful drivers of relapse. Christian theology's emphasis on forgiveness — of self and others — directly addresses the shame cycles that sustain addiction.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Clinical Integration",
      body: "LINKS does not sacrifice clinical rigor for spiritual content. Every evidence-based therapy available at Northbound — CBT, DBT, EMDR, trauma work — is fully integrated within the Christ-centered framework.",
    },
    {
      icon: "ri-leaf-line",
      title: "Humility & Surrender",
      body: "The spiritual concept of surrendering to something greater than oneself mirrors the first step of recovery — a powerful alignment between faith principles and evidence-based addiction treatment models.",
    },
    {
      icon: "ri-group-line",
      title: "Fellowship in Recovery",
      body: "Recovering alongside a close-knit community of individuals pursuing parallel religious and recovery development provides the kind of rich, lasting fellowship that sustains sobriety long after treatment ends.",
    },
  ],
  stats: [
    { value: "38+", label: "Years of integrated treatment experience" },
    { value: "1:1", label: "Staff-to-client ratio" },
    { value: "3mo", label: "Ideal residential treatment duration" },
  ],

  closingEyebrow: "A Place to Rediscover Who You Are",
  closingHeadline: "Recovery and",
  closingHeadlineItalic: "Faith, Together",
  closingBody: [
    "Regardless of where you are in your faith journey — whether you are returning to a relationship with God you've lost, deepening one that has sustained you, or exploring Christianity for the first time — LINKS meets you there. Without judgment. With compassion. With clinical depth.",
    "Nestled along the peaceful Orange County coastline, the LINKS program provides a setting where the spiritual and the clinical can breathe together — where you can discover that addiction recovery and a life of purpose are not only possible, but made for each other.",
  ],
  closingQuote:
    "Recovering alongside a close-knit community of individuals engaging in parallel religious and recovery development provides rich and lasting fellowship.",
  closingQuoteAttribution: "Northbound Treatment Services",
  closingImage: `${BASE}/nbt_faith_walk01.jpg`,
  closingImageAlt: "Two individuals walking through a California garden together — fellowship and new beginnings in the LINKS program",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "Call (866) 311-0003", href: "tel:8663110003" },

  relatedServices: [
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Signature Service", icon: "ri-compass-3-line" },
    { name: "Wolf-Assisted Therapy", href: "/wolf-assisted-therapy/", tag: "Signature Service", icon: "ri-leaf-line" },
    { name: "Music Recovery Program", href: "/treatment/music-program/", tag: "Signature Service", icon: "ri-music-2-line" },
    { name: "Family Therapy Services", href: "/programs/family-therapy/", tag: "Signature Service", icon: "ri-family-line" },
  ],

  ctaHeadline: "Ready to Begin the LINKS Journey?",
  ctaBody:
    "Our admissions team is available 24/7 to answer your questions about the LINKS program, verify your insurance, and help you take the first step.",
};

export default function FaithPage() {
  return <SignaturePageTemplate data={data} />;
}
