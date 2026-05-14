import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  triggerAiOptimizeRun,
  listAiOptimizeRuns,
  refreshAllActiveRunsForEditor,
  getRevalidationPathsForEditor,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const APP_DIR = "apps/inner-peak-colorado";

async function revalidateLivePathsForEditor(editorId: string) {
  try {
    const paths = await getRevalidationPathsForEditor(editorId);
    for (const p of paths) {
      try {
        revalidatePath(p);
      } catch (err) {
        console.warn(`[optimize-pr] revalidatePath(${p}) failed:`, err);
      }
    }
  } catch (err) {
    console.warn("[optimize-pr] revalidation lookup failed:", err);
  }
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface PostBody {
  trackedPageId?: string;
  model?: string;
  customInstructions?: string;
}

/**
 * GET /api/admin/content-editor/[id]/optimize-pr
 *
 * Returns recent runs for this editor. As a side effect, refreshes status
 * for any non-terminal runs by polling the Cursor SDK, so the UI sees the
 * latest PR URL / failure state without manual intervention.
 */
export async function GET(_request: Request, ctx: RouteContext) {
  const { id: editorId } = await ctx.params;
  if (!editorId) {
    return NextResponse.json(
      { ok: false, error: "editorId is required." },
      { status: 400 },
    );
  }
  try {
    // Non-fatal: if Cursor API is unavailable we still return the local rows.
    await refreshAllActiveRunsForEditor(editorId).catch((err) => {
      console.warn("[optimize-pr GET] refresh failed:", err);
    });
    const runs = await listAiOptimizeRuns({ editorId, limit: 20 });
    // If anything just transitioned to terminal, revalidate the live page(s)
    // so the OptimizationStatusBanner disappears on the next request.
    const anyTerminalRecently = runs.some(
      (r) =>
        (r.status === "pr_opened" || r.status === "failed" || r.status === "cancelled") &&
        r.completed_at &&
        Date.now() - new Date(r.completed_at).getTime() < 60_000,
    );
    if (anyTerminalRecently) {
      await revalidateLivePathsForEditor(editorId);
    }
    return NextResponse.json({ ok: true, runs });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed." },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/content-editor/[id]/optimize-pr
 * Body: { trackedPageId, model?, customInstructions? }
 *
 * Dispatches a Cursor cloud agent that opens a PR with code-level edits
 * to the tracked page. Returns the queued/running run row immediately.
 */
export async function POST(request: Request, ctx: RouteContext) {
  const { id: editorId } = await ctx.params;
  if (!editorId) {
    return NextResponse.json(
      { ok: false, error: "editorId is required." },
      { status: 400 },
    );
  }
  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    body = {};
  }
  if (!body.trackedPageId) {
    return NextResponse.json(
      { ok: false, error: "trackedPageId is required." },
      { status: 400 },
    );
  }

  try {
    const run = await triggerAiOptimizeRun({
      editorId,
      trackedPageId: body.trackedPageId,
      appDir: APP_DIR,
      model: body.model,
      customInstructions: body.customInstructions,
      // Optional: set AI_OPTIMIZE_VERCEL_PROJECT_ID in this app's Vercel
      // env to the project's prj_… id so the admin panel can surface the
      // PR's preview URL + auto-score it against the brief.
      vercelProjectId: process.env.AI_OPTIMIZE_VERCEL_PROJECT_ID ?? null,
    });
    // Revalidate so the OptimizationStatusBanner appears on the live page
    // (and any blog post backed by this editor) immediately.
    await revalidateLivePathsForEditor(editorId);
    return NextResponse.json({ ok: true, run }, { status: 202 });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed." },
      { status: 500 },
    );
  }
}
