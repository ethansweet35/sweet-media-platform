/**
 * Client-safe helpers for Content Editor list rows: blog vs page linkage.
 */
import {
  computeBlogEditorSyncStatus,
  type BlogEditorSyncStatus,
} from "./contentEditorSyncStatus";

export type ContentEditorLinkKind = "blog" | "page" | "unlinked";

export type ContentEditorLinkInfo = {
  link_kind: ContentEditorLinkKind;
  /** Route path for display (e.g. /blog/slug or /about). */
  link_label: string | null;
  link_title: string | null;
  blog_post_id: string | null;
  tracked_page_id: string | null;
};

type BlogLinkRow = {
  id: string;
  slug: string;
  title: string;
  content_editor_id: string | null;
  content_editor_synced_at: string | null;
};

type PageLinkRow = {
  id: string;
  route_path: string;
  page_title: string;
  content_editor_id: string | null;
};

export function resolveContentEditorLink(
  editor: {
    id: string;
    blog_post_id: string | null;
    linked_tracked_page_id: string | null;
  },
  blogsByEditorId: Map<string, BlogLinkRow>,
  blogsByPostId: Map<string, BlogLinkRow>,
  pagesByEditorId: Map<string, PageLinkRow>,
  pagesByPageId: Map<string, PageLinkRow>,
): ContentEditorLinkInfo {
  const page =
    (editor.linked_tracked_page_id
      ? pagesByPageId.get(editor.linked_tracked_page_id)
      : null) ?? pagesByEditorId.get(editor.id) ?? null;

  if (page) {
    return {
      link_kind: "page",
      link_label: page.route_path,
      link_title: page.page_title,
      blog_post_id: null,
      tracked_page_id: page.id,
    };
  }

  const blog =
    (editor.blog_post_id ? blogsByPostId.get(editor.blog_post_id) : null) ??
    blogsByEditorId.get(editor.id) ??
    null;

  if (blog) {
    return {
      link_kind: "blog",
      link_label: `/blog/${blog.slug}`,
      link_title: blog.title,
      blog_post_id: blog.id,
      tracked_page_id: null,
    };
  }

  return {
    link_kind: "unlinked",
    link_label: null,
    link_title: null,
    blog_post_id: null,
    tracked_page_id: null,
  };
}

export function blogSyncStatusForListRow(opts: {
  link_kind: ContentEditorLinkKind;
  draft_body_present: boolean;
  draft_updated_at: string | null;
  blog_synced_at: string | null;
}): BlogEditorSyncStatus {
  if (opts.link_kind !== "blog") return "none";
  return computeBlogEditorSyncStatus({
    hasEditor: true,
    hasDraftBody: opts.draft_body_present,
    draftUpdatedAt: opts.draft_updated_at,
    syncedAt: opts.blog_synced_at,
  });
}

export const CONTENT_EDITOR_LINK_KIND_LABEL: Record<ContentEditorLinkKind, string> = {
  blog: "Blog",
  page: "Page",
  unlinked: "Unlinked",
};
