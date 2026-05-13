import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ContentEditorError,
  applyTrackedPageBlock,
  getRoutePathForTrackedPage,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; blockId: string }>;
}

/** POST /api/admin/tracked-pages/[id]/blocks/[blockId]/apply */
export async function POST(_request: Request, ctx: RouteContext) {
  const { id: trackedPageId, blockId } = await ctx.params;
  if (!trackedPageId || !blockId) {
    return NextResponse.json(
      { ok: false, error: "tracked-page id and blockId are required." },
      { status: 400 },
    );
  }

  try {
    const block = await applyTrackedPageBlock(blockId);
    const routePath = await getRoutePathForTrackedPage(trackedPageId);
    if (routePath) {
      try {
        revalidatePath(routePath);
      } catch (cacheErr) {
        console.warn("[blocks/apply] revalidate failed (non-fatal):", cacheErr);
      }
    }
    return NextResponse.json({ ok: true, block, route_path: routePath });
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
