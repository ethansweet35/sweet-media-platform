export type Faq = {
  question: string;
  answer: string;
};

/**
 * Default FAQ block reused by templates when a page-specific list isn't
 * provided. Keep these short and scannable — full FAQs live on /faqs.
 */
export const DEFAULT_FAQS: Faq[] = [
  {
    question: "What is an intervention?",
    answer:
      "An intervention is a structured, carefully planned conversation in which family members, friends, and trained professionals come together to encourage someone struggling with addiction or a mental health crisis to accept treatment. We guide every step, from preparation to the moment your loved one says yes.",
  },
  {
    question: "How fast can you organise an intervention?",
    answer:
      "In most cases we can be on site within 24–48 hours. For active crises we will start that same day. The first call is always free and confidential — we listen, assess, and tell you exactly what comes next.",
  },
  {
    question: "What happens if my loved one says no?",
    answer:
      "An intervention is rarely a one-shot moment. Our process is designed to keep the door open — even when the answer is initially no. Families often see real change within days or weeks once boundaries are set and the entire family system shifts together.",
  },
  {
    question: "Do you handle interventions outside our home state?",
    answer:
      "Yes. We provide on-site interventions across all 50 states and have a national network of certified interventionists. Travel logistics, lodging, and treatment placement are coordinated by our team.",
  },
  {
    question: "How much does an intervention cost?",
    answer:
      "Costs depend on travel, the model used, and how much pre-/post-work the family needs. We are transparent about pricing on the first call and never quote without understanding your situation. Many families find that the cost is far less than the financial damage of continued addiction.",
  },
];

export const LOCATION_FAQS = (location: string): Faq[] => [
  {
    question: `Do you provide interventions in ${location}?`,
    answer: `Yes. We coordinate on-site addiction and mental health interventions throughout ${location} and connect families with appropriate treatment programs near you or wherever your loved one will get the best care.`,
  },
  {
    question: "How quickly can you get to us?",
    answer:
      "Most families have a certified interventionist on the ground within 24–48 hours. For active crises we mobilise the same day.",
  },
  {
    question: "Can our loved one go to treatment outside the state?",
    answer:
      "Often, yes — and sometimes that is the right call. Removing your loved one from their environment can break the cycle of triggers and enabling relationships. We help you weigh local versus out-of-state options.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Intervention services are typically paid privately, but we work with treatment centres that accept most major insurance plans. We will help you understand exactly what is covered before any financial commitment.",
  },
];
