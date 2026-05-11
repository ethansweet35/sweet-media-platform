"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_OCEAN, adminFontSerif } from "../lib/adminTheme";
import {
  formatDashboardDate,
  relativeTimeSince,
  useDashboardData,
} from "../hooks/useDashboardData";
import { useAutoPublishEnabled } from "../hooks/useSystemSettings";
import { useSurferActions } from "../hooks/useSurferActions";

function firstNameFromUser(email: string | undefined, meta?: Record<string, unknown> | undefined) {
  if (typeof meta?.first_name === "string" && meta.first_name.trim()) {
    return meta.first_name.trim();
  }
  if (typeof meta?.full_name === "string" && meta.full_name.trim()) {
    return meta.full_name.trim().split(/\s+/)[0] ?? "";
  }
  const local = email?.split("@")[0]?.split(/[._-]/)[0];
  if (local && local.length > 0) {
    return local.charAt(0).toUpperCase() + local.slice(1).toLowerCase();
  }
  return "there";
}

function todayLabel(): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "";
  }
}

interface KPICardProps {
  value: number;
  label: string;
}

function KPICard({ value, label }: KPICardProps) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-5 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
      <p className={`text-4xl font-semibold leading-none text-neutral-900 ${adminFontSerif}`}>{value}</p>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { stats, recentDrafts, upcomingPublishes, systemStatus, surferStats, loading, error, refetch } =
    useDashboardData();
  const autoPub = useAutoPublishEnabled();
  const { refreshStale, bulkRefreshState } = useSurferActions();

  const [toggleBusy, setToggleBusy] = useState(false);

  const firstName = useMemo(
    () => firstNameFromUser(user?.email, user?.user_metadata),
    [user?.email, user?.user_metadata],
  );

  const lastRunLabel = useMemo(
    () => relativeTimeSince(systemStatus.lastAutoPublishAt),
    [systemStatus.lastAutoPublishAt],
  );

  const lastRunAbsolute = systemStatus.lastAutoPublishAt
    ? formatDashboardDate(systemStatus.lastAutoPublishAt)
    : "";

  const onToggleAutoPublish = useCallback(async () => {
    setToggleBusy(true);
    const ok = await autoPub.toggle();
    setToggleBusy(false);
    if (ok) await refetch();
  }, [autoPub, refetch]);

  const publishOn = autoPub.loading ? null : autoPub.enabled !== false;

  return (
    <div className="">

      <section className="mb-10">
        <h1 className={`text-[2.65rem] font-semibold tracking-tight text-neutral-900 sm:text-[2.95rem] ${adminFontSerif}`}>
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">{todayLabel()}</p>
      </section>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-black/[0.06] bg-white py-24 text-neutral-400">
          <i className="ri-loader-4-line animate-spin text-2xl" />
          Loading dashboard…
        </div>
      ) : (
        <>
          {/* KPI */}
          <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KPICard value={stats.total} label="Total posts" />
            <KPICard value={stats.published} label="Published" />
            <KPICard value={stats.drafts} label="Drafts" />
            <KPICard value={stats.scheduled} label="Scheduled" />
          </div>

          {/* Surfer SEO summary */}
          <article className="mb-10 rounded-2xl border border-black/[0.06] bg-white px-6 py-6 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className={`text-xl font-semibold text-neutral-900 ${adminFontSerif}`}>
                  Surfer SEO
                </h2>
                <p className="mt-1 text-[12px] text-neutral-500">
                  Live content scores from Surfer's Audit endpoint.
                  {surferStats.lastRefreshedAt ? (
                    <span> Last refresh {relativeTimeSince(surferStats.lastRefreshedAt)}.</span>
                  ) : (
                    <span> No scores yet — run a refresh to start auditing.</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const r = await refreshStale();
                  if (r) await refetch();
                }}
                disabled={bulkRefreshState.status === "loading"}
                className="flex items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 shadow-[0_1px_12px_rgba(0,0,0,0.04)] transition-colors hover:bg-black/[0.02] disabled:opacity-50"
              >
                <i
                  className={`text-xs ${bulkRefreshState.status === "loading" ? "ri-loader-4-line animate-spin" : "ri-bar-chart-line"}`}
                />
                {bulkRefreshState.status === "loading" ? "Refreshing…" : "Refresh stale"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-xl bg-black/[0.02] px-4 py-4">
                <p className={`text-3xl font-semibold leading-none text-neutral-900 ${adminFontSerif}`}>
                  {surferStats.avgScore != null ? surferStats.avgScore : "—"}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Avg score
                </p>
              </div>
              <div className="rounded-xl bg-black/[0.02] px-4 py-4">
                <p className={`text-3xl font-semibold leading-none text-neutral-900 ${adminFontSerif}`}>
                  {surferStats.scored}
                  <span className="text-neutral-400 text-xl">/{surferStats.eligible}</span>
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Scored
                </p>
              </div>
              <div className="rounded-xl bg-black/[0.02] px-4 py-4">
                <p className={`text-3xl font-semibold leading-none text-neutral-900 ${adminFontSerif}`}>
                  {surferStats.linked}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Linked editors
                </p>
              </div>
              <div className="rounded-xl bg-black/[0.02] px-4 py-4">
                <p className={`text-3xl font-semibold leading-none text-neutral-900 ${adminFontSerif}`}>
                  {surferStats.applied}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Applied
                </p>
              </div>
            </div>
            {surferStats.eligible - surferStats.linked > 0 && (
              <p className="mt-4 text-[12px] text-neutral-500">
                <span className="font-semibold text-neutral-700">
                  {surferStats.eligible - surferStats.linked}
                </span>{" "}
                active row{surferStats.eligible - surferStats.linked !== 1 ? "s" : ""} without a Surfer Content Editor —
                open the{" "}
                <Link href="/admin/blogs" className="underline font-semibold" style={{ color: ADMIN_OCEAN }}>
                  Blog Posts
                </Link>{" "}
                or{" "}
                <Link href="/admin/pages" className="underline font-semibold" style={{ color: ADMIN_OCEAN }}>
                  Pages
                </Link>{" "}
                view to create one.
              </p>
            )}
          </article>

          {/* Quick actions */}
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/admin/blog-writer"
              className="inline-flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_2px_24px_rgba(61,111,127,0.22)] transition-opacity hover:opacity-95 sm:flex-none sm:justify-center sm:max-w-none"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-quill-pen-line text-base" />
              Write a blog post
            </Link>
            <Link
              href="/admin/content-calendar"
              className="inline-flex flex-1 min-w-[160px] items-center justify-center gap-2 rounded-2xl border border-black/[0.1] bg-white px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-700 shadow-[0_1px_12px_rgba(0,0,0,0.04)] transition-colors hover:bg-black/[0.02] sm:flex-none"
            >
              <i className="ri-calendar-line text-base" />
              View calendar
            </Link>
          </div>

          {/* Drafts + upcoming */}
          <div className="mb-10 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-black/[0.06] bg-white px-6 py-6 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
              <h2 className={`text-xl font-semibold text-neutral-900 ${adminFontSerif}`}>Recent drafts</h2>
              <ul className="mt-5 divide-y divide-black/[0.05]">
                {recentDrafts.length === 0 ? (
                  <li className="py-6 text-center text-sm text-neutral-500">No drafts yet.</li>
                ) : (
                  recentDrafts.map((d) => (
                    <li key={d.id} className="flex items-center gap-3 py-3.5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-neutral-800">{d.title}</p>
                        <p className="mt-1 text-[12px] text-neutral-500">
                          Created {formatDashboardDate(d.created_at)}
                        </p>
                      </div>
                      <Link
                        href={`/blog/${encodeURIComponent(d.slug)}?preview=admin`}
                        title="Preview draft"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                      >
                        <i className="ri-eye-line text-lg" />
                      </Link>
                    </li>
                  ))
                )}
              </ul>
              <div className="mt-4 border-t border-black/[0.05] pt-4">
                <Link
                  href="/admin/blogs"
                  className="text-[12px] font-semibold underline-offset-2 transition-colors hover:underline"
                  style={{ color: ADMIN_OCEAN }}
                >
                  View all drafts
                </Link>
              </div>
            </article>

            <article className="rounded-2xl border border-black/[0.06] bg-white px-6 py-6 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
              <h2 className={`text-xl font-semibold text-neutral-900 ${adminFontSerif}`}>
                Upcoming auto-publishes
              </h2>
              <ul className="mt-5 divide-y divide-black/[0.05]">
                {upcomingPublishes.length === 0 ? (
                  <li className="py-6 text-center text-sm text-neutral-500">
                    No drafts scheduled for auto-publish.
                  </li>
                ) : (
                  upcomingPublishes.map((u) => (
                    <li key={u.id} className="flex items-center gap-3 py-3.5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-neutral-800">{u.title}</p>
                        <p className="mt-1 text-[12px] text-neutral-500">
                          {formatDashboardDate(u.scheduled_publish_at)}
                        </p>
                      </div>
                      <Link
                        href={`/blog/${encodeURIComponent(u.slug)}?preview=admin`}
                        title="Preview draft"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                      >
                        <i className="ri-eye-line text-lg" />
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </article>
          </div>

          {/* System */}
          <article className="rounded-2xl border border-black/[0.06] bg-white px-6 py-6 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
            <h2 className={`mb-6 text-xl font-semibold text-neutral-900 ${adminFontSerif}`}>System</h2>
            <dl className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-black/[0.02] px-4 py-4">
                <div>
                  <dt className="text-sm font-medium text-neutral-800">Auto-publish</dt>
                  <dd className="mt-0.5 text-xs text-neutral-500">
                    Controlled by cron; matches edge function kill switch key.
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${publishOn === false ? "text-neutral-400" : ""}`}>
                    {autoPub.loading ? "…" : publishOn ? "On" : "Off"}
                  </span>
                  <button
                    type="button"
                    disabled={toggleBusy || autoPub.loading}
                    role="switch"
                    aria-checked={publishOn === true}
                    onClick={() => void onToggleAutoPublish()}
                    className={`relative flex h-8 w-[52px] shrink-0 items-center rounded-full p-1 transition-colors disabled:opacity-50 ${
                      publishOn === true ? "justify-end shadow-inner" : "justify-start opacity-95"
                    }`}
                    style={{
                      backgroundColor: publishOn === true ? ADMIN_OCEAN : "#cbd5dd",
                      cursor: toggleBusy ? "wait" : "pointer",
                    }}
                  >
                    <span className="block h-6 w-6 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.05] px-4 py-4">
                <dt className="text-sm font-medium text-neutral-800">Last auto-publish run</dt>
                <dd
                  className="text-sm text-neutral-700"
                  title={lastRunAbsolute || undefined}
                >
                  {!systemStatus.lastAutoPublishAt ? "—" : (
                    <>
                      <span>{lastRunLabel}</span>
                      <span className="ml-1 text-neutral-400">({lastRunAbsolute})</span>
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </article>
        </>
      )}
    </div>
  );
}
