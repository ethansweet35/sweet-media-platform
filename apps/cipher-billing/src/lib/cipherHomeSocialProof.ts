/**
 * Verbatim homepage social proof — cipherbilling.com home rotator + "Why Cipher Billing" counters.
 * Single source of truth for metrics and testimonials shown on the live homepage.
 */

export type CipherHomeTestimonial = {
  quote: string;
  attribution: string;
};

/** Verbatim from cipherbilling.com homepage testimonial rotator. */
export const cipherHomeTestimonials: readonly CipherHomeTestimonial[] = [
  {
    quote:
      "We needed a billing company that conducted business similarly to how we do, prompt and intentional. Cipher has exceeded our expectations. They've continued to be easily accessible & helpful with all our billing needs!",
    attribution: "Tony H.",
  },
  {
    quote:
      "My business was nearly in jeopardy because of the lackluster service from our billing company. Then I switched to Cipher, and they helped turn around our revenue, allowing us to flourish. I am a clinician, not a business person. I needed a billing company that would handle everything billing-related so that I could focus on what mattered — providing exceptional clinical care to patients. Cipher has been that partner for me.",
    attribution: "Dr. Matthew T.",
  },
];

/** Matches `homeMetricSpecs` on the homepage — animated counters in "Why Cipher Billing". */
export const cipherHomeMetricTiles = [
  { value: "$1,821", label: "Inpatient Day Rate" },
  { value: "$1,149", label: "Outpatient Day Rate" },
  { value: "100%", label: "Pre-Payment Review Passing Rate" },
  { value: "30 Days", label: "To Received First Payment" },
] as const;

/** Homepage prose (not counter tiles): eligibility turnaround. */
export const cipherHomeEligibilityTurnaroundCopy =
  "Our numbers reflect our dedication, with an eligibility turnaround averaging just 9 minutes compared to the industry standard 30 minutes.";

/** Short hero-style bullets — verbatim metrics from homepage counters + eligibility copy. */
export const cipherHomeMetricBullets = [
  "100% pre-payment review passing rate",
  "First payment within 30 days of onboarding",
  "9-minute average eligibility turnaround (vs. 30-minute industry standard)",
] as const;
