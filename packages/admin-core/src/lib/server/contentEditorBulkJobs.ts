/**
 * Background bulk create for Content Editor list (blogs or page-linked briefs).
 */
import { NextResponse } from "next/server";
import { after } from "next/server";
import { ContentEditorError } from "./contentEditor/errors";
import { getAdminClient } from "./contentEditor/db";
import { createContentEditor, saveDraft } from "./contentEditor/api";
import { runContentEditorPipeline } from "./contentEditor/pipeline";
import {
  ensureBlogPostForEditor,
  linkEditorToTrackedPage,
} from "./contentEditor/ensurePublishTarget";
import { parseBulkCreateLines } from "../contentEditorBulkCreateParse";
import type {
  ContentEditorBulkJob,
  ContentEditorBulkJobItem,
  ContentEditorBulkJobLogEntry,
  ContentEditorBulkPublishTarget,
} from "../../types/content-editor-bulk-job";

const RUN_BUDGET_MS = 270_000;
const MAX_ITEMS = 25;

type JobRow = {
  id: string;
  publish_target: ContentEditorBulkPublishTarget;
  analysis_mode: "lite" | "deep";
  status: string;
  items: ContentEditorBulkJobItem[] | null;
  total: number;
  completed: number;
  current_keyword: string | null;
  logs: ContentEditorBulkJobLogEntry[] | null;
  created_at: string;
  updated_at: string;
};

function titleFromKeyword(keyword: string): string {
  return keyword
    .trim()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function normalizeRoutePath(route: string): string {
  const t = route.trim();
  if (!t) return "";
  return t.startsWith("/") ? t : `/${t}`;
}

function rowToJob(row: JobRow): ContentEditorBulkJob {
  return {
    id: row.id,
    publish_target: row.publish_target,
    analysis_mode: row.analysis_mode,
    status: row.status as ContentEditorBulkJob["status"],
    items: Array.isArray(row.items) ? row.items : [],
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
    .from("content_editor_bulk_jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load bulk job: ${error.message}`, {
      source: "content-editor",
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
    logs: ContentEditorBulkJobLogEntry[];
  }>,
): Promise<void> {
  const { error } = await client
    .from("content_editor_bulk_jobs")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", jobId);
  if (error) {
    throw new ContentEditorError(`Failed to update bulk job: ${error.message}`, {
      source: "content-editor",
      status: 500,
    });
  }
}

async function resolveTrackedPageId(
  client: ReturnType<typeof getAdminClient>,
  item: ContentEditorBulkJobItem,
): Promise<string> {
  if (item.tracked_page_id?.trim()) return item.tracked_page_id.trim();
  const route = normalizeRoutePath(item.route_path ?? "");
  if (!route) {
    throw new ContentEditorError("Page route is required for page targets.", {
      source: "content-editor",
      status: 400,
    });
  }
  const { data, error } = await client
    .from("tracked_pages")
    .select("id, route_path, page_title, content_editor_id")
    .eq("route_path", route)
    .maybeSingle();
  if (error || !data) {
    throw new ContentEditorError(`Tracked page not found for route: ${route}`, {
      source: "content-editor",
      status: 404,
    });
  }
  const page = data as {
    id: string;
    content_editor_id?: string | null;
    page_title?: string | null;
  };
  if (page.content_editor_id) {
    throw new ContentEditorError(
      `${route} is already linked to another Content Editor.`,
      { source: "content-editor", status: 409 },
    );
  }
  return page.id;
}

async function processBulkItem(
  item: ContentEditorBulkJobItem,
  publishTarget: ContentEditorBulkPublishTarget,
  analysisMode: "lite" | "deep",
): Promise<{ editorId: string; blogSlug?: string }> {
  const keyword = item.keyword.trim();
  if (!keyword) {
    throw new ContentEditorError("Keyword is required.", { source: "content-editor", status: 400 });
  }

  const client = getAdminClient();
  let trackedPageId: string | null = null;

  if (publishTarget === "page") {
    trackedPageId = await resolveTrackedPageId(client, item);
  }

  const editor = await createContentEditor({
    primaryKeyword: keyword,
    analysisMode,
    trackedPageId,
  });

  await saveDraft({
    editorId: editor.id,
    titleTag: titleFromKeyword(keyword),
    h1Text: titleFromKeyword(keyword),
  });

  let blogSlug: string | undefined;
  if (publishTarget === "blog") {
    const blog = await ensureBlogPostForEditor(editor.id);
    blogSlug = blog.slug;
  } else if (trackedPageId) {
    await linkEditorToTrackedPage(editor.id, trackedPageId);
  }

  await runContentEditorPipeline({ editorId: editor.id });

  return { editorId: editor.id, blogSlug };
}

export async function getActiveContentEditorBulkJob(): Promise<ContentEditorBulkJob | null> {
  const client = getAdminClient();
  const { data, error } = await client
    .from("content_editor_bulk_jobs")
    .select("*")
    .eq("status", "running")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load active job: ${error.message}`, {
      source: "content-editor",
      status: 500,
    });
  }
  return data ? rowToJob(data as JobRow) : null;
}

const RECENT_FINISH_MS = 120_000;

export async function getRecentlyFinishedContentEditorBulkJob(): Promise<ContentEditorBulkJob | null> {
  const client = getAdminClient();
  const since = new Date(Date.now() - RECENT_FINISH_MS).toISOString();
  const { data, error } = await client
    .from("content_editor_bulk_jobs")
    .select("*")
    .in("status", ["completed", "cancelled"])
    .gte("updated_at", since)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) return null;
  return data ? rowToJob(data as JobRow) : null;
}

export async function runContentEditorBulkJob(jobId: string, startIndex?: number): Promise<void> {
  const client = getAdminClient();
  const job = await loadJob(client, jobId);
  if (!job || job.status !== "running") return;

  const items = Array.isArray(job.items) ? job.items : [];
  let index = startIndex ?? job.completed;
  const logs = [...(Array.isArray(job.logs) ? job.logs : [])];
  const deadline = Date.now() + RUN_BUDGET_MS;

  while (index < items.length && Date.now() < deadline) {
    const fresh = await loadJob(client, jobId);
    if (!fresh || fresh.status !== "running") return;

    const item = items[index]!;
    const label =
      fresh.publish_target === "page"
        ? `${item.route_path ?? item.keyword}`
        : item.keyword;
    await updateJob(client, jobId, { current_keyword: label });

    let entry: ContentEditorBulkJobLogEntry = {
      keyword: item.keyword,
      route_path: item.route_path ?? null,
      ok: false,
    };

    try {
      const result = await processBulkItem(
        item,
        fresh.publish_target,
        fresh.analysis_mode === "deep" ? "deep" : "lite",
      );
      entry = {
        keyword: item.keyword,
        route_path: item.route_path ?? null,
        ok: true,
        editorId: result.editorId,
        blogSlug: result.blogSlug,
      };
    } catch (err) {
      entry = {
        keyword: item.keyword,
        route_path: item.route_path ?? null,
        ok: false,
        error: err instanceof Error ? err.message : "Failed",
      };
    }

    logs.push(entry);
    index += 1;
    await updateJob(client, jobId, {
      completed: index,
      logs,
      current_keyword: null,
    });
  }

  if (index < items.length) {
    const still = await loadJob(client, jobId);
    if (still?.status === "running") {
      scheduleBulkJobContinuation(jobId, index);
    }
    return;
  }

  await updateJob(client, jobId, {
    status: "completed",
    completed: items.length,
    current_keyword: null,
    logs,
  });
}

function scheduleBulkJobContinuation(jobId: string, fromIndex: number): void {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) {
    after(async () => {
      try {
        await runContentEditorBulkJob(jobId, fromIndex);
      } catch (err) {
        console.error("[content-editor] bulk job continuation failed:", err);
      }
    });
    return;
  }

  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const url = `${siteUrl}/api/admin/content-editor/bulk-jobs/${jobId}/continue`;

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
      console.error("[content-editor] bulk job chain fetch failed:", err);
      try {
        await runContentEditorBulkJob(jobId, fromIndex);
      } catch (inner) {
        console.error("[content-editor] bulk job inline continuation failed:", inner);
      }
    }
  });
}

export { parseBulkCreateLines } from "../contentEditorBulkCreateParse";

export async function startContentEditorBulkJob(input: {
  publishTarget: ContentEditorBulkPublishTarget;
  analysisMode: "lite" | "deep";
  items: ContentEditorBulkJobItem[];
}): Promise<ContentEditorBulkJob> {
  const items = input.items.filter((i) => i.keyword.trim());
  if (items.length === 0) {
    throw new ContentEditorError("Add at least one keyword or page line.", {
      source: "content-editor",
      status: 400,
    });
  }
  if (items.length > MAX_ITEMS) {
    throw new ContentEditorError(`Maximum ${MAX_ITEMS} items per bulk job.`, {
      source: "content-editor",
      status: 400,
    });
  }

  const client = getAdminClient();

  const { data: existing } = await client
    .from("content_editor_bulk_jobs")
    .select("id")
    .eq("status", "running")
    .limit(1);
  if (existing && existing.length > 0) {
    throw new ContentEditorError(
      "A bulk create job is already running. Wait for it to finish or cancel it from the activity panel.",
      { source: "content-editor", status: 409 },
    );
  }

  const { data, error } = await client
    .from("content_editor_bulk_jobs")
    .insert({
      publish_target: input.publishTarget,
      analysis_mode: input.analysisMode,
      status: "running",
      items,
      total: items.length,
      completed: 0,
      current_keyword: null,
      logs: [],
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new ContentEditorError(
      `Failed to start bulk job: ${error?.message ?? "unknown"}`,
      { source: "content-editor", status: 500 },
    );
  }

  const job = rowToJob(data as JobRow);

  after(async () => {
    try {
      await runContentEditorBulkJob(job.id, 0);
    } catch (err) {
      console.error("[content-editor] bulk job failed:", err);
    }
  });

  return job;
}

export async function cancelContentEditorBulkJob(
  jobId: string,
): Promise<ContentEditorBulkJob | null> {
  const client = getAdminClient();
  const { data, error } = await client
    .from("content_editor_bulk_jobs")
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
      source: "content-editor",
      status: 500,
    });
  }
  return data ? rowToJob(data as JobRow) : null;
}

export async function handleContentEditorBulkJobsPost(request: Request): Promise<Response> {
  let body: {
    publish_target?: ContentEditorBulkPublishTarget;
    analysis_mode?: "lite" | "deep";
    items?: ContentEditorBulkJobItem[];
    lines?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const publishTarget = body.publish_target === "page" ? "page" : "blog";
  const analysisMode = body.analysis_mode === "deep" ? "deep" : "lite";
  let items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0 && typeof body.lines === "string") {
    items = parseBulkCreateLines(body.lines, publishTarget);
  }

  try {
    const job = await startContentEditorBulkJob({ publishTarget, analysisMode, items });
    return NextResponse.json({ ok: true, job }, { status: 202 });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to start bulk job." },
      { status: 500 },
    );
  }
}

export async function handleContentEditorBulkJobsActiveGet(): Promise<Response> {
  try {
    const job = await getActiveContentEditorBulkJob();
    const lastFinished = job ? null : await getRecentlyFinishedContentEditorBulkJob();
    return NextResponse.json({ ok: true, job, last_finished: lastFinished });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to load bulk jobs.",
      },
      { status: 500 },
    );
  }
}

export async function handleContentEditorBulkJobCancelPost(
  _request: Request,
  jobId: string,
): Promise<Response> {
  try {
    const job = await cancelContentEditorBulkJob(jobId);
    return NextResponse.json({ ok: true, job });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Cancel failed." },
      { status: 500 },
    );
  }
}

export async function handleContentEditorBulkJobContinuePost(
  request: Request,
  jobId: string,
): Promise<Response> {
  let fromIndex: number | undefined;
  try {
    const body = (await request.json()) as { from_index?: number };
    if (typeof body.from_index === "number" && Number.isFinite(body.from_index)) {
      fromIndex = body.from_index;
    }
  } catch {
    /* empty body ok */
  }

  try {
    await runContentEditorBulkJob(jobId, fromIndex);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[content-editor] bulk continue failed:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Continue failed." },
      { status: 500 },
    );
  }
}
