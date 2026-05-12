/**
 * Server-only Sweet SEO analyzer.
 *
 * Generates a content brief for a given keyword by:
 *   1. Inserting (or updating) a row in `public.seo_briefs` with `status='processing'`.
 *   2. Calling OpenRouter with a web-search-capable model (default Perplexity Sonar Pro)
 *      to analyze the top-ranking pages and return a strict JSON brief.
 *   3. Persisting the parsed brief (or the error) back to the row.
 *
 * Reads `OPENROUTER_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, and
 * `SUPABASE_SERVICE_ROLE_KEY` from process env. All three are required.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  ALLOWED_SEO_BRIEF_MODELS,
  DEFAULT_SEO_BRIEF_MODEL,
  type SeoBriefCitation,
  type SeoBriefFactGroup,
  type SeoBriefRow,
  type SeoBriefStructure,
  type SeoBriefTerm,
} from "../../types/seo-brief";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export class SweetSeoError extends Error {
  status: number;
  detail?: unknown;
  constructor(message: string, status: number, detail?: unknown) {
    super(message);
    this.name = "SweetSeoError";
    this.status = status;
    this.detail = detail;
  }
}

function getAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new SweetSeoError(
      "Supabase service-role configuration is missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
      500,
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function resolveModel(raw: unknown): string {
  if (typeof raw !== "string" || !raw.trim()) return DEFAULT_SEO_BRIEF_MODEL;
  const cleaned = raw.trim();
  return ALLOWED_SEO_BRIEF_MODELS.has(cleaned) ? cleaned : DEFAULT_SEO_BRIEF_MODEL;
}

function stripCodeFences(raw: string): string {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
  return s;
}

function extractFirstJsonObject(raw: string): string {
  const start = raw.indexOf("{");
  if (start === -1) return raw;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < raw.length; i++) {
    const ch = raw[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return raw.slice(start, i + 1);
    }
  }
  return raw.slice(start);
}

function asInt(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value);
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(n)) return Math.round(n);
  }
  return fallback;
}

function asIntOrNull(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && /^(infinity|inf|none|null|\u221E)$/i.test(value.trim())) {
    return null;
  }
  return asInt(value, 0);
}

function asStringArray(value: unknown, max = 60): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : null))
    .filter((v): v is string => !!v && v.length > 0)
    .slice(0, max);
}

function normalizeStructure(value: unknown): SeoBriefStructure | null {
  if (!value || typeof value !== "object") return null;
  const s = value as Record<string, unknown>;
  const pick = (key: string): { min: unknown; max: unknown } | null => {
    const v = s[key];
    if (!v || typeof v !== "object") return null;
    const r = v as Record<string, unknown>;
    return { min: r.min, max: r.max };
  };
  const characters = pick("characters");
  const words = pick("words");
  const headings = pick("headings");
  const paragraphs = pick("paragraphs");
  const images = pick("images");
  if (!characters || !words || !headings || !paragraphs || !images) return null;
  return {
    characters: { min: asInt(characters.min), max: asInt(characters.max) },
    words: { min: asInt(words.min), max: asInt(words.max) },
    headings: { min: asInt(headings.min), max: asInt(headings.max) },
    paragraphs: { min: asInt(paragraphs.min), max: asIntOrNull(paragraphs.max) },
    images: { min: asInt(images.min), max: asInt(images.max) },
  };
}

function normalizeTerms(value: unknown): SeoBriefTerm[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const out: SeoBriefTerm[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const term = typeof r.term === "string" ? r.term.trim().toLowerCase() : "";
    if (!term || seen.has(term)) continue;
    seen.add(term);
    const min = Math.max(0, asInt(r.min, 1));
    let max = Math.max(min, asInt(r.max, min));
    if (max < min) max = min;
    out.push({ term, min, max });
    if (out.length >= 80) break;
  }
  return out;
}

function normalizeFacts(value: unknown): SeoBriefFactGroup[] {
  if (!Array.isArray(value)) return [];
  const out: SeoBriefFactGroup[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const topic = typeof r.topic === "string" ? r.topic.trim() : "";
    if (!topic) continue;
    const points = asStringArray(r.points, 8);
    if (!points.length) continue;
    out.push({ topic, points });
    if (out.length >= 10) break;
  }
  return out;
}

function normalizeCitations(value: unknown): SeoBriefCitation[] {
  if (!Array.isArray(value)) return [];
  const out: SeoBriefCitation[] = [];
  const seen = new Set<string>();
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const url = typeof r.url === "string" ? r.url.trim() : "";
    const title = typeof r.title === "string" ? r.title.trim() : url;
    if (!url || seen.has(url)) continue;
    if (!/^https?:\/\//i.test(url)) continue;
    seen.add(url);
    out.push({ url, title: title || url });
    if (out.length >= 20) break;
  }
  return out;
}

interface NormalizedBrief {
  content_structure: SeoBriefStructure | null;
  important_terms: SeoBriefTerm[];
  questions: string[];
  facts: SeoBriefFactGroup[];
  citations: SeoBriefCitation[];
}

function normalizePayload(parsed: Record<string, unknown>): NormalizedBrief {
  return {
    content_structure: normalizeStructure(parsed.content_structure),
    important_terms: normalizeTerms(parsed.important_terms),
    questions: asStringArray(parsed.questions, 8),
    facts: normalizeFacts(parsed.facts),
    citations: normalizeCitations(parsed.citations),
  };
}

const SYSTEM_PROMPT = `You are an SEO research analyst. For a given keyword, you analyze the top-ranking pages on Google (US) and produce a content brief that, if followed, would help a new article outrank them.

Your output MUST be a single JSON object — no markdown fences, no preamble, no trailing commentary.

JSON schema:
{
  "content_structure": {
    "characters": { "min": int, "max": int },
    "images":     { "min": int, "max": int },
    "headings":   { "min": int, "max": int },
    "paragraphs": { "min": int, "max": int | null },
    "words":      { "min": int, "max": int }
  },
  "important_terms": [
    { "term": "string (lowercase)", "min": int, "max": int }
  ],
  "questions": ["question text", ...],
  "facts": [
    { "topic": "Title-Cased Topic", "points": ["specific fact 1", "specific fact 2"] }
  ],
  "citations": [
    { "url": "https://...", "title": "Page title" }
  ]
}

Method:
1. Search Google US for the keyword. Examine the top 10 organic results (skip ads, video carousels, AI overviews).
2. For each page, estimate or measure: word count, character count (incl. spaces), heading count (H1+H2+H3), image count, and paragraph count. Report min/max ranges across the corpus in "content_structure".
3. Build "important_terms" as the NLP keywords/phrases that appear across multiple top pages. Include the primary keyword first, then 25–50 supporting terms ordered by relevance. Mix 1-word, 2-word, and 3-word phrases. "min" = lowest observed count among pages that use it; "max" = highest observed count (or a sensible upper bound).
4. "questions": 3–5 questions Google surfaces in People-Also-Ask or "Related questions" for this keyword.
5. "facts": 4–7 topical groups. Each topic must have 2–4 specific, verifiable facts a writer should include — write them as complete sentences (not headlines).
6. "citations": the URLs of the top sources you analyzed.

Constraints:
- All counts are integers >= 0. "paragraphs.max" may be null when the corpus has no consistent upper bound.
- Terms must be lowercase, deduplicated, and free of trailing punctuation.
- Do not include the JSON schema in your output. Output ONLY the populated JSON object.`;

function buildUserPrompt(keyword: string, country: string): string {
  return [
    `Keyword: "${keyword}"`,
    `Search market: Google ${country.toUpperCase()}`,
    "",
    "Produce the content brief JSON now. Output only the JSON object.",
  ].join("\n");
}

/**
 * Call OpenRouter with the configured model and parse the brief JSON.
 * Throws SweetSeoError on bad input, model error, or unparseable response.
 */
async function callOpenRouter(
  keyword: string,
  country: string,
  model: string,
): Promise<{ parsed: NormalizedBrief; raw: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new SweetSeoError("OPENROUTER_API_KEY is not configured.", 500);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sweetmediaservices.com";
  const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim() || "admin";

  const body = {
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(keyword, country) },
    ],
    temperature: 0.2,
    max_tokens: 8000,
  };

  let res: Response;
  try {
    res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": `${siteId} - Sweet SEO`,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new SweetSeoError(
      `OpenRouter request failed: ${err instanceof Error ? err.message : String(err)}`,
      502,
    );
  }

  const text = await res.text();
  if (!res.ok) {
    throw new SweetSeoError(
      `OpenRouter responded ${res.status}: ${text.slice(0, 400)}`,
      502,
      text,
    );
  }

  let envelope: Record<string, unknown>;
  try {
    envelope = JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new SweetSeoError("OpenRouter returned non-JSON envelope.", 502, text.slice(0, 400));
  }

  const choices = envelope.choices as unknown;
  const firstChoice = Array.isArray(choices) ? (choices[0] as Record<string, unknown>) : null;
  const message = firstChoice?.message as Record<string, unknown> | undefined;
  const content = typeof message?.content === "string" ? message.content : "";
  if (!content.trim()) {
    throw new SweetSeoError(
      "Model returned an empty completion (likely hit content filter or token limit).",
      502,
      envelope,
    );
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(stripCodeFences(content)) as Record<string, unknown>;
  } catch {
    try {
      parsed = JSON.parse(extractFirstJsonObject(stripCodeFences(content))) as Record<
        string,
        unknown
      >;
    } catch {
      throw new SweetSeoError("Failed to parse JSON from model response.", 502, content.slice(0, 800));
    }
  }

  return { parsed: normalizePayload(parsed), raw: content };
}

interface AnalyzeOptions {
  keyword: string;
  country?: string;
  model?: string;
  briefId?: string;
  createdBy?: string;
}

/**
 * Start (or re-run) analysis for a keyword. Returns the brief row in its final
 * state (`ready` on success, `error` on failure). Awaits the model call inline.
 */
export async function analyzeKeyword(opts: AnalyzeOptions): Promise<SeoBriefRow> {
  const keyword = opts.keyword.trim();
  if (!keyword) throw new SweetSeoError("keyword is required.", 400);
  const country = (opts.country || "US").trim().slice(0, 4).toUpperCase() || "US";
  const model = resolveModel(opts.model);
  const admin = getAdminClient();

  // 1) Upsert the row in `processing` state.
  let briefId = opts.briefId ?? null;
  if (briefId) {
    const { error } = await admin
      .from("seo_briefs")
      .update({
        keyword,
        country,
        status: "processing",
        model,
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", briefId);
    if (error) {
      throw new SweetSeoError(`Failed to mark brief as processing: ${error.message}`, 500);
    }
  } else {
    const insertPayload: Record<string, unknown> = {
      keyword,
      country,
      status: "processing",
      model,
    };
    if (opts.createdBy) insertPayload.created_by = opts.createdBy;
    const { data, error } = await admin
      .from("seo_briefs")
      .insert(insertPayload)
      .select("id")
      .single();
    if (error || !data?.id) {
      throw new SweetSeoError(`Failed to create brief: ${error?.message ?? "unknown error"}`, 500);
    }
    briefId = data.id as string;
  }

  // 2) Call the model.
  try {
    const { parsed } = await callOpenRouter(keyword, country, model);

    const update: Record<string, unknown> = {
      status: "ready",
      content_structure: parsed.content_structure,
      important_terms: parsed.important_terms,
      questions: parsed.questions,
      facts: parsed.facts,
      citations: parsed.citations,
      error_message: null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await admin
      .from("seo_briefs")
      .update(update)
      .eq("id", briefId)
      .select("*")
      .single();
    if (error || !data) {
      throw new SweetSeoError(`Failed to save brief: ${error?.message ?? "no row"}`, 500);
    }
    return data as SeoBriefRow;
  } catch (err) {
    const message =
      err instanceof SweetSeoError
        ? err.message
        : err instanceof Error
          ? err.message
          : String(err);
    await admin
      .from("seo_briefs")
      .update({
        status: "error",
        error_message: message.slice(0, 2000),
        updated_at: new Date().toISOString(),
      })
      .eq("id", briefId);
    throw err instanceof SweetSeoError
      ? err
      : new SweetSeoError(message, 500);
  }
}

/** Get a single brief by id (server-side, service role bypasses RLS). */
export async function getBrief(id: string): Promise<SeoBriefRow | null> {
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("seo_briefs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new SweetSeoError(error.message, 500);
  return (data as SeoBriefRow | null) ?? null;
}

/** Delete a brief by id. */
export async function deleteBrief(id: string): Promise<void> {
  const admin = getAdminClient();
  const { error } = await admin.from("seo_briefs").delete().eq("id", id);
  if (error) throw new SweetSeoError(error.message, 500);
}
