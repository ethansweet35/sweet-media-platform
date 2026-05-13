/**
 * TF-IDF n-gram extraction across a corpus of competitor documents.
 *
 * This is the "what topics keep coming up across the top results" engine.
 * It complements Google NLP entity extraction:
 *   - Google NLP catches named things (orgs, places, people, products)
 *   - n-gram TF-IDF catches domain phrases ("verification of benefits",
 *     "intensive outpatient program", "level of care") that aren't formal
 *     named entities but appear consistently across competitors.
 *
 * Algorithm (Surfer's "True Density" equivalent):
 *   1. Tokenize each doc, drop stopwords.
 *   2. Extract unigrams + bigrams + trigrams.
 *   3. For each candidate term, compute:
 *        df   = # of docs that contain it
 *        idf  = ln(N / df)
 *        tf   = total occurrences across corpus
 *        tfidf = tf * idf
 *   4. Filter terms with low document frequency (default 40% of corpus).
 *   5. Compute per-term avg / max occurrence counts across docs — these
 *      drive the recommended usage range in the UI.
 *   6. Return ranked terms.
 */
import { ENGLISH_STOPWORDS, tokenize } from "./textUtils";

export interface NgramTerm {
  term: string;
  /** Total occurrences across the entire corpus. */
  totalFreq: number;
  /** Number of competitor docs that contain this term. */
  docFreq: number;
  /** docFreq / total docs — i.e. coverage ratio in [0, 1]. */
  coverage: number;
  /** Average occurrences per doc (across docs that contain it). */
  avgFreq: number;
  /** Maximum occurrences in any single doc. */
  maxFreq: number;
  /** tf-idf score, used for ranking (without length bonus). */
  tfIdf: number;
  /** Length-weighted final score used for ranking (multi-word phrases preferred). */
  score: number;
  /** Token count of the n-gram (1, 2, or 3). */
  n: number;
}

export interface NgramExtractionOptions {
  /**
   * Minimum fraction of docs that must contain a term. Default 0.25 —
   * Surfer-style, surface anything 3+ of top 10 competitors agree on.
   */
  minDocFreq?: number;
  /** Cap result list at this many terms. Default 300. */
  limit?: number;
  /** Minimum total occurrences across corpus. Default 3. */
  minTotalFreq?: number;
  /**
   * Minimum average frequency (in docs that contain it) required for a
   * unigram to be kept. Multi-word phrases use minTotalFreq only.
   * Default 2 — Surfer keeps unigrams used as little as 2x/doc; the
   * downstream AI curation pass does the topical pruning.
   */
  unigramMinAvgFreq?: number;
}

/** Extract unigram, bigram, trigram terms from a single doc's tokens. */
function extractTermsFromTokens(tokens: string[]): Map<string, number> {
  const freqs = new Map<string, number>();
  const len = tokens.length;
  for (let i = 0; i < len; i++) {
    const t1 = tokens[i];
    if (!t1 || t1.length < 2) continue;

    // Unigram
    freqs.set(t1, (freqs.get(t1) ?? 0) + 1);

    // Bigram
    if (i + 1 < len) {
      const t2 = tokens[i + 1];
      if (t2 && t2.length >= 2) {
        const bi = `${t1} ${t2}`;
        freqs.set(bi, (freqs.get(bi) ?? 0) + 1);
      }
    }

    // Trigram
    if (i + 2 < len) {
      const t2 = tokens[i + 1];
      const t3 = tokens[i + 2];
      if (t2 && t3 && t2.length >= 2 && t3.length >= 2) {
        const tri = `${t1} ${t2} ${t3}`;
        freqs.set(tri, (freqs.get(tri) ?? 0) + 1);
      }
    }
  }
  return freqs;
}

/**
 * Truly noise unigrams. Kept deliberately small.
 *
 * Surfer surfaces many "generic" words ("support", "recovery", "family",
 * "urge", "stress", "behavior") because in topical context they ARE
 * meaningful signals. The AI curation pass downstream of n-gram extraction
 * does the topical pruning; this list only blocks tokens that are noise
 * regardless of topic.
 */
const GENERIC_UNIGRAM_BLOCKLIST = new Set<string>([
  // Pronouns / connectors that snuck past stopword removal
  "anyone", "someone", "everyone", "nothing", "something", "anything",
  // Vague quantifiers / fillers
  "lot", "lots", "bit", "bits", "much", "more", "less", "fewer",
  "various", "several", "many", "few",
  // Vague time / sequence
  "today", "tomorrow", "yesterday", "soon", "later", "earlier",
  "always", "never", "often", "sometimes", "usually",
  // Generic positive / negative modifiers
  "well", "good", "best", "better", "great", "right", "wrong", "bad",
  "important", "different", "similar", "same",
  // Generic verbs of state / speech that add no topical info
  "say", "says", "said", "saying", "tell", "tells", "told", "telling",
  "think", "thinks", "thought", "thinking",
  "make", "makes", "made", "making",
  "take", "takes", "took", "taking", "taken",
  "give", "gives", "gave", "giving", "given",
  "show", "shows", "showed", "showing", "shown",
  "look", "looks", "looked", "looking",
  "come", "comes", "came", "coming",
  "follow", "follows", "followed", "following",
  "include", "includes", "including", "included",
  "ensure", "ensures", "ensuring", "ensured",
  "seem", "seems", "seemed", "seeming",
  "appear", "appears", "appeared", "appearing",
]);

/**
 * Filter out low-quality terms that pass tf-idf thresholds but aren't
 * meaningful to a human reader (numbers, isolated stopword n-grams, etc.).
 */
function isUsefulTerm(term: string): boolean {
  if (!term) return false;
  // Reject pure numeric terms
  if (/^[\d\s.,$%-]+$/.test(term)) return false;
  // Reject single-char tokens that snuck through
  if (term.length < 3) return false;
  // Reject URL artifacts that survived tokenization
  if (/^https?$/.test(term) || /^www$/.test(term)) return false;

  const tokens = term.split(" ");

  // Reject n-grams where the same content word appears more than once —
  // these are artifacts of adjacent repetitions in scraped text
  // ("gambling gambling", "addiction gambling" adjacent to another "gambling").
  const contentTokens = tokens.filter((t) => !ENGLISH_STOPWORDS.has(t));
  if (contentTokens.length !== new Set(contentTokens).size) return false;

  // For multi-word phrases: require at least one non-stopword token.
  const allStop = tokens.every((t) => ENGLISH_STOPWORDS.has(t));
  if (allStop) return false;
  // Reject standalone generic unigrams that aren't actionable SEO terms.
  if (tokens.length === 1 && GENERIC_UNIGRAM_BLOCKLIST.has(tokens[0])) return false;
  // Multi-word phrases starting or ending with a generic word are usually
  // junk fragments ("a lot of", "as well", "in this", etc.) — for unigrams
  // we've already blocked them above; for 2+ grams require non-blocklist
  // tokens at BOTH boundaries (we still allow blocklist words inside).
  if (tokens.length >= 2) {
    if (GENERIC_UNIGRAM_BLOCKLIST.has(tokens[0]) && GENERIC_UNIGRAM_BLOCKLIST.has(tokens[tokens.length - 1])) {
      return false;
    }
  }
  return true;
}

/**
 * Length-bonus multiplier. Multi-word phrases are far more useful as SEO
 * targets than unigrams; we boost their score so the final ranked list
 * mirrors Surfer's (mostly 2-3 word phrases, unigrams only when truly
 * essential).
 */
function lengthBonus(n: number): number {
  if (n === 1) return 0.35;
  if (n === 2) return 1.0;
  if (n === 3) return 1.35;
  return 1.0;
}

/**
 * Containment-aware dedup pass.
 *
 * If a unigram U is ranked below a multi-word phrase P that contains U
 * and P covers a large share of U's occurrences across the corpus, drop
 * U — the multi-word phrase already represents that concept better.
 *
 * Conservative: only drops unigrams (never multi-word phrases) and only
 * when ≥60% of the unigram's total occurrences are absorbed by a single
 * higher-ranked phrase.
 */
function containmentDedup(ranked: NgramTerm[]): NgramTerm[] {
  const kept: NgramTerm[] = [];
  const multiWordSeen: NgramTerm[] = [];
  for (const term of ranked) {
    if (term.n === 1) {
      let absorbed = false;
      for (const phrase of multiWordSeen) {
        const tokens = phrase.term.split(" ");
        if (!tokens.includes(term.term)) continue;
        // Phrase contains this unigram. Estimate absorption.
        // Phrase occurrences carry exactly one instance of the unigram per occurrence.
        if (phrase.totalFreq >= term.totalFreq * 0.6) {
          absorbed = true;
          break;
        }
      }
      if (absorbed) continue;
    } else {
      multiWordSeen.push(term);
    }
    kept.push(term);
  }
  return kept;
}

/**
 * Run TF-IDF n-gram extraction across a corpus of documents.
 *
 * `docs` is an array of cleaned plaintext bodies (one per competitor).
 * Empty strings are skipped but counted in the N denominator only if you
 * filter them out yourself — we count actual content docs only.
 */
export function extractNgrams(
  docs: string[],
  opts: NgramExtractionOptions = {},
): NgramTerm[] {
  const minDocFreq = opts.minDocFreq ?? 0.25;
  const minTotalFreq = opts.minTotalFreq ?? 3;
  const unigramMinAvgFreq = opts.unigramMinAvgFreq ?? 2;
  const limit = opts.limit ?? 300;

  // Filter to non-empty docs.
  const corpus = docs.filter((d): d is string => typeof d === "string" && d.trim().length > 0);
  const N = corpus.length;
  if (N === 0) return [];

  // Per-doc term frequency maps.
  const perDocFreqs: Map<string, number>[] = corpus.map((doc) =>
    extractTermsFromTokens(tokenize(doc)),
  );

  // Aggregate across corpus.
  const termTotalFreq = new Map<string, number>();
  const termDocFreq = new Map<string, number>();
  for (const freqMap of perDocFreqs) {
    for (const [term, count] of freqMap.entries()) {
      termTotalFreq.set(term, (termTotalFreq.get(term) ?? 0) + count);
      termDocFreq.set(term, (termDocFreq.get(term) ?? 0) + 1);
    }
  }

  const results: NgramTerm[] = [];
  for (const [term, df] of termDocFreq.entries()) {
    const coverage = df / N;
    if (coverage < minDocFreq) continue;

    const totalFreq = termTotalFreq.get(term) ?? 0;
    if (totalFreq < minTotalFreq) continue;
    if (!isUsefulTerm(term)) continue;

    // Per-doc freqs for avg / max
    const perDoc: number[] = [];
    for (const freqMap of perDocFreqs) {
      const f = freqMap.get(term) ?? 0;
      if (f > 0) perDoc.push(f);
    }
    const avgFreq = perDoc.reduce((a, b) => a + b, 0) / perDoc.length;
    const maxFreq = Math.max(...perDoc);

    const n = term.split(" ").length;

    // Strict unigram filter: a single word must be used heavily and
    // consistently across competitors to be considered a meaningful term.
    // This filters out generic words like "disorder", "behavioral",
    // "individuals" while keeping high-density domain anchors like
    // "treatment" or "therapy" (Surfer's pattern).
    if (n === 1 && avgFreq < unigramMinAvgFreq) continue;

    // Smoothed IDF: ln(1 + N/df). This stays positive even when a term
    // appears in 100% of docs (where the classical ln(N/df) = 0 would
    // zero out the most universally-used term in the corpus).
    const idf = Math.log(1 + N / df);
    const tfIdf = totalFreq * idf;
    const score = tfIdf * lengthBonus(n);

    results.push({
      term,
      totalFreq,
      docFreq: df,
      coverage,
      avgFreq,
      maxFreq,
      tfIdf,
      score,
      n,
    });
  }

  // Sort by length-weighted score descending — bigrams/trigrams get
  // boosted vs unigrams, so the final list reads like Surfer's
  // (mostly 2-3 word phrases, unigrams only when truly essential).
  results.sort((a, b) => b.score - a.score);

  // Containment-aware dedup: drop unigrams that are mostly absorbed by
  // higher-ranked multi-word phrases containing them.
  const deduped = containmentDedup(results);

  return deduped.slice(0, limit);
}

/**
 * Heuristic check: does a candidate phrase also appear in competitor
 * headings (H2 / H3)? When true, we mark it as `is_heading_recommended`
 * in the terms table so the UI can highlight which terms make great
 * subheadings.
 */
export function termAppearsInHeadings(
  term: string,
  competitorHeadings: Array<{ text: string }>,
): boolean {
  const lower = term.toLowerCase();
  for (const h of competitorHeadings) {
    if (h.text.toLowerCase().includes(lower)) return true;
  }
  return false;
}
