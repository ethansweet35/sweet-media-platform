/**
 * Pull a linked blog_posts row into the Content Editor's current draft.
 */
import { dbToBlogPost, sectionsToMarkdown, type DbBlogPost } from "@sweetmedia/blog-core";
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor } from "./db";
import { saveDraft, scoreDraft } from "./api";

export interface SyncBlogPostToEditorDraftResult {
  blogPostId: string;
  slug: string;
  wordCount: number;
  scored: boolean;
}

export async function syncBlogPostToEditorDraft(
  editorId: string,
  options?: { blogPostId?: string; scoreAfterImport?: boolean },
): Promise<SyncBlogPostToEditorDraftResult> {
  if (!editorId) {
    throw new ContentEditorError("editorId is required.", { source: "api", status: 400 });
  }

  const client = getAdminClient();
  const editor = await loadEditor(client, editorId);
  if (!editor) {
    throw new ContentEditorError("Editor not found.", { source: "api", status: 404 });
  }
  if (editor.linked_tracked_page_id) {
    throw new ContentEditorError(
      "This editor is linked to a tracked page, not a blog post.",
      { source: "api", status: 400 },
    );
  }

  let blogPostId = options?.blogPostId ?? editor.blog_post_id;
  if (!blogPostId) {
    const { data: linked } = await client
      .from("blog_posts")
      .select("id")
      .eq("content_editor_id", editorId)
      .maybeSingle();
    blogPostId = (linked as { id?: string } | null)?.id ?? null;
  }
  if (!blogPostId) {
    throw new ContentEditorError(
      "No blog post is linked to this editor. Create the editor from Blog Posts (Brief button) first.",
      { source: "api", status: 400 },
    );
  }

  const { data: post, error: loadErr } = await client
    .from("blog_posts")
    .select("id, slug, title, meta_title, meta_description, content")
    .eq("id", blogPostId)
    .maybeSingle();
  if (loadErr || !post) {
    throw new ContentEditorError(
      `Blog post not found: ${loadErr?.message ?? "missing row"}`,
      { source: "api", status: 404 },
    );
  }

  const blog = dbToBlogPost(post as DbBlogPost);
  const bodyMarkdown = sectionsToMarkdown(blog.content);
  if (!bodyMarkdown.trim()) {
    throw new ContentEditorError(
      "This blog post has no body content to import.",
      { source: "api", status: 400 },
    );
  }

  const titleTag = (blog.metaTitle ?? "").trim() || blog.title.trim();
  const h1Text = blog.title.trim();
  const metaDescription = (blog.metaDescription ?? "").trim();

  const draft = await saveDraft({
    editorId,
    titleTag: titleTag || null,
    metaDescription: metaDescription || null,
    h1Text: h1Text || null,
    bodyMarkdown,
    bodyPlaintext: bodyMarkdown,
  });

  // Draft now matches the live post — align sync marker so Blog Posts does not
  // show "Sync" until the user edits the draft again.
  const alignedAt =
    (typeof draft.updated_at === "string" ? draft.updated_at : null) ??
    new Date().toISOString();

  const { error: syncMarkerErr } = await client
    .from("blog_posts")
    .update({
      content_editor_id: editorId,
      content_editor_synced_at: alignedAt,
    })
    .eq("id", blogPostId);

  if (syncMarkerErr) {
    throw new ContentEditorError(
      `Draft imported but failed to update sync status: ${syncMarkerErr.message}`,
      { source: "api", status: 500 },
    );
  }

  if (!editor.blog_post_id) {
    await client
      .from("content_editors")
      .update({ blog_post_id: blogPostId, updated_at: alignedAt })
      .eq("id", editorId);
  }

  let scored = false;
  const shouldScore =
    options?.scoreAfterImport !== false && editor.status === "ready";
  if (shouldScore) {
    try {
      await scoreDraft({
        editorId,
        titleTag: titleTag || null,
        metaDescription: metaDescription || null,
        h1Text: h1Text || null,
        bodyMarkdown,
        bodyPlaintext: bodyMarkdown,
        persist: true,
      });
      scored = true;
    } catch {
      // Terms may still be loading; import still succeeded.
    }
  }

  return {
    blogPostId,
    slug: (post as { slug: string }).slug,
    wordCount: bodyMarkdown.trim().split(/\s+/).filter(Boolean).length,
    scored,
  };
}
