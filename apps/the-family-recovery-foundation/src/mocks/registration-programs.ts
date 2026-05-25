export interface RegistrationProgram {
  slug: string;
  title: string;
  headline: string;
  schedule: string;
  description: string;
}

export const registrationPrograms: Record<string, RegistrationProgram> = {
  "fix-your-family": {
    slug: "fix-your-family",
    title: "Fix Your Family",
    headline: "Fix Your Family Program with Beth Durling",
    schedule: "Mondays at 7:00 PM CT / 5:00 PM PT",
    description:
      "A structured weekly session where families learn communication strategies, boundary-setting techniques, and conflict resolution skills to rebuild trust and connection.",
  },
  "the-family-room": {
    slug: "the-family-room",
    title: "The Family Room",
    headline: "The Family Room",
    schedule: "Thursdays at 10:00 AM CT / 8:00 AM PT",
    description:
      "An open support group where family members share experiences, receive encouragement, and learn from others walking a similar path.",
  },
  "morning-meditation": {
    slug: "morning-meditation",
    title: "Morning Meditation",
    headline: "15-Minute Morning Meditation",
    schedule: "Monday–Friday at 9:00 AM CT / 7:00 AM PT",
    description:
      "Start each weekday with guided mindfulness designed to reduce anxiety, improve emotional regulation, and build resilience.",
  },
};

export function getRegistrationProgram(slug: string): RegistrationProgram | null {
  return registrationPrograms[slug] ?? null;
}
