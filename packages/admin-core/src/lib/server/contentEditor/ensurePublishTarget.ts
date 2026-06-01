/**
 * Link a Content Editor to a blog post or tracked page, or create a draft post.
 */
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor, type ContentEditorRow } from "./db";
import { recordTrackedPageChanges } from "../contentChangeLogServer";

export type PublishTargetKind = "blog" | "page";

export interface EditorPublishLink {
  kind: PublishTargetKind;
  blogPostId?: string;
  trackedPageId?: string;
  slug?: string;
  routePath?: string;
}

export function slugFromKeyword(keyword: string): string {
  const base = keyword
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return (base || "post").slice(0, 80);
}

function titleFromKeyword(keyword: string): string {
  return keyword
    .trim()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

export async function resolveEditorPublishLink(
  editorId: string,
  editorRow?: ContentEditorRow | null,
): Promise<EditorPublishLink | null> {
  const client = getAdminClient();
  const editor = editorRow ?? (await loadEditor(client, editorId));
  if (!editor) return null;

  if (editor.linked_tracked_page_id) {
    const { data: page } = await client
      .from("tracked_pages")
      .select("id, route_path")
      .eq("id", editor.linked_tracked_page_id)
      .maybeSingle();
    return {
      kind: "page",
      trackedPageId: editor.linked_tracked_page_id,
      routePath: (page as { route_path?: string } | null)?.route_path,
    };
  }

  let blogPostId = editor.blog_post_id;
  if (!blogPostId) {
    const { data: linked } = await client
      .from("blog_posts")
      .select("id, slug")
      .eq("content_editor_id", editorId)
      .maybeSingle();
    blogPostId = (linked as { id?: string } | null)?.id ?? null;
    if (blogPostId && linked) {
      return {
        kind: "blog",
        blogPostId,
        slug: (linked as { slug: string }).slug,
      };
    }
  } else {
    const { data: post } = await client
      .from("blog_posts")
      .select("slug")
      .eq("id", blogPostId)
      .maybeSingle();
    return {
      kind: "blog",
      blogPostId,
      slug: (post as { slug?: string } | null)?.slug,
    };
  }

  const { data: pageOnly } = await client
    .from("tracked_pages")
    .select("id, route_path")
    .eq("content_editor_id", editorId)
    .maybeSingle();
  if (pageOnly) {
    return {
      kind: "page",
      trackedPageId: (pageOnly as { id: string }).id,
      routePath: (pageOnly as { route_path: string }).route_path,
    };
  }

  return null;
}

async function uniqueBlogSlug(base: string): Promise<string> {
  const client = getAdminClient();
  let candidate = base;
  for (let n = 0; n < 20; n++) {
    const { data } = await client
      .from("blog_posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${n + 2}`;
  }
  return `${base}-${Date.now()}`;
}

export async function ensureBlogPostForEditor(
  editorId: string,
): Promise<{ blogPostId: string; slug: string; created: boolean }> {
  const existing = await resolveEditorPublishLink(editorId);
  if (existing?.kind === "blog" && existing.blogPostId) {
    return {
      blogPostId: existing.blogPostId,
      slug: existing.slug ?? "",
      created: false,
    };
  }
  if (existing?.kind === "page") {
    throw new ContentEditorError(
      "This editor is linked to a marketing page. Unlink it before creating a blog post.",
      { source: "api", status: 400 },
    );
  }

  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }

  const keyword = editor.primary_keyword.trim();
  const slug = await uniqueBlogSlug(slugFromKeyword(keyword));
  const title = titleFromKeyword(keyword) || keyword || "New post";
  const now = new Date().toISOString();

  const { data: post, error } = await client
    .from("blog_posts")
    .insert({
      title,
      slug,
      excerpt: "",
      content: "[]",
      status: "draft",
      category: "Blog",
      author: "Editorial",
      author_title: null,
      author_bio: null,
      author_photo: null,
      hero_image_url: null,
      read_time: "5 min read",
      tags: [],
      meta_title: null,
      meta_description: null,
      focus_keyword: keyword,
      content_editor_id: editorId,
      content_editor_synced_at: null,
      created_at: now,
      updated_at: now,
    })
    .select("id, slug")
    .single();

  if (error || !post) {
    throw new ContentEditorError(
      `Failed to create blog post: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }

  await client
    .from("content_editors")
    .update({
      blog_post_id: (post as { id: string }).id,
      linked_tracked_page_id: null,
      updated_at: now,
    })
    .eq("id", editorId);

  return {
    blogPostId: (post as { id: string }).id,
    slug: (post as { slug: string }).slug,
    created: true,
  };
}

export async function linkEditorToTrackedPage(
  editorId: string,
  trackedPageId: string,
): Promise<{ trackedPageId: string; routePath: string }> {
  if (!trackedPageId) {
    throw new ContentEditorError("trackedPageId is required.", { source: "api", status: 400 });
  }

  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }

  const { data: page, error: pageErr } = await client
    .from("tracked_pages")
    .select("id, route_path, content_editor_id")
    .eq("id", trackedPageId)
    .maybeSingle();
  if (pageErr || !page) {
    throw new ContentEditorError("Tracked page not found.", { source: "api", status: 404 });
  }

  const otherEditor = (page as { content_editor_id?: string | null }).content_editor_id;
  if (otherEditor && otherEditor !== editorId) {
    throw new ContentEditorError(
      "That page is already linked to another Content Editor.",
      { source: "api", status: 409 },
    );
  }

  const now = new Date().toISOString();
  await client
    .from("content_editors")
    .update({
      linked_tracked_page_id: trackedPageId,
      blog_post_id: null,
      updated_at: now,
    })
    .eq("id", editorId);

  await client
    .from("tracked_pages")
    .update({ content_editor_id: editorId, updated_at: now })
    .eq("id", trackedPageId);

  if (editor.blog_post_id) {
    await client
      .from("blog_posts")
      .update({ content_editor_id: null, updated_at: now })
      .eq("id", editor.blog_post_id);
  }

  return {
    trackedPageId,
    routePath: (page as { route_path: string }).route_path,
  };
}

export async function applyTrackedPageSeoFromEditorDraft(
  editorId: string,
): Promise<{ routePath: string; applied: Record<string, string | null> }> {
  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor?.linked_tracked_page_id) {
    throw new ContentEditorError("Editor is not linked to a tracked page.", {
      source: "api",
      status: 400,
    });
  }

  const { data: draft } = await client
    .from("content_editor_drafts")
    .select("title_tag, meta_description")
    .eq("editor_id", editorId)
    .eq("is_current", true)
    .maybeSingle();

  const titleTag = (draft as { title_tag?: string | null } | null)?.title_tag?.trim() ?? "";
  const metaDescription =
    (draft as { meta_description?: string | null } | null)?.meta_description?.trim() ?? "";

  if (!titleTag && !metaDescription) {
    throw new ContentEditorError("Draft has no SEO title or meta description to apply.", {
      source: "api",
      status: 400,
    });
  }

  const updates: Record<string, string | null> = {};
  if (titleTag) updates.seo_title = titleTag;
  if (metaDescription) updates.meta_description = metaDescription;

  const { data: page, error: loadErr } = await client
    .from("tracked_pages")
    .select("id, route_path, seo_title, meta_description")
    .eq("id", editor.linked_tracked_page_id)
    .maybeSingle();
  if (loadErr || !page) {
    throw new ContentEditorError("Tracked page not found.", { source: "api", status: 404 });
  }

  const prior = page as {
    id: string;
    route_path: string;
    seo_title: string | null;
    meta_description: string | null;
  };

  const { error: updErr } = await client
    .from("tracked_pages")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", editor.linked_tracked_page_id);

  if (updErr) {
    throw new ContentEditorError(`Failed to update page SEO: ${updErr.message}`, {
      source: "api",
      status: 500,
    });
  }

  await recordTrackedPageChanges({
    entity_id: prior.id,
    route_path: prior.route_path,
    prior: {
      seo_title: prior.seo_title,
      meta_description: prior.meta_description,
    },
    updates,
  });

  return {
    routePath: (page as { route_path: string }).route_path,
    applied: updates,
  };
}

export async function ensurePublishTargetForAutoOptimize(
  editorId: string,
  opts: { publishTarget: PublishTargetKind; trackedPageId?: string },
): Promise<EditorPublishLink> {
  const existing = await resolveEditorPublishLink(editorId);
  if (existing) return existing;

  if (opts.publishTarget === "blog") {
    const blog = await ensureBlogPostForEditor(editorId);
    return { kind: "blog", blogPostId: blog.blogPostId, slug: blog.slug };
  }

  if (!opts.trackedPageId) {
    throw new ContentEditorError("trackedPageId is required for page publish target.", {
      source: "api",
      status: 400,
    });
  }
  const page = await linkEditorToTrackedPage(editorId, opts.trackedPageId);
  return { kind: "page", trackedPageId: page.trackedPageId, routePath: page.routePath };
}
