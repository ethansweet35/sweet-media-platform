import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  ContentEditorError,
  getContentEditorAdminClient,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface ApplyRequest {
  seoTitle?: string | null;
  metaDescription?: string | null;
}

/**
 * Apply AI-recommended SEO title and/or meta description to a tracked
 * page, then revalidate the route + tracked-page-metadata cache so the
 * change is live immediately.
 */
export async function POST(request: Request, ctx: RouteContext) {
  const { id: trackedPageId } = await ctx.params;
  if (!trackedPageId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id is required." },
      { status: 400 },
    );
  }

  let body: ApplyRequest;
  try {
    body = (await request.json()) as ApplyRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const updates: Record<string, string | null> = {};
  if (body.seoTitle !== undefined) {
    const v = typeof body.seoTitle === "string" ? body.seoTitle.trim() : null;
    updates.seo_title = v && v.length > 0 ? v : null;
  }
  if (body.metaDescription !== undefined) {
    const v = typeof body.metaDescription === "string" ? body.metaDescription.trim() : null;
    updates.meta_description = v && v.length > 0 ? v : null;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide seoTitle and/or metaDescription." },
      { status: 400 },
    );
  }

  try {
    const adm = getContentEditorAdminClient();
    const { data: page, error: loadErr } = await adm
      .from("tracked_pages")
      .select("id, route_path")
      .eq("id", trackedPageId)
      .maybeSingle();
    if (loadErr || !page) {
      return NextResponse.json({ ok: false, error: "Tracked page not found." }, { status: 404 });
    }
    const routePath = (page as { route_path: string }).route_path;

    const { error: updateErr } = await adm
      .from("tracked_pages")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", trackedPageId);
    if (updateErr) {
      return NextResponse.json(
        { ok: false, error: `Failed to update tracked page: ${updateErr.message}` },
        { status: 500 },
      );
    }

    // Bust the runtime metadata cache + revalidate the route path so the
    // new SEO meta ships without a redeploy.
    try {
      revalidatePath(routePath);
      revalidateTag("tracked-page-metadata", { expire: 0 });
    } catch (cacheErr) {
      console.warn("[apply-seo-meta] revalidate failed (non-fatal):", cacheErr);
    }

    return NextResponse.json({ ok: true, route_path: routePath, applied: updates });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to apply SEO meta." },
      { status: 500 },
    );
  }
}
