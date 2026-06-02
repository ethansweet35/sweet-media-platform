"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSans,
  adminFontSerif,
} from "../lib/adminTheme";
import {
  ADMIN_CHANGELOG_CATEGORY_LABEL,
  formatChangelogDate,
  getRecentAdminChangelog,
  type AdminChangelogCategory,
  type AdminChangelogEntry,
} from "../lib/adminChangelog";

const STORAGE_KEY = "sweet-admin-whats-new-collapsed";

const CATEGORY_STYLES: Record<
  AdminChangelogCategory,
  { bg: string; text: string; border: string }
> = {
  new: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  improved: { bg: "bg-[#7B9FD4]/15", text: "text-[#0A1F44]", border: "border-[#7B9FD4]/35" },
  fix: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
};

function CategoryBadge({ category }: { category: AdminChangelogCategory }) {
  const s = CATEGORY_STYLES[category];
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] ${s.bg} ${s.text} ${s.border}`}
    >
      {ADMIN_CHANGELOG_CATEGORY_LABEL[category]}
    </span>
  );
}

function ChangelogEntryRow({ entry }: { entry: AdminChangelogEntry }) {
  const [tipsOpen, setTipsOpen] = useState(false);
  const hasTips = (entry.tips?.length ?? 0) > 0;

  return (
    <li
      className="rounded-xl border px-4 py-3.5 transition-colors hover:border-[#7B9FD4]/40"
      style={{ borderColor: ADMIN_BORDER, backgroundColor: "rgba(255,255,255,0.7)" }}
    >
      <div className="flex flex-wrap items-start gap-2 gap-y-1">
        <time
          className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: ADMIN_TEXT_MUTED }}
          dateTime={entry.date}
        >
          {formatChangelogDate(entry.date)}
        </time>
        <CategoryBadge category={entry.category} />
      </div>
      <h3
        className={`mt-2 text-[15px] font-semibold leading-snug ${adminFontSerif}`}
        style={{ color: ADMIN_TEXT }}
      >
        {entry.title}
      </h3>
      <p className={`mt-1.5 text-[13px] leading-relaxed ${adminFontSans}`} style={{ color: ADMIN_TEXT_MUTED }}>
        {entry.summary}
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        {entry.href ? (
          <Link
            href={entry.href}
            className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:underline"
            style={{ color: ADMIN_ACCENT }}
          >
            {entry.hrefLabel ?? "Open"}
            <i className="ri-arrow-right-s-line text-sm" />
          </Link>
        ) : null}
        {hasTips ? (
          <button
            type="button"
            onClick={() => setTipsOpen((v) => !v)}
            className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:underline"
            style={{ color: ADMIN_TEXT_MUTED }}
          >
            <i className={`ri-lightbulb-line ${tipsOpen ? "text-[#7B9FD4]" : ""}`} />
            {tipsOpen ? "Hide tips" : "How to use"}
          </button>
        ) : null}
      </div>
      {hasTips && tipsOpen ? (
        <ul className="mt-3 space-y-1.5 border-t pt-3" style={{ borderColor: ADMIN_BORDER }}>
          {entry.tips!.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-[12px] leading-relaxed"
              style={{ color: ADMIN_TEXT }}
            >
              <i className="ri-check-line mt-0.5 shrink-0 text-[#7B9FD4]" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/**
 * Dashboard banner: recent admin platform changes for the team.
 * Collapse state persists in localStorage per browser.
 */
export default function AdminWhatsNew() {
  const entries = useMemo(() => getRecentAdminChangelog(90, 14), []);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setCollapsed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const persistCollapsed = useCallback((next: boolean) => {
    setCollapsed(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  if (entries.length === 0) return null;

  return (
    <section className={`mb-8 overflow-hidden ${adminCardCls}`}>
      <div
        className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6"
        style={{
          borderColor: ADMIN_BORDER,
          background: `linear-gradient(135deg, ${ADMIN_NAVY} 0%, #0d2a5e 55%, #152d52 100%)`,
        }}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7B9FD4]">
            Team updates
          </p>
          <h2 className={`mt-1 text-xl font-semibold text-white sm:text-[1.35rem] ${adminFontSerif}`}>
            What&apos;s new in admin
          </h2>
          <p className={`mt-1.5 max-w-2xl text-[13px] leading-relaxed text-white/75 ${adminFontSans}`}>
            Recent changes to the platform admin — new features, layout updates, and fixes.
            Jake &amp; Sean: check here after deploys to learn what shipped and where to find it.
          </p>
        </div>
        <button
          type="button"
          onClick={() => persistCollapsed(!collapsed)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/20"
          aria-expanded={!collapsed}
        >
          <i className={collapsed ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"} />
          {collapsed ? "Show" : "Hide"}
        </button>
      </div>

      {!collapsed ? (
        <div className="px-5 py-5 sm:px-6" style={{ backgroundColor: "#F8FAFD" }}>
          <ul className="space-y-3">
            {entries.map((entry) => (
              <ChangelogEntryRow key={entry.id} entry={entry} />
            ))}
          </ul>
          <p
            className={`mt-4 border-t pt-4 text-center text-[11px] leading-relaxed ${adminFontSans}`}
            style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
          >
            Updates are generated automatically from admin-core git history on each deploy.
            Optional tips/links: <code className="text-[10px]">adminChangelog.enrichments.json</code> in admin-core.
          </p>
        </div>
      ) : null}
    </section>
  );
}
