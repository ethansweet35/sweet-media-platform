/**
 * Server-side helpers for `ai_optimize_runs`.
 *
 * Each row represents a Cursor cloud-agent invocation that opens a PR
 * against the current tracked page's hand-coded React layout, applying
 * the content brief's terms/questions/facts inside the brand design
 * system (preserves components, tokens, typography).
 *
 * We use `@cursor/sdk` cloud runtime + `autoCreatePR: true` so the agent
 * commits + opens a PR with no extra plumbing on our side.
 *
 * Required environment variables:
 *   - CURSOR_API_KEY (server-side)
 *   - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (already required by other modules)
 *
 * Optional environment variables:
 *   - AI_OPTIMIZE_REPO_URL (defaults to the platform monorepo URL)
 *   - AI_OPTIMIZE_BASE_REF (defaults to "main")
 *   - AI_OPTIMIZE_MODEL_ID (defaults to "composer-2")
 *
 * Import from `@sweetmedia/admin-core/server`.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Agent, CursorAgentError } from "@cursor/sdk";
import { ContentEditorError } from "./contentEditor/errors";
import { loadEditor } from "./contentEditor/db";
import { scoreUrlAgainstEditor } from "./contentEditor/livePageAnalysis";

const DEFAULT_REPO_URL =
  process.env.AI_OPTIMIZE_REPO_URL?.trim() ||
  "https://github.com/ethansweet35/sweet-media-platform.git";
const DEFAULT_BASE_REF = process.env.AI_OPTIMIZE_BASE_REF?.trim() || "main";
const DEFAULT_MODEL_ID = process.env.AI_OPTIMIZE_MODEL_ID?.trim() || "composer-2";

export type AiOptimizeRunStatus =
  | "queued"
  | "running"
  | "pr_opened"
  | "merged"
  | "failed"
  | "cancelled";

export interface AiOptimizeRunRow {
  id: string;
  editor_id: string | null;
  tracked_page_id: string | null;
  cursor_agent_id: string | null;
  cursor_run_id: string | null;
  status: AiOptimizeRunStatus;
  status_message: string | null;
  pr_url: string | null;
  pr_number: number | null;
  branch_name: string | null;
  diff_summary: string | null;
  /** Vercel project id for the brand this run targets — needed to look up the preview deployment. */
  vercel_project_id: string | null;
  /** READY Vercel preview URL for the agent's PR (populated after PR opens). */
  preview_url: string | null;
  /** Content score the preview earned against the editor's brief. */
  preview_content_score: number | null;
  preview_word_count: number | null;
  preview_scored_at: string | null;
  preview_fetch_error: string | null;
  triggered_by_email: string | null;
  model_id: string | null;
  prompt: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

function getAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new ContentEditorError(
      "Supabase URL or service role key is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      { source: "api", status: 500 },
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getCursorApiKey(): string {
  const key = process.env.CURSOR_API_KEY?.trim();
  if (!key) {
    throw new ContentEditorError(
      "CURSOR_API_KEY is not configured. Add it in the Vercel project env vars (see https://cursor.com/dashboard/cloud-agents).",
      { source: "api", status: 500 },
    );
  }
  return key;
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Reads                                                                 */
/* ────────────────────────────────────────────────────────────────────── */

export async function listAiOptimizeRuns(opts: {
  editorId?: string | null;
  trackedPageId?: string | null;
  limit?: number;
}): Promise<AiOptimizeRunRow[]> {
  const adm = getAdminClient();
  let query = adm
    .from("ai_optimize_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? 20);
  if (opts.editorId) query = query.eq("editor_id", opts.editorId);
  if (opts.trackedPageId) query = query.eq("tracked_page_id", opts.trackedPageId);
  const { data, error } = await query;
  if (error) {
    throw new ContentEditorError(`Failed to load runs: ${error.message}`, {
      source: "api",
      status: 500,
    });
  }
  return (data ?? []) as AiOptimizeRunRow[];
}

export async function getAiOptimizeRun(id: string): Promise<AiOptimizeRunRow | null> {
  if (!id) return null;
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("ai_optimize_runs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load run: ${error.message}`, {
      source: "api",
      status: 500,
    });
  }
  return (data ?? null) as AiOptimizeRunRow | null;
}

/**
 * Return every public-facing route path that should be revalidated when
 * this editor's run state changes. Used by the API routes after trigger /
 * cancel / refresh so the <OptimizationStatusBanner/> on the live page
 * shows + hides immediately.
 *
 * Includes:
 *   - The tracked page's route_path (when the editor is linked to one)
 *   - Every published blog post's /blog/<slug> route that this editor authored
 */
export async function getRevalidationPathsForEditor(
  editorId: string,
): Promise<string[]> {
  if (!editorId) return [];
  const adm = getAdminClient();
  const paths = new Set<string>();

  // Tracked page (via the editor's linked_tracked_page_id).
  const { data: editorRow } = await adm
    .from("content_editors")
    .select("linked_tracked_page_id")
    .eq("id", editorId)
    .maybeSingle();
  const linkedTrackedPageId = (editorRow as { linked_tracked_page_id?: string | null } | null)
    ?.linked_tracked_page_id;
  if (linkedTrackedPageId) {
    const { data: pageRow } = await adm
      .from("tracked_pages")
      .select("route_path")
      .eq("id", linkedTrackedPageId)
      .maybeSingle();
    const path = (pageRow as { route_path?: string } | null)?.route_path;
    if (path) paths.add(path);
  }

  // Blog posts authored against this editor.
  const { data: posts } = await adm
    .from("blog_posts")
    .select("slug, status")
    .eq("content_editor_id", editorId);
  for (const p of (posts ?? []) as Array<{ slug: string; status: string | null }>) {
    if (!p.slug) continue;
    paths.add(`/blog/${p.slug}`);
  }

  return Array.from(paths);
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Prompt construction                                                   */
/* ────────────────────────────────────────────────────────────────────── */

interface BriefContext {
  primary_keyword: string;
  recommended_word_count_target: number | null;
  competitor_avg_score: number | null;
  target_score: number | null;
  terms: Array<{
    term: string;
    min_recommended_uses: number;
    max_recommended_uses: number;
    is_heading_recommended: boolean;
  }>;
  questions: string[];
  facts: string[];
}

async function loadBriefContext(
  client: SupabaseClient,
  editorId: string,
): Promise<BriefContext> {
  const editor = await loadEditor(client, editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }
  const [termsRes, questionsRes, factsRes] = await Promise.all([
    client
      .from("content_editor_terms")
      .select("term, min_recommended_uses, max_recommended_uses, is_heading_recommended, user_blacklisted, relevance_score")
      .eq("editor_id", editorId)
      .order("relevance_score", { ascending: false })
      .limit(150),
    client
      .from("content_editor_questions")
      .select("question, user_dismissed")
      .eq("editor_id", editorId)
      .order("recommended_position", { ascending: true, nullsFirst: true })
      .limit(15),
    client
      .from("content_editor_facts")
      .select("fact_text, user_dismissed, importance_score")
      .eq("editor_id", editorId)
      .order("importance_score", { ascending: false })
      .limit(20),
  ]);
  type TermLite = { term: string; min_recommended_uses: number; max_recommended_uses: number; is_heading_recommended: boolean; user_blacklisted: boolean };
  type QuestionLite = { question: string; user_dismissed: boolean };
  type FactLite = { fact_text: string; user_dismissed: boolean };
  const terms = ((termsRes.data ?? []) as TermLite[])
    .filter((t) => !t.user_blacklisted)
    .map((t) => ({
      term: t.term,
      min_recommended_uses: t.min_recommended_uses,
      max_recommended_uses: t.max_recommended_uses,
      is_heading_recommended: t.is_heading_recommended,
    }));
  const questions = ((questionsRes.data ?? []) as QuestionLite[])
    .filter((q) => !q.user_dismissed)
    .map((q) => q.question);
  const facts = ((factsRes.data ?? []) as FactLite[])
    .filter((f) => !f.user_dismissed)
    .map((f) => f.fact_text);
  return {
    primary_keyword: editor.primary_keyword,
    recommended_word_count_target: editor.recommended_word_count_target,
    competitor_avg_score: editor.competitor_avg_score,
    target_score: editor.target_score,
    terms,
    questions,
    facts,
  };
}

interface PageContext {
  trackedPageId: string;
  route_path: string;
  page_title: string;
  seo_title: string | null;
  meta_description: string | null;
  app_dir: string; // e.g. "apps/addiction-interventions"
}

async function loadPageContext(
  client: SupabaseClient,
  trackedPageId: string,
  appDir: string,
): Promise<PageContext> {
  const { data, error } = await client
    .from("tracked_pages")
    .select("id, route_path, page_title, seo_title, meta_description")
    .eq("id", trackedPageId)
    .maybeSingle();
  if (error || !data) {
    throw new ContentEditorError("Tracked page not found.", {
      source: "api",
      status: 404,
    });
  }
  const page = data as { id: string; route_path: string; page_title: string; seo_title: string | null; meta_description: string | null };
  return {
    trackedPageId: page.id,
    route_path: page.route_path,
    page_title: page.page_title,
    seo_title: page.seo_title,
    meta_description: page.meta_description,
    app_dir: appDir,
  };
}

function buildAgentPrompt(opts: {
  brief: BriefContext;
  page: PageContext;
  customInstructions?: string;
}): string {
  const { brief, page } = opts;

  const termLines = brief.terms
    .map(
      (t, i) =>
        `${i + 1}. "${t.term}" → use ${t.min_recommended_uses}–${t.max_recommended_uses} times${
          t.is_heading_recommended ? " (USE IN A HEADING)" : ""
        }`,
    )
    .join("\n");

  const questionLines = brief.questions
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n");

  const factLines = brief.facts.map((f, i) => `${i + 1}. ${f}`).join("\n");

  const wordTarget = brief.recommended_word_count_target ?? 1500;

  return `You are optimizing an existing tracked page for SEO content quality. Your goal is to open a pull request that achieves ≥95% coverage of every NLP term in the content brief while strictly preserving the brand design system. There is NO cap on the number of new sections you may add — add as many as the coverage target requires.

# Target page

- Brand: ${page.app_dir} (sweet-media-platform monorepo)
- Route: ${page.route_path}
- Current page_title: ${page.page_title}
- Current seo_title: ${page.seo_title ?? "(unset)"}
- Current meta_description: ${page.meta_description ?? "(unset)"}
- Primary keyword: ${brief.primary_keyword}
- Target word count: ~${wordTarget}
- Target content score: ${brief.target_score ?? "unknown"} (competitor avg ${brief.competitor_avg_score ?? "unknown"})

# Workflow

1. **Locate the page source.** Start with \`${page.app_dir}/src/app${page.route_path === "/" ? "/page.tsx" : page.route_path + "/page.tsx"}\`. Follow the imports to find the view file, the template, the brand sections, and the data file that drives the template (if any).
2. **Read the brand design system.** Open every relevant file in \`.cursor/rules/*.mdc\` — especially the brand-specific design system rule for this app. Match the tone, components, Tailwind tokens, icon set, and section rhythm documented there.
3. **Read shared components.** Before adding any new section, search \`${page.app_dir}/src/components/sections/\`, \`${page.app_dir}/src/components/templates/\`, and the brand's view files for existing reusable section components. Reuse them. Do NOT invent generic Tailwind layouts when a brand component already exists.
4. **Inventory the current page's slot lengths.** This step is mandatory. Before writing any edit, run \`wc -w\` (or count manually) on the current text in each slot of the data file: hero headline, hero body, each H2, each section intro paragraph, each card body, each FAQ answer. Write this inventory out as a comment block in your scratch notes. You will use it in step 6.
5. **Plan your edits.** For each missing brief item pick the SINGLE BEST option in this priority order: (A) extend in place — add a card/bullet/FAQ to an existing section, (B) replace stale content, (C) add a new H2 — last resort, only when the missing content is its own coherent cluster. New sections must follow FLOW + SECTION VARIETY rules below.
6. **Make the edits.** Edit \`.tsx\` files (and data files when a template uses one). Reuse existing components. No new dependencies. Do not modify shared template internals for one-off needs — extend the template's props if necessary. When the template lacks a fitting layout, build the new section inline from brand design-system tokens — DO NOT clone an existing section component and toggle its background.
7. **Verify before opening the PR.**
   - \`pnpm --filter @sweetmedia/${page.app_dir.replace("apps/", "")} typecheck\` passes.
   - \`pnpm --filter @sweetmedia/${page.app_dir.replace("apps/", "")} lint\` passes (if defined).
   - Grep every brief term against your edited files; coverage ≥95%.
   - Re-count word counts in every edited slot vs LAYOUT BUDGET.
   - Run the FLOW + SECTION VARIETY checklist.

# LAYOUT BUDGET — non-negotiable

This is the single most important constraint in this entire prompt. The brand's typography sizes were designed for SHORT copy in headline slots and TIGHT copy in section intros. Long copy in the wrong slot literally breaks the visual design (text overflows, hero gets crushed, sections look bloated). If you only follow one rule from this prompt, follow this one.

## Hard length budgets per slot

| Slot | Max words | Notes |
|---|---|---|
| Hero H1 / headline | **12** | Punchy. One clear thesis. Not a paragraph. |
| Hero italic emphasis word(s) | **2** | One word ideal, two max. |
| Hero body / subhead | **35** | Two sentences max. |
| Eyebrow / kicker above H2 | **8** | Phrase, not sentence. |
| Section H2 heading | **8** | Phrase, not sentence. |
| Section intro paragraph (under an H2) | **80** | Tighten existing prose — don't pad it. |
| Card heading (in a grid) | **6** | Short label. |
| Card body (in a grid) | **35** | Two short sentences. |
| Stat label | **4** | Two-word ideal. |
| FAQ question | **15** | Phrased as a real user question. |
| FAQ answer | **80** | Aim for 60. Quality over comprehensiveness. |
| Process step title | **6** | |
| Process step body | **40** | |

If a slot is currently below its budget, you may extend it — but only up to **1.5× the current word count, OR the slot budget above, whichever is lower**. Never exceed the budget.

## "Don't bloat — branch" rule

When the brief requires more depth than any single existing slot can hold, work down this priority order. Do NOT skip a higher-priority option to jump to a lower one.

1. **Do NOT** stuff more sentences into the hero, an existing intro paragraph, or a card body.
2. **First, extend existing structures (preferred over creating new sections):**
   - Add new FAQ entries — the cheapest, lowest-risk place to add depth and coverage. FAQ accordions tolerate length variance well.
   - Add new bullet items to existing checklist / differentiator grids (each bullet ≤ 12 words).
   - Add ONE more card to an existing tile-grid (within the grid's natural column count) when the new content fits the same cluster.
3. **Then, replace stale content** — swap a card body, paragraph, or list item that's currently weak or off-topic with one that addresses the brief.
4. **Last resort, add a NEW H2 section** — only when the missing content is its own coherent cluster that doesn't fit anywhere existing. New sections must be inserted BEFORE the FAQ + closing CTA (never appended after them), must use a layout pattern from the SECTION COMPOSITION PALETTE that contrasts with both neighbors, and must follow every rule in SECTION VARIETY. New sections come with their own intro paragraph budget (≤ 80 words).

## Section comparison check (mandatory)

Before opening the PR, for EVERY section you edited, fill out this table in the PR description:

| Slot | Was (words) | Now (words) | Budget | OK? |
|---|---|---|---|---|
| Hero H1 | 5 | 11 | 12 | ✅ |
| Hero body | 18 | 30 | 35 | ✅ |
| ... | | | | |

If any "OK?" cell shows ❌, fix it before opening the PR.

## Anti-pattern — DO NOT DO THIS

The single failure mode that breaks every layout: turning the hero into a paragraph and turning each section intro into an essay. Specifically:

- ❌ Hero H1 with 45 words explaining the whole service
- ❌ Section H2 with 15 words trying to fit a keyword phrase verbatim
- ❌ Section intro paragraph that runs 200+ words because "the brief needs this content somewhere"
- ❌ Card body with 100+ words causing the grid to grow uneven
- ❌ Putting a primary-keyword variant into the hero by extending the headline (instead, put it in the meta description, the H2 of a new section, or an early section intro)

## Where to put long-form content

The brief's facts, questions, and term coverage almost always belong in **new H2 sections + the FAQ accordion**, not in the hero or existing intros. Distribute coverage like this:

- **Hero**: keep it short and punchy. Preserve the brand voice. The primary keyword can appear naturally but the hero is not where coverage happens.
- **Existing section intros**: phrase swaps only. Tighten and swap, don't extend.
- **New H2 sections you add**: this is where the majority of new keyword + fact coverage should live. Add as many new H2 sections as needed — there is NO cap. Each new section should address a logical cluster of missing terms and feel native to the page's content and voice.
- **FAQ accordion**: great for question coverage and secondary terms. Add as many new FAQ entries as needed.
- **New bullet items in checklist/grid sections**: efficient for short terms that fit naturally as a feature or benefit.

**Coverage goal: ≥95% of all NLP terms must be present in the final page.** If coverage is below 95% after planned edits, prefer extending existing sections (more cards, FAQ entries, bullets) BEFORE adding a brand-new H2.

# FLOW + SECTION VARIETY — non-negotiable

A page is a guided argument, not a stack of SEO blocks. The single worst failure mode is cloning an existing brand section component (e.g. \`<ExtraCardsSection>\`), flipping its background, and adding a second instance with new content — the page reads as repetitive. These rules block that.

## Hard rules
1. **No two adjacent sections may use the same layout pattern OR the same background.** Pick patterns from the palette below.
2. **No clone-and-rebackground.** Do NOT instantiate an existing brand section component a second time with a different background prop. Extend the original instance instead.
3. **Max 2 tile-grid sections per page. Max 1 full-bleed image-overlay section per page.**
4. **Never insert between an image-overlay band and the section that follows it.** That visual breath into the FAQ is intentional.
5. **Never append after the FAQ + closing CTA** — those must remain the last narrative beats.
6. **Never repeat a content cluster.** If "treatment levels of care" exists as a 4-card grid, do not add a second one. Extend the original.
7. **FAQ accordion is exempt from variety rules** — always prefer adding FAQ entries before adding a brand-new H2.

## Section composition palette
When you must add a new H2 (last resort — see "Don't bloat" priority above), pick the pattern that contrasts with BOTH neighbors:

- \`tile-grid\` — equal cards in a 2/3/4-col grid
- \`split-image-text\` — image one side, prose + small list opposite
- \`alternating-strips\` — stacked split-image rows, image side alternates
- \`timeline\` — numbered/dated steps with a connector line
- \`comparison-table\` — real \`<table>\`, 2–4 cols (X vs Y, insurance, options)
- \`stat-band\` — row of large numbers + short labels on accent bg
- \`accordion-stack\` — expandable items (same as FAQ component, different topic)
- \`pull-quote-block\` — one oversized quote on contrasting bg
- \`callout-stack\` — 2–3 warning/tip/insight callouts stacked
- \`feature-row\` — horizontal icon + 1-line title + 1-sentence body, no card chrome
- \`directory-list\` — compact 2-col list of name + 1-line description
- \`numbered-list-section\` — single H2 + rich \`<ol>\`, no card chrome
- \`single-image-overlay\` — full-bleed image + overlaid headline + paragraph (max 1 per page)

If the brand template already implements your chosen pattern (e.g. \`<ProcessTimeline>\`), use it. If not, build it inline using brand design-system tokens (colors, type, spacing, icons from the \`.cursor/rules/*.mdc\` for this app).

## Required FLOW AUDIT in the PR description
Include this table — one row per FINAL section in render order, current AND new:

| # | Section name | Layout pattern | Background | Status |
|---|---|---|---|---|
| 1 | Hero | hero-with-form | image-overlay | unchanged |
| ... | | | | |
| N | New: Aftercare pathway | timeline | cream | NEW (cluster: continuing care) |

Status: \`unchanged\` | \`tightened\` | \`extended\` | \`replaced\` | \`NEW\`. If two adjacent rows share Layout pattern OR Background, the PR is NOT ready.

For every \`NEW\` row, add a one-line rationale beneath the table: e.g. \`"Aftercare pathway → timeline (contrasts with adjacent tile-grid + accordion)"\`.

## Anti-patterns — DO NOT DO THIS
- ❌ Existing cream-bg \`<ExtraCardsSection>\` → adding a white-bg \`<ExtraCardsSection>\` for new content (clone-and-rebackground)
- ❌ Two 4-card tile-grids back-to-back (variety rule #1)
- ❌ Inserting a new tile-grid between the Recovery Band and the FAQ (flow rule #4)

# Content brief (mandatory coverage)

## Terms (use every one of these at least the minimum count)

${termLines || "(none)"}

## Questions to answer (each should be addressed somewhere in the page)

${questionLines || "(none)"}

## Facts to incorporate (paraphrased, not verbatim)

${factLines || "(none)"}

# Rules

- Do **not** disable TypeScript strict checks, eslint, or any pre-commit hooks.
- Do **not** add new top-level dependencies.
- Do **not** edit blog routes, admin routes, or any file under \`packages/\` unless a typed interface change is unavoidable.
- Do **not** edit any other brand's app directory.
- Preserve the existing \`generateMetadata\` + \`resolveTrackedPageMetadata\` pattern. Update \`fallbackMetadata\` if you change the SEO title/description.
- Match the brand design system rule for spacing, colors, typography, and section composition.

# Imagery rules (important)

Net-new sections often want imagery. Follow this priority order:

1. **Reuse what already exists in this app.** Search the brand's existing image references first:
   - \`git grep -h "supabase.co/storage/v1/object/public/site-assets/images" ${page.app_dir}/src\` — every Supabase image URL the brand already ships.
   - The brand's centralized image asset module(s) if any (e.g. \`${page.app_dir}/src/data/*.ts\`, \`${page.app_dir}/src/views/home/assets.ts\`).
   - Pick the most semantically related image already in the brand bucket and reuse its public URL verbatim.

2. **If no existing image fits**, do NOT invent a URL. Insert a TODO placeholder using this exact pattern so the operator can swap in a real image later:

\`\`\`tsx
{/* TODO_AI_IMAGE: <one-line description of what the image should show>
    Suggested filename: <route-prefix>_<section-name><01>.jpg
    Upload to: site-assets/images/ on this brand's Supabase project. */}
<Image src="/placeholder-needs-replacement.jpg" alt="<placeholder alt>" width={1200} height={800} />
\`\`\`

3. **Never hallucinate a Supabase URL** that isn't already in the codebase. Broken images are worse than honest TODOs.

4. **Reuse existing alt text** when reusing an image, but if the surrounding context changed, update the alt text to fit the new section.

# Output

When you finish, the PR title should be:

> AI page optimization: \`${page.route_path}\` (${brief.primary_keyword})

The PR description must include:

- **Coverage count** — "X of Y NLP terms covered (Z%)". The PR is NOT ready if Z < 95%.
- **Flow audit table** — see "Required FLOW AUDIT" above. PR not ready if any two adjacent rows share Layout pattern or Background.
- **Layout-budget audit** — table with one row per edited slot showing was / now / budget / OK. PR not ready until every row is ✅.
- **Sections summary** — short bullets for tightened / extended / replaced / new sections. For each new section: palette pattern used + confirm no clone-and-rebackground.
- **Coverage checklist** — which brief terms / questions / facts are now covered + where (section / FAQ entry). Note any uncovered terms (≤5%) with reason.
- **Typecheck + lint output** — must be green.

${opts.customInstructions ? `\n# Additional instructions from the operator\n\n${opts.customInstructions}\n` : ""}`;
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Dispatch + lifecycle                                                  */
/* ────────────────────────────────────────────────────────────────────── */

export interface TriggerAiOptimizeRunInput {
  editorId: string;
  trackedPageId: string;
  appDir: string; // e.g. "apps/addiction-interventions"
  triggeredByEmail?: string | null;
  model?: string;
  customInstructions?: string;
  baseRef?: string;
  repoUrl?: string;
  /**
   * Vercel project id (e.g. "prj_OYpFeZsFIDT6uLMFMCfEOWcD43Gh") for the
   * brand. When set, after the agent opens its PR we use the Vercel API
   * to look up the READY preview deployment for that PR and store its
   * URL on the run row so the admin can preview + score before merging.
   * Pass via env var `AI_OPTIMIZE_VERCEL_PROJECT_ID` from each app's
   * /optimize-pr route handler.
   */
  vercelProjectId?: string | null;
}

/**
 * Insert a queued run row, dispatch a Cursor cloud agent with autoCreatePR,
 * then update the row with the agent + run IDs.
 *
 * Returns the row immediately after dispatch (agent runs asynchronously
 * on Cursor's infrastructure; we poll status via getAiOptimizeRun).
 */
export async function triggerAiOptimizeRun(
  input: TriggerAiOptimizeRunInput,
): Promise<AiOptimizeRunRow> {
  if (!input.editorId) {
    throw new ContentEditorError("editorId is required.", { source: "api", status: 400 });
  }
  if (!input.trackedPageId) {
    throw new ContentEditorError("trackedPageId is required.", { source: "api", status: 400 });
  }
  if (!input.appDir) {
    throw new ContentEditorError("appDir is required.", { source: "api", status: 400 });
  }

  const apiKey = getCursorApiKey();
  const adm = getAdminClient();
  const repoUrl = input.repoUrl ?? DEFAULT_REPO_URL;
  const baseRef = input.baseRef ?? DEFAULT_BASE_REF;
  const modelId = input.model ?? DEFAULT_MODEL_ID;

  const [brief, page] = await Promise.all([
    loadBriefContext(adm, input.editorId),
    loadPageContext(adm, input.trackedPageId, input.appDir),
  ]);

  const prompt = buildAgentPrompt({
    brief,
    page,
    customInstructions: input.customInstructions,
  });

  // 1. Insert the queued row first so we can record the dispatch failure
  //    if anything below throws.
  const { data: insertData, error: insertErr } = await adm
    .from("ai_optimize_runs")
    .insert({
      editor_id: input.editorId,
      tracked_page_id: input.trackedPageId,
      status: "queued",
      status_message: "Dispatching Cursor cloud agent…",
      triggered_by_email: input.triggeredByEmail ?? null,
      model_id: modelId,
      prompt,
      vercel_project_id: input.vercelProjectId ?? null,
    })
    .select("*")
    .single();
  if (insertErr || !insertData) {
    throw new ContentEditorError(
      `Failed to insert ai_optimize_run: ${insertErr?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  const row = insertData as AiOptimizeRunRow;

  // 2. Dispatch to Cursor cloud. Don't await run.wait() — the agent runs
  //    asynchronously on Cursor's infrastructure and opens a PR via
  //    autoCreatePR when done. The client polls /optimize-pr to refresh
  //    status by calling Agent.get(cursor_agent_id) from the server.
  let agentId: string | undefined;
  let runId: string | undefined;
  try {
    const agent = await Agent.create({
      apiKey,
      model: { id: modelId },
      cloud: {
        repos: [
          {
            url: repoUrl,
            startingRef: baseRef,
          },
        ],
        autoCreatePR: true,
        skipReviewerRequest: true,
      },
    });
    try {
      const run = await agent.send(prompt);
      agentId = agent.agentId;
      runId = run.id;
    } finally {
      // Dispose the SDK handle — the run keeps executing in the cloud.
      await agent[Symbol.asyncDispose]();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isRetryable = err instanceof CursorAgentError ? err.isRetryable : false;
    await adm
      .from("ai_optimize_runs")
      .update({
        status: "failed",
        status_message: isRetryable ? "Dispatch failed (retryable)" : "Dispatch failed",
        error: message,
        completed_at: new Date().toISOString(),
      })
      .eq("id", row.id);
    throw new ContentEditorError(`Cursor dispatch failed: ${message}`, {
      source: "openrouter",
      status: 502,
    });
  }

  const { data: updateData } = await adm
    .from("ai_optimize_runs")
    .update({
      status: "running",
      status_message: "Agent running on Cursor cloud…",
      cursor_agent_id: agentId ?? null,
      cursor_run_id: runId ?? null,
    })
    .eq("id", row.id)
    .select("*")
    .single();
  return (updateData ?? row) as AiOptimizeRunRow;
}

/**
 * Refresh a run's status by querying Cursor for the current agent state.
 * Updates the row in-place if any state has changed. Safe to call repeatedly.
 *
 * Cursor's `Agent.get(...)` returns the agent metadata + (when finished)
 * the autoCreatePR result with the PR URL. We use that to flip status to
 * `pr_opened`. If the agent is in a `failed` / `cancelled` state, we
 * record that too.
 */
export async function refreshAiOptimizeRunFromCursor(
  id: string,
): Promise<AiOptimizeRunRow | null> {
  const row = await getAiOptimizeRun(id);
  if (!row) return null;
  if (!row.cursor_agent_id) return row;
  // Terminal states — nothing to refresh.
  if (
    row.status === "pr_opened" ||
    row.status === "merged" ||
    row.status === "failed" ||
    row.status === "cancelled"
  ) {
    return row;
  }

  const apiKey = getCursorApiKey();
  // Pull live status + git info from the run handle. `Agent.getRun` is the
  // documented way to inspect a cloud run after the SDK process ended. For
  // status reads + cancellation we don't need stream() / wait(), so a
  // detached handle is fine.
  let runHandle;
  try {
    runHandle = await Agent.getRun(row.cursor_run_id ?? row.cursor_agent_id, {
      runtime: "cloud",
      agentId: row.cursor_agent_id,
      apiKey,
    });
  } catch (err) {
    console.warn(
      `[ai_optimize_runs] Agent.getRun(${row.cursor_agent_id}) failed:`,
      err instanceof Error ? err.message : String(err),
    );
    return row;
  }

  const adm = getAdminClient();
  const status = runHandle.status; // "running" | "finished" | "error" | "cancelled"
  const summary = runHandle.result ?? null;
  const firstBranch = runHandle.git?.branches?.[0];
  const prUrl = firstBranch?.prUrl ?? null;
  const branchName = firstBranch?.branch ?? null;
  // Extract PR number from URL when present (https://github.com/owner/repo/pull/123).
  const prNumber = (() => {
    if (!prUrl) return null;
    const m = prUrl.match(/\/pull\/(\d+)(?:[/?#]|$)/);
    return m ? Number(m[1]) : null;
  })();

  const updates: Partial<AiOptimizeRunRow> & Record<string, unknown> = {};

  if (prUrl && !row.pr_url) {
    updates.pr_url = prUrl;
    updates.pr_number = prNumber;
    updates.branch_name = branchName;
    updates.status = "pr_opened";
    updates.status_message = "PR opened on GitHub";
    updates.diff_summary = summary;
    updates.completed_at = new Date().toISOString();
  } else if (status === "error") {
    updates.status = "failed";
    updates.status_message = summary ?? "Agent reported error";
    updates.error = summary ?? null;
    updates.completed_at = new Date().toISOString();
  } else if (status === "cancelled") {
    updates.status = "cancelled";
    updates.status_message = "Cancelled";
    updates.completed_at = new Date().toISOString();
  } else if (status === "finished" && !prUrl) {
    // Finished without a PR — probably a no-op run or the agent skipped PR
    // creation. Mark as failed so the admin can re-run with new instructions.
    updates.status = "failed";
    updates.status_message = "Agent finished without opening a PR";
    updates.error = summary ?? null;
    updates.completed_at = new Date().toISOString();
  } else if (summary && summary !== row.status_message) {
    updates.status_message = summary;
  }

  if (Object.keys(updates).length === 0) return row;

  const { data, error } = await adm
    .from("ai_optimize_runs")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error || !data) {
    console.warn(
      `[ai_optimize_runs] failed to update row ${id} after refresh:`,
      error?.message,
    );
    return row;
  }
  const refreshed = data as AiOptimizeRunRow;

  // If we just flipped to pr_opened, kick off preview discovery + scoring
  // as fire-and-forget. The next poll will surface preview_url + score.
  if (
    refreshed.status === "pr_opened" &&
    refreshed.pr_number != null &&
    refreshed.vercel_project_id &&
    !refreshed.preview_url
  ) {
    void detectAndScorePreview(refreshed).catch((err) => {
      console.warn(
        `[ai_optimize_runs] preview detection failed for run ${id}:`,
        err instanceof Error ? err.message : String(err),
      );
    });
  }

  return refreshed;
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Vercel preview detection + scoring                                    */
/* ────────────────────────────────────────────────────────────────────── */

interface VercelDeploymentLite {
  uid: string;
  url: string;
  state: string;
  meta?: { githubPrId?: string; githubCommitRef?: string };
  created: number;
}

/**
 * Look up the latest READY Vercel preview deployment for a given PR
 * number on a given Vercel project. Returns the full preview URL (with
 * https://) or null if nothing's ready yet.
 *
 * Uses VERCEL_TOKEN from env. Team id is optional.
 */
async function fetchVercelPreviewUrlForPr(opts: {
  vercelProjectId: string;
  prNumber: number;
}): Promise<string | null> {
  const token = process.env.VERCEL_TOKEN?.trim();
  if (!token) {
    console.warn("[ai_optimize_runs] VERCEL_TOKEN missing — can't fetch preview URL.");
    return null;
  }
  const teamId = process.env.VERCEL_TEAM_ID?.trim() ?? null;

  const params = new URLSearchParams({
    projectId: opts.vercelProjectId,
    limit: "10",
    state: "READY",
    target: "preview",
  });
  if (teamId) params.set("teamId", teamId);

  const url = `https://api.vercel.com/v6/deployments?${params.toString()}`;
  let json: { deployments?: VercelDeploymentLite[] };
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.warn(`[ai_optimize_runs] Vercel list-deployments failed (${res.status})`);
      return null;
    }
    json = (await res.json()) as { deployments?: VercelDeploymentLite[] };
  } catch (err) {
    console.warn("[ai_optimize_runs] Vercel API error:", err);
    return null;
  }

  const wantPr = String(opts.prNumber);
  const match = (json.deployments ?? []).find(
    (d) => d.meta?.githubPrId === wantPr && d.state === "READY",
  );
  if (!match?.url) return null;
  return match.url.startsWith("http") ? match.url : `https://${match.url}`;
}

/**
 * After a PR is opened, find its Vercel preview URL, fetch the rewritten
 * page's HTML from that preview, score it against the editor's brief,
 * and persist the result on the run row. All steps are best-effort.
 */
async function detectAndScorePreview(run: AiOptimizeRunRow): Promise<void> {
  if (!run.vercel_project_id || run.pr_number == null) return;

  const previewBase = await fetchVercelPreviewUrlForPr({
    vercelProjectId: run.vercel_project_id,
    prNumber: run.pr_number,
  });

  const adm = getAdminClient();
  if (!previewBase) {
    // Don't error out — the preview may still be building. The next poll
    // will retry.
    return;
  }

  // Compose the full URL: preview base + the tracked page's route path.
  let routePath: string | null = null;
  if (run.tracked_page_id) {
    const { data: page } = await adm
      .from("tracked_pages")
      .select("route_path")
      .eq("id", run.tracked_page_id)
      .maybeSingle();
    routePath = (page as { route_path?: string } | null)?.route_path ?? null;
  }
  if (!routePath) {
    // No tracked-page context — we can still store the preview base URL
    // so the admin gets a clickable link.
    await adm
      .from("ai_optimize_runs")
      .update({ preview_url: previewBase })
      .eq("id", run.id);
    return;
  }
  const fullPreviewUrl = `${previewBase.replace(/\/$/, "")}${routePath.startsWith("/") ? "" : "/"}${routePath}`;

  // Score the preview against the editor's brief. We persist the score on
  // the run row (not on tracked_page_live_snapshots) so the live-page
  // dashboard keeps showing the production score, untouched.
  if (!run.editor_id) {
    await adm
      .from("ai_optimize_runs")
      .update({ preview_url: fullPreviewUrl })
      .eq("id", run.id);
    return;
  }

  try {
    const result = await scoreUrlAgainstEditor({
      url: fullPreviewUrl,
      editorId: run.editor_id,
    });
    await adm
      .from("ai_optimize_runs")
      .update({
        preview_url: fullPreviewUrl,
        preview_content_score: result.content_score,
        preview_word_count: result.word_count,
        preview_scored_at: new Date().toISOString(),
        preview_fetch_error: result.fetch_error,
      })
      .eq("id", run.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await adm
      .from("ai_optimize_runs")
      .update({
        preview_url: fullPreviewUrl,
        preview_fetch_error: message,
      })
      .eq("id", run.id);
  }
}

/**
 * Refresh every non-terminal run for an editor. Used by the panel's
 * polling GET to keep the UI in sync.
 */
export async function refreshAllActiveRunsForEditor(
  editorId: string,
): Promise<void> {
  const rows = await listAiOptimizeRuns({ editorId, limit: 20 });
  await Promise.all(
    rows
      .filter((r) => r.status === "queued" || r.status === "running")
      .map((r) => refreshAiOptimizeRunFromCursor(r.id).catch(() => null)),
  );
}

export async function cancelAiOptimizeRun(id: string): Promise<AiOptimizeRunRow> {
  const row = await getAiOptimizeRun(id);
  if (!row) {
    throw new ContentEditorError("Run not found.", { source: "api", status: 404 });
  }
  if (row.status === "pr_opened" || row.status === "merged" || row.status === "failed" || row.status === "cancelled") {
    return row;
  }

  const adm = getAdminClient();

  // Best-effort cancel via the Cursor SDK. If the run no longer supports
  // cancel (already terminal), we still mark it cancelled locally.
  if (row.cursor_agent_id && row.cursor_run_id) {
    try {
      const apiKey = getCursorApiKey();
      const run = await Agent.getRun(row.cursor_run_id, {
        runtime: "cloud",
        agentId: row.cursor_agent_id,
        apiKey,
      });
      if (run.supports("cancel")) {
        await run.cancel();
      }
    } catch (err) {
      console.warn(
        `[ai_optimize_runs] cancel via SDK failed for ${row.id}:`,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  const { data, error } = await adm
    .from("ai_optimize_runs")
    .update({
      status: "cancelled",
      status_message: "Cancelled by admin",
      completed_at: new Date().toISOString(),
    })
    .eq("id", row.id)
    .select("*")
    .single();
  if (error || !data) {
    throw new ContentEditorError(
      `Failed to cancel run: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as AiOptimizeRunRow;
}
