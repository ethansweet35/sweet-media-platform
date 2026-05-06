import { supabase } from "./supabase";
import type { ContentBlock } from "../types/content-links";

export function extractLinksFromText(text: string): Array<{ anchorText: string; url: string }> {
  const links: Array<{ anchorText: string; url: string }> = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push({ anchorText: match[1], url: match[2] });
  }
  return links;
}

export function extractLinksFromBlock(block: ContentBlock): Array<{ anchorText: string; url: string }> {
  const links: Array<{ anchorText: string; url: string }> = [];
  if (block.text) links.push(...extractLinksFromText(block.text));
  if (block.items) block.items.forEach((item) => links.push(...extractLinksFromText(item)));
  if (block.tableRows) {
    block.tableRows.forEach((row) =>
      row.forEach((cell) => links.push(...extractLinksFromText(cell)))
    );
  }
  return links;
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function buildLinkRegex(url: string): RegExp {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\[([^\\]]+)\\]\\(${escaped}\\)`, "g");
}

export function applyToBlock(
  block: ContentBlock,
  blockIndex: number,
  targetIndex: number,
  transform: (text: string) => string
): ContentBlock {
  if (blockIndex !== targetIndex) return block;
  const updated = { ...block };
  if (updated.text) updated.text = transform(updated.text);
  if (updated.items) updated.items = updated.items.map(transform);
  if (updated.tableRows) updated.tableRows = updated.tableRows.map((row) => row.map(transform));
  return updated;
}

export async function fetchPostContent(slug: string): Promise<ContentBlock[]> {
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("content")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !post) throw new Error("Could not load post");
  return typeof post.content === "string" ? JSON.parse(post.content) : post.content;
}

export async function savePostContent(slug: string, blocks: ContentBlock[]): Promise<void> {
  const { error } = await supabase
    .from("blog_posts")
    .update({ content: JSON.stringify(blocks) })
    .eq("slug", slug);
  if (error) throw error;
}
