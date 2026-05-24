/**
 * CallRail dynamic number swap target (see src/app/layout.tsx CALLRAIL_SWAP_SRC).
 * Source number on the site — CallRail may replace it at runtime for tracking.
 * Matches sullivanrecovery.com tel: links and button labels.
 */
export const CALLRAIL_PHONE_DISPLAY = "949-836-7180";
/** Formatted for compact UI (footer, floating CTA) */
export const CALLRAIL_PHONE_DISPLAY_PARENS = "(949) 836-7180";
export const CALLRAIL_PHONE_HREF = "tel:9498367180";

/**
 * Static number in live site JSON-LD (not swapped). Use for Schema.org only.
 * @see https://sullivanrecovery.com/ — LocalBusiness telephone in page source
 */
export const SCHEMA_PHONE_E164 = "+1-949-625-0035";
