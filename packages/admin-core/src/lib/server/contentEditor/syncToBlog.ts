/**
 * Push the current Content Editor draft into a linked blog_posts row.
 */
import { markdownToSections, type BlogSection } from "@sweetmedia/blog-core";
import { ContentEditorError } from "./errors";
import { getAdminClient, loadEditor } from "./db";
import { getContentEditorState } from "./api";
import { recordBlogPostChanges } from "../contentChangeLogServer";

function countSectionWords(sections: BlogSection[]): number {
  let total = 0;
  const count = (text: string) => {
    total += text.trim().split(/\s+/).filter(Boolean).length;
  };
  for (const s of sections) {
    if (s.text) count(s.text);
    s.items?.forEach(count);
    s.stats?.forEach((st) => {
      count(st.value);
      count(st.label);
    });
    s.tableHeaders?.forEach(count);
    s.tableRows?.forEach((row) => row.forEach(count));
  }
  return total;
}

function estimateReadTime(sections: BlogSection[]): string {
  const words = countSectionWords(sections);
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function excerptFromMarkdown(md: string, maxLen = 160): string {
  const plain = md
    .replace(/^#+\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return "";
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trim()}…`;
}

export interface SyncEditorDraftToBlogResult {
  blogPostId: string;
  slug: string;
  syncedAt: string;
  wordCount: number;
}

export async function syncEditorDraftToBlogPost(
  editorId: string,
): Promise<SyncEditorDraftToBlogResult> {
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
      "This editor is linked to a tracked page, not a blog post. Use Apply SEO Meta for pages.",
      { source: "api", status: 400 },
    );
  }

  const state = await getContentEditorState(editorId);
  const draft = state?.currentDraft;
  const bodyMd = draft?.body_markdown?.trim() ?? "";
  if (!draft || !bodyMd) {
    throw new ContentEditorError(
      "No draft to sync. Run Auto-Optimize or write content in the editor first.",
      { source: "api", status: 400 },
    );
  }

  let blogPostId = editor.blog_post_id;
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
      "No blog post is linked to this editor. Create the editor from Blog Posts (Content Editor column) first.",
      { source: "api", status: 400 },
    );
  }

  const { data: post, error: loadErr } = await client
    .from("blog_posts")
    .select("id, slug, excerpt, title, meta_title, meta_description, content")
    .eq("id", blogPostId)
    .maybeSingle();
  if (loadErr || !post) {
    throw new ContentEditorError(
      `Blog post not found: ${loadErr?.message ?? "missing row"}`,
      { source: "api", status: 404 },
    );
  }

  const sections = markdownToSections(bodyMd);
  if (sections.length === 0) {
    throw new ContentEditorError("Draft markdown did not produce any content blocks.", {
      source: "api",
      status: 400,
    });
  }

  const titleTag = (draft.title_tag ?? "").trim();
  const h1 = (draft.h1_text ?? "").trim();
  const title = h1 || titleTag || (post as { title: string }).title;
  const metaDescription = (draft.meta_description ?? "").trim();
  const excerpt = excerptFromMarkdown(bodyMd) || (post as { excerpt?: string }).excerpt || "";
  const syncedAt = new Date().toISOString();

  const updatePayload = {
    title,
    meta_title: titleTag || title,
    meta_description: metaDescription || null,
    excerpt,
    content: JSON.stringify(sections),
    read_time: estimateReadTime(sections),
    content_editor_id: editorId,
    content_editor_synced_at: syncedAt,
    updated_at: syncedAt,
  };

  const { error: updErr } = await client
    .from("blog_posts")
    .update(updatePayload)
    .eq("id", blogPostId);

  if (updErr) {
    throw new ContentEditorError(`Failed to update blog post: ${updErr.message}`, {
      source: "api",
      status: 500,
    });
  }

  const priorPost = post as {
    id: string;
    slug: string;
    title: string;
    meta_title?: string | null;
    meta_description?: string | null;
    excerpt?: string | null;
    content?: string | null;
  };
  await recordBlogPostChanges({
    entity_id: priorPost.id,
    route_path: `/blog/${priorPost.slug}`,
    prior: {
      title: priorPost.title,
      meta_title: priorPost.meta_title ?? null,
      meta_description: priorPost.meta_description ?? null,
      excerpt: priorPost.excerpt ?? null,
      content: priorPost.content ?? null,
    },
    updates: updatePayload,
  });

  if (!editor.blog_post_id) {
    await client
      .from("content_editors")
      .update({ blog_post_id: blogPostId, updated_at: syncedAt })
      .eq("id", editorId);
  }

  return {
    blogPostId,
    slug: (post as { slug: string }).slug,
    syncedAt,
    wordCount: countSectionWords(sections),
  };
}
