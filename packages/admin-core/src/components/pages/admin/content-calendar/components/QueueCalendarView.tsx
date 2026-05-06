"use client";

import { useMemo, useState } from "react";
import { ADMIN_OCEAN } from "../../../../../lib/adminTheme";
import type { BlogQueueItem } from "../../../../../types/blog-queue";

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function daysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

function calendarDayNumber(view: Date, index: number, startPad: number, daysTotal: number): number | null {
  const dom = index - startPad + 1;
  if (dom < 1 || dom > daysTotal) return null;
  return dom;
}

function localDateAtDay(view: Date, dayNum: number): Date {
  return new Date(view.getFullYear(), view.getMonth(), dayNum);
}

function sameLocalDay(view: Date, dayNum: number, iso: string): boolean {
  const a = localDateAtDay(view, dayNum);
  const b = new Date(iso);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface QueueCalendarViewProps {
  items: BlogQueueItem[];
  highlightedId: string | null;
  onChipSelect: (id: string) => void;
}

const MAX_VISIBLE = 2;

export default function QueueCalendarView({ items, highlightedId, onChipSelect }: QueueCalendarViewProps) {
  const [view, setView] = useState(() => startOfMonth(new Date()));

  const grid = useMemo(() => {
    const dim = daysInMonth(view);
    const startPad = startOfMonth(view).getDay();
    const slots = Math.ceil((startPad + dim) / 7) * 7;
    const cells: ({ dayNum: number } | { pad: true })[] = [];
    for (let i = 0; i < slots; i++) {
      const n = calendarDayNumber(view, i, startPad, dim);
      if (n === null) cells.push({ pad: true });
      else cells.push({ dayNum: n });
    }
    return cells;
  }, [view]);

  const bucketForDay = useMemo(() => {
    const map = new Map<number, BlogQueueItem[]>();
    const dim = daysInMonth(view);
    for (let d = 1; d <= dim; d++) {
      const list = items.filter((it) => sameLocalDay(view, d, it.scheduled_publish_at));
      if (list.length) map.set(d, list);
    }
    return map;
  }, [items, view]);

  const label = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(view);

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white/80 p-5 shadow-sm [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
        <h2 className={`text-lg font-semibold tracking-tight ${"[font-family:var(--font-cormorant-garamond),serif]"}`}>
          {label}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setView(addMonths(view, -1))}
            className="rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-black/55 ring-1 ring-black/[0.08] hover:bg-black/[0.03]"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setView(startOfMonth(new Date()))}
            className="rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-black/55 ring-1 ring-black/[0.08] hover:bg-black/[0.03]"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setView(addMonths(view, 1))}
            className="rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-black/55 ring-1 ring-black/[0.08] hover:bg-black/[0.03]"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-black/40">
        {WEEKDAY.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {grid.map((cell, idx) => {
          if ("pad" in cell) {
            return <div key={`pad-${idx}`} className="min-h-[88px] rounded-lg bg-transparent" />;
          }
          const { dayNum } = cell;
          const dayItems = bucketForDay.get(dayNum) ?? [];
          const visible = dayItems.slice(0, MAX_VISIBLE);
          const rest = Math.max(0, dayItems.length - visible.length);

          return (
            <div
              key={dayNum}
              className="flex min-h-[88px] flex-col gap-1 rounded-lg border border-black/[0.05] bg-black/[0.015] p-1.5 text-left"
            >
              <span className="text-[11px] font-semibold text-black/45">{dayNum}</span>
              <div className="flex flex-col gap-1">
                {visible.map((it) => {
                  const isHi = highlightedId === it.id;
                  return (
                    <button
                      key={it.id}
                      type="button"
                      title={it.blog_title}
                      onClick={() => onChipSelect(it.id)}
                      className={`truncate rounded-md px-1.5 py-0.5 text-left text-[10px] font-medium leading-snug ring-1 transition-colors ${
                        isHi ? "bg-[#3d6f7f]/15 ring-[#3d6f7f]/35" : "bg-white/90 ring-black/[0.06] hover:ring-black/15"
                      }`}
                      style={isHi ? { color: ADMIN_OCEAN } : { color: "rgba(0,0,0,0.65)" }}
                    >
                      {it.blog_title.slice(0, 42)}
                      {it.blog_title.length > 42 ? "…" : ""}
                    </button>
                  );
                })}
                {rest > 0 && (
                  <span className="px-1 text-[10px] font-semibold text-black/35">+{rest} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
