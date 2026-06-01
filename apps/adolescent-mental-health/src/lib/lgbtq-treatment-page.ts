import { SITE } from "@/lib/site";

export const LGBTQ_TREATMENT_PATH = "/lgbtq-teen-mental-health" as const;

export type LgbtqTreatmentConfig = {
  path: typeof LGBTQ_TREATMENT_PATH;
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headline: { before: string; accent: string; after?: string };
    body: string;
    imageAlt: string;
    stats: { icon: string; label: string; value: string; unit: string }[];
    trustItems: { icon: string; label: string }[];
  };
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    focusItems: { label: string; icon: string }[];
    bentoAlt: string;
    calloutIcon: string;
    calloutTitle: string;
    calloutBody: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    description: string;
    items: { num: string; icon: string; tag: string; title: string; body: string; bullets: string[] }[];
  };
  fit: {
    eyebrow: string;
    title: string;
    description: string;
    goodToKnow: string;
    criteria: { icon: string; label: string; sub: string }[];
  };
  intake: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { num: string; icon: string; title: string; body: string }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    rows: { label: string; standard: string; iop: string }[];
  };
  related: {
    eyebrow: string;
    title: string;
    description: string;
    items: { label: string; path: string; desc: string }[];
  };
  faq: { title: string };
  faqs: { q: string; a: string }[];
  cta: { title: string; description: string };
};

export const LGBTQ_TREATMENT_PAGE: LgbtqTreatmentConfig = {
  path: LGBTQ_TREATMENT_PATH,
  metadata: {
    title: "LGBTQ+ Teen Mental Health & Gender-Affirming Virtual IOP",
    description:
      "Gender-affirming virtual IOP for LGBTQ+ teens ages 12–17. Identity-supportive therapy for gender dysphoria, anxiety, depression, and family stress. Insurance accepted.",
  },
  hero: {
    eyebrow: `LGBTQ+ & Gender-Affirming Care · Ages ${SITE.ages}`,
    headline: { before: "Mental health care that ", accent: "affirms", after: " who your teen is" },
    body: "Virtual intensive outpatient support for LGBTQ+ adolescents — including teens navigating gender dysphoria, identity stress, anxiety, depression, and family conflict. Clinicians use chosen names and pronouns, and family coaching helps caregivers show up with confidence.",
    imageAlt:
      "Teen in a calm home setting participating in a supportive virtual therapy session with inclusive, affirming adolescent mental health care",
    stats: [
      { icon: "ri-heart-3-line", label: "Approach", value: "Affirming", unit: "care" },
      { icon: "ri-video-chat-line", label: "Format", value: "Virtual", unit: "IOP" },
      { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
    ],
    trustItems: [
      { icon: "ri-shield-check-line", label: "Licensed clinicians" },
      { icon: "ri-user-heart-line", label: "Chosen name & pronouns" },
      { icon: "ri-team-line", label: "Family included" },
      { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
    ],
  },
  overview: {
    eyebrow: "Gender-Affirming Teen Mental Health",
    title: "Identity stress is clinical — not a phase to wait out",
    paragraphs: [
      "LGBTQ+ teens face higher rates of anxiety, depression, self-harm, and school avoidance — often compounded by bullying, family conflict, or uncertainty about identity. Affirming care reduces shame and helps teens engage in treatment.",
      "Our Virtual IOP treats the full clinical picture — mood, trauma, anxiety, and safety — while respecting your teen's identity. Therapy is our scope; medical gender-affirming treatments remain with your teen's medical providers, and we coordinate when families authorize.",
    ],
    focusItems: [
      { label: "Gender dysphoria distress", icon: "ri-user-heart-line" },
      { label: "Anxiety & depression", icon: "ri-emotion-sad-line" },
      { label: "Family conflict", icon: "ri-home-heart-line" },
      { label: "School & social stress", icon: "ri-school-line" },
    ],
    bentoAlt:
      "Parent and teen having a supportive conversation at home about mental health and identity in an affirming family environment",
    calloutIcon: "ri-heart-3-line",
    calloutTitle: "Affirmation is clinical care",
    calloutBody:
      "Using correct names and pronouns, validating identity, and reducing family invalidation are evidence-informed parts of supporting teen mental health — not optional extras.",
  },
  pillars: {
    eyebrow: "How We Support LGBTQ+ Teens",
    title: "Affirming structure with intensive clinical contact",
    description:
      "Virtual IOP gives LGBTQ+ teens frequent sessions, peer connection, and family coaching — without the added stress of a new physical environment during a vulnerable time.",
    items: [
      {
        num: "01",
        icon: "ri-user-heart-line",
        tag: "Identity",
        title: "Affirming individual therapy",
        body: "Teens work with clinicians who specialize in adolescent development and LGBTQ+ mental health — using chosen names, exploring identity at the teen's pace, and building coping skills for dysphoria-related distress.",
        bullets: [
          "CBT and DBT skills for mood and safety",
          "Paced exploration of identity without pressure to label",
          "Coordination with outside medical providers when authorized",
        ],
      },
      {
        num: "02",
        icon: "ri-group-line",
        tag: "Connection",
        title: "Peer support in group therapy",
        body: "Moderated adolescent groups reduce isolation — many teens open up when they are not the only LGBTQ+ person in the room. Groups focus on skills, not outing anyone beyond their comfort.",
        bullets: [
          "Age-appropriate peer groups",
          "Skills-based sessions with clinical moderation",
          "Privacy norms explained at intake",
        ],
      },
      {
        num: "03",
        icon: "ri-home-heart-line",
        tag: "Family",
        title: "Caregiver coaching & family therapy",
        body: "Family rejection and conflict are among the strongest predictors of poor outcomes. We help caregivers learn affirming language, boundaries, and responses that support safety at home.",
        bullets: [
          "Psychoeducation for parents new to LGBTQ+ topics",
          "Communication plans for home and extended family",
          "Safety planning when conflict is high",
        ],
      },
      {
        num: "04",
        icon: "ri-video-chat-line",
        tag: "Access",
        title: "Virtual care from a safe space",
        body: "Many teens prefer therapy from home — especially when school or community environments feel unsafe. Telehealth IOP reduces travel barriers and lets families in rural or unsupportive areas access affirming specialists.",
        bullets: [
          "HIPAA-compliant video sessions",
          "Flexible scheduling around school",
          "No need to explain absences to unsupportive peers",
        ],
      },
    ],
  },
  fit: {
    eyebrow: "Is This Program a Fit?",
    title: "When affirming Virtual IOP may help",
    description:
      "IOP is for teens who need more support than weekly therapy — not for emergencies requiring 24/7 monitoring.",
    goodToKnow:
      "We provide therapy and care coordination — not psychiatric prescribing, hormone therapy, or surgical referrals. Medical gender-affirming care stays with your teen's physicians; we support the mental health side and help families navigate the full picture.",
    criteria: [
      {
        icon: "ri-emotion-sad-line",
        label: "Depression, anxiety, or emotional dysregulation",
        sub: "Persistent mood symptoms affecting school, sleep, or relationships",
      },
      {
        icon: "ri-user-heart-line",
        label: "Gender dysphoria–related distress",
        sub: "Body-related distress, social transition stress, or identity uncertainty affecting functioning",
      },
      {
        icon: "ri-school-line",
        label: "School avoidance or bullying aftermath",
        sub: "Refusal, isolation, or academic decline tied to identity-related stress",
      },
      {
        icon: "ri-home-heart-line",
        label: "Family conflict about identity",
        sub: "Caregivers willing to participate in family sessions and learn affirming approaches",
      },
      {
        icon: "ri-hand-heart-line",
        label: "Self-harm or safety concerns (outpatient level)",
        sub: "Needs structured monitoring — not active 24/7 inpatient acuity",
      },
      {
        icon: "ri-time-line",
        label: "Weekly therapy is not enough",
        sub: "Symptoms persist despite outpatient care — more clinical hours needed",
      },
    ],
  },
  intake: {
    eyebrow: "Getting Started",
    title: "Affirming intake — respectful from the first call",
    description:
      "We ask for chosen name and pronouns at consultation. Your teen does not need a diagnosis or label to begin — we start with what is happening and what support would help.",
    steps: [
      {
        num: "01",
        icon: "ri-phone-line",
        title: "Free consultation",
        body: "Share your teen's story, identity-related stressors, prior treatment, and what you hope changes — no obligation.",
      },
      {
        num: "02",
        icon: "ri-clipboard-line",
        title: "Clinical assessment",
        body: "A licensed clinician evaluates safety, functioning, and fit for Virtual IOP — using affirming language throughout.",
      },
      {
        num: "03",
        icon: "ri-calendar-check-line",
        title: "Personalized care plan",
        body: "Individual, group, and family components matched to your teen — with therapist fit prioritized when requested.",
      },
      {
        num: "04",
        icon: "ri-video-chat-line",
        title: "Begin Virtual IOP",
        body: "Your teen starts structured sessions from home — with frequent contact and family coaching built in.",
      },
    ],
  },
  comparison: {
    eyebrow: "Levels of Care",
    title: "Why affirming IOP beats waiting on weekly therapy alone",
    rows: [
      { label: "Session frequency", standard: "Once weekly", iop: "Multiple days per week" },
      { label: "Identity-related stress", standard: "Limited time to process", iop: "Ongoing affirming contact" },
      { label: "Family coaching", standard: "Occasional or absent", iop: "Structured family track" },
      { label: "Peer connection", standard: "Rare in individual therapy", iop: "Moderated adolescent groups" },
      { label: "Safety monitoring", standard: "Long gaps between visits", iop: "Frequent clinician check-ins" },
    ],
  },
  related: {
    eyebrow: "Related Programs",
    title: "Often treated alongside identity-related stress",
    description:
      "LGBTQ+ teens frequently benefit from integrated treatment across mood, anxiety, trauma, and family systems — not siloed identity-only support.",
    items: [
      {
        label: "Online anxiety treatment",
        path: "/online-anxiety-treatment",
        desc: "Social anxiety, panic, and school-related worry — common when environments feel invalidating.",
      },
      {
        label: "Teen depression treatment",
        path: "/teen-depression-treatment",
        desc: "Hopelessness and withdrawal — especially when identity stress is dismissed at home or school.",
      },
      {
        label: "Online DBT",
        path: "/online-dialectical-behavioral-therapy",
        desc: "Emotion regulation and distress tolerance for teens with intense dysregulation or self-harm.",
      },
      {
        label: "Self-harm support",
        path: "/conditions/self-harm",
        desc: "Safety planning and DBT-informed care when self-injury co-occurs with identity-related distress.",
      },
      {
        label: "Family therapy",
        path: "/therapy/adolescent-family-therapy",
        desc: "Caregiver coaching to reduce conflict and build an affirming home environment.",
      },
      {
        label: "Virtual IOP for teens",
        path: "/virtual-iop-for-teens",
        desc: "Full program structure, schedule, and insurance details for our flagship intensive outpatient track.",
      },
    ],
  },
  faq: { title: "Questions about LGBTQ+ teen mental health care" },
  faqs: [
    {
      q: "Do you provide hormone therapy or medical transition services?",
      a: "No. We are a therapy provider, not a medical clinic. Gender-affirming medical care — including puberty blockers or hormone therapy — is managed by your teen's physicians. We support mental health, family systems, and coordination when you authorize it.",
    },
    {
      q: "Will you use my teen's chosen name and pronouns?",
      a: "Yes — always. We ask at intake and use chosen names and pronouns in sessions, documentation shared with caregivers (as clinically appropriate), and when coordinating with schools or other providers with family authorization.",
    },
    {
      q: "What if our family is still learning about LGBTQ+ identities?",
      a: "That is common. Family sessions include psychoeducation and coaching — meeting caregivers where they are while prioritizing your teen's safety and dignity. Progress does not require perfect fluency on day one.",
    },
    {
      q: "Is Virtual IOP confidential for closeted teens?",
      a: "We explain confidentiality limits at intake. For minors, caregivers are generally involved in treatment planning and safety — especially in IOP. We work with teens and families to balance privacy, safety, and appropriate caregiver involvement.",
    },
    {
      q: "Can you match my teen with an LGBTQ+ clinician?",
      a: "We prioritize therapeutic fit, including identity-related experience when families request it. Availability varies — share preferences during consultation and we will do our best to match.",
    },
    {
      q: "Does insurance cover affirming teen IOP?",
      a: "Most major plans cover adolescent intensive outpatient programs, including telehealth. We verify benefits before enrollment and explain any copay or authorization requirements.",
    },
    {
      q: "What if my teen is in crisis?",
      a: "Virtual IOP is outpatient care — not a substitute for emergency services. If your teen is in immediate danger, call 911 or 988. We assess acuity at intake and recommend inpatient care when that level is clinically required.",
    },
  ],
  cta: {
    title: "Affirming support starts with a conversation",
    description:
      "Free consultation, no obligation. Tell us about your teen's identity-related stress, mood symptoms, and what kind of support you are looking for.",
  },
};
