"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ADMIN_OCEAN } from "../../../../../lib/adminTheme";
import type { CalendarEditorSourceRow } from "../../../../../types/content-calendar-editor-import";

const MAX_SELECT = 20;

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T09:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

function defaultStartDate(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

interface Props {
  open: boolean;
  onClose: () => void;
  onImported: (summary: string) => void;
}

export default function ContentEditorQueueImport({ open, onClose, onImported }: Props) {
  const [editors, setEditors] = useState<CalendarEditorSourceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [daySpacing, setDaySpacing] = useState(1);
  const [filter, setFilter] = useState<"ready" | "all">("ready");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content-calendar/editor-sources");
      const data = (await res.json()) as {
        ok?: boolean;
        editors?: CalendarEditorSourceRow[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Failed to load editors (${res.status})`);
      }
      setEditors(data.editors ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setEditors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setSelected(new Set());
    setStartDate(defaultStartDate());
    setDaySpacing(1);
    void load();
  }, [open, load]);

  const visible = useMemo(() => {
    return editors.filter((e) => {
      if (filter === "ready" && e.status !== "ready") return false;
      return true;
    });
  }, [editors, filter]);

  const selectable = useMemo(
    () => visible.filter((e) => e.has_draft_body && !e.already_queued),
    [visible],
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < MAX_SELECT) next.add(id);
      return next;
    });
  };

  const selectAllSelectable = () => {
    setSelected(new Set(selectable.slice(0, MAX_SELECT).map((e) => e.editor_id)));
  };

  const scheduleForIndex = (index: number): string => {
    return addDays(startDate, index * Math.max(0, daySpacing));
  };

  const handleImport = async () => {
    const ordered = selectable.filter((e) => selected.has(e.editor_id));
    if (ordered.length === 0) {
      setError("Select at least one editor with a draft body.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const items = ordered.map((e, i) => ({
        editor_id: e.editor_id,
        scheduled_publish_at: scheduleForIndex(i),
      }));

      const res = await fetch("/api/admin/content-calendar/import-from-editors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        succeeded?: number;
        failed?: number;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Import failed (${res.status})`);
      }
      onImported(
        `Added ${data.succeeded ?? 0} post${(data.succeeded ?? 0) === 1 ? "" : "s"} to the calendar` +
          ((data.failed ?? 0) > 0 ? ` · ${data.failed} failed` : ""),
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#E2E8F0] px-6 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
            Content Calendar
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#0A1F44]">Pull from Content Editor</h2>
          <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">
            Sync each brief&apos;s draft into its linked blog post and schedule it on the calendar.
            Select up to {MAX_SELECT} blog-linked editors at a time. Runs sync immediately — no AI
            regeneration.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4 border-b border-[#E2E8F0] px-6 py-4 bg-[#F8FAFC]">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748B] mb-1">
              First publish date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm"
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748B] mb-1">
              Days between posts
            </label>
            <input
              type="number"
              min={0}
              max={30}
              value={daySpacing}
              onChange={(e) => setDaySpacing(Number(e.target.value) || 0)}
              className="w-24 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm"
              disabled={submitting}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFilter("ready")}
              className={`rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] border ${
                filter === "ready"
                  ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                  : "border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              Ready only
            </button>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] border ${
                filter === "all"
                  ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                  : "border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              All statuses
            </button>
          </div>
          <button
            type="button"
            onClick={() => selectAllSelectable()}
            className="ml-auto text-[11px] font-semibold text-[#507969] hover:underline"
          >
            Select all eligible ({Math.min(selectable.length, MAX_SELECT)})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3 min-h-[200px]">
          {loading ? (
            <p className="py-8 text-center text-sm text-[#64748B]">
              <i className="ri-loader-4-line animate-spin mr-2" />
              Loading editors…
            </p>
          ) : visible.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#64748B]">
              No blog-linked Content Editors found. Create briefs in{" "}
              <Link href="/admin/content-editor" className="text-[#507969] underline">
                Content Editor
              </Link>{" "}
              first.
            </p>
          ) : (
            <ul className="space-y-2">
              {visible.map((e) => {
                const disabled = !e.has_draft_body || e.already_queued;
                const checked = selected.has(e.editor_id);
                return (
                  <li
                    key={e.editor_id}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                      disabled
                        ? "border-[#E2E8F0] bg-[#F8FAFC] opacity-60"
                        : checked
                          ? "border-[#7B9FD4] bg-[#F4F7FB]"
                          : "border-[#E2E8F0] bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled || submitting || (!checked && selected.size >= MAX_SELECT)}
                      onChange={() => toggle(e.editor_id)}
                      className="mt-1"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-semibold text-[#0A1F44]">{e.primary_keyword}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                          {e.status}
                        </span>
                        {e.already_queued ? (
                          <span className="text-[10px] font-semibold text-amber-700">On calendar</span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#64748B]">
                        {e.has_draft_body
                          ? `${e.draft_word_count.toLocaleString()} words in draft`
                          : "No draft body — run Auto-Optimize first"}
                        {e.blog_slug ? (
                          <>
                            {" "}
                            · <span className="font-mono">/blog/{e.blog_slug}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                    <Link
                      href={e.brief_href}
                      className="shrink-0 text-[11px] font-semibold text-[#507969] hover:underline"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      Brief
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {error ? (
          <p className="px-6 pb-2 text-[12px] text-red-600">
            <i className="ri-error-warning-line mr-1" />
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t border-[#E2E8F0] px-6 py-4">
          <p className="text-[11px] text-[#64748B]">
            {selected.size} selected
            {selected.size > 0
              ? ` · schedules ${startDate}${daySpacing > 0 ? `, +${daySpacing}d each` : " (same day)"}`
              : ""}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#334155]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitting || selected.size === 0}
              onClick={() => void handleImport()}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white disabled:opacity-50"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              {submitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin" /> Importing…
                </>
              ) : (
                <>
                  <i className="ri-download-cloud-line" /> Add to calendar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
