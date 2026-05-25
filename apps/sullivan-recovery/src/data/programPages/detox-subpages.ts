import type { ProgramPageData } from "@/types/programPage";
import {
  DEFAULT_TRUST,
  detoxSubBreadcrumb,
  OC_LOCATION_IMAGE,
  programImage,
  relatedProgramsExcept,
} from "./shared";

type DetoxSubConfig = {
  canonical: string;
  current: string;
  substance: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  storyImage: string;
  stepImage: string;
  clinicalImage: string;
  amenitiesImage: string;
  gallery: [string, string, string];
  icon: string;
  withdrawalNote: string;
  matNote?: string;
};

function buildDetoxSubpage(c: DetoxSubConfig): ProgramPageData {
  return {
    canonical: c.canonical,
    breadcrumb: detoxSubBreadcrumb(c.current),
    hero: {
      eyebrow: c.eyebrow,
      title: c.title,
      titleAccent: c.titleAccent,
      description: c.description,
      image: c.heroImage,
      imageAlt: c.heroAlt,
      stats: [
        { value: "24/7", label: "Medical monitoring" },
        { value: "MAT", label: "When appropriate" },
        { value: "Private", label: "Rooms" },
        { value: "OC", label: "Mission Viejo" },
      ],
    },
    trust: DEFAULT_TRUST,
    story: {
      eyebrow: `${c.substance} detox`,
      title: "Physician-led",
      titleAccent: `${c.substance.toLowerCase()} detox`,
      paragraphs: [
        `${c.withdrawalNote} Sullivan Recovery provides medically supervised detox in Mission Viejo with nursing support 24/7.`,
        `Your plan is individualized, insurance is verified before admission, and residential care is available on the same campus when you are ready.`,
      ],
      bullets: [
        "24/7 nursing and physician oversight",
        c.matNote ?? "Medications for comfort and safety when indicated",
        "Therapy introduced as you stabilize",
        "Residential transition on one campus",
      ],
      image: c.storyImage,
      imageAlt: `${c.substance} detox assessment at Sullivan Recovery`,
      link: { label: "All medical detox programs", href: "/programs/detox/" },
    },
    differentiators: {
      eyebrow: "Why medical detox",
      title: `${c.substance} withdrawal deserves`,
      titleAccent: "clinical care",
      items: [
        {
          title: `${c.substance}-specific protocols`,
          description: c.withdrawalNote,
          icon: c.icon,
          featured: true,
        },
        {
          title: "Same-day admission",
          description: "Often available after phone assessment and insurance verification.",
          icon: "ri-door-open-line",
        },
        {
          title: "Keep your phone",
          description: "Stay connected to family and recovery supports.",
          icon: "ri-smartphone-line",
        },
        {
          title: "Private rooms",
          description: "Comfortable residential-style rooms during detox.",
          icon: "ri-hotel-bed-line",
        },
        {
          title: "Continuum on campus",
          description: "Step into residential treatment without changing facilities.",
          icon: "ri-route-line",
        },
      ],
    },
    process: {
      eyebrow: "How it works",
      title: "Your detox",
      titleAccent: "timeline",
      description:
        "Assessment, stabilization, therapy, and discharge planning — adjusted to your response throughout withdrawal.",
      steps: [
        {
          num: "01",
          phase: "Assessment",
          title: "Clinical evaluation",
          description:
            `We review ${c.substance.toLowerCase()} use history, medications, and co-occurring conditions to build your detox plan.`,
          icon: "ri-file-search-line",
          image: c.stepImage,
          imageAlt: `Medical monitoring during ${c.substance.toLowerCase()} detox`,
        },
        {
          num: "02",
          phase: "Stabilization",
          title: "24/7 monitoring",
          description:
            "Nursing tracks vitals and withdrawal symptoms; physicians adjust medications in real time.",
          icon: "ri-heart-pulse-line",
        },
        {
          num: "03",
          phase: "Therapy",
          title: "Therapeutic support",
          description:
            "Licensed clinicians introduce coping skills and prepare you for residential care.",
          icon: "ri-mental-health-line",
        },
        {
          num: "04",
          phase: "Transition",
          title: "Residential handoff",
          description:
            "Most clients continue into on-campus residential treatment with aftercare planning before discharge.",
          icon: "ri-route-line",
        },
      ],
    },
    clinical: {
      eyebrow: "Medical care",
      title: `Safe ${c.substance.toLowerCase()} withdrawal`,
      paragraphs: [
        c.withdrawalNote,
        c.matNote ??
          "Comfort medications and clinical monitoring reduce complication risk compared with detoxing alone.",
      ],
      highlights: [
        {
          title: "Vital signs",
          description: "Continuous monitoring for dangerous changes during withdrawal.",
          icon: "ri-pulse-line",
        },
        {
          title: "Medications",
          description: "Evidence-based support tailored to your substance and health.",
          icon: "ri-capsule-line",
        },
        {
          title: "Dual diagnosis",
          description: "Mental health symptoms assessed and treated alongside detox.",
          icon: "ri-mental-health-line",
        },
        {
          title: "Emergency-ready",
          description: "Physician oversight with protocols for severe withdrawal.",
          icon: "ri-shield-check-line",
        },
      ],
      image: c.clinicalImage,
      imageAlt: `Clinical care during ${c.substance.toLowerCase()} detox`,
    },
    benefits: {
      eyebrow: "Benefits",
      title: "Why choose medical detox",
      items: [
        {
          title: "Safety",
          description: "Reduce risk of severe withdrawal complications with 24/7 care.",
          icon: "ri-shield-check-line",
        },
        {
          title: "Comfort",
          description: "Medications and support ease symptoms when clinically appropriate.",
          icon: "ri-heart-line",
        },
        {
          title: "Higher completion",
          description: "Medical detox improves the likelihood you enter residential treatment.",
          icon: "ri-line-chart-line",
        },
        {
          title: "Insurance help",
          description: "Benefits verified before admission.",
          icon: "ri-shield-line",
        },
      ],
    },
    amenities: {
      eyebrow: "Environment",
      title: "Detox on a calm campus",
      description: "Private rooms and peaceful common areas in Mission Viejo.",
      image: c.amenitiesImage,
      imageAlt: "Sullivan Recovery campus",
      items: [
        { title: "Private rooms", description: "Rest between clinical checks.", icon: "ri-hotel-bed-line" },
        { title: "24/7 nursing", description: "Staff available around the clock.", icon: "ri-nurse-line" },
        { title: "Keep your phone", description: "Stay connected to supports.", icon: "ri-smartphone-line" },
        { title: "Meals provided", description: "Nutrition supporting physical recovery.", icon: "ri-restaurant-line" },
      ],
    },
    gallery: {
      eyebrow: "Campus",
      title: "Sullivan Recovery",
      images: c.gallery.map((src, i) => ({
        src,
        alt: `Sullivan Recovery facility view ${i + 1}`,
        caption: i === 0 ? "Mission Viejo" : undefined,
      })),
    },
    location: {
      eyebrow: "Orange County",
      title: `${c.substance} detox near Mission Viejo`,
      description:
        "Serving families across Orange County with confidential, physician-led detox and residential care on one campus.",
      bullets: ["Mission Viejo campus", "Same-day admission often available", "Insurance verification"],
      image: OC_LOCATION_IMAGE,
      imageAlt: "Orange County",
      href: "/service-area/",
    },
    relatedPrograms: relatedProgramsExcept(c.canonical, "Continue your recovery"),
    faqs: [
      {
        question: `How long does ${c.substance.toLowerCase()} detox take?`,
        answer:
          "Timeline varies by use history and health. We provide a realistic range after your assessment — not a generic estimate.",
      },
      {
        question: "Can I get admitted today?",
        answer:
          "Often yes, after a confidential phone assessment and insurance check when clinically appropriate.",
      },
      {
        question: "What happens after detox?",
        answer:
          "Most clients transition to residential treatment on the same campus with therapy and aftercare planning.",
      },
      {
        question: "Does insurance cover detox?",
        answer:
          "Many plans cover medical detox. Use our verify insurance form or call admissions for a benefits review.",
      },
    ],
    cta: {
      title: `Start ${c.substance.toLowerCase()} detox safely`,
      description:
        "Call admissions 24/7 or verify insurance — confidential help for withdrawal and next steps.",
    },
  };
}

const f = programImage;

const alcohol = buildDetoxSubpage({
  canonical: "/programs/detox/alcohol/",
  current: "Alcohol detox",
  substance: "Alcohol",
  eyebrow: "Alcohol detox · Orange County",
  title: "Medically supervised",
  titleAccent: "alcohol detox",
  description:
    "Safe alcohol withdrawal with 24/7 monitoring — reducing risk of seizures and delirium tremens while preparing you for residential care.",
  heroImage: f("sr_facility_2.png"),
  heroAlt: "Alcohol detox at Sullivan Recovery Mission Viejo",
  storyImage: f("sr_facility_3.png"),
  stepImage: f("sr_facility_4.png"),
  clinicalImage: f("sr_facility_5.png"),
  amenitiesImage: f("sr_facility_6.png"),
  gallery: [f("sr_facility_7.png"), f("sr_facility_8.png"), f("sr_facility_9.png")],
  icon: "ri-goblet-line",
  withdrawalNote:
    "Alcohol withdrawal can be medically serious — tremors, anxiety, elevated heart rate, and in severe cases delirium tremens require supervised care.",
  matNote: "CIWA-guided monitoring and medication support for alcohol withdrawal symptoms.",
});

const fentanyl = buildDetoxSubpage({
  canonical: "/programs/detox/fentanyl/",
  current: "Fentanyl detox",
  substance: "Fentanyl",
  eyebrow: "Fentanyl detox · Orange County",
  title: "Supervised",
  titleAccent: "fentanyl detox",
  description:
    "Physician-led detox for fentanyl and synthetic opioids with close nursing oversight and medication-assisted treatment when appropriate.",
  heroImage: f("sr_facility_3.png"),
  heroAlt: "Fentanyl detox program at Sullivan Recovery",
  storyImage: f("sr_facility_4.png"),
  stepImage: f("sr_facility_5.png"),
  clinicalImage: f("sr_facility_6.png"),
  amenitiesImage: f("sr_facility_7.png"),
  gallery: [f("sr_facility_8.png"), f("sr_facility_9.png"), f("sr_facility_1.png")],
  icon: "ri-capsule-line",
  withdrawalNote:
    "Fentanyl is highly potent — withdrawal can be intense and requires close medical monitoring and often medication-assisted treatment.",
  matNote: "Buprenorphine and supportive medications may be used under physician supervision.",
});

const opioids = buildDetoxSubpage({
  canonical: "/programs/detox/opioids/",
  current: "Opioid detox",
  substance: "Opioid",
  eyebrow: "Opioid detox · Orange County",
  title: "Medical",
  titleAccent: "opioid detox",
  description:
    "Detox for heroin and prescription opioids with MAT options, 24/7 nursing, and a direct path to residential treatment in Mission Viejo.",
  heroImage: f("sr_facility_4.png"),
  heroAlt: "Opioid detox at Sullivan Recovery",
  storyImage: f("sr_facility_5.png"),
  stepImage: f("sr_facility_6.png"),
  clinicalImage: f("sr_facility_7.png"),
  amenitiesImage: f("sr_facility_8.png"),
  gallery: [f("sr_facility_9.png"), f("sr_facility_1.png"), f("sr_facility_2.png")],
  icon: "ri-heart-pulse-line",
  withdrawalNote:
    "Opioid withdrawal is intensely uncomfortable — medical support and MAT improve safety and completion rates.",
  matNote: "Medication-assisted treatment to stabilize opioid withdrawal.",
});

const cocaine = buildDetoxSubpage({
  canonical: "/programs/detox/cocaine/",
  current: "Cocaine detox",
  substance: "Cocaine",
  eyebrow: "Cocaine detox · Orange County",
  title: "Stabilization for",
  titleAccent: "cocaine withdrawal",
  description:
    "Medical oversight for cocaine withdrawal — addressing cravings, sleep disruption, mood changes, and preparing you for therapy-led residential care.",
  heroImage: f("sr_facility_6.png"),
  heroAlt: "Cocaine detox support at Sullivan Recovery",
  storyImage: f("sr_facility_7.png"),
  stepImage: f("sr_facility_8.png"),
  clinicalImage: f("sr_facility_9.png"),
  amenitiesImage: f("sr_facility_1.png"),
  gallery: [f("sr_facility_2.png"), f("sr_facility_3.png"), f("sr_facility_4.png")],
  icon: "ri-flashlight-line",
  withdrawalNote:
    "Cocaine withdrawal is primarily psychological — depression, fatigue, and cravings benefit from structured support and therapy.",
});

const benzodiazepines = buildDetoxSubpage({
  canonical: "/programs/detox/benzodiazepines/",
  current: "Benzodiazepine detox",
  substance: "Benzodiazepine",
  eyebrow: "Benzo detox · Orange County",
  title: "Supervised benzodiazepine",
  titleAccent: "taper",
  description:
    "Gradual benzodiazepine taper under 24/7 medical care — lowering seizure and rebound anxiety risk during withdrawal.",
  heroImage: f("sr_facility_8.png"),
  heroAlt: "Benzodiazepine detox at Sullivan Recovery",
  storyImage: f("sr_facility_9.png"),
  stepImage: f("sr_facility_1.png"),
  clinicalImage: f("sr_facility_2.png"),
  amenitiesImage: f("sr_facility_3.png"),
  gallery: [f("sr_facility_4.png"), f("sr_facility_5.png"), f("sr_facility_6.png")],
  icon: "ri-first-aid-kit-line",
  withdrawalNote:
    "Stopping benzodiazepines abruptly can cause seizures — supervised tapers are the safest approach.",
  matNote: "Physician-designed taper schedules with continuous monitoring.",
});

const meth = buildDetoxSubpage({
  canonical: "/programs/detox/meth/",
  current: "Meth detox",
  substance: "Methamphetamine",
  eyebrow: "Meth detox · Orange County",
  title: "Medical support for",
  titleAccent: "meth withdrawal",
  description:
    "Detox and stabilization for methamphetamine — monitoring fatigue, agitation, depression, and cravings with therapy-ready residential care next.",
  heroImage: f("sr_facility_9.png"),
  heroAlt: "Meth detox at Sullivan Recovery",
  storyImage: f("sr_facility_1.png"),
  stepImage: f("sr_facility_2.png"),
  clinicalImage: f("sr_facility_3.png"),
  amenitiesImage: f("sr_facility_4.png"),
  gallery: [f("sr_facility_5.png"), f("sr_facility_6.png"), f("sr_facility_7.png")],
  icon: "ri-fire-line",
  withdrawalNote:
    "Meth withdrawal often includes exhaustion, depression, and agitation — medical monitoring and behavioral support reduce risk during early recovery.",
});

const suboxone = buildDetoxSubpage({
  canonical: "/programs/detox/suboxone/",
  current: "Suboxone detox",
  substance: "Suboxone",
  eyebrow: "Suboxone detox · Orange County",
  title: "Supervised Suboxone",
  titleAccent: "taper",
  description:
    "Physician-guided Suboxone (buprenorphine) taper with support for underlying opioid dependence and transition to residential care.",
  heroImage: f("sr_facility_1.png"),
  heroAlt: "Suboxone detox at Sullivan Recovery",
  storyImage: f("sr_facility_2.png"),
  stepImage: f("sr_facility_3.png"),
  clinicalImage: f("sr_facility_4.png"),
  amenitiesImage: f("sr_facility_5.png"),
  gallery: [f("sr_facility_6.png"), f("sr_facility_7.png"), f("sr_facility_8.png")],
  icon: "ri-medicine-bottle-line",
  withdrawalNote:
    "Discontinuing buprenorphine requires a planned taper — we supervise withdrawal and address underlying opioid use disorder.",
  matNote: "Coordinated taper with assessment for ongoing opioid treatment needs.",
});

const stimulants = buildDetoxSubpage({
  canonical: "/programs/detox/stimulants/",
  current: "Stimulant detox",
  substance: "Stimulant",
  eyebrow: "Stimulant detox · Orange County",
  title: "Medical oversight for",
  titleAccent: "stimulant withdrawal",
  description:
    "Detox for amphetamine-class stimulants with nursing support, mood monitoring, and preparation for residential therapy.",
  heroImage: f("sr_facility_5.png"),
  heroAlt: "Stimulant detox at Sullivan Recovery",
  storyImage: f("sr_facility_6.png"),
  stepImage: f("sr_facility_7.png"),
  clinicalImage: f("sr_facility_8.png"),
  amenitiesImage: f("sr_facility_9.png"),
  gallery: [f("sr_facility_1.png"), f("sr_facility_2.png"), f("sr_facility_3.png")],
  icon: "ri-flask-line",
  withdrawalNote:
    "Stimulant withdrawal can involve crash, depression, and sleep disruption — structured care supports stabilization.",
});

const orangeCounty = buildDetoxSubpage({
  canonical: "/programs/detox/orange-county/",
  current: "Orange County detox",
  substance: "Drug & alcohol",
  eyebrow: "Orange County · Medical detox",
  title: "Detox center in",
  titleAccent: "Orange County",
  description:
    "Physician-led drug and alcohol detox in Mission Viejo — serving Irvine, Newport Beach, Lake Forest, Laguna Beach, and all of OC.",
  heroImage: f("sr_facility_7.png"),
  heroAlt: "Orange County detox at Sullivan Recovery Mission Viejo",
  storyImage: f("sr_facility_8.png"),
  stepImage: f("sr_facility_9.png"),
  clinicalImage: f("sr_facility_1.png"),
  amenitiesImage: f("sr_facility_2.png"),
  gallery: [f("sr_facility_3.png"), f("sr_facility_4.png"), f("sr_facility_5.png")],
  icon: "ri-map-pin-2-line",
  withdrawalNote:
    "Orange County families choose Sullivan Recovery for local, confidential detox without sending loved ones out of state.",
});

const drugs = buildDetoxSubpage({
  canonical: "/programs/detox/drugs/",
  current: "Drug & alcohol detox",
  substance: "Drug & alcohol",
  eyebrow: "Mission Viejo · Medical detox",
  title: "Drug & alcohol detox in",
  titleAccent: "Mission Viejo",
  description:
    "Comprehensive medical detox for substance use — alcohol, opioids, stimulants, and polysubstance cases with 24/7 clinical care.",
  heroImage: f("sr_facility_6.png"),
  heroAlt: "Drug and alcohol detox Mission Viejo",
  storyImage: f("sr_facility_7.png"),
  stepImage: f("sr_facility_8.png"),
  clinicalImage: f("sr_facility_9.png"),
  amenitiesImage: f("sr_facility_1.png"),
  gallery: [f("sr_facility_2.png"), f("sr_facility_3.png"), f("sr_facility_4.png")],
  icon: "ri-capsule-line",
  withdrawalNote:
    "Polysubstance use is common — we build integrated detox plans that account for overlapping withdrawal risks.",
});

export const alcoholDetoxProgramPage = alcohol;
export const fentanylDetoxProgramPage = fentanyl;
export const opioidsDetoxProgramPage = opioids;
export const cocaineDetoxProgramPage = cocaine;
export const benzodiazepinesDetoxProgramPage = benzodiazepines;
export const methDetoxProgramPage = meth;
export const suboxoneDetoxProgramPage = suboxone;
export const stimulantsDetoxProgramPage = stimulants;
export const orangeCountyDetoxProgramPage = orangeCounty;
export const drugsDetoxProgramPage = drugs;
