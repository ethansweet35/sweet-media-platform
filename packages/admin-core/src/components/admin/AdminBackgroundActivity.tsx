"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useBlogPlannerBulkJobOptional } from "../../contexts/BlogPlannerBulkJobContext";
import { useContentEditorBulkJobOptional } from "../../contexts/ContentEditorBulkJobContext";
import { ADMIN_ACCENT, ADMIN_NAVY } from "../../lib/adminTheme";

function ActivityCard({
  title,
  subtitle,
  progress,
  currentLabel,
  links,
  onCancel,
}: {
  title: string;
  subtitle: string;
  progress: string;
  currentLabel: string | null;
  links: { href: string; label: string }[];
  onCancel: () => void | Promise<void>;
}) {
  const pctMatch = progress.match(/\((\d+)\/(\d+)\)/);
  const pct =
    pctMatch && Number(pctMatch[2]) > 0
      ? Math.round((Number(pctMatch[1]) / Number(pctMatch[2])) * 100)
      : 0;

  return (
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
          <p className="text-xs font-bold uppercase tracking-wider text-white/70">{title}</p>
          <p className="truncate text-sm font-semibold text-white">{subtitle}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        {currentLabel ? (
          <p className="truncate text-sm text-[#475569]">
            <i className="ri-loader-4-line mr-1.5 animate-spin text-[#7B9FD4]" />
            {currentLabel}
          </p>
        ) : (
          <p className="text-sm text-[#94A3B8]">Preparing next item…</p>
        )}
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: ADMIN_ACCENT }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-semibold text-[#507969] hover:underline"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-[#94A3B8] hover:text-red-600"
          >
            Cancel job
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBackgroundActivity() {
  const planner = useBlogPlannerBulkJobOptional();
  const editor = useContentEditorBulkJobOptional();

  const cards: ReactNode[] = [];

  if (planner?.activeJob) {
    const j = planner.activeJob;
    cards.push(
      <ActivityCard
        key={`planner-${j.id}`}
        title="Background activity"
        subtitle={`Blog planner · creating editors (${j.completed}/${j.total})`}
        progress={`(${j.completed}/${j.total})`}
        currentLabel={j.current_keyword}
        links={[{ href: "/admin/blog-planner", label: "Open Blog Planner" }]}
        onCancel={() => void planner.cancelActiveJob()}
      />,
    );
  } else if (planner?.recentlyFinished) {
    const j = planner.recentlyFinished;
    const failed = j.logs.filter((l) => !l.ok).length;
    const ok = j.logs.filter((l) => l.ok).length;
    cards.push(
      <div
        key={`planner-done-${j.id}`}
        className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <i className="ri-check-double-line text-2xl text-emerald-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#0A1F44]">Blog planner bulk finished</p>
            <p className="mt-0.5 text-xs text-[#64748B]">
              {ok} succeeded · {failed} failed · {j.total} total
            </p>
            <div className="mt-2 flex gap-3">
              <Link href="/admin/blog-planner" className="text-xs font-semibold text-[#507969] hover:underline">
                Open planner
              </Link>
              <button
                type="button"
                onClick={planner.dismissFinishedNotice}
                className="text-xs text-[#94A3B8] hover:text-[#64748B]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>,
    );
  }

  if (editor?.activeJob) {
    const j = editor.activeJob;
    const kind = j.publish_target === "blog" ? "blog posts" : "page briefs";
    cards.push(
      <ActivityCard
        key={`editor-${j.id}`}
        title="Background activity"
        subtitle={`Content Editor · ${kind} (${j.completed}/${j.total})`}
        progress={`(${j.completed}/${j.total})`}
        currentLabel={j.current_keyword}
        links={[{ href: "/admin/content-editor", label: "Open Editors" }]}
        onCancel={() => void editor.cancelActiveJob()}
      />,
    );
  } else if (editor?.recentlyFinished) {
    const j = editor.recentlyFinished;
    const failed = j.logs.filter((l) => !l.ok).length;
    const ok = j.logs.filter((l) => l.ok).length;
    cards.push(
      <div
        key={`editor-done-${j.id}`}
        className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <i className="ri-check-double-line text-2xl text-emerald-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#0A1F44]">Bulk create finished</p>
            <p className="mt-0.5 text-xs text-[#64748B]">
              {ok} succeeded · {failed} failed · {j.total} total
            </p>
            <div className="mt-2 flex gap-3">
              <Link href="/admin/content-editor" className="text-xs font-semibold text-[#507969] hover:underline">
                Open Editors
              </Link>
              <button
                type="button"
                onClick={editor.dismissFinishedNotice}
                className="text-xs text-[#94A3B8] hover:text-[#64748B]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>,
    );
  }

  if (cards.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[100] flex w-[min(100vw-2.5rem,340px)] flex-col gap-3">
      {cards}
    </div>
  );
}
