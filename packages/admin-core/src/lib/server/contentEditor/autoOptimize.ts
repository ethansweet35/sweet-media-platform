/**
 * Server-side Auto-Optimize for the Content Editor.
 *
 * Generates an AI-written draft that satisfies the content brief and
 * persists it to `content_editor_drafts`. This must run server-side so the
 * result is preserved if the user navigates away from the brief page mid-run.
 *
 * Flow:
 *   1. Load editor + terms + questions + facts + current draft
 *   2. Mark editor as `optimize_status='optimizing'` (in-memory only — the
 *      client uses sessionStorage + draft id polling to detect completion)
 *   3. Build the SEO guidelines markdown block
 *   4. Fetch brand knowledge base (if any)
 *   5. Call OpenRouter (Claude Sonnet 4.6 by default)
 *   6. Parse → convert blocks to markdown → upsert new draft
 *
 * On failure the existing draft is left untouched so the user doesn't lose
 * their work.
 */
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor } from "./db";
import { saveDraft, scoreDraft } from "./api";
import type {
  ContentEditorTermRow,
  ContentEditorQuestionRow,
  ContentEditorFactRow,
} from "./api";

const DEFAULT_MODEL = "anthropic/claude-sonnet-4.6";
const ALLOWED_MODELS = new Set([
  "anthropic/claude-sonnet-4.6",
  "anthropic/claude-opus-4.7",
  "openai/gpt-5.5-pro",
  "openai/gpt-5.4-mini",
  "google/gemini-pro-latest",
]);

const MAX_KB_CHARS = 40_000;

export interface AutoOptimizeOptions {
  editorId: string;
  model?: string;
  customInstructions?: string;
}

interface BlockShape {
  type: string;
  text?: string;
  items?: string[];
  variant?: string;
  stats?: { value: string; label: string }[];
  tableHeaders?: string[];
  tableRows?: string[][];
}

interface OpenRouterChoice {
  message?: { content?: string };
}
interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: { message?: string };
}

function stripCodeFences(raw: string): string {
  return raw
    .trim()
    .replace(/^```(?:json|JSON)?\s*\n?/, "")
    .replace(/\n?```\s*$/, "")
    .trim();
}

function repairJson(s: string): string {
  let t = s.trim();
  const start = t.indexOf("{");
  if (start === -1) return t;
  t = t.slice(start);
  let depth = 0;
  let end = -1;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '"') {
      i++;
      while (i < t.length) {
        if (t[i] === "\\" && i + 1 < t.length) {
          i += 2;
          continue;
        }
        if (t[i] === '"') break;
        i++;
      }
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end !== -1) return t.slice(0, end + 1);
  const need = Math.max(0, (t.match(/\{/g) ?? []).length - (t.match(/\}/g) ?? []).length);
  return need > 0 ? t + "}".repeat(need) : t;
}

function normalizeBlocks(content: unknown): BlockShape[] {
  if (!Array.isArray(content)) return [];
  return content
    .map((block): BlockShape | null => {
      if (!block || typeof block !== "object") return null;
      const b = block as Record<string, unknown>;
      if (typeof b.type !== "string") return null;
      const shape = b as unknown as BlockShape;
      if (shape.type === "callout" && shape.variant === "info") {
        return { ...shape, variant: "insight" };
      }
      return shape;
    })
    .filter((b): b is BlockShape => b !== null);
}

function blocksToMarkdown(blocks: BlockShape[]): string {
  const parts: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "h1": parts.push(`# ${b.text ?? ""}\n`); break;
      case "h2": parts.push(`## ${b.text ?? ""}\n`); break;
      case "h3": parts.push(`### ${b.text ?? ""}\n`); break;
      case "h4": parts.push(`#### ${b.text ?? ""}\n`); break;
      case "paragraph": parts.push(`${b.text ?? ""}\n`); break;
      case "pullquote": parts.push(`> ${b.text ?? ""}\n`); break;
      case "callout":
        parts.push(`> **${b.variant ? b.variant.toUpperCase() + ": " : ""}**${b.text ?? ""}\n`);
        break;
      case "divider": parts.push(`---\n`); break;
      case "list":
        if (b.items?.length) parts.push(b.items.map((i) => `- ${i}`).join("\n") + "\n");
        break;
      case "numbered":
        if (b.items?.length) parts.push(b.items.map((i, idx) => `${idx + 1}. ${i}`).join("\n") + "\n");
        break;
      case "stat-row":
        if (b.stats?.length) {
          parts.push(b.stats.map((s) => `**${s.value}** — ${s.label}`).join(" | ") + "\n");
        }
        break;
      case "table":
        if (b.tableHeaders?.length) {
          parts.push("| " + b.tableHeaders.join(" | ") + " |");
          parts.push("|" + b.tableHeaders.map(() => " --- ").join("|") + "|");
          for (const row of b.tableRows ?? []) {
            parts.push("| " + row.join(" | ") + " |");
          }
          parts.push("");
        }
        break;
    }
  }
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

interface EditorMetricsRow {
  primary_keyword: string;
  recommended_word_count_min: number | null;
  recommended_word_count_max: number | null;
  recommended_word_count_target: number | null;
  recommended_h2_min: number | null;
  recommended_h2_max: number | null;
  recommended_h3_min: number | null;
  recommended_h3_max: number | null;
}

function buildSeoGuidelines(
  editor: EditorMetricsRow,
  terms: ContentEditorTermRow[],
  questions: ContentEditorQuestionRow[],
  facts: ContentEditorFactRow[],
): string {
  const lines: string[] = [];
  lines.push(`# CONTENT BRIEF — STRICT REQUIREMENTS`);
  lines.push(``);
  lines.push(
    `This brief was generated by analyzing the top-ranking competitor pages for "${editor.primary_keyword}". Every requirement below is MANDATORY. The article will be automatically scored against this brief — coverage of these terms, questions, and facts directly determines the content score.`,
  );
  lines.push(``);

  const wMin = editor.recommended_word_count_min;
  const wMax = editor.recommended_word_count_max;
  const wTarget =
    editor.recommended_word_count_target ??
    (wMin && wMax ? Math.round((wMin + wMax) / 2) : null);
  if (wTarget) {
    lines.push(`## STRUCTURAL TARGETS (mandatory)`);
    lines.push(`- Word count: ${wMin ?? "?"}–${wMax ?? "?"} words. Aim for ~${wTarget}.`);
    if (editor.recommended_h2_min || editor.recommended_h2_max) {
      lines.push(
        `- H2 headings: ${editor.recommended_h2_min ?? "?"}–${editor.recommended_h2_max ?? "?"}`,
      );
    }
    if (editor.recommended_h3_min || editor.recommended_h3_max) {
      lines.push(
        `- H3 headings: ${editor.recommended_h3_min ?? "?"}–${editor.recommended_h3_max ?? "?"}`,
      );
    }
    lines.push(``);
  }

  const sorted = [...terms]
    .filter((t) => !t.user_blacklisted)
    .sort((a, b) => (b.relevance_score ?? 0) - (a.relevance_score ?? 0));
  const topTerms = sorted.slice(0, 50);
  if (topTerms.length) {
    lines.push(`## NLP TERMS — USE EVERY ONE OF THESE (mandatory)`);
    lines.push(``);
    lines.push(
      `Each term below MUST appear in the article at least the minimum number of times listed. The minimum is calibrated against what competitors do — falling short on any term will hurt the content score.`,
    );
    lines.push(``);
    lines.push(`Treat this as a checklist. Before finishing, verify every term is used at least its minimum count.`);
    lines.push(``);
    let idx = 1;
    for (const t of topTerms) {
      const minU = t.min_recommended_uses ?? 1;
      const maxU = t.max_recommended_uses ?? minU * 2;
      const headingNote = t.is_heading_recommended ? " — USE AS A HEADING" : "";
      lines.push(`${idx}. "${t.term}" → use ${minU}–${maxU} times${headingNote}`);
      idx++;
    }
    lines.push(``);
  }

  const activeQuestions = questions.filter((q) => !q.user_dismissed).slice(0, 15);
  if (activeQuestions.length) {
    lines.push(`## QUESTIONS — ANSWER EVERY ONE OF THESE (mandatory)`);
    lines.push(``);
    lines.push(
      `The article MUST answer every question below — either as a dedicated H3 in the FAQ section near the end, or organically in body sections. Use the question text directly as the heading.`,
    );
    lines.push(``);
    let idx = 1;
    for (const q of activeQuestions) {
      lines.push(`${idx}. ${q.question}`);
      idx++;
    }
    lines.push(``);
  }

  const topFacts = facts.filter((f) => !f.user_dismissed).slice(0, 20);
  if (topFacts.length) {
    lines.push(`## FACTS — INCORPORATE EVERY ONE OF THESE (mandatory)`);
    lines.push(``);
    lines.push(
      `The article MUST cover every fact below. Paraphrase each one into prose — do NOT copy verbatim. Distribute them naturally across the article (intro, body sections, FAQ answers, conclusion). Missing facts will hurt the AI-search readiness score.`,
    );
    lines.push(``);
    let idx = 1;
    for (const f of topFacts) {
      lines.push(`${idx}. ${f.fact_text}`);
      idx++;
    }
    lines.push(``);
  }

  lines.push(`## FINAL VERIFICATION`);
  lines.push(``);
  lines.push(`Before returning your output, mentally check off this list:`);
  lines.push(`- [ ] Every NLP term above appears at least its minimum count`);
  lines.push(`- [ ] Every question above is answered in the article`);
  lines.push(`- [ ] Every fact above is paraphrased into the article`);
  lines.push(`- [ ] Word count is within the structural target range`);
  lines.push(`- [ ] The primary keyword appears in title, meta description, first paragraph, and at least one H2`);

  return lines.join("\n").trim();
}

/**
 * Lightweight Page Mode prompt — generates only Title/Meta/H1 + a
 * recommended outline (H2 list with 1-2 sentence summaries), NOT a
 * full 2000-word body. Pages have hand-coded React layouts so a long
 * body is never auto-applied; the outline is what the user actually
 * needs to optimize their existing page.
 *
 * Output is ~500-1500 tokens (vs ~6000-12000 for full blog mode).
 * Runs in ~30-60s instead of ~2-4min — well within Vercel's 5min limit.
 */
function buildPageModeSystemPrompt(knowledgeBaseBlock: string): string {
  return `You are an expert SEO content strategist generating optimization recommendations for a LIVE PAGE that already exists in production. You're NOT writing a new blog post — you're suggesting targeted improvements to an existing page that has hand-coded React layout.

[KNOWLEDGE BASE]
${knowledgeBaseBlock || "(none provided — use authoritative best practices for the given topic)"}
[END KNOWLEDGE BASE]

YOUR JOB:
1. Generate a better SEO title (under 70 chars, includes primary keyword)
2. Generate a better meta description (under 155 chars, includes primary keyword)
3. Recommend a better H1 for the page
4. Recommend an outline of H2 sections this page should cover (5-9 headings, each with 1-2 sentence summary of what that section should discuss)

DO NOT generate full body paragraphs, FAQs, or long copy. The user will hand-port the outline into their existing page layout. Keep summaries terse and actionable (1-2 sentences each, no rambling).

The brief lists MUST-COVER terms, questions, and facts. Use these to inform which H2 sections are most important. Every H2 should connect to high-priority terms or questions from the brief.

OUTPUT FORMAT (return ONLY this JSON, no markdown fences, no preamble):
{
  "title": "string — SEO-optimized, under 70 chars, includes primary keyword",
  "metaDescription": "string under 155 chars, includes primary keyword, has CTA",
  "content": [
    { "type": "h1", "text": "Recommended H1" },
    { "type": "h2", "text": "First H2 heading" },
    { "type": "paragraph", "text": "1-2 sentence summary of what this section should cover, referencing 2-3 key terms from the brief." },
    { "type": "h2", "text": "Second H2 heading" },
    { "type": "paragraph", "text": "Summary..." }
  ]
}`;
}

function buildSystemPrompt(knowledgeBaseBlock: string): string {
  return `You are an expert SEO content writer. Use the following knowledge base as the authoritative reference for brand voice, services, tone, and approved proof points. If the knowledge base is empty, write high-quality general content for the given topic.

[KNOWLEDGE BASE]
${knowledgeBaseBlock || "(none provided — write authoritative, well-researched content for the given topic and keyword)"}
[END KNOWLEDGE BASE]

NON-NEGOTIABLE RULES:

1. CONTENT QUALITY
- Do not fabricate statistics, case studies, or credentials. Only use facts that are well-established or sourced.
- Never provide advice that could constitute legal, medical, or financial guidance unless the knowledge base authorizes it.
- Write in the brand voice described in the knowledge base. If none, default to authoritative, helpful, and clear.

2. FORMATTING
- Do not use bold text in body content.
- Use lists sparingly (3–7 items max). Most sections should be prose.
- Reserve tables for comparing options, strategies, or metrics.
- Use pullquotes only for genuinely insightful key takeaways.

3. STRUCTURE
- Open with a strong 2+ paragraph introduction naming the problem and previewing the solution.
- Use H2 sections to build a logical argument. Use H3 only when nested detail is needed under an H2.
- Include a FAQ section near the end with 4–6 realistic questions as H3 headings with paragraph answers.
- End with a closing CTA paragraph.

4. SEO
- The primary keyword must appear in the title, meta description, first paragraph, and at least one H2.
- Include 2–5 external links to credible, authoritative sources. Use descriptive anchor text via [anchor](https://url) markdown.
- Do NOT include internal links — those are added by a separate tool.

5. SEO BRIEF COMPLIANCE (CRITICAL — applies when a SEO BRIEF is provided in the user message)
- The SEO BRIEF is NOT optional guidance. It is a strict checklist generated by analyzing the top-ranking competitor pages, and your output is scored against it.
- You MUST use every NLP term listed in the brief at least the minimum number of times specified. Falling short on any term will hurt the content score.
- You MUST answer every question listed in the brief — either as a dedicated H3 in the FAQ section or organically in the body.
- You MUST cover every fact listed in the brief, paraphrased into prose (never copy verbatim). Distribute facts naturally across intro, body, and FAQ.
- Before finalizing your output, verify that every term, question, and fact from the brief is present. Treat the brief as a hard constraint, not a suggestion.

6. OUTPUT FORMAT
Output ONLY a valid JSON object conforming to this shape:
{
  "title": "string — SEO-optimized, includes primary keyword, under 70 chars",
  "excerpt": "string under 160 chars",
  "metaDescription": "string under 155 chars, includes primary keyword",
  "content": [
    { "type": "paragraph", "text": "..." },
    { "type": "h2", "text": "..." },
    { "type": "h3", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "numbered", "items": ["...", "..."] },
    { "type": "pullquote", "text": "..." },
    { "type": "callout", "text": "...", "variant": "warning|tip|insight" },
    { "type": "stat-row", "stats": [{ "value": "...", "label": "..." }] },
    { "type": "divider" },
    { "type": "table", "tableHeaders": ["..."], "tableRows": [["..."]] }
  ]
}
No markdown fences. No preamble. No trailing commentary.`;
}

async function loadBrandKnowledgeBase(client: ReturnType<typeof getAdminClient>): Promise<string> {
  try {
    const { data } = await client
      .from("blog_knowledge_base")
      .select("title, content")
      .eq("is_active", true);
    if (!data || data.length === 0) return "";
    let kb = "";
    for (const row of data as { title?: string; content?: string }[]) {
      kb += `## ${row.title ?? ""}\n${row.content ?? ""}\n\n`;
    }
    return kb.slice(0, MAX_KB_CHARS);
  } catch {
    return "";
  }
}

/**
 * Run the Auto-Optimize pipeline end-to-end and persist the result.
 *
 * Throws ContentEditorError on hard failures (missing config, OpenRouter
 * down, invalid response). The caller (Next.js route via `after()`) catches
 * these and logs; the editor's existing draft is preserved.
 */
export async function runAutoOptimize(opts: AutoOptimizeOptions): Promise<void> {
  const { editorId } = opts;
  if (!editorId) {
    throw new ContentEditorError("editorId is required.", { source: "api", status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new ContentEditorError("OPENROUTER_API_KEY is not configured.", {
      source: "openrouter",
      status: 500,
    });
  }

  const model = opts.model && ALLOWED_MODELS.has(opts.model) ? opts.model : DEFAULT_MODEL;

  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }

  // Load brief data in parallel.
  const [termsRes, questionsRes, factsRes, kb] = await Promise.all([
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
    loadBrandKnowledgeBase(client),
  ]);

  const terms = (termsRes.data ?? []) as ContentEditorTermRow[];
  const questions = (questionsRes.data ?? []) as ContentEditorQuestionRow[];
  const facts = (factsRes.data ?? []) as ContentEditorFactRow[];

  const guidelines = buildSeoGuidelines(
    {
      primary_keyword: editor.primary_keyword,
      recommended_word_count_min: editor.recommended_word_count_min,
      recommended_word_count_max: editor.recommended_word_count_max,
      recommended_word_count_target: editor.recommended_word_count_target,
      recommended_h2_min: editor.recommended_h2_min,
      recommended_h2_max: editor.recommended_h2_max,
      recommended_h3_min: editor.recommended_h3_min,
      recommended_h3_max: editor.recommended_h3_max,
    },
    terms,
    questions,
    facts,
  );

  const wTarget =
    editor.recommended_word_count_target ??
    (editor.recommended_word_count_min && editor.recommended_word_count_max
      ? Math.round(
          (editor.recommended_word_count_min + editor.recommended_word_count_max) / 2,
        )
      : 2000);

  // Page Mode (editor.linked_tracked_page_id is set): use the lightweight
  // prompt that generates Title/Meta/H1 + outline only. The user hand-ports
  // the outline into their existing React page layout — they don't need a
  // 24KB body draft they'll never paste in.
  const isPageMode = !!editor.linked_tracked_page_id;
  const systemPrompt = isPageMode
    ? buildPageModeSystemPrompt(kb)
    : buildSystemPrompt(kb);

  const userMessage = isPageMode
    ? [
        `Live page: optimization recommendations needed`,
        `Primary keyword: ${editor.primary_keyword}`,
        `Tone: derive from knowledge base; default authoritative + helpful`,
        ``,
        `=== CONTENT BRIEF (use to inform recommendations) ===`,
        guidelines.slice(0, 15000),
        `=== END CONTENT BRIEF ===`,
        opts.customInstructions
          ? `\nAdditional instructions:\n${opts.customInstructions.trim()}`
          : "",
        `\nGenerate the SEO Title, Meta Description, recommended H1, and an outline of recommended H2 sections (each with a 1-2 sentence summary). Output only the JSON object as specified.`,
      ]
        .filter(Boolean)
        .join("\n")
    : [
        `Topic: ${editor.primary_keyword}`,
        `Primary keyword: ${editor.primary_keyword}`,
        `Category: let AI decide based on topic`,
        `Tone: authoritative but compassionate, evidence-based`,
        `Target word count: ${wTarget}`,
        `Audience: derive from knowledge base, or default to general informed adult readers`,
        ``,
        `=== CONTENT BRIEF (MANDATORY — strict compliance required, see system prompt rule 5) ===`,
        guidelines.slice(0, 20000),
        `=== END CONTENT BRIEF ===`,
        opts.customInstructions
          ? `\nAdditional instructions:\n${opts.customInstructions.trim()}`
          : "",
        `\nGenerate the blog post now. Output only the JSON object as specified.`,
      ]
        .filter(Boolean)
        .join("\n");

  const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
      "X-Title": `${process.env.NEXT_PUBLIC_SITE_ID ?? "admin"} - Content Editor Auto-Optimize`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      // Page Mode generates ~500-1500 tokens; full blog mode needs much more.
      max_tokens: isPageMode ? 2500 : 12000,
      temperature: 0.4,
    }),
  });

  const orText = await orRes.text();
  if (!orRes.ok) {
    throw new ContentEditorError(
      `OpenRouter error (${orRes.status}): ${orText.slice(0, 400)}`,
      { source: "openrouter", status: 502 },
    );
  }

  let orJson: OpenRouterResponse;
  try {
    orJson = JSON.parse(orText) as OpenRouterResponse;
  } catch {
    throw new ContentEditorError(
      `OpenRouter returned non-JSON response: ${orText.slice(0, 300)}`,
      { source: "openrouter", status: 502 },
    );
  }

  const rawContent = orJson.choices?.[0]?.message?.content ?? "";
  if (!rawContent) {
    throw new ContentEditorError(
      `AI returned an empty response${orJson.error?.message ? `: ${orJson.error.message}` : ""}.`,
      { source: "openrouter", status: 502 },
    );
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(stripCodeFences(rawContent)) as Record<string, unknown>;
  } catch {
    try {
      parsed = JSON.parse(repairJson(stripCodeFences(rawContent))) as Record<string, unknown>;
    } catch {
      throw new ContentEditorError(
        `Failed to parse AI-generated JSON: ${rawContent.slice(0, 500)}`,
        { source: "openrouter", status: 502 },
      );
    }
  }

  const title = String(parsed.title ?? "").trim();
  const metaDescription = String(
    parsed.metaDescription ?? parsed.meta_description ?? "",
  ).trim();
  const blocks = normalizeBlocks(parsed.content);
  if (!title || blocks.length === 0) {
    throw new ContentEditorError("AI response missing title or content blocks.", {
      source: "openrouter",
      status: 502,
    });
  }

  // In Page Mode the AI emits a separate H1 block; use it as h1_text so the
  // PageModeRecommendations panel shows the recommended H1 alongside the
  // title. In Blog Mode the title doubles as the H1.
  let recommendedH1 = title;
  if (isPageMode) {
    const firstH1 = blocks.find((b) => b.type === "h1");
    if (firstH1?.text) recommendedH1 = firstH1.text.trim();
  }

  const bodyMarkdown = blocksToMarkdown(blocks);

  // Persist as the current draft (in-place update preserves draft history
  // semantics; saveDraft does upsert by is_current flag).
  await saveDraft({
    editorId,
    titleTag: title,
    metaDescription,
    h1Text: recommendedH1,
    bodyMarkdown,
    bodyPlaintext: bodyMarkdown,
  });

  // Immediately score the new draft so the list view shows a current score
  // without waiting for the user to open the brief page (which triggers
  // useLiveScore). Errors here are non-fatal — the user can score on open.
  // (Page Mode editors don't display draft scores in the list, but we still
  // score for the Recommendations panel's "If applied" projection.)
  try {
    const headings: string[] = [];
    for (const line of bodyMarkdown.split("\n")) {
      const m = line.match(/^#{1,6}\s+(.+?)\s*$/);
      if (m) headings.push(m[1].trim());
    }
    await scoreDraft({
      editorId,
      titleTag: title,
      metaDescription,
      h1Text: recommendedH1,
      bodyPlaintext: bodyMarkdown,
      bodyMarkdown,
      earlyHeadings: headings.slice(0, 3),
      allHeadings: headings,
      includeFactCoverage: false,
      persist: true,
    });
  } catch (err) {
    console.warn("[content-editor] post-optimize scoring failed (non-fatal):", err);
  }
}
