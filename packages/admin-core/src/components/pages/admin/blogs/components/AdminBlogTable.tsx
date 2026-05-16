"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { ADMIN_OCEAN } from "../../../../../lib/adminTheme";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { GscMetrics } from "../../../../../hooks/useSearchConsoleData";
import type { SeoGenResult } from "../../../../../lib/generateSeoMetadata";
import ContentEditorCell from "../../../../ContentEditorCell";
import InlineKeywordCell from "../../../../InlineKeywordCell";

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

type SortField = "title" | "author" | "date" | "status";
type SortDir = "asc" | "desc";

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
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // ── Resizable columns ──────────────────────────────────────────────────────
  const [colWidths, setColWidths] = useState({
    // Each value is sized to fit its longest realistic content without truncation
    check: 48,
    title: 320,       // thumbnail + title + slug line
    seoTitle: 220,    // "Optimized SEO Title For Page" with truncation
    metaDesc: 280,    // longer column for description preview
    author: 180,      // avatar + full author name
    date: 140,        // "May 10, 2026"
    status: 130,      // "Published" pill button
    autopublish: 120, // header "Auto-publish" + toggle
    keyword: 280,     // inline-edit input + Suggest popover trigger
    gsc: 112,         // clicks + impressions + position
    contentEditor: 340, // Content Editor chip + score badge + open-link
    actions: 290,     // edit + preview + star + gen-card button + meta-data + delete
  });
  const resizeRef = useRef<{ col: keyof typeof colWidths; startX: number; startW: number } | null>(null);

  const startResize = useCallback((col: keyof typeof colWidths, e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = { col, startX: e.clientX, startW: colWidths[col] };
    const onMove = (me: MouseEvent) => {
      if (!resizeRef.current) return;
      const w = Math.max(60, resizeRef.current.startW + (me.clientX - resizeRef.current.startX));
      setColWidths((p) => ({ ...p, [resizeRef.current!.col]: w }));
    };
    const onUp = () => {
      resizeRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [colWidths]);

  const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);

  const SortTh = ({ field, label, rk }: { field: SortField; label: string; rk: keyof typeof colWidths }) => (
    <th className="py-3 font-semibold text-neutral-500 text-[10px] uppercase tracking-[0.1em] relative select-none" style={{ paddingLeft: "12px", paddingRight: "10px" }}>
      <button type="button" onClick={() => handleSort(field)} className="inline-flex items-center cursor-pointer hover:text-neutral-700 transition-colors whitespace-nowrap">
        {label}<SortIcon field={field} />
      </button>
      <div onMouseDown={(e) => startResize(rk, e)} className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end">
        <div className="h-full w-[2px] transition-opacity group-hover:opacity-100 opacity-20" style={{ backgroundColor: "#3d6f7f" }} />
      </div>
    </th>
  );

  const StaticTh = ({ label, rk, right }: { label: string; rk: keyof typeof colWidths; right?: boolean }) => (
    <th className={`py-3 font-semibold text-neutral-500 text-[10px] uppercase tracking-[0.1em] relative select-none${right ? " text-right" : ""}`} style={{ paddingLeft: "12px", paddingRight: "10px" }}>
      <span className="block">{label}</span>
      <div onMouseDown={(e) => startResize(rk, e)} className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end">
        <div className="h-full w-[2px] transition-opacity group-hover:opacity-100 opacity-20" style={{ backgroundColor: "#3d6f7f" }} />
      </div>
    </th>
  );

  const handleSort = (field: SortField) => {
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
      case "title": cmp = a.title.localeCompare(b.title); break;
      case "author": cmp = a.author.localeCompare(b.author); break;
      case "date": cmp = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(); break;
      case "status": cmp = (a.status || "").localeCompare(b.status || ""); break;
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const allSelected = posts.length > 0 && posts.every((p) => selectedIds.has(p.id));
  const someSelected = posts.some((p) => selectedIds.has(p.id)) && !allSelected;

  const SortIcon = ({ field }: { field: SortField }) => (
    <i className={`text-[10px] ml-1 ${
      sortField === field
        ? sortDir === "asc" ? "ri-arrow-up-line text-[#3d6f7f]" : "ri-arrow-down-line text-[#3d6f7f]"
        : "ri-arrow-up-down-line text-neutral-300"
    }`}></i>
  );

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table style={{ width: tableWidth, minWidth: tableWidth }} className="table-fixed">
          <colgroup>
            {(["check","title","seoTitle","metaDesc","author","date","status","autopublish","keyword","gsc","contentEditor","actions"] as (keyof typeof colWidths)[]).map((c) => (
              <col key={c} style={{ width: colWidths[c] + "px" }} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-neutral-100">
              {/* Checkbox */}
              <th className="py-3 pl-4 pr-2 relative select-none" style={{ width: colWidths.check }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#3d6f7f] accent-[#3d6f7f] cursor-pointer"
                />
                <div onMouseDown={(e) => startResize("check", e)} className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end">
                  <div className="h-full w-[2px] transition-opacity group-hover:opacity-100 opacity-0" style={{ backgroundColor: "#3d6f7f" }} />
                </div>
              </th>
              <SortTh field="title" label="Title" rk="title" />
              <StaticTh label="SEO Title" rk="seoTitle" />
              <StaticTh label="Meta Description" rk="metaDesc" />
              <SortTh field="author" label="Author" rk="author" />
              <SortTh field="date" label="Published" rk="date" />
              <SortTh field="status" label="Status" rk="status" />
              <StaticTh label="Auto-publish" rk="autopublish" />
              <StaticTh label="Primary Keyword" rk="keyword" />
              <StaticTh label="GSC (28d)" rk="gsc" />
              <StaticTh label="Content Editor" rk="contentEditor" />
              <StaticTh label="Actions" rk="actions" right />
            </tr>
          </thead>
          <tbody>
            {sorted.map((post) => {
              const imgStatus = imageGenStatuses[post.id];
              const seoStatus = seoStatuses[post.id];
              const isSelected = selectedIds.has(post.id);

              return (
                <>
                <tr
                  key={post.id}
                  className={`border-b border-neutral-50 transition-colors group ${
                    seoStatus?.status === "done" ? "bg-violet-50/60" : isSelected ? "bg-[#3d6f7f]/3" : "hover:bg-neutral-50/60"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onSelectId(post.id, e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 accent-[#3d6f7f] cursor-pointer"
                    />
                  </td>

                  {/* Title */}
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      {/* Thumbnail / image gen status */}
                      <div className="w-12 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100 relative">
                        {imgStatus?.status === "generating" ? (
                          <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                            <i className="ri-loader-4-line animate-spin text-emerald-500 text-sm"></i>
                          </div>
                        ) : imgStatus?.status === "done" && imgStatus.url ? (
                          <Image
                            src={imgStatus.url}
                            alt={post.title}
                            fill
                            loading="lazy"
                            sizes="48px"
                            unoptimized={
                              !imgStatus.url.includes("ynmldknprfusujudvutq.supabase.co") &&
                              !imgStatus.url.includes("grbxnkgzhquwdqxlscv.supabase.co") &&
                              !imgStatus.url.includes("lh3.googleusercontent.com")
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : imgStatus?.status === "error" ? (
                          <div className="w-full h-full flex items-center justify-center bg-red-50">
                            <i className="ri-error-warning-line text-red-400 text-sm"></i>
                          </div>
                        ) : post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            loading="lazy"
                            sizes="48px"
                            unoptimized={
                              !post.image.includes("ynmldknprfusujudvutq.supabase.co") &&
                              !post.image.includes("grbxnkgzhquwdqxlscv.supabase.co") &&
                              !post.image.includes("lh3.googleusercontent.com")
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center border border-dashed border-neutral-200">
                            <i className="ri-image-line text-neutral-300 text-sm"></i>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900 line-clamp-1 leading-snug">
                          {post.title}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5 font-mono line-clamp-1">
                          /{post.slug}
                        </p>
                        {post.scheduled_publish_at ? (
                          <p className="text-[11px] text-neutral-500 mt-1">
                            Scheduled: {formatScheduledLine(post.scheduled_publish_at)}
                          </p>
                        ) : null}
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {post.featured && (
                            <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                              <i className="ri-star-fill text-[8px]"></i>
                              Featured
                            </span>
                          )}
                          {!post.image && !imgStatus && (
                            <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-full">
                              No image
                            </span>
                          )}
                          {imgStatus?.status === "done" && (
                            <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              <i className="ri-check-line text-[8px]"></i>
                              {imgStatus.model
                                ? imgStatus.model.replace("gpt-image-2-2026-04-21", "gpt-image-2")
                                : "Image saved"}
                            </span>
                          )}
                          {imgStatus?.status === "error" && imgStatus.error && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full max-w-[260px] truncate" title={imgStatus.error}>
                              <i className="ri-error-warning-line text-[8px] flex-shrink-0"></i>
                              {imgStatus.error.length > 80 ? imgStatus.error.slice(0, 80) + "…" : imgStatus.error}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SEO Title */}
                  <td className="px-4 py-4 align-top">
                    {post.metaTitle ? (
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-[12px] leading-snug text-neutral-700 line-clamp-2"
                          title={post.metaTitle}
                        >
                          {post.metaTitle}
                        </span>
                        <span className="inline-flex items-center self-start px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                          {post.metaTitle.length} chars
                        </span>
                      </div>
                    ) : (
                      <span className="text-neutral-300 text-[12px]">—</span>
                    )}
                  </td>

                  {/* Meta Description */}
                  <td className="px-4 py-4 align-top">
                    {post.metaDescription ? (
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-[12px] leading-snug text-neutral-700 line-clamp-2"
                          title={post.metaDescription}
                        >
                          {post.metaDescription}
                        </span>
                        <span className="inline-flex items-center self-start px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                          {post.metaDescription.length} chars
                        </span>
                      </div>
                    ) : (
                      <span className="text-neutral-300 text-[12px]">—</span>
                    )}
                  </td>

                  {/* Author */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#3d6f7f] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[9px] font-bold">
                          {post.author.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-600 whitespace-nowrap">{post.author}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <span className="text-sm text-neutral-500 whitespace-nowrap">{post.date}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <button
                      onClick={() => onToggleStatus(post)}
                      disabled={togglingId === post.id}
                      className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                        post.status === "published"
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      } ${togglingId === post.id ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {togglingId === post.id ? (
                        <i className="ri-loader-4-line animate-spin text-[10px]"></i>
                      ) : (
                        <span className={`w-1.5 h-1.5 rounded-full ${post.status === "published" ? "bg-emerald-500" : "bg-neutral-400"}`} />
                      )}
                      {post.status === "published" ? "Published" : "Draft"}
                    </button>
                  </td>

                  <td className="px-4 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
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
                            <i className="ri-loader-4-line animate-spin text-neutral-600 text-sm" aria-hidden />
                          </span>
                        ) : (
                          <span className="block h-6 w-6 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    ) : null}
                  </td>

                  {/* Primary Keyword */}
                  <td className="px-4 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                    <InlineKeywordCell
                      value={post.focus_keyword ?? null}
                      rowTitle={post.title}
                      onSave={(next) => onUpdateFocusKeyword(post, next)}
                    />
                  </td>

                  {/* GSC Metrics */}
                  <td className="px-4 py-4 align-middle">
                    {(() => {
                      const path = `/blog/${post.slug}`.toLowerCase();
                      const m = gscData[path];
                      if (gscLoading) return <span className="text-[11px] text-neutral-300">…</span>;
                      if (!m) return <span className="text-[11px] text-neutral-300">—</span>;
                      return (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[12px] font-semibold text-neutral-800" title="Clicks">
                            {m.clicks.toLocaleString()} <span className="text-[10px] font-normal text-neutral-400">clk</span>
                          </span>
                          <span className="text-[11px] text-neutral-500" title="Impressions">
                            {m.impressions.toLocaleString()} <span className="text-[10px] text-neutral-400">imp</span>
                          </span>
                          <span className="text-[10px] text-neutral-400" title={`Avg position: ${m.position.toFixed(1)}`}>
                            pos {m.position.toFixed(1)}
                          </span>
                        </div>
                      );
                    })()}
                  </td>

                  {/* Content Editor */}
                  <td className="px-4 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
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

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog-edit/${post.slug}`}
                        title="Edit post"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/8 transition-all"
                      >
                        <i className="ri-edit-line text-sm"></i>
                      </Link>
                      <button
                        onClick={() => onPreview(post)}
                        title="Preview"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all cursor-pointer"
                      >
                        <i className="ri-eye-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => onToggleFeatured(post)}
                        title={post.featured ? "Unfeature" : "Set as featured"}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                          post.featured
                            ? "text-amber-500 hover:bg-amber-50"
                            : "text-neutral-300 hover:text-amber-400 hover:bg-amber-50"
                        }`}
                      >
                        <i className={`text-sm ${post.featured ? "ri-star-fill" : "ri-star-line"}`}></i>
                      </button>
                      <button
                        onClick={() => onRegenerateImage(post)}
                        title={post.image ? "Regenerate featured card" : "Generate featured card"}
                        disabled={imgStatus?.status === "generating"}
                        className={`h-8 flex items-center gap-1.5 px-2.5 rounded-lg text-[10px] font-bold tracking-[0.1em] uppercase transition-all cursor-pointer whitespace-nowrap ${
                          imgStatus?.status === "generating"
                            ? "text-emerald-500 bg-emerald-50 cursor-not-allowed"
                            : imgStatus?.status === "done"
                            ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            : imgStatus?.status === "error"
                            ? "text-red-500 bg-red-50 hover:bg-red-100"
                            : "text-neutral-500 bg-neutral-100 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {imgStatus?.status === "generating" ? (
                          <><i className="ri-loader-4-line animate-spin text-xs"></i> Generating...</>
                        ) : imgStatus?.status === "done" ? (
                          <><i className="ri-check-line text-xs"></i> Card Done</>
                        ) : imgStatus?.status === "error" ? (
                          <><i className="ri-refresh-line text-xs"></i> Retry Card</>
                        ) : post.image ? (
                          <><i className="ri-image-ai-line text-xs"></i> Regen Card</>
                        ) : (
                          <><i className="ri-image-ai-line text-xs"></i> Gen Card</>
                        )}
                      </button>
                      {/* AI Generate Meta Data */}
                      {seoStatus?.status === "generating" ? (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <i className="ri-loader-4-line animate-spin text-violet-500 text-sm"></i>
                        </div>
                      ) : (
                        <button
                          onClick={() => onRunSeo(post)}
                          title="AI Generate Meta Data"
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                            seoStatus?.status === "done"
                              ? "text-violet-600 bg-violet-100 hover:bg-violet-200"
                              : seoStatus?.status === "error"
                              ? "text-red-500 bg-red-50 hover:bg-red-100"
                              : "text-neutral-400 hover:text-violet-600 hover:bg-violet-50"
                          }`}
                        >
                          <i className="ri-sparkling-2-line text-sm"></i>
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(post)}
                        title="Delete"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* AI Generate Meta Data preview row */}
                {seoStatus?.status === "done" && seoStatus.result && (
                  <tr key={`${post.id}-seo-preview`} className="bg-violet-50 border-b border-violet-100">
                    <td colSpan={12} className="px-5 py-3">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                          <i className="ri-sparkling-2-line text-violet-500 text-sm"></i>
                          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-violet-600 whitespace-nowrap">
                            Generated Meta Data
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-3">
                          {seoStatus.result.page_title && (
                            <div className="min-w-0">
                              <p className="text-[9px] uppercase tracking-wider text-violet-400 font-bold mb-0.5">
                                Page Title ({seoStatus.result.page_title.length} chars)
                              </p>
                              <p className="text-[12px] text-neutral-700 leading-snug">
                                {seoStatus.result.page_title}
                              </p>
                            </div>
                          )}
                          {seoStatus.result.seo_title && (
                            <div className="min-w-0">
                              <p className="text-[9px] uppercase tracking-wider text-violet-400 font-bold mb-0.5">
                                SEO Title ({seoStatus.result.seo_title.length} chars)
                              </p>
                              <p className="text-[12px] text-neutral-700 leading-snug">
                                {seoStatus.result.seo_title}
                              </p>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-[9px] uppercase tracking-wider text-violet-400 font-bold mb-0.5">
                              Meta Description ({seoStatus.result.meta_description.length} chars)
                            </p>
                            <p className="text-[12px] text-neutral-700 leading-snug">
                              {seoStatus.result.meta_description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button type="button" onClick={() => onApplySeo(post, seoStatus.result!)}
                            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                            <i className="ri-check-line text-xs"></i>Apply
                          </button>
                          <button type="button" onClick={() => onDismissSeo(post.id)}
                            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors">
                            <i className="ri-close-line text-xs"></i>Dismiss
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {seoStatus?.status === "error" && (
                  <tr key={`${post.id}-seo-error`} className="bg-red-50 border-b border-red-100">
                    <td colSpan={12} className="px-5 py-2">
                      <div className="flex items-center gap-3">
                        <i className="ri-error-warning-line text-red-400 text-sm flex-shrink-0"></i>
                        <p className="text-[12px] text-red-600 flex-1">{seoStatus.error}</p>
                        <button type="button" onClick={() => onRunSeo(post)} className="text-[11px] text-red-500 hover:underline cursor-pointer flex-shrink-0">Retry</button>
                        <button type="button" onClick={() => onDismissSeo(post.id)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer flex-shrink-0">
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16">
          <i className="ri-article-line text-4xl text-neutral-200 mb-3 block"></i>
          <p className="text-sm text-neutral-400">No posts found</p>
        </div>
      )}
    </div>
  );
}