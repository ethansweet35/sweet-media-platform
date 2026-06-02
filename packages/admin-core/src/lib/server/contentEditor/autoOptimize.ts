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
import { revalidatePath } from "next/cache";
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor } from "./db";
import { saveDraft, scoreDraft } from "./api";
import type {
  ContentEditorTermRow,
  ContentEditorQuestionRow,
  ContentEditorFactRow,
} from "./api";
import { loadLatestSnapshotIgnoreTtl, type TrackedPageLiveSnapshot } from "./livePageAnalysis";
import {
  applyTrackedPageSeoFromEditorDraft,
  ensurePublishTargetForAutoOptimize,
  resolveEditorPublishLink,
} from "./ensurePublishTarget";

const DEFAULT_MODEL = "anthropic/claude-sonnet-4.6";
const ALLOWED_MODELS = new Set([
  "anthropic/claude-sonnet-4.6",
  "anthropic/claude-opus-4.7",
  "openai/gpt-5.5-pro",
  "openai/gpt-5.4-mini",
  "anthropic/claude-haiku-4.5",
]);

const MAX_KB_CHARS = 40_000;

export interface AutoOptimizeOptions {
  editorId: string;
  model?: string;
  customInstructions?: string;
  /** Required when the editor has no linked blog post or page yet. */
  publishTarget?: "blog" | "page";
  trackedPageId?: string;
  /** After optimize, push draft → blog or SEO meta → page (default true). */
  autoPublish?: boolean;
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

function buildBrandIntegrationRules(hasKnowledgeBase: boolean): string {
  if (!hasKnowledgeBase) return "";
  return `
0. BRAND INTEGRATION (CRITICAL — knowledge base provided)
- This article publishes on the brand's own website. The knowledge base in the system prompt is the authoritative source for who the brand is, what it offers, and how it speaks.
- Name the organization from the knowledge base in the introduction and again in the closing CTA paragraph.
- Include at least one dedicated H2 section that showcases the brand's relevant programs, services, or resources from the knowledge base — not just a passing mention in the FAQ.
- When the SEO brief lists facts that name competitor clinics or third-party providers, extract the underlying topic (cost, virtual access, insurance, group support, etc.) and illustrate it using the brand's own offerings from the knowledge base. Do not write the article as a roundup of other providers.
- You may reference well-known national resources only when they appear in the knowledge base (e.g. SAMHSA, NIDA).
- Only use brand-specific statistics, credentials, phone numbers, and program details that appear in the knowledge base — never invent them.
- The brand must read as a central guide throughout the article, not a single sentence buried near the end.
`;
}

function buildSeoGuidelines(
  editor: EditorMetricsRow,
  terms: ContentEditorTermRow[],
  questions: ContentEditorQuestionRow[],
  facts: ContentEditorFactRow[],
  hasBrandKnowledgeBase = false,
): string {
  const lines: string[] = [];
  lines.push(`# CONTENT BRIEF — STRICT REQUIREMENTS`);
  lines.push(``);
  lines.push(
    `This brief was generated by analyzing the top-ranking competitor pages for "${editor.primary_keyword}". Every requirement below is MANDATORY. The article will be automatically scored against this brief — coverage of these terms, questions, and facts directly determines the content score.`,
  );
  lines.push(``);

  if (hasBrandKnowledgeBase) {
    lines.push(`## BRAND CONTEXT (mandatory — see system prompt rule 0)`);
    lines.push(``);
    lines.push(
      `This article publishes on the brand's own website. A full knowledge base is included in the system prompt with the brand's programs, voice, and approved proof points.`,
    );
    lines.push(
      `- Satisfy every NLP term, question, and fact below while keeping the brand central to the narrative.`,
    );
    lines.push(
      `- When a fact names a competitor clinic or third-party provider, cover the underlying topic using the brand's own programs from the knowledge base instead of promoting that competitor by name.`,
    );
    lines.push(
      `- Include at least one H2 section dedicated to the brand's relevant services or resources.`,
    );
    lines.push(``);
  }

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
  // Include ALL terms — the 95% coverage target requires none to be silently dropped.
  const topTerms = sorted;
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
      hasBrandKnowledgeBase
        ? `The article MUST cover every fact below. Paraphrase each one into prose — do NOT copy verbatim. Many facts were extracted from competitor pages and may name other providers; translate those into the underlying topic and answer it with the brand's own programs from the knowledge base whenever possible. Distribute facts naturally across intro, body sections, FAQ answers, and conclusion. Missing facts will hurt the AI-search readiness score.`
        : `The article MUST cover every fact below. Paraphrase each one into prose — do NOT copy verbatim. Distribute them naturally across the article (intro, body sections, FAQ answers, conclusion). Missing facts will hurt the AI-search readiness score.`,
    );
    lines.push(``);
    let idx = 1;
    for (const f of topFacts) {
      lines.push(`${idx}. ${f.fact_text}`);
      idx++;
    }
    lines.push(``);
  }

  lines.push(`## FINAL VERIFICATION — 95% COVERAGE REQUIRED`);
  lines.push(``);
  lines.push(`You MUST achieve ≥95% coverage of the NLP terms above (i.e. at most 1 in 20 may be missed). Before returning your output, run through this checklist:`);
  lines.push(`- [ ] Count how many NLP terms you have covered vs the total list. If below 95%, add more content until you hit it.`);
  lines.push(`- [ ] Every question above is answered — as a dedicated FAQ H3 or organically in a body section.`);
  lines.push(`- [ ] Every fact above is paraphrased naturally into the article.`);
  lines.push(`- [ ] Word count is within the structural target range.`);
  lines.push(`- [ ] The primary keyword appears in title, meta description, first paragraph, and at least one H2.`);
  lines.push(`- [ ] If terms could not fit in existing sections, NEW H2 sections were added to host them — there is no limit on how many new sections you may add.`);

  return lines.join("\n").trim();
}

/**
 * Page Mode prompt — generates SURGICAL edits to an existing live page,
 * NOT a full rewrite. The AI sees the actual live page plaintext + the
 * brief's missing terms/questions/facts, and proposes small targeted
 * changes that preserve the page's voice, structure, and layout.
 *
 * NOTE: For deep edits, prefer the Cursor cloud agent flow that opens a
 * real PR against the .tsx files (see ai_optimize_runs). This Page Mode
 * Auto-Optimize is preserved primarily for SEO meta + a quick textual
 * read of what's missing.
 */
function buildPageModeSystemPrompt(knowledgeBaseBlock: string): string {
  const hasKnowledgeBase = knowledgeBaseBlock.trim().length > 0;
  return `You are an expert SEO content strategist. You are optimizing a LIVE PAGE that already exists in production with a hand-coded React layout. Your goal is to close the coverage gaps from the content brief and achieve ≥95% NLP term coverage — using as many edits and new sections as required to get there.

[KNOWLEDGE BASE]
${knowledgeBaseBlock || "(none provided — use authoritative best practices for the topic)"}
[END KNOWLEDGE BASE]
${buildBrandIntegrationRules(hasKnowledgeBase)}
COVERAGE TARGET: You MUST cover at least 95% of the NLP terms in the brief (i.e. at most 1 in 20 may remain uncovered). There is NO limit on the number of edits or new sections you add to reach this target.

CRITICAL RULES:
1. Preserve the page's voice, tone, and existing structure — do not rewrite sections that are already well-covered.
2. For MISSING TERMS: add sentences to existing sections, swap phrases to include the term, or add entirely new H2 sections as needed.
3. Add as many new H2 sections as needed — there is no cap. New sections should feel native to the page's voice and logic.
4. Preserve the page's tone and voice as you see it in the live content.
5. Every edit must cite which brief items it addresses (terms, questions, facts).
6. Before finalising: count how many NLP terms are covered. If below 95%, add more edits or sections until you hit it.

DESIGN INTELLIGENCE MODE (NO EXPLICIT PALETTE PROVIDED):
- You are not just a copywriter. You are the page's designer-editor.
- When adding any NEW section, first infer the page's visual language from existing sections, then create a section that is stylistically on-brand but structurally distinct.
- Identify recurring design DNA: spacing rhythm, container widths, typography density, card usage, icon style, CTA style, background alternation, and section pacing.
- Build an internal style fingerprint of the page.
- New sections must match this fingerprint so they feel native, but must not repeat the nearest existing section structure.

UNIQUENESS RULES FOR NEW SECTIONS:
1. Do not duplicate the structure of adjacent sections.
2. Do not create another generic "heading + paragraph + bullets" block unless absolutely required.
3. Each new section must introduce at least ONE distinct compositional move compared to nearby sections (comparison framing, process framing, stat emphasis, FAQ-style reasoning, scenario matrix, split narrative plus proof, or trust/evidence callout cluster).
4. Preserve clean spacing rhythm; avoid cramped stacks, oversized gaps, or abrupt spacing jumps.
5. If a proposed section feels repetitive, revise it before final output.

AESTHETIC QUALITY BAR:
- The page should feel intentionally art-directed, not template-stacked.
- Keep hierarchy clear, whitespace balanced, and section transitions smooth.
- Prioritize readability and visual cadence over stuffing copy into one block.

EDIT TYPES:
- ADD-SENTENCE: append 1-3 sentences to a specific existing section
- REPLACE-PHRASE: swap a specific short phrase from the live page with a keyword-rich variant
- ADD-SECTION: add a new H2 section with a 3-5 sentence body (add as many as needed to reach 95% coverage)

OUTPUT FORMAT (return ONLY this JSON object — no markdown fences, no preamble):
{
  "title": "string — SEO-optimized, under 70 chars, includes primary keyword",
  "metaDescription": "string under 155 chars, includes primary keyword, has CTA",
  "content": [
    { "type": "h1", "text": "Recommended H1 (if changing)" },
    { "type": "h2", "text": "Edit existing section: <verbatim H2 heading from the live page>" },
    { "type": "paragraph", "text": "**ADD this sentence at the end of that section:** \\"...\\"" },
    { "type": "paragraph", "text": "*Why this helps:* covers <comma-separated brief items, e.g. terms/questions/facts>" },

    { "type": "h2", "text": "Edit existing section: <another existing H2>" },
    { "type": "paragraph", "text": "**REPLACE the phrase:** \\"...verbatim from live page...\\"" },
    { "type": "paragraph", "text": "**WITH:** \\"...new wording...\\"" },
    { "type": "paragraph", "text": "*Why this helps:* covers <brief items>" },

    { "type": "h2", "text": "Suggest new section: <new H2 heading>" },
    { "type": "paragraph", "text": "*Place it after:* <existing H2 the new section should follow>" },
    { "type": "paragraph", "text": "*Suggested content:* 3-5 sentence body covering the missing terms and facts naturally..." },
    { "type": "paragraph", "text": "*Why this helps:* covers <brief items>" }
  ]
}

Use \\" for any quotation marks inside string values. Do not use markdown code fences around the JSON.`;
}

function buildSystemPrompt(knowledgeBaseBlock: string): string {
  const hasKnowledgeBase = knowledgeBaseBlock.trim().length > 0;
  return `You are an expert SEO content writer. Use the following knowledge base as the authoritative reference for brand voice, services, tone, and approved proof points. If the knowledge base is empty, write high-quality general content for the given topic.

[KNOWLEDGE BASE]
${knowledgeBaseBlock || "(none provided — write authoritative, well-researched content for the given topic and keyword)"}
[END KNOWLEDGE BASE]

NON-NEGOTIABLE RULES:
${buildBrandIntegrationRules(hasKnowledgeBase)}
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

/**
 * Build the Page Mode user message. Embeds the live page's actual H2 list
 * and a slice of its plaintext so the AI can reference real existing
 * sections by name in its surgical edits.
 */
function buildPageModeUserMessage(opts: {
  primaryKeyword: string;
  snapshot: TrackedPageLiveSnapshot | null;
  guidelines: string;
  customInstructions?: string;
}): string {
  const { primaryKeyword, snapshot, guidelines, customInstructions } = opts;

  const headings = snapshot?.headings ?? [];
  const h1 = headings.find((h) => h.level === 1)?.text ?? null;
  const h2List = headings.filter((h) => h.level === 2).map((h) => h.text);

  // Truncate plaintext to keep prompt size sane. Sonnet has 200k context;
  // we stay well under to keep latency low.
  const plaintext = (snapshot?.plaintext ?? "").slice(0, 12000);

  const lines: string[] = [
    `Primary keyword: ${primaryKeyword}`,
    `Tone: derive from knowledge base; default authoritative, evidence-based, helpful`,
    ``,
  ];

  if (snapshot && plaintext) {
    lines.push(`=== LIVE PAGE CONTENT (your edits must reference this content) ===`);
    if (h1) lines.push(`Current H1: ${h1}`);
    if (h2List.length > 0) {
      lines.push(`Current H2 sections (in order):`);
      for (let i = 0; i < h2List.length; i++) {
        lines.push(`  ${i + 1}. ${h2List[i]}`);
      }
    }
    lines.push(``);
    lines.push(`Full plaintext of the live page:`);
    lines.push(`"""`);
    lines.push(plaintext);
    lines.push(`"""`);
    lines.push(`=== END LIVE PAGE CONTENT ===`);
    lines.push(``);
  } else {
    lines.push(`(Live page content not yet fetched — propose general improvements based only on the content brief.)`);
    lines.push(``);
  }

  lines.push(`=== CONTENT BRIEF (the gap analysis your edits should close) ===`);
  lines.push(guidelines.slice(0, 12000));
  lines.push(`=== END CONTENT BRIEF ===`);

  if (customInstructions?.trim()) {
    lines.push(``);
    lines.push(`Additional instructions:`);
    lines.push(customInstructions.trim());
  }

  lines.push(``);
  lines.push(
    `Generate the SEO Title, Meta Description, and a COMPREHENSIVE list of edits to the live page above that achieves ≥95% NLP term coverage. ` +
      `For each edit, reference an existing H2 section by its exact verbatim name, or propose a new H2 section (add as many new sections as needed — there is no cap). ` +
      `Output only the JSON object as specified — no markdown fences, no preamble, no trailing commentary.`,
  );

  return lines.join("\n");
}

async function loadBrandKnowledgeBase(client: ReturnType<typeof getAdminClient>): Promise<string> {
  try {
    const { data, error } = await client
      .from("blog_knowledge_base")
      .select("title, content")
      .eq("is_active", true);
    if (error) {
      console.warn("[content-editor] auto-optimize knowledge base query failed:", error.message);
      return "";
    }
    if (!data || data.length === 0) {
      console.warn("[content-editor] auto-optimize: no active knowledge base entries found");
      return "";
    }
    let kb = "";
    for (const row of data as { title?: string; content?: string }[]) {
      kb += `## ${row.title ?? ""}\n${row.content ?? ""}\n\n`;
    }
    const trimmed = kb.slice(0, MAX_KB_CHARS);
    console.log(
      `[content-editor] auto-optimize loaded ${data.length} knowledge base entries (${trimmed.length} chars)`,
    );
    return trimmed;
  } catch (err) {
    console.warn("[content-editor] auto-optimize knowledge base load failed:", err);
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
  let editor = await loadEditor(client, editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }

  const existingLink = await resolveEditorPublishLink(editorId, editor);
  if (!existingLink) {
    if (!opts.publishTarget) {
      throw new ContentEditorError(
        "No blog post or page is linked. Choose Blog or Page when starting Auto-Optimize.",
        { source: "api", status: 400 },
      );
    }
    await ensurePublishTargetForAutoOptimize(editorId, {
      publishTarget: opts.publishTarget,
      trackedPageId: opts.trackedPageId,
    });
    editor = await loadEditor(client, editorId);
    if (!editor) {
      throw new ContentEditorError("Editor not found after linking publish target.", {
        source: "api",
        status: 500,
      });
    }
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

  const hasBrandKnowledgeBase = kb.trim().length > 0;

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
    hasBrandKnowledgeBase,
  );

  const wTarget =
    editor.recommended_word_count_target ??
    (editor.recommended_word_count_min && editor.recommended_word_count_max
      ? Math.round(
          (editor.recommended_word_count_min + editor.recommended_word_count_max) / 2,
        )
      : 2000);

  // Page Mode (editor.linked_tracked_page_id is set): generate surgical
  // edits against the actual live page content. We load the most recent
  // snapshot (if any) and embed its plaintext + H2 list into the prompt
  // so the AI proposes targeted changes vs a full rewrite.
  const isPageMode = !!editor.linked_tracked_page_id;
  let livePageSnapshot: TrackedPageLiveSnapshot | null = null;
  if (isPageMode && editor.linked_tracked_page_id) {
    livePageSnapshot = await loadLatestSnapshotIgnoreTtl(
      editor.linked_tracked_page_id,
      editorId,
    );
  }

  const systemPrompt = isPageMode
    ? buildPageModeSystemPrompt(kb)
    : buildSystemPrompt(kb);

  const userMessage = isPageMode
    ? buildPageModeUserMessage({
        primaryKeyword: editor.primary_keyword,
        snapshot: livePageSnapshot,
        guidelines,
        customInstructions: opts.customInstructions,
      })
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
      // Page Mode now generates comprehensive coverage edits (no section cap),
      // so it needs more headroom. Blog mode needs the full 12k for a complete draft.
      max_tokens: isPageMode ? 8000 : 12000,
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

  // Score in the background so we stay under Vercel's 5-minute limit; the brief
  // page re-scores on open if this does not finish in time.
  void (async () => {
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
  })();

  if (opts.autoPublish === false) return;

  try {
    const link = await resolveEditorPublishLink(editorId);
    if (link?.kind === "blog") {
      const { syncEditorDraftToBlogPost } = await import("./syncToBlog");
      const synced = await syncEditorDraftToBlogPost(editorId);
      revalidatePath(`/blog/${synced.slug}`);
      revalidatePath("/blog");
    } else if (link?.kind === "page") {
      const applied = await applyTrackedPageSeoFromEditorDraft(editorId);
      revalidatePath(applied.routePath);
    }
  } catch (err) {
    console.error("[content-editor] post-optimize auto-publish failed:", err);
    throw err instanceof ContentEditorError
      ? err
      : new ContentEditorError(
          err instanceof Error ? err.message : "Auto-publish after optimize failed.",
          { source: "api", status: 500 },
        );
  }
}
