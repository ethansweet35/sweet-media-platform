import { handleContentEditorBulkJobCancelPost } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  return handleContentEditorBulkJobCancelPost(_request, id);
}
