"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ADMIN_OCEAN, adminTableWrapCls } from "../../../../../lib/adminTheme";
import type { BlogPost, BlogSection } from "@sweetmedia/blog-core";
import type { GscMetrics } from "../../../../../hooks/useSearchConsoleData";
import type { SeoGenResult } from "../../../../../lib/generateSeoMetadata";
import { getPublicSiteOrigin } from "../../../../../lib/publicSiteUrl";
import BlogPipelineStatusStrip from "../../../../BlogPipelineStatusStrip";
import ContentEditorCell from "../../../../ContentEditorCell";
import InlineKeywordCell from "../../../../InlineKeywordCell";
import RankingKeywordsPopover from "../../../../RankingKeywordsPopover";
import {
  AdminContentTableHeaderRow,
  type ContentTableSortField,
} from "../../../../content-list/table/AdminContentTableHeader";
import {
  AdminContentSeoPreviewRow,
  AdminContentSeoErrorRow,
  seoPreviewColSpan,
} from "../../../../content-list/table/AdminContentSeoRows";
import GscMetricsCell from "../../../../content-list/table/GscMetricsCell";
import { useContentTableResize } from "../../../../content-list/table/useContentTableResize";
import WordCountBadge from "../../../../content-list/table/WordCountBadge";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countBlogWords(sections: BlogSection[]): number {
  let total = 0;
  for (const s of sections) {
    if (s.text) total += countWords(s.text);
    if (s.items) s.items.forEach((item) => { total += countWords(item); });
    if (s.stats) s.stats.forEach((stat) => { total += countWords(stat.value) + countWords(stat.label); });
    if (s.tableHeaders) s.tableHeaders.forEach((h) => { total += countWords(h); });
    if (s.tableRows) s.tableRows.forEach((row) => row.forEach((cell) => { total += countWords(cell); }));
  }
  return total;
}

function formatScheduledLine(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function isUnoptimizedImageUrl(url: string): boolean {
  return (
    !url.includes("ynmldknprfusujudvutq.supabase.co") &&
    !url.includes("grbxnkgzhquwdqxlscv.supabase.co") &&
    !url.includes("lh3.googleusercontent.com")
  );
}

interface ImageGenStatus {
  status: "pending" | "generating" | "done" | "error";
  url?: string;
  error?: string;
  model?: string;
}

type SeoStatus = { status: "generating" | "done" | "error"; result?: SeoGenResult; error?: string };

interface AdminBlogTableProps {
  posts: BlogPost[];
  onDelete: (post: BlogPost) => void;
  onToggleStatus: (post: BlogPost) => void;
  onToggleApprovedForPublish: (post: BlogPost) => void;
  onToggleFeatured: (post: BlogPost) => void;
  onPreview: (post: BlogPost) => void;
  onRegenerateImage: (post: BlogPost) => void;
  togglingId: string | null;
  approvingForPublishId: string | null;
  selectedIds: Set<string>;
  onSelectId: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  imageGenStatuses: Record<string, ImageGenStatus>;
  seoStatuses: Record<string, SeoStatus>;
  onRunSeo: (post: BlogPost) => void;
  onApplySeo: (post: BlogPost, result: SeoGenResult) => void;
  onDismissSeo: (postId: string) => void;
  /** Optional callback to refetch posts after a Content Editor mutation. */
  onSeoChange?: () => void | Promise<void>;
  /** Persist a focus_keyword change for the given post. */
  onUpdateFocusKeyword: (post: BlogPost, keyword: string | null) => Promise<boolean>;
  /** GSC metrics keyed by page path (e.g. "/blog/some-slug"). */
  gscData?: Record<string, GscMetrics>;
  gscLoading?: boolean;
}

type SortDir = "asc" | "desc";

const INCLUDE_IMAGE = true;
const SEO_COL_SPAN = seoPreviewColSpan(INCLUDE_IMAGE);

export default function AdminBlogTable({
  posts,
  onDelete,
  onToggleStatus,
  onToggleApprovedForPublish,
  onToggleFeatured,
  onPreview,
  onRegenerateImage,
  togglingId,
  approvingForPublishId,
  selectedIds,
  onSelectId,
  onSelectAll,
  imageGenStatuses,
  seoStatuses,
  onRunSeo,
  onApplySeo,
  onDismissSeo,
  onSeoChange,
  onUpdateFocusKeyword,
  gscData = {},
  gscLoading = false,
}: AdminBlogTableProps) {
  const [sortField, setSortField] = useState<ContentTableSortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const { columnKeys, colWidths, startResize, tableWidth } = useContentTableResize(INCLUDE_IMAGE);

  const handleSort = (field: ContentTableSortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...posts].sort((a, b) => {
    let cmp = 0;
    switch (sortField) {
      case "title":
        cmp = a.title.localeCompare(b.title);
        break;
      case "route":
        cmp = a.slug.localeCompare(b.slug);
        break;
      case "date":
        cmp = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
      case "status":
        cmp = (a.status || "").localeCompare(b.status || "");
        break;
      case "wordCount":
        cmp = countBlogWords(a.content) - countBlogWords(b.content);
        break;
      case "keyword":
        cmp = (a.focus_keyword ?? "").localeCompare(b.focus_keyword ?? "");
        break;
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const allSelected = posts.length > 0 && posts.every((p) => selectedIds.has(p.id));
  const someSelected = posts.some((p) => selectedIds.has(p.id)) && !allSelected;

  return (
    <div className={adminTableWrapCls}>
      <div className="overflow-x-auto">
        <table
          className="table-fixed text-left text-sm"
          style={{ width: tableWidth, minWidth: tableWidth }}
        >
          <colgroup>
            {columnKeys.map((c) => (
              <col key={c} style={{ width: colWidths[c] + "px" }} />
            ))}
          </colgroup>
          <thead>
            <AdminContentTableHeaderRow
              columnKeys={columnKeys}
              colWidths={colWidths}
              sortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
              onResize={startResize}
              allSelected={allSelected}
              someSelected={someSelected}
              onSelectAll={onSelectAll}
            />
          </thead>
          <tbody>
            {sorted.map((post) => {
              const imgStatus = imageGenStatuses[post.id];
              const seoStatus = seoStatuses[post.id];
              const isSelected = selectedIds.has(post.id);
              const gscPath = `/blog/${post.slug}`.toLowerCase();
              const gscMetrics = gscData[gscPath];
              const imageUrl =
                imgStatus?.status === "done" && imgStatus.url
                  ? imgStatus.url
                  : post.image ?? null;

              return (
                <Fragment key={post.id}>
                  <tr
                    className={`group border-b border-[#F4F7FB] transition-colors ${
                      seoStatus?.status === "done"
                        ? "bg-violet-50/60"
                        : isSelected
                          ? "bg-[#0A1F44]/3"
                          : "hover:bg-[#F4F7FB]/60"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 pl-4 pr-2 align-middle">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelectId(post.id, e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1] accent-[#0A1F44] text-[#0A1F44]"
                      />
                    </td>

                    {/* Image */}
                    <td className="px-3 py-3 align-middle">
                      <div className="relative h-9 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F4F7FB]">
                        {imgStatus?.status === "generating" ? (
                          <div className="flex h-full w-full items-center justify-center bg-emerald-50">
                            <i className="ri-loader-4-line animate-spin text-sm text-emerald-500" />
                          </div>
                        ) : imgStatus?.status === "error" ? (
                          <div className="flex h-full w-full items-center justify-center bg-red-50">
                            <i className="ri-error-warning-line text-sm text-red-400" />
                          </div>
                        ) : imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            loading="lazy"
                            sizes="48px"
                            unoptimized={isUnoptimizedImageUrl(imageUrl)}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center border border-dashed border-[#E2E8F0]">
                            <i className="ri-image-line text-sm text-[#CBD5E1]" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Word Count */}
                    <td className="px-3 py-3 align-middle">
                      {post.content?.length ? (
                        <WordCountBadge words={countBlogWords(post.content)} />
                      ) : (
                        <span className="text-[12px] text-[#CBD5E1]">—</span>
                      )}
                    </td>

                    {/* Route */}
                    <td className="px-3 py-3 align-middle overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <code
                          className="block min-w-0 truncate rounded bg-[#F4F7FB] px-1.5 py-0.5 font-mono text-[11px] text-[#334155]"
                          title={`/blog/${post.slug}`}
                        >
                          /blog/{post.slug}
                        </code>
                        <RankingKeywordsPopover
                          pageUrl={`${getPublicSiteOrigin()}/blog/${post.slug}`}
                        >
                          <button
                            type="button"
                            title="See ranking keywords for this post"
                            className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-[#94A3B8] transition-all hover:bg-[#0A1F44]/10 hover:text-[#0A1F44]"
                          >
                            <i className="ri-bar-chart-grouped-line text-[12px]" />
                          </button>
                        </RankingKeywordsPopover>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-3 py-3 align-middle overflow-hidden">
                      <div className="min-w-0">
                        <p
                          className="line-clamp-1 text-[13px] font-medium leading-snug text-[#0A1F44]"
                          title={post.title}
                        >
                          {post.title}
                        </p>
                        {post.scheduled_publish_at ? (
                          <p className="mt-1 text-[11px] text-[#64748B]">
                            Scheduled: {formatScheduledLine(post.scheduled_publish_at)}
                          </p>
                        ) : null}
                        <div className="mt-1">
                          <BlogPipelineStatusStrip post={post} compact />
                        </div>
                      </div>
                    </td>

                    {/* SEO Title */}
                    <td className="px-3 py-3 align-top overflow-hidden">
                      {post.metaTitle ? (
                        <div className="flex flex-col gap-1">
                          <span
                            className="line-clamp-2 text-[12px] leading-snug text-[#334155]"
                            title={post.metaTitle}
                          >
                            {post.metaTitle}
                          </span>
                          <span className="inline-flex items-center self-start rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                            {post.metaTitle.length} chars
                          </span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#CBD5E1]">—</span>
                      )}
                    </td>

                    {/* Meta Description */}
                    <td className="px-3 py-3 align-top overflow-hidden">
                      {post.metaDescription ? (
                        <div className="flex flex-col gap-1">
                          <span
                            className="line-clamp-2 text-[12px] leading-snug text-[#334155]"
                            title={post.metaDescription}
                          >
                            {post.metaDescription}
                          </span>
                          <span className="inline-flex items-center self-start rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                            {post.metaDescription.length} chars
                          </span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#CBD5E1]">—</span>
                      )}
                    </td>

                    {/* Primary Keyword */}
                    <td className="px-3 py-3 align-middle" onClick={(e) => e.stopPropagation()}>
                      <InlineKeywordCell
                        value={post.focus_keyword ?? null}
                        rowTitle={post.title}
                        onSave={(next) => onUpdateFocusKeyword(post, next)}
                      />
                    </td>

                    {/* GSC Metrics */}
                    <td className="px-3 py-3 align-middle">
                      <GscMetricsCell metrics={gscMetrics} loading={gscLoading} />
                    </td>

                    {/* Content Editor */}
                    <td className="px-3 py-3 align-middle" onClick={(e) => e.stopPropagation()}>
                      <ContentEditorCell
                        kind="blog"
                        row={{
                          id: post.id,
                          primary_keyword: post.focus_keyword ?? null,
                          content_editor_id: post.content_editor_id ?? null,
                        }}
                        onChange={onSeoChange}
                      />
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3 align-middle">
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleStatus(post)}
                          disabled={togglingId === post.id}
                          className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                            post.status === "published"
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              : "bg-[#F4F7FB] text-[#64748B] hover:bg-[#E2E8F0]"
                          } ${togglingId === post.id ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                          {togglingId === post.id ? (
                            <i className="ri-loader-4-line animate-spin text-[10px]" />
                          ) : (
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${post.status === "published" ? "bg-emerald-500" : "bg-[#94A3B8]"}`}
                            />
                          )}
                          {post.status === "published" ? "Published" : "Draft"}
                        </button>
                        {post.status === "draft" ? (
                          <button
                            type="button"
                            disabled={approvingForPublishId === post.id}
                            role="switch"
                            aria-label="Auto-publish"
                            aria-checked={post.approved_for_publish === true}
                            onClick={() => onToggleApprovedForPublish(post)}
                            className={`relative flex h-8 w-[52px] shrink-0 items-center rounded-full p-1 transition-colors disabled:opacity-50 ${
                              post.approved_for_publish === true
                                ? "justify-end shadow-inner"
                                : "justify-start opacity-95"
                            }`}
                            style={{
                              backgroundColor:
                                post.approved_for_publish === true ? ADMIN_OCEAN : "#cbd5dd",
                            }}
                            title={
                              post.approved_for_publish === true
                                ? "Eligible for cron auto-publish"
                                : "Not eligible for cron auto-publish"
                            }
                          >
                            {approvingForPublishId === post.id ? (
                              <span className="flex h-6 min-w-[24px] flex-1 items-center justify-center">
                                <i
                                  className="ri-loader-4-line animate-spin text-sm text-[#64748B]"
                                  aria-hidden
                                />
                              </span>
                            ) : (
                              <span className="block h-6 w-6 rounded-full bg-white shadow-sm" />
                            )}
                          </button>
                        ) : null}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-3 py-3 align-middle overflow-hidden">
                      <span className="block truncate text-[12px] text-[#64748B]">{post.date}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/blog-edit/${post.slug}`}
                          title="Edit post"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all hover:bg-[#0A1F44]/8 hover:text-[#0A1F44]"
                        >
                          <i className="ri-edit-line text-sm" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onPreview(post)}
                          title="Preview"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#94A3B8] transition-all hover:bg-[#F4F7FB] hover:text-[#334155]"
                        >
                          <i className="ri-eye-line text-sm" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(post)}
                          title={post.featured ? "Unfeature" : "Set as featured"}
                          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all ${
                            post.featured
                              ? "text-amber-500 hover:bg-amber-50"
                              : "text-[#CBD5E1] hover:bg-amber-50 hover:text-amber-400"
                          }`}
                        >
                          <i className={`text-sm ${post.featured ? "ri-star-fill" : "ri-star-line"}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRegenerateImage(post)}
                          title={
                            post.image
                              ? "Regenerate featured card"
                              : "Generate featured card"
                          }
                          disabled={imgStatus?.status === "generating"}
                          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all ${
                            imgStatus?.status === "generating"
                              ? "cursor-not-allowed bg-emerald-50 text-emerald-500"
                              : imgStatus?.status === "done"
                                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                : imgStatus?.status === "error"
                                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                                  : "bg-[#F4F7FB] text-[#64748B] hover:bg-emerald-50 hover:text-emerald-600"
                          }`}
                        >
                          {imgStatus?.status === "generating" ? (
                            <i className="ri-loader-4-line animate-spin text-sm" />
                          ) : imgStatus?.status === "error" ? (
                            <i className="ri-refresh-line text-sm" />
                          ) : (
                            <i className="ri-image-ai-line text-sm" />
                          )}
                        </button>
                        {seoStatus?.status === "generating" ? (
                          <div className="flex h-8 w-8 items-center justify-center">
                            <i className="ri-loader-4-line animate-spin text-sm text-violet-500" />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onRunSeo(post)}
                            title="AI Generate Meta Data"
                            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all ${
                              seoStatus?.status === "done"
                                ? "bg-violet-100 text-violet-600 hover:bg-violet-200"
                                : seoStatus?.status === "error"
                                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                                  : "text-[#94A3B8] hover:bg-violet-50 hover:text-violet-600"
                            }`}
                          >
                            <i className="ri-sparkling-2-line text-sm" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onDelete(post)}
                          title="Delete"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#94A3B8] transition-all hover:bg-red-50 hover:text-red-500"
                        >
                          <i className="ri-delete-bin-line text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {seoStatus?.status === "done" && seoStatus.result ? (
                    <AdminContentSeoPreviewRow
                      result={seoStatus.result}
                      colSpan={SEO_COL_SPAN}
                      onApply={() => onApplySeo(post, seoStatus.result!)}
                      onDismiss={() => onDismissSeo(post.id)}
                    />
                  ) : null}

                  {seoStatus?.status === "error" ? (
                    <AdminContentSeoErrorRow
                      error={seoStatus.error ?? "SEO generation failed"}
                      colSpan={SEO_COL_SPAN}
                      onRetry={() => onRunSeo(post)}
                      onDismiss={() => onDismissSeo(post.id)}
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {posts.length === 0 ? (
        <div className="py-16 text-center">
          <i className="ri-article-line mb-3 block text-4xl text-[#E2E8F0]" />
          <p className="text-sm text-[#94A3B8]">No posts found</p>
        </div>
      ) : null}
    </div>
  );
}
