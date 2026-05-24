/**
 * Server-side background bulk create for Blog Planner.
 * Chains serverless invocations when approaching maxDuration.
 */
import { NextResponse } from "next/server";
import { after } from "next/server";
import { ContentEditorError } from "./contentEditor/errors";
import { getAdminClient } from "./contentEditor/db";
import { createBriefEditorFromPlannerItem } from "./blogPlanner";
import type {
  BlogPlannerBulkJob,
  BlogPlannerBulkJobLogEntry,
} from "../../types/blog-planner-bulk-job";

const RUN_BUDGET_MS = 270_000;

type JobRow = {
  id: string;
  hub_tracked_page_id: string | null;
  status: string;
  item_ids: string[];
  total: number;
  completed: number;
  current_keyword: string | null;
  logs: BlogPlannerBulkJobLogEntry[] | null;
  created_at: string;
  updated_at: string;
};

function rowToJob(row: JobRow): BlogPlannerBulkJob {
  return {
    id: row.id,
    hub_tracked_page_id: row.hub_tracked_page_id,
    status: row.status as BlogPlannerBulkJob["status"],
    item_ids: row.item_ids ?? [],
    total: row.total,
    completed: row.completed,
    current_keyword: row.current_keyword,
    logs: Array.isArray(row.logs) ? row.logs : [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function loadJob(
  client: ReturnType<typeof getAdminClient>,
  jobId: string,
): Promise<JobRow | null> {
  const { data, error } = await client
    .from("blog_planner_bulk_jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load bulk job: ${error.message}`, {
      source: "blog-planner",
      status: 500,
    });
  }
  return (data as JobRow | null) ?? null;
}

async function updateJob(
  client: ReturnType<typeof getAdminClient>,
  jobId: string,
  patch: Partial<{
    status: string;
    completed: number;
    current_keyword: string | null;
    logs: BlogPlannerBulkJobLogEntry[];
  }>,
): Promise<void> {
  const { error } = await client
    .from("blog_planner_bulk_jobs")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", jobId);
  if (error) {
    throw new ContentEditorError(`Failed to update bulk job: ${error.message}`, {
      source: "blog-planner",
      status: 500,
    });
  }
}

async function loadItemKeyword(client: ReturnType<typeof getAdminClient>, itemId: string) {
  const { data } = await client
    .from("blog_planner_items")
    .select("primary_keyword")
    .eq("id", itemId)
    .maybeSingle();
  return (data as { primary_keyword?: string } | null)?.primary_keyword?.trim() ?? "Topic";
}

export async function getActiveBlogPlannerBulkJob(): Promise<BlogPlannerBulkJob | null> {
  const client = getAdminClient();
  const { data, error } = await client
    .from("blog_planner_bulk_jobs")
    .select("*")
    .eq("status", "running")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load active job: ${error.message}`, {
      source: "blog-planner",
      status: 500,
    });
  }
  return data ? rowToJob(data as JobRow) : null;
}

const RECENT_FINISH_MS = 120_000;

export async function getRecentlyFinishedBlogPlannerBulkJob(): Promise<BlogPlannerBulkJob | null> {
  const client = getAdminClient();
  const since = new Date(Date.now() - RECENT_FINISH_MS).toISOString();
  const { data, error } = await client
    .from("blog_planner_bulk_jobs")
    .select("*")
    .in("status", ["completed", "cancelled"])
    .gte("updated_at", since)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) return null;
  return data ? rowToJob(data as JobRow) : null;
}

export async function runBlogPlannerBulkJob(jobId: string, startIndex?: number): Promise<void> {
  const client = getAdminClient();
  const job = await loadJob(client, jobId);
  if (!job || job.status !== "running") return;

  const itemIds = job.item_ids ?? [];
  let index = startIndex ?? job.completed;
  const logs = [...(Array.isArray(job.logs) ? job.logs : [])];
  const deadline = Date.now() + RUN_BUDGET_MS;

  while (index < itemIds.length && Date.now() < deadline) {
    const fresh = await loadJob(client, jobId);
    if (!fresh || fresh.status !== "running") return;

    const itemId = itemIds[index]!;
    const keyword = await loadItemKeyword(client, itemId);
    await updateJob(client, jobId, { current_keyword: keyword });

    let entry: BlogPlannerBulkJobLogEntry = { itemId, keyword, ok: false };

    try {
      const result = await createBriefEditorFromPlannerItem(itemId, { awaitPipeline: true });
      entry = {
        itemId,
        keyword,
        ok: true,
        skipped: result.alreadyLinked,
        editorId: result.editorId,
      };
    } catch (err) {
      entry = {
        itemId,
        keyword,
        ok: false,
        error: err instanceof Error ? err.message : "Failed",
      };
    }

    logs.push(entry);
    index += 1;
    await updateJob(client, jobId, {
      completed: index,
      logs,
      current_keyword: index < itemIds.length ? null : null,
    });
  }

  if (index < itemIds.length) {
    const still = await loadJob(client, jobId);
    if (still?.status === "running") {
      scheduleBulkJobContinuation(jobId, index);
    }
    return;
  }

  await updateJob(client, jobId, {
    status: "completed",
    completed: itemIds.length,
    current_keyword: null,
    logs,
  });
}

function scheduleBulkJobContinuation(jobId: string, fromIndex: number): void {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) {
    after(async () => {
      try {
        await runBlogPlannerBulkJob(jobId, fromIndex);
      } catch (err) {
        console.error("[blog-planner] bulk job continuation failed:", err);
      }
    });
    return;
  }

  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const url = `${siteUrl}/api/admin/blog-planner/bulk-jobs/${jobId}/continue`;

  after(async () => {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({ from_index: fromIndex }),
      });
    } catch (err) {
      console.error("[blog-planner] bulk job chain fetch failed:", err);
      try {
        await runBlogPlannerBulkJob(jobId, fromIndex);
      } catch (inner) {
        console.error("[blog-planner] bulk job inline continuation failed:", inner);
      }
    }
  });
}

export async function startBlogPlannerBulkJob(
  itemIds: string[],
  hubTrackedPageId: string | null,
): Promise<BlogPlannerBulkJob> {
  const unique = [...new Set(itemIds.filter(Boolean))];
  if (unique.length === 0) {
    throw new ContentEditorError("No items to process.", { source: "blog-planner", status: 400 });
  }

  const client = getAdminClient();

  const { data: existing } = await client
    .from("blog_planner_bulk_jobs")
    .select("id")
    .eq("status", "running")
    .limit(1);
  if (existing && existing.length > 0) {
    throw new ContentEditorError(
      "A bulk job is already running. Wait for it to finish or cancel it from the activity panel.",
      { source: "blog-planner", status: 409 },
    );
  }

  const { data, error } = await client
    .from("blog_planner_bulk_jobs")
    .insert({
      hub_tracked_page_id: hubTrackedPageId,
      status: "running",
      item_ids: unique,
      total: unique.length,
      completed: 0,
      current_keyword: null,
      logs: [],
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new ContentEditorError(
      `Failed to start bulk job: ${error?.message ?? "unknown"}`,
      { source: "blog-planner", status: 500 },
    );
  }

  const job = rowToJob(data as JobRow);

  after(async () => {
    try {
      await runBlogPlannerBulkJob(job.id, 0);
    } catch (err) {
      console.error("[blog-planner] bulk job failed:", err);
    }
  });

  return job;
}

export async function cancelBlogPlannerBulkJob(jobId: string): Promise<BlogPlannerBulkJob | null> {
  const client = getAdminClient();
  const { data, error } = await client
    .from("blog_planner_bulk_jobs")
    .update({
      status: "cancelled",
      current_keyword: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId)
    .select("*")
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to cancel job: ${error.message}`, {
      source: "blog-planner",
      status: 500,
    });
  }
  return data ? rowToJob(data as JobRow) : null;
}

export async function handleBlogPlannerBulkJobsPost(request: Request): Promise<Response> {
  let body: { item_ids?: string[]; hub_tracked_page_id?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const itemIds = Array.isArray(body.item_ids)
    ? body.item_ids.filter((id): id is string => typeof id === "string" && id.trim().length > 0)
    : [];
  const hubId = body.hub_tracked_page_id?.trim() || null;

  try {
    const job = await startBlogPlannerBulkJob(itemIds, hubId);
    return NextResponse.json({ ok: true, job }, { status: 202 });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.status });
    }
    const msg = err instanceof Error ? err.message : "Failed to start bulk job.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerBulkJobsActiveGet(): Promise<Response> {
  try {
    const [job, lastFinished] = await Promise.all([
      getActiveBlogPlannerBulkJob(),
      getRecentlyFinishedBlogPlannerBulkJob(),
    ]);
    return NextResponse.json({ ok: true, job, last_finished: lastFinished });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load job.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerBulkJobCancelPost(
  _request: Request,
  jobId: string,
): Promise<Response> {
  if (!jobId) {
    return NextResponse.json({ ok: false, error: "job id required." }, { status: 400 });
  }
  try {
    const job = await cancelBlogPlannerBulkJob(jobId);
    return NextResponse.json({ ok: true, job });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.status });
    }
    const msg = err instanceof Error ? err.message : "Failed to cancel.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerBulkJobContinuePost(
  request: Request,
  jobId: string,
): Promise<Response> {
  if (!jobId) {
    return NextResponse.json({ ok: false, error: "job id required." }, { status: 400 });
  }

  let fromIndex: number | undefined;
  try {
    const body = (await request.json()) as { from_index?: number };
    if (typeof body.from_index === "number") fromIndex = body.from_index;
  } catch {
    /* empty body ok */
  }

  try {
    await runBlogPlannerBulkJob(jobId, fromIndex);
    const job = await getActiveBlogPlannerBulkJob();
    return NextResponse.json({ ok: true, job });
  } catch (err) {
    console.error("[blog-planner] bulk continue error:", err);
    const msg = err instanceof Error ? err.message : "Continuation failed.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
