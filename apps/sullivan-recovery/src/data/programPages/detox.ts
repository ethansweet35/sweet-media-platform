import type { ProgramPageData } from "@/types/programPage";
import { PROGRAMS_IMAGES_BASE } from "@/data/programs";

const IMG = PROGRAMS_IMAGES_BASE;

const detoxHero = `${IMG}/sr_detox_hero01.jpg`;
const detoxIntro = `${IMG}/sr_detox_intro01.jpg`;
const detoxCampus = `${IMG}/sr_detox_campus01.jpg`;
const detoxMedical = `${IMG}/sr_detox_medical01.jpg`;
const detoxTherapy = `${IMG}/sr_detox_therapy01.jpg`;
const detoxLounge = `${IMG}/sr_detox_lounge01.jpg`;
const detoxOc = `${IMG}/sr_detox_oc01.jpg`;

export const detoxProgramPage: ProgramPageData = {
  canonical: "/programs/detox/",
  breadcrumb: {
    parent: { label: "Programs", href: "/programs/" },
    current: "Medical detox",
  },
  hero: {
    eyebrow: "Medical detox · Mission Viejo",
    title: "Orange County drug & alcohol",
    titleAccent: "detox",
    description:
      "Physician-led detox in a peaceful Mission Viejo setting — 24/7 monitoring, private rooms, same-day admission when appropriate, and a seamless transition into residential care on the same campus.",
    image: detoxHero,
    imageAlt:
      "Private detox room at Sullivan Recovery with comfortable bedding and calm lighting",
    stats: [
      { value: "24/7", label: "Medical monitoring" },
      { value: "Same-day", label: "Admission available" },
      { value: "Private", label: "Residential rooms" },
      { value: "OC", label: "Orange County campus" },
    ],
  },
  trust: [
    {
      icon: "ri-time-line",
      label: "Available 24/7",
      detail: "Admissions and clinical support around the clock",
    },
    {
      icon: "ri-smartphone-line",
      label: "Keep your phone",
      detail: "Stay connected to family and your support network",
    },
    {
      icon: "ri-hotel-bed-line",
      label: "Private rooms",
      detail: "Comfortable, home-like accommodations",
    },
    {
      icon: "ri-door-open-line",
      label: "Same-day admission",
      detail: "When clinically appropriate after assessment",
    },
    {
      icon: "ri-shield-check-line",
      label: "Insurance verified",
      detail: "Benefits confirmed before you arrive",
    },
    {
      icon: "ri-loop-left-line",
      label: "Aftercare planning",
      detail: "Residential and outpatient coordinated on-site",
    },
  ],
  story: {
    eyebrow: "Who we are",
    title: "Expert detox rooted in",
    titleAccent: "lived experience",
    paragraphs: [
      "Sullivan Recovery was founded by brothers Cory and Tyson Sullivan — over 25 years combined in addiction and mental health treatment. Many on our team understand recovery personally, not only clinically.",
      "Physicians, nurses, and licensed clinicians deliver individualized detox on one Mission Viejo campus: assessment, stabilization, therapy, and discharge planning without handing you off to another provider.",
    ],
    bullets: [
      "Physician-led detox with 24/7 nursing",
      "MAT when clinically appropriate",
      "Therapy during stabilization",
      "Direct path to residential care on campus",
    ],
    image: detoxIntro,
    imageAlt: "Clinical team coordinating personalized detox care at Sullivan Recovery",
    link: { label: "Our approach & team", href: "/our-approach/" },
  },
  stats: [
    { value: "25+", label: "Years combined leadership experience" },
    { value: "100%", label: "On-campus continuum of care" },
    { value: "24/7", label: "Nursing & clinical availability" },
    { value: "OC", label: "Serving all of Orange County" },
  ],
  differentiators: {
    eyebrow: "The Sullivan difference",
    title: "Detox that feels clinical — and",
    titleAccent: "human",
    items: [
      {
        title: "Founded by people who have been there",
        description:
          "Cory and Tyson Sullivan lead with decades of treatment experience and personal understanding of addiction — comfort and accountability without judgment.",
        icon: "ri-team-line",
        featured: true,
      },
      {
        title: "You keep your phone",
        description: "Stay connected to family and sponsors throughout your stay.",
        icon: "ri-smartphone-line",
      },
      {
        title: "Private, peaceful rooms",
        description: "Residential-style rooms built for rest and dignity during withdrawal.",
        icon: "ri-hotel-bed-line",
      },
      {
        title: "Insurance clarity first",
        description: "Benefits verified before admission — no surprise bills.",
        icon: "ri-shield-check-line",
      },
      {
        title: "One campus, full continuum",
        description: "Detox into residential and aftercare without changing facilities.",
        icon: "ri-route-line",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "Your path through",
    titleAccent: "medical detox",
    description:
      "A supervised process to manage withdrawal safely and prepare you for ongoing treatment — adjusted to your response at every phase.",
    steps: [
      {
        num: "01",
        phase: "Evaluation",
        title: "Clinical assessment",
        description:
          "We review substance use, medical history, and mental health, run labs and vitals, and build your detox protocol — including MAT or taper plans when needed.",
        icon: "ri-file-search-line",
        image: detoxTherapy,
        imageAlt: "Licensed clinicians leading therapy during early recovery at Sullivan Recovery",
      },
      {
        num: "02",
        phase: "Stabilization",
        title: "24/7 medical monitoring",
        description:
          "Nursing tracks vitals and withdrawal scores around the clock. Medications ease symptoms; physicians adjust your plan in real time as you stabilize.",
        icon: "ri-heart-pulse-line",
      },
      {
        num: "03",
        phase: "Therapy",
        title: "Therapy during detox",
        description:
          "Clinicians introduce coping skills and group work at a pace that fits your energy. Family sessions begin when appropriate.",
        icon: "ri-mental-health-line",
      },
      {
        num: "04",
        phase: "Transition",
        title: "Continuum planning",
        description:
          "Before discharge we finalize residential or outpatient next steps. Most clients move directly into our on-campus residential program.",
        icon: "ri-route-line",
      },
    ],
  },
  clinical: {
    eyebrow: "Clinical excellence",
    title: "Medication-assisted treatment & medical safety",
    paragraphs: [
      "Withdrawal from alcohol, benzodiazepines, and opioids can be medically serious. Physician oversight, emergency-ready protocols, and MAT are available when appropriate.",
      "Comfort medications and structured tapers are tailored to your substance, dose history, and co-occurring health — not a one-size protocol.",
    ],
    highlights: [
      {
        title: "Alcohol & benzo safety",
        description:
          "Structured tapers and CIWA-guided monitoring for high-risk withdrawal syndromes.",
        icon: "ri-first-aid-kit-line",
      },
      {
        title: "Opioid MAT",
        description:
          "Buprenorphine and supportive medications to reduce cravings and stabilize opioid withdrawal.",
        icon: "ri-capsule-line",
      },
      {
        title: "Psychiatric support",
        description:
          "Assessment for depression, anxiety, PTSD, and other conditions that influence detox planning.",
        icon: "ri-mental-health-line",
      },
      {
        title: "Vitals & labs",
        description:
          "Routine monitoring and testing to catch complications early and adjust treatment.",
        icon: "ri-pulse-line",
      },
    ],
    image: detoxMedical,
    imageAlt: "Medical equipment and comfort care items during supervised detox",
  },
  benefits: {
    eyebrow: "Why medical detox",
    title: "Benefits of physician-led detox",
    items: [
      {
        title: "Safety",
        description:
          "Medical supervision manages severe withdrawal risks — including seizures, delirium tremens, and cardiac stress — with protocols ready before symptoms escalate.",
        icon: "ri-shield-check-line",
      },
      {
        title: "Comfort",
        description:
          "Medication-assisted treatment, hydration, nutrition, and emotional support reduce the intensity of cravings and acute withdrawal.",
        icon: "ri-heart-line",
      },
      {
        title: "Higher success rates",
        description:
          "Professional detox improves the likelihood you complete the next level of care — residential treatment — with relapse-prevention skills already in motion.",
        icon: "ri-line-chart-line",
      },
      {
        title: "Dual diagnosis ready",
        description:
          "Mental health symptoms are assessed early so anxiety, trauma, or mood disorders are not overlooked during stabilization.",
        icon: "ri-brain-line",
      },
      {
        title: "Structured environment",
        description:
          "A calm campus removes triggers, establishes routine, and surrounds you with staff who understand early recovery.",
        icon: "ri-home-heart-line",
      },
      {
        title: "Continuity of care",
        description:
          "Transition to residential, therapies, and aftercare on one campus — your chart and relationships stay intact.",
        icon: "ri-links-line",
      },
    ],
  },
  amenities: {
    eyebrow: "The environment",
    title: "A campus designed for calm — not chaos",
    description:
      "Detox is physically demanding. We invest in spaces that help your nervous system settle: natural light, comfortable furnishings, outdoor access, and respectful privacy.",
    image: detoxCampus,
    imageAlt: "Peaceful outdoor courtyard at Sullivan Recovery Mission Viejo campus",
    items: [
      {
        title: "Private residential rooms",
        description: "Personal space to rest between clinical checks and therapy sessions.",
        icon: "ri-hotel-bed-line",
      },
      {
        title: "Outdoor courtyards",
        description: "Fresh air and quiet seating away from clinical corridors.",
        icon: "ri-plant-line",
      },
      {
        title: "Comfortable lounges",
        description: "Shared areas for reading, reflection, and low-stimulus downtime.",
        icon: "ri-sofa-line",
      },
      {
        title: "Nutritious meals",
        description: "Balanced food to support healing and energy as appetite returns.",
        icon: "ri-restaurant-line",
      },
      {
        title: "Holistic offerings",
        description: "Mindfulness, music therapy, and surf therapy integrated into residential care.",
        icon: "ri-leaf-line",
      },
      {
        title: "Family involvement",
        description: "Guided communication and education when appropriate for your plan.",
        icon: "ri-parent-line",
      },
    ],
  },
  gallery: {
    eyebrow: "Life on campus",
    title: "Where healing begins",
    images: [
      {
        src: detoxLounge,
        alt: "Sunlit lounge with comfortable seating at Sullivan Recovery",
        caption: "Common areas · low stimulation",
      },
      {
        src: detoxTherapy,
        alt: "Therapy room prepared for group sessions",
        caption: "Licensed clinicians",
      },
      {
        src: detoxCampus,
        alt: "Outdoor courtyard with landscaping",
        caption: "Mission Viejo campus",
      },
    ],
  },
  substances: {
    eyebrow: "What we treat",
    title: "Substance-specific detox programs",
    description:
      "Each substance produces a distinct withdrawal profile. We tailor medications, monitoring intensity, and length of stay to your clinical picture — with dedicated pages for each program below.",
    items: [
      {
        icon: "ri-goblet-line",
        title: "Alcohol",
        description:
          "Medically supervised tapering for tremors, anxiety, insomnia, and risk of delirium tremens.",
        href: "/programs/detox/alcohol/",
      },
      {
        icon: "ri-capsule-line",
        title: "Fentanyl",
        description:
          "Close nursing supervision with MAT for high-potency synthetic opioid withdrawal.",
        href: "/programs/detox/fentanyl/",
      },
      {
        icon: "ri-heart-pulse-line",
        title: "Opioids",
        description:
          "Buprenorphine-based stabilization plus therapy for heroin and prescription opioids.",
        href: "/programs/detox/opioids/",
      },
      {
        icon: "ri-flashlight-line",
        title: "Cocaine",
        description:
          "Support for psychological withdrawal, sleep disruption, and intense cravings.",
        href: "/programs/detox/cocaine/",
      },
      {
        icon: "ri-first-aid-kit-line",
        title: "Benzodiazepines",
        description:
          "Gradual taper under 24/7 care to prevent seizures and rebound anxiety.",
        href: "/programs/detox/benzodiazepines/",
      },
      {
        icon: "ri-fire-line",
        title: "Meth",
        description:
          "Monitoring for fatigue, depression, and agitation with behavioral support.",
        href: "/programs/detox/meth/",
      },
      {
        icon: "ri-medicine-bottle-line",
        title: "Suboxone",
        description:
          "Supervised taper when discontinuing buprenorphine maintenance.",
        href: "/programs/detox/suboxone/",
      },
      {
        icon: "ri-flask-line",
        title: "Stimulants",
        description:
          "Medical oversight for amphetamine-class withdrawal and stabilization.",
        href: "/programs/detox/stimulants/",
      },
    ],
  },
  location: {
    eyebrow: "Orange County",
    title: "Medical detox near Mission Viejo",
    description:
      "Families across Orange County and Southern California choose Sullivan Recovery for accessible, physician-led detox without sending loved ones out of state. We serve clients from Irvine, Lake Forest, Laguna Beach, Newport Beach, Huntington Beach, and surrounding communities.",
    bullets: [
      "Mission Viejo · central Orange County",
      "Confidential residential campus",
      "Serving OC, South County & coastal cities",
    ],
    image: detoxOc,
    imageAlt: "Golden hour hills near Mission Viejo Orange County California",
    href: "/service-area/",
  },
  relatedPrograms: {
    eyebrow: "Continuum of care",
    title: "After detox — what comes next",
    items: [
      {
        title: "Residential treatment",
        description:
          "Structured inpatient care with daily therapy, community, and holistic programming on the same campus.",
        href: "/programs/residential-treatment/",
      },
      {
        title: "Aftercare programs",
        description:
          "Alumni support, discharge resources, and continued connection after you complete residential care.",
        href: "/programs/aftercare/",
      },
      {
        title: "Addiction therapies",
        description:
          "CBT, DBT, motivational interviewing, group therapy, and family work with licensed clinicians.",
        href: "/programs/therapies/",
      },
      {
        title: "Personalized care",
        description:
          "Dual diagnosis and individualized treatment when substance use and mental health intersect.",
        href: "/programs/personalized-care/",
      },
    ],
  },
  faqs: [
    {
      question: "How long does medical detox take?",
      answer:
        "Timeline depends on the substance, how long and how much you used, and your overall health. Alcohol and benzodiazepine detox often require several days of close monitoring — sometimes longer for complex tapers. Opioid detox may be shorter with medication-assisted treatment but can extend when transitioning to residential care. We give you a realistic range after your assessment, not a generic estimate.",
    },
    {
      question: "Can I be admitted the same day I call?",
      answer:
        "Often yes. After a confidential phone assessment and insurance verification, we coordinate intake when beds and clinical criteria align. Bring a valid ID, insurance card, and a list of current medications. Our admissions team walks you through what to pack and what to expect on arrival.",
    },
    {
      question: "What should I bring to detox?",
      answer:
        "Comfortable clothing for several days, personal hygiene items (alcohol-free), and any prescribed medications in original bottles. We provide linens and meals. Avoid valuables; leave substances and paraphernalia at home. Admissions sends a full packing guide before you travel.",
    },
    {
      question: "Can family visit or contact me during detox?",
      answer:
        "Yes — you may keep your phone, and family contact is encouraged when it supports your recovery. Visiting policies depend on clinical status and COVID or health protocols; staff will explain options during the first 24–48 hours.",
    },
    {
      question: "What happens after I complete detox?",
      answer:
        "Most clients transition into our residential program on the same campus. Your therapist, physician, and case manager coordinate handoff so treatment plans continue without starting over. If outpatient is clinically appropriate, we build that referral before discharge.",
    },
    {
      question: "Does insurance cover drug and alcohol detox?",
      answer:
        "Many PPO and in-network plans cover medically necessary detox. We verify benefits before admission through our insurance form or by phone. You receive a clear picture of likely out-of-pocket costs — not a surprise bill after the fact.",
    },
    {
      question: "Is detox safe for older adults or those with medical conditions?",
      answer:
        "Age and co-occurring medical issues require tighter monitoring — which is exactly why physician-led detox matters. We review cardiac history, diabetes, liver function, and psychiatric medications during assessment and adjust protocols accordingly.",
    },
    {
      question: "Do you treat polysubstance use?",
      answer:
        "Yes. Many clients arrive using more than one substance. Your plan accounts for overlapping withdrawal risks — for example alcohol plus benzodiazepines or opioids plus stimulants — with integrated medical oversight.",
    },
  ],
  cta: {
    title: "Take the first step toward safe detox",
    description:
      "Call admissions 24/7 or verify your insurance online. We will answer questions about withdrawal, length of stay, and coverage — confidentially and without pressure.",
  },
};
