import type { ProgramPageData } from "@/types/programPage";
import {
  DEFAULT_STORY_LINK,
  DEFAULT_TRUST,
  OC_LOCATION_IMAGE,
  programImage,
  programsBreadcrumb,
  relatedProgramsExcept,
} from "./shared";

export const wellbrietyProgramPage: ProgramPageData = {
  canonical: "/programs/wellbriety/",
  breadcrumb: programsBreadcrumb("Wellbriety program"),
  hero: {
    eyebrow: "Culturally grounded recovery",
    title: "Wellbriety pathways at",
    titleAccent: "Sullivan Recovery",
    description:
      "Recovery programming that honors Indigenous Wellbriety principles — integrated with clinical detox, residential care, and therapies on our Mission Viejo campus.",
    image: programImage("sr_facility_5.png"),
    imageAlt: "Peaceful space for Wellbriety programming at Sullivan Recovery",
    stats: [
      { value: "Culture", label: "Centered care" },
      { value: "Community", label: "Connection" },
      { value: "Clinical", label: "Medical support" },
      { value: "Holistic", label: "Whole-person healing" },
    ],
  },
  trust: DEFAULT_TRUST,
  story: {
    eyebrow: "Wellbriety",
    title: "Healing aligned with",
    titleAccent: "culture & community",
    paragraphs: [
      "Wellbriety emphasizes wellness, cultural identity, and community in recovery. At Sullivan Recovery, Wellbriety principles complement physician-led detox and evidence-based therapy.",
      "Clients connect cultural strengths with clinical tools for sobriety — not choosing one over the other.",
    ],
    bullets: [
      "Wellbriety-informed groups & activities",
      "Integrated with medical detox",
      "Residential and therapy support",
      "Community and elder connection when available",
    ],
    image: programImage("sr_facility_1.png"),
    imageAlt: "Outdoor courtyard for reflection and community",
    link: DEFAULT_STORY_LINK,
  },
  stats: [
    { value: "Whole", label: "Person wellness focus" },
    { value: "Culture", label: "Honoring identity" },
    { value: "Clinical", label: "Medical detox available" },
    { value: "OC", label: "Mission Viejo campus" },
  ],
  differentiators: {
    eyebrow: "Our approach",
    title: "Wellbriety plus",
    titleAccent: "clinical care",
    items: [
      {
        title: "Culture-centered recovery",
        description:
          "Programming that respects Indigenous values, storytelling, and community — alongside medical and therapeutic care.",
        icon: "ri-ancient-gate-line",
        featured: true,
      },
      {
        title: "Not either/or",
        description: "Wellbriety complements CBT, DBT, groups, and medical detox — integrated by your care team.",
        icon: "ri-links-line",
      },
      {
        title: "Community connection",
        description: "Peer support and cultural activities that reduce isolation in early recovery.",
        icon: "ri-community-line",
      },
      {
        title: "Holistic wellness",
        description: "Mind, body, spirit, and relationship health treated as interconnected.",
        icon: "ri-leaf-line",
      },
      {
        title: "Safe medical detox",
        description: "Physician-led detox available before or alongside Wellbriety programming.",
        icon: "ri-heart-pulse-line",
      },
    ],
  },
  process: {
    eyebrow: "Programming",
    title: "How Wellbriety fits",
    titleAccent: "your stay",
    description:
      "Wellbriety activities weave into detox and residential schedules based on your readiness and cultural preferences.",
    steps: [
      {
        num: "01",
        phase: "Welcome",
        title: "Cultural assessment & preferences",
        description:
          "We learn what cultural practices and community connections matter to your recovery.",
        icon: "ri-chat-heart-line",
        image: programImage("sr_facility_8.png"),
        imageAlt: "Community space at Sullivan Recovery",
      },
      {
        num: "02",
        phase: "Integration",
        title: "Wellbriety groups & circles",
        description:
          "Facilitated discussions and activities grounded in Wellbriety principles.",
        icon: "ri-group-line",
      },
      {
        num: "03",
        phase: "Clinical",
        title: "Therapy & medical care",
        description:
          "Evidence-based therapy and nursing support continue alongside cultural programming.",
        icon: "ri-mental-health-line",
      },
      {
        num: "04",
        phase: "Community",
        title: "Aftercare & cultural supports",
        description:
          "Referrals to Wellbriety meetings, elders, and community resources near home.",
        icon: "ri-route-line",
      },
    ],
  },
  benefits: {
    eyebrow: "Benefits",
    title: "Why Wellbriety-informed care matters",
    items: [
      { title: "Cultural identity", description: "Recovery that honors who you are — not only symptom reduction.", icon: "ri-ancient-gate-line" },
      { title: "Community", description: "Connection reduces shame and isolation in early sobriety.", icon: "ri-community-line" },
      { title: "Holistic view", description: "Wellness across physical, mental, spiritual, and relational health.", icon: "ri-leaf-line" },
      { title: "Clinical safety", description: "Medical detox and therapy available on the same campus.", icon: "ri-shield-check-line" },
      { title: "Peer support", description: "Shared cultural experience in facilitated groups.", icon: "ri-team-line" },
      { title: "Lasting tools", description: "Principles you carry into aftercare and home community.", icon: "ri-book-open-line" },
    ],
  },
  amenities: {
    eyebrow: "Spaces",
    title: "Room for reflection & gathering",
    description: "Courtyards, lounges, and group rooms support both clinical and cultural programming.",
    image: programImage("sr_detox_campus01.jpg"),
    imageAlt: "Campus courtyard for Wellbriety gatherings",
    items: [
      { title: "Outdoor courtyards", description: "Space for reflection and cultural activities.", icon: "ri-plant-line" },
      { title: "Group rooms", description: "Circles and facilitated discussions.", icon: "ri-group-line" },
      { title: "Private rooms", description: "Rest and personal space during residential care.", icon: "ri-hotel-bed-line" },
      { title: "Holistic offerings", description: "Surf, music, and mindfulness alongside Wellbriety.", icon: "ri-music-2-line" },
      { title: "Family involvement", description: "Education for loved ones when appropriate.", icon: "ri-parent-line" },
      { title: "Alumni connection", description: "Continued community after discharge.", icon: "ri-loop-left-line" },
    ],
  },
  gallery: {
    eyebrow: "Campus",
    title: "Spaces for whole-person healing",
    images: [
      { src: programImage("sr_facility_9.png"), alt: "Facility exterior", caption: "Mission Viejo" },
      { src: programImage("sr_facility_2.png"), alt: "Living room", caption: "Residential comfort" },
      { src: programImage("sr_facility_3.png"), alt: "Interior space", caption: "Calm environment" },
    ],
  },
  location: {
    eyebrow: "Orange County",
    title: "Wellbriety-informed care in OC",
    description:
      "Sullivan Recovery welcomes clients seeking culturally grounded recovery with physician-led medical care in Orange County.",
    bullets: ["Mission Viejo campus", "Integrated clinical team", "Regional aftercare referrals"],
    image: OC_LOCATION_IMAGE,
    imageAlt: "Orange County",
    href: "/service-area/",
  },
  relatedPrograms: relatedProgramsExcept("/programs/wellbriety/"),
  faqs: [
    {
      question: "Do I need to identify as Indigenous to participate?",
      answer:
        "Wellbriety programming is open to clients who value culturally grounded recovery. Admissions can discuss fit during your assessment.",
    },
    {
      question: "Is Wellbriety separate from medical care?",
      answer:
        "No. It integrates with detox, nursing, and licensed therapy — your team coordinates all parts of your plan.",
    },
    {
      question: "Can I start with detox?",
      answer:
        "Yes. Medical detox is available on campus before or alongside Wellbriety activities when clinically appropriate.",
    },
    {
      question: "What happens after residential care?",
      answer:
        "Aftercare planning includes Wellbriety meetings and community resources near your home when available.",
    },
  ],
  cta: {
    title: "Interested in Wellbriety-informed care?",
    description:
      "Call admissions to learn how cultural programming integrates with detox, residential treatment, and insurance coverage.",
  },
};
