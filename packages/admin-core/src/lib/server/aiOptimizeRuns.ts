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
      .limit(40),
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

  return `You are optimizing an existing tracked page for SEO content quality. Your goal is to open a pull request that improves the page's coverage of the content brief while strictly preserving the brand design system.

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
4. **Plan your edits.** Identify which existing sections should be tightened (phrase swaps, sentence additions) and which new sections to add. New sections must look like they belong — same component patterns, same visual rhythm.
5. **Make the edits.** Edit \`.tsx\` files (and the corresponding data files when a template uses one). Use existing components. Do not introduce new dependencies. Do not modify shared template internals for one-off needs — extend the template's props if necessary, but prefer working through existing props.
6. **Verify before opening the PR.**
   - Run \`pnpm --filter @sweetmedia/${page.app_dir.replace("apps/", "")} typecheck\` and ensure it passes.
   - Run \`pnpm --filter @sweetmedia/${page.app_dir.replace("apps/", "")} lint\` (if defined).
   - Quickly grep for the primary keyword + the highest-priority terms in your edited files to confirm coverage.

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

The PR description should include:

- Which existing sections you tightened
- Which new sections you added (and which brand components you used)
- A checklist showing which brief terms / questions / facts are now covered
- The typecheck + lint output (must be green)

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
  return data as AiOptimizeRunRow;
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
