import { NextResponse } from "next/server";
import { after } from "next/server";
import {
  ContentEditorError,
  getContentEditorAdminClient,
  loadContentEditor,
  runAutoOptimize,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Kick off an AI Auto-Optimize run for the editor.
 *
 * Returns 202 immediately; the rewrite runs in `after()` so the response
 * isn't lost if the user navigates away. On success the new draft is
 * persisted to `content_editor_drafts` (a new is_current row is created).
 * The brief page polls for the new draft id to detect completion.
 *
 * Optional body: { model?: string, customInstructions?: string }
 */
export async function POST(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }

  let model: string | undefined;
  let customInstructions: string | undefined;
  try {
    const parsed = (await request.json()) as unknown;
    if (parsed && typeof parsed === "object") {
      const obj = parsed as Record<string, unknown>;
      if (typeof obj.model === "string") model = obj.model;
      if (typeof obj.customInstructions === "string") customInstructions = obj.customInstructions;
    }
  } catch {
    /* Empty body is fine — server picks defaults. */
  }

  const adm = getContentEditorAdminClient();
  const editor = await loadContentEditor(adm, id);
  if (!editor) {
    return NextResponse.json({ ok: false, error: "Editor not found." }, { status: 404 });
  }
  const PIPELINE_BUSY = new Set([
    "pending",
    "fetching_serp",
    "extracting_content",
    "analyzing_nlp",
    "extracting_facts",
    "computing_guidelines",
  ]);
  if (PIPELINE_BUSY.has(editor.status)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Pipeline is still building this editor. Wait until it's Ready, then try again.",
      },
      { status: 409 },
    );
  }

  try {
    after(async () => {
      try {
        await runAutoOptimize({ editorId: id, model, customInstructions });
      } catch (err) {
        console.error("[content-editor] auto-optimize failed:", err);
      }
    });

    return NextResponse.json(
      { ok: true, editor_id: id, poll_url: `/api/admin/content-editor/${id}` },
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
      { ok: false, error: err instanceof Error ? err.message : "Failed to trigger auto-optimize." },
      { status: 500 },
    );
  }
}
