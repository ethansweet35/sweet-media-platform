/**
 * Homepage social proof — testimonial rotator + "Why Cipher Billing" counters.
 * Single source of truth for metrics reused on the homepage and service social-proof sections.
 */

import type { HomeMetricSpec } from "@/views/home/components/HomeMetricsGrid";

function metricSpecToTile(spec: HomeMetricSpec): { value: string; label: string } {
  const prefix = spec.prefix ?? "";
  const suffix = spec.suffix ?? "";
  const num =
    spec.decimals != null
      ? spec.end.toLocaleString("en-US", {
          minimumFractionDigits: spec.decimals,
          maximumFractionDigits: spec.decimals,
        })
      : spec.useGrouping
        ? Math.round(spec.end).toLocaleString("en-US")
        : String(Math.round(spec.end));
  return { value: `${prefix}${num}${suffix}`, label: spec.label };
}

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

/** Animated counters in homepage "Why Cipher Billing" — also drives static tiles below. */
export const cipherHomeMetricSpecs = [
  { end: 82, suffix: "%", label: "Peer Review Approval Rate" },
  { end: 1.86, suffix: "%", decimals: 2, label: "Write-off Rate" },
  { end: 96, suffix: "%", label: "Medical Record Approval Rate" },
  { end: 8, suffix: "%", label: "Claims That Turn Into Medical Records" },
  { end: 30, suffix: " Days", label: "Days to First Payment" },
  { end: 100, suffix: "%", label: "Pre-Payment Review Success" },
] as const satisfies readonly HomeMetricSpec[];

/** Static metric tiles for service-page social proof sections. */
export const cipherHomeMetricTiles = cipherHomeMetricSpecs.map(metricSpecToTile);

/** Homepage prose (not counter tiles): eligibility turnaround. */
export const cipherHomeEligibilityTurnaroundCopy =
  "Our numbers reflect our dedication, with an eligibility turnaround averaging just 9 minutes compared to the industry standard 30 minutes.";

/** Short hero-style bullets — key metrics from homepage counters + eligibility copy. */
export const cipherHomeMetricBullets = [
  "82% peer review approval rate",
  "1.86% write-off rate",
  "96% medical record approval rate",
  "100% pre-payment review success",
  "First payment within 30 days of onboarding",
  "9-minute average eligibility turnaround (vs. 30-minute industry standard)",
] as const;
