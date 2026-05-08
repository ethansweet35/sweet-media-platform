import type { Faq } from "./faqs";

/**
 * Conditions are different from Services: they describe what someone is
 * struggling with (anxiety, depression, self-medicating) rather than the type
 * of intervention being provided. Each condition page educates the family,
 * lists warning signs, and routes the reader to the right intervention type.
 */
export type ConditionConfig = {
  slug: string;
  displayName: string;
  shortName: string;

  heroEyebrow?: string;
  heroHeadline: string;
  heroBody: string;

  // What it is
  whatItIsTitle?: string;
  whatItIsBody: string[];

  // Why families need to act
  whyActTitle?: string;
  whyActBody: string[];

  // Warning signs
  signsTitle?: string;
  signs: string[];

  // How we help (paragraphs)
  howWeHelpTitle?: string;
  howWeHelpBody: string[];

  // Suggested next services to read about (slug references in services.ts)
  recommendedServices?: string[];

  // Custom FAQs (falls back to DEFAULT_FAQS)
  faqs?: Faq[];

  // SEO
  seoTitle?: string;
  metaDescription?: string;
};

export const CONDITIONS: ConditionConfig[] = [
  {
    slug: "anxiety",
    displayName: "Interventions for People Struggling with Anxiety",
    shortName: "Anxiety",
    heroEyebrow: "Mental Health Support",
    heroHeadline: "Interventions for People Struggling with Anxiety",
    heroBody:
      "When anxiety takes over a loved one's life, families often feel powerless. Our compassionate, family-centred interventions help you bridge the gap — without making things worse.",
    whatItIsTitle: "What anxiety actually looks like at home",
    whatItIsBody: [
      "Anxiety disorders are far more than worry. They include generalised anxiety disorder, panic disorder, social anxiety, agoraphobia, OCD, and PTSD — and each shows up at home in distinctive ways.",
      "Families often watch their loved one cancel plans, refuse to leave the house, lose sleep for nights on end, or spiral into compulsive routines. The instinct is to soothe and accommodate. Over time, that accommodation can quietly make the anxiety worse.",
    ],
    whyActTitle: "Why families need to act early",
    whyActBody: [
      "Untreated anxiety disorders rarely stay contained. They expand to take over more of life — career, relationships, sleep, physical health — and frequently lead to self-medicating with alcohol, cannabis, prescription drugs, or stimulants.",
      "An intervention is not about cornering your loved one. It is about saying out loud, as a family, that you are worried — and that there is a clear, compassionate path forward that does not require them to figure everything out alone.",
    ],
    signsTitle: "Warning signs an intervention may be needed",
    signs: [
      "Avoiding work, school, or social situations they used to enjoy",
      "Frequent panic attacks or constant physical tension",
      "Disrupted sleep — insomnia, nightmares, or oversleeping",
      "Compulsive behaviours, repeated checking, or rigid routines",
      "Self-medicating with alcohol, marijuana, benzos, or other substances",
      "Talk of feeling trapped, hopeless, or like a burden",
      "Refusal to seek help or downplaying the severity of symptoms",
    ],
    howWeHelpTitle: "How our anxiety interventions work",
    howWeHelpBody: [
      "Our certified interventionists begin with a free, confidential consultation to learn about your loved one and your family. We assess severity, identify any co-occurring substance use, and design a tailored intervention plan.",
      "Anxiety interventions lead with compassion, not confrontation. We help your loved one feel less alone in what they are facing and walk them toward the right level of care — outpatient therapy, intensive outpatient, partial hospitalisation, or residential treatment.",
      "We do not stop at the conversation. We coordinate placement with vetted programs that specialise in anxiety disorders, and we stay involved with your family long after the intervention itself.",
    ],
    recommendedServices: [
      "mental-health-interventions",
      "dual-diagnosis-interventions",
      "family-interventions",
    ],
  },
  {
    slug: "depression",
    displayName: "Interventions for People Struggling with Depression",
    shortName: "Depression",
    heroEyebrow: "Mental Health Support",
    heroHeadline: "Interventions for People Struggling with Depression",
    heroBody:
      "Depression doesn't always look like sadness. When a loved one stops engaging, stops fighting, or starts hinting that life isn't worth living, your family needs a clear plan — and you need it now.",
    whatItIsTitle: "What major depression actually looks like",
    whatItIsBody: [
      "Major depressive disorder is a medical condition that changes how the brain processes motivation, energy, and meaning. It is not laziness, weakness, or a phase someone can simply think their way out of.",
      "At home, depression often shows up as withdrawal from family, loss of interest in things that used to matter, sleeping too much or too little, weight changes, and a quiet kind of hopelessness that family members find hard to even name.",
    ],
    whyActTitle: "Why families cannot wait it out",
    whyActBody: [
      "Untreated depression is one of the leading causes of suicide. It also commonly co-occurs with substance use, as people self-medicate to feel anything at all — or to feel nothing.",
      "Families often hesitate because they don't want to overreact, embarrass their loved one, or push them away. We help you act with the right mix of urgency and compassion — and we give you the script for the conversation that has felt impossible.",
    ],
    signsTitle: "Warning signs a depression intervention may be needed",
    signs: [
      "Loss of interest in work, hobbies, friendships, or family",
      "Talk of being a burden, having no future, or wanting to disappear",
      "Significant changes in sleep, appetite, or weight",
      "Persistent fatigue or inability to get out of bed",
      "Increased alcohol, drug, or prescription medication use",
      "Giving away possessions or putting affairs in order",
      "Past suicide attempts, self-harm, or current suicidal ideation",
    ],
    howWeHelpTitle: "How our depression interventions work",
    howWeHelpBody: [
      "Depression interventions require a different posture than substance interventions. The focus is connection over consequences. Our specialists guide your family in language and tone that lowers shame, raises hope, and opens the door to treatment.",
      "We assess for suicide risk, co-occurring substance use, and underlying medical issues. From there we recommend the right level of care — outpatient psychiatry, intensive outpatient programs, partial hospitalisation, or residential treatment for severe or treatment-resistant cases.",
      "Critically, we stay engaged after the intervention. Recovery from depression is rarely linear, and the family system needs ongoing support to hold healthy boundaries while still showing up with love.",
    ],
    recommendedServices: [
      "mental-health-interventions",
      "dual-diagnosis-interventions",
      "crisis-interventions",
    ],
  },
  {
    slug: "self-medicating",
    displayName: "Interventions for Loved Ones Who Are Self-Medicating",
    shortName: "Self-Medicating",
    heroEyebrow: "Dual Diagnosis Support",
    heroHeadline: "Interventions for Loved Ones Who Are Self-Medicating",
    heroBody:
      "When alcohol, cannabis, or prescription drugs are quietly being used to manage anxiety, depression, trauma, or chronic pain, the substance use and the underlying condition both have to be treated — at the same time.",
    whatItIsTitle: "What self-medicating actually means",
    whatItIsBody: [
      "Self-medicating is the use of alcohol, drugs, or other substances to manage an underlying condition that has not been properly diagnosed or treated. Common drivers include anxiety, depression, PTSD, ADHD, chronic pain, insomnia, and unresolved grief.",
      "It usually starts as something that 'works' — a few drinks to wind down, a joint to sleep, an unprescribed pill to focus. Over time, the brain rewires around the substance, and the underlying condition gets worse instead of better.",
    ],
    whyActTitle: "Why self-medicating cases need specialised intervention",
    whyActBody: [
      "Treating only the substance use leaves the underlying condition unaddressed — and relapse is almost inevitable. Treating only the mental health condition without addressing the substance use rarely works either.",
      "Our interventionists are specifically trained in dual diagnosis cases. We help you have the conversation that names both realities — the substance use AND what is underneath it — and we connect your loved one with programs that treat both at once.",
    ],
    signsTitle: "Warning signs of self-medication",
    signs: [
      "Using alcohol or drugs to fall asleep, wake up, or get through the day",
      "Increased use during stressful periods or after emotional triggers",
      "Defensive or evasive when substance use is discussed",
      "Mental health symptoms that get worse despite increased substance use",
      "Failed attempts to cut back without addressing the underlying issue",
      "Mixing substances with prescription medication",
      "Visible decline in functioning at work, in relationships, or at home",
    ],
    howWeHelpTitle: "How our dual diagnosis interventions work",
    howWeHelpBody: [
      "We start by carefully assessing both the substance use and the underlying mental health or medical condition driving it. That clarity changes everything — including the kind of treatment center we recommend.",
      "Our intervention conversation is structured to acknowledge the pain that is actually fueling the substance use. Your loved one needs to know we see the whole picture, not just the drinking or the pill bottle.",
      "We coordinate placement with treatment programs that have integrated, on-site psychiatric care — not separated outpatient referrals. And we stay involved with your family throughout the recovery journey.",
    ],
    recommendedServices: [
      "dual-diagnosis-interventions",
      "mental-health-interventions",
      "alcohol-abuse-interventions",
    ],
  },
];

export const CONDITION_BY_SLUG = new Map(CONDITIONS.map((c) => [c.slug, c]));
