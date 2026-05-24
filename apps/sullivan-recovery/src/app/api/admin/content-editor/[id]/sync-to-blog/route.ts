import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  syncEditorDraftToBlogPost,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Push the current Content Editor draft into the linked blog_posts row. */
export async function POST(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id is required." }, { status: 400 });
  }

  try {
    const result = await syncEditorDraftToBlogPost(id);
    revalidatePath(`/blog/${result.slug}`);
    revalidatePath("/blog");
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to sync to blog." },
      { status: 500 },
    );
  }
}
