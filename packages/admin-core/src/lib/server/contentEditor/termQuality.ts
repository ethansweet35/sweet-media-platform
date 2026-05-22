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
  /\bjavascript\s+required\b/i,
  /\bcopyright\s+\d{4}\b/i,
  /\ball\s+rights\s+reserved\b/i,
  /\b\d{4,5}\s+re\b/i,
  /\bnbsp\b/i,
];

/**
 * Legal / ToS / privacy-policy / government-contract fragments scraped from
 * site footers. These pass TF-IDF because many competitor pages share the
 * same boilerplate, but they are never useful SEO targets.
 */
export const LEGAL_BOILERPLATE_PATTERNS: RegExp[] = [
  /\bterms\s+(and|&|of)?\s*conditions\b/i,
  /\bterms\s+conditions\b/i,
  /\bterms\s+agreement\b/i,
  /\bterms\s+of\s+service\b/i,
  /\bprivacy\s+policy\b/i,
  /\bdisclaim(s|er|ers?)?\s+responsibilit/i,
  /\bliabilit(y|ies)\s+attributable\b/i,
  /\bterminate\s+upon\s+notice\b/i,
  /\bupon\s+notice\s+violate\b/i,
  /\bnotice\s+violate\s+terms\b/i,
  /\bviolate\s+terms\b/i,
  /\bauthorized\s+herein\b/i,
  /\bact\s+behalf\b/i,
  /\bemployees\s+agents\b/i,
  /\bcms\s+liable\b/i,
  /\bamerican\s+dental\s+association\b/i,
  /\bfar\s+\d{2}\b/i,
  /\bjune\s+(1987|1995)\b/i,
  /\bfile\s+product\b/i,
  /\bcomputer\s+software\b/i,
  /\bmm\d+\s+new\s+condition\b/i,
  /\bunchanged\s+field\s+validation\b/i,
];

/**
 * Tokens that are almost only meaningful inside legal/footer boilerplate.
 * Not used to block topical phrases like "medicare benefit policy" or
 * "treatment conditions" — only standalone terms and all-legal phrases.
 */
export const LEGAL_BOILERPLATE_UNIGRAMS = new Set([
  "terms",
  "disclaims",
  "disclaimer",
  "disclaimers",
  "herein",
  "hereby",
  "thereof",
  "wherein",
  "pursuant",
  "attributable",
  "indemnify",
  "indemnification",
  "warranties",
  "warranty",
  "terminate",
  "termination",
  "violate",
  "violation",
  "authorized",
  "agents",
  "employees",
  "behalf",
  "liable",
  "liability",
  "agreement",
  "agreements",
]);

/**
 * When every token in a short phrase is one of these, the phrase is footer
 * junk (e.g. "terms conditions", "notice violate terms"). Excludes topical
 * words like "policy", "benefit", "medicare", "conditions" alone in mixed
 * phrases.
 */
const LEGAL_ONLY_PHRASE_TOKENS = new Set([
  ...LEGAL_BOILERPLATE_UNIGRAMS,
  "terms",
  "upon",
  "notice",
  "violate",
  "violation",
  "agreement",
  "agents",
  "employees",
  "behalf",
  "authorized",
  "herein",
  "disclaims",
  "disclaimer",
  "responsibility",
  "responsibilities",
  "liable",
  "liability",
  "attributable",
  "terminate",
  "termination",
  "conditions", // only when paired only with other legal tokens
  "dental", // "american dental association"
  "association", // only in all-legal phrase heuristic below
  "american",
  "software",
  "product",
  "file",
  "computer",
  "cms",
  "far",
  "june",
]);

export function isScrapeArtifact(term: string): boolean {
  const t = term.trim();
  if (!t) return true;
  return SCRAPE_ARTIFACT_PATTERNS.some((re) => re.test(t));
}

export function isLegalBoilerplateTerm(term: string): boolean {
  const t = term.toLowerCase().trim();
  if (!t) return true;
  if (LEGAL_BOILERPLATE_PATTERNS.some((re) => re.test(t))) return true;

  const tokens = t.split(/\s+/).filter((tok) => tok.length > 0);
  if (tokens.length === 0) return true;

  if (tokens.length === 1) {
    return LEGAL_BOILERPLATE_UNIGRAMS.has(tokens[0]);
  }

  // 2–3 word phrases composed entirely of legal/footer tokens.
  if (tokens.length <= 3 && tokens.every((tok) => LEGAL_ONLY_PHRASE_TOKENS.has(tok))) {
    return true;
  }

  return false;
}

/** True for UI scrape junk, legal/footer boilerplate, or empty terms. */
export function isRejectedNlpTerm(term: string): boolean {
  return isScrapeArtifact(term) || isLegalBoilerplateTerm(term);
}

/** Drop rejected terms while preserving candidate metadata. */
export function filterRejectedTerms<T extends { term: string }>(items: T[]): T[] {
  return items.filter((item) => !isRejectedNlpTerm(item.term));
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
/** Legal tokens that should never start or end an extracted n-gram phrase. */
const LEGAL_BOUNDARY_UNIGRAMS = new Set([
  "terms",
  "disclaims",
  "disclaimer",
  "herein",
  "employees",
  "agents",
  "terminate",
  "authorized",
  "behalf",
  "upon",
  "violate",
  "notice",
]);

export function isBoundaryBlocked(token: string): boolean {
  return STRICT_BOILERPLATE_UNIGRAMS.has(token) || LEGAL_BOUNDARY_UNIGRAMS.has(token);
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
