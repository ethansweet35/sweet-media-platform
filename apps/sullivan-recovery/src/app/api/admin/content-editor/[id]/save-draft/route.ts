import { NextResponse } from "next/server";
import {
  ContentEditorError,
  saveContentEditorDraft,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SaveDraftRequest {
  titleTag?: string | null;
  metaDescription?: string | null;
  h1Text?: string | null;
  bodyHtml?: string | null;
  bodyPlaintext?: string | null;
  bodyMarkdown?: string | null;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }
  let body: SaveDraftRequest;
  try {
    body = (await request.json()) as SaveDraftRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  try {
    const draft = await saveContentEditorDraft({
      editorId: id,
      titleTag: body.titleTag,
      metaDescription: body.metaDescription,
      h1Text: body.h1Text,
      bodyHtml: body.bodyHtml,
      bodyPlaintext: body.bodyPlaintext,
      bodyMarkdown: body.bodyMarkdown,
    });
    return NextResponse.json({ ok: true, draft });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to save draft." },
      { status: 500 },
    );
  }
}
