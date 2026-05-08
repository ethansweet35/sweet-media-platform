import type { ProcessStep } from "@/components/sections/ProcessSteps";

export type ServiceConfig = {
  slug: string;
  displayName: string;
  shortName: string;
  category: "substance" | "mental-health" | "family" | "method" | "specialty";
  navIcon?: string;
  // Hero
  heroEyebrow?: string;
  heroHeadline: string;
  heroBody: string;
  // What is / overview
  overviewTitle?: string;
  overviewBody: string;
  // Signs & symptoms (optional bullet list)
  signsTitle?: string;
  signs?: string[];
  // Custom process steps (falls back to default 4-step)
  customProcessSteps?: ProcessStep[];
  // Related slugs (for the related grid)
  related?: string[];
  // SEO
  seoTitle?: string;
  metaDescription?: string;
};

export const SERVICES: ServiceConfig[] = [
  {
    slug: "alcohol-abuse-interventions",
    displayName: "Alcohol Abuse Interventions",
    shortName: "Alcohol",
    category: "substance",
    navIcon: "ri-goblet-line",
    heroHeadline: "Alcohol Abuse Interventions",
    heroBody:
      "We have helped over 1,000 families confront alcohol abuse and guide their loved one into treatment. Our intervention specialists handle the conversation you cannot have alone — with compassion, structure, and clear next steps.",
    overviewBody:
      "Alcohol use disorder hides in plain sight. Functioning alcoholics keep jobs, hold marriages together, and quietly destroy their health. By the time the family is ready to act, denial has had years to take root. We help you cut through it without breaking the relationship.",
    signsTitle: "Common signs it is time for an alcohol intervention",
    signs: [
      "Drinking earlier in the day or hiding bottles",
      "Failed attempts to cut back or quit",
      "Withdrawal symptoms (shakes, sweating, anxiety)",
      "Repeated DUIs or alcohol-related accidents",
      "Health problems your loved one minimises or denies",
      "Family members walking on eggshells to keep the peace",
    ],
    related: ["dual-diagnosis-interventions", "family-interventions", "crisis-interventions"],
  },
  {
    slug: "drug-abuse-interventions",
    displayName: "Drug Abuse Interventions",
    shortName: "Drug",
    category: "substance",
    navIcon: "ri-capsule-line",
    heroHeadline: "Drug Abuse Interventions",
    heroBody:
      "Drug dependence creates cycles of enabling and codependency that devastate families. Our specialists are trained to interrupt those cycles and present treatment in a way your loved one can actually accept.",
    overviewBody:
      "Drug addiction is rarely solved by one conversation — it is solved by changing the system around the person. Our process gives the family the language, the structure, and the boundaries needed to finally see real change.",
    signs: [
      "Money, valuables, or medications going missing",
      "Withdrawal from family, friends, and work",
      "Unexplained legal trouble or court appearances",
      "Visible physical decline, weight loss, sleep changes",
      "Failed promises to stop, restart, or 'do it differently'",
    ],
    related: ["heroin-intervention", "cocaine-intervention", "opioid-intervention", "meth-intervention"],
  },
  {
    slug: "mental-health-interventions",
    displayName: "Mental Health Interventions",
    shortName: "Mental Health",
    category: "mental-health",
    navIcon: "ri-mental-health-line",
    heroHeadline: "Mental Health Interventions",
    heroBody:
      "Depression, anxiety, PTSD, and bipolar disorder can be just as life-threatening as addiction — and far harder to confront because shame keeps everyone silent. We help families take that first hard step.",
    overviewBody:
      "A mental health intervention focuses less on consequences and more on connection. We help your loved one feel less alone in what they are facing and walk them toward the right level of care, whether that is outpatient therapy, partial hospitalisation, or a residential program.",
    signs: [
      "Withdrawal from previously enjoyed activities",
      "Talk of hopelessness, worthlessness, or being a burden",
      "Significant changes in sleep, appetite, or hygiene",
      "Increased risk-taking or self-medicating behaviour",
      "Suicidal ideation, plans, or past attempts",
    ],
    related: ["dual-diagnosis-interventions", "crisis-interventions", "family-interventions"],
  },
  {
    slug: "dual-diagnosis-interventions",
    displayName: "Dual Diagnosis Interventions",
    shortName: "Dual Diagnosis",
    category: "specialty",
    navIcon: "ri-link-m",
    heroHeadline: "Dual Diagnosis Interventions",
    heroBody:
      "Substance use and mental health disorders often travel together — and treating one without the other usually leads to relapse. We specialise in interventions that get your loved one into integrated care from day one.",
    overviewBody:
      "Dual diagnosis treatment requires programs that can hold both conditions at once. We have built relationships with the centres that do this well, and we will not place your loved one anywhere we would not place our own family.",
    related: ["mental-health-interventions", "alcohol-abuse-interventions", "drug-abuse-interventions"],
  },
  {
    slug: "family-interventions",
    displayName: "Family Interventions",
    shortName: "Family",
    category: "family",
    navIcon: "ri-group-line",
    heroHeadline: "Family Interventions",
    heroBody:
      "Addiction is a family disease. The most successful interventions reset the entire family system — not just the person who is using. Our process empowers every member to play a healthy role in recovery.",
    overviewBody:
      "Most families come to us after years of trying to help in ways that quietly enabled the problem. We help you see those patterns clearly, set boundaries that hold, and stop carrying weight that was never yours to carry.",
    related: ["alcohol-abuse-interventions", "drug-abuse-interventions", "interventions-for-teens"],
  },
  {
    slug: "interventions-for-teens",
    displayName: "Interventions for Teens",
    shortName: "Teen",
    category: "specialty",
    navIcon: "ri-user-smile-line",
    heroHeadline: "Teen Interventions",
    heroBody:
      "Teenagers in crisis need a fundamentally different approach. We work with families to gently confront substance use, self-harm, eating disorders, and severe mental health struggles — without escalating the situation.",
    overviewBody:
      "Adolescent brain development means the conversations have to be different, the consequences have to be different, and the treatment recommendation has to be different. We connect families with adolescent-specific programs that actually work.",
    related: ["mental-health-interventions", "family-interventions", "drug-abuse-interventions"],
  },
  {
    slug: "interventions-for-executives",
    displayName: "Interventions For Executives",
    shortName: "Executive",
    category: "specialty",
    navIcon: "ri-briefcase-line",
    heroHeadline: "Executive Interventions",
    heroBody:
      "High-functioning professionals require discreet, targeted interventions that protect their career while addressing addiction or mental health head-on. We have helped CEOs, surgeons, attorneys, and other leaders get well — quietly.",
    overviewBody:
      "Confidentiality, scheduling, and continuity of work are non-negotiable in executive interventions. We coordinate with HR or legal counsel only as required, and we recommend treatment programs equipped for high-profile clients.",
    related: ["alcohol-abuse-interventions", "drug-abuse-interventions", "dual-diagnosis-interventions"],
  },
  {
    slug: "crisis-interventions",
    displayName: "Crisis Interventions",
    shortName: "Crisis",
    category: "specialty",
    navIcon: "ri-alarm-warning-line",
    heroHeadline: "Crisis Interventions",
    heroBody:
      "When immediate action is required — overdose risk, suicidal ideation, dangerous behaviour — we mobilise the same day. Our crisis team has handled the situations most providers refuse to touch.",
    overviewBody:
      "Crisis interventions move fast and stay coordinated. We work alongside emergency services, treatment centres, and (when needed) law enforcement to keep your loved one safe and get them into care immediately.",
    related: ["mental-health-interventions", "dual-diagnosis-interventions", "drug-abuse-interventions"],
  },
  {
    slug: "arise-intervention",
    displayName: "ARISE® Intervention",
    shortName: "ARISE®",
    category: "method",
    navIcon: "ri-team-line",
    heroHeadline: "ARISE® Intervention",
    heroBody:
      "The ARISE® model is invitational rather than confrontational. We engage your loved one and the support network from the very first call — leading to higher engagement and longer-lasting recovery.",
    overviewBody:
      "ARISE® is a gradually escalating, family-centred method that emphasises compassion over coercion. Roughly 83% of people invited to an ARISE® intervention enter treatment within 1–3 weeks, and family members experience parallel healing throughout the process.",
    related: ["the-johnson-model-intervention", "family-interventions", "alcohol-abuse-interventions"],
  },
  {
    slug: "the-johnson-model-intervention",
    displayName: "The Johnson Model Intervention",
    shortName: "Johnson Model",
    category: "method",
    navIcon: "ri-user-voice-line",
    heroHeadline: "The Johnson Model Intervention",
    heroBody:
      "The classic Johnson Model is a structured, often surprise confrontation in which a prepared team presents factual evidence of addiction's impact and offers immediate treatment. Best suited to specific high-stakes situations.",
    overviewBody:
      "Despite the TV-show stereotype, the Johnson Model — done well — is highly effective when families are organised, well-coached, and genuinely ready to enforce consequences. We will tell you honestly whether this is the right approach for your situation.",
    related: ["arise-intervention", "alcohol-abuse-interventions", "drug-abuse-interventions"],
  },
  {
    slug: "meth-intervention",
    displayName: "Meth Intervention",
    shortName: "Meth",
    category: "substance",
    navIcon: "ri-flask-line",
    heroHeadline: "Meth Intervention",
    heroBody:
      "Methamphetamine addiction creates volatile mood swings, paranoia, and rapid physical decline. Interventions for meth users require specific safety protocols and rapid placement into stabilisation care.",
    overviewBody:
      "Meth addiction is rarely something families can address alone — the unpredictability and physical risk are too great. Our interventionists are experienced in de-escalation and have direct relationships with treatment programs equipped for meth recovery.",
    related: ["drug-abuse-interventions", "dual-diagnosis-interventions", "crisis-interventions"],
  },
  {
    slug: "cocaine-intervention",
    displayName: "Cocaine Intervention",
    shortName: "Cocaine",
    category: "substance",
    navIcon: "ri-cloud-line",
    heroHeadline: "Cocaine Intervention",
    heroBody:
      "Cocaine addiction often hides behind a successful exterior — until it doesn't. We help families confront cocaine use early, before the financial, professional, and physical damage becomes irreversible.",
    overviewBody:
      "Because cocaine addiction frequently co-occurs with alcohol and other stimulants, our intervention plan is comprehensive. We coordinate detox, residential care, and longer-term outpatient support — not just a one-off conversation.",
    related: ["drug-abuse-interventions", "alcohol-abuse-interventions", "dual-diagnosis-interventions"],
  },
  {
    slug: "heroin-intervention",
    displayName: "Heroin Intervention",
    shortName: "Heroin",
    category: "substance",
    navIcon: "ri-syringe-line",
    heroHeadline: "Heroin Intervention",
    heroBody:
      "Heroin and fentanyl-laced opioids carry an overdose risk every single time. We move quickly to get loved ones into medically supervised detox and into long-term recovery programs equipped for opioid use disorder.",
    overviewBody:
      "Heroin interventions cannot wait. We coordinate with rapid-admit detox centres and prepare the family for the realities of opioid recovery, including medication-assisted treatment options like buprenorphine and naltrexone.",
    related: ["opioid-intervention", "drug-abuse-interventions", "crisis-interventions"],
  },
  {
    slug: "opioid-intervention",
    displayName: "Opioid Intervention",
    shortName: "Opioid",
    category: "substance",
    navIcon: "ri-medicine-bottle-line",
    heroHeadline: "Opioid Intervention",
    heroBody:
      "Whether it began with a prescription or escalated to street opioids, opioid use disorder requires evidence-based treatment and a family that knows how to support recovery without enabling continued use.",
    overviewBody:
      "We help families understand the physiology of opioid dependence and the role of medication-assisted treatment in long-term recovery. Our placements are with programs that integrate behavioural therapy, peer support, and MAT when clinically appropriate.",
    related: ["heroin-intervention", "drug-abuse-interventions", "crisis-interventions"],
  },
  {
    slug: "ketamine-addiction",
    displayName: "Ketamine Addiction Interventions",
    shortName: "Ketamine",
    category: "substance",
    navIcon: "ri-test-tube-line",
    heroHeadline: "Ketamine Addiction Interventions",
    heroBody:
      "Ketamine has gone from underground party drug to therapeutic tool — and back to a substance of abuse. We help families intervene when recreational or self-administered ketamine use becomes a dependency.",
    overviewBody:
      "Ketamine addiction can hide behind legitimate-sounding mental health language ('I'm self-medicating my depression'). Our interventionists separate genuine therapeutic need from compulsive use and place loved ones in programs that treat both.",
    related: ["drug-abuse-interventions", "mental-health-interventions", "dual-diagnosis-interventions"],
  },
  {
    slug: "ocd-interventions",
    displayName: "OCD Interventions",
    shortName: "OCD",
    category: "mental-health",
    navIcon: "ri-loop-left-line",
    heroHeadline: "OCD Interventions",
    heroBody:
      "Severe obsessive-compulsive disorder can take over a family's daily life. We help families gently confront avoidance, accommodation, and refusal of treatment — and connect loved ones with evidence-based OCD specialists.",
    overviewBody:
      "OCD is one of the most treatable serious mental health conditions when matched with the right exposure-and-response-prevention (ERP) program. Our placements prioritise OCD-specialised clinicians over general mental health centres.",
    related: ["mental-health-interventions", "family-interventions", "dual-diagnosis-interventions"],
  },
];

export const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));
