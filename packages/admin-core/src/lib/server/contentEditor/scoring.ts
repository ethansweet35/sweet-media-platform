/**
 * Content scoring — used by both the pipeline (to score competitors and
 * derive the target score) and the live editor scoring API.
 *
 * Formula (from the build spec):
 *   content_score = (coverage   × 0.60) +
 *                   (frequency  × 0.25) +
 *                   (placement  × 0.15)
 *
 *   coverage   — did each recommended term appear at all? (weighted by relevance)
 *   frequency  — was each term used within its recommended range? (weighted by relevance)
 *   placement  — does the primary keyword appear in 5 critical positions?
 *
 * This is intentionally a pure function: no I/O, no DB. The caller passes
 * in the draft document and the term list. Step 6 will extend this module
 * with the Surfer-style SEO/AI split scores and per-term status outputs.
 */
import {
  countTermOccurrences,
  getFirstNWords,
} from "./textUtils";

export interface ScoringTerm {
  term: string;
  relevance_score: number;
  min_recommended_uses: number;
  max_recommended_uses: number;
  is_primary_keyword?: boolean;
  user_included?: boolean;
  user_blacklisted?: boolean;
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
  /** Pre-extracted heading texts for placement scoring. Optional. */
  earlyHeadings?: string[];
}

export type TermStatus = "missing" | "under" | "good" | "over";

export interface TermUsage {
  term: string;
  occurrences: number;
  status: TermStatus;
  min_recommended_uses: number;
  max_recommended_uses: number;
}

export interface ScoreBreakdown {
  /** 0-100, weighted blend. */
  content_score: number;
  coverage_score: number;
  frequency_score: number;
  placement_score: number;
  term_usage: TermUsage[];
  placement_checks: {
    primary_kw_in_title: boolean;
    primary_kw_in_h1: boolean;
    primary_kw_in_meta: boolean;
    primary_kw_in_first_100: boolean;
    primary_kw_in_early_heading: boolean;
  };
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

function computeCoverageAndFrequency(
  body: string,
  terms: ScoringTerm[],
): {
  coverage: number;
  frequency: number;
  termUsage: TermUsage[];
} {
  const included = terms.filter(termIncluded);
  if (!included.length) {
    return { coverage: 0, frequency: 0, termUsage: [] };
  }

  let coverageWeightedCovered = 0;
  let coverageWeightedTotal = 0;
  let freqWeightedInRange = 0;
  let freqWeightedTotal = 0;

  const termUsage: TermUsage[] = [];

  for (const t of included) {
    const occurrences = countTermOccurrences(body, t.term);
    const w = Math.max(t.relevance_score, 0.0001);

    coverageWeightedTotal += w;
    if (occurrences > 0) coverageWeightedCovered += w;

    freqWeightedTotal += w;
    if (occurrences >= t.min_recommended_uses && occurrences <= t.max_recommended_uses) {
      // In-range
      freqWeightedInRange += w;
    } else if (occurrences === 0) {
      // Already penalized in coverage
    } else if (occurrences < t.min_recommended_uses) {
      // Partial credit, scaled toward min
      const ratio = occurrences / t.min_recommended_uses;
      freqWeightedInRange += w * ratio * 0.7;
    } else {
      // Overuse — flat 50% credit (Surfer's approach)
      freqWeightedInRange += w * 0.5;
    }

    termUsage.push({
      term: t.term,
      occurrences,
      status: termStatus(occurrences, t),
      min_recommended_uses: t.min_recommended_uses,
      max_recommended_uses: t.max_recommended_uses,
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
  checks: ScoreBreakdown["placement_checks"];
} {
  const empty = {
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

  const checks = {
    primary_kw_in_title: includesKw(doc.titleTag),
    primary_kw_in_h1: includesKw(doc.h1Text),
    primary_kw_in_meta: includesKw(doc.metaDescription),
    primary_kw_in_first_100: first100.includes(kw),
    primary_kw_in_early_heading: earlyHeadings.some((h) => h.includes(kw)),
  };

  // 20 points per placement hit, max 100.
  let hits = 0;
  for (const v of Object.values(checks)) if (v) hits++;
  return { score: hits * 20, checks };
}

/**
 * Score a draft document against the recommended terms + primary keyword.
 */
export function scoreDocument(
  doc: DraftDocument,
  terms: ScoringTerm[],
  primaryKeyword: string | null,
): ScoreBreakdown {
  const { coverage, frequency, termUsage } = computeCoverageAndFrequency(doc.body, terms);
  const { score: placement, checks } = computePlacement(primaryKeyword, doc);

  const content_score = coverage * 0.6 + frequency * 0.25 + placement * 0.15;

  return {
    content_score: Math.round(content_score * 10) / 10,
    coverage_score: Math.round(coverage * 10) / 10,
    frequency_score: Math.round(frequency * 10) / 10,
    placement_score: Math.round(placement * 10) / 10,
    term_usage: termUsage,
    placement_checks: checks,
  };
}

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
    avgCompetitorScore: Math.round(avg * 10) / 10,
    targetScore: Math.round(target * 10) / 10,
  };
}
