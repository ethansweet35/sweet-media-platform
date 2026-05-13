/**
 * Pure text utilities used across the content editor pipeline.
 *
 * No I/O, no external dependencies — fully testable in isolation.
 */
import { createHash } from "crypto";

// ─── Stopwords ──────────────────────────────────────────────────────────
// Standard English stopword list. Augmented with a handful of common SEO
// boilerplate tokens that appear on virtually every page ("read", "more",
// "click", "menu") that would otherwise pollute n-gram extraction.
export const ENGLISH_STOPWORDS = new Set<string>([
  "a", "about", "above", "after", "again", "against", "all", "am", "an",
  "and", "any", "are", "aren", "as", "at", "be", "because", "been", "before",
  "being", "below", "between", "both", "but", "by", "can", "cannot", "could",
  "did", "do", "does", "doing", "don", "down", "during", "each", "few",
  "for", "from", "further", "had", "has", "have", "having", "he", "her",
  "here", "hers", "herself", "him", "himself", "his", "how", "i", "if",
  "in", "into", "is", "isn", "it", "its", "itself", "just", "me", "more",
  "most", "my", "myself", "no", "nor", "not", "now", "of", "off", "on",
  "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over",
  "own", "same", "she", "should", "so", "some", "such", "than", "that",
  "the", "their", "theirs", "them", "themselves", "then", "there", "these",
  "they", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "we", "were", "what", "when", "where", "which", "while",
  "who", "whom", "why", "will", "with", "would", "you", "your", "yours",
  "yourself", "yourselves",
  // SEO / web boilerplate
  "read", "click", "menu", "search", "home", "blog", "page", "site",
  "skip", "back", "next", "previous", "share", "tweet", "post", "posts",
  "tag", "tags", "category", "categories", "comment", "comments", "reply",
  "subscribe", "newsletter", "email", "login", "signup", "sign",
  // URL artifacts (appear in scraped text as bare tokens)
  "https", "http", "www",
  // Common words missed from standard stopword lists
  "like", "one", "ones",
  // Generic web verbs
  "us", "uses", "use", "using", "used", "make", "makes", "making", "made",
  "get", "gets", "getting", "got", "go", "goes", "going", "gone",
  "say", "says", "said", "see", "sees", "seeing", "seen",
  "know", "knows", "knowing", "knew", "known",
  "think", "thinks", "thinking", "thought",
  "want", "wants", "wanting", "wanted",
  "also", "however", "therefore", "thus",
]);

// ─── Sha256 ─────────────────────────────────────────────────────────────
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

// ─── Domain helpers ─────────────────────────────────────────────────────
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// ─── Tokenization ───────────────────────────────────────────────────────
/**
 * Tokenize a body of text into lowercase tokens with stopwords removed.
 * Splits on any non-word character; preserves apostrophes inside words
 * but strips them at boundaries.
 */
export function tokenize(text: string, opts: { keepStopwords?: boolean } = {}): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  // Split on whitespace + most punctuation. Keep alphanumeric + apostrophes.
  const raw = lower.match(/[a-z0-9][a-z0-9'-]*[a-z0-9]|[a-z0-9]/g) ?? [];
  if (opts.keepStopwords) return raw;
  return raw.filter((t) => !ENGLISH_STOPWORDS.has(t) && t.length > 1);
}

// ─── Sentence splitting ─────────────────────────────────────────────────
/**
 * Split text into sentences. Naive but fast — uses period/!/?/newline as
 * terminators and protects against common abbreviations ("Dr.", "U.S.").
 * Good enough for embedding-based fact-coverage matching.
 */
export function splitSentences(text: string): string[] {
  if (!text) return [];

  // Protect common abbreviations from being treated as sentence enders.
  const protectedAbbr = text
    .replace(/\b(Dr|Mr|Mrs|Ms|Sr|Jr|St|Mt|Inc|Ltd|Co|Corp|Lt|Gen|Sgt|Cpl|Pvt)\./g, "$1\u00A0")
    .replace(/\b([A-Z])\.([A-Z])\./g, "$1\u00A0$2\u00A0")  // U.S., U.K., F.B.I.
    .replace(/\b(Ph|Sc|M|B|D)\.D\./g, "$1\u00A0D\u00A0")    // Ph.D., M.D.
    .replace(/\b(vs|etc|e\.g|i\.e)\./g, "$1\u00A0");

  // Split on terminator + space + capital, or newline groups.
  const parts = protectedAbbr.split(/(?<=[.!?])\s+(?=[A-Z"'\u201C])|\n{2,}/g);

  return parts
    .map((s) => s.replace(/\u00A0/g, ".").replace(/\s+/g, " ").trim())
    .filter((s) => s.length >= 10); // Drop fragments
}

// ─── Percentile ─────────────────────────────────────────────────────────
/**
 * Linear-interpolation percentile. Sorts a copy of the input — does not
 * mutate. Returns 0 if the array is empty. `p` is in [0, 1].
 */
export function percentile(values: number[], p: number): number {
  if (!values.length) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const idx = Math.max(0, Math.min(sorted.length - 1, p * (sorted.length - 1)));
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function median(values: number[]): number {
  return percentile(values, 0.5);
}

// ─── Frequency counting ─────────────────────────────────────────────────
/**
 * Count occurrences of a multi-word term in a body of text.
 * Uses lowercase, word-boundary, plural-tolerant matching.
 *
 * For single-token terms ("addiction"), matches whole-word occurrences.
 * For multi-word terms ("intensive outpatient program"), matches the exact
 * phrase with optional plural "s" on the final word.
 */
export function countTermOccurrences(text: string, term: string): number {
  if (!text || !term) return 0;
  const cleanTerm = term.trim().toLowerCase();
  if (!cleanTerm) return 0;
  // Escape regex special chars
  const escaped = cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Allow optional trailing 's' for plural tolerance on the last token.
  const pattern = `\\b${escaped}s?\\b`;
  try {
    const re = new RegExp(pattern, "gi");
    const matches = text.match(re);
    return matches ? matches.length : 0;
  } catch {
    return 0;
  }
}

// ─── First-N-words helpers ──────────────────────────────────────────────
export function getFirstNWords(text: string, n: number): string {
  if (!text || n <= 0) return "";
  const words = text.trim().split(/\s+/).slice(0, n);
  return words.join(" ");
}

// ─── Question detection ─────────────────────────────────────────────────
const QUESTION_STARTERS = new Set([
  "what", "how", "why", "when", "where", "which", "who", "whose",
  "is", "are", "was", "were", "do", "does", "did", "can", "could",
  "should", "will", "would", "may", "might",
]);

export function looksLikeQuestion(text: string): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  if (trimmed.endsWith("?")) return true;
  const firstWord = trimmed.toLowerCase().split(/\s+/)[0];
  return QUESTION_STARTERS.has(firstWord);
}
