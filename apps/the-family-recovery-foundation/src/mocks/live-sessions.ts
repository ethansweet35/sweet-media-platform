export interface LiveSession {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  schedule: string;
  description: string;
}

/** Weekly live sessions shown on the post-registration thank you page. */
export const liveSessions: LiveSession[] = [
  {
    id: "morning-meditation",
    icon: "ri-sun-line",
    title: "Morning Meditation",
    schedule: "Monday–Friday | 7:00 AM PT / 9:00 AM CT",
    description:
      "Begin each morning with peace and reflection—because a calm heart changes everything.",
  },
  {
    id: "fix-your-family",
    icon: "ri-group-line",
    title: "“Fix Your Family” Group",
    subtitle: "with Beth Durling, MS, CADCII, ICADC",
    schedule: "Every Monday | 5:00 PM PT / 7:00 PM CT",
    description:
      "Find practical tools and compassionate support to help your family rebuild connection and understanding.",
  },
  {
    id: "the-family-room",
    icon: "ri-home-heart-line",
    title: "The Family Room",
    schedule: "Fridays | 8:00 AM PT / 10:00 AM CT",
    description:
      "Join us each Friday morning for open discussion and connection as families come together to talk through real-life topics, challenges, and encouragement for the week ahead.",
  },
];
