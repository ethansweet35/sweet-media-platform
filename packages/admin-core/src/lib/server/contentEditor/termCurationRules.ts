/**
 * Deterministic term curation for lite Content Editor analysis.
 * Mirrors the DROP rules from the Sonnet curation prompt without an LLM call.
 */

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

const NAV_BOILERPLATE = /\b(about us|contact us|related posts|newsletter|subscribe|privacy policy|terms of service|all rights reserved)\b/i;

function termTokens(term: string): string[] {
  return term.toLowerCase().split(/\s+/).filter((t) => t.length > 0);
}

function isDuplicateOfKept(term: string, kept: MergedTermCandidate[]): boolean {
  const lower = term.toLowerCase();
  for (const k of kept) {
    const kl = k.term.toLowerCase();
    if (kl === lower) return true;
    if (kl.includes(lower) || lower.includes(kl)) {
      const shorter = lower.length < kl.length ? lower : kl;
      const longer = lower.length >= kl.length ? lower : kl;
      if (longer.split(/\s+/).length > 1 && longer.includes(shorter)) return true;
    }
  }
  return false;
}

function shouldDropTerm(term: string): boolean {
  const t = term.toLowerCase().trim();
  if (!t || t.length < 2) return true;
  if (NAV_BOILERPLATE.test(t)) return true;
  const tokens = termTokens(t);
  if (tokens.length === 0) return true;
  if (tokens.every((tok) => GENERIC_VERBS.has(tok) || MODALS.has(tok))) return true;
  if (tokens.length === 1) {
    const tok = tokens[0];
    if (
      GENERIC_VERBS.has(tok) ||
      MODALS.has(tok) ||
      VAGUE_MODIFIERS.has(tok) ||
      PAPER_METADATA.has(tok) ||
      ABSTRACT_FILLER.has(tok) ||
      TIME_NUMBERS.has(tok)
    ) {
      return true;
    }
  }
  if (tokens.some((tok) => PAPER_METADATA.has(tok) && tokens.length <= 2)) return true;
  if (tokens.length === 2 && tokens.some((tok) => ABSTRACT_FILLER.has(tok) || VAGUE_MODIFIERS.has(tok))) {
    return true;
  }
  return false;
}

export function curateTermsWithRules(
  primaryKeyword: string,
  candidates: MergedTermCandidate[],
  maxTerms = 75,
): { curated: MergedTermCandidate[]; added: string[] } {
  const pkLower = primaryKeyword.toLowerCase().trim();
  const sorted = [...candidates].sort((a, b) => b.relevance - a.relevance);
  const curated: MergedTermCandidate[] = [];

  for (const c of sorted) {
    if (curated.length >= maxTerms) break;
    const lower = c.term.toLowerCase();
    if (lower === pkLower) {
      curated.push(c);
      continue;
    }
    if (shouldDropTerm(c.term)) continue;
    if (c.coverage < 0.2 && c.relevance < 0.15) continue;
    if (isDuplicateOfKept(c.term, curated)) continue;
    curated.push(c);
  }

  const pkIdx = curated.findIndex((c) => c.term.toLowerCase() === pkLower);
  if (pkIdx === -1) {
    const pkCandidate = sorted.find((c) => c.term.toLowerCase() === pkLower);
    if (pkCandidate) curated.unshift(pkCandidate);
  }

  return { curated, added: [] };
}
