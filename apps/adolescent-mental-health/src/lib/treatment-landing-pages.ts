import { SITE } from "@/lib/site";

export type TreatmentLandingImageKey =
  | "depression"
  | "ptsd"
  | "anxiety"
  | "adhd"
  | "ocd"
  | "schizophrenia"
  | "psychiatrist";

export type TreatmentLandingPath =
  | "/teen-depression-treatment"
  | "/ptsd-treatment-online"
  | "/online-anxiety-treatment"
  | "/adhd-treatment-for-teens"
  | "/online-ocd-treatment"
  | "/schizophrenia-in-adolescence"
  | "/psychiatrist-for-teens";

export type TreatmentLandingConfig = {
  path: TreatmentLandingPath;
  imageKey: TreatmentLandingImageKey;
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
    focusLabel: string;
    focusItems: { label: string; detail: string; icon: string }[];
    bentoAlt: string;
    calloutIcon: string;
    calloutTitle: string;
    calloutBody: string;
    stats: { icon: string; value: string; label: string }[];
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
    ctaTitle: string;
    ctaBody: string;
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
  { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Share your teen's symptoms, prior treatment, and current providers — no obligation." },
  { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "A licensed clinician evaluates safety, functioning, and whether Virtual IOP is clinically appropriate." },
  { num: "03", icon: "ri-calendar-check-line", title: "Personalized care plan", body: "We build an individualized plan with therapy modalities, family involvement, and coordination with outside prescribers." },
  { num: "04", icon: "ri-video-chat-line", title: "Begin Virtual IOP", body: "Your teen starts individual, group, and family sessions — with frequent clinical contact built into the program." },
];

const defaultComparisonRows = [
  { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
  { label: "Skills practice", standard: "Between sessions only", iop: "Reinforced across sessions" },
  { label: "Family involvement", standard: "Rare or optional", iop: "Structured family track" },
  { label: "Safety monitoring", standard: "Large gaps between contact", iop: "Frequent check-ins" },
  { label: "School coordination", standard: "Uncommon", iop: "Available when needed" },
];

const defaultOverviewStats = [
  { icon: "ri-user-heart-line", value: SITE.ages, label: "Ages served" },
  { icon: "ri-time-line", value: "9–20h", label: "Clinical hours / week" },
  { icon: "ri-links-line", value: "Integrated", label: "Therapy + coordination" },
];

export const TREATMENT_LANDING_PAGES: Record<TreatmentLandingPath, TreatmentLandingConfig> = {
  "/teen-depression-treatment": {
    path: "/teen-depression-treatment",
    imageKey: "depression",
    metadata: {
      title: "Teen Depression Treatment | Virtual IOP for Adolescents",
      description:
        "Virtual depression treatment for teens ages 12–17. Behavioral activation, CBT, family therapy, and structured IOP support. Insurance accepted.",
    },
    hero: {
      eyebrow: `Teen Depression Treatment · Ages ${SITE.ages}`,
      headline: { before: "Teen depression treatment ", accent: "when low mood won't lift" },
      body: "Intensive outpatient support for adolescents with persistent sadness, withdrawal, and loss of interest — combining behavioral activation, CBT, peer support, and caregiver coaching in a structured virtual program.",
      imageAlt: "Teen connecting with a compassionate clinician during a virtual depression therapy session",
      stats: [
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-team-line", label: "Family", value: "Included", unit: "track" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-emotion-line", label: "Safety-focused" },
      ],
    },
    overview: {
      eyebrow: "What Is Teen Depression Treatment?",
      title: "Structured support to rebuild routines, connection, and hope",
      paragraphs: [
        "Adolescent depression often needs more than weekly therapy. When low mood, fatigue, and withdrawal persist, teens benefit from frequent clinical contact, behavioral activation, and family partnership — delivered consistently in a virtual format.",
        "Our Virtual IOP provides the intensive structure adolescents with depression need — without a residential stay — through multiple sessions per week with licensed clinicians and a dedicated family track.",
      ],
      focusLabel: "Symptoms we address",
      focusItems: [
        { label: "Persistent low mood", detail: "Sadness, irritability, or emotional numbness lasting weeks", icon: "ri-emotion-sad-line" },
        { label: "Loss of interest", detail: "Withdrawal from friends, hobbies, school, or activities", icon: "ri-user-unfollow-line" },
        { label: "Sleep & energy changes", detail: "Oversleeping, insomnia, fatigue, or appetite shifts", icon: "ri-moon-line" },
        { label: "Cognitive symptoms", detail: "Hopelessness, guilt, concentration problems, or self-criticism", icon: "ri-brain-line" },
      ],
      bentoAlt: "Teen and parent reviewing mood and activity goals together during virtual depression care",
      calloutIcon: "ri-team-line",
      calloutTitle: "Family is part of the clinical team",
      calloutBody: "Caregivers learn to support behavioral activation, recognize warning signs, and respond effectively — reducing isolation at home.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we treat adolescent depression",
      description: "Each pillar targets a different driver of depression — from behavioral patterns to family dynamics to safety planning.",
      items: [
        { num: "01", icon: "ri-walk-line", tag: "Activation", title: "Behavioral activation and routine rebuilding", body: "Depression often shrinks a teen's world. We help adolescents gradually re-engage with meaningful activities, social connection, and daily structure — paced to their capacity.", bullets: ["Activity scheduling and goal-setting", "Gradual exposure to avoided situations", "Sleep and hygiene routine support"] },
        { num: "02", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "CBT for negative thinking patterns", body: "Cognitive behavioral therapy helps teens identify and challenge unhelpful thoughts, reduce rumination, and build coping skills for low-mood episodes.", bullets: ["Thought challenging and cognitive restructuring", "Problem-solving for school and social stress", "Relapse prevention planning"] },
        { num: "03", icon: "ri-group-line", tag: "Peer support", title: "Group therapy for connection and skills", body: "Peer groups reduce isolation and normalize the experience of depression — while providing a structured space to practice interpersonal and emotion-regulation skills.", bullets: ["Psychoeducation in a peer context", "Skills practice with adolescent peers", "Reduced shame through shared experience"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Caregiver coaching and family sessions", body: "Families learn how to support recovery without enabling withdrawal — balancing empathy with encouragement toward re-engagement.", bullets: ["Communication strategies for low-motivation days", "Safety planning when depression escalates", "Coordination with school and outside prescribers"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "Signs your teen may need depression-specific IOP care",
      description: "Depression in teens is often dismissed as normal adolescence. If these patterns persist and affect daily life, a clinical assessment can clarify the right level of care.",
      goodToKnow: "IOP is appropriate for stable teens who do not require hospitalization. We assess safety at intake and will refer to a higher level of care if inpatient stabilization is needed first.",
      criteria: [
        { icon: "ri-emotion-sad-line", label: "Persistent low mood or irritability", sub: "Sadness, numbness, or irritability lasting more than two weeks and affecting daily life" },
        { icon: "ri-user-unfollow-line", label: "Withdrawal from friends and activities", sub: "Loss of interest in things they used to enjoy, social isolation, or staying in their room" },
        { icon: "ri-school-line", label: "School performance declining", sub: "Missed assignments, falling grades, or frequent absences tied to mood" },
        { icon: "ri-alarm-warning-line", label: "Safety concerns or self-harm thoughts", sub: "Hopelessness, suicidal ideation, or self-harm that needs more frequent monitoring" },
        { icon: "ri-repeat-line", label: "Outpatient therapy isn't enough", sub: "Symptoms persist or worsen despite weekly therapy or medication trials" },
      ],
      ctaTitle: "Walk us through what your teen has been experiencing",
      ctaBody: "We will listen to the history, explain what clinical assessment involves, and tell you honestly whether IOP is the right fit — or whether a different level of care is needed first.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to a coordinated depression care plan",
      description: "We move quickly — most families complete intake within 24–48 hours. We coordinate with prescribers and schools when needed from day one.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for Depression",
      title: "More contact than standard outpatient allows",
      rows: defaultComparisonRows,
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions we address alongside depression",
      description: "Depression rarely presents alone. Our IOP treats the full clinical picture — not just the primary diagnosis.",
      items: [
        { label: "Anxiety", path: "/online-anxiety-treatment", desc: "Anxiety and depression frequently co-occur in teens — integrated treatment addresses both." },
        { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma history often underlies adolescent depression and requires trauma-informed care." },
        { label: "Self-harm", path: "/conditions/self-harm", desc: "Self-harming behavior during depressive episodes requires safety planning central to our model." },
        { label: "Bipolar disorder", path: "/online-bipolar-treatment", desc: "Depressive episodes may be part of bipolar disorder — accurate diagnosis matters for treatment." },
        { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Depression-driven school refusal needs clinical support alongside gradual re-entry planning." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about teen depression treatment" },
    faqs: [
      { q: "How is teen depression different from normal mood swings?", a: "Clinical depression involves persistent symptoms — low mood, loss of interest, sleep or appetite changes, fatigue, or hopelessness — lasting two weeks or more and significantly affecting school, relationships, or daily functioning. Normal adolescent moodiness is typically brief and tied to specific events." },
      { q: "Does Virtual IOP work for teen depression?", a: "Yes. Research supports intensive outpatient care for adolescent depression when symptoms are moderate to severe. Virtual delivery removes transportation barriers and lets teens practice skills in their home environment between sessions." },
      { q: "Will my teen have to leave home for treatment?", a: "No. Our Virtual IOP is fully remote — teens attend individual, group, and family sessions from home via secure video. This model works well for teens who are withdrawn or struggling with school attendance." },
      { q: "Do you prescribe medication for depression?", a: "We provide therapy and clinical coordination. Prescribing decisions belong with your teen's psychiatrist or medical provider. We communicate with prescribers about symptom patterns and treatment response." },
      { q: "What if my teen has suicidal thoughts?", a: "We assess safety at intake and maintain ongoing safety monitoring throughout IOP. Teens with active suicidal ideation requiring 24/7 monitoring need inpatient care first — we will recommend the appropriate level and facilitate transition." },
      { q: "How quickly can my teen start?", a: "Most families complete intake within 24–48 hours of the first call. We prioritize teens whose symptoms are affecting safety or school functioning." },
    ],
    cta: {
      title: "Get structured depression care for your teen",
      description: "Free consultation, no obligation. We will discuss symptoms, safety, and whether our Virtual IOP is clinically appropriate — or help you find the right level of care if it isn't.",
    },
  },

  "/ptsd-treatment-online": {
    path: "/ptsd-treatment-online",
    imageKey: "ptsd",
    metadata: {
      title: "PTSD Treatment Online for Teens | Virtual Trauma-Informed IOP",
      description:
        "Online PTSD and trauma treatment for adolescents ages 12–17. Trauma-informed CBT, stabilization skills, and family support in a secure virtual IOP. Insurance accepted.",
    },
    hero: {
      eyebrow: `PTSD Treatment Online · Ages ${SITE.ages}`,
      headline: { before: "Trauma-informed care ", accent: "for teens healing from PTSD" },
      body: "Virtual IOP for adolescents processing trauma, PTSD, or adverse experiences — combining paced stabilization, trauma-informed CBT, safety planning, and family support in a HIPAA-compliant setting.",
      imageAlt: "Teen in a safe, supportive virtual trauma-informed therapy environment at home",
      stats: [
        { icon: "ri-shield-flash-line", label: "Approach", value: "Trauma", unit: "informed" },
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-lock-line", label: "HIPAA compliant" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
      ],
    },
    overview: {
      eyebrow: "What Is Online PTSD Treatment?",
      title: "Paced, relational trauma care — at home, with your family",
      paragraphs: [
        "Adolescent trauma and PTSD require careful pacing, strong safety planning, and enough clinical contact to stabilize symptoms without overwhelming the teen. Weekly therapy alone may not provide sufficient support during acute recovery.",
        "Our Virtual IOP delivers trauma-informed care in a familiar environment — with frequent clinician contact, structured skills work, and family involvement to support healing without re-traumatization.",
      ],
      focusLabel: "Trauma symptoms we address",
      focusItems: [
        { label: "Intrusive memories", detail: "Flashbacks, nightmares, or unwanted trauma reminders", icon: "ri-eye-line" },
        { label: "Hypervigilance", detail: "Startle response, constant alertness, or difficulty feeling safe", icon: "ri-alarm-warning-line" },
        { label: "Avoidance", detail: "Steering clear of reminders, places, people, or conversations", icon: "ri-forbid-line" },
        { label: "Emotional dysregulation", detail: "Mood swings, dissociation, shutdown, or difficulty trusting others", icon: "ri-contrast-2-line" },
      ],
      bentoAlt: "Teen practicing grounding skills during a virtual trauma-informed therapy session with clinician",
      calloutIcon: "ri-shield-flash-line",
      calloutTitle: "Safety and pacing come first",
      calloutBody: "We stabilize symptoms before deeper processing work — always paced to your teen's readiness and never pushing beyond what feels safe.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we support teens healing from trauma",
      description: "Trauma treatment follows a phased approach — stabilization before processing, with family and safety systems integrated throughout.",
      items: [
        { num: "01", icon: "ri-shield-check-line", tag: "Stabilization", title: "Safety planning and grounding skills", body: "Before any trauma processing, teens learn grounding, distress tolerance, and safety strategies to manage flashbacks, dissociation, and emotional overwhelm.", bullets: ["Grounding and containment techniques", "Personalized safety and crisis plans", "Sleep and arousal regulation skills"] },
        { num: "02", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "Trauma-informed CBT and skills work", body: "Clinicians use evidence-based approaches adapted for adolescents — helping teens understand trauma responses, challenge unhelpful beliefs, and gradually reduce avoidance.", bullets: ["Psychoeducation about trauma and the nervous system", "Cognitive restructuring for trauma-related thoughts", "Gradual exposure when clinically appropriate"] },
        { num: "03", icon: "ri-group-line", tag: "Peer support", title: "Trauma-informed group therapy", body: "Peer groups provide connection with others who understand — reducing isolation and shame while practicing interpersonal skills in a clinically supervised setting.", bullets: ["Shared experience without pressure to disclose", "Skills practice in a supportive peer context", "Reduced sense of being 'different' or alone"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Caregiver education and family sessions", body: "Families learn about trauma responses, how to support recovery at home, and how to avoid inadvertently triggering or minimizing their teen's experience.", bullets: ["Trauma psychoeducation for caregivers", "Communication strategies for difficult moments", "Coordination with schools and outside providers"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "Signs your teen may need trauma-specific IOP care",
      description: "Trauma symptoms in teens are sometimes misattributed to behavioral problems or mood disorders. A clinical assessment can clarify whether PTSD or trauma-related symptoms are driving current difficulties.",
      goodToKnow: "IOP is appropriate for medically and psychiatrically stable teens. We assess acuity at intake and will recommend inpatient or residential care if 24/7 monitoring is clinically indicated.",
      criteria: [
        { icon: "ri-eye-line", label: "Flashbacks or intrusive memories", sub: "Unwanted trauma reminders, nightmares, or feeling like the event is happening again" },
        { icon: "ri-alarm-warning-line", label: "Hypervigilance or startle response", sub: "Constant alertness, exaggerated startle, or difficulty feeling safe anywhere" },
        { icon: "ri-forbid-line", label: "Avoidance of reminders", sub: "Avoiding places, people, activities, or conversations connected to the trauma" },
        { icon: "ri-emotion-line", label: "Emotional shutdown or dysregulation", sub: "Numbness, dissociation, mood swings, or difficulty trusting others after trauma" },
        { icon: "ri-repeat-line", label: "Symptoms persist despite outpatient care", sub: "Trauma-related symptoms continue to disrupt school, sleep, or relationships" },
      ],
      ctaTitle: "Share your teen's story — we will listen without judgment",
      ctaBody: "We will explain our trauma-informed approach, assess whether Virtual IOP is appropriate, and connect you with the right level of care if more intensive support is needed.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to a trauma-informed care plan",
      description: "We move carefully and quickly — most families complete intake within 24–48 hours. Trauma history is gathered sensitively with teen and caregiver input.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for Trauma",
      title: "Enough contact to stabilize without residential care",
      rows: [
        { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
        { label: "Stabilization support", standard: "Limited between sessions", iop: "Skills reinforced daily" },
        { label: "Safety monitoring", standard: "Large gaps between contact", iop: "Frequent check-ins" },
        { label: "Family involvement", standard: "Rare or optional", iop: "Structured family track" },
        { label: "Processing pace", standard: "Variable", iop: "Clinically phased approach" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions we address alongside trauma and PTSD",
      description: "Trauma rarely exists in isolation. Our IOP integrates treatment for co-occurring conditions common in trauma survivors.",
      items: [
        { label: "Depression", path: "/teen-depression-treatment", desc: "Trauma-related depression is common in adolescents and requires integrated treatment planning." },
        { label: "Anxiety", path: "/online-anxiety-treatment", desc: "Hypervigilance and avoidance in PTSD overlap significantly with anxiety disorders." },
        { label: "Self-harm", path: "/conditions/self-harm", desc: "Self-harm may develop as a coping response to trauma — DBT skills and safety planning are central." },
        { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Trauma can drive school refusal — we coordinate gradual re-entry alongside clinical treatment." },
        { label: "Online anxiety treatment", path: "/online-anxiety-treatment", desc: "Social anxiety and generalized worry often co-occur with trauma in teens." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about online PTSD treatment for teens" },
    faqs: [
      { q: "Can teens develop PTSD?", a: "Yes. Adolescents can develop PTSD after single-incident trauma, chronic adversity, abuse, accidents, or loss. Symptoms may present differently than in adults — including irritability, behavioral problems, or school refusal rather than classic flashbacks." },
      { q: "Is virtual trauma therapy safe for teens?", a: "Virtual delivery can be effective and less disruptive for trauma recovery — teens remain in a familiar environment with family nearby. We use HIPAA-compliant platforms and assess whether virtual care is appropriate for each teen's acuity." },
      { q: "Will my teen have to talk about the trauma right away?", a: "No. We follow a phased approach — stabilization and safety skills come first. Trauma processing only begins when your teen is ready and clinically stable enough to engage without re-traumatization." },
      { q: "How do you handle flashbacks during virtual sessions?", a: "Clinicians are trained in grounding and containment techniques. Sessions include safety protocols, and teens learn skills to manage dysregulation both during and between sessions." },
      { q: "Do you work with teens who have complex trauma?", a: "Yes. Our clinicians are experienced with single-incident and complex trauma presentations. We pace treatment to the individual and coordinate with outside providers when additional specialty care is needed." },
      { q: "What if my teen needs more than IOP?", a: "If a teen requires 24/7 monitoring or inpatient stabilization, we facilitate transition to the appropriate level of care and maintain family communication throughout." },
    ],
    cta: {
      title: "Get trauma-informed care for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's experience, safety, and whether our Virtual IOP is clinically appropriate — at a pace that respects their readiness.",
    },
  },

  "/online-anxiety-treatment": {
    path: "/online-anxiety-treatment",
    imageKey: "anxiety",
    metadata: {
      title: "Online Anxiety Treatment for Teens | Virtual IOP",
      description:
        "Virtual anxiety treatment for adolescents ages 12–17. CBT, exposure therapy, DBT skills, and family support in structured IOP. Insurance accepted.",
    },
    hero: {
      eyebrow: `Online Anxiety Treatment · Ages ${SITE.ages}`,
      headline: { before: "Virtual anxiety treatment ", accent: "that fits real teen life" },
      body: "Intensive outpatient support for teens with persistent worry, panic, social anxiety, and school-related stress — combining CBT, exposure-based work, DBT skills, and family coaching in a structured virtual program.",
      imageAlt: "Teen practicing calm breathing during a virtual anxiety therapy session at home",
      stats: [
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-focus-3-line", label: "Methods", value: "CBT", unit: "+ exposure" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-school-line", label: "School coordination" },
      ],
    },
    overview: {
      eyebrow: "What Is Online Anxiety Treatment?",
      title: "Evidence-based anxiety care — structured, frequent, and virtual",
      paragraphs: [
        "Anxiety disorders are among the most common mental health conditions in adolescents — and among the most treatable. When worry, panic, or avoidance disrupt school, sleep, or social life, teens need more contact than weekly therapy provides.",
        "Our Virtual IOP delivers CBT, exposure work, and DBT skills with multiple sessions per week — so teens practice coping in real-world settings between sessions, with family support built in.",
      ],
      focusLabel: "Anxiety presentations we treat",
      focusItems: [
        { label: "Generalized worry", detail: "Persistent worry about school, friendships, health, or the future", icon: "ri-question-line" },
        { label: "Social anxiety", detail: "Fear of judgment, avoidance of social situations, or performance anxiety", icon: "ri-group-line" },
        { label: "Panic symptoms", detail: "Racing heart, shortness of breath, dizziness, or fear of panic attacks", icon: "ri-heart-pulse-line" },
        { label: "Avoidance patterns", detail: "Skipping classes, activities, or situations that trigger anxiety", icon: "ri-forbid-line" },
      ],
      bentoAlt: "Teen working through exposure exercises with clinician support during virtual anxiety therapy",
      calloutIcon: "ri-focus-3-line",
      calloutTitle: "Skills practiced between sessions",
      calloutBody: "Virtual IOP lets teens apply exposure and coping skills in their actual home and school environments — not just in a clinic.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we treat anxiety in adolescents",
      description: "Anxiety treatment targets the cycle of worry, avoidance, and physical symptoms — with skills reinforced across individual, group, and family sessions.",
      items: [
        { num: "01", icon: "ri-brain-line", tag: "Core therapy", title: "CBT for anxious thinking patterns", body: "Cognitive behavioral therapy helps teens identify worry cycles, challenge catastrophic thinking, and build more balanced perspectives on feared situations.", bullets: ["Thought challenging and worry time techniques", "Cognitive restructuring for perfectionism", "Problem-solving for real-world stressors"] },
        { num: "02", icon: "ri-walk-line", tag: "Exposure", title: "Gradual exposure and approach behaviors", body: "Avoidance maintains anxiety. We use paced, supported exposure — in virtual and real-world settings — to help teens reclaim activities and situations they've been avoiding.", bullets: ["Graded exposure hierarchies", "In-vivo and imaginal exposure techniques", "School and social re-engagement planning"] },
        { num: "03", icon: "ri-heart-pulse-line", tag: "Regulation", title: "DBT skills for distress tolerance", body: "When anxiety spikes, teens need tools to manage physical symptoms and emotional overwhelm without avoidance or escape behaviors.", bullets: ["Breathing and grounding techniques", "Distress tolerance for panic moments", "Mindfulness for present-moment awareness"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Caregiver coaching and accommodation reduction", body: "Family accommodation — well-intentioned reassurance or avoidance of triggers — can maintain anxiety. We coach caregivers on supportive responses that promote recovery.", bullets: ["Reducing accommodation behaviors at home", "Communication strategies for anxious teens", "School coordination for attendance support"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "Signs your teen may need anxiety-specific IOP care",
      description: "Anxiety in teens is often normalized as stress or shyness. When it consistently disrupts functioning, structured intensive care can break the avoidance cycle faster than weekly therapy alone.",
      goodToKnow: "IOP is appropriate for stable teens whose anxiety is significantly affecting school, social life, or daily functioning. We assess acuity at intake and recommend higher levels of care when clinically indicated.",
      criteria: [
        { icon: "ri-question-line", label: "Constant worry or rumination", sub: "Persistent worry about school, friendships, health, or future events that is hard to control" },
        { icon: "ri-heart-pulse-line", label: "Panic attacks or physical symptoms", sub: "Racing heart, difficulty breathing, dizziness, or sleep disruption tied to anxiety" },
        { icon: "ri-forbid-line", label: "Avoidance of classes or activities", sub: "Skipping school, social events, or activities due to fear or worry" },
        { icon: "ri-star-line", label: "Perfectionism or reassurance-seeking", sub: "Excessive checking, redoing work, or needing constant reassurance from parents or teachers" },
        { icon: "ri-repeat-line", label: "Weekly therapy isn't reducing symptoms", sub: "Anxiety continues to escalate despite outpatient treatment or medication" },
      ],
      ctaTitle: "Tell us what's been happening — we'll help you understand next steps",
      ctaBody: "We will assess symptom severity, explain our approach, and recommend Virtual IOP or an alternative level of care based on your teen's clinical needs.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to an anxiety-focused care plan",
      description: "Most families complete intake within 24–48 hours. We gather anxiety history, avoidance patterns, and school impact from the first conversation.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for Anxiety",
      title: "Break the avoidance cycle with frequent contact",
      rows: defaultComparisonRows,
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions we address alongside anxiety",
      description: "Anxiety frequently co-occurs with other conditions in adolescents. Our IOP integrates treatment across the full clinical picture.",
      items: [
        { label: "Depression", path: "/teen-depression-treatment", desc: "Anxiety and depression co-occur in most teens — integrated treatment addresses both." },
        { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Anxiety-driven school refusal is one of the most common reasons teens enter our IOP." },
        { label: "OCD", path: "/online-ocd-treatment", desc: "OCD is an anxiety-related disorder requiring specialized exposure and response prevention." },
        { label: "Trauma & PTSD", path: "/ptsd-treatment-online", desc: "Trauma-related hypervigilance and avoidance overlap significantly with anxiety presentations." },
        { label: "ADHD", path: "/adhd-treatment-for-teens", desc: "ADHD and anxiety frequently co-occur — executive function support complements anxiety treatment." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about online anxiety treatment for teens" },
    faqs: [
      { q: "What types of anxiety do you treat?", a: "We treat generalized anxiety disorder, social anxiety, panic disorder, specific phobias, and anxiety related to school, separation, or performance. Many teens present with mixed anxiety symptoms rather than a single diagnosis." },
      { q: "Does exposure therapy work virtually?", a: "Yes. Virtual IOP is well-suited for exposure work — teens practice skills in their actual home, school, and social environments between sessions, with clinician support and family coaching." },
      { q: "Will treatment make my teen's anxiety worse before it gets better?", a: "Exposure-based treatment can temporarily increase anxiety as teens approach feared situations. We pace exposure carefully and teach distress tolerance skills so teens feel supported throughout — never pushed beyond their capacity." },
      { q: "How do you help with school-related anxiety?", a: "We coordinate with families and schools on attendance plans, accommodations, and gradual re-entry when avoidance has taken hold. School coordination is a core part of our anxiety treatment model." },
      { q: "Can my teen do IOP while taking anxiety medication?", a: "Yes. Therapy and medication often work best together for moderate to severe anxiety. We coordinate with your teen's prescriber and do not manage medications directly." },
      { q: "How is IOP different from seeing a therapist once a week?", a: "IOP provides multiple clinical contacts per week — individual, group, and family sessions — allowing skills to be practiced and reinforced much more frequently than weekly outpatient therapy allows." },
    ],
    cta: {
      title: "Get structured anxiety care for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's anxiety patterns, avoidance, and whether Virtual IOP is the right fit — or connect you with appropriate alternatives.",
    },
  },

  "/adhd-treatment-for-teens": {
    path: "/adhd-treatment-for-teens",
    imageKey: "adhd",
    metadata: {
      title: "ADHD Treatment for Teens | Virtual Skills-Based IOP",
      description:
        "Virtual ADHD treatment for adolescents ages 12–17. Executive function coaching, emotional regulation, CBT, and family support. Coordinates with outside prescribers. Insurance accepted.",
    },
    hero: {
      eyebrow: `ADHD Treatment for Teens · Ages ${SITE.ages}`,
      headline: { before: "Skills-based ADHD care ", accent: "for focus and executive function" },
      body: "Virtual IOP helping teens with ADHD build organization, emotional regulation, and academic strategies — alongside any existing medication management from outside providers.",
      imageAlt: "Teen using structured planning tools during a virtual ADHD skills session",
      stats: [
        { icon: "ri-focus-3-line", label: "Focus", value: "Skills", unit: "based" },
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-capsule-line", label: "Prescriber coordination" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
      ],
    },
    overview: {
      eyebrow: "What Is ADHD Treatment for Teens?",
      title: "Executive function support that goes beyond medication alone",
      paragraphs: [
        "ADHD in adolescence affects more than attention — it impacts emotional regulation, organization, academic performance, and family relationships. Medication helps many teens, but skills-based therapy provides the tools to manage ADHD day-to-day.",
        "Our Virtual IOP integrates behavioral coaching, CBT for emotional dysregulation, and family sessions to align school, home, and clinical goals — without replacing your teen's prescriber.",
      ],
      focusLabel: "ADHD challenges we address",
      focusItems: [
        { label: "Attention & focus", detail: "Difficulty sustaining attention, completing tasks, or following through", icon: "ri-focus-3-line" },
        { label: "Executive function", detail: "Disorganization, missed deadlines, poor time management, or lost materials", icon: "ri-calendar-check-line" },
        { label: "Emotional reactivity", detail: "Impulsivity, frustration, mood swings, or conflict at home and school", icon: "ri-emotion-line" },
        { label: "Academic impact", detail: "Underperformance despite capability, procrastination, or homework battles", icon: "ri-book-open-line" },
      ],
      bentoAlt: "Teen organizing school materials with clinician guidance during virtual ADHD coaching session",
      calloutIcon: "ri-capsule-line",
      calloutTitle: "We coordinate — we don't prescribe",
      calloutBody: "Medication decisions stay with your teen's prescriber. Our role is therapy, skills coaching, and communicating about what's working.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we support teens with ADHD",
      description: "ADHD treatment in IOP addresses executive function, emotional regulation, and family systems — not just attention symptoms.",
      items: [
        { num: "01", icon: "ri-calendar-check-line", tag: "Coaching", title: "Executive function and organization skills", body: "Teens learn practical systems for time management, task initiation, planning, and follow-through — adapted to their learning style and school demands.", bullets: ["Planner and scheduling systems", "Task breakdown and prioritization", "Environment and distraction management"] },
        { num: "02", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "CBT for emotional dysregulation", body: "Many teens with ADHD struggle with frustration tolerance, impulsivity, and emotional reactivity. CBT helps build awareness and regulation strategies.", bullets: ["Impulse control and pause techniques", "Frustration tolerance and anger management", "Self-monitoring and reflection skills"] },
        { num: "03", icon: "ri-group-line", tag: "Peer support", title: "ADHD-informed group therapy", body: "Peer groups normalize the ADHD experience, reduce shame, and provide a structured space to practice social and organizational skills.", bullets: ["Shared experience with adolescent peers", "Accountability and goal-check structures", "Social skills in a supportive setting"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Caregiver coaching and school alignment", body: "Families learn ADHD-informed parenting strategies — reducing conflict around homework, chores, and follow-through while supporting independence.", bullets: ["ADHD psychoeducation for caregivers", "Home systems and routine building", "School coordination and accommodation support"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "Signs your teen may need ADHD-specific IOP care",
      description: "ADHD-related frustration, academic failure patterns, or emotional dysregulation may need more support than occasional coaching or weekly therapy — especially during adolescence when demands increase.",
      goodToKnow: "We do not diagnose ADHD or prescribe stimulant medication. We provide therapy and skills coaching, and coordinate with your teen's existing prescriber when medication is part of their treatment plan.",
      criteria: [
        { icon: "ri-focus-3-line", label: "Difficulty sustaining attention or completing tasks", sub: "Starting but not finishing work, losing focus mid-task, or needing constant redirection" },
        { icon: "ri-flashlight-line", label: "Impulsivity or emotional reactivity", sub: "Acting without thinking, mood swings, or conflict triggered by frustration" },
        { icon: "ri-calendar-line", label: "Chronic disorganization", sub: "Missed deadlines, lost materials, poor time management, or messy spaces despite effort" },
        { icon: "ri-school-line", label: "Academic underperformance", sub: "Grades don't reflect capability — procrastination, incomplete work, or homework battles" },
        { icon: "ri-repeat-line", label: "Medication alone isn't enough", sub: "Stimulant medication helps focus but emotional regulation or organization problems persist" },
      ],
      ctaTitle: "Let's talk about what's happening at home and school",
      ctaBody: "We will assess ADHD-related functioning, explain our skills-based approach, and recommend Virtual IOP or alternative support based on your teen's needs.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to an ADHD-focused care plan",
      description: "Most families complete intake within 24–48 hours. We gather ADHD history, school impact, and current medication management from the first conversation.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for ADHD",
      title: "Skills reinforced across multiple weekly sessions",
      rows: [
        { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
        { label: "Skills practice", standard: "Between sessions only", iop: "Reinforced across sessions" },
        { label: "Family coaching", standard: "Occasional", iop: "Structured family track" },
        { label: "School coordination", standard: "Uncommon", iop: "Available when needed" },
        { label: "Emotional regulation", standard: "Limited focus", iop: "Integrated CBT + coaching" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions we address alongside ADHD",
      description: "ADHD rarely presents alone in adolescents. Our IOP integrates treatment for common co-occurring conditions.",
      items: [
        { label: "Anxiety", path: "/online-anxiety-treatment", desc: "Anxiety and ADHD co-occur frequently — worry and perfectionism often accompany executive function challenges." },
        { label: "Depression", path: "/teen-depression-treatment", desc: "Repeated academic failure and frustration can lead to secondary depression in teens with ADHD." },
        { label: "Bipolar disorder", path: "/online-bipolar-treatment", desc: "ADHD and bipolar symptoms overlap — accurate diagnosis guides appropriate treatment." },
        { label: "School avoidance", path: "/conditions/school-avoidance", desc: "Academic frustration and failure patterns can drive school refusal in teens with ADHD." },
        { label: "Individual therapy", path: "/therapy/individual-therapy-for-teens", desc: "One-on-one sessions are a core component of our ADHD treatment model." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about ADHD treatment for teens" },
    faqs: [
      { q: "Do you diagnose ADHD?", a: "Our clinicians assess ADHD-related functioning as part of intake but do not provide standalone ADHD diagnostic evaluations. We coordinate with prior evaluators and refer for formal testing when needed." },
      { q: "Do you prescribe ADHD medication?", a: "No. We provide therapy and skills coaching. Medication management stays with your teen's psychiatrist, pediatrician, or prescriber. We communicate with prescribers about treatment response and symptom patterns." },
      { q: "Can my teen be in IOP while on stimulant medication?", a: "Yes — this is common. Therapy and skills coaching complement medication by addressing executive function, emotional regulation, and family dynamics that medication alone doesn't target." },
      { q: "How is IOP different from ADHD coaching?", a: "IOP provides comprehensive clinical care — individual therapy, group sessions, family work, and safety monitoring — not just organizational coaching. It's appropriate when ADHD-related symptoms are affecting mood, relationships, or school functioning beyond what coaching addresses." },
      { q: "Do you help with school accommodations?", a: "Yes. We coordinate with families and schools on 504 plans, IEP support, and academic strategies — helping teens access the accommodations they need while building independent skills." },
      { q: "What if my teen refuses to participate?", a: "Adolescent resistance is common, especially with ADHD. Our clinicians use motivational approaches and meet teens where they are — building engagement gradually rather than forcing participation." },
    ],
    cta: {
      title: "Get skills-based ADHD care for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's challenges, current treatment, and whether Virtual IOP is the right fit — or connect you with appropriate alternatives.",
    },
  },

  "/online-ocd-treatment": {
    path: "/online-ocd-treatment",
    imageKey: "ocd",
    metadata: {
      title: "Online OCD Treatment for Teens | Virtual ERP-Based IOP",
      description:
        "Virtual OCD treatment for adolescents ages 12–17. Exposure and response prevention, CBT, family coaching, and structured IOP. Insurance accepted.",
    },
    hero: {
      eyebrow: `Online OCD Treatment · Ages ${SITE.ages}`,
      headline: { before: "Virtual OCD treatment ", accent: "with exposure and response prevention" },
      body: "Intensive outpatient support for teens with obsessive-compulsive disorder — combining ERP, CBT, family coaching to reduce accommodation, and structured virtual sessions multiple days per week.",
      imageAlt: "Teen working through OCD exposure exercises with supportive clinician during virtual therapy session",
      stats: [
        { icon: "ri-repeat-line", label: "Method", value: "ERP", unit: "focused" },
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-focus-3-line", label: "ERP-trained" },
      ],
    },
    overview: {
      eyebrow: "What Is Online OCD Treatment?",
      title: "Gold-standard ERP delivered with enough frequency to work",
      paragraphs: [
        "Obsessive-compulsive disorder in teens often involves intrusive thoughts, compulsive rituals, and family accommodation that maintains the cycle. Weekly therapy may not provide enough ERP practice to break entrenched patterns.",
        "Our Virtual IOP delivers exposure and response prevention with multiple sessions per week — so teens practice resisting compulsions in real environments with clinician and family support.",
      ],
      focusLabel: "OCD presentations we treat",
      focusItems: [
        { label: "Intrusive thoughts", detail: "Unwanted, distressing thoughts about harm, contamination, or morality", icon: "ri-brain-line" },
        { label: "Compulsive rituals", detail: "Checking, washing, counting, repeating, or mental compulsions", icon: "ri-repeat-line" },
        { label: "Avoidance patterns", detail: "Steering clear of triggers, people, or situations that activate OCD", icon: "ri-forbid-line" },
        { label: "Family accommodation", detail: "Caregivers participating in rituals or modifying routines to reduce distress", icon: "ri-team-line" },
      ],
      bentoAlt: "Teen and parent learning to reduce OCD accommodation behaviors during virtual family session",
      calloutIcon: "ri-repeat-line",
      calloutTitle: "ERP is the gold standard for OCD",
      calloutBody: "Exposure and response prevention is the most evidence-based treatment for OCD — and IOP frequency makes it significantly more effective than weekly sessions alone.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we treat OCD in adolescents",
      description: "OCD treatment targets the obsession-compulsion cycle — with ERP as the core intervention and family accommodation reduction as a critical support.",
      items: [
        { num: "01", icon: "ri-repeat-line", tag: "ERP", title: "Exposure and response prevention", body: "Teens gradually face feared situations and intrusive thoughts while resisting compulsive responses — breaking the cycle that maintains OCD over time.", bullets: ["Graded exposure hierarchies tailored to the teen", "Response prevention coaching during and between sessions", "In-vivo exposures in home and school environments"] },
        { num: "02", icon: "ri-brain-line", tag: "Core therapy", title: "CBT for obsessive thinking patterns", body: "Cognitive work helps teens understand OCD as a brain-based condition, reduce shame about intrusive thoughts, and challenge beliefs that fuel compulsions.", bullets: ["Psychoeducation about OCD brain circuits", "Cognitive restructuring for thought-action fusion", "Mindfulness-based approaches for intrusive thoughts"] },
        { num: "03", icon: "ri-group-line", tag: "Peer support", title: "OCD-informed group therapy", body: "Peer groups reduce the isolation and shame that often accompany OCD — especially intrusive thoughts about harm or taboo subjects.", bullets: ["Normalization of OCD experiences with peers", "Accountability for ERP homework", "Reduced secrecy and shame"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Accommodation reduction and family coaching", body: "Family accommodation — participating in rituals, providing reassurance, or modifying routines — maintains OCD. We coach caregivers on supportive non-accommodation.", bullets: ["Identifying and reducing accommodation behaviors", "Reassurance reduction strategies", "Family ERP participation when appropriate"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "Signs your teen may need OCD-specific IOP care",
      description: "OCD in teens is often hidden — especially intrusive thoughts about harm or taboo subjects. If rituals or mental compulsions are consuming hours of your teen's day, specialized intensive care can help.",
      goodToKnow: "OCD treatment requires active participation in ERP — which can temporarily increase distress. We pace exposure carefully and provide enough support between sessions to make progress safely.",
      criteria: [
        { icon: "ri-repeat-line", label: "Time-consuming rituals or compulsions", sub: "Checking, washing, counting, repeating, or mental rituals taking more than an hour daily" },
        { icon: "ri-brain-line", label: "Distressing intrusive thoughts", sub: "Unwanted thoughts about harm, contamination, sexuality, or morality causing significant anxiety" },
        { icon: "ri-forbid-line", label: "Avoidance limiting daily life", sub: "Avoiding school, social situations, or activities due to OCD triggers" },
        { icon: "ri-team-line", label: "Family caught in accommodation cycle", sub: "Caregivers providing reassurance, participating in rituals, or modifying routines for OCD" },
        { icon: "ri-repeat-line", label: "Weekly therapy isn't reducing symptoms", sub: "OCD symptoms persist or worsen despite outpatient ERP or medication trials" },
      ],
      ctaTitle: "OCD thrives in secrecy — we're here to help without judgment",
      ctaBody: "We will assess OCD severity, explain our ERP-based approach, and recommend Virtual IOP or alternative care based on your teen's symptom profile.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to an OCD-focused ERP care plan",
      description: "Most families complete intake within 24–48 hours. We gather OCD symptom history, accommodation patterns, and prior treatment from the first conversation.",
      steps: defaultIntakeSteps,
    },
    comparison: {
      eyebrow: "Why IOP for OCD",
      title: "ERP works best with frequent practice and support",
      rows: [
        { label: "ERP practice frequency", standard: "Once weekly", iop: "Multiple days per week" },
        { label: "Accommodation reduction", standard: "Limited family work", iop: "Structured family track" },
        { label: "Between-session support", standard: "Minimal", iop: "Frequent check-ins" },
        { label: "Exposure coaching", standard: "One session at a time", iop: "Continuous reinforcement" },
        { label: "Symptom monitoring", standard: "Monthly", iop: "Tracked across sessions" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions we address alongside OCD",
      description: "OCD overlaps with other anxiety-related conditions. Our IOP integrates treatment across the full clinical picture.",
      items: [
        { label: "Anxiety", path: "/online-anxiety-treatment", desc: "OCD is classified as an anxiety-related disorder — generalized anxiety often co-occurs." },
        { label: "Depression", path: "/teen-depression-treatment", desc: "Chronic OCD burden frequently leads to secondary depression in adolescents." },
        { label: "Self-harm", path: "/conditions/self-harm", desc: "Some teens with severe OCD develop self-harm as a distress response — safety planning is integrated." },
        { label: "Individual therapy", path: "/therapy/individual-therapy-for-teens", desc: "One-on-one ERP sessions are a core component of our OCD treatment model." },
        { label: "Family therapy", path: "/therapy/adolescent-family-therapy", desc: "Family accommodation reduction requires dedicated family sessions." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about online OCD treatment for teens" },
    faqs: [
      { q: "What is ERP and why is it used for OCD?", a: "Exposure and response prevention (ERP) is the gold-standard treatment for OCD. Teens gradually face feared situations or thoughts while resisting compulsive responses — which over time reduces the power of obsessions and the urge to perform rituals." },
      { q: "Can ERP be done virtually?", a: "Yes. Virtual IOP is well-suited for ERP — teens practice exposures in their actual home, school, and daily environments with real-time clinician coaching and family support between sessions." },
      { q: "Will ERP make my teen's OCD worse?", a: "ERP temporarily increases anxiety as teens face feared situations without performing compulsions. This is expected and part of the treatment process. We pace exposure carefully and provide enough support to make progress safely." },
      { q: "What are intrusive thoughts and should I worry about them?", a: "Intrusive thoughts — unwanted thoughts about harm, contamination, or taboo subjects — are a core feature of OCD, not indicators of intent. Teens often hide these thoughts due to shame. Our clinicians create a safe, non-judgmental space to address them." },
      { q: "How do you handle family accommodation?", a: "Family accommodation — when caregivers participate in rituals or provide excessive reassurance — maintains OCD. We coach families on supportive responses that reduce accommodation while maintaining empathy and connection." },
      { q: "Do you prescribe medication for OCD?", a: "We provide therapy, not prescribing. SSRIs are commonly used for OCD and are managed by your teen's prescriber. We coordinate with medical providers and communicate about treatment response." },
    ],
    cta: {
      title: "Get ERP-based OCD care for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's OCD symptoms, family accommodation patterns, and whether Virtual IOP is clinically appropriate.",
    },
  },

  "/schizophrenia-in-adolescence": {
    path: "/schizophrenia-in-adolescence",
    imageKey: "schizophrenia",
    metadata: {
      title: "Schizophrenia in Adolescence | Virtual IOP Support for Teens",
      description:
        "Virtual IOP support for adolescents ages 12–17 with schizophrenia spectrum conditions. Psychoeducation, skills training, family support, and prescriber coordination. Insurance accepted.",
    },
    hero: {
      eyebrow: `Schizophrenia in Adolescence · Ages ${SITE.ages}`,
      headline: { before: "Adolescent schizophrenia support ", accent: "with structured virtual IOP" },
      body: "Intensive outpatient support for teens with schizophrenia spectrum conditions — combining psychoeducation, social skills training, family education, and close coordination with psychiatric prescribers in a structured virtual program.",
      imageAlt: "Teen participating in structured virtual mental health session with supportive clinician and family nearby",
      stats: [
        { icon: "ri-mental-health-line", label: "Approach", value: "Structured", unit: "support" },
        { icon: "ri-capsule-line", label: "Coordination", value: "Prescriber", unit: "aligned" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-capsule-line", label: "Prescriber coordination" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
      ],
    },
    overview: {
      eyebrow: "What Is Schizophrenia Support in Adolescence?",
      title: "Structured outpatient care alongside psychiatric treatment",
      paragraphs: [
        "Early-onset schizophrenia and schizophrenia spectrum conditions in adolescents require coordinated care — psychiatric medication management alongside therapy, psychoeducation, and family support. IOP fills the gap between weekly outpatient visits and residential care.",
        "Our Virtual IOP provides frequent clinical contact, social skills training, and family education — always in coordination with your teen's psychiatrist, never as a substitute for medical management.",
      ],
      focusLabel: "Areas we support",
      focusItems: [
        { label: "Psychotic symptoms", detail: "Managing distress from hallucinations, delusions, or disorganized thinking", icon: "ri-mental-health-line" },
        { label: "Social functioning", detail: "Social skills, communication, and relationship building", icon: "ri-group-line" },
        { label: "Daily structure", detail: "Routine building, self-care, and school or activity engagement", icon: "ri-calendar-check-line" },
        { label: "Family education", detail: "Helping caregivers understand and support their teen's condition", icon: "ri-team-line" },
      ],
      bentoAlt: "Teen and family learning about schizophrenia management strategies during virtual psychoeducation session",
      calloutIcon: "ri-capsule-line",
      calloutTitle: "Therapy complements — never replaces — psychiatric care",
      calloutBody: "Antipsychotic medication management stays with your teen's psychiatrist. Our IOP provides therapy, skills training, and family support alongside medical treatment.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Treatment Pillars",
      title: "How we support teens with schizophrenia spectrum conditions",
      description: "Treatment focuses on functioning, skills, and family systems — in close coordination with psychiatric prescribers managing medication.",
      items: [
        { num: "01", icon: "ri-book-open-line", tag: "Education", title: "Psychoeducation and illness management", body: "Teens and families learn about schizophrenia spectrum conditions, early warning signs, medication importance, and strategies for managing symptoms day-to-day.", bullets: ["Understanding psychotic symptoms without fear", "Early warning sign identification", "Medication adherence support and psychoeducation"] },
        { num: "02", icon: "ri-group-line", tag: "Skills", title: "Social skills and daily functioning", body: "Adolescent schizophrenia often disrupts social development and daily routines. Structured skills training helps teens rebuild connection and independence.", bullets: ["Communication and conversation skills", "Daily routine and self-care structure", "School and community re-engagement planning"] },
        { num: "03", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "Individual therapy and symptom management", body: "Individual sessions address distress related to symptoms, coping strategies, and the emotional impact of living with a serious mental health condition.", bullets: ["Coping strategies for symptom distress", "Cognitive and behavioral approaches adapted for psychosis", "Relapse prevention and crisis planning"] },
        { num: "04", icon: "ri-team-line", tag: "Family integration", title: "Family education and caregiver support", body: "Families of teens with schizophrenia face unique stressors. We provide education, communication strategies, and support for caregivers navigating complex care needs.", bullets: ["Schizophrenia psychoeducation for families", "Communication during symptomatic episodes", "Coordination with psychiatrist and care team"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "When Virtual IOP may support your teen",
      description: "IOP for schizophrenia spectrum conditions is appropriate for medically stable teens who are engaged with a psychiatrist and need structured therapeutic support beyond weekly outpatient visits.",
      goodToKnow: "We do not diagnose schizophrenia or prescribe antipsychotic medication. Teens must be psychiatrically stable, engaged with a prescriber, and not requiring 24/7 monitoring. We assess acuity carefully at intake.",
      criteria: [
        { icon: "ri-mental-health-line", label: "Diagnosed or suspected schizophrenia spectrum condition", sub: "Early-onset schizophrenia, schizoaffective disorder, or related conditions under psychiatric care" },
        { icon: "ri-capsule-line", label: "Engaged with a psychiatrist", sub: "Currently working with a prescriber for medication management — or willing to establish psychiatric care" },
        { icon: "ri-group-line", label: "Social and functional decline", sub: "Withdrawal from peers, school, or activities related to symptoms or side effects" },
        { icon: "ri-shield-check-line", label: "Medically stable for outpatient care", sub: "Not requiring inpatient stabilization — psychiatrically stable enough for structured virtual IOP" },
        { icon: "ri-repeat-line", label: "Weekly therapy isn't sufficient", sub: "Need for more frequent clinical contact, skills training, or family support than outpatient provides" },
      ],
      ctaTitle: "We'll help you understand whether IOP fits your teen's care plan",
      ctaBody: "We coordinate closely with psychiatrists and assess whether our Virtual IOP adds meaningful support — or whether a different level of care is more appropriate.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to a coordinated schizophrenia support plan",
      description: "Intake includes coordination with your teen's psychiatrist. Most families complete the process within 24–48 hours when records are available.",
      steps: [
        { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Discuss your teen's diagnosis, current psychiatric care, symptoms, and treatment history." },
        { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "Licensed clinician evaluates stability, functioning, and appropriateness for IOP — coordinating with the prescriber." },
        { num: "03", icon: "ri-calendar-check-line", title: "Coordinated care plan", body: "Individualized plan integrating therapy, skills training, family education, and prescriber communication." },
        { num: "04", icon: "ri-video-chat-line", title: "Begin Virtual IOP", body: "Your teen starts structured sessions with frequent clinical contact and ongoing psychiatric coordination." },
      ],
    },
    comparison: {
      eyebrow: "Why IOP for Schizophrenia Spectrum Conditions",
      title: "More support than weekly outpatient without residential care",
      rows: [
        { label: "Contact frequency", standard: "Once weekly", iop: "Multiple days per week" },
        { label: "Skills training", standard: "Limited", iop: "Structured social skills track" },
        { label: "Family education", standard: "Occasional", iop: "Dedicated family sessions" },
        { label: "Prescriber coordination", standard: "Minimal", iop: "Proactive collaboration" },
        { label: "Relapse monitoring", standard: "Monthly", iop: "Tracked across sessions" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Additional support for your teen's care team",
      description: "Schizophrenia spectrum conditions often co-occur with other conditions. Our IOP integrates support across the clinical picture.",
      items: [
        { label: "Psychiatrist for teens", path: "/psychiatrist-for-teens", desc: "Information about psychiatric coordination and how we work with outside prescribers." },
        { label: "Depression", path: "/teen-depression-treatment", desc: "Depressive symptoms frequently co-occur with schizophrenia spectrum conditions." },
        { label: "Anxiety", path: "/online-anxiety-treatment", desc: "Anxiety is common alongside psychotic symptoms and requires integrated treatment." },
        { label: "Family therapy", path: "/therapy/adolescent-family-therapy", desc: "Family sessions are essential for schizophrenia spectrum support." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
        { label: "Adolescent IOP", path: "/adolescent-iop-for-teens", desc: "Our structured intensive outpatient program for teens ages 12–17." },
      ],
    },
    faq: { title: "Questions about schizophrenia support for teens" },
    faqs: [
      { q: "Can schizophrenia develop in adolescence?", a: "Yes. Early-onset schizophrenia typically emerges between ages 13 and 17, though prodromal symptoms may appear earlier. Adolescent presentation can differ from adult schizophrenia — making early specialist involvement important." },
      { q: "Do you diagnose schizophrenia?", a: "We do not provide standalone diagnostic evaluations for schizophrenia. Our clinicians assess functioning and stability as part of intake and coordinate with your teen's psychiatrist, who manages diagnosis and medication." },
      { q: "Do you prescribe antipsychotic medication?", a: "No. Antipsychotic prescribing belongs with your teen's psychiatrist. Our role is therapy, psychoeducation, social skills training, family support, and communicating with the prescribing team about clinical observations." },
      { q: "Is Virtual IOP safe for teens with psychotic symptoms?", a: "IOP is appropriate for psychiatrically stable teens under active psychiatric care who do not require 24/7 monitoring. We assess acuity at intake and will not enroll teens who need inpatient stabilization." },
      { q: "How do you coordinate with my teen's psychiatrist?", a: "We communicate proactively with prescribers about symptom patterns, medication adherence, side effects observed in sessions, and any clinical concerns — with appropriate consent from the family." },
      { q: "What if my teen decompensates during IOP?", a: "We have clear protocols for clinical deterioration. If a teen requires inpatient care, we facilitate transition and maintain communication with the family and psychiatric team throughout." },
    ],
    cta: {
      title: "Get structured support for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's diagnosis, current psychiatric care, and whether Virtual IOP adds meaningful support to their treatment plan.",
    },
  },

  "/psychiatrist-for-teens": {
    path: "/psychiatrist-for-teens",
    imageKey: "psychiatrist",
    metadata: {
      title: "Psychiatrist for Teens | Medication Coordination & Virtual IOP",
      description:
        "How Adolescent Mental Health coordinates with your teen's psychiatrist. Virtual IOP therapy, prescriber collaboration, and medication adherence support for teens ages 12–17.",
    },
    hero: {
      eyebrow: `Psychiatrist for Teens · Ages ${SITE.ages}`,
      headline: { before: "Therapy that works ", accent: "with your teen's psychiatrist" },
      body: "We provide intensive virtual therapy and clinical coordination — partnering with your teen's psychiatrist or helping you find psychiatric care while delivering structured IOP support.",
      imageAlt: "Clinical team coordinating teen mental health care between therapy and psychiatric providers",
      stats: [
        { icon: "ri-stethoscope-line", label: "Model", value: "Coordination", unit: "focused" },
        { icon: "ri-heart-pulse-line", label: "Format", value: "Virtual", unit: "IOP" },
        { icon: "ri-calendar-check-line", label: "Typical intake", value: "24–48", unit: "hours" },
      ],
      trustItems: [
        { icon: "ri-shield-check-line", label: "Licensed clinicians" },
        { icon: "ri-links-line", label: "Prescriber coordination" },
        { icon: "ri-team-line", label: "Family included" },
        { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
      ],
    },
    overview: {
      eyebrow: "Psychiatric Coordination in Virtual IOP",
      title: "Therapy and medication management — working together",
      paragraphs: [
        "Many teens in our Virtual IOP take psychiatric medication managed by an outside prescriber. We do not replace your teen's psychiatrist — we complement their work with intensive therapy, skills training, and proactive clinical communication.",
        "When families don't yet have a psychiatrist, we help connect them with psychiatric resources while providing therapeutic support through IOP — so teens aren't waiting months for care.",
      ],
      focusLabel: "How we support medication management",
      focusItems: [
        { label: "Prescriber communication", detail: "Sharing clinical observations, symptom patterns, and treatment response", icon: "ri-links-line" },
        { label: "Adherence support", detail: "Psychoeducation and routines that support consistent medication use", icon: "ri-capsule-line" },
        { label: "Side effect monitoring", detail: "Tracking behavioral and mood changes that may relate to medication", icon: "ri-eye-line" },
        { label: "Referral assistance", detail: "Helping families find adolescent psychiatrists when none is in place", icon: "ri-user-search-line" },
      ],
      bentoAlt: "Parent and clinician reviewing teen treatment coordination plan including psychiatric care",
      calloutIcon: "ri-stethoscope-line",
      calloutTitle: "We provide therapy — psychiatrists provide prescribing",
      calloutBody: "Our licensed therapists and counselors deliver IOP. Medication decisions, prescriptions, and psychiatric diagnosis belong with your teen's medical provider.",
      stats: defaultOverviewStats,
    },
    pillars: {
      eyebrow: "Our Coordination Model",
      title: "How therapy and psychiatry work together in IOP",
      description: "Effective adolescent mental health care requires therapy and medication management to communicate — especially during intensive treatment.",
      items: [
        { num: "01", icon: "ri-links-line", tag: "Communication", title: "Proactive prescriber coordination", body: "With family consent, we communicate with your teen's psychiatrist about symptom patterns, treatment response, medication adherence, and any clinical concerns observed in sessions.", bullets: ["Regular clinical updates to prescribing providers", "Shared understanding of treatment goals", "Rapid communication when concerns arise"] },
        { num: "02", icon: "ri-capsule-line", tag: "Adherence", title: "Medication adherence and psychoeducation", body: "Teens and families learn why medication matters, how to manage side effects, and how to build routines that support consistent use — without our clinicians prescribing or adjusting doses.", bullets: ["Medication psychoeducation for teens and families", "Routine building for consistent adherence", "Side effect awareness and reporting"] },
        { num: "03", icon: "ri-heart-pulse-line", tag: "Core therapy", title: "Intensive therapy alongside medication", body: "Medication addresses brain chemistry; therapy addresses skills, relationships, and functioning. IOP provides the therapeutic intensity that makes medication management more effective.", bullets: ["CBT, DBT, and modality-specific therapy", "Individual, group, and family sessions", "Skills that complement pharmacological treatment"] },
        { num: "04", icon: "ri-user-search-line", tag: "Referral", title: "Psychiatric referral when needed", body: "If your teen doesn't have a psychiatrist, we help families identify adolescent psychiatric providers in their area while providing therapeutic support through IOP in the interim.", bullets: ["Referral guidance for adolescent psychiatrists", "Interim therapeutic support while awaiting psychiatric care", "Coordination once psychiatric care is established"] },
      ],
    },
    fit: {
      eyebrow: "Is It Right for Us?",
      title: "When psychiatric coordination through IOP makes sense",
      description: "Our model serves teens who need intensive therapy alongside medication management — whether they already have a psychiatrist or need help finding one.",
      goodToKnow: "We are a therapy provider, not a psychiatric practice. We do not prescribe medication, provide psychiatric evaluations, or manage controlled substances. All prescribing remains with your teen's medical provider.",
      criteria: [
        { icon: "ri-capsule-line", label: "Teen is on psychiatric medication", sub: "Currently taking antidepressants, mood stabilizers, stimulants, or other psychiatric medications" },
        { icon: "ri-user-search-line", label: "Need help finding a psychiatrist", sub: "Teen needs psychiatric care but family hasn't yet connected with an adolescent psychiatrist" },
        { icon: "ri-links-line", label: "Therapist and psychiatrist aren't communicating", sub: "Medication and therapy feel disconnected — symptoms persist despite both being in place" },
        { icon: "ri-heart-pulse-line", label: "Need more than weekly therapy", sub: "Teen needs intensive therapeutic support to complement their medication regimen" },
        { icon: "ri-alarm-warning-line", label: "Recent medication change or hospitalization", sub: "Stepping down from inpatient care or adjusting medications and needing structured outpatient support" },
      ],
      ctaTitle: "Tell us about your teen's current treatment team",
      ctaBody: "We will explain how our coordination model works, assess whether Virtual IOP is appropriate, and help connect you with psychiatric resources if needed.",
    },
    intake: {
      eyebrow: "How It Works",
      title: "From first call to coordinated therapy and psychiatric care",
      description: "Intake includes gathering current medication information and prescriber contact details. Most families complete the process within 24–48 hours.",
      steps: [
        { num: "01", icon: "ri-phone-line", title: "Free consultation", body: "Discuss current medications, prescribers, symptoms, and what therapeutic support your teen needs." },
        { num: "02", icon: "ri-clipboard-line", title: "Clinical assessment", body: "Licensed clinician evaluates functioning, medication history, and IOP appropriateness." },
        { num: "03", icon: "ri-links-line", title: "Prescriber coordination setup", body: "With consent, we establish communication with your teen's psychiatrist — or provide referral guidance." },
        { num: "04", icon: "ri-video-chat-line", title: "Begin Virtual IOP", body: "Your teen starts intensive therapy with ongoing psychiatric coordination built into the program." },
      ],
    },
    comparison: {
      eyebrow: "Therapy + Psychiatry",
      title: "Why coordinated care outperforms either alone",
      rows: [
        { label: "Therapeutic intensity", standard: "Weekly sessions", iop: "Multiple days per week" },
        { label: "Prescriber communication", standard: "Rare or none", iop: "Proactive coordination" },
        { label: "Medication adherence support", standard: "Minimal", iop: "Integrated psychoeducation" },
        { label: "Symptom monitoring", standard: "Monthly", iop: "Tracked across sessions" },
        { label: "Family involvement", standard: "Optional", iop: "Structured family track" },
      ],
    },
    related: {
      eyebrow: "Related Programs",
      title: "Conditions where psychiatric coordination matters most",
      description: "These programs integrate closely with outside prescribers as part of standard IOP care.",
      items: [
        { label: "Bipolar treatment", path: "/online-bipolar-treatment", desc: "Mood stabilization therapy coordinated with mood stabilizer and antipsychotic management." },
        { label: "Schizophrenia support", path: "/schizophrenia-in-adolescence", desc: "Structured IOP alongside antipsychotic medication management." },
        { label: "ADHD treatment", path: "/adhd-treatment-for-teens", desc: "Skills-based therapy complementing stimulant or non-stimulant ADHD medication." },
        { label: "Depression treatment", path: "/teen-depression-treatment", desc: "Behavioral activation and CBT alongside antidepressant management." },
        { label: "Anxiety treatment", path: "/online-anxiety-treatment", desc: "ERP and CBT coordinated with SSRI or other anxiety medication." },
        { label: "Virtual IOP", path: "/virtual-iop-for-teens", desc: "Learn about our full intensive outpatient program structure and schedule." },
      ],
    },
    faq: { title: "Questions about psychiatrist coordination for teens" },
    faqs: [
      { q: "Do you have psychiatrists on staff?", a: "We are a therapy provider offering Virtual IOP. We do not employ psychiatrists or prescribe medication. We coordinate with your teen's outside psychiatric prescriber and help families find psychiatric care when needed." },
      { q: "Can you refer us to a teen psychiatrist?", a: "Yes. If your teen doesn't have a psychiatrist, we provide referral guidance to adolescent psychiatric providers in your area while delivering therapeutic support through IOP in the interim." },
      { q: "How do you communicate with our psychiatrist?", a: "With family consent, we share clinical observations, symptom patterns, medication adherence concerns, and treatment response. We use secure communication channels and respect HIPAA requirements." },
      { q: "Can my teen start IOP before seeing a psychiatrist?", a: "Yes, in many cases. We provide therapeutic support while helping families connect with psychiatric care. For conditions requiring medication (such as bipolar disorder or schizophrenia), we strongly recommend concurrent psychiatric involvement." },
      { q: "Will you adjust my teen's medication?", a: "No. Medication changes are exclusively the responsibility of your teen's prescriber. We share clinical observations that may inform their decisions but never recommend specific medication changes." },
      { q: "What medications do teens in your program commonly take?", a: "Teens in our IOP may take antidepressants, mood stabilizers, antipsychotics, stimulants, or anti-anxiety medications — managed by their outside prescriber. We support adherence and coordinate care regardless of medication type." },
    ],
    cta: {
      title: "Get coordinated care for your teen",
      description: "Free consultation, no obligation. We will discuss your teen's current treatment team, medications, and how Virtual IOP therapy can complement their psychiatric care.",
    },
  },
};

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
