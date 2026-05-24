import {
  handleBlogPlannerItemPost,
  handleBlogPlannerItemPatch,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = handleBlogPlannerItemPost;
export const PATCH = handleBlogPlannerItemPatch;
