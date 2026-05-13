import { NextResponse } from "next/server";
import {
  ContentEditorError,
  triggerAiOptimizeRun,
  listAiOptimizeRuns,
  refreshAllActiveRunsForEditor,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const APP_DIR = "apps/client-template";

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
    });
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
