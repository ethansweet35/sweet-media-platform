"use client";

import Image from "next/image";
import { useState } from "react";
import { ADMIN_OCEAN } from "@sweetmedia/admin-core";
import type { BlogPost } from "@sweetmedia/blog-core";

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
}

type SortField = "title" | "category" | "author" | "date" | "status";
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
}: AdminBlogTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

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
      case "category": cmp = a.category.localeCompare(b.category); break;
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
        <table className="w-full min-w-[1060px]">
          <thead>
            <tr className="border-b border-neutral-100">
              {/* Checkbox col */}
              <th className="px-4 py-3.5 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#3d6f7f] accent-[#3d6f7f] cursor-pointer"
                />
              </th>
              <th className="text-left px-4 py-3.5">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Title <SortIcon field="title" />
                </button>
              </th>
              <th className="text-left px-4 py-3.5">
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Category <SortIcon field="category" />
                </button>
              </th>
              <th className="text-left px-4 py-3.5">
                <button
                  onClick={() => handleSort("author")}
                  className="flex items-center text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Author <SortIcon field="author" />
                </button>
              </th>
              <th className="text-left px-4 py-3.5">
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Published <SortIcon field="date" />
                </button>
              </th>
              <th className="text-left px-4 py-3.5">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Status <SortIcon field="status" />
                </button>
              </th>
              <th className="text-left px-4 py-3.5 whitespace-nowrap">
                <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400">
                  Auto-publish
                </span>
              </th>
              <th className="text-right px-5 py-3.5">
                <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((post) => {
              const imgStatus = imageGenStatuses[post.id];
              const isSelected = selectedIds.has(post.id);

              return (
                <tr
                  key={post.id}
                  className={`border-b border-neutral-50 transition-colors group ${
                    isSelected ? "bg-[#3d6f7f]/3" : "hover:bg-neutral-50/60"
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
                              !imgStatus.url.includes("gueqxorkktfcwiakepcp.supabase.co") &&
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
                              !post.image.includes("gueqxorkktfcwiakepcp.supabase.co") &&
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

                  {/* Category */}
                  <td className="px-4 py-4">
                    <span className="text-[10px] tracking-[0.12em] uppercase font-semibold text-[#3d6f7f] bg-[#3d6f7f]/6 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {post.category}
                    </span>
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

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
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