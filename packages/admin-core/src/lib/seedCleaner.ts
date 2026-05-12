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
