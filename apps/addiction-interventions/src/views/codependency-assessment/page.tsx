import PageHero from "@/components/sections/PageHero";
import Quiz, { type QuizConfig } from "@/components/quiz/Quiz";

const STANDARD_OPTIONS = [
  { label: "Almost never", score: 0 },
  { label: "Sometimes", score: 1 },
  { label: "Often", score: 2 },
  { label: "Almost always", score: 3 },
];

const CONFIG: QuizConfig = {
  intro: {
    eyebrow: "Self-Assessment",
    headline: "Are you in a codependent dynamic?",
    body: "Codependency is one of the strongest predictors of whether an intervention — and a loved one's recovery — will actually take. This 10-question assessment gives you an honest read on the patterns running quietly underneath your family system.",
  },
  questions: [
    {
      id: "c1",
      prompt:
        "I have trouble saying no to my loved one, even when their request is unreasonable.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c2",
      prompt:
        "I feel responsible for my loved one's choices, mood, or wellbeing.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c3",
      prompt:
        "I have lent money, paid bills, or covered consequences for my loved one's actions.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c4",
      prompt:
        "I find it difficult to focus on my own needs, hobbies, or relationships because of what my loved one is going through.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c5",
      prompt:
        "I avoid conflict with my loved one, even when something needs to be said.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c6",
      prompt:
        "I feel anxious or guilty when I try to put boundaries in place.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c7",
      prompt:
        "I have made excuses for my loved one's behaviour to family, friends, or employers.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c8",
      prompt:
        "I feel that no one else can support my loved one the way I do.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c9",
      prompt:
        "I have lost touch with what I want or need outside of caring for my loved one.",
      options: STANDARD_OPTIONS,
    },
    {
      id: "c10",
      prompt:
        "I feel that if I stop helping, my loved one will spiral or be in serious danger.",
      options: STANDARD_OPTIONS,
    },
  ],
  buckets: [
    {
      minScore: 0,
      level: "low",
      title: "Healthy boundaries — keep tending to them.",
      body: "Your assessment suggests you're maintaining good self-protection inside what is clearly a hard family situation. Keep prioritising your own life, support network, and well-being. If patterns shift, this assessment is here whenever you want to recheck.",
      ctaLabel: "Talk to a Specialist Anyway",
    },
    {
      minScore: 8,
      level: "moderate",
      title: "Some codependent patterns are forming.",
      body: "You're starting to absorb your loved one's struggle in ways that will quietly cost you over time. This is a great moment to learn what healthy support actually looks like — versus what feels supportive but is actually enabling. Our free consultation walks you through exactly that.",
      ctaLabel: "Get a Free Consultation",
    },
    {
      minScore: 16,
      level: "high",
      title: "You are deep in a codependent dynamic. Please call us.",
      body: "You are doing the work of two people — and your loved one's recovery is unlikely to take hold until that dynamic changes. This is not a judgment; it is one of the most common patterns we see. Families that break the codependent loop see dramatically better outcomes. We can help you start.",
      ctaLabel: "Call Now — Let's Talk",
    },
  ],
};

export default function CodependencyAssessmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Codependency Assessment"
        headline="A 2-minute self-check for the family member."
        body="Built around the patterns we see most often in families dealing with addiction or mental health crises. Anonymous, no email required, no judgment."
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
