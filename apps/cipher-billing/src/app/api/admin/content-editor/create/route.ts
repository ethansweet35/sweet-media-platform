import { NextResponse } from "next/server";
import { after } from "next/server";
import {
  ContentEditorError,
  createContentEditor,
  runContentEditorPipeline,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Allow the pipeline to run inside `after()` for up to 5 minutes.
// Observed pipeline runtime is ~150s; this gives us 2x headroom.
export const maxDuration = 300;

interface CreateRequest {
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  locationCode?: number;
  languageCode?: string;
  device?: "desktop" | "mobile";
  competitorPoolSize?: number;
  blogPostId?: string | null;
}

export async function POST(request: Request) {
  let body: CreateRequest;
  try {
    body = (await request.json()) as CreateRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const keyword = body.primaryKeyword?.trim();
  if (!keyword) {
    return NextResponse.json(
      { ok: false, error: "primaryKeyword is required." },
      { status: 400 },
    );
  }

  try {
    const editor = await createContentEditor({
      primaryKeyword: keyword,
      secondaryKeywords: body.secondaryKeywords,
      locationCode: body.locationCode,
      languageCode: body.languageCode,
      device: body.device,
      competitorPoolSize: body.competitorPoolSize,
      blogPostId: body.blogPostId ?? null,
    });

    // Kick off the pipeline asynchronously — runs after the 202 response
    // is sent. `maxDuration: 300` keeps the function alive for the full run.
    after(async () => {
      try {
        await runContentEditorPipeline({ editorId: editor.id });
      } catch (err) {
        // Pipeline already marks status=failed on the row; log for ops.
        console.error("[content-editor] pipeline failed:", err);
      }
    });

    return NextResponse.json(
      { ok: true, editor, poll_url: `/api/admin/content-editor/${editor.id}` },
      { status: 202 },
    );
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message, source: err.source },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to create editor." },
      { status: 500 },
    );
  }
}
