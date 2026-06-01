import { handleIngestMetricsPost } from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// PSI + Windsor fan-out can take a while; allow generous execution time.
export const maxDuration = 300;

export const POST = handleIngestMetricsPost;
