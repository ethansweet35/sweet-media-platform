"use client";

import type { BlogPlannerHub } from "../../types/blog-planner";
import { ADMIN_BORDER, ADMIN_TEXT, ADMIN_TEXT_MUTED } from "../../lib/adminTheme";

const inputCls =
  "w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:border-[#7B9FD4]";

interface BlogPlannerManageHubsModalProps {
  open: boolean;
  onClose: () => void;
  pages: BlogPlannerHub[];
  hubCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleHub: (pageId: string, isHub: boolean) => void;
}

export default function BlogPlannerManageHubsModal({
  open,
  onClose,
  pages,
  hubCount,
  search,
  onSearchChange,
  onToggleHub,
}: BlogPlannerManageHubsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#0A1F44]/50 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-hubs-title"
        className="relative flex max-h-[min(720px,90vh)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b px-6 py-5" style={{ borderColor: ADMIN_BORDER }}>
          <div>
            <h2 id="manage-hubs-title" className="text-lg font-bold" style={{ color: ADMIN_TEXT }}>
              Manage hub pages
            </h2>
            <p className="mt-1 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
              Check pages that should have supporting blog plans. {hubCount} hub
              {hubCount === 1 ? "" : "s"} active.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] hover:bg-[#F4F7FB] hover:text-[#0A1F44]"
            aria-label="Close dialog"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div className="border-b px-6 py-4" style={{ borderColor: ADMIN_BORDER }}>
          <div className="relative">
            <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              className={`${inputCls} pl-9`}
              placeholder="Search tracked pages…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {pages.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#94A3B8]">
              {search.trim() ? "No pages match your search." : "Every tracked page is already a hub."}
            </p>
          ) : (
            <ul className="space-y-2">
              {pages.map((p) => (
                <li key={p.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#E2E8F0] p-4 transition hover:border-[#7B9FD4] hover:bg-[#F8FAFC]">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-[#0A1F44]"
                      onChange={(e) => onToggleHub(p.id, e.target.checked)}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#0A1F44]">{p.page_title}</span>
                      <span className="mt-0.5 block text-xs text-[#94A3B8]">{p.route_path}</span>
                      {p.primary_keyword ? (
                        <span className="mt-1 block text-xs text-[#64748B]">{p.primary_keyword}</span>
                      ) : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t px-6 py-4" style={{ borderColor: ADMIN_BORDER }}>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#0A1F44] py-3 text-sm font-semibold text-white hover:bg-[#152d52] sm:w-auto sm:px-8"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
