/**
 * Deterministic term curation for lite Content Editor analysis.
 *
 * Mirrors how Surfer / Clearscope / Rankability shape their term lists:
 *   - Return ~70-90 terms (Surfer's typical range for a topical keyword)
 *   - ~75-85% are 2-3 word phrases, the rest are high-signal unigrams
 *   - Filter aggressively on TRUE noise (contact / form / UI / a11y)
 *   - Be lenient on phrases containing common topical words
 *     ("services", "support", "care") — those are valuable in context
 *   - Suppress standalone single-word entries unless they're strong
 *     domain anchors (high coverage + high density)
 */

import {
  STRICT_BOILERPLATE_UNIGRAMS,
  WEAK_STANDALONE_UNIGRAMS,
  isRejectedNlpTerm,
  isWeakStandaloneUnigram,
  primaryKeywordTokens,
} from "./termQuality";

// Silence "imported but only re-exported" lint warnings.
void WEAK_STANDALONE_UNIGRAMS;

export interface MergedTermCandidate {
  term: string;
  type: "entity" | "ngram";
  entityType: string | null;
  relevance: number;
  avgFreq: number;
  maxFreq: number;
  coverage: number;
}

const GENERIC_VERBS = new Set([
  "ask", "feel", "find", "work", "change", "learn", "start", "improve", "manage",
  "develop", "lead", "offer", "play", "win", "lose", "meet", "consider", "address",
  "help", "need", "want", "know", "think", "take", "give", "come", "go", "see",
  "look", "use", "try", "make", "get", "set", "put", "keep", "let", "turn",
]);

const MODALS = new Set([
  "may", "might", "even", "though", "whether", "although", "according", "also",
  "just", "still", "already", "however", "therefore",
]);

const VAGUE_MODIFIERS = new Set([
  "specific", "comprehensive", "available", "associated", "different", "typical",
  "personal", "individual", "real", "single", "long", "likely", "possible", "higher",
  "important", "general", "common", "various", "several", "many", "much", "more",
  "less", "best", "good", "great", "new", "old", "high", "low",
]);

const PAPER_METADATA = new Set([
  "studies", "study", "article", "review", "research", "randomized", "trial",
  "results", "findings", "criteria", "guidelines", "published", "journal",
]);

const ABSTRACT_FILLER = new Set([
  "approach", "method", "step", "process", "aspect", "factor", "role", "system",
  "section", "experience", "situation", "information", "content", "issue", "issues",
  "way", "ways", "thing", "things", "type", "types", "form", "forms", "level",
  "levels", "area", "areas", "part", "parts", "case", "cases",
]);

const TIME_NUMBERS = new Set([
  "month", "months", "year", "years", "week", "weeks", "day", "days", "minute",
  "minutes", "hour", "hours", "three", "four", "five", "first", "second", "third",
]);

const NAV_BOILERPLATE =
  /\b(about us|contact us|related posts|newsletter|subscribe|privacy policy|terms of service|all rights reserved|opens? (in )?a? new window|skip to (main )?content)\b/i;

/**
 * Target list size — Surfer / Clearscope land around 75-95 for a healthy
 * topical keyword. We keep this safely under RULES_CURATION_AI_THRESHOLD
 * so lite stays rules-only with no extra API spend.
 */
const TARGET_TERM_COUNT = 85;

/**
 * Max share of final list that may be single words. Surfer's published
 * outputs run ~15-25% unigrams; everything else is multi-word.
 */
const MAX_UNIGRAM_SHARE = 0.25;

function termTokens(term: string): string[] {
  return term.toLowerCase().split(/\s+/).filter((t) => t.length > 0);
}

function isDuplicateOfKept(term: string, kept: MergedTermCandidate[]): boolean {
  const lower = term.toLowerCase();
  for (const k of kept) {
    const kl = k.term.toLowerCase();
    if (kl === lower) return true;
    // Containment dedup: drop the longer phrase only if the shorter one
    // already covers it AND both are phrases (don't let a unigram absorb
    // a phrase — phrase is more specific and more valuable).
    if (kl.includes(lower) || lower.includes(kl)) {
      const shorter = lower.length < kl.length ? lower : kl;
      const longer = lower.length >= kl.length ? lower : kl;
      const shorterTokens = shorter.split(/\s+/).length;
      const longerTokens = longer.split(/\s+/).length;
      // Only dedup when both sides are multi-word and one is a substring
      // of the other (the kept one wins because it's ranked higher).
      if (shorterTokens >= 2 && longerTokens > shorterTokens && longer.includes(shorter)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Drop a multi-word phrase ONLY when every content token is noise.
 * `intervention services` → kept (both content tokens). `click here` →
 * dropped (both noise). `help families` → kept (`help` is a generic verb
 * but `families` is topical). Surfer keeps verb-led phrases all the time.
 */
function isAllNoisePhrase(tokens: string[]): boolean {
  if (tokens.length < 2) return false;
  return tokens.every(
    (tok) =>
      STRICT_BOILERPLATE_UNIGRAMS.has(tok) ||
      GENERIC_VERBS.has(tok) ||
      MODALS.has(tok) ||
      VAGUE_MODIFIERS.has(tok) ||
      ABSTRACT_FILLER.has(tok) ||
      TIME_NUMBERS.has(tok),
  );
}

/**
 * Drop a phrase when a STRICT-noise token sits at a boundary. Strict-
 * noise tokens never make sense at the start or end of a useful phrase
 * (e.g. `contact us`, `click here`, `phone number`, `field validation`).
 * Tokens from WEAK_STANDALONE_UNIGRAMS are intentionally allowed at
 * boundaries — `intervention services`, `family support`, `care plan`.
 */
function hasNoiseBoundary(tokens: string[]): boolean {
  if (tokens.length < 2) return false;
  const first = tokens[0];
  const last = tokens[tokens.length - 1];
  return STRICT_BOILERPLATE_UNIGRAMS.has(first) || STRICT_BOILERPLATE_UNIGRAMS.has(last);
}

function shouldDropTerm(term: string): boolean {
  const t = term.toLowerCase().trim();
  if (!t || t.length < 2) return true;
  if (isRejectedNlpTerm(t)) return true;
  if (NAV_BOILERPLATE.test(t)) return true;

  const tokens = termTokens(t);
  if (tokens.length === 0) return true;

  // Phrase rules
  if (tokens.length >= 2) {
    if (hasNoiseBoundary(tokens)) return true;
    if (isAllNoisePhrase(tokens)) return true;
    // Drop only when a phrase is dominated by paper-metadata
    // ("study results", "review findings").
    if (tokens.length === 2 && tokens.every((tok) => PAPER_METADATA.has(tok))) return true;
    return false;
  }

  // Single-word rules
  const tok = tokens[0];
  return (
    STRICT_BOILERPLATE_UNIGRAMS.has(tok) ||
    GENERIC_VERBS.has(tok) ||
    MODALS.has(tok) ||
    VAGUE_MODIFIERS.has(tok) ||
    PAPER_METADATA.has(tok) ||
    ABSTRACT_FILLER.has(tok) ||
    TIME_NUMBERS.has(tok)
  );
}

export function curateTermsWithRules(
  primaryKeyword: string,
  candidates: MergedTermCandidate[],
  maxTerms = TARGET_TERM_COUNT,
): { curated: MergedTermCandidate[]; added: string[] } {
  const pkLower = primaryKeyword.toLowerCase().trim();
  const pkTokens = primaryKeywordTokens(primaryKeyword);
  const maxUnigrams = Math.max(10, Math.floor(maxTerms * MAX_UNIGRAM_SHARE));

  // Sort by relevance (already length-bonus-weighted by the n-gram
  // extractor, so phrases dominate the top).
  const sorted = [...candidates].sort((a, b) => b.relevance - a.relevance);

  const curated: MergedTermCandidate[] = [];
  let unigramCount = 0;

  // Pass 1: phrases first. Pull the full phrase pool before any unigrams.
  for (const c of sorted) {
    if (curated.length >= maxTerms) break;
    const lower = c.term.toLowerCase();
    if (lower === pkLower) continue;
    const tokenCount = termTokens(lower).length;
    if (tokenCount < 2) continue;
    if (shouldDropTerm(c.term)) continue;
    // Lenient coverage gate for phrases — Surfer surfaces phrases used
    // by 3+ of top 10, even at modest density.
    if (c.coverage < 0.2 && c.relevance < 0.12) continue;
    if (isDuplicateOfKept(c.term, curated)) continue;
    curated.push(c);
  }

  // Pass 2: high-quality standalone unigrams up to the share cap.
  for (const c of sorted) {
    if (curated.length >= maxTerms) break;
    if (unigramCount >= maxUnigrams) break;
    const lower = c.term.toLowerCase();
    if (lower === pkLower) continue;
    const tokenCount = termTokens(lower).length;
    if (tokenCount !== 1) continue;
    if (shouldDropTerm(c.term)) continue;
    if (isWeakStandaloneUnigram(lower, pkTokens, c.coverage, c.avgFreq)) continue;
    // Skip unigrams that are already absorbed by a kept phrase containing them.
    if (curated.some((k) => k.term.toLowerCase().split(/\s+/).includes(lower))) continue;
    if (isDuplicateOfKept(c.term, curated)) continue;
    curated.push(c);
    unigramCount++;
  }

  // Always ensure the primary keyword is present.
  const pkIdx = curated.findIndex((c) => c.term.toLowerCase() === pkLower);
  if (pkIdx === -1) {
    const pkCandidate = sorted.find((c) => c.term.toLowerCase() === pkLower);
    if (pkCandidate) curated.unshift(pkCandidate);
  }

  return { curated, added: [] };
}

// Re-export the weak unigram set so other modules can reference it
// without circular imports. (kept here only because the curation rules
// are the only consumer outside termQuality.)
export { WEAK_STANDALONE_UNIGRAMS };
