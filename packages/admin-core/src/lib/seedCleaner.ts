/**
 * Common English stopwords + meta-words that hurt Semrush phrase_fullsearch
 * recall when included in a seed. Anything in this set will be stripped before
 * we trim a long title down to the first 4 meaningful words.
 */
const STOPWORDS = new Set<string>([
  // articles + prepositions
  "a", "an", "the", "of", "to", "for", "with", "in", "on", "at", "by",
  "from", "into", "onto", "over", "under", "after", "before",
  // common copulas / aux verbs
  "is", "are", "be", "was", "were", "been", "being", "do", "does", "did",
  "can", "will", "would", "should", "could", "may", "might", "must",
  // pronouns
  "i", "you", "we", "they", "he", "she", "it", "my", "your", "our",
  "their", "his", "her", "its",
  // question words & fillers
  "how", "why", "what", "when", "where", "which", "who", "whom",
  "that", "this", "these", "those", "or", "and", "but", "if", "then",
  "so", "as", "than", "more", "less", "most", "least", "all", "any",
  "some", "every", "much", "many", "such", "via", "vs", "etc",
  // pure numbers should be filtered too — handled separately below
]);

const MAX_SEED_WORDS = 4;

/**
 * Clean a raw title string into a Semrush-friendly seed phrase.
 *
 * Why this exists:
 *   Semrush's `phrase_fullsearch` (broad-match keyword research) requires every
 *   word in the seed to appear in candidate keywords. A blog title like
 *   "Parent Enabling Addiction: Signs & How to Stop" sends 8 words → no
 *   keyword in Semrush's index contains all 8 → empty result.
 *
 * Pipeline:
 *   1. Drop everything after the first sentence-ending punctuation
 *      (`:`, `?`, `!`, `|`) or a separating dash — this kills subtitles.
 *   2. Strip punctuation that confuses search (`& , ' " ( ) [ ] /`).
 *   3. Lowercase + collapse whitespace.
 *   4. If still > 4 words, drop stopwords; if at least 2 meaningful tokens
 *      remain, take the first 4 of those. Otherwise take the first 4 raw
 *      words (we'd rather send a noisy seed than nothing).
 *
 * Idempotent — running it twice on the same input yields the same output.
 */
export function cleanSeedPhrase(raw: string | null | undefined): string {
  if (!raw) return "";
  let s = raw.trim();
  if (!s) return "";

  // 1. Strip subtitle / clause after `:`, `?`, `!`, `|` or a separating em/en/hyphen dash.
  //    Match the leading clause greedily but stop at the first delimiter.
  const subtitleSplit = s.match(/^([^:?!|]+?)(?=\s*[:?!|]|\s+[—–-]\s+|$)/);
  if (subtitleSplit && subtitleSplit[1]) {
    s = subtitleSplit[1].trim();
  }

  // 2. Strip noisy punctuation, collapse whitespace.
  s = s.replace(/[&,'"()\[\]\/]/g, " ").replace(/\s+/g, " ").trim();
  if (!s) return "";

  // 3. Lowercase tokens and drop pure-number tokens (rarely useful in seeds).
  const words = s
    .toLowerCase()
    .split(" ")
    .filter((w) => w.length > 0 && !/^\d+$/.test(w));

  if (words.length === 0) return "";
  if (words.length <= MAX_SEED_WORDS) return words.join(" ");

  // 4. Too long — strip stopwords and keep the first MAX_SEED_WORDS meaningful tokens.
  const meaningful = words.filter((w) => !STOPWORDS.has(w));
  const pool = meaningful.length >= 2 ? meaningful : words;
  return pool.slice(0, MAX_SEED_WORDS).join(" ");
}

/**
 * Strip a trailing brand suffix from an SEO title.
 *   "Hawaii Drug Intervention Services | Addiction Interventions"
 *     → "Hawaii Drug Intervention Services"
 *   "Family Help — Brand Name"
 *     → "Family Help"
 * Returns the original string when no recognisable separator is found.
 */
export function stripBrandSuffix(seoTitle: string): string {
  if (!seoTitle) return "";
  const stripped = seoTitle.replace(/\s*[|–—-]\s*[^|–—-]+$/, "").trim();
  return stripped || seoTitle.trim();
}

/** Slugs that rarely identify a unique page topic on their own. */
const GENERIC_ROUTE_SLUGS = new Set([
  "about",
  "about-us",
  "contact",
  "contact-us",
  "home",
  "blog",
  "thank-you",
  "thanks",
  "privacy",
  "privacy-policy",
  "terms",
  "terms-of-use",
  "services",
  "resources",
  "faq",
  "faqs",
  "careers",
  "login",
  "search",
  "team",
  "staff",
  "locations",
  "location",
  "news",
  "events",
  "gallery",
  "media",
  "press",
  "support",
  "help",
  "sitemap",
  "index",
  "404",
  "not-found",
]);

const NUMBER_WORD_EQUIV: Record<string, string[]> = {
  "3": ["three", "third", "3rd"],
  three: ["3", "third", "3rd"],
  "4": ["four", "fourth", "4th"],
  four: ["4", "fourth", "4th"],
  "5": ["five", "fifth", "5th"],
  five: ["5", "fifth", "5th"],
};

/** Last URL segment as a spaced phrase (e.g. `/3-pillars` → `3 pillars`). */
export function routeSlugToSeed(routePath: string): string {
  const last = routePath.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/[-_]+/g, " ").trim().toLowerCase();
}

/** True when the slug signals a specific landing page (not generic nav). */
export function isDistinctiveRouteSlug(slug: string): boolean {
  const s = slug.trim().toLowerCase();
  if (!s || GENERIC_ROUTE_SLUGS.has(s)) return false;
  if (/\d/.test(s)) return true;
  const words = s.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return true;
  return s.length >= 8;
}

function tokenRelatesToSlug(token: string, slugToken: string): boolean {
  if (token === slugToken) return true;
  if (token.length >= 4 && slugToken.length >= 4) {
    if (token.startsWith(slugToken) || slugToken.startsWith(token)) return true;
  }
  const equiv = NUMBER_WORD_EQUIV[token] ?? NUMBER_WORD_EQUIV[slugToken];
  if (equiv?.includes(slugToken) || equiv?.includes(token)) return true;
  return false;
}

/** Whether a cleaned seed already reflects the route slug (e.g. pillars + 3/three). */
export function seedOverlapsRoute(phrase: string, routePath: string): boolean {
  const cleaned = cleanSeedPhrase(phrase);
  const slug = routeSlugToSeed(routePath);
  if (!cleaned || !slug) return true;

  const phraseTokens = cleaned.split(/\s+/).filter((t) => t.length > 0);
  const slugTokens = slug.split(/\s+/).filter((t) => t.length > 0);
  if (slugTokens.length === 0) return true;

  const matched = slugTokens.filter((st) =>
    phraseTokens.some((pt) => tokenRelatesToSlug(pt, st)),
  );
  return matched.length >= Math.min(1, Math.ceil(slugTokens.length / 2));
}

export type PageKeywordSeedInput = {
  route_path: string;
  page_title: string;
  seo_title?: string | null;
  default_seo_title?: string | null;
  meta_description?: string | null;
};

/** Metadata sent with Semrush requests so the server can enrich seeds with full page context. */
export type PageKeywordSeedContextPayload = {
  page_title?: string;
  seo_title?: string;
  meta_description?: string;
};

/**
 * Build the primary Semrush seed phrase: URL slug + page title first, then clean to 4 words.
 * SEO/meta are not mixed into the primary phrase (they are sent separately for AI refinement).
 */
export function buildPrimaryPageKeywordSeed(input: PageKeywordSeedInput): string {
  const routeSlug = routeSlugToSeed(input.route_path);
  const pageTitle = (input.page_title ?? "").trim();
  const distinctive = isDistinctiveRouteSlug(routeSlug);

  if (distinctive) {
    const parts: string[] = [];
    if (routeSlug) parts.push(routeSlug);
    if (pageTitle) parts.push(pageTitle);
    if (parts.length > 0) {
      const cleaned = cleanSeedPhrase(parts.join(" "));
      if (cleaned) return cleaned;
      return parts.join(" ");
    }
  }

  if (pageTitle) {
    const cleaned = cleanSeedPhrase(pageTitle);
    if (cleaned) return cleaned;
    return pageTitle;
  }

  if (routeSlug) return cleanSeedPhrase(routeSlug) || routeSlug;

  const activeSeo = stripBrandSuffix((input.seo_title ?? "").trim());
  const defaultSeo = stripBrandSuffix((input.default_seo_title ?? "").trim());
  const meta = (input.meta_description ?? "").trim();

  if (activeSeo) return cleanSeedPhrase(activeSeo) || activeSeo;
  if (defaultSeo) return cleanSeedPhrase(defaultSeo) || defaultSeo;
  if (meta) return cleanSeedPhrase(meta) || meta;
  return "";
}

/** @deprecated Use buildPrimaryPageKeywordSeed — kept as alias for call sites. */
export function derivePageKeywordResearchSeed(input: PageKeywordSeedInput): string {
  return buildPrimaryPageKeywordSeed(input);
}

export function toPageKeywordSeedContextPayload(
  input: PageKeywordSeedInput,
): PageKeywordSeedContextPayload {
  const activeSeo = stripBrandSuffix((input.seo_title ?? "").trim());
  const defaultSeo = stripBrandSuffix((input.default_seo_title ?? "").trim());
  return {
    page_title: (input.page_title ?? "").trim() || undefined,
    seo_title: activeSeo || defaultSeo || undefined,
    meta_description: (input.meta_description ?? "").trim() || undefined,
  };
}
