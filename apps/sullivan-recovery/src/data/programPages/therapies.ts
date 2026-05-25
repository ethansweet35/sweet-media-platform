import type { ProgramPageData } from "@/types/programPage";
import {
  DEFAULT_STORY_LINK,
  DEFAULT_TRUST,
  OC_LOCATION_IMAGE,
  programImage,
  programsBreadcrumb,
  relatedProgramsExcept,
} from "./shared";

export const therapiesProgramPage: ProgramPageData = {
  canonical: "/programs/therapies/",
  breadcrumb: programsBreadcrumb("Addiction therapies"),
  hero: {
    eyebrow: "Clinical therapies",
    title: "Evidence-based therapy for",
    titleAccent: "lasting recovery",
    description:
      "CBT, DBT, motivational interviewing, and group therapy led by licensed addiction clinicians — integrated through detox, residential, and aftercare.",
    image: programImage("sr_prog_therapy.jpg"),
    imageAlt: "Therapy session at Sullivan Recovery",
    stats: [
      { value: "CBT", label: "Cognitive behavioral" },
      { value: "DBT", label: "Skills & regulation" },
      { value: "Group", label: "Peer processing" },
      { value: "Family", label: "Sessions available" },
    ],
  },
  trust: DEFAULT_TRUST,
  story: {
    eyebrow: "Therapeutic care",
    title: "Therapy that targets",
    titleAccent: "root causes",
    paragraphs: [
      "Substance use often connects to trauma, anxiety, depression, and unhealthy thought patterns. Our therapists use proven modalities to build coping skills and relapse prevention strategies.",
      "Therapy begins during detox when appropriate and intensifies throughout residential care.",
    ],
    bullets: [
      "Licensed addiction clinicians",
      "CBT, DBT, and MET",
      "Individual and group therapy",
      "Family therapy available",
    ],
    image: programImage("sr_detox_therapy01.jpg"),
    imageAlt: "Group therapy room at Sullivan Recovery",
    link: DEFAULT_STORY_LINK,
  },
  stats: [
    { value: "Daily", label: "Group sessions in residential" },
    { value: "1:1", label: "Individual therapy" },
    { value: "Family", label: "Sessions when appropriate" },
    { value: "Licensed", label: "Clinical team" },
  ],
  differentiators: {
    eyebrow: "Modalities",
    title: "Therapies matched to",
    titleAccent: "your needs",
    items: [
      {
        title: "Cognitive Behavioral Therapy (CBT)",
        description:
          "Identify thought patterns that drive use and replace them with practical coping skills.",
        icon: "ri-brain-line",
        featured: true,
      },
      {
        title: "Dialectical Behavior Therapy (DBT)",
        description: "Build emotional regulation, distress tolerance, and interpersonal skills.",
        icon: "ri-mental-health-line",
      },
      {
        title: "Motivational Enhancement",
        description: "Strengthen internal motivation and commitment to change.",
        icon: "ri-chat-smile-3-line",
      },
      {
        title: "Group therapy",
        description: "Peer support and accountability in facilitated groups.",
        icon: "ri-group-line",
      },
      {
        title: "Family therapy",
        description: "Repair communication and set healthy boundaries with loved ones.",
        icon: "ri-parent-line",
      },
    ],
  },
  process: {
    eyebrow: "Therapy timeline",
    title: "How therapy fits",
    titleAccent: "your stay",
    description:
      "Therapeutic intensity scales with your clinical stability — from introduction during detox to daily work in residential.",
    steps: [
      {
        num: "01",
        phase: "Detox",
        title: "Therapeutic introduction",
        description:
          "When stable, clinicians begin coping skills work and motivational conversations.",
        icon: "ri-heart-pulse-line",
        image: programImage("sr_facility_2.png"),
        imageAlt: "Therapy space at Sullivan Recovery",
      },
      {
        num: "02",
        phase: "Residential",
        title: "Daily individual & group",
        description:
          "Structured schedule of CBT/DBT groups and weekly individual sessions.",
        icon: "ri-calendar-line",
      },
      {
        num: "03",
        phase: "Family",
        title: "Family sessions",
        description:
          "Guided conversations with loved ones to rebuild trust and support recovery at home.",
        icon: "ri-parent-line",
      },
      {
        num: "04",
        phase: "Aftercare",
        title: "Outpatient handoff",
        description:
          "Referrals to therapists who continue your modality after discharge.",
        icon: "ri-route-line",
      },
    ],
  },
  clinical: {
    eyebrow: "Clinical team",
    title: "Licensed clinicians, integrated care",
    paragraphs: [
      "Therapists coordinate with physicians and nursing on medications, mental health symptoms, and safety.",
      "Dual diagnosis clients receive therapy that addresses both substance use and mood or anxiety disorders.",
    ],
    highlights: [
      { title: "CBT", description: "Thought restructuring and behavioral activation.", icon: "ri-brain-line" },
      { title: "DBT", description: "Skills for emotion regulation and relationships.", icon: "ri-mental-health-line" },
      { title: "Trauma-informed", description: "Care that recognizes past trauma without re-traumatizing.", icon: "ri-heart-line" },
      { title: "Relapse prevention", description: "Plans for triggers, cravings, and high-risk situations.", icon: "ri-shield-check-line" },
    ],
    image: programImage("sr_facility_3.png"),
    imageAlt: "Comfortable therapy environment",
  },
  benefits: {
    eyebrow: "Outcomes",
    title: "Why therapy-centered treatment works",
    items: [
      { title: "Skill-based", description: "Tools you can use after discharge — not insight alone.", icon: "ri-tools-line" },
      { title: "Peer learning", description: "Groups normalize struggle and model recovery.", icon: "ri-group-line" },
      { title: "Family healing", description: "Improved communication reduces relapse pressure at home.", icon: "ri-home-heart-line" },
      { title: "Dual diagnosis", description: "Mental health and addiction addressed together.", icon: "ri-brain-line" },
      { title: "Motivation", description: "MET strengthens commitment through early ambivalence.", icon: "ri-chat-smile-3-line" },
      { title: "Continuity", description: "Same clinicians know your story from detox through residential.", icon: "ri-loop-left-line" },
    ],
  },
  gallery: {
    eyebrow: "Spaces",
    title: "Where therapy happens",
    images: [
      { src: programImage("sr_detox_lounge01.jpg"), alt: "Sunlit lounge", caption: "Group spaces" },
      { src: programImage("sr_facility_4.png"), alt: "Private room", caption: "Individual sessions" },
      { src: programImage("sr_facility_5.png"), alt: "Residential suite", caption: "Campus setting" },
    ],
  },
  location: {
    eyebrow: "Orange County",
    title: "Therapy-led treatment in Mission Viejo",
    description:
      "All modalities are delivered on our Orange County campus — integrated with detox and residential on one site.",
    bullets: ["On-campus therapy suites", "Detox through residential", "OC outpatient referrals at discharge"],
    image: OC_LOCATION_IMAGE,
    imageAlt: "Orange County",
    href: "/service-area/",
  },
  relatedPrograms: relatedProgramsExcept("/programs/therapies/"),
  faqs: [
    {
      question: "Which therapy will I receive?",
      answer:
        "Your clinician selects CBT, DBT, MET, and group formats based on assessment — often combining more than one modality.",
    },
    {
      question: "Is family therapy mandatory?",
      answer:
        "No. Family sessions are offered when clinically helpful and when family members are willing to participate.",
    },
    {
      question: "Can therapy start during detox?",
      answer:
        "Yes, at an appropriate pace. Early sessions focus on stabilization, coping, and motivation.",
    },
    {
      question: "Do you treat trauma?",
      answer:
        "Yes, with trauma-informed approaches. Intensive trauma processing may continue in outpatient care after discharge.",
    },
  ],
  cta: {
    title: "Questions about our therapy approach?",
    description: "Speak with admissions — we will explain how therapies fit detox, residential, and your insurance coverage.",
  },
};
