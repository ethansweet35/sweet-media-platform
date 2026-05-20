export const programsList = [
  {
    id: "fix-your-family",
    title: "Fix Your Family",
    schedule: "Mondays at 7:00 PM CT / 5:00 PM PT",
    description:
      "A structured program designed to help families understand addiction, improve communication, and rebuild trust. Led by experienced facilitators who guide participants through evidence-based strategies for healing.",
  },
  {
    id: "family-room",
    title: "The Family Room",
    schedule: "Fridays at 10:00 AM CT / 8:00 AM PT",
    description:
      "An open support group where family members can share experiences, receive encouragement, and learn from others walking a similar path. A safe space for connection and community building.",
  },
  {
    id: "morning-meditation",
    title: "Morning Meditation",
    schedule: "Monday-Friday at 9:00 AM CT / 7:00 AM PT",
    description:
      "Start each day with guided meditation and mindfulness practices designed to reduce anxiety, build emotional resilience, and create a foundation of peace for navigating family challenges.",
  },
  {
    id: "courage-to-detach",
    title: "The Courage to Detach",
    schedule: "Last Wednesday of every month at 5 PT",
    description:
      "A specialized session focused on the difficult but essential skill of healthy detachment. Learn to set boundaries while maintaining love and compassion for your loved one in recovery.",
  },
  {
    id: "one-on-one-coaching",
    title: "1-on-1 Family Coaching",
    schedule: "By appointment",
    description:
      "Personalized one-on-one coaching sessions tailored to your family's unique situation. Work directly with a certified family recovery coach to develop customized strategies and action plans.",
  },
  {
    id: "family-education",
    title: "Family Education & Resources",
    schedule: "On-demand access",
    description:
      "Comprehensive educational materials, workshops, and resources designed to help families understand addiction, mental health, and the recovery process. Available anytime, anywhere.",
  },
  {
    id: "private-messaging",
    title: "Private Family Messaging Group with Clinical Director — 24/7 Access",
    schedule: "24/7 access",
    description:
      "A secure, private messaging platform where families can connect directly with TFRF's Clinical Director for guidance, questions, and support at any time of day or night.",
  },
  {
    id: "financial-aid",
    title: "Financial Aid for Treatment and Intervention Services",
    schedule: "Application-based",
    description:
      "Financial assistance programs to help families access quality treatment and intervention services. We believe cost should never be a barrier to getting the help your family needs.",
  },
];

const TFRF_DOCUMENTS_BASE =
  "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/documents";

export const familyModules = [
  {
    id: "module-1",
    number: 1,
    title: "Definition of Addiction",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_01_definition-of-addiction.pdf`,
    downloadFilename: "TFRF-Module-01-Definition-of-Addiction.pdf",
  },
  {
    id: "module-2",
    number: 2,
    title: "Our Central Nervous System",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_02_central-nervous-system.pdf`,
    downloadFilename: "TFRF-Module-02-Central-Nervous-System.pdf",
  },
  {
    id: "module-3",
    number: 3,
    title: "Codependency I: Characteristics and Strategies",
    hasVideo: true,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_03_codependency-i.pdf`,
    downloadFilename: "TFRF-Module-03-Codependency-I.pdf",
  },
  {
    id: "module-4",
    number: 4,
    title: "Codependency II: Manipulation and Enabling",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_04_codependency-ii.pdf`,
    downloadFilename: "TFRF-Module-04-Codependency-II.pdf",
  },
  {
    id: "module-5",
    number: 5,
    title: "Codependency III: The Neuroscience",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_05_codependency-iii.pdf`,
    downloadFilename: "TFRF-Module-05-Codependency-III.pdf",
  },
  {
    id: "module-6",
    number: 6,
    title: "Communication Skills: Difficult Conversations",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_06_communication-skills.pdf`,
    downloadFilename: "TFRF-Module-06-Communication-Skills.pdf",
  },
  {
    id: "module-7",
    number: 7,
    title: "Boundaries: Who I am and Who I am Not",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_07_boundaries.pdf`,
    downloadFilename: "TFRF-Module-07-Boundaries.pdf",
  },
  {
    id: "module-8",
    number: 8,
    title: "The Language of Connective Boundaries",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_08_connective-boundaries.pdf`,
    downloadFilename: "TFRF-Module-08-Connective-Boundaries.pdf",
  },
  {
    id: "module-9",
    number: 9,
    title: "Understanding and Navigating Gaslighting",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_09_gaslighting.pdf`,
    downloadFilename: "TFRF-Module-09-Gaslighting.pdf",
  },
  {
    id: "module-10",
    number: 10,
    title:
      "I am coming home: Navigating the Transition When Your Loved One Comes Home from Treatment",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_10-coming-home.pdf`,
    downloadFilename: "TFRF-Module-10-Coming-Home.pdf",
  },
  {
    id: "module-11",
    number: 11,
    title: "When the Addict Hits THE WALL",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_11_the-wall.pdf`,
    downloadFilename: "TFRF-Module-11-The-Wall.pdf",
  },
  {
    id: "module-12",
    number: 12,
    title: "Just For Today",
    hasVideo: false,
    downloadUrl: `${TFRF_DOCUMENTS_BASE}/tfrf_module_12_just-for-today.pdf`,
    downloadFilename: "TFRF-Module-12-Just-For-Today.pdf",
  },
];

export type FamilyModule = (typeof familyModules)[number];

export const worksheets = [
  {
    id: "worksheet-1",
    number: 1,
    title: "Relapse Prevention Plan",
    downloadUrl:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/documents/tfrf_worksheet_01_relapse-prevention-plan.pdf",
    downloadFilename: "TFRF-Relapse-Prevention-Plan.pdf",
  },
  {
    id: "worksheet-2",
    number: 2,
    title: "Family Support Plan",
    downloadUrl:
      "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/documents/tfrf_worksheet_02_family-support-plan.pdf",
    downloadFilename: "TFRF-Family-Support-Plan.pdf",
  },
];
