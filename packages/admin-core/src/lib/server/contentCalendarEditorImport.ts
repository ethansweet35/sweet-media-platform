import { NextResponse } from "next/server";
import { ContentEditorError } from "./contentEditor/errors";
import { getAdminClient, loadEditor } from "./contentEditor/db";
import { getContentEditorState } from "./contentEditor/api";
import { syncEditorDraftToBlogPost } from "./contentEditor/syncToBlog";
import { ensureBlogPostForEditor, slugFromKeyword } from "./contentEditor/ensurePublishTarget";
import { formatContentEditorBrief } from "../formatContentEditorBrief";
import type {
  CalendarEditorSourceRow,
  ImportFromEditorsInput,
} from "../../types/content-calendar-editor-import";

const MAX_IMPORT = 20;

export type { CalendarEditorSourceRow, ImportFromEditorsInput };

function titleFromKeyword(keyword: string): string {
  return keyword
    .trim()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

export async function listContentEditorsForCalendarImport(): Promise<CalendarEditorSourceRow[]> {
  const client = getAdminClient();

  const { data: editors, error } = await client
    .from("content_editors")
    .select("id, primary_keyword, status, blog_post_id, linked_tracked_page_id, updated_at")
    .is("linked_tracked_page_id", null)
    .order("updated_at", { ascending: false })
    .limit(150);

  if (error) {
    throw new ContentEditorError(`Failed to load editors: ${error.message}`, {
      source: "content-calendar",
      status: 500,
    });
  }

  const rows = (editors ?? []) as {
    id: string;
    primary_keyword: string;
    status: string;
    blog_post_id: string | null;
    linked_tracked_page_id: string | null;
  }[];

  if (rows.length === 0) return [];

  const editorIds = rows.map((r) => r.id);

  const blogPostIds = [
    ...new Set(rows.map((r) => r.blog_post_id).filter((id): id is string => !!id)),
  ];

  const [draftsRes, postsByEditorRes, postsByIdRes, queueRes] = await Promise.all([
    client
      .from("content_editor_drafts")
      .select("editor_id, word_count, body_markdown")
      .in("editor_id", editorIds)
      .eq("is_current", true),
    client
      .from("blog_posts")
      .select("id, slug, title, content_editor_id")
      .in("content_editor_id", editorIds),
    blogPostIds.length
      ? client.from("blog_posts").select("id, slug, title").in("id", blogPostIds)
      : Promise.resolve({ data: [] }),
    client
      .from("blog_queue")
      .select("content_editor_id")
      .in("content_editor_id", editorIds)
      .in("status", ["pending", "generating", "draft_ready"]),
  ]);

  const draftByEditor = new Map(
    ((draftsRes.data ?? []) as { editor_id: string; word_count?: number; body_markdown?: string }[]).map(
      (d) => [d.editor_id, d],
    ),
  );

  const postByEditor = new Map<string, { id: string; slug: string; title: string }>();
  for (const p of (postsByEditorRes.data ?? []) as {
    id: string;
    slug: string;
    title: string;
    content_editor_id?: string | null;
  }[]) {
    if (p.content_editor_id) postByEditor.set(p.content_editor_id, p);
  }

  const postById = new Map(
    ((postsByIdRes.data ?? []) as { id: string; slug: string; title: string }[]).map((p) => [
      p.id,
      p,
    ]),
  );

  const queuedEditorIds = new Set(
    ((queueRes.data ?? []) as { content_editor_id?: string | null }[])
      .map((q) => q.content_editor_id)
      .filter(Boolean) as string[],
  );

  return rows.map((e) => {
    const draft = draftByEditor.get(e.id);
    const body = (draft?.body_markdown ?? "").trim();
    const post = postByEditor.get(e.id) ?? (e.blog_post_id ? postById.get(e.blog_post_id) : undefined);

    return {
      editor_id: e.id,
      primary_keyword: e.primary_keyword,
      status: e.status,
      blog_post_id: post?.id ?? e.blog_post_id,
      blog_slug: post?.slug ?? null,
      blog_title: post?.title ?? null,
      draft_word_count: draft?.word_count ?? (body ? body.split(/\s+/).filter(Boolean).length : 0),
      has_draft_body: body.length > 0,
      already_queued: queuedEditorIds.has(e.id),
      brief_href: `/admin/content-editor/${e.id}`,
    };
  });
}

export async function importContentEditorsToBlogQueue(
  items: ImportFromEditorsInput[],
): Promise<{
  succeeded: number;
  failed: number;
  results: { editorId: string; ok: boolean; queueId?: string; error?: string }[];
}> {
  if (items.length === 0) {
    throw new ContentEditorError("Select at least one editor.", {
      source: "content-calendar",
      status: 400,
    });
  }
  if (items.length > MAX_IMPORT) {
    throw new ContentEditorError(`Maximum ${MAX_IMPORT} editors per import.`, {
      source: "content-calendar",
      status: 400,
    });
  }

  const client = getAdminClient();
  const results: { editorId: string; ok: boolean; queueId?: string; error?: string }[] = [];
  let succeeded = 0;
  let failed = 0;

  for (const item of items) {
    const editorId = item.editor_id?.trim();
    const scheduledAt = item.scheduled_publish_at?.trim();
    if (!editorId || !scheduledAt) {
      results.push({ editorId: editorId ?? "", ok: false, error: "Missing editor or schedule." });
      failed += 1;
      continue;
    }

    if (Number.isNaN(Date.parse(scheduledAt))) {
      results.push({ editorId, ok: false, error: "Invalid schedule date." });
      failed += 1;
      continue;
    }

    try {
      const editor = await loadEditor(client, editorId);
      if (!editor) {
        throw new ContentEditorError("Editor not found.", { source: "content-calendar", status: 404 });
      }
      if (editor.linked_tracked_page_id) {
        throw new ContentEditorError(
          "Page-linked editors cannot be added to the blog calendar. Use blog-linked briefs only.",
          { source: "content-calendar", status: 400 },
        );
      }

      const { data: existingQueue } = await client
        .from("blog_queue")
        .select("id")
        .eq("content_editor_id", editorId)
        .in("status", ["pending", "generating", "draft_ready"])
        .maybeSingle();
      if (existingQueue) {
        throw new ContentEditorError("This editor is already on the calendar queue.", {
          source: "content-calendar",
          status: 409,
        });
      }

      await ensureBlogPostForEditor(editorId);
      const synced = await syncEditorDraftToBlogPost(editorId);

      const state = await getContentEditorState(editorId);
      const guidelines = state
        ? formatContentEditorBrief({
            editor: state.editor,
            terms: state.terms,
            questions: state.questions,
            facts: state.facts,
            outline: state.outline,
          })
        : null;

      const keyword = editor.primary_keyword.trim();
      const title =
        state?.currentDraft?.title_tag?.trim() ||
        state?.currentDraft?.h1_text?.trim() ||
        titleFromKeyword(keyword);
      const slug = synced.slug || slugFromKeyword(keyword);

      const now = new Date().toISOString();

      await client
        .from("blog_posts")
        .update({
          scheduled_publish_at: scheduledAt,
          status: "draft",
          approved_for_publish: false,
          updated_at: now,
        })
        .eq("id", synced.blogPostId);

      const { data: queueRow, error: queueErr } = await client
        .from("blog_queue")
        .insert({
          primary_keyword: keyword,
          blog_title: title,
          url_slug: slug,
          writing_guidelines: guidelines,
          scheduled_publish_at: scheduledAt,
          status: "draft_ready",
          content_editor_id: editorId,
          generated_post_id: synced.blogPostId,
          model_id: null,
          error_message: null,
        })
        .select("id")
        .single();

      if (queueErr || !queueRow) {
        throw new ContentEditorError(
          `Failed to add to calendar queue: ${queueErr?.message ?? "unknown"}`,
          { source: "content-calendar", status: 500 },
        );
      }

      results.push({
        editorId,
        ok: true,
        queueId: (queueRow as { id: string }).id,
      });
      succeeded += 1;
    } catch (err) {
      results.push({
        editorId,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
      failed += 1;
    }
  }

  return { succeeded, failed, results };
}

export async function handleContentCalendarEditorSourcesGet(): Promise<Response> {
  try {
    const editors = await listContentEditorsForCalendarImport();
    return NextResponse.json({ ok: true, editors });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to load editors." },
      { status: 500 },
    );
  }
}

export async function handleContentCalendarImportFromEditorsPost(
  request: Request,
): Promise<Response> {
  let body: { items?: ImportFromEditorsInput[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];

  try {
    const result = await importContentEditorsToBlogQueue(items);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Import failed." },
      { status: 500 },
    );
  }
}
