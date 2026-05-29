import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  cancelAiOptimizeRun,
  getRevalidationPathsForEditor,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; runId: string }>;
}

/**
 * POST /api/admin/content-editor/[id]/optimize-pr/[runId]/cancel
 *
 * Best-effort cancellation: asks the Cursor SDK to cancel the run, then
 * marks the row as cancelled locally regardless of SDK response (so the
 * UI doesn't get stuck if Cursor is unavailable).
 */
export async function POST(_request: Request, ctx: RouteContext) {
  const { id: editorId, runId } = await ctx.params;
  if (!runId) {
    return NextResponse.json(
      { ok: false, error: "runId is required." },
      { status: 400 },
    );
  }
  try {
    const run = await cancelAiOptimizeRun(runId);
    // Revalidate so the banner disappears from the live page(s) instantly.
    if (editorId) {
      try {
        const paths = await getRevalidationPathsForEditor(editorId);
        for (const p of paths) {
          try {
            revalidatePath(p);
          } catch (err) {
            console.warn(`[optimize-pr cancel] revalidatePath(${p}) failed:`, err);
          }
        }
      } catch (err) {
        console.warn("[optimize-pr cancel] revalidation lookup failed:", err);
      }
    }
    return NextResponse.json({ ok: true, run });
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
