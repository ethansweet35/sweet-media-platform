import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";
import Quiz, { type QuizConfig } from "@/components/quiz/Quiz";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

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

      <TrustStrip />

      {/* Why this matters */}
      <section className="bg-[#F5F3E7] py-12">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-10">
          <div className="rounded-3xl bg-[#3E5B50] p-8 text-white">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="brand-eyebrow mb-3 text-[#8FAC87]">Why This Matters</p>
                <h2 className="font-heading text-2xl font-bold md:text-3xl">
                  Codependency is one of the strongest predictors of <span className="italic text-[#8FAC87]">whether recovery takes hold</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Families that break codependent patterns before and during treatment see dramatically better outcomes. This assessment helps you understand where you stand — honestly and without judgment.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: "ri-heart-pulse-line", text: "Anonymous — no data stored" },
                  { icon: "ri-time-line", text: "Takes 2 minutes" },
                  { icon: "ri-shield-check-line", text: "Clinically designed" },
                  { icon: "ri-refresh-line", text: "Retake anytime" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                    <i className={`${f.icon} text-[#8FAC87] text-lg`}></i>
                    <span className="text-sm font-medium text-white">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Quiz config={CONFIG} />

      <BottomCta
        title="Want to talk through what you discovered?"
        italicWord="discovered"
        body="Our interventionists work with families every day on exactly these patterns. Your first call is free, confidential, and judgment-free."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
        secondaryLabel="Take the Intervention Quiz"
        secondaryHref="/intervention-quiz"
      />
    </main>
  );
}
