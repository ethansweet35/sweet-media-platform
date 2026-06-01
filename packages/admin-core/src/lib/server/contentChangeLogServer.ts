import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  diffBlogPostUpdates,
  diffTrackedPageUpdates,
  type ContentChangeInput,
  type ContentEntityType,
} from "../contentChangeLog";

export type ContentChangeLogRow = {
  id: string;
  entity_type: ContentEntityType;
  entity_id: string;
  route_path: string;
  field_key: string;
  field_label: string;
  summary: string;
  old_value: string | null;
  new_value: string | null;
  changed_by: string | null;
  created_at: string;
};

function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function siteId(): string {
  return process.env.NEXT_PUBLIC_SITE_ID?.trim() || "";
}

export async function insertContentChangeLogEntries(payload: {
  entity_type: ContentEntityType;
  entity_id: string;
  route_path: string;
  changes: ContentChangeInput[];
  changed_by?: string | null;
}): Promise<{ ok: true; inserted: number } | { ok: false; error: string }> {
  const client = getAdminClient();
  if (!client) return { ok: false, error: "Supabase service role is not configured." };
  if (!payload.changes.length) return { ok: true, inserted: 0 };

  const rows = payload.changes.map((c) => ({
    site_id: siteId(),
    entity_type: payload.entity_type,
    entity_id: payload.entity_id,
    route_path: payload.route_path,
    field_key: c.field_key,
    field_label: c.field_label,
    summary: c.summary,
    old_value: c.old_value ?? null,
    new_value: c.new_value ?? null,
    changed_by: payload.changed_by?.trim() || null,
  }));

  const { error } = await client.from("content_change_log").insert(rows);
  if (error) return { ok: false, error: error.message };
  return { ok: true, inserted: rows.length };
}

/** Non-blocking server-side logging for tracked page edits. */
export async function recordTrackedPageChanges(opts: {
  entity_id: string;
  route_path: string;
  prior: Parameters<typeof diffTrackedPageUpdates>[0];
  updates: Parameters<typeof diffTrackedPageUpdates>[1];
  changed_by?: string | null;
}): Promise<void> {
  const changes = diffTrackedPageUpdates(opts.prior, opts.updates);
  if (!changes.length) return;
  const result = await insertContentChangeLogEntries({
    entity_type: "page",
    entity_id: opts.entity_id,
    route_path: opts.route_path,
    changes,
    changed_by: opts.changed_by,
  });
  if (!result.ok) {
    console.warn("[content_change_log] failed to record page changes:", result.error);
  }
}

/** Non-blocking server-side logging for blog post edits. */
export async function recordBlogPostChanges(opts: {
  entity_id: string;
  route_path: string;
  prior: Record<string, unknown>;
  updates: Record<string, unknown>;
  changed_by?: string | null;
}): Promise<void> {
  const changes = diffBlogPostUpdates(opts.prior, opts.updates);
  if (!changes.length) return;
  const result = await insertContentChangeLogEntries({
    entity_type: "blog",
    entity_id: opts.entity_id,
    route_path: opts.route_path,
    changes,
    changed_by: opts.changed_by,
  });
  if (!result.ok) {
    console.warn("[content_change_log] failed to record blog changes:", result.error);
  }
}

/** Log routes discovered by post-build sync-tracked-pages. */
export async function recordNewTrackedPageInventoryEntries(
  pages: Array<{ id: string; route_path: string }>,
  changed_by = "system:sync-tracked-pages",
): Promise<void> {
  for (const page of pages) {
    const result = await insertContentChangeLogEntries({
      entity_type: "page",
      entity_id: page.id,
      route_path: page.route_path,
      changes: [
        {
          field_key: "route_path",
          field_label: "Route",
          summary: "Page added to inventory",
          old_value: null,
          new_value: page.route_path,
        },
      ],
      changed_by,
    });
    if (!result.ok) {
      console.warn(
        `[content_change_log] failed to record inventory sync for ${page.route_path}:`,
        result.error,
      );
    }
  }
}

export async function fetchContentChangeLog(
  entity_type: ContentEntityType,
  entity_id: string,
  limit = 20,
): Promise<ContentChangeLogRow[]> {
  const client = getAdminClient();
  if (!client) return [];

  const { data, error } = await client
    .from("content_change_log")
    .select(
      "id, entity_type, entity_id, route_path, field_key, field_label, summary, old_value, new_value, changed_by, created_at",
    )
    .eq("site_id", siteId())
    .eq("entity_type", entity_type)
    .eq("entity_id", entity_id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as ContentChangeLogRow[];
}

/** Recent SEO/content edits across the whole site (dashboard Performance tab). */
export async function fetchRecentSiteContentChanges(limit = 12): Promise<ContentChangeLogRow[]> {
  const client = getAdminClient();
  if (!client) return [];

  const { data, error } = await client
    .from("content_change_log")
    .select(
      "id, entity_type, entity_id, route_path, field_key, field_label, summary, old_value, new_value, changed_by, created_at",
    )
    .eq("site_id", siteId())
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as ContentChangeLogRow[];
}

export async function handleContentChangeLogPost(request: Request): Promise<Response> {
  let body: {
    entity_type?: ContentEntityType;
    entity_id?: string;
    route_path?: string;
    changes?: ContentChangeInput[];
    changed_by?: string | null;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const entity_type = body.entity_type;
  const entity_id = body.entity_id?.trim();
  const route_path = body.route_path?.trim() ?? "";
  const changes = body.changes ?? [];

  if (entity_type !== "page" && entity_type !== "blog") {
    return Response.json({ ok: false, error: "entity_type must be page or blog." }, { status: 400 });
  }
  if (!entity_id) {
    return Response.json({ ok: false, error: "entity_id is required." }, { status: 400 });
  }

  const result = await insertContentChangeLogEntries({
    entity_type,
    entity_id,
    route_path,
    changes,
    changed_by: body.changed_by,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 500 });
  }
  return Response.json({ ok: true, inserted: result.inserted });
}
