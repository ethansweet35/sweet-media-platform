/**
 * Claude prompt templates for the content editor pipeline.
 *
 * Each prompt is built deterministically from data we have on hand
 * (keyword, competitor headings, etc.) and produces a strict-JSON
 * response. `callClaude({ expectJson: true })` validates + retries on
 * parse failure.
 */

// ─── Phase 5: Outline synthesis ────────────────────────────────────────

export interface OutlineSection {
  level: number;
  text: string;
  estimated_words: number;
  rationale?: string;
}

export interface OutlineResponse {
  outline: OutlineSection[];
}

export function buildOutlinePrompt(opts: {
  primaryKeyword: string;
  targetWordCount: number;
  competitorHeadings: Array<{
    domain: string;
    headings: Array<{ level: number; text: string }>;
  }>;
}): string {
  const blocks = opts.competitorHeadings
    .map((c, i) => {
      const lines = c.headings
        .map((h) => `${"#".repeat(Math.min(3, h.level))} ${h.text}`)
        .join("\n");
      return `=== Competitor ${i + 1} (${c.domain}) ===\n${lines}`;
    })
    .join("\n\n");

  return `You are an SEO content strategist. Below are H2 and H3 headings extracted from the top-ranking pages on Google for the keyword "${opts.primaryKeyword}".

Your task: synthesize the optimal article outline that:
1. Covers all major subtopics that recur across competitors
2. Deduplicates semantically equivalent headings (e.g. "Cost of treatment" and "How much does it cost" become one section)
3. Orders sections in a logical reading flow that matches search intent
4. Recommends an approximate word count per section that sums to about ${opts.targetWordCount} words
5. Excludes navigational headings like "About us", "Contact", "Related posts", "Newsletter", "Sources"

Output JSON ONLY — no markdown fences, no preamble, no trailing commentary:
{
  "outline": [
    { "level": 2, "text": "...", "estimated_words": 250, "rationale": "Why this section matters for ranking" },
    { "level": 3, "text": "...", "estimated_words": 150, "rationale": "..." }
  ]
}

Constraints:
- Use only levels 2 or 3.
- 6 to 14 H2 sections total. Each H2 may have 0-4 H3 children.
- estimated_words is an integer between 50 and 500.
- text values are plain heading text, no markdown.

Competitor headings:
${blocks}`;
}

// ─── Phase 6: Question synthesis ───────────────────────────────────────

export interface QuestionResponse {
  questions: string[];
}

export function buildQuestionSynthesisPrompt(opts: {
  primaryKeyword: string;
  existingQuestions: string[];
}): string {
  const existing = opts.existingQuestions.length
    ? opts.existingQuestions.map((q) => `- ${q}`).join("\n")
    : "(none yet)";

  return `Given the keyword "${opts.primaryKeyword}" and these questions already covered by top-ranking pages:
${existing}

Identify 5-10 ADDITIONAL high-intent questions that a searcher might ask but that competitors have not directly addressed. Focus on questions that:
- Demonstrate expertise / E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- Address objections or concerns
- Cover edge cases or specific scenarios
- Would be likely to trigger AI Overview citations

Output JSON ONLY:
{ "questions": ["...", "..."] }

Each question should:
- End with a question mark
- Be specific, not generic
- Be 5-15 words long
- Not duplicate any question in the existing list`;
}

// ─── Phase 7: Fact extraction ──────────────────────────────────────────

export interface ExtractedFact {
  text: string;
  topic: string;
  importance: number;
}

export interface FactsResponse {
  facts: ExtractedFact[];
}

const FACT_MAX_INPUT_CHARS = 50000;

export function buildFactExtractionPrompt(opts: {
  primaryKeyword: string;
  competitorText: string;
}): string {
  const truncated = opts.competitorText.slice(0, FACT_MAX_INPUT_CHARS);
  return `You are extracting factual claims from an article. Read the article below and identify atomic factual statements that meet ALL of these criteria:
- States a specific number, date, percentage, dollar amount, named entity, or verifiable claim
- Is NOT promotional ("we are the best", "trusted by thousands") or opinion-based
- Is self-contained (makes sense without surrounding context)
- Is relevant to the topic "${opts.primaryKeyword}"

Output JSON ONLY — no markdown fences, no preamble:
{
  "facts": [
    {
      "text": "The atomic factual claim, rephrased to be self-contained and starting with a noun or subject (not 'According to ...').",
      "topic": "Short topic label (2-4 words) — what subtopic this fact belongs to",
      "importance": 1-100 (how central this fact is to the topic; reserve 80+ for facts a definitive guide MUST include)
    }
  ]
}

Limit to the 15 most important facts. If the article has fewer than 15 qualifying facts, return only the ones that genuinely qualify.

Article:
"""
${truncated}
"""`;
}

// ─── Phase 2 fallback: structural metrics from raw text ────────────────
// Used only if Firecrawl returns a page that doesn't expose clean HTML
// (rare, but we want graceful degradation).
export function approximateMetricsFromText(text: string): {
  wordCount: number;
  paragraphCount: number;
} {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const paragraphCount = text.split(/\n{2,}/).filter((p) => p.trim().length > 50).length;
  return { wordCount, paragraphCount };
}
