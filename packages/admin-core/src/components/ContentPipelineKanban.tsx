"use client";

import Link from "next/link";
import type { PipelineCard, PipelineStageId } from "../lib/blogPipeline";
import { PIPELINE_STAGES } from "../lib/blogPipeline";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSans,
} from "../lib/adminTheme";

interface ContentPipelineKanbanProps {
  cardsByStage: Record<PipelineStageId, PipelineCard[]>;
  /** Max cards per column before showing "+ N more" */
  maxCardsPerColumn?: number;
  compact?: boolean;
}

function PipelineCardTile({ card, compact }: { card: PipelineCard; compact?: boolean }) {
  return (
    <article
      className={`rounded-xl border bg-white transition-shadow hover:shadow-md ${adminFontSans}`}
      style={{ borderColor: ADMIN_BORDER }}
    >
      <div className={compact ? "p-3" : "p-3.5"}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className={`font-semibold leading-snug ${compact ? "text-[13px]" : "text-sm"}`}
              style={{ color: ADMIN_TEXT }}
            >
              {card.title}
            </p>
            {card.subtitle ? (
              <p className="mt-0.5 truncate font-mono text-[10px]" style={{ color: ADMIN_TEXT_MUTED }}>
                {card.subtitle}
              </p>
            ) : null}
          </div>
          {card.kind === "queue" ? (
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
              Queue
            </span>
          ) : null}
        </div>

        {card.attention.length > 0 ? (
          <p className="mt-2 text-[11px] leading-relaxed text-amber-700">{card.attention[0]}</p>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Link
            href={card.href}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: ADMIN_NAVY }}
          >
            Open
          </Link>
          {card.previewHref ? (
            <a
              href={card.previewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
              style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
            >
              Preview
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ContentPipelineKanban({
  cardsByStage,
  maxCardsPerColumn = 8,
  compact = false,
}: ContentPipelineKanbanProps) {
  return (
    <div className={`overflow-x-auto pb-2 ${adminFontSans}`}>
      <div className="flex min-w-max gap-3">
        {PIPELINE_STAGES.map((stage) => {
          const allCards = cardsByStage[stage.id] ?? [];
          const visible = allCards.slice(0, maxCardsPerColumn);
          const overflow = allCards.length - visible.length;

          return (
            <section
              key={stage.id}
              className={`flex w-[240px] shrink-0 flex-col rounded-2xl border ${compact ? "max-h-[420px]" : "min-h-[320px]"}`}
              style={{ borderColor: ADMIN_BORDER, backgroundColor: "rgba(255,255,255,0.65)" }}
            >
              <header className="border-b px-3.5 py-3" style={{ borderColor: ADMIN_BORDER }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <i className={`${stage.icon} text-base shrink-0`} style={{ color: ADMIN_ACCENT }} />
                    <span className="truncate text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT }}>
                      {stage.shortLabel}
                    </span>
                  </div>
                  <span
                    className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white"
                    style={{ backgroundColor: ADMIN_NAVY }}
                  >
                    {allCards.length}
                  </span>
                </div>
                {!compact ? (
                  <p className="mt-1 text-[10px] leading-relaxed" style={{ color: ADMIN_TEXT_MUTED }}>
                    {stage.hint}
                  </p>
                ) : null}
              </header>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2.5">
                {visible.length === 0 ? (
                  <p className="py-6 text-center text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
                    Nothing here
                  </p>
                ) : (
                  visible.map((card) => (
                    <PipelineCardTile key={`${card.kind}-${card.id}`} card={card} compact={compact} />
                  ))
                )}
                {overflow > 0 ? (
                  <Link
                    href="/admin/blogs?view=pipeline"
                    className="block py-2 text-center text-[11px] font-semibold hover:underline"
                    style={{ color: ADMIN_ACCENT }}
                  >
                    + {overflow} more
                  </Link>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function PipelineAttentionList({
  items,
  maxItems = 6,
}: {
  items: import("../lib/blogPipeline").PipelineAttentionItem[];
  maxItems?: number;
}) {
  const visible = items.slice(0, maxItems);
  const overflow = items.length - visible.length;

  if (items.length === 0) {
    return (
      <div className={`${adminCardCls} px-6 py-8 text-center`}>
        <i className="ri-checkbox-circle-line text-3xl" style={{ color: ADMIN_ACCENT }} />
        <p className="mt-3 text-sm font-medium" style={{ color: ADMIN_TEXT }}>
          All caught up
        </p>
        <p className="mt-1 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
          No drafts need immediate attention.
        </p>
      </div>
    );
  }

  return (
    <div className={`${adminCardCls} divide-y`} style={{ borderColor: ADMIN_BORDER }}>
      {visible.map((item) => (
        <div key={item.id} className="flex items-center gap-4 px-5 py-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              item.severity === "high" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"
            }`}
          >
            <i className={item.kind === "queue" ? "ri-error-warning-line" : "ri-alert-line"} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold" style={{ color: ADMIN_TEXT }}>
              {item.title}
            </p>
            <p className="mt-0.5 text-[12px]" style={{ color: ADMIN_TEXT_MUTED }}>
              {item.message}
            </p>
          </div>
          <Link
            href={item.href}
            className="shrink-0 rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: ADMIN_NAVY }}
          >
            {item.actionLabel}
          </Link>
        </div>
      ))}
      {overflow > 0 ? (
        <div className="px-5 py-3 text-center">
          <Link href="/admin/blogs" className="text-[12px] font-semibold hover:underline" style={{ color: ADMIN_ACCENT }}>
            View {overflow} more items in Blog Posts
          </Link>
        </div>
      ) : null}
    </div>
  );
}
