/** Client-safe helpers for content change logging (field labels + diff builders). */

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
  },
  updates: {
    page_title?: string;
    seo_title?: string | null;
    meta_description?: string | null;
    primary_keyword?: string | null;
    route_path?: string;
    is_active?: boolean;
    notes?: string | null;
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
