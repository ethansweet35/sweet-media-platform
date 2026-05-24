import { handleBlogPlannerBulkJobCancelPost } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  return handleBlogPlannerBulkJobCancelPost(_request, id);
}
