"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ContentPipelineKanban, { PipelineAttentionList } from "../components/ContentPipelineKanban";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSerif,
} from "../lib/adminTheme";
import { PIPELINE_STAGES } from "../lib/blogPipeline";
import { useContentPipeline } from "../hooks/useContentPipeline";
import {
  formatDashboardDate,
  relativeTimeSince,
  useDashboardData,
} from "../hooks/useDashboardData";
import { useAutoPublishEnabled } from "../hooks/useSystemSettings";
import AdminWhatsNew from "../components/AdminWhatsNew";
import DashboardPerformanceTab from "../components/dashboard/DashboardPerformanceTab";

type DashboardTab = "overview" | "performance";

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

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const pipeline = useContentPipeline();
  const { systemStatus, loading: dashLoading, error: dashError, refetch: refetchDash } =
    useDashboardData();
  const autoPub = useAutoPublishEnabled();
  const [toggleBusy, setToggleBusy] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

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
    if (ok) await refetchDash();
  }, [autoPub, refetchDash]);

  const publishOn = autoPub.loading ? null : autoPub.enabled !== false;
  const loading = pipeline.loading || dashLoading;
  const error = pipeline.error || dashError;

  const activeDraftCount = useMemo(
    () => pipeline.posts.filter((p) => p.status === "draft").length,
    [pipeline.posts],
  );

  return (
    <div>
      <AdminWhatsNew />

      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className={`text-[2.65rem] font-semibold tracking-tight sm:text-[2.95rem] ${adminFontSerif}`}
            style={{ color: ADMIN_TEXT }}
          >
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            {todayLabel()} · {activeDraftCount} draft{activeDraftCount === 1 ? "" : "s"} in pipeline
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/blog-writer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
            style={{ backgroundColor: ADMIN_NAVY }}
          >
            <i className="ri-quill-pen-line" />
            Write post
          </Link>
          <Link
            href="/admin/blogs?view=pipeline"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT }}
          >
            <i className="ri-kanban-view" />
            Full pipeline
          </Link>
        </div>
      </section>

      <div
        className="mb-8 inline-flex rounded-xl border bg-white p-1"
        style={{ borderColor: ADMIN_BORDER }}
        role="tablist"
        aria-label="Dashboard sections"
      >
        {(
          [
            { id: "overview" as const, label: "Overview", icon: "ri-dashboard-line" },
            { id: "performance" as const, label: "Performance", icon: "ri-line-chart-line" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
              activeTab === tab.id ? "text-white shadow-sm" : ""
            }`}
            style={
              activeTab === tab.id
                ? { backgroundColor: ADMIN_NAVY }
                : { color: ADMIN_TEXT_MUTED }
            }
          >
            <i className={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "performance" ? <DashboardPerformanceTab /> : null}

      {activeTab === "overview" && error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {activeTab === "overview" && loading ? (
        <div className={`flex items-center justify-center gap-3 ${adminCardCls} py-24`} style={{ color: ADMIN_TEXT_MUTED }}>
          <i className="ri-loader-4-line animate-spin text-2xl" />
          Loading pipeline…
        </div>
      ) : activeTab === "overview" ? (
        <>
          {/* Needs attention */}
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className={`text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                  Needs attention
                </h2>
                <p className="mt-1 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
                  Drafts and queue items that need your next action
                </p>
              </div>
              {pipeline.attentionItems.length > 0 ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800">
                  {pipeline.attentionItems.length} item{pipeline.attentionItems.length === 1 ? "" : "s"}
                </span>
              ) : null}
            </div>
            <PipelineAttentionList items={pipeline.attentionItems} maxItems={8} />
          </section>

          {/* Pipeline kanban */}
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className={`text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                  Content pipeline
                </h2>
                <p className="mt-1 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
                  From queue → draft → SEO → approval → publish
                </p>
              </div>
              <Link
                href="/admin/content-calendar"
                className="text-[12px] font-semibold hover:underline"
                style={{ color: ADMIN_ACCENT }}
              >
                Content calendar
              </Link>
            </div>
            <ContentPipelineKanban cardsByStage={pipeline.cardsByStage} maxCardsPerColumn={5} compact />
          </section>

          {/* Stage summary */}
          <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage.id} className={`${adminCardCls} px-4 py-4`}>
                <div className="flex items-center gap-2">
                  <i className={`${stage.icon} text-base`} style={{ color: ADMIN_ACCENT }} />
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: ADMIN_TEXT_MUTED }}>
                    {stage.shortLabel}
                  </span>
                </div>
                <p className={`mt-2 text-2xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                  {pipeline.cardsByStage[stage.id]?.length ?? 0}
                </p>
              </div>
            ))}
          </section>

          {/* System */}
          <article className={`${adminCardCls} px-6 py-6`}>
            <h2 className={`mb-6 text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              System
            </h2>
            <dl className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#0A1F44]/[0.03] px-4 py-4">
                <div>
                  <dt className="text-sm font-medium" style={{ color: ADMIN_TEXT }}>
                    Auto-publish
                  </dt>
                  <dd className="mt-0.5 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
                    Promotes approved drafts when scheduled date arrives
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${publishOn === false ? "opacity-50" : ""}`}>
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
                      backgroundColor: publishOn === true ? ADMIN_NAVY : "#cbd5dd",
                      cursor: toggleBusy ? "wait" : "pointer",
                    }}
                  >
                    <span className="block h-6 w-6 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>

              <div
                className="flex flex-wrap items-center justify-between gap-4 border-t px-4 py-4"
                style={{ borderColor: ADMIN_BORDER }}
              >
                <dt className="text-sm font-medium" style={{ color: ADMIN_TEXT }}>
                  Last auto-publish run
                </dt>
                <dd className="text-sm" style={{ color: ADMIN_TEXT_MUTED }} title={lastRunAbsolute || undefined}>
                  {!systemStatus.lastAutoPublishAt ? "—" : (
                    <>
                      <span>{lastRunLabel}</span>
                      <span className="ml-1 opacity-70">({lastRunAbsolute})</span>
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </article>
        </>
      ) : null}
    </div>
  );
}
