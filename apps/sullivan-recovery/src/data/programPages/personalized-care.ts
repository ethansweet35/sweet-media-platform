import type { ProgramPageData } from "@/types/programPage";
import {
  DEFAULT_STORY_LINK,
  DEFAULT_TRUST,
  OC_LOCATION_IMAGE,
  programImage,
  programsBreadcrumb,
  relatedProgramsExcept,
} from "./shared";

export const personalizedCareProgramPage: ProgramPageData = {
  canonical: "/programs/personalized-care/",
  breadcrumb: programsBreadcrumb("Personalized care"),
  hero: {
    eyebrow: "Dual diagnosis · Individualized plans",
    title: "Care tailored when addiction and",
    titleAccent: "mental health intersect",
    description:
      "Integrated treatment for co-occurring substance use and mental health conditions — one team, one campus, one plan built around your clinical picture.",
    image: programImage("sr_prog_dual.jpg"),
    imageAlt: "Personalized clinical care at Sullivan Recovery",
    stats: [
      { value: "Dual", label: "Diagnosis capable" },
      { value: "1 plan", label: "Integrated team" },
      { value: "24/7", label: "Medical support" },
      { value: "Licensed", label: "Clinical staff" },
    ],
  },
  trust: DEFAULT_TRUST,
  story: {
    eyebrow: "Individualized treatment",
    title: "Your plan — not a",
    titleAccent: "template",
    paragraphs: [
      "When anxiety, depression, PTSD, or other conditions overlap with substance use, treatment must address both. Sullivan Recovery coordinates physicians, nurses, and therapists on one integrated plan.",
      "Medications, therapy modalities, and length of stay adjust as your symptoms evolve.",
    ],
    bullets: [
      "Co-occurring disorder assessment",
      "Psychiatric medication management",
      "Trauma-informed therapy",
      "Coordinated detox and residential care",
    ],
    image: programImage("sr_facility_6.png"),
    imageAlt: "Clinical consultation at Sullivan Recovery",
    link: DEFAULT_STORY_LINK,
  },
  stats: [
    { value: "Dual", label: "Diagnosis integration" },
    { value: "24/7", label: "Nursing & medical" },
    { value: "1 team", label: "Shared treatment plan" },
    { value: "OC", label: "Mission Viejo campus" },
  ],
  differentiators: {
    eyebrow: "Integrated care",
    title: "One team for",
    titleAccent: "both diagnoses",
    items: [
      {
        title: "Unified treatment plan",
        description:
          "Physicians and therapists share one chart — no split systems for addiction vs. mental health.",
        icon: "ri-file-list-3-line",
        featured: true,
      },
      {
        title: "Psychiatric support",
        description: "Medication evaluation and monitoring for mood, anxiety, and related conditions.",
        icon: "ri-capsule-line",
      },
      {
        title: "Trauma-informed therapy",
        description: "Care that recognizes trauma without overwhelming early stabilization.",
        icon: "ri-heart-line",
      },
      {
        title: "Safe detox",
        description: "Medical oversight when psychiatric medications and substances interact.",
        icon: "ri-shield-check-line",
      },
      {
        title: "Family education",
        description: "Help loved ones understand dual diagnosis and support recovery.",
        icon: "ri-parent-line",
      },
    ],
  },
  process: {
    eyebrow: "Your pathway",
    title: "How personalized care",
    titleAccent: "unfolds",
    description:
      "Assessment drives every decision — from detox medications to therapy frequency and discharge planning.",
    steps: [
      {
        num: "01",
        phase: "Assessment",
        title: "Dual diagnosis evaluation",
        description:
          "We screen for depression, anxiety, PTSD, bipolar symptoms, and other conditions alongside substance use.",
        icon: "ri-file-search-line",
        image: programImage("sr_detox_medical01.jpg"),
        imageAlt: "Medical assessment for dual diagnosis care",
      },
      {
        num: "02",
        phase: "Stabilization",
        title: "Coordinated detox & meds",
        description:
          "Physicians manage withdrawal and psychiatric medications together — watching interactions closely.",
        icon: "ri-heart-pulse-line",
      },
      {
        num: "03",
        phase: "Therapy",
        title: "Targeted modalities",
        description:
          "CBT, DBT, trauma-informed work, and groups chosen for your diagnoses and goals.",
        icon: "ri-mental-health-line",
      },
      {
        num: "04",
        phase: "Transition",
        title: "Outpatient psychiatric care",
        description:
          "Referrals to therapists and psychiatrists who continue dual diagnosis treatment after discharge.",
        icon: "ri-route-line",
      },
    ],
  },
  clinical: {
    eyebrow: "Clinical integration",
    title: "Dual diagnosis expertise",
    paragraphs: [
      "Substance use can mask or worsen mental health symptoms — and vice versa. Integrated care treats both simultaneously.",
      "Our team watches for medication interactions, suicide risk, and symptom spikes during withdrawal.",
    ],
    highlights: [
      { title: "Psychiatric meds", description: "Evaluation and monitoring during detox and residential.", icon: "ri-capsule-line" },
      { title: "Safety planning", description: "Protocols for crisis symptoms and elevated risk.", icon: "ri-shield-check-line" },
      { title: "Trauma care", description: "Paced trauma work appropriate to stabilization level.", icon: "ri-heart-line" },
      { title: "Therapy match", description: "Modalities selected for your diagnoses and history.", icon: "ri-mental-health-line" },
    ],
    image: programImage("sr_facility_7.png"),
    imageAlt: "Exterior of Sullivan Recovery campus",
  },
  benefits: {
    eyebrow: "Why integrated care",
    title: "Benefits of personalized dual diagnosis treatment",
    items: [
      { title: "Better outcomes", description: "Treating only addiction or only mental health often fails — integration matters.", icon: "ri-line-chart-line" },
      { title: "Medication clarity", description: "Physicians manage psych meds and detox protocols together.", icon: "ri-capsule-line" },
      { title: "Reduced relapse", description: "Untreated depression or anxiety frequently drives return to use.", icon: "ri-shield-line" },
      { title: "Trauma aware", description: "Therapists trained to work with trauma without destabilizing early recovery.", icon: "ri-heart-line" },
      { title: "Family insight", description: "Education helps families support both diagnoses at home.", icon: "ri-parent-line" },
      { title: "Continuum", description: "Detox, residential, and aftercare referrals stay coordinated.", icon: "ri-route-line" },
    ],
  },
  location: {
    eyebrow: "Orange County",
    title: "Dual diagnosis treatment in Mission Viejo",
    description:
      "Serving Orange County families who need integrated addiction and mental health care on one confidential campus.",
    bullets: ["Physician-led detox", "Residential dual diagnosis care", "OC outpatient referrals"],
    image: OC_LOCATION_IMAGE,
    imageAlt: "Orange County",
    href: "/service-area/",
  },
  relatedPrograms: relatedProgramsExcept("/programs/personalized-care/"),
  faqs: [
    {
      question: "What is dual diagnosis?",
      answer:
        "When a person has both a substance use disorder and a mental health condition — such as depression, anxiety, or PTSD — that benefit from integrated treatment.",
    },
    {
      question: "Can I stay on psychiatric medications during detox?",
      answer:
        "Often yes, with physician oversight. We review all medications at admission and adjust safely during withdrawal.",
    },
    {
      question: "Is trauma therapy available?",
      answer:
        "Yes, with trauma-informed pacing. Intensive trauma work may continue outpatient after stabilization.",
    },
    {
      question: "How is my plan different from other clients?",
      answer:
        "Frequency of therapy, group topics, medications, and length of stay are tailored — not a one-size residential track.",
    },
  ],
  cta: {
    title: "Need integrated dual diagnosis care?",
    description:
      "Call admissions to discuss symptoms, medications, and whether detox and residential care fit your situation.",
  },
};
