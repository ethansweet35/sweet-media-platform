"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ADMIN_OCEAN } from "@sweetmedia/admin-core";
import type { BlogQueueItem } from "@sweetmedia/admin-core";

const STATUS_STYLES: Record<
  BlogQueueItem["status"],
  { label: string; bg: string; text: string; ring?: string }
> = {
  pending: { label: "Pending", bg: "bg-neutral-100", text: "text-neutral-700" },
  generating: { label: "Generating", bg: "bg-sky-100", text: "text-sky-800" },
  draft_ready: { label: "Draft ready", bg: "bg-emerald-100", text: "text-emerald-900" },
  published: { label: "Published", bg: "bg-teal-100", text: "text-teal-900" },
  failed: { label: "Failed", bg: "bg-red-50", text: "text-red-800", ring: "ring-1 ring-red-100" },
};

function formatWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

interface QueueTableProps {
  items: BlogQueueItem[];
  highlightedId: string | null;
  onHighlightedConsumed?: () => void;
  loading?: boolean;
  onDeleteItem: (id: string) => Promise<boolean>;
  onCancelItem: (id: string) => Promise<boolean>;
  onGenerateNow: (id: string) => Promise<{ ok: boolean; error?: string }>;
  notify: (message: string, kind: "success" | "error") => void;
}

export default function QueueTable({
  items,
  highlightedId,
  onHighlightedConsumed,
  loading,
  onDeleteItem,
  onCancelItem,
  onGenerateNow,
  notify,
}: QueueTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  useEffect(() => {
    if (!highlightedId) return;
    rowRefs.current[highlightedId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    const expandTimer = window.setTimeout(() => {
      setExpanded((prev) => new Set(prev).add(highlightedId));
    }, 0);
    const t = setTimeout(() => onHighlightedConsumed?.(), 1200);
    return () => {
      window.clearTimeout(expandTimer);
      clearTimeout(t);
    };
  }, [highlightedId, onHighlightedConsumed]);

  const toggleRow = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const run = async (
    label: string,
    id: string,
    fn: (id: string) => Promise<boolean>,
    okMsg: string,
  ) => {
    setBusyId(id);
    const ok = await fn(id);
    setBusyId(null);
    if (ok) notify(okMsg, "success");
    else notify(`${label} failed`, "error");
  };

  const handleGenerateNow = async (id: string) => {
    setBusyId(id);
    const result = await onGenerateNow(id);
    setBusyId(null);
    if (result.ok) notify("Draft ready", "success");
    else notify(`Generation failed: ${result.error ?? "Unknown error"}`, "error");
  };

  if (loading && items.length === 0) {
    return (
      <div className="rounded-2xl border border-black/[0.06] bg-white/70 p-8 text-center text-sm text-black/50 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
        Loading queue…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/[0.1] bg-white/60 p-8 text-center text-sm text-black/50 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
        No queued posts yet. Upload a CSV to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white/80 shadow-sm">
      <table className="min-w-[960px] w-full text-left text-sm [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
        <thead className="bg-black/[0.03] text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
          <tr>
            <th className="whitespace-nowrap px-4 py-3">Status</th>
            <th className="px-4 py-3">Post</th>
            <th className="px-4 py-3">Slug</th>
            <th className="whitespace-nowrap px-4 py-3">Scheduled</th>
            <th className="whitespace-nowrap px-4 py-3">Created</th>
            <th className="whitespace-nowrap px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
          const sty = STATUS_STYLES[item.status];
          const isOpen = expanded.has(item.id);
          const isHi = highlightedId === item.id;
          const showGeneratingPulse =
            item.status === "generating" || busyId === item.id;
          return (
            <Fragment key={item.id}>
              <tr
                ref={(el) => {
                  rowRefs.current[item.id] = el;
                }}
                onClick={() => toggleRow(item.id)}
                className={`cursor-pointer border-t border-black/[0.05] transition-colors ${
                  isHi ? "bg-[#3d6f7f]/[0.07]" : "hover:bg-black/[0.02]"
                }`}
              >
                <td className="align-top whitespace-nowrap px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    {showGeneratingPulse ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold text-sky-900 ring-1 ring-sky-200/80">
                        <i className="ri-loader-4-line animate-spin text-sm" aria-hidden />
                        Generating…
                      </span>
                    ) : (
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${sty.bg} ${sty.text} ${sty.ring ?? ""}`}
                      >
                        {sty.label}
                      </span>
                    )}
                  </div>
                </td>
                <td className="align-top px-4 py-3">
                  <div className={`${"[font-family:var(--font-cormorant-garamond),serif]"} font-semibold text-black/85`}>
                    {item.blog_title}
                  </div>
                  <div className="mt-0.5 text-xs text-black/45">{item.primary_keyword}</div>
                </td>
                <td className="align-top px-4 py-3 font-mono text-xs text-black/60">{item.url_slug}</td>
                <td className="align-top whitespace-nowrap px-4 py-3 text-xs text-black/65">
                  {formatWhen(item.scheduled_publish_at)}
                </td>
                <td className="align-top whitespace-nowrap px-4 py-3 text-[11px] text-black/40">
                  {formatWhen(item.created_at)}
                </td>
                <td className="align-top px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-wrap justify-end gap-2">
                    {item.generated_post_id && (
                      <Link
                        href={`/blog/${item.url_slug}?preview=admin`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-black/65 ring-1 ring-black/10 hover:bg-black/[0.03]"
                      >
                        View draft
                      </Link>
                    )}
                    {(item.status === "pending" || item.status === "failed") && (
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => void handleGenerateNow(item.id)}
                        className="inline-flex min-h-[34px] min-w-[7.25rem] items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white disabled:opacity-40"
                        style={{ backgroundColor: ADMIN_OCEAN }}
                      >
                        {busyId === item.id ? (
                          <>
                            <i className="ri-loader-4-line animate-spin text-xs" aria-hidden />
                            Generating…
                          </>
                        ) : (
                          "Generate now"
                        )}
                      </button>
                    )}
                    {item.status === "pending" && (
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() =>
                          run("Cancel", item.id, onCancelItem, "Item cancelled.")
                        }
                        className="rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-black/55 ring-1 ring-black/10 hover:bg-black/[0.03]"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => {
                        if (!confirm("Delete this queue row permanently?")) return;
                        run("Delete", item.id, onDeleteItem, "Row deleted.");
                      }}
                      className="rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-red-700 ring-1 ring-red-100 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {isOpen && (
                <tr className="border-t border-black/[0.04] bg-black/[0.015]">
                  <td colSpan={6} className="px-4 py-4 text-xs text-black/60">
                    {item.writing_guidelines ? (
                      <div className="mb-3">
                        <span className="font-bold uppercase tracking-[0.08em] text-black/35">
                          Guidelines
                        </span>
                        <p className="mt-1 whitespace-pre-wrap">{item.writing_guidelines}</p>
                      </div>
                    ) : (
                      <p className="mb-3 text-black/35">No writing guidelines for this row.</p>
                    )}
                    {item.error_message ? (
                      <div>
                        <span className="font-bold uppercase tracking-[0.08em] text-red-700/80">
                          Error
                        </span>
                        <p className="mt-1 whitespace-pre-wrap text-red-800">{item.error_message}</p>
                      </div>
                    ) : null}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}
