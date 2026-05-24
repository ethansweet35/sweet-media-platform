"use client";

import Link from "next/link";
import { useBlogPlannerBulkJobOptional } from "../../contexts/BlogPlannerBulkJobContext";
import { ADMIN_ACCENT, ADMIN_NAVY } from "../../lib/adminTheme";

export default function BlogPlannerBackgroundActivity() {
  const ctx = useBlogPlannerBulkJobOptional();
  if (!ctx) return null;

  const { activeJob, recentlyFinished, cancelActiveJob, dismissFinishedNotice } = ctx;

  if (!activeJob && !recentlyFinished) return null;

  if (activeJob) {
    const pct =
      activeJob.total > 0 ? Math.round((activeJob.completed / activeJob.total) * 100) : 0;

    return (
      <div className="fixed bottom-5 left-5 z-[100] w-[min(100vw-2.5rem,340px)]">
        <div
          className="overflow-hidden rounded-2xl border border-[#7B9FD4]/40 bg-white shadow-2xl ring-1 ring-[#0A1F44]/10"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: ADMIN_NAVY }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7B9FD4] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7B9FD4]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                Background activity
              </p>
              <p className="truncate text-sm font-semibold text-white">
                Creating editors ({activeJob.completed}/{activeJob.total})
              </p>
            </div>
          </div>

          <div className="px-4 py-3">
            {activeJob.current_keyword ? (
              <p className="truncate text-sm text-[#475569]">
                <i className="ri-loader-4-line mr-1.5 animate-spin text-[#7B9FD4]" />
                {activeJob.current_keyword}
              </p>
            ) : (
              <p className="text-sm text-[#94A3B8]">Preparing next topic…</p>
            )}

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: ADMIN_ACCENT }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {activeJob.hub_tracked_page_id ? (
                <Link
                  href="/admin/blog-planner"
                  className="text-xs font-semibold text-[#507969] hover:underline"
                >
                  Open Blog Planner
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => void cancelActiveJob().catch(() => undefined)}
                className="text-xs font-semibold text-[#94A3B8] hover:text-red-600"
              >
                Cancel job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (recentlyFinished) {
    const failed = recentlyFinished.logs.filter((l) => !l.ok).length;
    const ok = recentlyFinished.logs.filter((l) => l.ok).length;

    return (
      <div className="fixed bottom-5 left-5 z-[100] w-[min(100vw-2.5rem,320px)]">
        <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <i className="ri-check-double-line text-2xl text-emerald-600" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#0A1F44]">Bulk create finished</p>
              <p className="mt-0.5 text-xs text-[#64748B]">
                {ok} succeeded · {failed} failed · {recentlyFinished.total} total
              </p>
              <div className="mt-2 flex gap-3">
                <Link
                  href="/admin/blog-planner"
                  className="text-xs font-semibold text-[#507969] hover:underline"
                >
                  View in planner
                </Link>
                <button
                  type="button"
                  onClick={dismissFinishedNotice}
                  className="text-xs text-[#94A3B8] hover:text-[#64748B]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
