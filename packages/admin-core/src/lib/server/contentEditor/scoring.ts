/**
 * Content scoring — the heart of the live editor experience.
 *
 * Three composable scoring layers:
 *
 *   1. CONTENT SCORE     (existing)
 *      coverage × 0.60 + frequency × 0.25 + placement × 0.15
 *      "Did you use the right terms?"
 *
 *   2. SEO SCORE         (Surfer-style split)
 *      contentScore × 0.70 + structuralAlignment × 0.30
 *      "How does it stack up against ranking competitors structurally?"
 *
 *   3. AI SEARCH SCORE   (the AI-citation / AI Overview lever)
 *      factCoverage × 0.50 + questionCoverage × 0.30 + citableStructure × 0.20
 *      "Can AI engines extract and cite this content?"
 *
 * The TOTAL content_score returned remains the layer-1 number for
 * backward compatibility with phase 8 of the pipeline. The SEO + AI
 * scores are additive output fields when their inputs are supplied.
 *
 * All functions are pure — no I/O. Fact coverage requiring embeddings
 * lives in api.ts where the Supabase client + OpenAI key are available.
 */
import {
  countTermOccurrences,
  ENGLISH_STOPWORDS,
  getFirstNWords,
  splitSentences,
} from "./textUtils";

// ───────────────────────────────────────────────────────────────────────
//  Inputs
// ───────────────────────────────────────────────────────────────────────

export interface ScoringTerm {
  term: string;
  relevance_score: number;
  min_recommended_uses: number;
  max_recommended_uses: number;
  is_primary_keyword?: boolean;
  user_included?: boolean;
  user_blacklisted?: boolean;
}

/** Question for question-coverage scoring. */
export interface ScoringQuestion {
  id?: string;
  question: string;
  user_dismissed?: boolean;
}

/** The structural targets the draft is being measured against. */
export interface StructuralTargets {
  word_count_min: number;
  word_count_max: number;
  word_count_target?: number;
  h2_min: number;
  h2_max: number;
  h3_min?: number;
  h3_max?: number;
  paragraph_min?: number;
  paragraph_max?: number;
  image_min?: number;
  image_max?: number;
}

export interface DraftDocument {
  /** Plain-text body for term-occurrence counting. */
  body: string;
  /** Optional title tag for placement scoring. */
  titleTag?: string | null;
  /** Optional H1 for placement scoring. */
  h1Text?: string | null;
  /** Optional meta description for placement scoring. */
  metaDescription?: string | null;
  /** Pre-extracted heading texts (used for placement + per-term flags). */
  earlyHeadings?: string[];
  /** All headings (used for per-term occurs_in_heading flag). */
  allHeadings?: string[];
  /** Body markdown for structural metric extraction. */
  bodyMarkdown?: string | null;
}

// ───────────────────────────────────────────────────────────────────────
//  Outputs
// ───────────────────────────────────────────────────────────────────────

export type TermStatus = "missing" | "under" | "good" | "over";

export interface TermUsage {
  term: string;
  occurrences: number;
  status: TermStatus;
  min_recommended_uses: number;
  max_recommended_uses: number;
  occurs_in_heading?: boolean;
  occurs_in_first_100_words?: boolean;
}

export type StructuralStatus = "under" | "good" | "over" | "missing";

export interface StructuralCheck {
  key: "word_count" | "h2_count" | "h3_count" | "paragraph_count" | "image_count";
  status: StructuralStatus;
  value: number;
  min: number;
  max: number;
}

export interface PlacementChecks {
  primary_kw_in_title: boolean;
  primary_kw_in_h1: boolean;
  primary_kw_in_meta: boolean;
  primary_kw_in_first_100: boolean;
  primary_kw_in_early_heading: boolean;
}

export interface ScoreBreakdown {
  /** 0-100, layer-1 (coverage/frequency/placement only). */
  content_score: number;
  coverage_score: number;
  frequency_score: number;
  placement_score: number;
  term_usage: TermUsage[];
  placement_checks: PlacementChecks;

  /** 0-100 if structuralTargets supplied (else undefined). */
  structural_alignment?: number;
  structural_checks?: StructuralCheck[];

  /** Combined SEO score when structuralTargets supplied. */
  seo_score?: number;

  /** AI search component sub-scores (set when their inputs supplied). */
  question_coverage_score?: number;
  citable_structure_score?: number;
  question_usage?: Array<{ question: string; covered: boolean; overlap: number }>;

  /** Combined AI search score (computed only if both question + facts supplied to api layer). */
  ai_search_score?: number;
}

// ───────────────────────────────────────────────────────────────────────
//  Term-list normalization
// ───────────────────────────────────────────────────────────────────────

/**
 * Filter to included terms and cap any single relevance score at a
 * proportional ceiling. Prevents a single term (e.g. the primary
 * keyword if accidentally given relevance=9999) from dominating
 * the weighted math.
 */
function normalizedTerms(terms: ScoringTerm[]): ScoringTerm[] {
  const included = terms.filter(termIncluded);
  if (!included.length) return [];

  // Compute the 90th-percentile relevance and cap any term at 3× that.
  const sorted = included.map((t) => t.relevance_score).sort((a, b) => a - b);
  const p90 = sorted[Math.floor(sorted.length * 0.9)] ?? sorted[sorted.length - 1] ?? 1;
  const cap = Math.max(p90 * 3, 1);

  return included.map((t) => ({
    ...t,
    relevance_score: Math.min(t.relevance_score, cap),
  }));
}

function termIncluded(t: ScoringTerm): boolean {
  if (t.user_blacklisted) return false;
  if (t.user_included === false) return false;
  return true;
}

function termStatus(occurrences: number, t: ScoringTerm): TermStatus {
  if (occurrences === 0) return "missing";
  if (occurrences < t.min_recommended_uses) return "under";
  if (occurrences > t.max_recommended_uses) return "over";
  return "good";
}

// ───────────────────────────────────────────────────────────────────────
//  Layer 1: Coverage + Frequency + Placement
// ───────────────────────────────────────────────────────────────────────

function computeCoverageAndFrequency(
  doc: DraftDocument,
  terms: ScoringTerm[],
): {
  coverage: number;
  frequency: number;
  termUsage: TermUsage[];
} {
  if (!terms.length) {
    return { coverage: 0, frequency: 0, termUsage: [] };
  }

  const headingsLower = (doc.allHeadings ?? []).map((h) => h.toLowerCase());
  const first100Lower = getFirstNWords(doc.body, 100).toLowerCase();

  let coverageWeightedCovered = 0;
  let coverageWeightedTotal = 0;
  let freqWeightedInRange = 0;
  let freqWeightedTotal = 0;

  const termUsage: TermUsage[] = [];

  for (const t of terms) {
    const occurrences = countTermOccurrences(doc.body, t.term);
    const w = Math.max(t.relevance_score, 0.0001);

    coverageWeightedTotal += w;
    if (occurrences > 0) coverageWeightedCovered += w;

    freqWeightedTotal += w;
    if (occurrences >= t.min_recommended_uses && occurrences <= t.max_recommended_uses) {
      freqWeightedInRange += w;
    } else if (occurrences === 0) {
      // Already penalized in coverage
    } else if (occurrences < t.min_recommended_uses) {
      const ratio = occurrences / t.min_recommended_uses;
      freqWeightedInRange += w * ratio * 0.7;
    } else {
      // Overuse — flat 50% credit (Surfer's approach)
      freqWeightedInRange += w * 0.5;
    }

    const termLower = t.term.toLowerCase();
    termUsage.push({
      term: t.term,
      occurrences,
      status: termStatus(occurrences, t),
      min_recommended_uses: t.min_recommended_uses,
      max_recommended_uses: t.max_recommended_uses,
      occurs_in_heading: headingsLower.some((h) => h.includes(termLower)),
      occurs_in_first_100_words: first100Lower.includes(termLower),
    });
  }

  const coverage = coverageWeightedTotal > 0
    ? (coverageWeightedCovered / coverageWeightedTotal) * 100
    : 0;
  const frequency = freqWeightedTotal > 0
    ? (freqWeightedInRange / freqWeightedTotal) * 100
    : 0;

  return { coverage, frequency, termUsage };
}

function computePlacement(
  primaryKeyword: string | null,
  doc: DraftDocument,
): {
  score: number;
  checks: PlacementChecks;
} {
  const empty: PlacementChecks = {
    primary_kw_in_title: false,
    primary_kw_in_h1: false,
    primary_kw_in_meta: false,
    primary_kw_in_first_100: false,
    primary_kw_in_early_heading: false,
  };
  if (!primaryKeyword) return { score: 0, checks: empty };

  const kw = primaryKeyword.toLowerCase().trim();
  if (!kw) return { score: 0, checks: empty };

  const includesKw = (text: string | null | undefined): boolean =>
    !!text && text.toLowerCase().includes(kw);

  const first100 = getFirstNWords(doc.body, 100).toLowerCase();
  const earlyHeadings = (doc.earlyHeadings ?? []).slice(0, 3).map((h) => h.toLowerCase());

  const checks: PlacementChecks = {
    primary_kw_in_title: includesKw(doc.titleTag),
    primary_kw_in_h1: includesKw(doc.h1Text),
    primary_kw_in_meta: includesKw(doc.metaDescription),
    primary_kw_in_first_100: first100.includes(kw),
    primary_kw_in_early_heading: earlyHeadings.some((h) => h.includes(kw)),
  };

  let hits = 0;
  for (const v of Object.values(checks)) if (v) hits++;
  return { score: hits * 20, checks };
}

// ───────────────────────────────────────────────────────────────────────
//  Layer 2: Structural alignment
// ───────────────────────────────────────────────────────────────────────

interface StructuralMetrics {
  wordCount: number;
  h2Count: number;
  h3Count: number;
  paragraphCount: number;
  imageCount: number;
}

function extractStructuralMetrics(doc: DraftDocument): StructuralMetrics {
  const wordCount = doc.body.trim() ? doc.body.trim().split(/\s+/).filter(Boolean).length : 0;
  const md = doc.bodyMarkdown ?? "";
  const lines = md.split("\n");
  let h2 = 0;
  let h3 = 0;
  let images = 0;
  for (const line of lines) {
    if (/^##\s+/.test(line) && !/^###\s+/.test(line)) h2++;
    else if (/^###\s+/.test(line)) h3++;
    if (/!\[/.test(line)) images++;
  }
  // Paragraphs: count double-newline-separated text blocks excluding heading/list lines.
  const paragraphCount = md
    .split(/\n{2,}/)
    .filter((block) => {
      const s = block.trim();
      if (!s || s.length < 40) return false;
      if (/^#{1,6}\s/.test(s)) return false;
      if (/^[-*+]\s/.test(s)) return false;
      if (/^\d+\.\s/.test(s)) return false;
      return true;
    })
    .length;
  return { wordCount, h2Count: h2, h3Count: h3, paragraphCount, imageCount: images };
}

function rangeStatus(value: number, min: number, max: number): StructuralStatus {
  if (value === 0 && min > 0) return "missing";
  if (value < min) return "under";
  if (value > max) return "over";
  return "good";
}

function computeStructuralAlignment(
  doc: DraftDocument,
  targets: StructuralTargets,
): { score: number; checks: StructuralCheck[] } {
  const m = extractStructuralMetrics(doc);

  const rows: StructuralCheck[] = [
    {
      key: "word_count",
      value: m.wordCount,
      min: targets.word_count_min,
      max: targets.word_count_max,
      status: rangeStatus(m.wordCount, targets.word_count_min, targets.word_count_max),
    },
    {
      key: "h2_count",
      value: m.h2Count,
      min: targets.h2_min,
      max: targets.h2_max,
      status: rangeStatus(m.h2Count, targets.h2_min, targets.h2_max),
    },
  ];

  if (targets.h3_min !== undefined && targets.h3_max !== undefined) {
    rows.push({
      key: "h3_count",
      value: m.h3Count,
      min: targets.h3_min,
      max: targets.h3_max,
      status: rangeStatus(m.h3Count, targets.h3_min, targets.h3_max),
    });
  }

  if (targets.paragraph_min !== undefined && targets.paragraph_max !== undefined) {
    rows.push({
      key: "paragraph_count",
      value: m.paragraphCount,
      min: targets.paragraph_min,
      max: targets.paragraph_max,
      status: rangeStatus(m.paragraphCount, targets.paragraph_min, targets.paragraph_max),
    });
  }

  if (targets.image_min !== undefined && targets.image_max !== undefined) {
    rows.push({
      key: "image_count",
      value: m.imageCount,
      min: targets.image_min,
      max: targets.image_max,
      status: rangeStatus(m.imageCount, targets.image_min, targets.image_max),
    });
  }

  // Each check is worth 100/N where N = number of checks. Status partial credit:
  //   good   → 100
  //   under  → 50  (you have some, just not enough)
  //   over   → 70  (too much, but at least present)
  //   missing → 0
  const points: number[] = rows.map((c) => {
    switch (c.status) {
      case "good": return 100;
      case "under": return 50;
      case "over": return 70;
      default: return 0;
    }
  });
  const score = points.length > 0 ? points.reduce((a, b) => a + b, 0) / points.length : 0;

  return { score: Math.round(score * 10) / 10, checks: rows };
}

// ───────────────────────────────────────────────────────────────────────
//  Layer 3: AI Search — question coverage + citable structure
// ───────────────────────────────────────────────────────────────────────

function extractQuestionTokens(question: string): string[] {
  const lower = question.toLowerCase().replace(/[?!.,;:'"()]/g, " ");
  return lower
    .split(/\s+/)
    .map((t) => t.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ""))
    .filter((t) => t.length > 2 && !ENGLISH_STOPWORDS.has(t));
}

/**
 * Question coverage via cheap n-gram heuristic — no embeddings.
 *
 * For each question, extract its content tokens (drop stopwords). If
 * ≥60% of those tokens appear anywhere in the draft body, mark it as
 * covered. This is rough but correlates well with semantic coverage
 * and runs in <10ms vs ~500ms for embedding-based comparison.
 */
function computeQuestionCoverage(
  doc: DraftDocument,
  questions: ScoringQuestion[],
): { score: number; perQuestion: NonNullable<ScoreBreakdown["question_usage"]> } {
  const active = questions.filter((q) => !q.user_dismissed && q.question.trim());
  if (!active.length) return { score: 0, perQuestion: [] };

  const bodyLower = doc.body.toLowerCase();
  let coveredCount = 0;
  const perQuestion: NonNullable<ScoreBreakdown["question_usage"]> = [];

  for (const q of active) {
    const tokens = extractQuestionTokens(q.question);
    if (tokens.length === 0) {
      perQuestion.push({ question: q.question, covered: false, overlap: 0 });
      continue;
    }
    let hits = 0;
    for (const t of tokens) {
      if (bodyLower.includes(t)) hits++;
    }
    const overlap = hits / tokens.length;
    const covered = overlap >= 0.6;
    if (covered) coveredCount++;
    perQuestion.push({
      question: q.question,
      covered,
      overlap: Math.round(overlap * 100) / 100,
    });
  }

  const score = active.length > 0 ? (coveredCount / active.length) * 100 : 0;
  return { score: Math.round(score * 10) / 10, perQuestion };
}

/**
 * Citable structure score (0-100).
 *
 * Heuristic — measures how "AI-friendly" the document is for citation:
 *   - % of paragraphs that start with a declarative sentence containing
 *     a number, date, percentage, or quoted/named entity
 *   - Presence of FAQ-style question headings followed immediately by
 *     declarative paragraph(s)
 *   - Number of bullet/numbered lists (AI engines love structured facts)
 *
 * Each factor contributes ~33 points; final score is capped at 100.
 */
function computeCitableStructureScore(doc: DraftDocument): number {
  const md = doc.bodyMarkdown ?? "";
  const body = doc.body;

  // Factor 1: % of body sentences that contain at least one citable signal
  // (number, date, %, $, capitalized phrase that's likely a named entity).
  const sentences = splitSentences(body);
  if (sentences.length === 0) return 0;

  const citablePattern = /\b\d+(?:[.,]\d+)?\b|\b\d+\s*%\b|\b\$\s*\d+|\b(?:19|20)\d{2}\b|"[^"]{8,}"|[A-Z][a-z]+\s+[A-Z][a-z]+/;
  let citableSentences = 0;
  for (const s of sentences) {
    if (citablePattern.test(s)) citableSentences++;
  }
  const citableRatio = citableSentences / sentences.length;
  // Score 0..1 — anything above 30% is great (gives full credit). Below 10% gives 0.
  const factor1 = Math.min(1, Math.max(0, (citableRatio - 0.1) / 0.2)) * 33;

  // Factor 2: FAQ density. Look for "## What/How/Why/When/Where ..." headings.
  const headingLines = md.split("\n").filter((l) => /^##\s+/.test(l));
  const questionHeadings = headingLines.filter((l) => {
    const stripped = l.replace(/^#+\s+/, "").trim().toLowerCase();
    return (
      stripped.endsWith("?") ||
      /^(what|how|why|when|where|which|who|is|are|can|does|do|should|will)\b/.test(stripped)
    );
  });
  // 3+ FAQ headings = full credit. 0 = 0 credit.
  const factor2 = Math.min(1, questionHeadings.length / 3) * 34;

  // Factor 3: list density. Bullet/numbered list items per 1000 words.
  const listItems = (md.match(/^[-*+]\s+|^\d+\.\s+/gm) ?? []).length;
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const listPerThousand = wordCount > 0 ? (listItems / wordCount) * 1000 : 0;
  // 10+ list items per 1000 words = full credit (~3 lists worth).
  const factor3 = Math.min(1, listPerThousand / 10) * 33;

  return Math.round((factor1 + factor2 + factor3) * 10) / 10;
}

// ───────────────────────────────────────────────────────────────────────
//  Top-level scoreDocument
// ───────────────────────────────────────────────────────────────────────

export interface ScoringOptions {
  structuralTargets?: StructuralTargets;
  questions?: ScoringQuestion[];
}

/**
 * Score a draft document. Layer 1 (content_score, coverage, frequency,
 * placement, term_usage, placement_checks) is always computed. Layers 2
 * and 3 (structural alignment, AI search components) are computed only
 * when their inputs are supplied via `opts`.
 */
export function scoreDocument(
  doc: DraftDocument,
  terms: ScoringTerm[],
  primaryKeyword: string | null,
  opts: ScoringOptions = {},
): ScoreBreakdown {
  const normalizedTermList = normalizedTerms(terms);

  const { coverage, frequency, termUsage } = computeCoverageAndFrequency(
    doc,
    normalizedTermList,
  );
  const { score: placement, checks: placementChecks } = computePlacement(
    primaryKeyword,
    doc,
  );

  const content_score = coverage * 0.6 + frequency * 0.25 + placement * 0.15;

  const result: ScoreBreakdown = {
    content_score: round(content_score),
    coverage_score: round(coverage),
    frequency_score: round(frequency),
    placement_score: round(placement),
    term_usage: termUsage,
    placement_checks: placementChecks,
  };

  // Layer 2: Structural alignment + SEO score (if targets given)
  if (opts.structuralTargets) {
    const { score: structAlign, checks: structChecks } = computeStructuralAlignment(
      doc,
      opts.structuralTargets,
    );
    result.structural_alignment = structAlign;
    result.structural_checks = structChecks;
    result.seo_score = round(content_score * 0.7 + structAlign * 0.3);
  }

  // Layer 3: AI Search components (questions + citable structure)
  // Fact coverage is computed separately in api.ts because it needs embeddings.
  if (opts.questions !== undefined) {
    const { score: qScore, perQuestion } = computeQuestionCoverage(doc, opts.questions);
    result.question_coverage_score = qScore;
    result.question_usage = perQuestion;
  }
  result.citable_structure_score = computeCitableStructureScore(doc);

  return result;
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Combine the layer-3 sub-scores into the final AI Search Score.
 * Called by api.ts after it computes fact coverage via embeddings.
 *
 *   ai_search_score = fact × 0.50 + question × 0.30 + citable × 0.20
 *
 * Any missing component is treated as 0.
 */
export function computeAiSearchScore(opts: {
  factCoverage?: number;
  questionCoverage?: number;
  citableStructure?: number;
}): number {
  const f = opts.factCoverage ?? 0;
  const q = opts.questionCoverage ?? 0;
  const c = opts.citableStructure ?? 0;
  return round(f * 0.5 + q * 0.3 + c * 0.2);
}

// ───────────────────────────────────────────────────────────────────────
//  Target score (unchanged)
// ───────────────────────────────────────────────────────────────────────

/**
 * Compute the target score for the editor based on competitor scores.
 * Implements Rankability's "10-20% above optimal" guidance:
 *   target = max(avg + 15, single best competitor), capped at 95.
 */
export function computeTargetScore(competitorScores: number[]): {
  avgCompetitorScore: number;
  targetScore: number;
} {
  if (!competitorScores.length) {
    return { avgCompetitorScore: 0, targetScore: 50 };
  }
  const avg = competitorScores.reduce((a, b) => a + b, 0) / competitorScores.length;
  const max = Math.max(...competitorScores);
  const target = Math.min(95, Math.max(avg + 15, max));
  return {
    avgCompetitorScore: round(avg),
    targetScore: round(target),
  };
}
