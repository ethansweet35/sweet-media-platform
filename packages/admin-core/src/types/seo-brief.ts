/**
 * Sweet SEO content brief — types shared between the analyze API,
 * the database row, and the admin UI.
 *
 * Mirrors `public.seo_briefs` from
 * `apps/client-template/supabase/migrations/2026-05-12_sweet_seo_briefs.sql`.
 */

export type SeoBriefStatus = "pending" | "processing" | "ready" | "error";

/** A min/max pair where max may be unbounded (null = no upper limit). */
export interface RangeNum {
  min: number;
  max: number | null;
}

/** Required pair (both bounded). */
export interface BoundedRangeNum {
  min: number;
  max: number;
}

export interface SeoBriefStructure {
  characters: BoundedRangeNum;
  words: BoundedRangeNum;
  headings: BoundedRangeNum;
  paragraphs: RangeNum;
  images: BoundedRangeNum;
}

export interface SeoBriefTerm {
  term: string;
  min: number;
  max: number;
}

export interface SeoBriefFactGroup {
  topic: string;
  points: string[];
}

export interface SeoBriefCitation {
  url: string;
  title: string;
}

/* ------------------------------------------------------------------ */
/* Row-linkage types (blog_posts / tracked_pages -> seo_briefs).        */
/* ------------------------------------------------------------------ */

/**
 * Columns added to `blog_posts` and `tracked_pages` by the
 * `2026-05-12_swap_surfer_for_sweet_seo` migration. UI components hydrate
 * these directly from Supabase rows.
 */
export interface SeoBriefRowFields {
  seo_brief_id: string | null;
  seo_guidance_applied: boolean;
  published_url: string | null;
}

/** What we send to /api/admin/sweet-seo/* row endpoints to identify the row. */
export interface SeoBriefRowRef {
  kind: "blog" | "page";
  id: string;
}

/** Database row shape from `public.seo_briefs`. */
export interface SeoBriefRow {
  id: string;
  keyword: string;
  country: string;
  status: SeoBriefStatus;
  model: string | null;
  content_structure: SeoBriefStructure | null;
  important_terms: SeoBriefTerm[] | null;
  questions: string[] | null;
  facts: SeoBriefFactGroup[] | null;
  citations: SeoBriefCitation[] | null;
  notes: string | null;
  draft_content: string;
  error_message: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Models that can power Sweet SEO analysis. Web-search-capable models only.
 * Defaults to Perplexity Sonar Pro (purpose-built for live web research).
 */
export interface SeoBriefModelOption {
  id: string;
  displayName: string;
  description: string;
  isDefault?: boolean;
}

export const SEO_BRIEF_MODELS: SeoBriefModelOption[] = [
  {
    id: "perplexity/sonar-pro",
    displayName: "Perplexity Sonar Pro",
    description:
      "Purpose-built live web research. Best default — strong at scanning competitor pages and surfacing citations.",
    isDefault: true,
  },
  {
    id: "perplexity/sonar-reasoning-pro",
    displayName: "Perplexity Sonar Reasoning Pro",
    description: "Same web search, with chain-of-thought reasoning. Slower but more thorough term extraction.",
  },
  {
    id: "openai/gpt-5.5-pro:online",
    displayName: "GPT-5.5 Pro (with web search)",
    description: "OpenAI flagship + web search add-on. Useful when Perplexity returns sparse results.",
  },
  {
    id: "anthropic/claude-sonnet-4.6:online",
    displayName: "Claude Sonnet 4.6 (with web search)",
    description: "Claude with web search add-on. Best at structured JSON output; mid-tier cost.",
  },
];

export const DEFAULT_SEO_BRIEF_MODEL =
  SEO_BRIEF_MODELS.find((m) => m.isDefault)?.id ?? SEO_BRIEF_MODELS[0].id;

export const ALLOWED_SEO_BRIEF_MODELS = new Set(SEO_BRIEF_MODELS.map((m) => m.id));

/* ------------------------------------------------------------------ */
/* Live-scoring utilities (used by the editor + list view).            */
/* ------------------------------------------------------------------ */

export interface DraftStats {
  characters: number;
  words: number;
  headings: number;
  paragraphs: number;
  images: number;
}

const HEADING_RE = /^\s{0,3}#{1,6}\s+\S/gm;
const IMAGE_RE = /!\[[^\]]*\]\([^)]+\)/g;

/** Compute live structural stats for a markdown-ish draft. */
export function computeDraftStats(content: string): DraftStats {
  const text = content ?? "";
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const headings = (text.match(HEADING_RE) ?? []).length;
  const images = (text.match(IMAGE_RE) ?? []).length;
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !/^\s{0,3}#{1,6}\s+/.test(p))
    .length;
  return { characters, words, headings, paragraphs, images };
}

/** Count case-insensitive whole-phrase occurrences (word-boundary aware). */
export function countTermOccurrences(content: string, term: string): number {
  if (!term) return 0;
  const safe = term.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!safe) return 0;
  const re = new RegExp(`(?:^|[^\\p{L}\\p{N}])${safe}(?=$|[^\\p{L}\\p{N}])`, "giu");
  return (content.match(re) ?? []).length;
}

export type RangeStatus = "under" | "ok" | "over" | "empty";

export function rangeStatus(value: number, min: number, max: number | null): RangeStatus {
  if (value === 0 && min > 0) return "empty";
  if (value < min) return "under";
  if (max !== null && value > max) return "over";
  return "ok";
}

export interface ContentScoreBreakdown {
  score: number;
  structureScore: number;
  termsScore: number;
  totalChecks: number;
  passedChecks: number;
  structureChecks: { key: string; status: RangeStatus; value: number; min: number; max: number | null }[];
  termChecks: { term: string; status: RangeStatus; value: number; min: number; max: number }[];
}

/**
 * Compute a 0–100 content score by comparing draft stats and term usage to the brief targets.
 * Structure and terms are weighted 30/70 (matches Surfer's emphasis on NLP coverage).
 */
export function computeContentScore(
  content: string,
  structure: SeoBriefStructure | null,
  terms: SeoBriefTerm[] | null,
): ContentScoreBreakdown {
  const stats = computeDraftStats(content);
  const structureChecks: ContentScoreBreakdown["structureChecks"] = [];
  const termChecks: ContentScoreBreakdown["termChecks"] = [];

  if (structure) {
    const fields: { key: keyof DraftStats; min: number; max: number | null }[] = [
      { key: "characters", min: structure.characters.min, max: structure.characters.max },
      { key: "words", min: structure.words.min, max: structure.words.max },
      { key: "headings", min: structure.headings.min, max: structure.headings.max },
      { key: "paragraphs", min: structure.paragraphs.min, max: structure.paragraphs.max },
      { key: "images", min: structure.images.min, max: structure.images.max },
    ];
    for (const f of fields) {
      const value = stats[f.key];
      structureChecks.push({
        key: f.key,
        status: rangeStatus(value, f.min, f.max),
        value,
        min: f.min,
        max: f.max,
      });
    }
  }

  if (terms) {
    for (const t of terms) {
      const value = countTermOccurrences(content, t.term);
      termChecks.push({
        term: t.term,
        status: rangeStatus(value, t.min, t.max),
        value,
        min: t.min,
        max: t.max,
      });
    }
  }

  const structurePassed = structureChecks.filter((c) => c.status === "ok").length;
  const termsPassed = termChecks.filter((c) => c.status === "ok").length;
  const structureScore = structureChecks.length
    ? Math.round((structurePassed / structureChecks.length) * 100)
    : 0;
  const termsScore = termChecks.length ? Math.round((termsPassed / termChecks.length) * 100) : 0;

  const hasAny = structureChecks.length > 0 || termChecks.length > 0;
  const blended = hasAny
    ? Math.round(structureScore * 0.3 + termsScore * 0.7)
    : 0;

  return {
    score: blended,
    structureScore,
    termsScore,
    totalChecks: structureChecks.length + termChecks.length,
    passedChecks: structurePassed + termsPassed,
    structureChecks,
    termChecks,
  };
}
