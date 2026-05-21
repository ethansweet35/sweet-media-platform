/**
 * Shared term-quality rules for n-gram extraction and lite curation.
 * Keeps Surfer-style topical phrases without extra LLM calls.
 */

/** Single words that appear on almost every page but add no topical signal. */
export const WEB_BOILERPLATE_UNIGRAMS = new Set([
  "contact", "phone", "call", "email", "name", "menu", "login", "signup",
  "address", "suite", "avenue", "street", "road", "drive", "lane", "blvd",
  "south", "north", "east", "west", "united", "state", "city", "county",
  "zip", "code", "nbsp", "window", "tab", "opens", "open", "click", "here",
  "without", "people", "person", "team", "house", "home", "page", "site",
  "services", "service", "support", "professional", "provider", "resources",
  "understand", "focus", "ongoing", "options", "consent", "effectively",
  "referring", "care", "funding", "justice", "probation", "nonprofit",
  "struggling", "communication", "monitoring", "validation", "purposes",
  "unchanged", "field", "left", "everyday", "routines", "activities",
  "delays", "developmental", "individuals", "systems", "programming",
  "disabilities", "coaching",
]);

/** Phrase-level scrape / a11y / form artifacts (matched anywhere in term). */
export const SCRAPE_ARTIFACT_PATTERNS: RegExp[] = [
  /\bopens?\s+(in\s+)?a?\s*new\s+(window|tab)\b/i,
  /\bopen\s+in\s+new\s+tab\b/i,
  /\bfield\s+validation\b/i,
  /\bvalidation\s+purposes\b/i,
  /\bpurposes\s+left\b/i,
  /\bleft\s+unchanged\b/i,
  /\beveryday\s+routines\b/i,
  /\bdevelopmental\s+delays\b/i,
  /\bfamilies\s+receive\s+guidance\b/i,
  /\bimpact\s+substance\b/i,
  /\bhealth\s+concerns\b/i,
  /\balcohol\s+drug\b/i,
  /\bhelp\s+families\b/i,
  /\b\d{3,5}\s+re\b/i,
  /\bnbsp\b/i,
  /\breceive\s+guidance\b/i,
];

export function isScrapeArtifact(term: string): boolean {
  const t = term.trim();
  if (!t) return true;
  return SCRAPE_ARTIFACT_PATTERNS.some((re) => re.test(t));
}

export function primaryKeywordTokens(primaryKeyword: string): Set<string> {
  return new Set(
    primaryKeyword
      .toLowerCase()
      .split(/\s+/)
      .map((t) => t.replace(/[^a-z0-9'-]/g, ""))
      .filter((t) => t.length >= 2),
  );
}

/**
 * Surfer-style: mostly 2–3 word phrases; unigrams only when clearly topical.
 */
export function isWeakUnigramForTopic(
  term: string,
  pkTokens: Set<string>,
  coverage: number,
  avgFreq: number,
): boolean {
  const tok = term.toLowerCase().trim();
  if (pkTokens.has(tok)) return false;
  if (WEB_BOILERPLATE_UNIGRAMS.has(tok)) return true;
  if (tok.length < 4) return true;
  // Generic high-frequency words need strong competitor agreement + density.
  if (coverage < 0.35 || avgFreq < 3) return true;
  return false;
}
