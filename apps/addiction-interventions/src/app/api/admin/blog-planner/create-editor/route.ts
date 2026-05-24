import { handleBlogPlannerCreateEditorPost } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Pipeline runs in `after()` — same headroom as standard Content Editor create. */
export const maxDuration = 300;

export const POST = handleBlogPlannerCreateEditorPost;
