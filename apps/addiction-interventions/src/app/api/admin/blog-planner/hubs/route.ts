import {
  handleBlogPlannerHubsGet,
  handleBlogPlannerHubPatch,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = handleBlogPlannerHubsGet;
export const PATCH = handleBlogPlannerHubPatch;
