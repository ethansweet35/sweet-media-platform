import { NextResponse } from "next/server";
import {
  ContentEditorError,
  syncBlogPostToEditorDraft,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Pull the linked blog_posts body into the Content Editor draft. */
export async function POST(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }

  try {
    const result = await syncBlogPostToEditorDraft(id);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to import from blog." },
      { status: 500 },
    );
  }
}
