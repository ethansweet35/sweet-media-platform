/**
 * Content Editor pipeline orchestrator.
 *
 * Executes the 8-phase analysis pipeline for a content editor session:
 *
 *   1. SERP fetch              (DataForSEO)
 *   2. Content extraction      (Firecrawl, 5 concurrent)
 *   3. NLP + n-gram analysis   (Google NLP + TF-IDF)
 *   4. Structural benchmarks   (percentile-based ranges)
 *   5. Outline synthesis       (Claude Sonnet)
 *   6. Question synthesis      (Claude Sonnet — augments PAA)
 *   7. Fact extraction         (Claude Haiku per competitor + embedding dedup)
 *   8. Competitor scoring      (derives competitor_avg_score + target_score)
 *
 * State is persisted after each phase so the function is idempotent — if
 * called again on the same editor, each phase short-circuits if its
 * outputs are already present. This makes mid-pipeline retries safe and
 * lets future split-deployment patterns (queue, separate worker) work
 * with no further refactor.
 *
 * The function only throws on hard failures (missing config, unrecoverable
 * vendor errors). Soft per-competitor failures are recorded on the
 * individual competitor row and the pipeline continues with the rest.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  analyzeEntities,
  callClaude,
  cosineSimilarity,
  embedTexts,
  fetchSerpResults,
  scrapePage,
} from "./index";
import {
  ContentEditorRow,
  CompetitorRow,
  addCost,
  getAdminClient,
  loadBlacklistedDomains,
  loadCompetitors,
  loadEditor,
  setStatus,
} from "./db";
import { ContentEditorError } from "./errors";
import { extractNgrams, termAppearsInHeadings, type NgramTerm } from "./ngrams";
import {
  buildFactExtractionPrompt,
  buildOutlinePrompt,
  buildQuestionSynthesisPrompt,
  type FactsResponse,
  type OutlineResponse,
  type QuestionResponse,
} from "./prompts";
import { computeTargetScore, scoreDocument, type ScoringTerm } from "./scoring";
import {
  extractDomain,
  looksLikeQuestion,
  mean,
  percentile,
  sha256,
} from "./textUtils";
import type { NlpEntity } from "./types";

// ─── Pipeline tunables ────────────────────────────────────────────────
const SCRAPE_CONCURRENCY = 5;
const NLP_CONCURRENCY = 5;
const FACT_EXTRACTION_CONCURRENCY = 4;
const SERP_CACHE_TTL_HOURS = 24;
const MIN_UNIQUE_DOMAINS_REQUIRED = 3;
const TERMS_LIMIT = 100;
const FACT_DEDUP_SIMILARITY_THRESHOLD = 0.85;
const TARGET_FACT_COUNT = 25;

export interface RunPipelineOptions {
  editorId: string;
  /** Inject a Supabase client for testing; defaults to service-role client. */
  client?: SupabaseClient;
}

/**
 * Top-level entrypoint. Runs all 8 phases sequentially. Idempotent — each
 * phase checks whether its outputs already exist and short-circuits if so.
 *
 * On hard failure, marks `status='failed'` and re-throws. On success,
 * sets `status='ready'` and `completed_at`.
 */
export async function runContentEditorPipeline(opts: RunPipelineOptions): Promise<void> {
  const client = opts.client ?? getAdminClient();
  const editor = await loadEditor(client, opts.editorId);
  if (!editor) {
    throw new ContentEditorError(`Editor ${opts.editorId} not found`, {
      source: "pipeline",
      status: 404,
    });
  }
  if (editor.status === "ready") return;

  try {
    await phase1_serpFetch(client, editor);
    await phase2_contentExtraction(client, editor);

    // Reload competitors with their scraped data for downstream phases.
    let competitors = await loadCompetitors(client, editor.id);
    const benchmark = competitors.filter(
      (c) => c.included_in_benchmark && c.cleaned_text && (c.word_count ?? 0) > 300,
    );

    if (benchmark.length < MIN_UNIQUE_DOMAINS_REQUIRED) {
      throw new ContentEditorError(
        `Only ${benchmark.length} competitor pages successfully scraped (need ≥${MIN_UNIQUE_DOMAINS_REQUIRED}). ` +
          `The SERP may be branded, paywalled, or dominated by JS-heavy sites.`,
        { source: "pipeline", status: 502 },
      );
    }

    const terms = await phase3_nlpAndNgrams(client, editor, benchmark);
    await phase4_structuralBenchmark(client, editor, benchmark);
    await phase5_outlineSynthesis(client, editor, benchmark);
    await phase6_questionSynthesis(client, editor, benchmark);
    await phase7_factsExtraction(client, editor, benchmark);

    // Reload competitors again so phase 8 sees any updates from earlier phases.
    competitors = await loadCompetitors(client, editor.id);
    await phase8_competitorScoring(client, editor, competitors, terms);

    await markReady(client, editor.id);
  } catch (err) {
    await markFailed(client, editor.id, err);
    throw err;
  }
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 1 — SERP fetch
// ═════════════════════════════════════════════════════════════════════

async function phase1_serpFetch(
  client: SupabaseClient,
  editor: ContentEditorRow,
): Promise<void> {
  // Short-circuit: skip if competitor rows already exist.
  const existing = await loadCompetitors(client, editor.id);
  if (existing.length > 0) return;

  await setStatus(client, editor.id, "fetching_serp", "Fetching top-ranking pages…");

  const cacheKey = sha256(
    `${editor.primary_keyword}|${editor.location_code}|${editor.language_code}|${editor.device}`,
  );

  // Check cache
  let payload: Awaited<ReturnType<typeof fetchSerpResults>>["data"] | null = null;
  const { data: cacheRow } = await client
    .from("content_editor_serp_cache")
    .select("payload, fetched_at")
    .eq("cache_key", cacheKey)
    .maybeSingle();
  if (cacheRow) {
    const cached = cacheRow as { payload: unknown; fetched_at: string };
    const ageMs = Date.now() - new Date(cached.fetched_at).getTime();
    if (ageMs < SERP_CACHE_TTL_HOURS * 3600_000) {
      payload = cached.payload as typeof payload;
    }
  }

  if (!payload) {
    const result = await fetchSerpResults({
      keyword: editor.primary_keyword,
      locationCode: editor.location_code,
      languageCode: editor.language_code,
      device: editor.device as "desktop" | "mobile",
      depth: editor.competitor_pool_size,
    });
    payload = result.data;
    await addCost(client, editor.id, result.cost_usd);

    // Write to cache (upsert)
    await client
      .from("content_editor_serp_cache")
      .upsert({ cache_key: cacheKey, payload, fetched_at: new Date().toISOString() });
  }

  // Filtering: blacklist + URL-extension filter + dedupe by root domain.
  const blacklist = await loadBlacklistedDomains(client);
  const isBlacklisted = (domain: string): boolean =>
    blacklist.some((p) => domain === p || domain.endsWith(`.${p}`));

  const seenDomains = new Set<string>();
  const filtered: typeof payload.organicResults = [];
  for (const r of payload.organicResults) {
    if (!r.url || !r.domain) continue;
    if (/\.(pdf|doc|docx|ppt|pptx)(\?|$)/i.test(r.url)) continue;
    if (isBlacklisted(r.domain)) continue;
    if (seenDomains.has(r.domain)) continue; // one entry per root domain
    seenDomains.add(r.domain);
    filtered.push(r);
  }

  if (filtered.length < MIN_UNIQUE_DOMAINS_REQUIRED) {
    throw new ContentEditorError(
      `Only ${filtered.length} unique competitor domains after filtering (need ≥${MIN_UNIQUE_DOMAINS_REQUIRED}). ` +
        `The SERP may be too narrow or dominated by blacklisted sources.`,
      { source: "pipeline", status: 502 },
    );
  }

  // Insert competitor rows
  const competitorRows = filtered.map((r) => ({
    editor_id: editor.id,
    serp_position: r.position,
    url: r.url,
    domain: r.domain,
    title: r.title,
    meta_description: r.description,
    fetch_status: "pending" as const,
    included_in_benchmark: true,
  }));
  const { error: insertErr } = await client
    .from("content_editor_competitors")
    .insert(competitorRows);
  if (insertErr) {
    throw new ContentEditorError(`Failed to insert competitors: ${insertErr.message}`, {
      source: "pipeline",
      status: 500,
    });
  }

  // Insert PAA questions
  if (payload.paaQuestions.length > 0) {
    const paaRows = payload.paaQuestions.map((q, idx) => ({
      editor_id: editor.id,
      question: q,
      source: "paa" as const,
      recommended_position: idx,
    }));
    await client.from("content_editor_questions").insert(paaRows);
  }
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 2 — Content extraction
// ═════════════════════════════════════════════════════════════════════

async function phase2_contentExtraction(
  client: SupabaseClient,
  editor: ContentEditorRow,
): Promise<void> {
  const all = await loadCompetitors(client, editor.id);
  const pending = all.filter((c) => c.fetch_status !== "scraped" && c.fetch_status !== "failed");
  if (pending.length === 0) return; // already done

  await setStatus(client, editor.id, "extracting_content", `Scraping ${pending.length} pages…`);

  // Process in chunks of SCRAPE_CONCURRENCY in parallel.
  for (let i = 0; i < pending.length; i += SCRAPE_CONCURRENCY) {
    const chunk = pending.slice(i, i + SCRAPE_CONCURRENCY);
    const results = await Promise.allSettled(
      chunk.map(async (c) => {
        const out = await scrapePage({ url: c.url });
        await addCost(client, editor.id, out.cost_usd);
        return { competitor: c, scrape: out.data };
      }),
    );

    for (let j = 0; j < results.length; j++) {
      const c = chunk[j];
      const r = results[j];
      if (r.status === "fulfilled") {
        const s = r.value.scrape;
        await client
          .from("content_editor_competitors")
          .update({
            title: s.title || c.title,
            meta_description: s.metaDescription || c.meta_description,
            word_count: s.wordCount,
            h1_text: s.h1Text,
            h2_count: s.h2Count,
            h3_count: s.h3Count,
            paragraph_count: s.paragraphCount,
            image_count: s.imageCount,
            internal_link_count: s.internalLinkCount,
            external_link_count: s.externalLinkCount,
            cleaned_text: s.cleanedText,
            headings: s.headings,
            fetch_status: "scraped",
            fetch_error: null,
            included_in_benchmark: s.wordCount >= 300,
          })
          .eq("id", c.id);
      } else {
        const msg = r.reason instanceof Error ? r.reason.message : String(r.reason);
        await client
          .from("content_editor_competitors")
          .update({
            fetch_status: "failed",
            fetch_error: msg.slice(0, 500),
            included_in_benchmark: false,
          })
          .eq("id", c.id);
      }
    }
  }
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 3 — NLP entities + n-gram extraction
// ═════════════════════════════════════════════════════════════════════

async function phase3_nlpAndNgrams(
  client: SupabaseClient,
  editor: ContentEditorRow,
  competitors: CompetitorRow[],
): Promise<ScoringTerm[]> {
  // Short-circuit if terms already exist.
  const { count } = await client
    .from("content_editor_terms")
    .select("id", { count: "exact", head: true })
    .eq("editor_id", editor.id);
  if ((count ?? 0) > 0) {
    return loadTermsAsScoringTerms(client, editor.id);
  }

  await setStatus(client, editor.id, "analyzing_nlp", "Analyzing entities and topics…");

  // Run Google NLP on each competitor's cleaned text (5 concurrent).
  const allEntities = new Map<string, { totalSalience: number; mentions: number; type: string; appearedInDocs: number }>();

  for (let i = 0; i < competitors.length; i += NLP_CONCURRENCY) {
    const chunk = competitors.slice(i, i + NLP_CONCURRENCY);
    const results = await Promise.allSettled(
      chunk.map(async (c) => {
        if (!c.cleaned_text) return [];
        const out = await analyzeEntities(c.cleaned_text, { languageCode: editor.language_code });
        await addCost(client, editor.id, out.cost_usd);
        return out.data;
      }),
    );

    for (const r of results) {
      if (r.status !== "fulfilled") continue;
      const seenInThisDoc = new Set<string>();
      for (const e of r.value as NlpEntity[]) {
        const key = e.name.toLowerCase();
        seenInThisDoc.add(key);
        const existing = allEntities.get(key);
        if (existing) {
          existing.totalSalience += e.salience;
          existing.mentions += e.mentionCount;
        } else {
          allEntities.set(key, {
            totalSalience: e.salience,
            mentions: e.mentionCount,
            type: e.type,
            appearedInDocs: 0,
          });
        }
      }
      for (const key of seenInThisDoc) {
        const ent = allEntities.get(key);
        if (ent) ent.appearedInDocs++;
      }
    }
  }

  // Run TF-IDF n-gram extraction across all docs.
  const docTexts = competitors.map((c) => c.cleaned_text ?? "");
  const ngrams = extractNgrams(docTexts, { minDocFreq: 0.4, limit: 250 });

  // Merge entities + n-grams. Use lowercase key for dedup.
  const merged = mergeEntitiesAndNgrams(allEntities, ngrams, competitors.length);

  // Compute recommended use range per term based on competitor pool size.
  const avgWordCount = mean(competitors.map((c) => c.word_count ?? 0).filter((w) => w > 0)) || 2000;
  const targetWordCount = Math.round(avgWordCount);

  const allHeadings = competitors.flatMap((c) => c.headings ?? []);
  const primaryKeyword = editor.primary_keyword.toLowerCase();

  const termsToInsert = merged.slice(0, TERMS_LIMIT).map((m): {
    editor_id: string;
    term: string;
    term_type: "entity" | "ngram" | "nlp_keyword";
    entity_type: string | null;
    relevance_score: number;
    avg_frequency: number;
    min_recommended_uses: number;
    max_recommended_uses: number;
    target_uses: number;
    competitor_coverage_pct: number;
    is_heading_recommended: boolean;
    is_primary_keyword: boolean;
  } => {
    const scale = (targetWordCount / Math.max(1, avgWordCount));
    const minUses = Math.max(1, Math.round(m.avgFreq * scale));
    const maxUses = Math.max(minUses + 1, Math.round(m.maxFreq * scale));
    const targetUses = Math.round((minUses + maxUses) / 2);

    return {
      editor_id: editor.id,
      term: m.term,
      term_type: m.type === "ngram" ? "ngram" : "entity",
      entity_type: m.entityType ?? null,
      relevance_score: Number(m.relevance.toFixed(4)),
      avg_frequency: Number(m.avgFreq.toFixed(4)),
      min_recommended_uses: minUses,
      max_recommended_uses: maxUses,
      target_uses: targetUses,
      competitor_coverage_pct: Number((m.coverage * 100).toFixed(2)),
      is_heading_recommended: termAppearsInHeadings(m.term, allHeadings),
      is_primary_keyword: m.term.toLowerCase() === primaryKeyword,
    };
  });

  // Ensure the primary keyword itself is in the list, even if it didn't
  // make the relevance cut (rare but possible for very competitive SERPs).
  const hasPrimary = termsToInsert.some((t) => t.is_primary_keyword);
  if (!hasPrimary) {
    termsToInsert.unshift({
      editor_id: editor.id,
      term: editor.primary_keyword.toLowerCase(),
      term_type: "nlp_keyword",
      entity_type: null,
      relevance_score: 9999,
      avg_frequency: 0,
      min_recommended_uses: 3,
      max_recommended_uses: 10,
      target_uses: 6,
      competitor_coverage_pct: 100,
      is_heading_recommended: true,
      is_primary_keyword: true,
    });
  }

  await client.from("content_editor_terms").insert(termsToInsert);

  return termsToInsert.map((t) => ({
    term: t.term,
    relevance_score: t.relevance_score,
    min_recommended_uses: t.min_recommended_uses,
    max_recommended_uses: t.max_recommended_uses,
    is_primary_keyword: t.is_primary_keyword,
    user_included: true,
    user_blacklisted: false,
  }));
}

interface MergedTerm {
  term: string;
  type: "entity" | "ngram";
  entityType: string | null;
  relevance: number;
  avgFreq: number;
  maxFreq: number;
  coverage: number;
}

function mergeEntitiesAndNgrams(
  entities: Map<string, { totalSalience: number; mentions: number; type: string; appearedInDocs: number }>,
  ngrams: NgramTerm[],
  totalDocs: number,
): MergedTerm[] {
  const merged = new Map<string, MergedTerm>();

  // Seed with n-grams (more comprehensive baseline)
  for (const ng of ngrams) {
    merged.set(ng.term, {
      term: ng.term,
      type: "ngram",
      entityType: null,
      relevance: ng.tfIdf,
      avgFreq: ng.avgFreq,
      maxFreq: ng.maxFreq,
      coverage: ng.coverage,
    });
  }

  // Overlay entities — boost relevance for known named entities; if an
  // entity isn't already in the map, add it with a synthetic relevance.
  for (const [key, e] of entities.entries()) {
    const coverage = totalDocs > 0 ? e.appearedInDocs / totalDocs : 0;
    if (coverage < 0.3) continue; // Need to appear in 30%+ of docs to count
    const avgSalience = e.totalSalience / Math.max(1, e.appearedInDocs);
    // Salience is 0..1; scale to comparable magnitude with tf-idf.
    const synthRelevance = avgSalience * 20 * (1 + coverage);

    const existing = merged.get(key);
    if (existing) {
      // Boost an existing n-gram if it's also a named entity.
      existing.type = "entity";
      existing.entityType = e.type;
      existing.relevance = Math.max(existing.relevance, synthRelevance) + synthRelevance * 0.3;
    } else {
      // Avg occurrence count = mentions / docs that contained it.
      const avgFreq = e.mentions / Math.max(1, e.appearedInDocs);
      merged.set(key, {
        term: key,
        type: "entity",
        entityType: e.type,
        relevance: synthRelevance,
        avgFreq,
        maxFreq: Math.max(1, Math.round(avgFreq * 1.5)),
        coverage,
      });
    }
  }

  return Array.from(merged.values()).sort((a, b) => b.relevance - a.relevance);
}

async function loadTermsAsScoringTerms(
  client: SupabaseClient,
  editorId: string,
): Promise<ScoringTerm[]> {
  const { data } = await client
    .from("content_editor_terms")
    .select("term, relevance_score, min_recommended_uses, max_recommended_uses, is_primary_keyword, user_included, user_blacklisted")
    .eq("editor_id", editorId);
  return ((data as ScoringTerm[]) ?? []).map((t) => ({
    term: t.term,
    relevance_score: t.relevance_score,
    min_recommended_uses: t.min_recommended_uses,
    max_recommended_uses: t.max_recommended_uses,
    is_primary_keyword: t.is_primary_keyword,
    user_included: t.user_included,
    user_blacklisted: t.user_blacklisted,
  }));
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 4 — Structural benchmark
// ═════════════════════════════════════════════════════════════════════

async function phase4_structuralBenchmark(
  client: SupabaseClient,
  editor: ContentEditorRow,
  competitors: CompetitorRow[],
): Promise<void> {
  // Short-circuit if already computed.
  if (editor.recommended_word_count_min != null) return;

  await setStatus(client, editor.id, "computing_guidelines", "Computing structural targets…");

  const wordCounts = competitors.map((c) => c.word_count ?? 0).filter((w) => w > 300);
  const h2 = competitors.map((c) => c.h2_count ?? 0);
  const h3 = competitors.map((c) => c.h3_count ?? 0);
  const para = competitors.map((c) => c.paragraph_count ?? 0);
  const img = competitors.map((c) => c.image_count ?? 0);

  const update = {
    recommended_word_count_min: Math.round(percentile(wordCounts, 0.25)),
    recommended_word_count_max: Math.round(percentile(wordCounts, 0.75)),
    recommended_word_count_target: Math.round(percentile(wordCounts, 0.6)),
    recommended_h2_min: Math.round(percentile(h2, 0.25)),
    recommended_h2_max: Math.round(percentile(h2, 0.75)),
    recommended_h3_min: Math.round(percentile(h3, 0.25)),
    recommended_h3_max: Math.round(percentile(h3, 0.75)),
    recommended_image_min: Math.round(percentile(img, 0.25)),
    recommended_image_max: Math.round(percentile(img, 0.75)),
    recommended_paragraph_count_min: Math.round(percentile(para, 0.25)),
    recommended_paragraph_count_max: Math.round(percentile(para, 0.75)),
    updated_at: new Date().toISOString(),
  };

  await client.from("content_editors").update(update).eq("id", editor.id);
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 5 — Outline synthesis
// ═════════════════════════════════════════════════════════════════════

async function phase5_outlineSynthesis(
  client: SupabaseClient,
  editor: ContentEditorRow,
  competitors: CompetitorRow[],
): Promise<void> {
  const { count } = await client
    .from("content_editor_outlines")
    .select("id", { count: "exact", head: true })
    .eq("editor_id", editor.id);
  if ((count ?? 0) > 0) return;

  await setStatus(client, editor.id, "computing_guidelines", "Synthesizing optimal outline…");

  const competitorHeadings = competitors
    .filter((c) => c.headings && c.headings.length > 0)
    .map((c) => ({
      domain: c.domain,
      headings: (c.headings ?? []).slice(0, 25), // cap to prevent huge prompts
    }));

  if (!competitorHeadings.length) return; // nothing to synthesize from

  const targetWord = editor.recommended_word_count_target ?? 2000;

  const prompt = buildOutlinePrompt({
    primaryKeyword: editor.primary_keyword,
    targetWordCount: targetWord,
    competitorHeadings,
  });

  const result = await callClaude<OutlineResponse>({
    model: "sonnet",
    userPrompt: prompt,
    expectJson: true,
    maxTokens: 4000,
    temperature: 0.4,
  });
  await addCost(client, editor.id, result.cost_usd);

  const outline = result.data.data.outline ?? [];
  if (!outline.length) return;

  const rows = outline.map((section, idx) => ({
    editor_id: editor.id,
    heading_level: section.level === 3 ? 3 : 2,
    heading_text: section.text.slice(0, 500),
    position: idx,
    source: "ai_synthesized" as const,
    recommended_word_count: Math.max(50, Math.min(500, section.estimated_words || 200)),
  }));

  await client.from("content_editor_outlines").insert(rows);
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 6 — Question synthesis
// ═════════════════════════════════════════════════════════════════════

async function phase6_questionSynthesis(
  client: SupabaseClient,
  editor: ContentEditorRow,
  competitors: CompetitorRow[],
): Promise<void> {
  // Load existing questions (PAA was inserted in phase 1).
  const { data: existing } = await client
    .from("content_editor_questions")
    .select("question, source")
    .eq("editor_id", editor.id);
  const existingQuestions = ((existing ?? []) as Array<{ question: string; source: string }>);

  // Short-circuit if LLM-synthesized questions already exist.
  if (existingQuestions.some((q) => q.source === "llm_synthesized")) return;

  // Extract question-like headings from competitors.
  const headingQuestions: Array<{ question: string; source: "h2" | "h3"; position: number }> = [];
  for (const c of competitors) {
    if (!c.headings) continue;
    for (const h of c.headings) {
      if (looksLikeQuestion(h.text)) {
        const cleaned = h.text.trim();
        headingQuestions.push({
          question: cleaned,
          source: h.level === 3 ? "h3" : "h2",
          position: h.position,
        });
      }
    }
  }

  // Dedup heading questions case-insensitively against existing + self.
  const seen = new Set(existingQuestions.map((q) => q.question.toLowerCase()));
  const newHeadingRows: Array<{
    editor_id: string;
    question: string;
    source: "h2" | "h3";
    recommended_position: number;
  }> = [];
  for (const hq of headingQuestions) {
    const key = hq.question.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    newHeadingRows.push({
      editor_id: editor.id,
      question: hq.question,
      source: hq.source,
      recommended_position: hq.position,
    });
  }

  if (newHeadingRows.length > 0) {
    await client.from("content_editor_questions").insert(newHeadingRows);
  }

  // Synthesize 5-10 new questions with Claude.
  const allKnown = [...existingQuestions.map((q) => q.question), ...newHeadingRows.map((q) => q.question)];
  const prompt = buildQuestionSynthesisPrompt({
    primaryKeyword: editor.primary_keyword,
    existingQuestions: allKnown,
  });
  const result = await callClaude<QuestionResponse>({
    model: "sonnet",
    userPrompt: prompt,
    expectJson: true,
    maxTokens: 1500,
    temperature: 0.5,
  });
  await addCost(client, editor.id, result.cost_usd);

  const synthesized = (result.data.data.questions ?? [])
    .filter((q) => typeof q === "string" && q.trim().length > 0)
    .filter((q) => !seen.has(q.toLowerCase()))
    .slice(0, 10);

  if (synthesized.length > 0) {
    const rows = synthesized.map((q) => ({
      editor_id: editor.id,
      question: q.trim(),
      source: "llm_synthesized" as const,
    }));
    await client.from("content_editor_questions").insert(rows);
  }
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 7 — Fact extraction (with embedding dedup)
// ═════════════════════════════════════════════════════════════════════

async function phase7_factsExtraction(
  client: SupabaseClient,
  editor: ContentEditorRow,
  competitors: CompetitorRow[],
): Promise<void> {
  const { count } = await client
    .from("content_editor_facts")
    .select("id", { count: "exact", head: true })
    .eq("editor_id", editor.id);
  if ((count ?? 0) > 0) return;

  await setStatus(client, editor.id, "extracting_facts", "Extracting facts from competitor pages…");

  interface RawFact {
    text: string;
    topic: string;
    importance: number;
    source_url: string;
    source_domain: string;
    source_position: number;
  }
  const allFacts: RawFact[] = [];

  for (let i = 0; i < competitors.length; i += FACT_EXTRACTION_CONCURRENCY) {
    const chunk = competitors.slice(i, i + FACT_EXTRACTION_CONCURRENCY);
    const results = await Promise.allSettled(
      chunk.map(async (c) => {
        if (!c.cleaned_text || c.cleaned_text.length < 500) return [];
        const prompt = buildFactExtractionPrompt({
          primaryKeyword: editor.primary_keyword,
          competitorText: c.cleaned_text,
        });
        const out = await callClaude<FactsResponse>({
          model: "haiku",
          userPrompt: prompt,
          expectJson: true,
          maxTokens: 3000,
          temperature: 0.1,
        });
        await addCost(client, editor.id, out.cost_usd);
        return (out.data.data.facts ?? []).map((f): RawFact => ({
          text: f.text,
          topic: f.topic ?? "General",
          importance: typeof f.importance === "number" ? f.importance : 50,
          source_url: c.url,
          source_domain: c.domain,
          source_position: c.serp_position,
        }));
      }),
    );

    for (const r of results) {
      if (r.status === "fulfilled" && Array.isArray(r.value)) {
        allFacts.push(...r.value);
      }
    }
  }

  if (allFacts.length === 0) return;

  // Embed all facts in batches, then cluster by cosine sim > 0.85.
  const embedResult = await embedTexts(allFacts.map((f) => f.text));
  await addCost(client, editor.id, embedResult.cost_usd);
  const embeddings = embedResult.data.embeddings;

  interface FactCluster {
    representative: RawFact;
    representativeEmbedding: number[];
    members: RawFact[];
    sourceDomains: Set<string>;
  }
  const clusters: FactCluster[] = [];

  for (let i = 0; i < allFacts.length; i++) {
    const f = allFacts[i];
    const emb = embeddings[i];
    let matched = false;
    for (const cluster of clusters) {
      if (cosineSimilarity(emb, cluster.representativeEmbedding) > FACT_DEDUP_SIMILARITY_THRESHOLD) {
        cluster.members.push(f);
        cluster.sourceDomains.add(f.source_domain);
        // Promote the more-important fact to representative.
        if (f.importance > cluster.representative.importance) {
          cluster.representative = f;
          cluster.representativeEmbedding = emb;
        }
        matched = true;
        break;
      }
    }
    if (!matched) {
      clusters.push({
        representative: f,
        representativeEmbedding: emb,
        members: [f],
        sourceDomains: new Set([f.source_domain]),
      });
    }
  }

  // Rank clusters: importance × source_count weighting.
  clusters.sort((a, b) => {
    const aScore = a.representative.importance + a.sourceDomains.size * 8;
    const bScore = b.representative.importance + b.sourceDomains.size * 8;
    return bScore - aScore;
  });

  // Take top N facts.
  const topClusters = clusters.slice(0, Math.max(TARGET_FACT_COUNT, 25));

  // Format vector(1536) as a Postgres array literal for insert.
  const formatVector = (vec: number[]): string => `[${vec.join(",")}]`;

  const rows = topClusters.map((cluster) => {
    const rep = cluster.representative;
    const repEmb = cluster.representativeEmbedding;
    return {
      editor_id: editor.id,
      fact_text: rep.text.slice(0, 1000),
      source_url: rep.source_url,
      source_domain: rep.source_domain,
      source_position: rep.source_position,
      source_count: cluster.sourceDomains.size,
      embedding: formatVector(repEmb),
      topic_cluster: rep.topic.slice(0, 100),
      importance_score: Math.min(100, Math.max(1, rep.importance)),
    };
  });

  await client.from("content_editor_facts").insert(rows);
}

// ═════════════════════════════════════════════════════════════════════
//  Phase 8 — Score each competitor + derive target score
// ═════════════════════════════════════════════════════════════════════

async function phase8_competitorScoring(
  client: SupabaseClient,
  editor: ContentEditorRow,
  competitors: CompetitorRow[],
  terms: ScoringTerm[],
): Promise<void> {
  if (editor.target_score != null) return;

  const benchmark = competitors.filter(
    (c) => c.included_in_benchmark && c.cleaned_text && c.cleaned_text.length > 0,
  );

  const competitorScores: number[] = [];
  for (const c of benchmark) {
    const breakdown = scoreDocument(
      {
        body: c.cleaned_text ?? "",
        titleTag: c.title,
        h1Text: c.h1_text,
        metaDescription: c.meta_description,
        earlyHeadings: (c.headings ?? []).slice(0, 3).map((h) => h.text),
      },
      terms,
      editor.primary_keyword,
    );
    competitorScores.push(breakdown.content_score);
    await client
      .from("content_editor_competitors")
      .update({ individual_content_score: breakdown.content_score })
      .eq("id", c.id);
  }

  const { avgCompetitorScore, targetScore } = computeTargetScore(competitorScores);

  await client
    .from("content_editors")
    .update({
      competitor_avg_score: avgCompetitorScore,
      target_score: targetScore,
      updated_at: new Date().toISOString(),
    })
    .eq("id", editor.id);
}

// ═════════════════════════════════════════════════════════════════════
//  Lifecycle markers
// ═════════════════════════════════════════════════════════════════════

async function markReady(client: SupabaseClient, editorId: string): Promise<void> {
  await client
    .from("content_editors")
    .update({
      status: "ready",
      status_message: null,
      error: null,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", editorId);
}

async function markFailed(
  client: SupabaseClient,
  editorId: string,
  err: unknown,
): Promise<void> {
  const message = err instanceof Error ? err.message : String(err);
  await client
    .from("content_editors")
    .update({
      status: "failed",
      error: message.slice(0, 2000),
      updated_at: new Date().toISOString(),
    })
    .eq("id", editorId);
}
