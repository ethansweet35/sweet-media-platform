/**
 * Content Editor API surface — handler functions called by Next.js routes.
 *
 * Each function:
 *   - Validates inputs
 *   - Operates against the service-role Supabase client
 *   - Throws ContentEditorError on validation / auth / persistence failures
 *
 * The thin Next.js route files in each app translate ContentEditorError →
 * NextResponse and otherwise just wire JSON in and JSON out.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { ContentEditorError } from "./errors";
import {
  getAdminClient,
  loadCompetitors,
  loadEditor,
  type CompetitorRow,
  type ContentEditorRow,
} from "./db";
import {
  computeAiSearchScore,
  scoreDocument,
  type DraftDocument,
  type ScoreBreakdown,
  type ScoringQuestion,
  type ScoringTerm,
  type StructuralTargets,
} from "./scoring";
import { cosineSimilarity, embedTexts } from "./embeddings";
import { sha256, splitSentences } from "./textUtils";

// ───────────────────────────────────────────────────────────────────────
//  Types
// ───────────────────────────────────────────────────────────────────────

export interface CreateContentEditorInput {
  primaryKeyword: string;
  secondaryKeywords?: string[];
  locationCode?: number;
  languageCode?: string;
  device?: "desktop" | "mobile";
  competitorPoolSize?: number;
  blogPostId?: string | null;
  createdBy?: string;
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
}

/** Composite payload returned by getContentEditorState. */
export interface ContentEditorState {
  editor: ContentEditorRow;
  competitors: Array<
    Pick<
      CompetitorRow,
      | "id"
      | "serp_position"
      | "url"
      | "domain"
      | "title"
      | "word_count"
      | "h2_count"
      | "h3_count"
      | "paragraph_count"
      | "image_count"
      | "individual_content_score"
      | "included_in_benchmark"
      | "fetch_status"
    >
  >;
  terms: ContentEditorTermRow[];
  questions: ContentEditorQuestionRow[];
  facts: ContentEditorFactRow[];
  outline: ContentEditorOutlineRow[];
  currentDraft: ContentEditorDraftRow | null;
}

// ───────────────────────────────────────────────────────────────────────
//  Create
// ───────────────────────────────────────────────────────────────────────

/**
 * Insert a new content editor row in `pending` status. Returns the row.
 * Does NOT trigger the pipeline — the API route should call
 * `runContentEditorPipeline()` separately via `after()` or a fetch.
 */
export async function createContentEditor(
  input: CreateContentEditorInput,
): Promise<ContentEditorRow> {
  const keyword = input.primaryKeyword?.trim();
  if (!keyword) {
    throw new ContentEditorError("primaryKeyword is required.", {
      source: "api",
      status: 400,
    });
  }

  const client = getAdminClient();

  const payload = {
    primary_keyword: keyword,
    secondary_keywords: input.secondaryKeywords ?? [],
    location_code: input.locationCode ?? 2840,
    language_code: input.languageCode ?? "en",
    device: input.device ?? "desktop",
    competitor_pool_size: Math.min(50, Math.max(10, input.competitorPoolSize ?? 20)),
    status: "pending",
    blog_post_id: input.blogPostId ?? null,
    created_by: input.createdBy ?? null,
  };

  const { data, error } = await client
    .from("content_editors")
    .insert(payload)
    .select("*")
    .single();

  if (error || !data) {
    throw new ContentEditorError(
      `Failed to create editor: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as ContentEditorRow;
}

// ───────────────────────────────────────────────────────────────────────
//  Read
// ───────────────────────────────────────────────────────────────────────

export async function getContentEditorState(
  editorId: string,
): Promise<ContentEditorState | null> {
  if (!editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }

  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor) return null;

  const [competitorsRes, termsRes, questionsRes, factsRes, outlineRes, draftRes] =
    await Promise.all([
      client
        .from("content_editor_competitors")
        .select(
          "id, serp_position, url, domain, title, word_count, h2_count, h3_count, paragraph_count, image_count, individual_content_score, included_in_benchmark, fetch_status",
        )
        .eq("editor_id", editorId)
        .order("serp_position", { ascending: true }),
      client
        .from("content_editor_terms")
        .select(
          "id, term, term_type, entity_type, relevance_score, avg_frequency, min_recommended_uses, max_recommended_uses, target_uses, competitor_coverage_pct, is_heading_recommended, is_primary_keyword, user_blacklisted, user_included",
        )
        .eq("editor_id", editorId)
        .order("relevance_score", { ascending: false })
        .limit(200),
      client
        .from("content_editor_questions")
        .select("id, question, source, recommended_position, user_dismissed")
        .eq("editor_id", editorId)
        .order("recommended_position", { ascending: true, nullsFirst: true }),
      client
        .from("content_editor_facts")
        .select(
          "id, fact_text, source_url, source_domain, source_position, source_count, topic_cluster, importance_score, covered_in_draft, user_dismissed",
        )
        .eq("editor_id", editorId)
        .order("importance_score", { ascending: false }),
      client
        .from("content_editor_outlines")
        .select("id, heading_level, heading_text, position, source, recommended_word_count")
        .eq("editor_id", editorId)
        .order("position", { ascending: true }),
      client
        .from("content_editor_drafts")
        .select(
          "id, title_tag, meta_description, h1_text, body_markdown, body_plaintext, word_count, computed_content_score, computed_coverage_score, computed_frequency_score, computed_placement_score, is_current, created_at",
        )
        .eq("editor_id", editorId)
        .eq("is_current", true)
        .maybeSingle(),
    ]);

  return {
    editor,
    competitors: (competitorsRes.data ?? []) as ContentEditorState["competitors"],
    terms: (termsRes.data ?? []) as ContentEditorTermRow[],
    questions: (questionsRes.data ?? []) as ContentEditorQuestionRow[],
    facts: (factsRes.data ?? []) as ContentEditorFactRow[],
    outline: (outlineRes.data ?? []) as ContentEditorOutlineRow[],
    currentDraft: (draftRes.data ?? null) as ContentEditorDraftRow | null,
  };
}

// ───────────────────────────────────────────────────────────────────────
//  Delete
// ───────────────────────────────────────────────────────────────────────

export async function deleteContentEditor(editorId: string): Promise<void> {
  if (!editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }
  const client = getAdminClient();
  const { error } = await client.from("content_editors").delete().eq("id", editorId);
  if (error) {
    throw new ContentEditorError(`Failed to delete editor: ${error.message}`, {
      source: "api",
      status: 500,
    });
  }
}

// ───────────────────────────────────────────────────────────────────────
//  Save draft + score
// ───────────────────────────────────────────────────────────────────────

export interface SaveDraftInput {
  editorId: string;
  titleTag?: string | null;
  metaDescription?: string | null;
  h1Text?: string | null;
  bodyHtml?: string | null;
  bodyPlaintext?: string | null;
  bodyMarkdown?: string | null;
}

/**
 * Save a draft snapshot for the editor. Sets is_current=true on the new
 * snapshot and false on the previous one. Uses an upsert against the
 * `content_editor_drafts_one_current_per_editor` unique index.
 */
export async function saveDraft(
  input: SaveDraftInput,
): Promise<ContentEditorDraftRow> {
  if (!input.editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }
  const client = getAdminClient();
  const body = input.bodyPlaintext ?? input.bodyMarkdown ?? "";
  const wordCount = body.trim() ? body.trim().split(/\s+/).filter(Boolean).length : 0;

  // Demote any previous current draft.
  await client
    .from("content_editor_drafts")
    .update({ is_current: false })
    .eq("editor_id", input.editorId)
    .eq("is_current", true);

  const { data, error } = await client
    .from("content_editor_drafts")
    .insert({
      editor_id: input.editorId,
      title_tag: input.titleTag ?? null,
      meta_description: input.metaDescription ?? null,
      h1_text: input.h1Text ?? null,
      body_html: input.bodyHtml ?? null,
      body_plaintext: input.bodyPlaintext ?? null,
      body_markdown: input.bodyMarkdown ?? null,
      word_count: wordCount,
      is_current: true,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new ContentEditorError(
      `Failed to save draft: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as ContentEditorDraftRow;
}

export interface ScoreDraftInput {
  editorId: string;
  titleTag?: string | null;
  metaDescription?: string | null;
  h1Text?: string | null;
  bodyPlaintext: string;
  /** Markdown body — enables structural metrics (h2/h3/images/paragraph count). */
  bodyMarkdown?: string | null;
  /** Pre-extracted heading texts (used for placement + per-term flags). */
  earlyHeadings?: string[];
  /** All headings (used for per-term occurs_in_heading flag). */
  allHeadings?: string[];
  /** Compute AI-search fact coverage via embeddings (~$0.001 per call, ~500ms slower). */
  includeFactCoverage?: boolean;
  /** Persist the computed score to the current draft row. */
  persist?: boolean;
}

export interface ScoreDraftResult extends ScoreBreakdown {
  /** Per-fact coverage flags (only present when includeFactCoverage=true). */
  fact_coverage?: Array<{ fact_id: string; covered: boolean; similarity: number }>;
  /** Fact coverage % (independent of ai_search_score). */
  fact_coverage_score?: number;
}

const FACT_COVERAGE_SIMILARITY_THRESHOLD = 0.78;

/**
 * Score the user's draft against the editor's recommended terms. Optionally
 * also computes fact coverage via embeddings (~$0.001 per call).
 */
export async function scoreDraft(input: ScoreDraftInput): Promise<ScoreDraftResult> {
  if (!input.editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }

  const client = getAdminClient();
  const editor = await loadEditor(client, input.editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", {
      source: "api",
      status: 404,
    });
  }

  // Parallel-load terms + questions for the editor.
  const [termsRes, questionsRes] = await Promise.all([
    client
      .from("content_editor_terms")
      .select(
        "term, relevance_score, min_recommended_uses, max_recommended_uses, is_primary_keyword, user_included, user_blacklisted",
      )
      .eq("editor_id", input.editorId),
    client
      .from("content_editor_questions")
      .select("id, question, user_dismissed")
      .eq("editor_id", input.editorId),
  ]);

  const terms = ((termsRes.data ?? []) as ScoringTerm[]).map((t) => ({
    term: t.term,
    relevance_score: t.relevance_score,
    min_recommended_uses: t.min_recommended_uses,
    max_recommended_uses: t.max_recommended_uses,
    is_primary_keyword: t.is_primary_keyword,
    user_included: t.user_included,
    user_blacklisted: t.user_blacklisted,
  }));

  const questions = ((questionsRes.data ?? []) as ScoringQuestion[]).map((q) => ({
    id: q.id,
    question: q.question,
    user_dismissed: q.user_dismissed,
  }));

  // Derive structural targets from the editor row if it has them populated.
  let structuralTargets: StructuralTargets | undefined;
  if (
    editor.recommended_word_count_min != null &&
    editor.recommended_word_count_max != null &&
    editor.recommended_h2_min != null &&
    editor.recommended_h2_max != null
  ) {
    structuralTargets = {
      word_count_min: editor.recommended_word_count_min,
      word_count_max: editor.recommended_word_count_max,
      word_count_target: editor.recommended_word_count_target ?? undefined,
      h2_min: editor.recommended_h2_min,
      h2_max: editor.recommended_h2_max,
      h3_min: editor.recommended_h3_min ?? undefined,
      h3_max: editor.recommended_h3_max ?? undefined,
      paragraph_min: editor.recommended_paragraph_count_min ?? undefined,
      paragraph_max: editor.recommended_paragraph_count_max ?? undefined,
      image_min: editor.recommended_image_min ?? undefined,
      image_max: editor.recommended_image_max ?? undefined,
    };
  }

  const doc: DraftDocument = {
    body: input.bodyPlaintext,
    bodyMarkdown: input.bodyMarkdown ?? null,
    titleTag: input.titleTag,
    h1Text: input.h1Text,
    metaDescription: input.metaDescription,
    earlyHeadings: input.earlyHeadings,
    allHeadings: input.allHeadings,
  };

  const breakdown = scoreDocument(doc, terms, editor.primary_keyword, {
    structuralTargets,
    questions,
  });
  const result: ScoreDraftResult = { ...breakdown };

  if (input.includeFactCoverage) {
    const factCoverage = await computeFactCoverage(client, input.editorId, input.bodyPlaintext);
    result.fact_coverage = factCoverage.perFact;
    result.fact_coverage_score = factCoverage.score;
    // Now we have all 3 AI-search components — compute the combined score.
    result.ai_search_score = computeAiSearchScore({
      factCoverage: factCoverage.score,
      questionCoverage: result.question_coverage_score,
      citableStructure: result.citable_structure_score,
    });
  }

  if (input.persist) {
    await client
      .from("content_editor_drafts")
      .update({
        computed_content_score: result.content_score,
        computed_coverage_score: result.coverage_score,
        computed_frequency_score: result.frequency_score,
        computed_placement_score: result.placement_score,
        computed_seo_score: result.seo_score ?? null,
        computed_ai_search_score: result.ai_search_score ?? null,
      })
      .eq("editor_id", input.editorId)
      .eq("is_current", true);
  }

  return result;
}

// ───────────────────────────────────────────────────────────────────────
//  Fact coverage (embedding-based)
// ───────────────────────────────────────────────────────────────────────

interface FactCoverageResult {
  score: number;
  perFact: Array<{ fact_id: string; covered: boolean; similarity: number }>;
}

/**
 * For each fact on the editor, check whether any sentence in the draft
 * is semantically similar enough (cosine > 0.78) to be considered
 * "covered". Returns the % covered + per-fact flags.
 *
 * Uses a sentence-embedding cache on the draft row to avoid re-embedding
 * unchanged sentences. Cache key: sha256(sentence_text).
 */
async function computeFactCoverage(
  client: SupabaseClient,
  editorId: string,
  bodyPlaintext: string,
): Promise<FactCoverageResult> {
  // Load facts (with embeddings).
  // Note: Supabase JS returns vector columns as a JSON-parsed string array.
  // We cast to number[][] manually if needed.
  const { data: factRows } = await client
    .from("content_editor_facts")
    .select("id, embedding")
    .eq("editor_id", editorId);

  if (!factRows || factRows.length === 0) {
    return { score: 100, perFact: [] };
  }

  // Parse embeddings — pgvector returns "[0.1,0.2,...]" string format.
  interface RawFact { id: string; embedding: unknown }
  const facts: Array<{ id: string; embedding: number[] }> = [];
  for (const r of factRows as RawFact[]) {
    const vec = parseVector(r.embedding);
    if (vec) facts.push({ id: r.id, embedding: vec });
  }

  // Sentence split + dedup.
  const sentences = splitSentences(bodyPlaintext);
  if (sentences.length === 0) {
    return {
      score: 0,
      perFact: facts.map((f) => ({ fact_id: f.id, covered: false, similarity: 0 })),
    };
  }

  // Embed sentences. (Future enhancement: cache by sha256 of sentence on the draft row.)
  const embedResult = await embedTexts(sentences);
  const sentenceEmbeddings = embedResult.data.embeddings;

  // For each fact, find best matching sentence.
  const perFact = facts.map((f) => {
    let best = 0;
    for (const se of sentenceEmbeddings) {
      const sim = cosineSimilarity(f.embedding, se);
      if (sim > best) best = sim;
    }
    return {
      fact_id: f.id,
      covered: best >= FACT_COVERAGE_SIMILARITY_THRESHOLD,
      similarity: Math.round(best * 1000) / 1000,
    };
  });

  const coveredCount = perFact.filter((p) => p.covered).length;
  const score = facts.length > 0 ? (coveredCount / facts.length) * 100 : 0;

  return { score: Math.round(score * 10) / 10, perFact };
}

/** Parse pgvector "[0.1,0.2,...]" string or number[] into number[]. */
function parseVector(raw: unknown): number[] | null {
  if (Array.isArray(raw)) return raw as number[];
  if (typeof raw !== "string") return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as number[];
  } catch {
    // fall through
  }
  return null;
}

// Re-export for the route's convenience.
export { sha256 } from "./textUtils";
