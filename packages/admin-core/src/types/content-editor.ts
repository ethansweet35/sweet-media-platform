/**
 * Client-safe types for the Content Editor.
 *
 * These mirror the shapes returned by `getContentEditorState()` on the
 * server, but live here so client components can import without
 * pulling in the server module (which imports node:crypto, etc.).
 */

export type ContentEditorStatus =
  | "pending"
  | "fetching_serp"
  | "extracting_content"
  | "analyzing_nlp"
  | "extracting_facts"
  | "computing_guidelines"
  | "ready"
  | "failed";

export interface ContentEditorListRow {
  id: string;
  primary_keyword: string;
  status: ContentEditorStatus;
  status_message: string | null;
  error: string | null;
  total_cost_usd: number;
  recommended_word_count_min: number | null;
  recommended_word_count_max: number | null;
  recommended_word_count_target: number | null;
  competitor_avg_score: number | null;
  target_score: number | null;
  /** Populated via join with content_editor_drafts; null if no draft has been scored yet. */
  current_content_score: number | null;
  blog_post_id: string | null;
  /** When set, the editor is in Page Mode (linked to a tracked_pages row). */
  linked_tracked_page_id: string | null;
  /** Live-page score for the linked tracked page (only populated in Page Mode). */
  live_page_score: number | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface ContentEditorRow extends ContentEditorListRow {
  secondary_keywords: string[];
  location_code: number;
  language_code: string;
  device: string;
  competitor_pool_size: number;
  created_by: string | null;
  recommended_h2_min: number | null;
  recommended_h2_max: number | null;
  recommended_h3_min: number | null;
  recommended_h3_max: number | null;
  recommended_image_min: number | null;
  recommended_image_max: number | null;
  recommended_paragraph_count_min: number | null;
  recommended_paragraph_count_max: number | null;
}

export interface ContentEditorCompetitorRow {
  id: string;
  serp_position: number;
  url: string;
  domain: string;
  title: string | null;
  word_count: number | null;
  h2_count: number | null;
  h3_count: number | null;
  paragraph_count: number | null;
  image_count: number | null;
  individual_content_score: number | null;
  included_in_benchmark: boolean;
  fetch_status: "pending" | "scraping" | "scraped" | "failed";
}

export interface ContentEditorTermRow {
  id: string;
  term: string;
  term_type: string;
  entity_type: string | null;
  relevance_score: number;
  avg_frequency: number | null;
  min_recommended_uses: number;
  max_recommended_uses: number;
  target_uses: number;
  competitor_coverage_pct: number | null;
  is_heading_recommended: boolean;
  is_primary_keyword: boolean;
  user_blacklisted: boolean;
  user_included: boolean;
}

export interface ContentEditorQuestionRow {
  id: string;
  question: string;
  source: string;
  recommended_position: number | null;
  user_dismissed: boolean;
}

export interface ContentEditorFactRow {
  id: string;
  fact_text: string;
  source_url: string;
  source_domain: string;
  source_position: number | null;
  source_count: number;
  topic_cluster: string | null;
  importance_score: number | null;
  covered_in_draft: boolean;
  user_dismissed: boolean;
}

export interface ContentEditorOutlineRow {
  id: string;
  heading_level: number;
  heading_text: string;
  position: number;
  source: string | null;
  recommended_word_count: number | null;
}

export interface ContentEditorDraftRow {
  id: string;
  title_tag: string | null;
  meta_description: string | null;
  h1_text: string | null;
  body_markdown: string | null;
  body_plaintext: string | null;
  word_count: number | null;
  computed_content_score: number | null;
  computed_coverage_score: number | null;
  computed_frequency_score: number | null;
  computed_placement_score: number | null;
  is_current: boolean;
  created_at: string;
  /** Bumped on every saveDraft/scoreDraft persistence. */
  updated_at: string;
}

/** Live-page snapshot summary (client-safe). */
export interface ContentEditorLiveSnapshot {
  id: string;
  fetched_at: string;
  status_code: number | null;
  word_count: number | null;
  computed_content_score: number | null;
  computed_coverage_score: number | null;
  computed_frequency_score: number | null;
  computed_placement_score: number | null;
  fetch_error: string | null;
  plaintext: string | null;
  headings: Array<{ level: number; text: string }> | null;
}

/** Linked tracked-page info — only present in Page Mode editors. */
export interface ContentEditorLinkedPage {
  id: string;
  route_path: string;
  page_title: string | null;
  seo_title: string | null;
  meta_description: string | null;
  liveSnapshot: ContentEditorLiveSnapshot | null;
}

/** Composite payload returned by GET /api/admin/content-editor/[id]. */
export interface ContentEditorState {
  editor: ContentEditorRow;
  competitors: ContentEditorCompetitorRow[];
  terms: ContentEditorTermRow[];
  questions: ContentEditorQuestionRow[];
  facts: ContentEditorFactRow[];
  outline: ContentEditorOutlineRow[];
  currentDraft: ContentEditorDraftRow | null;
  linkedPage: ContentEditorLinkedPage | null;
}

// ─── Scoring types (mirror of server-side, client-safe) ────────────────

export type TermStatus = "missing" | "under" | "good" | "over";
export type StructuralStatus = "under" | "good" | "over" | "missing";

export interface PlacementChecks {
  primary_kw_in_title: boolean;
  primary_kw_in_h1: boolean;
  primary_kw_in_meta: boolean;
  primary_kw_in_first_100: boolean;
  primary_kw_in_early_heading: boolean;
}

export interface TermUsage {
  term: string;
  occurrences: number;
  status: TermStatus;
  min_recommended_uses: number;
  max_recommended_uses: number;
  occurs_in_heading?: boolean;
  occurs_in_first_100_words?: boolean;
}

export interface StructuralCheck {
  key: "word_count" | "h2_count" | "h3_count" | "paragraph_count" | "image_count";
  status: StructuralStatus;
  value: number;
  min: number;
  max: number;
}

export type EeatCheckKey =
  | "author_bio"
  | "medical_reviewer"
  | "last_updated_visible"
  | "authoritative_citations"
  | "schema_markup";

export interface EeatCheck {
  key: EeatCheckKey;
  passed: boolean;
  detail?: string;
  weight: number;
}

export interface EeatBreakdown {
  score: number;
  checks: EeatCheck[];
  authoritative_citation_count: number;
}

export interface ScoreBreakdown {
  content_score: number;
  coverage_score: number;
  frequency_score: number;
  placement_score: number;
  term_usage: TermUsage[];
  placement_checks: PlacementChecks;
  structural_alignment?: number;
  structural_checks?: StructuralCheck[];
  seo_score?: number;
  question_coverage_score?: number;
  citable_structure_score?: number;
  question_usage?: Array<{ question: string; covered: boolean; overlap: number }>;
  ai_search_score?: number;
  fact_coverage?: Array<{ fact_id: string; covered: boolean; similarity: number }>;
  fact_coverage_score?: number;
  eeat_score: number;
  eeat?: EeatBreakdown;
}

export const EEAT_CHECK_LABELS: Record<EeatCheckKey, string> = {
  author_bio: "Author byline & bio",
  medical_reviewer: "Medical reviewer",
  last_updated_visible: "Last-updated date",
  authoritative_citations: "Authoritative citations",
  schema_markup: "Schema markup",
};

// ─── Status display helpers ────────────────────────────────────────────

export const STATUS_LABELS: Record<ContentEditorStatus, string> = {
  pending: "Queued",
  fetching_serp: "Fetching SERP",
  extracting_content: "Scraping pages",
  analyzing_nlp: "Analyzing topics",
  extracting_facts: "Extracting facts",
  computing_guidelines: "Building guidelines",
  ready: "Ready",
  failed: "Failed",
};

export const STATUS_IS_PROCESSING: Record<ContentEditorStatus, boolean> = {
  pending: true,
  fetching_serp: true,
  extracting_content: true,
  analyzing_nlp: true,
  extracting_facts: true,
  computing_guidelines: true,
  ready: false,
  failed: false,
};
