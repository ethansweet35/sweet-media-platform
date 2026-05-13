import { NextResponse } from "next/server";
import { after } from "next/server";
import {
  ContentEditorError,
  fetchAndScoreLivePage,
  getContentEditorAdminClient,
  loadLatestSnapshotIgnoreTtl,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Trigger a live-page fetch + score for a tracked page (Page Mode editor).
 *
 * Body: { editorId: string, force?: boolean }
 *
 * Returns the most recent snapshot immediately (if any) and kicks off a
 * fresh fetch+score in the background via `after()` when one of:
 *   - the latest snapshot is older than the TTL
 *   - `force: true` is supplied
 *   - no snapshot exists yet
 *
 * The brief page polls `/api/admin/content-editor/{editorId}` to pick up
 * the new snapshot — same pattern as the rest of the pipeline.
 */
export async function POST(request: Request, ctx: RouteContext) {
  const { id: trackedPageId } = await ctx.params;
  if (!trackedPageId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id is required." },
      { status: 400 },
    );
  }

  let editorId: string | undefined;
  let force = false;
  try {
    const parsed = (await request.json()) as unknown;
    if (parsed && typeof parsed === "object") {
      const obj = parsed as Record<string, unknown>;
      if (typeof obj.editorId === "string") editorId = obj.editorId;
      if (obj.force === true) force = true;
    }
  } catch {
    /* No body = use defaults below (we still require editorId). */
  }

  if (!editorId) {
    return NextResponse.json(
      { ok: false, error: "editorId is required in body." },
      { status: 400 },
    );
  }

  // Verify the editor exists + has the linkage. (Cheap, avoids surprise 500.)
  const adm = getContentEditorAdminClient();
  const { data: editorRow, error: editorErr } = await adm
    .from("content_editors")
    .select("id, status, linked_tracked_page_id")
    .eq("id", editorId)
    .maybeSingle();
  if (editorErr || !editorRow) {
    return NextResponse.json({ ok: false, error: "Editor not found." }, { status: 404 });
  }
  const editor = editorRow as { id: string; status: string; linked_tracked_page_id: string | null };
  if (editor.linked_tracked_page_id !== trackedPageId) {
    return NextResponse.json(
      { ok: false, error: "Editor is not linked to this tracked page." },
      { status: 400 },
    );
  }
  if (editor.status === "pending" || editor.status === "fetching_serp" || editor.status === "extracting_content" || editor.status === "analyzing_nlp" || editor.status === "extracting_facts" || editor.status === "computing_guidelines") {
    return NextResponse.json(
      {
        ok: false,
        error: "Pipeline is still building this editor. Wait until it's Ready, then try again.",
      },
      { status: 409 },
    );
  }

  // Return the most recent snapshot (regardless of TTL) so the UI has
  // something to render immediately — then kick off the work.
  const existing = await loadLatestSnapshotIgnoreTtl(trackedPageId, editorId);

  try {
    after(async () => {
      try {
        await fetchAndScoreLivePage({ trackedPageId, editorId: editorId!, force });
      } catch (err) {
        console.error("[content-editor] live-page scan failed:", err);
      }
    });

    return NextResponse.json(
      { ok: true, started: true, snapshot: existing ?? null },
      { status: 202 },
    );
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to trigger scan." },
      { status: 500 },
    );
  }
}
