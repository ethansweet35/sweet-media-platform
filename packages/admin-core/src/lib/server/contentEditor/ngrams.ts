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
  /** tf-idf score, used for ranking. */
  tfIdf: number;
  /** Token count of the n-gram (1, 2, or 3). */
  n: number;
}

export interface NgramExtractionOptions {
  /** Minimum fraction of docs that must contain a term. Default 0.4. */
  minDocFreq?: number;
  /** Cap result list at this many terms. Default 200. */
  limit?: number;
  /** Minimum total occurrences across corpus. Default 3. */
  minTotalFreq?: number;
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
 * Filter out low-quality terms that pass tf-idf thresholds but aren't
 * meaningful to a human reader (numbers, isolated stopword n-grams, etc.).
 */
function isUsefulTerm(term: string): boolean {
  if (!term) return false;
  // Reject pure numeric terms
  if (/^[\d\s.,$%-]+$/.test(term)) return false;
  // Reject single-char tokens that snuck through
  if (term.length < 3) return false;
  // For multi-word phrases: require at least one non-stopword token.
  // (Stopwords already removed from unigrams, but bigrams like "and the"
  // can sneak through if our token list ever changes.)
  const tokens = term.split(" ");
  const allStop = tokens.every((t) => ENGLISH_STOPWORDS.has(t));
  if (allStop) return false;
  return true;
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
  const minDocFreq = opts.minDocFreq ?? 0.4;
  const minTotalFreq = opts.minTotalFreq ?? 3;
  const limit = opts.limit ?? 200;

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

    const idf = Math.log(N / df);
    const tfIdf = totalFreq * idf;

    const n = term.split(" ").length;

    results.push({
      term,
      totalFreq,
      docFreq: df,
      coverage,
      avgFreq,
      maxFreq,
      tfIdf,
      n,
    });
  }

  // Sort by tf-idf descending. Multi-word phrases tend to score higher
  // than unigrams (lower idf because they're rarer), so this naturally
  // surfaces meaningful phrases like "intensive outpatient program".
  results.sort((a, b) => b.tfIdf - a.tfIdf);

  return results.slice(0, limit);
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
