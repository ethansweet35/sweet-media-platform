import { handleBlogPlannerBulkJobContinuePost } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  return handleBlogPlannerBulkJobContinuePost(request, id);
}
