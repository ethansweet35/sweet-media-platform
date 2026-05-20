export interface PillarDetailContent {
  pillarId: "prevention" | "education" | "support";
  intro: string;
  highlights: { title: string; body: string }[];
  programs: { label: string; href: string }[];
  ctaHeadline: string;
  ctaBody: string;
}

export const pillarDetails: PillarDetailContent[] = [
  {
    pillarId: "prevention",
    intro:
      "Prevention is where generational change begins. We help families and communities recognize risk early, build healthy communication, and create environments where young people are less likely to turn to substances as a coping strategy.",
    highlights: [
      {
        title: "Early education for families",
        body: "Practical guidance on warning signs, healthy boundaries, and how to talk about substance use without shame or blame.",
      },
      {
        title: "Community awareness",
        body: "Partnerships with schools, treatment centers, and recovery organizations to extend prevention resources beyond our programs.",
      },
      {
        title: "Evidence-based tools",
        body: "Workshops, worksheets, and live sessions that translate research into everyday actions families can use immediately.",
      },
    ],
    programs: [
      { label: "Family Programming", href: "/family-programming" },
      { label: "Resources & Partners", href: "/partnerships" },
      { label: "Get Help", href: "/get-help" },
    ],
    ctaHeadline: "Start with prevention",
    ctaBody: "Join a live session or explore our family programming library to build skills before crisis escalates.",
  },
  {
    pillarId: "education",
    intro:
      "Education turns fear into clarity. Our Intensive Family Program, grief support resources, and expert-led sessions help families understand addiction as a disease, respond with compassion, and stay connected through long-term recovery.",
    highlights: [
      {
        title: "Intensive Family Program",
        body: "Twelve structured modules covering addiction science, codependency, boundaries, gaslighting, and the transition home from treatment.",
      },
      {
        title: "Live weekly support",
        body: "Fix Your Family, The Family Room, Morning Meditation, and Courage to Detach — free sessions led by experienced facilitators.",
      },
      {
        title: "On-demand learning",
        body: "Worksheets, articles, and partner resources so families can learn at their own pace between live meetings.",
      },
    ],
    programs: [
      { label: "Family Programming", href: "/family-programming" },
      { label: "Blog & Articles", href: "/blog" },
      { label: "2025 Survey Results", href: "/2025-survey-results" },
    ],
    ctaHeadline: "Learn with your family",
    ctaBody: "Register for Family Programming or read our latest articles on boundaries, communication, and recovery.",
  },
  {
    pillarId: "support",
    intro:
      "Support means removing barriers. Through financial aid for treatment and intervention services, we help families access quality care when cost would otherwise stand in the way of getting help.",
    highlights: [
      {
        title: "Treatment financial aid",
        body: "Application-based assistance for residential, outpatient, and detox programs aligned with your family's clinical needs.",
      },
      {
        title: "Intervention support",
        body: "Funding guidance for professional intervention services when a loved one is not yet ready to accept treatment.",
      },
      {
        title: "No family left behind",
        body: "We believe economic circumstances should never be the reason a family cannot pursue recovery support.",
      },
    ],
    programs: [
      { label: "Apply via Get Help", href: "/get-help" },
      { label: "Donate to the fund", href: "/donate" },
      { label: "Contact our team", href: "/contact" },
    ],
    ctaHeadline: "Access financial support",
    ctaBody: "Reach out through Get Help or Contact to learn about eligibility and next steps for your family.",
  },
];
