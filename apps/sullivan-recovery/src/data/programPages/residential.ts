import type { ProgramPageData } from "@/types/programPage";
import {
  DEFAULT_STORY_LINK,
  DEFAULT_TRUST,
  OC_LOCATION_IMAGE,
  programImage,
  programsBreadcrumb,
  relatedProgramsExcept,
} from "./shared";

const hero = programImage("sr_prog_residential.jpg");
const story = programImage("sr_facility_4.png");
const stepFeatured = programImage("sr_facility_5.png");
const clinical = programImage("sr_facility_6.png");
const amenities = programImage("sr_facility_1.png");

export const residentialProgramPage: ProgramPageData = {
  canonical: "/programs/residential-treatment/",
  breadcrumb: programsBreadcrumb("Residential treatment"),
  hero: {
    eyebrow: "Residential treatment · Mission Viejo",
    title: "Structured inpatient care in",
    titleAccent: "Orange County",
    description:
      "Home-like residential treatment with daily therapy, clinical support, and holistic programming — on the same Mission Viejo campus as our medical detox.",
    image: hero,
    imageAlt: "Residential bedroom suite at Sullivan Recovery",
    stats: [
      { value: "24/7", label: "Clinical support" },
      { value: "Daily", label: "Therapy & groups" },
      { value: "Private", label: "Residential rooms" },
      { value: "1 campus", label: "Detox to residential" },
    ],
  },
  trust: DEFAULT_TRUST,
  story: {
    eyebrow: "Residential care",
    title: "Recovery with structure,",
    titleAccent: "not isolation",
    paragraphs: [
      "After detox, residential treatment provides the daily rhythm, accountability, and therapeutic depth that early sobriety requires — without leaving Sullivan Recovery.",
      "Clients live on campus while attending individual therapy, group sessions, family work, and holistic offerings like surf and music therapy.",
    ],
    bullets: [
      "Individualized treatment plans",
      "CBT, DBT, and group therapy daily",
      "Family sessions when appropriate",
      "Holistic and experiential programming",
    ],
    image: story,
    imageAlt: "Private bedroom at Sullivan Recovery residential program",
    link: DEFAULT_STORY_LINK,
  },
  stats: [
    { value: "24/7", label: "Staff availability" },
    { value: "Daily", label: "Therapeutic programming" },
    { value: "1:1", label: "Individual therapy sessions" },
    { value: "OC", label: "Mission Viejo campus" },
  ],
  differentiators: {
    eyebrow: "Why residential here",
    title: "Inpatient care that still feels",
    titleAccent: "like home",
    items: [
      {
        title: "Same campus after detox",
        description:
          "Step from medical detox into residential without transferring facilities or rebuilding trust with a new team.",
        icon: "ri-route-line",
        featured: true,
      },
      {
        title: "Keep your phone",
        description: "Stay connected to sponsors and family throughout residential care.",
        icon: "ri-smartphone-line",
      },
      {
        title: "Private rooms",
        description: "Residential-style rooms — rest and dignity, not institutional wards.",
        icon: "ri-hotel-bed-line",
      },
      {
        title: "Holistic programming",
        description: "Surf therapy, music therapy, and mindfulness alongside clinical care.",
        icon: "ri-leaf-line",
      },
      {
        title: "Insurance support",
        description: "Benefits verified before admission with transparent cost conversations.",
        icon: "ri-shield-check-line",
      },
    ],
  },
  process: {
    eyebrow: "Your stay",
    title: "Life in",
    titleAccent: "residential treatment",
    description:
      "A structured daily schedule balances clinical work, community, rest, and preparation for life after discharge.",
    steps: [
      {
        num: "01",
        phase: "Intake",
        title: "Personalized treatment plan",
        description:
          "Your clinician reviews detox progress, goals, and mental health needs to build a residential plan with clear milestones.",
        icon: "ri-file-list-3-line",
        image: stepFeatured,
        imageAlt: "Comfortable private room at Sullivan Recovery",
      },
      {
        num: "02",
        phase: "Clinical",
        title: "Daily therapy & groups",
        description:
          "Individual sessions, psychoeducation groups, and evidence-based modalities (CBT, DBT, MET) tailored to your plan.",
        icon: "ri-mental-health-line",
      },
      {
        num: "03",
        phase: "Holistic",
        title: "Experiential programming",
        description:
          "Surf therapy, music therapy, and mindfulness practices support emotional regulation beyond talk therapy alone.",
        icon: "ri-water-flash-line",
      },
      {
        num: "04",
        phase: "Discharge",
        title: "Aftercare & transition planning",
        description:
          "Before you leave we coordinate outpatient referrals, alumni resources, and family support for sustained recovery.",
        icon: "ri-calendar-check-line",
      },
    ],
  },
  clinical: {
    eyebrow: "Clinical care",
    title: "Therapy-led residential treatment",
    paragraphs: [
      "Licensed addiction clinicians lead your care with physician oversight for medications and co-occurring conditions.",
      "Treatment addresses triggers, coping skills, relapse prevention, and underlying trauma or mood disorders when present.",
    ],
    highlights: [
      {
        title: "Individual therapy",
        description: "One-on-one sessions focused on your goals and relapse prevention plan.",
        icon: "ri-user-heart-line",
      },
      {
        title: "Group therapy",
        description: "Peer processing, psychoeducation, and skills practice in facilitated groups.",
        icon: "ri-group-line",
      },
      {
        title: "Family therapy",
        description: "Rebuild trust and communication with loved ones when clinically appropriate.",
        icon: "ri-parent-line",
      },
      {
        title: "Dual diagnosis",
        description: "Integrated care when substance use and mental health conditions overlap.",
        icon: "ri-brain-line",
      },
    ],
    image: clinical,
    imageAlt: "Living area at Sullivan Recovery residential campus",
  },
  benefits: {
    eyebrow: "Benefits",
    title: "Why residential treatment works",
    items: [
      {
        title: "Removed from triggers",
        description: "A safe campus helps you focus on skills before returning to everyday environments.",
        icon: "ri-shield-line",
      },
      {
        title: "Peer community",
        description: "Shared experience with others in early recovery reduces isolation.",
        icon: "ri-team-line",
      },
      {
        title: "Daily accountability",
        description: "Structure and staff support reinforce new habits around the clock.",
        icon: "ri-calendar-line",
      },
      {
        title: "Skill building",
        description: "Practice coping tools before discharge with clinicians available in real time.",
        icon: "ri-lightbulb-line",
      },
      {
        title: "Holistic healing",
        description: "Mind-body approaches complement traditional addiction therapy.",
        icon: "ri-leaf-line",
      },
      {
        title: "Continuum ready",
        description: "Aftercare planning begins early — not the day before you leave.",
        icon: "ri-route-line",
      },
    ],
  },
  amenities: {
    eyebrow: "Campus life",
    title: "Comfortable spaces for healing",
    description:
      "Residential care should feel restorative. Our Mission Viejo campus blends clinical rigor with a calm, home-like environment.",
    image: amenities,
    imageAlt: "Outdoor courtyard at Sullivan Recovery",
    items: [
      { title: "Private bedrooms", description: "Personal space to rest between programming.", icon: "ri-hotel-bed-line" },
      { title: "Shared lounges", description: "Low-stimulus areas for reading and reflection.", icon: "ri-sofa-line" },
      { title: "Outdoor areas", description: "Courtyards and seating for fresh air and grounding.", icon: "ri-plant-line" },
      { title: "Nutritious meals", description: "Balanced food supporting physical recovery.", icon: "ri-restaurant-line" },
      { title: "Surf & music therapy", description: "Experiential modalities unique to Sullivan Recovery.", icon: "ri-music-2-line" },
      { title: "Family visits", description: "Guided family involvement when your plan supports it.", icon: "ri-group-line" },
    ],
  },
  gallery: {
    eyebrow: "The campus",
    title: "Where residential life happens",
    images: [
      {
        src: programImage("sr_facility_7.png"),
        alt: "Exterior grounds at Sullivan Recovery",
        caption: "Mission Viejo campus",
      },
      {
        src: programImage("sr_facility_8.png"),
        alt: "Outdoor area at the facility",
        caption: "Outdoor spaces",
      },
      {
        src: programImage("sr_facility_9.png"),
        alt: "Facility exterior",
        caption: "Residential setting",
      },
    ],
  },
  location: {
    eyebrow: "Orange County",
    title: "Residential treatment in Mission Viejo",
    description:
      "Convenient for families across Irvine, Lake Forest, Laguna Beach, Newport Beach, and greater Orange County — with confidential, physician-led care on one campus.",
    bullets: [
      "Central Orange County location",
      "Detox and residential on-site",
      "Serving South County & coastal cities",
    ],
    image: OC_LOCATION_IMAGE,
    imageAlt: "Orange County hills near Mission Viejo",
    href: "/service-area/",
  },
  relatedPrograms: relatedProgramsExcept("/programs/residential-treatment/"),
  faqs: [
    {
      question: "How long is residential treatment?",
      answer:
        "Length depends on clinical need, insurance authorization, and your goals. Many clients stay several weeks; your team reviews progress regularly and adjusts the plan with you.",
    },
    {
      question: "Do I need to complete detox first?",
      answer:
        "Most clients complete medical detox on our campus before residential care. If you are already medically stable, admissions will assess whether direct residential admission is appropriate.",
    },
    {
      question: "Can I keep my phone in residential?",
      answer:
        "Yes. We allow phones so you can stay connected to family and recovery supports — a difference many clients appreciate compared with other facilities.",
    },
    {
      question: "What therapies are included?",
      answer:
        "CBT, DBT, motivational interviewing, individual and group therapy, family therapy, plus holistic options like surf and music therapy.",
    },
    {
      question: "Does insurance cover residential care?",
      answer:
        "Many PPO and in-network plans cover a portion of residential treatment. We verify benefits before admission through our insurance form or by phone.",
    },
  ],
  cta: {
    title: "Ready for residential treatment?",
    description:
      "Call admissions 24/7 or verify insurance — we will help you understand detox, residential, and the right sequence for your situation.",
  },
};
