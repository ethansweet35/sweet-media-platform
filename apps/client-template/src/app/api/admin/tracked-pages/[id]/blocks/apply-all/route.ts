import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  applyAllPendingTrackedPageBlocksForEditor,
  getRoutePathForTrackedPage,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface ApplyAllBody {
  editorId?: string;
}

/**
 * POST /api/admin/tracked-pages/[id]/blocks/apply-all
 *
 * Body: { editorId: string } — applies every pending block authored by
 * the given Content Editor for this tracked page in one shot, then
 * revalidates the route.
 */
export async function POST(request: Request, ctx: RouteContext) {
  const { id: trackedPageId } = await ctx.params;
  if (!trackedPageId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id is required." },
      { status: 400 },
    );
  }

  let body: ApplyAllBody;
  try {
    body = (await request.json()) as ApplyAllBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  if (!body.editorId) {
    return NextResponse.json(
      { ok: false, error: "editorId is required." },
      { status: 400 },
    );
  }

  try {
    const applied = await applyAllPendingTrackedPageBlocksForEditor(body.editorId);
    const routePath = await getRoutePathForTrackedPage(trackedPageId);
    if (routePath && applied.length > 0) {
      try {
        revalidatePath(routePath);
      } catch (cacheErr) {
        console.warn("[blocks/apply-all] revalidate failed (non-fatal):", cacheErr);
      }
    }
    return NextResponse.json({
      ok: true,
      applied: applied.length,
      blocks: applied,
      route_path: routePath,
    });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed." },
      { status: 500 },
    );
  }
}
