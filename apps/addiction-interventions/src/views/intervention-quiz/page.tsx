import PageHero from "@/components/sections/PageHero";
import Quiz, { type QuizConfig } from "@/components/quiz/Quiz";

const STANDARD_OPTIONS = [
  { label: "Never / not at all", score: 0 },
  { label: "Sometimes / occasionally", score: 1 },
  { label: "Often / regularly", score: 2 },
  { label: "Constantly / it dominates our family", score: 3 },
];

const CONFIG: QuizConfig = {
  intro: {
    eyebrow: "Self-Assessment",
    headline: "Is it time for an intervention?",
    body: "Answer 10 quick questions about what you are observing in your loved one. We will give you a clear, honest read on whether the patterns you're seeing warrant professional help — and what to do next.",
  },
  questions: [
    {
      id: "q1",
      prompt:
        "Has your loved one's substance use or mental health caused problems at work, school, or with finances?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q2",
      prompt:
        "Have you found yourself lying or covering for your loved one to family, friends, or employers?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q3",
      prompt:
        "Has your loved one tried to cut back, quit, or get help — and been unable to follow through?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q4",
      prompt:
        "Are you walking on eggshells around your loved one to avoid setting them off?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q5",
      prompt:
        "Has your loved one had legal trouble, accidents, or close calls related to their use or mental state?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q6",
      prompt:
        "Has the rest of the family — partners, children, siblings — suffered as a result of focusing on this one person?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q7",
      prompt:
        "Have you given your loved one money, shelter, or other support that you suspect enabled continued use?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q8",
      prompt:
        "Has your loved one expressed hopelessness, talked about suicide, or had any near-overdose events?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q9",
      prompt:
        "Do you find yourself thinking about your loved one's situation almost constantly?",
      options: STANDARD_OPTIONS,
    },
    {
      id: "q10",
      prompt:
        "Have previous attempts to talk to your loved one ended in denial, anger, or false promises?",
      options: STANDARD_OPTIONS,
    },
  ],
  buckets: [
    {
      minScore: 0,
      level: "low",
      title: "Stay vigilant — you may be earlier in the cycle.",
      body: "The patterns you're noticing are real, but they don't yet rise to the level of a crisis. Now is the right time to learn the warning signs of escalation, set healthy boundaries, and have an honest preliminary conversation with your loved one. If anything intensifies, don't wait — call us.",
      ctaLabel: `Speak with a Specialist`,
    },
    {
      minScore: 8,
      level: "moderate",
      title: "Warning signs are clear. A professional consultation is warranted.",
      body: "What you're describing has moved past 'something to keep an eye on'. The combination of behaviours you're seeing usually escalates without intervention — but it's also exactly the situation where a structured conversation, with the right preparation, can change everything. Your first call is free.",
      ctaLabel: `Get a Free Consultation`,
    },
    {
      minScore: 16,
      level: "high",
      title: "An intervention is strongly indicated. Please call us today.",
      body: "What you're describing is the pattern of a family in real crisis. We have helped more than 1,500 families navigate exactly this — and we can help you, too. Time matters here. The sooner we speak, the more options you'll have. There is no obligation, no judgment, and no cost for the first call.",
      ctaLabel: `Call Now — We Move Fast`,
    },
  ],
};

export default function InterventionQuizPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Intervention Quiz"
        headline="A 2-minute self-assessment for families."
        body="Designed by certified interventionists. Anonymous, no email required, no scary diagnostics — just an honest read on what you are seeing."
        primaryCta={{
          label: "Skip — Speak with us now",
          href: "/contact",
        }}
        secondaryCta={undefined as unknown as { label: string; href: string }}
        showTrustLine={false}
      />
      <Quiz config={CONFIG} />
    </main>
  );
}
