/**
 * Live page fetch + scoring for Content Editor "Page Mode".
 *
 * Fetches the public production URL for a tracked_page, strips it to
 * plaintext + extracts headings, runs the same `scoreDocument()` engine
 * used for blog drafts, and persists a row to `tracked_page_live_snapshots`
 * for caching + history.
 *
 * The snapshot is keyed by (tracked_page_id, scored_against_editor_id) —
 * we keep the most recent snapshot per editor so users can see how the
 * page changed across re-scans. App-side TTL is 1 hour; the user can
 * force a re-fetch via the "Refetch live page" button in the brief view.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor, type ContentEditorRow } from "./db";
import { scoreDocument, type DraftDocument, type ScoringTerm, type ScoringQuestion, type StructuralTargets } from "./scoring";

const DEFAULT_TTL_SECONDS = 60 * 60; // 1 hour
const FETCH_TIMEOUT_MS = 30_000;
const FETCH_USER_AGENT =
  "Mozilla/5.0 (compatible; SweetMediaContentEditor/1.0; +https://sweetmediaservices.com)";

export interface TrackedPageLiveSnapshot {
  id: string;
  tracked_page_id: string;
  fetched_at: string;
  status_code: number | null;
  url: string;
  plaintext: string | null;
  headings: Array<{ level: number; text: string }> | null;
  word_count: number | null;
  computed_content_score: number | null;
  computed_coverage_score: number | null;
  computed_frequency_score: number | null;
  computed_placement_score: number | null;
  computed_seo_score: number | null;
  computed_eeat_score: number | null;
  fetch_error: string | null;
  scored_against_editor_id: string | null;
}

export interface FetchAndScoreLivePageOptions {
  trackedPageId: string;
  editorId: string;
  /** If true, ignore the TTL and re-fetch the live page regardless of cache. */
  force?: boolean;
  /** Snapshot TTL in seconds; default 1 hour. */
  ttlSeconds?: number;
}

interface TrackedPageRow {
  id: string;
  route_path: string;
}

interface SnapshotResult {
  snapshot: TrackedPageLiveSnapshot;
  cached: boolean;
}

// ── Site URL resolution ────────────────────────────────────────────────

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    throw new ContentEditorError(
      "NEXT_PUBLIC_SITE_URL is not configured — cannot fetch live page.",
      { source: "pipeline", status: 500 },
    );
  }
  return raw.replace(/\/+$/, "");
}

function buildPageUrl(routePath: string): string {
  const site = resolveSiteUrl();
  const path = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${site}${path === "/" ? "" : path}`;
}

// ── HTML → plaintext + headings ────────────────────────────────────────

/**
 * Conservative HTML stripper: removes script/style/noscript blocks and
 * tags, decodes the common entities, collapses whitespace. Headings are
 * extracted with their level so downstream scoring can match per-term
 * heading flags.
 */
function stripToPlaintext(html: string): {
  plaintext: string;
  headings: Array<{ level: number; text: string }>;
} {
  if (!html) return { plaintext: "", headings: [] };

  // Drop non-visible chunks before anything else.
  let cleaned = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<header\b[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ");

  // Try to extract just the <main> region if present (Next.js apps wrap
  // page content in either <main> or a top-level <body>).
  const mainMatch = cleaned.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) cleaned = mainMatch[1];

  // Extract headings while content still has tags.
  const headings: Array<{ level: number; text: string }> = [];
  const headingRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(cleaned)) !== null) {
    const level = Number(m[1]);
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    if (text) headings.push({ level, text });
  }

  // Insert line breaks for block-level elements so word splitting is correct.
  cleaned = cleaned
    .replace(/<\/?(p|div|li|ul|ol|section|article|aside|h[1-6]|br|tr|table)\b[^>]*>/gi, "\n");

  // Strip remaining tags.
  cleaned = cleaned.replace(/<[^>]+>/g, " ");

  // Decode entities and collapse whitespace.
  const decoded = decodeEntities(cleaned);
  const plaintext = decoded.replace(/[ \t\u00A0]+/g, " ").replace(/\n{2,}/g, "\n\n").trim();

  return { plaintext, headings };
}

const HTML_ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&rsquo;": "\u2019",
  "&lsquo;": "\u2018",
  "&rdquo;": "\u201D",
  "&ldquo;": "\u201C",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&(amp|lt|gt|quot|apos|#39|nbsp|mdash|ndash|hellip|rsquo|lsquo|rdquo|ldquo);/g, (m) => HTML_ENTITY_MAP[m] ?? m)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

// ── Title / meta extraction ────────────────────────────────────────────

function extractTitleTag(html: string): string | null {
  const m = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  const t = decodeEntities(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return t || null;
}

function extractMetaDescription(html: string): string | null {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  if (!m) return null;
  return decodeEntities(m[1]).trim() || null;
}

function extractH1(html: string): string | null {
  const m = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  const t = decodeEntities(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return t || null;
}

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Get the most recent snapshot for (trackedPageId, editorId) — or null if
 * none exists or it's expired.
 */
async function loadLatestSnapshot(
  client: SupabaseClient,
  trackedPageId: string,
  editorId: string,
  ttlSeconds: number,
): Promise<TrackedPageLiveSnapshot | null> {
  const { data } = await client
    .from("tracked_page_live_snapshots")
    .select("*")
    .eq("tracked_page_id", trackedPageId)
    .eq("scored_against_editor_id", editorId)
    .order("fetched_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  const row = data as TrackedPageLiveSnapshot;
  const ageMs = Date.now() - new Date(row.fetched_at).getTime();
  if (ageMs > ttlSeconds * 1000) return null;
  return row;
}

/**
 * Fetch the live page (or return cache), strip to plaintext, score
 * against the editor's terms, persist a snapshot, and return it.
 *
 * Throws ContentEditorError on hard failures (editor not found, no
 * tracked page link, missing site URL). Soft failures (4xx/5xx, network
 * timeout, empty HTML) are persisted as a snapshot with fetch_error set
 * so the UI can surface them.
 */
export async function fetchAndScoreLivePage(
  opts: FetchAndScoreLivePageOptions,
): Promise<SnapshotResult> {
  const ttlSeconds = opts.ttlSeconds ?? DEFAULT_TTL_SECONDS;
  const client = getAdminClient();

  const editor = await loadEditor(client, opts.editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }

  const { data: pageData } = await client
    .from("tracked_pages")
    .select("id, route_path")
    .eq("id", opts.trackedPageId)
    .maybeSingle();
  const page = pageData as TrackedPageRow | null;
  if (!page) {
    throw new ContentEditorError("Tracked page not found.", { source: "api", status: 404 });
  }

  if (!opts.force) {
    const cached = await loadLatestSnapshot(client, page.id, editor.id, ttlSeconds);
    if (cached) return { snapshot: cached, cached: true };
  }

  const url = buildPageUrl(page.route_path);
  const snapshot = await fetchScoreAndPersist(client, editor, page, url);
  return { snapshot, cached: false };
}

async function fetchScoreAndPersist(
  client: SupabaseClient,
  editor: ContentEditorRow,
  page: TrackedPageRow,
  url: string,
): Promise<TrackedPageLiveSnapshot> {
  let html = "";
  let statusCode: number | null = null;
  let fetchError: string | null = null;

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": FETCH_USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: ctrl.signal,
      redirect: "follow",
      cache: "no-store",
    });
    clearTimeout(timer);
    statusCode = res.status;
    if (!res.ok) {
      fetchError = `HTTP ${res.status} fetching ${url}`;
    } else {
      html = await res.text();
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err);
  }

  // Empty / failed fetch → persist a placeholder snapshot with the error.
  if (!html.trim()) {
    return persistSnapshot(client, {
      tracked_page_id: page.id,
      url,
      status_code: statusCode,
      fetch_error: fetchError ?? "Empty response body.",
      plaintext: null,
      headings: null,
      word_count: null,
      computed_content_score: null,
      computed_coverage_score: null,
      computed_frequency_score: null,
      computed_placement_score: null,
      computed_seo_score: null,
      computed_eeat_score: null,
      scored_against_editor_id: editor.id,
    });
  }

  const titleTag = extractTitleTag(html);
  const metaDescription = extractMetaDescription(html);
  const h1Text = extractH1(html);
  const { plaintext, headings } = stripToPlaintext(html);
  const wordCount = plaintext ? plaintext.split(/\s+/).filter(Boolean).length : 0;

  // Load editor terms + questions for scoring.
  const [termsRes, questionsRes] = await Promise.all([
    client
      .from("content_editor_terms")
      .select("term, relevance_score, min_recommended_uses, max_recommended_uses, is_primary_keyword, user_included, user_blacklisted")
      .eq("editor_id", editor.id),
    client
      .from("content_editor_questions")
      .select("id, question, user_dismissed")
      .eq("editor_id", editor.id),
  ]);

  const terms: ScoringTerm[] = ((termsRes.data ?? []) as ScoringTerm[]).map((t) => ({
    term: t.term,
    relevance_score: t.relevance_score,
    min_recommended_uses: t.min_recommended_uses,
    max_recommended_uses: t.max_recommended_uses,
    is_primary_keyword: t.is_primary_keyword,
    user_included: t.user_included,
    user_blacklisted: t.user_blacklisted,
  }));
  const questions: ScoringQuestion[] = ((questionsRes.data ?? []) as ScoringQuestion[]).map((q) => ({
    id: q.id,
    question: q.question,
    user_dismissed: q.user_dismissed,
  }));

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

  const headingTexts = headings.map((h) => h.text);
  const doc: DraftDocument = {
    body: plaintext,
    titleTag,
    h1Text,
    metaDescription,
    earlyHeadings: headingTexts.slice(0, 3),
    allHeadings: headingTexts,
    bodyMarkdown: null,
  };

  const breakdown = scoreDocument(doc, terms, editor.primary_keyword, {
    structuralTargets,
    questions,
  });

  return persistSnapshot(client, {
    tracked_page_id: page.id,
    url,
    status_code: statusCode,
    fetch_error: null,
    plaintext,
    headings,
    word_count: wordCount,
    computed_content_score: breakdown.content_score,
    computed_coverage_score: breakdown.coverage_score,
    computed_frequency_score: breakdown.frequency_score,
    computed_placement_score: breakdown.placement_score,
    computed_seo_score: breakdown.seo_score ?? null,
    computed_eeat_score: breakdown.eeat_score,
    scored_against_editor_id: editor.id,
  });
}

interface SnapshotInsert {
  tracked_page_id: string;
  url: string;
  status_code: number | null;
  fetch_error: string | null;
  plaintext: string | null;
  headings: Array<{ level: number; text: string }> | null;
  word_count: number | null;
  computed_content_score: number | null;
  computed_coverage_score: number | null;
  computed_frequency_score: number | null;
  computed_placement_score: number | null;
  computed_seo_score: number | null;
  computed_eeat_score: number | null;
  scored_against_editor_id: string | null;
}

async function persistSnapshot(
  client: SupabaseClient,
  row: SnapshotInsert,
): Promise<TrackedPageLiveSnapshot> {
  const { data, error } = await client
    .from("tracked_page_live_snapshots")
    .insert(row)
    .select("*")
    .single();
  if (error || !data) {
    throw new ContentEditorError(
      `Failed to persist live snapshot: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as TrackedPageLiveSnapshot;
}

/**
 * Score an arbitrary URL against an editor's brief WITHOUT writing to
 * `tracked_page_live_snapshots`. Used by ai_optimize_runs to score the
 * Vercel preview deployment of an in-flight PR so admins see the
 * projected content score before merging.
 *
 * Returns `null` for word_count + content_score when the page fetch
 * fails — the caller decides whether to surface the error or treat it
 * as transient.
 */
export interface ScoreUrlResult {
  content_score: number | null;
  coverage_score: number | null;
  frequency_score: number | null;
  placement_score: number | null;
  seo_score: number | null;
  eeat_score: number | null;
  word_count: number | null;
  status_code: number | null;
  fetch_error: string | null;
}

export async function scoreUrlAgainstEditor(opts: {
  url: string;
  editorId: string;
}): Promise<ScoreUrlResult> {
  const client = getAdminClient();
  const editor = await loadEditor(client, opts.editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }

  let html = "";
  let statusCode: number | null = null;
  let fetchError: string | null = null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(opts.url, {
      method: "GET",
      headers: {
        "User-Agent": FETCH_USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: ctrl.signal,
      redirect: "follow",
      cache: "no-store",
    });
    clearTimeout(timer);
    statusCode = res.status;
    if (!res.ok) {
      fetchError = `HTTP ${res.status} fetching ${opts.url}`;
    } else {
      html = await res.text();
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err);
  }

  if (!html.trim()) {
    return {
      content_score: null,
      coverage_score: null,
      frequency_score: null,
      placement_score: null,
      seo_score: null,
      eeat_score: null,
      word_count: null,
      status_code: statusCode,
      fetch_error: fetchError ?? "Empty response body.",
    };
  }

  const titleTag = extractTitleTag(html);
  const metaDescription = extractMetaDescription(html);
  const h1Text = extractH1(html);
  const { plaintext, headings } = stripToPlaintext(html);
  const wordCount = plaintext ? plaintext.split(/\s+/).filter(Boolean).length : 0;

  const [termsRes, questionsRes] = await Promise.all([
    client
      .from("content_editor_terms")
      .select(
        "term, relevance_score, min_recommended_uses, max_recommended_uses, is_primary_keyword, user_included, user_blacklisted",
      )
      .eq("editor_id", editor.id),
    client
      .from("content_editor_questions")
      .select("id, question, user_dismissed")
      .eq("editor_id", editor.id),
  ]);

  const terms: ScoringTerm[] = ((termsRes.data ?? []) as ScoringTerm[]).map((t) => ({
    term: t.term,
    relevance_score: t.relevance_score,
    min_recommended_uses: t.min_recommended_uses,
    max_recommended_uses: t.max_recommended_uses,
    is_primary_keyword: t.is_primary_keyword,
    user_included: t.user_included,
    user_blacklisted: t.user_blacklisted,
  }));
  const questions: ScoringQuestion[] = ((questionsRes.data ?? []) as ScoringQuestion[]).map(
    (q) => ({
      id: q.id,
      question: q.question,
      user_dismissed: q.user_dismissed,
    }),
  );

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

  const headingTexts = headings.map((h) => h.text);
  const doc: DraftDocument = {
    body: plaintext,
    titleTag,
    h1Text,
    metaDescription,
    earlyHeadings: headingTexts.slice(0, 3),
    allHeadings: headingTexts,
    bodyMarkdown: null,
  };

  const breakdown = scoreDocument(doc, terms, editor.primary_keyword, {
    structuralTargets,
    questions,
  });

  return {
    content_score: breakdown.content_score ?? null,
    coverage_score: breakdown.coverage_score ?? null,
    frequency_score: breakdown.frequency_score ?? null,
    placement_score: breakdown.placement_score ?? null,
    seo_score: breakdown.seo_score ?? null,
    eeat_score: breakdown.eeat_score ?? null,
    word_count: wordCount,
    status_code: statusCode,
    fetch_error: null,
  };
}

/**
 * Convenience: load the most recent snapshot for the editor regardless of
 * TTL (used by the brief page to render the last-known state immediately
 * while a fresh fetch runs in the background).
 */
export async function loadLatestSnapshotIgnoreTtl(
  trackedPageId: string,
  editorId: string,
): Promise<TrackedPageLiveSnapshot | null> {
  const client = getAdminClient();
  const { data } = await client
    .from("tracked_page_live_snapshots")
    .select("*")
    .eq("tracked_page_id", trackedPageId)
    .eq("scored_against_editor_id", editorId)
    .order("fetched_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as TrackedPageLiveSnapshot | null) ?? null;
}
