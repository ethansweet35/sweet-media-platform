import { handleReportSharesGet, handleReportSharesPost } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = handleReportSharesGet;
export const POST = handleReportSharesPost;
