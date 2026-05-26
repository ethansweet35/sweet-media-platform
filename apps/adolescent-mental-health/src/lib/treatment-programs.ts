export type ProgramLink = {
  label: string;
  path: string;
  icon: string;
  tag: string;
  body?: string;
};

/** Condition & specialized treatment landings — mirrors Treatment nav / hub */
export const TREATMENT_PROGRAM_LINKS: ProgramLink[] = [
  {
    label: "Teen Depression Treatment",
    path: "/teen-depression-treatment",
    icon: "ri-emotion-sad-line",
    tag: "Condition",
    body: "Intensive outpatient support for persistent sadness, withdrawal, and loss of interest — with behavioral activation and family coaching.",
  },
  {
    label: "PTSD Treatment Online",
    path: "/ptsd-treatment-online",
    icon: "ri-shield-flash-line",
    tag: "Condition",
    body: "Trauma-informed virtual IOP with paced stabilization, safety planning, and family support for teens processing PTSD.",
  },
  {
    label: "Online Bipolar Treatment",
    path: "/online-bipolar-treatment",
    icon: "ri-contrast-2-line",
    tag: "Specialized",
    body: "Mood monitoring, CBT/DBT skills, and prescriber coordination for teens with bipolar disorder.",
  },
  {
    label: "Online OCD Treatment",
    path: "/online-ocd-treatment",
    icon: "ri-repeat-line",
    tag: "Condition",
    body: "ERP-based virtual IOP for obsessive-compulsive disorder — with family accommodation reduction.",
  },
  {
    label: "Online Anxiety Treatment",
    path: "/online-anxiety-treatment",
    icon: "ri-heart-pulse-line",
    tag: "Condition",
    body: "CBT, exposure work, and DBT skills for persistent worry, panic, social anxiety, and school-related stress.",
  },
  {
    label: "ADHD Treatment for Teens",
    path: "/adhd-treatment-for-teens",
    icon: "ri-focus-3-line",
    tag: "Condition",
    body: "Executive function coaching and emotional regulation skills — alongside outside medication management.",
  },
  {
    label: "Self-Harm Support",
    path: "/conditions/self-harm",
    icon: "ri-hand-heart-line",
    tag: "Safety",
    body: "DBT-informed IOP with safety planning and family coaching for teens who self-harm or dysregulate intensely.",
  },
  {
    label: "School Avoidance",
    path: "/conditions/school-avoidance",
    icon: "ri-school-line",
    tag: "School",
    body: "Clinical treatment plus gradual school re-entry planning when refusal or avoidance persists.",
  },
  {
    label: "Online Insomnia Treatment",
    path: "/online-insomnia-treatment-for-teens",
    icon: "ri-moon-line",
    tag: "Specialized",
    body: "Structured sleep-focused care for insomnia, circadian disruption, and related mood symptoms.",
  },
  {
    label: "Schizophrenia in Adolescence",
    path: "/schizophrenia-in-adolescence",
    icon: "ri-mental-health-line",
    tag: "Condition",
    body: "Structured virtual IOP with psychoeducation, skills training, and psychiatric prescriber coordination.",
  },
  {
    label: "Psychiatrist for Teens",
    path: "/psychiatrist-for-teens",
    icon: "ri-stethoscope-line",
    tag: "Psychiatry",
    body: "Intensive therapy with proactive coordination alongside your teen's psychiatric prescriber.",
  },
];

export const LEVELS_OF_CARE_LINKS: ProgramLink[] = [
  {
    label: "Virtual IOP for Teens",
    path: "/virtual-iop-for-teens",
    icon: "ri-video-chat-line",
    tag: "Flagship",
    body: "9–20 hours per week of individual, group, and family therapy from home — our flagship intensive program.",
  },
  {
    label: "Adolescent IOP for Teens",
    path: "/adolescent-iop-for-teens",
    icon: "ri-group-line",
    tag: "Intensive",
    body: "Structured IOP for teens who need coordinated clinical hours beyond weekly therapy.",
  },
];

export const THERAPY_PROGRAM_LINKS: ProgramLink[] = [
  {
    label: "Cognitive Behavioral Therapy",
    path: "/online-cognitive-behavioral-therapy",
    icon: "ri-brain-line",
    tag: "Modality",
    body: "Evidence-based CBT for anxiety, depression, and avoidance — delivered virtually.",
  },
  {
    label: "Dialectical Behavioral Therapy",
    path: "/online-dialectical-behavioral-therapy",
    icon: "ri-contrast-2-line",
    tag: "Modality",
    body: "DBT skills for emotion regulation, distress tolerance, and interpersonal effectiveness.",
  },
  {
    label: "Individual Therapy for Teens",
    path: "/therapy/individual-therapy-for-teens",
    icon: "ri-user-heart-line",
    tag: "Therapy",
    body: "One-on-one sessions with licensed clinicians using CBT, DBT, and trauma-informed care.",
  },
  {
    label: "Group Therapy with Adolescents",
    path: "/therapy/group-therapy-with-adolescents",
    icon: "ri-group-line",
    tag: "Therapy",
    body: "Peer skills groups for connection, accountability, and normalized adolescent experiences.",
  },
  {
    label: "Adolescent Family Therapy",
    path: "/therapy/adolescent-family-therapy",
    icon: "ri-home-heart-line",
    tag: "Therapy",
    body: "Caregiver coaching and family sessions that reinforce progress at home.",
  },
];
