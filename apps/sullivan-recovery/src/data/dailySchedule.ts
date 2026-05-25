import { PROGRAMS_IMAGES_BASE } from "@/data/programs";

export const SCHEDULE_HERO_IMAGE = `${PROGRAMS_IMAGES_BASE}/sr_schedule_hero01.jpg`;

export type ScheduleBlock = {
  time: string;
  title: string;
  description: string;
  icon: string;
  /** visual accent: clinical | therapy | holistic | rest */
  kind: "clinical" | "therapy" | "holistic" | "rest";
};

export type SchedulePeriodId = "morning" | "afternoon" | "evening";

export const SCHEDULE_PERIOD_ORDER: SchedulePeriodId[] = [
  "morning",
  "afternoon",
  "evening",
];

export const SCHEDULE_PERIOD_META: Record<
  SchedulePeriodId,
  { label: string; range: string; icon: string }
> = {
  morning: {
    label: "Morning",
    range: "7:00 AM – 12:00 PM",
    icon: "ri-sun-line",
  },
  afternoon: {
    label: "Afternoon",
    range: "12:00 PM – 5:00 PM",
    icon: "ri-sun-foggy-line",
  },
  evening: {
    label: "Evening",
    range: "5:00 PM – 10:00 PM",
    icon: "ri-moon-line",
  },
};

export type ScheduleDay = {
  id: "detox" | "residential";
  label: string;
  summary: string;
  blocks: ScheduleBlock[];
};

/** Minutes since midnight from strings like "7:30 AM" */
export function parseScheduleTime(time: string): number {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function periodForBlock(block: ScheduleBlock): SchedulePeriodId {
  const m = parseScheduleTime(block.time);
  if (m < 12 * 60) return "morning";
  if (m < 17 * 60) return "afternoon";
  return "evening";
}

export function groupBlocksByPeriod(
  blocks: ScheduleBlock[]
): Record<SchedulePeriodId, ScheduleBlock[]> {
  const grouped: Record<SchedulePeriodId, ScheduleBlock[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };
  for (const block of blocks) {
    grouped[periodForBlock(block)].push(block);
  }
  return grouped;
}

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    id: "detox",
    label: "Medical detox",
    summary:
      "Detox days prioritize rest, medical checks, and gentle therapeutic engagement — intensity increases as you stabilize.",
    blocks: [
      {
        time: "7:00 AM",
        title: "Wake & vitals",
        description: "Nursing check-in, medications, and a calm start to the day.",
        icon: "ri-sun-line",
        kind: "clinical",
      },
      {
        time: "7:30 AM",
        title: "Breakfast",
        description: "Nutritious meal in a relaxed dining setting.",
        icon: "ri-restaurant-line",
        kind: "rest",
      },
      {
        time: "8:30 AM",
        title: "Clinical check-in",
        description: "Physician or nursing review of symptoms and withdrawal scores.",
        icon: "ri-stethoscope-line",
        kind: "clinical",
      },
      {
        time: "10:00 AM",
        title: "Group or individual therapy",
        description: "Introductory coping skills when clinically appropriate.",
        icon: "ri-mental-health-line",
        kind: "therapy",
      },
      {
        time: "12:00 PM",
        title: "Lunch",
        description: "Midday meal and brief personal time.",
        icon: "ri-cup-line",
        kind: "rest",
      },
      {
        time: "1:00 PM",
        title: "Rest & personal time",
        description: "Quiet hours in your private room — phones allowed.",
        icon: "ri-hotel-bed-line",
        kind: "rest",
      },
      {
        time: "2:30 PM",
        title: "Therapy or psychoeducation",
        description: "Light processing, recovery education, or family call window.",
        icon: "ri-book-open-line",
        kind: "therapy",
      },
      {
        time: "5:00 PM",
        title: "Dinner",
        description: "Evening meal with staff support nearby.",
        icon: "ri-restaurant-2-line",
        kind: "rest",
      },
      {
        time: "6:30 PM",
        title: "Evening reflection",
        description: "Short group check-in or journaling as energy allows.",
        icon: "ri-moon-line",
        kind: "therapy",
      },
      {
        time: "8:30 PM",
        title: "Personal time",
        description: "Wind down, connect with supports, prepare for rest.",
        icon: "ri-smartphone-line",
        kind: "rest",
      },
      {
        time: "10:00 PM",
        title: "Lights out",
        description: "Flexible bedtime focused on sleep and recovery.",
        icon: "ri-moon-clear-line",
        kind: "rest",
      },
    ],
  },
  {
    id: "residential",
    label: "Residential treatment",
    summary:
      "Residential days blend clinical therapy, holistic experiences, and community — building skills for life after treatment.",
    blocks: [
      {
        time: "7:00 AM",
        title: "Wake & mindfulness",
        description: "Gentle start — optional mindfulness or quiet preparation.",
        icon: "ri-sun-line",
        kind: "holistic",
      },
      {
        time: "7:30 AM",
        title: "Breakfast",
        description: "Shared meal and daily intention setting.",
        icon: "ri-restaurant-line",
        kind: "rest",
      },
      {
        time: "8:30 AM",
        title: "Morning group",
        description: "CBT, DBT, or process group with licensed clinicians.",
        icon: "ri-group-line",
        kind: "therapy",
      },
      {
        time: "10:00 AM",
        title: "Individual therapy",
        description: "One-on-one session focused on your treatment plan.",
        icon: "ri-user-heart-line",
        kind: "therapy",
      },
      {
        time: "12:00 PM",
        title: "Lunch",
        description: "Nutrition and community connection.",
        icon: "ri-cup-line",
        kind: "rest",
      },
      {
        time: "1:00 PM",
        title: "Holistic programming",
        description: "Surf therapy, music therapy, outings, or fitness rotation.",
        icon: "ri-water-flash-line",
        kind: "holistic",
      },
      {
        time: "3:00 PM",
        title: "Afternoon group",
        description: "Psychoeducation, relapse prevention, or specialty topic groups.",
        icon: "ri-presentation-line",
        kind: "therapy",
      },
      {
        time: "5:00 PM",
        title: "Dinner",
        description: "Evening meal — structured social time.",
        icon: "ri-restaurant-2-line",
        kind: "rest",
      },
      {
        time: "6:30 PM",
        title: "Recovery meeting",
        description: "12-step, Wellbriety, or facilitated recovery discussion.",
        icon: "ri-community-line",
        kind: "therapy",
      },
      {
        time: "8:00 PM",
        title: "Personal time",
        description: "Phone, journaling, peer connection, or campus lounge.",
        icon: "ri-smartphone-line",
        kind: "rest",
      },
      {
        time: "10:00 PM",
        title: "Lights out",
        description: "Consistent sleep schedule supporting brain healing.",
        icon: "ri-moon-clear-line",
        kind: "rest",
      },
    ],
  },
];

export const SCHEDULE_PRINCIPLES = [
  {
    title: "Structure creates safety",
    description:
      "Predictable rhythms reduce anxiety in early recovery — you always know what comes next.",
    icon: "ri-calendar-schedule-line",
  },
  {
    title: "Clinical + holistic",
    description:
      "Therapy and medical care balanced with surf, music, nature, and mindfulness.",
    icon: "ri-leaf-line",
  },
  {
    title: "Personalized pacing",
    description:
      "Your clinician adjusts intensity during detox and residential — not a rigid one-size plan.",
    icon: "ri-user-settings-line",
  },
  {
    title: "Room to breathe",
    description:
      "Built-in rest, meals, and personal time — recovery is not group therapy all day.",
    icon: "ri-cup-line",
  },
] as const;

export const SCHEDULE_FAQS = [
  {
    question: "Is the schedule the same every day?",
    answer:
      "The framework stays consistent — meals, therapy blocks, rest — but groups, holistic activities, and individual sessions rotate through the week based on your treatment plan.",
  },
  {
    question: "Can I keep my phone?",
    answer:
      "Yes. Sullivan Recovery allows phones so you can stay connected to family and recovery supports during personal time.",
  },
  {
    question: "What if I need more rest during detox?",
    answer:
      "Detox schedules are adjusted to your stabilization level. Clinical needs always come before programming.",
  },
  {
    question: "When does surf or music therapy happen?",
    answer:
      "Holistic sessions are scheduled during residential care when clinically appropriate — often in afternoon rotation slots.",
  },
] as const;
