import {
  handleContentEditorBulkJobsActiveGet,
  handleContentEditorBulkJobsPost,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export const GET = handleContentEditorBulkJobsActiveGet;
export const POST = handleContentEditorBulkJobsPost;
