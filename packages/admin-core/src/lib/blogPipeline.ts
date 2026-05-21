import type { BlogPost, BlogSection } from "@sweetmedia/blog-core";
import type { BlogQueueItem } from "../types/blog-queue";

export type PipelineStageId =
  | "queued"
  | "draft"
  | "seo"
  | "review"
  | "scheduled"
  | "published";

export interface PipelineStageMeta {
  id: PipelineStageId;
  label: string;
  shortLabel: string;
  icon: string;
  hint: string;
}

export const PIPELINE_STAGES: PipelineStageMeta[] = [
  {
    id: "queued",
    label: "Queued",
    shortLabel: "Queue",
    icon: "ri-time-line",
    hint: "Waiting for AI generation",
  },
  {
    id: "draft",
    label: "In draft",
    shortLabel: "Draft",
    icon: "ri-draft-line",
    hint: "Content or hero image still needed",
  },
  {
    id: "seo",
    label: "Needs SEO",
    shortLabel: "SEO",
    icon: "ri-search-eye-line",
    hint: "Add keyword and meta tags",
  },
  {
    id: "review",
    label: "Ready to approve",
    shortLabel: "Review",
    icon: "ri-checkbox-circle-line",
    hint: "Approve for auto-publish",
  },
  {
    id: "scheduled",
    label: "Scheduled",
    shortLabel: "Scheduled",
    icon: "ri-calendar-check-line",
    hint: "Approved with a publish date",
  },
  {
    id: "published",
    label: "Published",
    shortLabel: "Live",
    icon: "ri-global-line",
    hint: "Live on the site",
  },
];

export interface PipelineChecks {
  hasContent: boolean;
  hasImage: boolean;
  hasKeyword: boolean;
  hasMeta: boolean;
  isApproved: boolean;
  isScheduled: boolean;
}

export interface PipelineAttentionItem {
  id: string;
  kind: "post" | "queue";
  severity: "high" | "medium";
  title: string;
  message: string;
  href: string;
  actionLabel: string;
}

export interface PipelineCard {
  id: string;
  kind: "post" | "queue";
  stage: PipelineStageId;
  title: string;
  subtitle?: string;
  href: string;
  previewHref?: string;
  checks: PipelineChecks;
  attention: string[];
  scheduledAt?: string | null;
  updatedAt?: string;
}

function countWordsInSections(sections: BlogSection[]): number {
  let total = 0;
  for (const s of sections) {
    if (s.text) total += s.text.trim().split(/\s+/).filter(Boolean).length;
    if (s.items) s.items.forEach((item) => { total += item.trim().split(/\s+/).filter(Boolean).length; });
  }
  return total;
}

export function computePipelineChecks(post: BlogPost): PipelineChecks {
  const words = countWordsInSections(post.content ?? []);
  const scheduledAt = post.scheduled_publish_at?.trim();
  const scheduledMs = scheduledAt ? new Date(scheduledAt).getTime() : NaN;

  return {
    hasContent: words >= 300,
    hasImage: Boolean(post.image?.trim()),
    hasKeyword: Boolean(post.focus_keyword?.trim()),
    hasMeta: Boolean(
      (post.metaTitle?.trim() && post.metaTitle.trim().length > 4) ||
        (post.metaDescription?.trim() && post.metaDescription.trim().length > 20),
    ),
    isApproved: post.approved_for_publish === true,
    isScheduled: Boolean(scheduledAt && !Number.isNaN(scheduledMs) && scheduledMs > Date.now()),
  };
}

export function resolvePostPipelineStage(post: BlogPost): PipelineStageId {
  if (post.status === "published") return "published";

  const checks = computePipelineChecks(post);

  if (checks.isApproved && checks.isScheduled) return "scheduled";
  if (checks.isApproved) return "review";

  if (!checks.hasKeyword || !checks.hasMeta) return "seo";
  if (!checks.hasContent || !checks.hasImage) return "draft";

  return "review";
}

export function buildPostAttention(post: BlogPost, checks: PipelineChecks): string[] {
  if (post.status === "published") return [];

  const items: string[] = [];
  if (!checks.hasContent) items.push("Add more body content");
  if (!checks.hasImage) items.push("Add hero image");
  if (!checks.hasKeyword) items.push("Set primary keyword");
  if (!checks.hasMeta) items.push("Add SEO title & description");
  if (checks.hasContent && checks.hasImage && checks.hasKeyword && checks.hasMeta && !checks.isApproved) {
    items.push("Approve for publish");
  }
  return items;
}

export function postToPipelineCard(post: BlogPost): PipelineCard {
  const checks = computePipelineChecks(post);
  const stage = resolvePostPipelineStage(post);
  const isDraft = post.status === "draft";

  return {
    id: post.id,
    kind: "post",
    stage,
    title: post.title,
    subtitle: post.slug ? `/${post.slug}` : undefined,
    href: `/admin/blog-edit/${encodeURIComponent(post.slug)}`,
    previewHref: isDraft
      ? `/blog/${encodeURIComponent(post.slug)}?preview=admin`
      : `/blog/${encodeURIComponent(post.slug)}`,
    checks,
    attention: buildPostAttention(post, checks),
    scheduledAt: post.scheduled_publish_at ?? null,
    updatedAt: post.createdAt,
  };
}

export function queueToPipelineCard(item: BlogQueueItem): PipelineCard {
  const failed = item.status === "failed";
  const stage: PipelineStageId = failed ? "draft" : "queued";

  return {
    id: item.id,
    kind: "queue",
    stage,
    title: item.blog_title || item.primary_keyword,
    subtitle: item.url_slug ? `/${item.url_slug}` : item.primary_keyword,
    href: item.generated_post_id
      ? `/admin/blogs`
      : "/admin/content-calendar",
    checks: {
      hasContent: item.status === "draft_ready",
      hasImage: false,
      hasKeyword: Boolean(item.primary_keyword?.trim()),
      hasMeta: false,
      isApproved: false,
      isScheduled: Boolean(item.scheduled_publish_at),
    },
    attention: failed
      ? [item.error_message?.trim() || "Generation failed"]
      : item.status === "pending"
        ? ["Waiting in queue"]
        : item.status === "generating"
          ? ["Generating draft…"]
          : [],
    scheduledAt: item.scheduled_publish_at,
    updatedAt: item.updated_at,
  };
}

export function buildPipelineAttentionItems(
  posts: BlogPost[],
  queue: BlogQueueItem[],
): PipelineAttentionItem[] {
  const items: PipelineAttentionItem[] = [];

  for (const item of queue) {
    if (item.status === "failed") {
      items.push({
        id: `queue-${item.id}`,
        kind: "queue",
        severity: "high",
        title: item.blog_title || item.primary_keyword,
        message: item.error_message?.trim() || "Blog queue item failed",
        href: "/admin/content-calendar",
        actionLabel: "Open calendar",
      });
    }
  }

  for (const post of posts) {
    if (post.status === "published") continue;
    const checks = computePipelineChecks(post);
    const attention = buildPostAttention(post, checks);
    if (attention.length === 0) continue;

    const severity: "high" | "medium" =
      !checks.hasContent || !checks.hasImage ? "high" : "medium";

    items.push({
      id: `post-${post.id}`,
      kind: "post",
      severity,
      title: post.title,
      message: attention[0] ?? "Needs attention",
      href: `/admin/blog-edit/${encodeURIComponent(post.slug)}`,
      actionLabel: "Edit post",
    });
  }

  return items.sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === "high" ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

export function groupPipelineCards(cards: PipelineCard[]): Record<PipelineStageId, PipelineCard[]> {
  const grouped = Object.fromEntries(
    PIPELINE_STAGES.map((s) => [s.id, [] as PipelineCard[]]),
  ) as Record<PipelineStageId, PipelineCard[]>;

  for (const card of cards) {
    grouped[card.stage].push(card);
  }

  for (const stage of PIPELINE_STAGES) {
    grouped[stage.id].sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });
  }

  return grouped;
}

export function countPostsByStage(posts: BlogPost[], queue: BlogQueueItem[]): Record<PipelineStageId, number> {
  const cards = [
    ...posts.map(postToPipelineCard),
    ...queue
      .filter((q) => q.status !== "published")
      .map(queueToPipelineCard),
  ];
  const grouped = groupPipelineCards(cards);
  return Object.fromEntries(
    PIPELINE_STAGES.map((s) => [s.id, grouped[s.id].length]),
  ) as Record<PipelineStageId, number>;
}
