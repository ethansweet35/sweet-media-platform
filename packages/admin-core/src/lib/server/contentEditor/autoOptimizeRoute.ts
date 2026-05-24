import { NextResponse } from "next/server";
import { after } from "next/server";
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor } from "./db";
import { resolveEditorPublishLink } from "./ensurePublishTarget";
import { runAutoOptimize, type AutoOptimizeOptions } from "./autoOptimize";

const PIPELINE_BUSY = new Set([
  "pending",
  "fetching_serp",
  "extracting_content",
  "analyzing_nlp",
  "extracting_facts",
  "computing_guidelines",
]);

export interface ContentEditorAutoOptimizeRequest {
  model?: string;
  customInstructions?: string;
  publishTarget?: "blog" | "page";
  trackedPageId?: string;
  autoPublish?: boolean;
}

/**
 * Kick off AI Auto-Optimize. Returns 202 with a server-read draft baseline so
 * the client can detect real completion (body growth), not score-only bumps.
 */
export async function handleContentEditorAutoOptimizePost(
  request: Request,
  editorId: string,
): Promise<Response> {
  if (!editorId) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }

  let body: ContentEditorAutoOptimizeRequest = {};
  try {
    const parsed = (await request.json()) as unknown;
    if (parsed && typeof parsed === "object") {
      body = parsed as ContentEditorAutoOptimizeRequest;
    }
  } catch {
    /* Empty body is fine. */
  }

  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor) {
    return NextResponse.json({ ok: false, error: "Editor not found." }, { status: 404 });
  }

  if (PIPELINE_BUSY.has(editor.status)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Pipeline is still building this editor. Wait until it's Ready, then try again.",
      },
      { status: 409 },
    );
  }

  const existingLink = await resolveEditorPublishLink(editorId, editor);
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

  const { data: baselineDraft } = await client
    .from("content_editor_drafts")
    .select("updated_at, word_count, body_markdown")
    .eq("editor_id", editorId)
    .eq("is_current", true)
    .maybeSingle();

  const baselineRow = baselineDraft as {
    updated_at?: string;
    word_count?: number | null;
    body_markdown?: string | null;
  } | null;

  const optimizeOpts: AutoOptimizeOptions = {
    editorId,
    model: body.model,
    customInstructions: body.customInstructions,
    publishTarget: body.publishTarget,
    trackedPageId: body.trackedPageId,
    autoPublish: body.autoPublish,
  };

  try {
    after(async () => {
      try {
        await runAutoOptimize(optimizeOpts);
      } catch (err) {
        console.error("[content-editor] auto-optimize failed:", err);
      }
    });

    return NextResponse.json(
      {
        ok: true,
        editor_id: editorId,
        poll_url: `/api/admin/content-editor/${editorId}`,
        baseline_updated_at: baselineRow?.updated_at ?? null,
        baseline_word_count: baselineRow?.word_count ?? 0,
        baseline_body_length: (baselineRow?.body_markdown ?? "").trim().length,
      },
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
      {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to trigger auto-optimize.",
      },
      { status: 500 },
    );
  }
}
