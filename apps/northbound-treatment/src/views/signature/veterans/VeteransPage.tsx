import SignaturePageTemplate, { type SignaturePageData } from "@/views/shared/SignaturePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SignaturePageData = {
  heroImage: `${BASE}/nbt_veterans_hero01.jpg`,
  heroImageAlt: "Veteran in therapy session at Northbound Treatment — focused, calm, and engaged in recovery",
  serviceName: "Veterans Track Program",
  heroItalicWord: "Veterans",
  heroBody:
    "Northbound's Veterans Track program honors the service of those who gave so much — with specialized addiction and mental health treatment that understands the unique weight of military experience.",

  pullQuote: "Those who serve deserve a path back to themselves.",
  pullQuoteItalicPart: "a path back to themselves.",
  pullQuoteBody:
    "Veterans face challenges that civilian treatment programs weren't built to address: combat trauma, moral injury, military sexual trauma, the disorientation of readjustment. Northbound's Veterans Track program is specifically designed to meet these challenges with the clinical depth, cultural competence, and genuine respect they require.",

  whatItIsEyebrow: "The Program",
  whatItIsHeadline: "Care Built for",
  whatItIsHeadlineItalic: "Those Who Served",
  whatItIsBody: [
    "Northbound's Veterans Track program is designed for veterans and active military personnel navigating addiction, PTSD, depression, and the complex challenges of transitioning back to civilian life. We proudly honor our Tricare contract — ensuring that eligible veterans can access the care they need without the burden of excessive out-of-pocket costs.",
    "Under the leadership of CEO Paul Alexander, Northbound is a proud supporter of Care Possible, an organization dedicated to expanding access to compassionate care for veterans and their families. Every aspect of the Veterans Track — from initial screening to aftercare — is built around the veteran's lived experience.",
  ],
  whatItIsChecklist: [
    "Tricare-contracted — we work with your VA benefits",
    "Comprehensive screening and assessment tailored to military experience",
    "PTSD-specialized therapies including EMDR and trauma-focused CBT",
    "Military sexual trauma — sensitive, empowering treatment protocols",
    "Readjustment and civilian reintegration support",
    "Dedicated aftercare and alumni community connection",
  ],
  whatItIsImage: `${BASE}/nbt_veterans_outdoor01.jpg`,
  whatItIsImageAlt: "Veteran hiking through a California eucalyptus forest — healing through movement and nature",
  whatItIsFloatingHeadline: "Tricare-Contracted\nVeterans Care",

  featuresEyebrow: "What We Address",
  featuresHeadline: "The Full Scope of",
  featuresHeadlineItalic: "Military Experience",
  featuresIntro:
    "The Veterans Track is built to address the specific clinical, psychological, and social challenges that military service creates — in a setting that honors service members with the respect they deserve.",
  features: [
    {
      title: "PTSD & Combat Trauma",
      focus: "EMDR · Trauma-Focused CBT",
      description:
        "Combat trauma leaves imprints that don't respond to standard treatment. Northbound's specialized therapists use EMDR and trauma-focused CBT to process and integrate even the most difficult experiences.",
      image: `${BASE}/nbt_veterans_group01.jpg`,
      imageAlt: "Veterans seated in a circle on a wooded deck — a brotherhood built on shared healing at Northbound",
      tag: "Core Focus",
      tagIcon: "ri-shield-star-line",
    },
    {
      title: "Military Sexual Trauma",
      focus: "Sensitive · Empowering Treatment",
      description:
        "MST requires clinical approaches that are trauma-informed, gender-sensitive, and deeply empowering. Northbound's team creates space for survivors to heal and reclaim their strength.",
      image: null,
      tag: "Specialized Care",
      tagIcon: "ri-heart-line",
      accent: "navy",
    },
    {
      title: "Substance Use & Addiction",
      focus: "Integrated Dual-Diagnosis Treatment",
      description:
        "Many veterans use substances to manage the symptoms of untreated trauma, PTSD, or depression. The Veterans Track treats addiction and its underlying causes simultaneously.",
      image: null,
      tag: "Core Treatment",
      tagIcon: "ri-brain-line",
      accent: "terracotta",
    },
    {
      title: "Readjustment & Reintegration",
      focus: "Civilian Life Navigation",
      description:
        "The transition from military to civilian life is profoundly disorienting. Northbound's program provides guidance, skill-building, and community to support a successful reintegration.",
      image: null,
      tag: "Life Skills",
      tagIcon: "ri-compass-3-line",
      accent: "agave",
    },
    {
      title: "Depression & Moral Injury",
      focus: "Meaning-Centered Healing",
      description:
        "Moral injury — the wound that comes from acting against one's values — is a distinct and underaddressed dimension of military suffering. Northbound's therapists are trained to address it directly.",
      image: null,
      tag: "Mental Health",
      tagIcon: "ri-mental-health-line",
      accent: "navy",
    },
  ],

  evidenceEyebrow: "Our Commitment",
  evidenceHeadline: "Dedicated to",
  evidenceHeadlineItalic: "Excellence in Veteran Care",
  evidenceBody:
    "Every element of Northbound's Veterans Track is built on clinical evidence, cultural competence, and an unwavering commitment to honoring those who served.",
  evidencePoints: [
    {
      icon: "ri-shield-star-line",
      title: "Military Cultural Competence",
      body: "Northbound's clinical staff understand military culture — its language, its values, its hierarchies. Veterans are treated by people who speak their language and honor their experience.",
    },
    {
      icon: "ri-brain-line",
      title: "Evidence-Based PTSD Treatment",
      body: "EMDR, trauma-focused CBT, and prolonged exposure therapy are clinically validated as the most effective approaches to combat PTSD — and are central to Northbound's Veterans Track.",
    },
    {
      icon: "ri-group-line",
      title: "Peer Community",
      body: "Veterans heal in community with others who understand. Northbound's group structure creates space for veterans to connect, share, and support one another through recovery.",
    },
    {
      icon: "ri-refresh-line",
      title: "Aftercare & Alumni",
      body: "Recovery is a lifelong journey. Northbound's Aftercare and Alumni Program ensures continuous support — keeping veterans connected with a community that understands and cares long after treatment ends.",
    },
    {
      icon: "ri-wallet-3-line",
      title: "Tricare Coverage",
      body: "Northbound proudly honors its Tricare contract — ensuring that eligible veterans and active military personnel can access the care they need without prohibitive financial barriers.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Holistic Healing",
      body: "Treatment encompasses body, mind, and spirit — with evidence-based therapies complemented by holistic modalities including yoga, meditation, and experiential therapy designed for veterans.",
    },
  ],
  stats: [
    { value: "38+", label: "Years of behavioral healthcare expertise" },
    { value: "1:1", label: "Staff-to-client ratio" },
    { value: "24/7", label: "Admissions support available" },
  ],

  closingEyebrow: "A Haven to Heal and Grow",
  closingHeadline: "Your Service",
  closingHeadlineItalic: "Is Honored Here",
  closingBody: [
    "At Northbound, our mission is to offer a haven for veterans to heal, grow, and find a new path forward. We recognize the sacrifices you have made — and we commit to providing the highest standard of care in return.",
    "The Veterans Track program is more than just treatment. It is a journey toward rediscovery: of identity, of purpose, of hope. We stand ready to walk that journey alongside you.",
  ],
  closingQuote:
    "We stand ready to support our veterans and active military personnel with the care, respect, and excellence they deserve.",
  closingQuoteAttribution: "Paul Alexander, CEO — Northbound Treatment Services",
  closingImage: `${BASE}/nbt_veterans_outdoor01.jpg`,
  closingImageAlt: "Veteran walking a California forest path — strength, solitude, and a new beginning",
  closingPrimaryCta: { label: "Start the Admissions Process", href: "/admissions/" },
  closingSecondaryCta: { label: "Verify Tricare Benefits", href: "/insurance/" },

  relatedServices: [
    { name: "Dual-Diagnosis Treatment", href: "/treatment/dual-diagnosis/", tag: "Specialty Program", icon: "ri-brain-line" },
    { name: "Adventure Therapy", href: "/adventure-therapy-program/", tag: "Signature Service", icon: "ri-compass-3-line" },
    { name: "Family Therapy Services", href: "/programs/family-therapy/", tag: "Signature Service", icon: "ri-family-line" },
    { name: "Aftercare Program", href: "/programs/aftercare/", tag: "Continuum of Care", icon: "ri-refresh-line" },
  ],

  ctaHeadline: "Ready to Begin the Journey Home?",
  ctaBody:
    "Northbound's admissions team is available 24/7. We'll verify your Tricare benefits and answer every question — at no cost or obligation.",
};

export default function VeteransPage() {
  return <SignaturePageTemplate data={data} />;
}
