import type { ProgramPageData } from "@/types/programPage";
import {
  DEFAULT_STORY_LINK,
  DEFAULT_TRUST,
  OC_LOCATION_IMAGE,
  programImage,
  programsBreadcrumb,
  relatedProgramsExcept,
} from "./shared";

export const aftercareProgramPage: ProgramPageData = {
  canonical: "/programs/aftercare/",
  breadcrumb: programsBreadcrumb("Aftercare programs"),
  hero: {
    eyebrow: "Aftercare · Alumni support",
    title: "Recovery that continues",
    titleAccent: "after treatment",
    description:
      "Discharge planning, alumni connection, and practical resources so the progress you made in detox and residential care lasts in everyday life.",
    image: programImage("sr_prog_aftercare.jpg"),
    imageAlt: "Supportive recovery community at Sullivan Recovery",
    stats: [
      { value: "Alumni", label: "Ongoing connection" },
      { value: "Plans", label: "Written at discharge" },
      { value: "Resources", label: "Meetings & referrals" },
      { value: "OC", label: "Local support network" },
    ],
  },
  trust: DEFAULT_TRUST,
  story: {
    eyebrow: "Life after residential",
    title: "Aftercare is not an",
    titleAccent: "afterthought",
    paragraphs: [
      "Leaving residential care is a milestone — and a risk point. Sullivan Recovery builds aftercare plans while you are still on campus, with referrals, family guidance, and alumni touchpoints.",
      "You leave with appointments, coping strategies, and a community that understands early recovery.",
    ],
    bullets: [
      "Written discharge and aftercare plan",
      "Outpatient and meeting referrals",
      "Alumni events and check-ins",
      "Family education and support",
    ],
    image: programImage("sr_facility_8.png"),
    imageAlt: "Outdoor gathering space at Sullivan Recovery",
    link: DEFAULT_STORY_LINK,
  },
  stats: [
    { value: "100%", label: "Clients receive discharge planning" },
    { value: "Local", label: "OC meeting & provider referrals" },
    { value: "Alumni", label: "Community connection" },
    { value: "24/7", label: "Admissions always available" },
  ],
  differentiators: {
    eyebrow: "Our aftercare approach",
    title: "Support that bridges",
    titleAccent: "treatment and life",
    items: [
      {
        title: "Planning starts in residential",
        description:
          "Aftercare is built throughout your stay — not rushed on the last day.",
        icon: "ri-calendar-check-line",
        featured: true,
      },
      {
        title: "Alumni community",
        description: "Stay connected to peers and staff who know your story.",
        icon: "ri-group-line",
      },
      {
        title: "Practical referrals",
        description: "Outpatient therapists, psychiatrists, and meetings in your area.",
        icon: "ri-map-pin-line",
      },
      {
        title: "Family included",
        description: "Loved ones receive guidance on supporting sobriety at home.",
        icon: "ri-parent-line",
      },
      {
        title: "Relapse prevention focus",
        description: "Triggers, coping plans, and crisis steps documented before discharge.",
        icon: "ri-shield-check-line",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "Your aftercare",
    titleAccent: "pathway",
    description:
      "Structured steps from discharge through the first months of independent recovery.",
    steps: [
      {
        num: "01",
        phase: "Planning",
        title: "Collaborative discharge plan",
        description:
          "You, your clinician, and family (when appropriate) define outpatient care, meetings, and wellness goals.",
        icon: "ri-file-edit-line",
        image: programImage("sr_facility_2.png"),
        imageAlt: "Clinician reviewing aftercare plan with client",
      },
      {
        num: "02",
        phase: "Referrals",
        title: "Local providers & meetings",
        description:
          "We connect you to therapists, psychiatrists, and recovery meetings near home or your next residence.",
        icon: "ri-links-line",
      },
      {
        num: "03",
        phase: "Alumni",
        title: "Ongoing community touchpoints",
        description:
          "Alumni events and check-ins help you stay accountable and supported after you leave campus.",
        icon: "ri-community-line",
      },
      {
        num: "04",
        phase: "Support",
        title: "When you need us again",
        description:
          "Admissions remains available if you need guidance, a higher level of care, or family resources.",
        icon: "ri-phone-line",
      },
    ],
  },
  benefits: {
    eyebrow: "Why aftercare matters",
    title: "Protect the investment in treatment",
    items: [
      {
        title: "Lower relapse risk",
        description: "Structured follow-up reduces the gap between inpatient care and daily life.",
        icon: "ri-line-chart-line",
      },
      {
        title: "Clear next steps",
        description: "Appointments and meetings scheduled before discharge — not left for later.",
        icon: "ri-calendar-line",
      },
      {
        title: "Peer accountability",
        description: "Alumni connection keeps you linked to people who understand early recovery.",
        icon: "ri-team-line",
      },
      {
        title: "Family alignment",
        description: "Loved ones know how to support boundaries and recovery routines.",
        icon: "ri-heart-line",
      },
      {
        title: "Local resources",
        description: "Orange County and regional referrals tailored to where you live next.",
        icon: "ri-map-pin-2-line",
      },
      {
        title: "Continuity",
        description: "The same organization that knows your history remains a call away.",
        icon: "ri-loop-left-line",
      },
    ],
  },
  amenities: {
    eyebrow: "Resources",
    title: "What alumni receive",
    description: "Practical tools and community — not just a list of phone numbers.",
    image: programImage("sr_facility_3.png"),
    imageAlt: "Comfortable lounge at Sullivan Recovery",
    items: [
      { title: "Discharge packet", description: "Written plan, contacts, and crisis steps.", icon: "ri-folder-line" },
      { title: "Meeting list", description: "Local AA, NA, and alternative meetings.", icon: "ri-map-pin-line" },
      { title: "Alumni events", description: "Campus and community gatherings.", icon: "ri-calendar-event-line" },
      { title: "Family resources", description: "Education for loved ones after discharge.", icon: "ri-parent-line" },
      { title: "Outpatient referrals", description: "Therapy and psychiatry handoffs.", icon: "ri-mental-health-line" },
      { title: "Admissions line", description: "24/7 access if needs change.", icon: "ri-phone-line" },
    ],
  },
  gallery: {
    eyebrow: "Community",
    title: "Connection beyond discharge",
    images: [
      { src: programImage("sr_facility_1.png"), alt: "Campus courtyard", caption: "Alumni gatherings" },
      { src: programImage("sr_facility_6.png"), alt: "Master bedroom suite", caption: "Campus home base" },
      { src: programImage("sr_facility_9.png"), alt: "Facility exterior", caption: "Mission Viejo" },
    ],
  },
  location: {
    eyebrow: "Orange County",
    title: "Aftercare rooted in Mission Viejo",
    description:
      "We specialize in Orange County referrals and alumni networks — with national outpatient coordination when you return home outside OC.",
    bullets: ["Local meeting directories", "OC outpatient providers", "Admissions support 24/7"],
    image: OC_LOCATION_IMAGE,
    imageAlt: "Orange County landscape",
    href: "/service-area/",
  },
  relatedPrograms: relatedProgramsExcept("/programs/aftercare/"),
  faqs: [
    {
      question: "When does aftercare planning start?",
      answer:
        "During residential treatment — your clinician revisits the plan weekly so discharge feels prepared, not abrupt.",
    },
    {
      question: "Is alumni participation required?",
      answer:
        "No, but we encourage it. Many clients find accountability and friendship through alumni events.",
    },
    {
      question: "Can you help if I relapse after discharge?",
      answer:
        "Yes. Call admissions anytime. We can reassess whether detox, residential, or outpatient is the right next step.",
    },
    {
      question: "Do you coordinate family therapy after discharge?",
      answer:
        "We refer to outpatient family therapists and provide education so support at home aligns with your recovery plan.",
    },
  ],
  cta: {
    title: "Planning your next chapter?",
    description:
      "Whether you are finishing residential care or supporting a loved one after discharge — call us to discuss aftercare resources.",
  },
};
