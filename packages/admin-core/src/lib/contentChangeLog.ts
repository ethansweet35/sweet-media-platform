/** Client-safe helpers for content change logging (field labels + diff builders). */

import { SEO_OVERRIDE_KEY_LIST } from "../components/page-editor/pageEditorSeoTypes";

const SEO_OVERRIDE_KEY_SET = new Set<string>(SEO_OVERRIDE_KEY_LIST);

export type ContentEntityType = "page" | "blog";

export type ContentChangeInput = {
  field_key: string;
  field_label: string;
  summary: string;
  old_value?: string | null;
  new_value?: string | null;
};

const MAX_VALUE_LEN = 120;

function norm(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function truncate(s: string, max = MAX_VALUE_LEN): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function changeSummary(label: string, oldVal: string, newVal: string): string {
  if (!oldVal && newVal) return `${label} set`;
  if (oldVal && !newVal) return `${label} cleared`;
  return `${label} updated`;
}

function pushIfChanged(
  changes: ContentChangeInput[],
  field_key: string,
  field_label: string,
  oldRaw: unknown,
  newRaw: unknown,
) {
  const oldVal = norm(oldRaw);
  const newVal = norm(newRaw);
  if (oldVal === newVal) return;
  changes.push({
    field_key,
    field_label,
    summary: changeSummary(field_label, oldVal, newVal),
    old_value: oldVal || null,
    new_value: newVal || null,
  });
}

export function diffTrackedPageUpdates(
  prior: {
    page_title?: string;
    seo_title?: string | null;
    meta_description?: string | null;
    primary_keyword?: string | null;
    route_path?: string;
    is_active?: boolean;
    notes?: string | null;
    is_blog_hub?: boolean;
    blog_hub_target_count?: number | null;
    default_seo_title?: string | null;
  },
  updates: {
    page_title?: string;
    seo_title?: string | null;
    meta_description?: string | null;
    primary_keyword?: string | null;
    route_path?: string;
    is_active?: boolean;
    notes?: string | null;
    is_blog_hub?: boolean;
    blog_hub_target_count?: number | null;
    default_seo_title?: string | null;
  },
): ContentChangeInput[] {
  const changes: ContentChangeInput[] = [];
  pushIfChanged(changes, "page_title", "Page title", prior.page_title, updates.page_title);
  pushIfChanged(changes, "seo_title", "SEO title", prior.seo_title, updates.seo_title);
  pushIfChanged(changes, "meta_description", "Meta description", prior.meta_description, updates.meta_description);
  pushIfChanged(changes, "primary_keyword", "Primary keyword", prior.primary_keyword, updates.primary_keyword);
  pushIfChanged(changes, "route_path", "Route", prior.route_path, updates.route_path);
  if (updates.is_active !== undefined && prior.is_active !== updates.is_active) {
    changes.push({
      field_key: "is_active",
      field_label: "Status",
      summary: updates.is_active ? "Page activated" : "Page deactivated",
      old_value: prior.is_active ? "active" : "inactive",
      new_value: updates.is_active ? "active" : "inactive",
    });
  }
  pushIfChanged(changes, "notes", "Notes", prior.notes, updates.notes);
  if (updates.is_blog_hub !== undefined && prior.is_blog_hub !== updates.is_blog_hub) {
    changes.push({
      field_key: "is_blog_hub",
      field_label: "Blog hub",
      summary: updates.is_blog_hub ? "Marked as blog hub" : "Removed from blog hubs",
      old_value: prior.is_blog_hub ? "yes" : "no",
      new_value: updates.is_blog_hub ? "yes" : "no",
    });
  }
  pushIfChanged(
    changes,
    "blog_hub_target_count",
    "Blog hub target",
    prior.blog_hub_target_count,
    updates.blog_hub_target_count,
  );
  pushIfChanged(changes, "default_seo_title", "Default SEO title", prior.default_seo_title, updates.default_seo_title);
  return changes;
}

function humanizeOverrideFieldKey(fieldKey: string): string {
  return fieldKey
    .split(".")
    .map((part) => part.replace(/_/g, " "))
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" · ");
}

function formatOverrideLogValue(fieldKey: string, value: string): string {
  if (!value) return "";
  const lowerKey = fieldKey.toLowerCase();
  if (lowerKey.includes("image") || lowerKey.includes("icon") || value.startsWith("http")) {
    return truncate(value);
  }
  if (value.length > MAX_VALUE_LEN) return `${value.length} chars`;
  return truncate(value);
}

/** Diff non-SEO page_content_overrides rows when drafts are published live. */
export function diffPageContentOverridePublishes(
  rows: Array<{ field_key: string; draft_value: string | null; published_value: string | null }>,
): ContentChangeInput[] {
  const changes: ContentChangeInput[] = [];
  for (const row of rows) {
    if (SEO_OVERRIDE_KEY_SET.has(row.field_key)) continue;
    const oldVal = norm(row.published_value);
    const newVal = norm(row.draft_value);
    if (oldVal === newVal) continue;
    const label = humanizeOverrideFieldKey(row.field_key);
    changes.push({
      field_key: row.field_key,
      field_label: label,
      summary: changeSummary(label, oldVal, newVal),
      old_value: formatOverrideLogValue(row.field_key, oldVal) || null,
      new_value: formatOverrideLogValue(row.field_key, newVal) || null,
    });
  }
  return changes;
}

/** Map a client BlogPost to DB-shaped fields for change diffing. */
export function blogPostForChangeDiff(post: {
  title: string;
  slug: string;
  metaTitle?: string | null;
  metaDescription?: string;
  focus_keyword?: string | null;
  status?: string;
  content?: unknown;
}): Record<string, unknown> {
  return {
    title: post.title,
    slug: post.slug,
    seo_title: post.metaTitle ?? null,
    meta_title: post.metaTitle ?? null,
    meta_description: post.metaDescription ?? "",
    focus_keyword: post.focus_keyword ?? null,
    status: post.status ?? "draft",
    content: typeof post.content === "string" ? post.content : JSON.stringify(post.content ?? ""),
  };
}

export function diffBlogPostUpdates(
  prior: Record<string, unknown>,
  updates: Record<string, unknown>,
): ContentChangeInput[] {
  const changes: ContentChangeInput[] = [];
  const fields: [string, string][] = [
    ["title", "Title"],
    ["slug", "Slug"],
    ["seo_title", "SEO title"],
    ["seo_description", "SEO description"],
    ["meta_title", "Meta title"],
    ["meta_description", "Meta description"],
    ["focus_keyword", "Focus keyword"],
    ["status", "Status"],
    ["excerpt", "Excerpt"],
  ];

  for (const [key, label] of fields) {
    if (updates[key] !== undefined) {
      pushIfChanged(changes, key, label, prior[key], updates[key]);
    }
  }

  if (updates.content !== undefined) {
    const oldLen = norm(prior.content).length;
    const newLen = norm(updates.content).length;
    if (oldLen !== newLen || norm(prior.content) !== norm(updates.content)) {
      changes.push({
        field_key: "content",
        field_label: "Content",
        summary: "Post body updated",
        old_value: oldLen ? `${oldLen} chars` : null,
        new_value: newLen ? `${newLen} chars` : null,
      });
    }
  }

  return changes;
}

/** Fire-and-forget POST to record changes (never throws). */
export async function postContentChangeLog(payload: {
  entity_type: ContentEntityType;
  entity_id: string;
  route_path: string;
  changes: ContentChangeInput[];
  changed_by?: string | null;
}): Promise<void> {
  if (!payload.changes.length) return;
  try {
    await fetch("/api/admin/content-change-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* non-blocking */
  }
}

export function formatChangeValue(value: string | null | undefined): string {
  if (!value) return "—";
  return truncate(value);
}
