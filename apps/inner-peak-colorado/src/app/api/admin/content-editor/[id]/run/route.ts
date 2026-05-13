import { NextResponse } from "next/server";
import { after } from "next/server";
import {
  ContentEditorError,
  runContentEditorPipeline,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Manually (re-)trigger the pipeline for an existing editor.
 * Useful for retries after a failure or to re-run with fresh data.
 *
 * Returns 202 immediately; the pipeline runs in the `after()` callback.
 */
export async function POST(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }

  try {
    after(async () => {
      try {
        await runContentEditorPipeline({ editorId: id });
      } catch (err) {
        console.error("[content-editor] pipeline failed:", err);
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
      { ok: false, error: err instanceof Error ? err.message : "Failed to trigger pipeline." },
      { status: 500 },
    );
  }
}
