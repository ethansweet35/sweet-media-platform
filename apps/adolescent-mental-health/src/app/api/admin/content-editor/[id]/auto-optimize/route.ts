import { NextResponse } from "next/server";
import { after } from "next/server";
import {
  ContentEditorError,
  getContentEditorAdminClient,
  loadContentEditor,
  resolveEditorPublishLink,
  runAutoOptimize,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface AutoOptimizeRequest {
  model?: string;
  customInstructions?: string;
  publishTarget?: "blog" | "page";
  trackedPageId?: string;
  autoPublish?: boolean;
}

/**
 * Kick off an AI Auto-Optimize run for the editor.
 *
 * Returns 202 immediately; the rewrite runs in `after()` so the response
 * isn't lost if the user navigates away. On success the new draft is
 * persisted to `content_editor_drafts` (a new is_current row is created).
 * The brief page polls for the new draft id to detect completion.
 *
 * Optional body: { model?, customInstructions?, publishTarget?, trackedPageId?, autoPublish? }
 */
export async function POST(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }

  let body: AutoOptimizeRequest = {};
  try {
    const parsed = (await request.json()) as unknown;
    if (parsed && typeof parsed === "object") {
      body = parsed as AutoOptimizeRequest;
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

  const existingLink = await resolveEditorPublishLink(id, editor);
  if (!existingLink) {
    if (body.publishTarget !== "blog" && body.publishTarget !== "page") {
      return NextResponse.json(
        {
          ok: false,
          error: "Choose Blog or Page as the publish target before Auto-Optimize.",
        },
        { status: 400 },
      );
    }
    if (body.publishTarget === "page" && !body.trackedPageId?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Select a marketing page to link before Auto-Optimize." },
        { status: 400 },
      );
    }
  }

  try {
    after(async () => {
      try {
        await runAutoOptimize({
          editorId: id,
          model: body.model,
          customInstructions: body.customInstructions,
          publishTarget: body.publishTarget,
          trackedPageId: body.trackedPageId,
          autoPublish: body.autoPublish,
        });
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
