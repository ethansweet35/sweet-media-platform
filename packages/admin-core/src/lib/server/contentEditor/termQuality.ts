/**
 * Shared term-quality rules for n-gram extraction and lite curation.
 *
 * Mirrors what Surfer / Clearscope / Rankability do:
 *   - Broad TF-IDF candidate pool across top 10-20 SERP results
 *   - Length-bonus phrase bias (most output is 2-3 word phrases)
 *   - Filter ONLY true noise tokens at the phrase-boundary level
 *     (contact / form / address / a11y junk)
 *   - Suppress generic high-frequency words ONLY as standalone unigrams.
 *     The same words ("services", "support", "care", "treatment") are
 *     valuable INSIDE phrases — `intervention services`,
 *     `family support`, `treatment center`, `care provider`.
 */

/**
 * Tier 1: TRUE NOISE. Never useful in any context — UI chrome, form
 * labels, address fragments, HTML decode artifacts.
 *
 * Used to:
 *   1. Reject standalone unigrams in n-gram extraction
 *   2. Reject phrases where a BOUNDARY token is one of these
 *      (interior tokens are fine — "click here for help" → boundary
 *      "click"/"help" both noise → dropped; "support group" → neither
 *      noise → kept)
 *   3. Reject terms in lite curation
 */
export const STRICT_BOILERPLATE_UNIGRAMS = new Set([
  // Contact / address / form chrome
  "contact", "phone", "email", "emails", "fax", "name", "names",
  "address", "addresses", "suite", "ste", "apt", "unit", "po", "box",
  "avenue", "ave", "street", "st", "road", "rd", "drive", "dr",
  "lane", "ln", "blvd", "boulevard", "highway", "hwy", "route", "rte",
  "zip", "code", "postal",
  // Nav / UI / a11y
  "menu", "login", "signup", "logout", "register", "subscribe",
  "click", "tap", "press", "here", "there",
  "opens", "open", "opened", "close", "closed", "closes",
  "window", "windows", "tab", "tabs", "popup",
  "nbsp", "amp", "quot", "lt", "gt",
  // Form / validation chrome
  "validation", "purposes", "unchanged", "field", "fields",
  "submit", "cancel", "required", "optional",
  "captcha", "checkbox", "dropdown",
  // Bare cardinal directions w/o context
  "south", "north", "east", "west", "southeast", "northeast",
  "southwest", "northwest",
]);

/**
 * Tier 2: WEAK STANDALONE UNIGRAMS. Common English words that are
 * topical INSIDE phrases but uninformative on their own.
 *
 * Used to:
 *   - Reject these as standalone single-word terms in lite curation.
 *
 * NOT used in n-gram boundary filtering — `intervention services`,
 * `family support`, `treatment options`, `care provider`,
 * `professional team`, `community resources` must survive extraction.
 */
export const WEAK_STANDALONE_UNIGRAMS = new Set([
  "services", "service", "support", "supports", "supporting",
  "professional", "professionals", "provider", "providers",
  "resources", "resource", "options", "option", "care", "cares",
  "team", "teams", "community", "communities", "people", "person",
  "persons", "individual", "individuals", "family", "families",
  "house", "home", "page", "site", "section", "sections",
  "understand", "understanding", "focus", "focusing", "ongoing",
  "consent", "effectively", "effective", "referring", "referral",
  "referrals", "without", "within", "between",
  "monitoring", "monitor", "programming",
  "communication", "communications",
  "state", "states", "city", "cities", "county", "counties",
  "country", "region", "regions", "area", "areas",
  "funding", "justice", "probation", "nonprofit",
  "struggling", "struggle", "struggles",
  "disabilities", "disability",
  "everyday", "routines", "routine", "activities", "activity",
  "delays", "delay", "developmental",
  "systems", "system",
  "info", "information",
  "stuff", "things", "thing",
  // Truly off-topic location proper nouns are NOT here — those are
  // legitimate signals when competitors all serve the same region.
]);

/**
 * Phrase-level scrape / a11y / form artifacts (regex, matched anywhere
 * in the term). These are concatenations that survive HTML cleanup.
 */
export const SCRAPE_ARTIFACT_PATTERNS: RegExp[] = [
  /\bopens?\s+(in\s+)?a?\s*new\s+(window|tab)\b/i,
  /\bopen\s+in\s+new\s+tab\b/i,
  /\bfield\s+validation\b/i,
  /\bvalidation\s+purposes\b/i,
  /\bpurposes\s+left\b/i,
  /\bleft\s+unchanged\b/i,
  /\bskip\s+to\s+(main\s+)?content\b/i,
  /\bjavascript\s+enabled\b/i,
  /\bcopyright\s+\d{4}\b/i,
  /\ball\s+rights\s+reserved\b/i,
  /\b\d{4,5}\s+re\b/i,
  /\bnbsp\b/i,
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
 * Should a token be allowed at a PHRASE BOUNDARY in n-gram extraction?
 * Only the strict noise tier blocks boundaries — weak-standalone words
 * are perfectly fine at boundaries (`intervention services`,
 * `support group`, `care plan`, `treatment options`).
 */
export function isBoundaryBlocked(token: string): boolean {
  return STRICT_BOILERPLATE_UNIGRAMS.has(token);
}

/**
 * Standalone (single-word) unigram check used by lite rules curation.
 * Surfer-style: keep unigrams ONLY when they are clearly topical AND
 * have strong competitor coverage + density.
 */
export function isWeakStandaloneUnigram(
  term: string,
  pkTokens: Set<string>,
  coverage: number,
  avgFreq: number,
): boolean {
  const tok = term.toLowerCase().trim();
  if (pkTokens.has(tok)) return false;
  if (STRICT_BOILERPLATE_UNIGRAMS.has(tok)) return true;
  if (WEAK_STANDALONE_UNIGRAMS.has(tok)) return true;
  if (tok.length < 4) return true;
  // Below this density we don't trust a single English word as a meaningful
  // topical signal. Multi-word phrases are preferred by the corpus.
  if (coverage < 0.4 || avgFreq < 3) return true;
  return false;
}

// ─── Back-compat shims ──────────────────────────────────────────────────
// Older imports still reference these names. Keep them around so existing
// pipeline / ngram code compiles without touching every callsite.
export const WEB_BOILERPLATE_UNIGRAMS = STRICT_BOILERPLATE_UNIGRAMS;
export const isWeakUnigramForTopic = isWeakStandaloneUnigram;
