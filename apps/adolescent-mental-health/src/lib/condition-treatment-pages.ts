import { SITE } from "@/lib/site";

export type ConditionTreatmentPath = "/conditions/self-harm" | "/conditions/school-avoidance";

export type ConditionTreatmentImageKey = "selfHarm" | "schoolAvoidance";

export type ConditionTreatmentConfig = {
  path: ConditionTreatmentPath;
  imageKey: ConditionTreatmentImageKey;
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

const defaultIntakeSteps = [
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Share your teen's symptoms, safety history, and current providers — no obligation." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates safety, functioning, and whether Virtual IOP is clinically appropriate." },
  { num: "03", icon: "ri-calendar-check-line", title: "Personalized care plan", body: "We build an individualized plan with therapy modalities, family involvement, and coordination with outside prescribers." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin Virtual IOP", body: "Your teen starts individual, group, and family sessions — with frequent clinical contact built into the program." },
];

export const CONDITION_TREATMENT_PAGES: Record<ConditionTreatmentPath, ConditionTreatmentConfig> = {
  "/conditions/self-harm": {
    path: "/conditions/self-harm",
    imageKey: "selfHarm",
    metadata: {
      title: "Self-Harm Treatment for Teens | DBT-Based Virtual IOP",
      description:
        "Virtual IOP for adolescents ages 12–17 with self-harm and emotional dysregulation. DBT skills, safety planning, family coaching, and frequent clinical contact. Insurance accepted.",
    },
    hero: {
      eyebrow: `Self-Harm Support · Ages ${SITE.ages}`,
      headline: { before: "Compassionate care when teens need ", accent: "more support", after: "" },
      body: "DBT-informed virtual IOP for teens who self-harm or struggle with intense emotional dysregulation — combining safety planning, skills training, and family partnership without judgment.",
      imageAlt: "Teen and clinician reviewing a collaborative safety plan during a virtual session",
      stats: [
        { icon: "ri-shield-check-line", label: "Approach", value: "DBT", unit: "informed" },
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Safety protocols" },
        { icon: "ri-heart-line", label: "Non-judgmental care" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
      ],
    },
    overview: {
      eyebrow: "Self-Harm & Emotional Safety",
      title: "Skills-based IOP when weekly therapy isn't enough",
      paragraphs: [
        "Self-injury is often a way teens regulate overwhelming emotions — not attention-seeking. Shame and secrecy make it harder to ask for help, while gaps between weekly sessions leave families managing crises alone.",
        "Virtual IOP provides frequent clinical contact, DBT skills practice, and structured safety planning — so teens build alternatives to self-harm with support at home and in session.",
      ],
      focusItems: [
        { label: "Self-injury behaviors", icon: "ri-hand-heart-line" },
        { label: "Emotional dysregulation", icon: "ri-emotion-line" },
        { label: "Safety planning", icon: "ri-shield-check-line" },
        { label: "Family coaching", icon: "ri-team-line" },
      ],
      bentoAlt: "Teen learning distress tolerance skills with a clinician during virtual DBT-informed therapy",
      calloutIcon: "ri-alarm-warning-line",
      calloutTitle: "Safety comes first",
      calloutBody: "IOP is for teens who need structured outpatient support — not substitutes for emergency or inpatient care when 24/7 monitoring is required.",
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we support teens who self-harm",
      description: "Care is DBT-informed, safety-focused, and family-integrated — with enough session frequency to practice skills when distress is high.",
      items: [
        { num: "01", icon: "ri-shield-check-line", tag: "Safety", title: "Collaborative safety planning", body: "Teens and clinicians build personalized safety plans — identifying triggers, warning signs, coping steps, and when to escalate to caregivers or crisis services.", bullets: ["Written safety plans updated as skills grow", "Caregiver coaching on calm, non-punitive responses", "Clear protocols for clinical deterioration"] },
        { num: "02", icon: "ri-heart-pulse-line", tag: "DBT skills", title: "Distress tolerance and emotion regulation", body: "DBT skills help teens tolerate urges without acting on them — replacing self-harm with strategies that work in the moment.", bullets: ["TIPP and other crisis survival skills", "Emotion regulation and mindfulness practice", "Urge surfing and alternative coping menus"] },
        { num: "03", icon: "ri-group-line", tag: "Peer support", title: "DBT-informed group therapy", body: "Peer groups reduce shame, normalize the struggle, and provide structured practice for skills teens need between sessions.", bullets: ["Skills rehearsal in a supportive peer setting", "Accountability without judgment", "Connection that counters isolation"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Caregiver coaching and communication", body: "Families learn how to respond to self-harm disclosures, reduce invalidating language, and support skill use at home.", bullets: ["DBT family psychoeducation", "Validation and limit-setting balance", "Coordination with school and outside providers"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "When self-harm needs IOP-level support",
      description: "IOP may fit when self-injury or emotional dysregulation is affecting safety, school, or family stability — and weekly therapy has not been enough to stabilize patterns.",
      goodToKnow: "We assess acuity carefully at intake. Teens requiring inpatient stabilization or 24/7 monitoring are referred to higher levels of care. If your teen is in immediate danger, call 911 or text 988.",
      criteria: [
        { icon: "ri-hand-heart-line", label: "Recent or ongoing self-injury", sub: "Cutting, burning, or other self-injury — with or without suicidal intent" },
        { icon: "ri-emotion-line", label: "Intense emotional dysregulation", sub: "Mood swings, rage, or distress that feels unmanageable between sessions" },
        { icon: "ri-alarm-warning-line", label: "Safety concerns beyond weekly therapy", sub: "Families need more frequent clinical contact and structured safety monitoring" },
        { icon: "ri-eye-off-line", label: "Secrecy and shame blocking care", sub: "Teen hides behavior or resists outpatient therapy despite escalating concern" },
        { icon: "ri-repeat-line", label: "Repeated ER or crisis visits", sub: "Stepping down from hospitalization and needing structured outpatient support" },
      ],
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to a safety-focused care plan",
      description: "Intake includes a thorough safety assessment. Most families complete the process within 24–48 hours when clinically appropriate for IOP.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for Self-Harm",
      title: "More contact when urges and crises happen between sessions",
      rows: [
        { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
        { label: "Safety monitoring", standard: "Large gaps between visits", iop: "Frequent check-ins" },
        { label: "DBT skills practice", standard: "Homework only", iop: "Reinforced across sessions" },
        { label: "Family coaching", standard: "Occasional", iop: "Structured family track" },
        { label: "Crisis planning", standard: "Updated rarely", iop: "Living safety plans" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions we treat alongside self-harm",
      description: "Self-harm often co-occurs with mood, trauma, and anxiety conditions — our IOP integrates treatment across the full clinical picture.",
      items: [
        { label: "Online DBT", path: "/online-dialectical-behavioral-therapy", desc: "DBT is the gold-standard modality for self-harm and emotional dysregulation — central to our IOP model." },
        { label: "Teen depression", path: "/teen-depression-treatment", desc: "Hopelessness and self-harm frequently co-occur — integrated depression treatment in IOP." },
        { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma-related dysregulation may drive self-harm — trauma-informed care with paced safety planning." },
        { label: "Online anxiety treatment", path: "/online-anxiety-treatment", desc: "Anxiety and perfectionism often underlie self-injury — CBT and exposure work alongside DBT skills." },
        { label: "Family therapy", path: "/therapy/adolescent-family-therapy", desc: "Family sessions are essential for caregiver coaching and home safety support." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about self-harm treatment for teens" },
    faqs: [
      { q: "Does my teen need to stop self-harming before starting IOP?", a: "No. IOP exists to help teens reduce self-harm over time with skills and support — not as a prerequisite. We assess current safety and build a plan from where your teen is." },
      { q: "Is Virtual IOP safe for teens who self-harm?", a: "IOP is appropriate for many teens who need structured outpatient support and are not requiring 24/7 monitoring. We assess acuity at intake and refer to inpatient care when that level is clinically required." },
      { q: "Do you use DBT?", a: "Yes. Our IOP is DBT-informed — distress tolerance, emotion regulation, interpersonal effectiveness, and mindfulness are integrated in individual, group, and family sessions." },
      { q: "Will you tell me if my teen self-harms in session?", a: "We involve caregivers in safety planning and share information needed to keep your teen safe, within confidentiality limits explained at intake. Safety concerns always take priority." },
      { q: "What if my teen won't talk about self-harm?", a: "Resistance and shame are common. Our clinicians use motivational, non-judgmental approaches — building trust before expecting disclosure or skill practice." },
      { q: "What should I do in an emergency?", a: "If your teen is in immediate danger of suicide or serious injury, call 911 or go to the nearest emergency room. You can also text or call 988 for the Suicide & Crisis Lifeline." },
    ],
    cta: {
      title: "Get compassionate support for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's safety history, current treatment, and whether Virtual IOP is the right level of care.",
    },
  },

  "/conditions/school-avoidance": {
    path: "/conditions/school-avoidance",
    imageKey: "schoolAvoidance",
    metadata: {
      title: "School Avoidance Treatment for Teens | Virtual IOP",
      description:
        "Virtual IOP for adolescent school refusal and avoidance ages 12–17. Exposure planning, anxiety treatment, family coaching, and school coordination. Insurance accepted.",
    },
    hero: {
      eyebrow: `School Avoidance · Ages ${SITE.ages}`,
      headline: { before: "Help teens return to ", accent: "school", after: " with confidence" },
      body: "Intensive virtual support for school refusal and avoidance — treating underlying anxiety or mood drivers while building gradual, realistic re-entry plans with family and school alignment.",
      imageAlt: "Teen preparing for school re-entry with support from a virtual clinician and parent",
      stats: [
        { icon: "ri-school-line", label: "Focus", value: "Re-entry", unit: "planning" },
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-building-line", label: "School coordination" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
      ],
    },
    overview: {
      eyebrow: "School Avoidance & Refusal",
      title: "Clinical treatment plus a realistic return-to-school plan",
      paragraphs: [
        "School avoidance sits at the intersection of anxiety, mood, and family stress — not laziness or defiance. Punitive pressure often makes refusal worse; gradual exposure with clinical support works better.",
        "Virtual IOP treats the underlying drivers while coordinating caregivers and schools — so teens practice facing school-related fears with enough session frequency to make progress stick.",
      ],
      focusItems: [
        { label: "School refusal", icon: "ri-school-line" },
        { label: "Morning anxiety", icon: "ri-sun-line" },
        { label: "Exposure planning", icon: "ri-route-line" },
        { label: "Family & school alignment", icon: "ri-team-line" },
      ],
      bentoAlt: "Teen and parent reviewing a gradual school re-entry plan with a virtual clinician",
      calloutIcon: "ri-route-line",
      calloutTitle: "Gradual beats forced",
      calloutBody: "Re-entry plans are individualized — paced exposure and coping skills, not sudden full attendance demands that backfire.",
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we treat school avoidance in IOP",
      description: "We address clinical drivers and functional re-entry together — with family and school coordination when appropriate.",
      items: [
        { num: "01", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "Anxiety and mood treatment", body: "School avoidance is usually driven by treatable conditions — generalized anxiety, social anxiety, depression, or trauma-related avoidance.", bullets: ["CBT and exposure-based work", "Distress tolerance for morning transitions", "Mood stabilization when depression is present"] },
        { num: "02", icon: "ri-route-line", tag: "Exposure", title: "Gradual school re-entry planning", body: "Clinicians build step-by-step exposure hierarchies — from arriving at campus to full attendance — paced to your teen's capacity.", bullets: ["Individualized exposure ladders", "Homework between IOP sessions", "Celebrating effort, not perfection"] },
        { num: "03", icon: "ri-building-line", tag: "Coordination", title: "School and accommodation support", body: "We help families communicate with schools about 504/IEP support and realistic attendance plans during treatment.", bullets: ["Documentation support when appropriate", "Teacher communication scripts", "Hybrid or partial attendance when clinically indicated"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Caregiver coaching for mornings", body: "Family sessions address accommodation patterns — reducing reassurance rituals while supporting gradual approach.", bullets: ["Morning routine planning", "Reducing accommodation that maintains avoidance", "Aligning caregivers on consistent responses"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "When school avoidance needs IOP-level care",
      description: "IOP fits when refusal has persisted for weeks, grades are slipping, and weekly therapy has not stabilized attendance — especially when anxiety or mood symptoms are significant.",
      goodToKnow: "We treat the clinical drivers of avoidance — not school discipline issues alone. Virtual IOP keeps teens at home while building skills for re-entry; we coordinate with schools when families authorize it.",
      criteria: [
        { icon: "ri-calendar-close-line", label: "Repeated absences or tardiness", sub: "Missing full days, partial days, or chronic lateness tied to distress" },
        { icon: "ri-emotion-line", label: "Morning meltdowns or panic", sub: "Physical complaints, crying, or refusal behaviors before school" },
        { icon: "ri-alarm-warning-line", label: "Academic decline despite capability", sub: "Falling behind, incomplete work, or disengagement after avoidance patterns start" },
        { icon: "ri-home-line", label: "Home becoming the escape", sub: "Teen feels safe only at home — anxiety spikes around school conversations" },
        { icon: "ri-repeat-line", label: "Weekly therapy hasn't shifted patterns", sub: "Need for more frequent exposure coaching and family support" },
      ],
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to a school re-entry care plan",
      description: "Intake includes school history, avoidance timeline, and current providers. Most families complete the process within 24–48 hours.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for School Avoidance",
      title: "Enough contact to practice exposure between school days",
      rows: [
        { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
        { label: "Exposure practice", standard: "Limited coaching", iop: "Reinforced across sessions" },
        { label: "Family coaching", standard: "Occasional", iop: "Structured morning support" },
        { label: "School coordination", standard: "Uncommon", iop: "Available when needed" },
        { label: "Underlying treatment", standard: "Avoidance-focused only", iop: "Anxiety/mood integrated" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions behind school avoidance",
      description: "Avoidance rarely exists in isolation — these programs address common underlying drivers.",
      items: [
        { label: "Online anxiety treatment", path: "/online-anxiety-treatment", desc: "Anxiety-driven school refusal is one of the most common reasons teens enter our IOP." },
        { label: "Teen depression", path: "/teen-depression-treatment", desc: "Withdrawal and low motivation often present as school refusal — depression treatment is integrated." },
        { label: "ADHD treatment", path: "/adhd-treatment-for-teens", desc: "Academic frustration and executive function gaps can drive avoidance patterns." },
        { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma-related hypervigilance may make school environments feel unsafe." },
        { label: "Online CBT", path: "/online-cognitive-behavioral-therapy", desc: "Exposure-based CBT is central to school re-entry planning." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about school avoidance treatment" },
    faqs: [
      { q: "Will you force my teen to go to school?", a: "No. We use gradual exposure — building tolerance step by step with clinical support. Forced attendance without skills often increases avoidance long-term." },
      { q: "Can you coordinate with my teen's school?", a: "Yes, with family authorization. We help communicate about attendance plans, accommodations, and how school staff can support re-entry without reinforcing avoidance." },
      { q: "Is virtual IOP effective for school refusal?", a: "Yes — teens practice exposure and coping at home while building toward school re-entry. Many families prefer virtual IOP because it meets teens where they are during active avoidance." },
      { q: "What if my teen has been out of school for months?", a: "Long absences are common in severe avoidance. We assess functioning, treat underlying conditions, and build realistic re-entry timelines — often starting with partial attendance or hybrid plans." },
      { q: "Do you help with 504 or IEP plans?", a: "We support families with documentation and clinical information schools may need when accommodations are appropriate — we do not replace school-based evaluation teams." },
      { q: "What if anxiety isn't the only issue?", a: "We treat co-occurring depression, ADHD, trauma, and other conditions within IOP — school avoidance is addressed as part of the full clinical picture." },
    ],
    cta: {
      title: "Get help with school avoidance",
      description: "Free consultation, no obligation. We will discuss your teen's attendance history, underlying symptoms, and whether Virtual IOP is the right fit.",
    },
  },
};
