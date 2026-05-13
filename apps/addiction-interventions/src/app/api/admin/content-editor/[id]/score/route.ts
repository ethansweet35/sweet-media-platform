import { NextResponse } from "next/server";
import {
  ContentEditorError,
  scoreContentEditorDraft,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Fact-coverage path embeds draft sentences via OpenAI — set ample timeout.
export const maxDuration = 60;

interface ScoreRequest {
  titleTag?: string | null;
  metaDescription?: string | null;
  h1Text?: string | null;
  bodyPlaintext?: string;
  earlyHeadings?: string[];
  includeFactCoverage?: boolean;
  persist?: boolean;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }
  let body: ScoreRequest;
  try {
    body = (await request.json()) as ScoreRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const bodyPlaintext = body.bodyPlaintext ?? "";

  try {
    const result = await scoreContentEditorDraft({
      editorId: id,
      titleTag: body.titleTag,
      metaDescription: body.metaDescription,
      h1Text: body.h1Text,
      bodyPlaintext,
      earlyHeadings: body.earlyHeadings,
      includeFactCoverage: body.includeFactCoverage === true,
      persist: body.persist === true,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to score draft." },
      { status: 500 },
    );
  }
}
