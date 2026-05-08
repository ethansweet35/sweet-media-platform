import type { Faq } from "./faqs";

export type FaqGroup = {
  title: string;
  description?: string;
  items: Faq[];
};

/**
 * Full long-form FAQ content for /faqs page. Grouped by topic.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is an intervention?",
        answer:
          "An intervention is a structured, carefully planned conversation in which family members, friends, and trained professionals come together to encourage someone struggling with addiction or a mental health crisis to accept treatment. The goal is not confrontation — it is connection, with a clear, pre-arranged plan for what comes next.",
      },
      {
        question: "How quickly can you get to us?",
        answer:
          "Most families have a certified interventionist on the ground within 24–48 hours of the first call. For active crises — overdose risk, suicidal ideation, dangerous behaviour — we mobilise the same day.",
      },
      {
        question: "Is the first call free?",
        answer:
          "Yes. Every first call is free, confidential, and judgment-free. We listen, assess, and tell you exactly what we'd do if it were our family. There is no pressure to move forward.",
      },
      {
        question: "Do you only handle interventions in certain states?",
        answer:
          "We coordinate on-site interventions across all 50 states and have a national network of certified interventionists. Travel logistics, lodging, and treatment placement are coordinated by our team.",
      },
    ],
  },
  {
    title: "How Interventions Work",
    items: [
      {
        question: "Are all interventions the surprise-style 'reality TV' kind?",
        answer:
          "No — and that style is rarely what we recommend. We use a range of evidence-based methods including the ARISE® Model (invitational, family-centred) and, when appropriate, the Johnson Model. The right method depends on your loved one's situation, not our preference.",
      },
      {
        question: "Who should be in the room?",
        answer:
          "Curating the right group is one of the most important parts of intervention preparation. Generally we recommend close family, a few key friends, and any spiritual or community leaders your loved one trusts. We often recommend keeping young children, highly volatile relatives, or anyone actively using out of the room.",
      },
      {
        question: "What happens if my loved one says no?",
        answer:
          "An intervention is rarely a one-shot moment. Even when the immediate answer is no, families often see real change within days or weeks once boundaries are clearly set and the family system shifts together. We continue to coach the family through what comes next.",
      },
      {
        question: "What if my loved one becomes aggressive or tries to flee?",
        answer:
          "Our interventionists are trained in de-escalation and have specific safety protocols for aggression and flight risk. We assess these risks during preparation and structure the intervention environment accordingly.",
      },
    ],
  },
  {
    title: "Treatment & Aftercare",
    items: [
      {
        question: "Where will my loved one go for treatment?",
        answer:
          "We only place loved ones in treatment programs we'd send our own family to. We have no financial relationships that compromise our recommendations. Placement depends on what your loved one actually needs — clinically, financially, and personally — not on what's most convenient.",
      },
      {
        question: "Do you stay involved after treatment placement?",
        answer:
          "Yes. Most intervention services end the moment your loved one accepts treatment — we believe that's where the real work begins. We stay engaged with the family through detox, residential, outpatient, and long-term recovery support.",
      },
      {
        question: "What if my loved one needs treatment outside our state?",
        answer:
          "Often, removing your loved one from familiar triggers, enabling relationships, or unsafe environments is the most loving thing a family can do. We help you weigh local versus out-of-state options honestly.",
      },
    ],
  },
  {
    title: "Cost & Insurance",
    items: [
      {
        question: "How much does an intervention cost?",
        answer:
          "Costs depend on travel, the model used, and how much pre- and post-work the family needs. We are transparent about pricing on the first call and never quote without understanding your situation. Most families find the cost is far less than the financial damage of continued addiction — even a single month of it.",
      },
      {
        question: "Do you accept insurance for the intervention itself?",
        answer:
          "Intervention services are typically paid privately. However, the treatment programs we connect families with accept most major insurance plans — and we will help you understand exactly what is covered before any financial commitment.",
      },
      {
        question: "Are there hidden referral fees we should worry about?",
        answer:
          "No. We have no pay-to-play relationships with treatment centres. Our recommendations are based purely on clinical fit and outcomes — not on what kicks back to us.",
      },
    ],
  },
  {
    title: "For the Family",
    items: [
      {
        question:
          "Will my loved one hate me for staging an intervention?",
        answer:
          "This is the fear we hear most often. The honest answer: maybe in the moment — and almost never in the long run. The vast majority of people who go through a successful intervention later thank the family for it. We coach you through this fear during preparation.",
      },
      {
        question: "What does the family need to do before the intervention?",
        answer:
          "We meet with the family multiple times before the intervention itself to set boundaries, write letters, agree on consequences, and prepare emotionally. The intervention day is the visible part — but the preparation is where most of the change actually happens.",
      },
      {
        question: "How do we know if it's time?",
        answer:
          "If you're searching for an intervention, it's already time. The longer you wait, the more entrenched the patterns become — for your loved one and for the rest of the family. The first call is free; let us help you decide.",
      },
    ],
  },
];
