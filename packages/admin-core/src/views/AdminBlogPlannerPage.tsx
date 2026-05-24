"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import BlogPlannerManageHubsModal from "../components/blog-planner/BlogPlannerManageHubsModal";
import { useBlogPlannerBulkJob } from "../contexts/BlogPlannerBulkJobContext";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_SURFACE,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
} from "../lib/adminTheme";
import { BLOG_PLANNER_MISC_ROUTE } from "../types/blog-planner";
import type {
  BlogPlannerCoverage,
  BlogPlannerHub,
  BlogPlannerHubLink,
  BlogPlannerHubWithStats,
  BlogPlannerItem,
} from "../types/blog-planner";

const inputCls =
  "w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:border-[#7B9FD4]";

type IdeaTab = "semrush" | "ai";
type PageView = "overview" | "workspace";
type OverviewSort = "name" | "progress" | "ideas";

function formatVol(n: number | null): string {
  if (n == null || !Number.isFinite(n) || n === 0) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function hubLabel(hub: BlogPlannerHub): string {
  if (hub.is_blog_hub_misc) return "Miscellaneous";
  return hub.page_title || hub.route_path;
}

function isBulkEligible(item: BlogPlannerItem): boolean {
  return item.status !== "dismissed" && !item.content_editor_id;
}

function statusBadge(status: string): string {
  switch (status) {
    case "content_editor":
      return "bg-[#7B9FD4]/20 text-[#0A1F44]";
    case "published":
      return "bg-emerald-50 text-emerald-800";
    default:
      return "bg-[#F4F7FB] text-[#64748B]";
  }
}

export default function AdminBlogPlannerPage() {
  const [hubs, setHubs] = useState<BlogPlannerHubWithStats[]>([]);
  const [allPages, setAllPages] = useState<BlogPlannerHub[]>([]);
  const [pageView, setPageView] = useState<PageView>("overview");
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [items, setItems] = useState<BlogPlannerItem[]>([]);
  const [links, setLinks] = useState<BlogPlannerHubLink[]>([]);
  const [coverage, setCoverage] = useState<BlogPlannerCoverage | null>(null);
  const [ideaTab, setIdeaTab] = useState<IdeaTab>("semrush");
  const [loadingHubs, setLoadingHubs] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [creatingEditorId, setCreatingEditorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [hubManageSearch, setHubManageSearch] = useState("");
  const [overviewSearch, setOverviewSearch] = useState("");
  const [overviewSort, setOverviewSort] = useState<OverviewSort>("name");
  const [targetDraft, setTargetDraft] = useState("");
  const [attachEditors, setAttachEditors] = useState<
    { id: string; primary_keyword: string; status: string }[]
  >([]);
  const [attachBlogs, setAttachBlogs] = useState<
    { id: string; title: string; slug: string; status: string }[]
  >([]);
  const [manualKw, setManualKw] = useState("");
  const [manualTitle, setManualTitle] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(() => new Set());

  const { activeJob, startBulkJob, loading: bulkJobStarting } = useBlogPlannerBulkJob();
  const bulkRunning = Boolean(activeJob) || bulkJobStarting;

  const selectedHub = useMemo(
    () => hubs.find((h) => h.id === selectedHubId) ?? null,
    [hubs, selectedHubId],
  );

  const loadHubs = useCallback(async () => {
    setLoadingHubs(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog-planner/hubs");
      const data = (await res.json()) as {
        ok: boolean;
        hubs?: BlogPlannerHubWithStats[];
        allPages?: BlogPlannerHub[];
        error?: string;
      };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Failed to load hubs");
      setHubs(data.hubs ?? []);
      setAllPages(data.allPages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load hubs");
    } finally {
      setLoadingHubs(false);
    }
  }, []);

  const loadHubDetail = useCallback(async (hubId: string) => {
    setLoadingDetail(true);
    setError(null);
    try {
      const [detailRes, attachRes] = await Promise.all([
        fetch(`/api/admin/blog-planner/hub?hub_id=${encodeURIComponent(hubId)}`),
        fetch(`/api/admin/blog-planner/attachables?hub_id=${encodeURIComponent(hubId)}`),
      ]);
      const detail = (await detailRes.json()) as {
        ok: boolean;
        hub?: BlogPlannerHub;
        items?: BlogPlannerItem[];
        links?: BlogPlannerHubLink[];
        coverage?: BlogPlannerCoverage;
        error?: string;
      };
      if (!detailRes.ok || !detail.ok) throw new Error(detail.error ?? "Failed to load hub");
      setItems(detail.items ?? []);
      setLinks(detail.links ?? []);
      setCoverage(detail.coverage ?? null);
      if (detail.hub) {
        setTargetDraft(
          detail.hub.blog_hub_target_count != null ? String(detail.hub.blog_hub_target_count) : "",
        );
        setHubs((prev) =>
          prev.map((h) => {
            if (h.id !== detail.hub!.id) return h;
            const cov = detail.coverage;
            return {
              ...h,
              ...detail.hub!,
              stats: cov
                ? {
                    ideas: cov.ideas,
                    inContentEditor: cov.inContentEditor,
                    published: cov.published,
                    attached: detail.links?.length ?? 0,
                    totalSupporting: cov.totalSupporting,
                    percentOfTarget: cov.percentOfTarget,
                  }
                : h.stats,
            };
          }),
        );
      }

      const attach = (await attachRes.json()) as {
        ok: boolean;
        editors?: { id: string; primary_keyword: string; status: string }[];
        blogs?: { id: string; title: string; slug: string; status: string }[];
      };
      if (attach.ok) {
        setAttachEditors(attach.editors ?? []);
        setAttachBlogs(attach.blogs ?? []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load hub detail");
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    void loadHubs();
  }, [loadHubs]);

  useEffect(() => {
    if (pageView === "workspace" && selectedHubId) void loadHubDetail(selectedHubId);
  }, [pageView, selectedHubId, loadHubDetail]);

  useEffect(() => {
    if (
      pageView === "workspace" &&
      selectedHubId &&
      activeJob?.hub_tracked_page_id === selectedHubId &&
      activeJob.completed > 0
    ) {
      void loadHubDetail(selectedHubId);
      void loadHubs();
    }
  }, [activeJob?.completed, activeJob?.hub_tracked_page_id, pageView, selectedHubId, loadHubDetail, loadHubs]);

  const openWorkspace = (hubId: string) => {
    setSelectedHubId(hubId);
    setPageView("workspace");
    setIdeaTab("semrush");
    setSelectedItemIds(new Set());
  };

  const toggleItemSelected = (itemId: string) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const selectAllPendingInTab = () => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      for (const item of pendingTabItems) next.add(item.id);
      return next;
    });
  };

  const clearTabSelection = () => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      for (const item of pendingTabItems) next.delete(item.id);
      return next;
    });
  };

  const toggleTabSelectAll = () => {
    if (tabSelectAllChecked) clearTabSelection();
    else selectAllPendingInTab();
  };

  const runBulkCreate = async (itemIds: string[]) => {
    const queue = itemIds
      .map((id) => items.find((i) => i.id === id))
      .filter((i): i is BlogPlannerItem => i != null && isBulkEligible(i));

    if (queue.length === 0) return;

    const estMin = Math.max(1, Math.round(queue.length * 2.5));
    const confirmed = window.confirm(
      `Start background bulk create for ${queue.length} idea${queue.length === 1 ? "" : "s"}?\n\nEditors are built one at a time (~2–3 min each, ~${estMin}+ min total). You can leave this page — progress stays in the bottom-left activity badge.`,
    );
    if (!confirmed) return;

    setError(null);
    try {
      await startBulkJob(queue.map((i) => i.id), selectedHubId);
      setSelectedItemIds(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start bulk job");
    }
  };

  const startBulkFromSelection = () => {
    const ids =
      selectedEligibleCount > 0
        ? [...selectedItemIds].filter((id) => {
            const item = items.find((i) => i.id === id);
            return item && isBulkEligible(item);
          })
        : pendingHubItems.map((i) => i.id);
    void runBulkCreate(ids);
  };

  const backToOverview = () => {
    setPageView("overview");
    void loadHubs();
  };

  const filteredItems = useMemo(() => {
    const source = ideaTab === "semrush" ? "semrush" : "ai";
    return items.filter((i) => i.source === source && i.status !== "dismissed");
  }, [items, ideaTab]);

  const pendingTabItems = useMemo(
    () => filteredItems.filter(isBulkEligible),
    [filteredItems],
  );

  const pendingHubItems = useMemo(
    () => items.filter(isBulkEligible),
    [items],
  );

  const selectedEligibleCount = useMemo(() => {
    let n = 0;
    for (const id of selectedItemIds) {
      const item = items.find((i) => i.id === id);
      if (item && isBulkEligible(item)) n += 1;
    }
    return n;
  }, [selectedItemIds, items]);

  const tabSelectAllChecked =
    pendingTabItems.length > 0 && pendingTabItems.every((i) => selectedItemIds.has(i.id));
  const tabSelectAllIndeterminate =
    !tabSelectAllChecked && pendingTabItems.some((i) => selectedItemIds.has(i.id));

  const semrushCount = useMemo(
    () => items.filter((i) => i.source === "semrush" && i.status !== "dismissed").length,
    [items],
  );
  const aiCount = useMemo(
    () => items.filter((i) => i.source === "ai" && i.status !== "dismissed").length,
    [items],
  );

  const overviewHubs = useMemo(() => {
    const q = overviewSearch.trim().toLowerCase();
    let list = hubs;
    if (q) {
      list = list.filter(
        (h) =>
          hubLabel(h).toLowerCase().includes(q) ||
          h.route_path.toLowerCase().includes(q) ||
          (h.primary_keyword?.toLowerCase().includes(q) ?? false),
      );
    }
    const sorted = [...list];
    if (overviewSort === "name") {
      sorted.sort((a, b) => hubLabel(a).localeCompare(hubLabel(b)));
    } else if (overviewSort === "progress") {
      sorted.sort((a, b) => (b.stats.percentOfTarget ?? -1) - (a.stats.percentOfTarget ?? -1));
    } else {
      sorted.sort((a, b) => b.stats.ideas - a.stats.ideas);
    }
    const misc = sorted.filter((h) => h.is_blog_hub_misc);
    const service = sorted.filter((h) => !h.is_blog_hub_misc);
    return [...service, ...misc];
  }, [hubs, overviewSearch, overviewSort]);

  const handleToggleHub = async (pageId: string, isHub: boolean) => {
    setError(null);
    const res = await fetch("/api/admin/blog-planner/hubs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tracked_page_id: pageId, is_blog_hub: isHub }),
    });
    const data = (await res.json()) as { ok: boolean; hub?: BlogPlannerHub; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error ?? "Failed to update hub");
      return;
    }
    await loadHubs();
    if (isHub && data.hub) openWorkspace(data.hub.id);
  };

  const saveTarget = async () => {
    if (!selectedHubId) return;
    const n = targetDraft.trim() === "" ? null : Number(targetDraft);
    const res = await fetch("/api/admin/blog-planner/hubs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tracked_page_id: selectedHubId,
        blog_hub_target_count: n,
      }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error ?? "Failed to save target");
      return;
    }
    await loadHubDetail(selectedHubId);
    await loadHubs();
  };

  const runDiscover = async () => {
    if (!selectedHubId) return;
    setDiscovering(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog-planner/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hub_tracked_page_id: selectedHubId }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Discovery failed");
      await loadHubDetail(selectedHubId);
      await loadHubs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Discovery failed");
    } finally {
      setDiscovering(false);
    }
  };

  const createEditor = async (itemId: string) => {
    setCreatingEditorId(itemId);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog-planner/create-editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        editorId?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.editorId) {
        throw new Error(data.error ?? "Failed to create editor");
      }
      if (selectedHubId) await loadHubDetail(selectedHubId);
      window.location.href = `/admin/content-editor/${data.editorId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create editor");
      setCreatingEditorId(null);
    }
  };

  const dismissItem = async (itemId: string) => {
    await fetch("/api/admin/blog-planner/items", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: itemId, status: "dismissed" }),
    });
    if (selectedHubId) {
      await loadHubDetail(selectedHubId);
      await loadHubs();
    }
  };

  const addManual = async () => {
    if (!selectedHubId || !manualKw.trim()) return;
    setError(null);
    const res = await fetch("/api/admin/blog-planner/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hub_tracked_page_id: selectedHubId,
        primary_keyword: manualKw,
        suggested_title: manualTitle || manualKw,
      }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error ?? "Failed to add idea");
      return;
    }
    setManualKw("");
    setManualTitle("");
    await loadHubDetail(selectedHubId);
    await loadHubs();
  };

  const attachLink = async (payload: { content_editor_id?: string; blog_post_id?: string }) => {
    if (!selectedHubId) return;
    const res = await fetch("/api/admin/blog-planner/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hub_tracked_page_id: selectedHubId, ...payload }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error ?? "Failed to attach");
      return;
    }
    await loadHubDetail(selectedHubId);
    await loadHubs();
  };

  const nonHubPages = allPages.filter(
    (p) => !p.is_blog_hub && p.route_path !== BLOG_PLANNER_MISC_ROUTE,
  );

  const filteredManagePages = useMemo(() => {
    const q = hubManageSearch.trim().toLowerCase();
    if (!q) return nonHubPages;
    return nonHubPages.filter(
      (p) =>
        p.page_title.toLowerCase().includes(q) ||
        p.route_path.toLowerCase().includes(q) ||
        (p.primary_keyword?.toLowerCase().includes(q) ?? false),
    );
  }, [nonHubPages, hubManageSearch]);

  const hubNavList = useMemo(() => {
    const sorted = [...hubs].sort((a, b) => hubLabel(a).localeCompare(hubLabel(b)));
    return [...sorted.filter((h) => !h.is_blog_hub_misc), ...sorted.filter((h) => h.is_blog_hub_misc)];
  }, [hubs]);

  const hubNavIndex = selectedHubId ? hubNavList.findIndex((h) => h.id === selectedHubId) : -1;
  const prevHub = hubNavIndex > 0 ? hubNavList[hubNavIndex - 1] : null;
  const nextHub =
    hubNavIndex >= 0 && hubNavIndex < hubNavList.length - 1 ? hubNavList[hubNavIndex + 1] : null;

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <AdminPageHeader
        title="Blog Planner"
        subtitle={
          pageView === "overview"
            ? "Compare hub coverage across service pages, then open a hub to plan supporting blogs."
            : "Topic ideas, discovery, and content editors for one hub."
        }
        actions={
          <button
            type="button"
            onClick={() => setManageModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#7B9FD4] bg-[#7B9FD4]/10 px-4 py-2.5 text-sm font-semibold text-[#0A1F44] shadow-sm hover:bg-[#7B9FD4]/20"
          >
            <i className="ri-add-circle-line text-lg" />
            Add / remove hub pages
          </button>
        }
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <BlogPlannerManageHubsModal
        open={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
        pages={filteredManagePages}
        hubCount={hubs.length}
        search={hubManageSearch}
        onSearchChange={setHubManageSearch}
        onToggleHub={(id, checked) => void handleToggleHub(id, checked)}
      />

      {pageView === "overview" ? (
        <section className="space-y-4">
          <div
            className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: ADMIN_BORDER }}
          >
            <div className="relative min-w-0 flex-1">
              <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="search"
                className={`${inputCls} pl-9`}
                placeholder="Filter hubs by name, URL, or keyword…"
                value={overviewSearch}
                onChange={(e) => setOverviewSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="overview-sort">
                Sort hubs
              </label>
              <select
                id="overview-sort"
                value={overviewSort}
                onChange={(e) => setOverviewSort(e.target.value as OverviewSort)}
                className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm font-medium text-[#0A1F44]"
              >
                <option value="name">Sort: Name</option>
                <option value="progress">Sort: Progress</option>
                <option value="ideas">Sort: Ideas backlog</option>
              </select>
              <span className="rounded-full bg-[#F4F7FB] px-3 py-1.5 text-xs font-semibold text-[#64748B]">
                {overviewHubs.length} hub{overviewHubs.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            style={{ borderColor: ADMIN_BORDER }}
          >
            {loadingHubs ? (
              <p className="p-16 text-center text-sm text-[#94A3B8]">
                <i className="ri-loader-4-line mr-2 animate-spin" />
                Loading hubs…
              </p>
            ) : hubs.length === 0 ? (
              <div className="px-8 py-16 text-center">
                <i className="ri-node-tree text-4xl" style={{ color: ADMIN_ACCENT }} />
                <p className="mt-4 text-sm font-medium" style={{ color: ADMIN_TEXT }}>
                  No hub pages yet
                </p>
                <p className="mt-1 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
                  Click <strong>Add / remove hub pages</strong> to mark your service pages as hubs.
                </p>
                <button
                  type="button"
                  onClick={() => setManageModalOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: ADMIN_NAVY }}
                >
                  <i className="ri-add-line" />
                  Set up hubs
                </button>
              </div>
            ) : overviewHubs.length === 0 ? (
              <p className="p-12 text-center text-sm text-[#94A3B8]">No hubs match your filter.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-[#F8FAFC] text-left text-xs uppercase tracking-wider text-[#64748B]">
                    <tr>
                      <th className="px-5 py-3.5">Hub page</th>
                      <th className="px-5 py-3.5">Primary keyword</th>
                      <th className="px-5 py-3.5 w-20">Target</th>
                      <th className="px-5 py-3.5 w-36">Progress</th>
                      <th className="px-5 py-3.5 w-16 text-center">Ideas</th>
                      <th className="px-5 py-3.5 w-16 text-center">Editor</th>
                      <th className="px-5 py-3.5 w-16 text-center">Live</th>
                      <th className="px-5 py-3.5 w-24 text-right" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {overviewHubs.map((hub) => {
                      const pct = hub.stats.percentOfTarget;
                      const barW =
                        pct != null ? pct : Math.min(100, hub.stats.totalSupporting * 8);
                      return (
                        <tr
                          key={hub.id}
                          className="group cursor-pointer transition hover:bg-[#F8FAFC]"
                          onClick={() => openWorkspace(hub.id)}
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-start gap-2">
                              <i
                                className={`mt-0.5 text-base ${
                                  hub.is_blog_hub_misc ? "ri-inbox-archive-line text-[#94A3B8]" : "ri-focus-3-line"
                                }`}
                                style={{ color: hub.is_blog_hub_misc ? undefined : ADMIN_ACCENT }}
                              />
                              <div className="min-w-0">
                                <p className="font-semibold text-[#0A1F44]">{hubLabel(hub)}</p>
                                {!hub.is_blog_hub_misc ? (
                                  <p className="mt-0.5 truncate text-xs text-[#94A3B8]">{hub.route_path}</p>
                                ) : (
                                  <p className="mt-0.5 text-xs text-[#94A3B8]">News & off-topic</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-[#475569]">
                            {hub.primary_keyword ?? "—"}
                          </td>
                          <td className="px-5 py-4 tabular-nums text-[#64748B]">
                            {hub.blog_hub_target_count ?? "—"}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 min-w-[72px] flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{ width: `${barW}%`, backgroundColor: ADMIN_ACCENT }}
                                />
                              </div>
                              <span className="w-9 shrink-0 text-right text-xs tabular-nums text-[#64748B]">
                                {pct != null ? `${pct}%` : "—"}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[#94A3B8]">
                              {hub.stats.totalSupporting} supporting
                            </p>
                          </td>
                          <td className="px-5 py-4 text-center tabular-nums font-medium">
                            {hub.stats.ideas}
                          </td>
                          <td className="px-5 py-4 text-center tabular-nums">
                            {hub.stats.inContentEditor}
                          </td>
                          <td className="px-5 py-4 text-center tabular-nums">
                            {hub.stats.published + hub.stats.attached}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="inline-flex items-center gap-1 rounded-lg bg-[#0A1F44] px-3 py-1.5 text-xs font-semibold text-white opacity-90 group-hover:opacity-100">
                              Open
                              <i className="ri-arrow-right-line" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      ) : selectedHub ? (
        <section className="space-y-5">
          <nav
            className="flex flex-wrap items-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              onClick={backToOverview}
              className="inline-flex items-center gap-1 font-semibold text-[#507969] hover:underline"
            >
              <i className="ri-arrow-left-line" />
              All hubs
            </button>
            <span className="text-[#CBD5E1]">/</span>
            <span className="font-semibold text-[#0A1F44]">{hubLabel(selectedHub)}</span>
          </nav>

          <div
            className="sticky top-0 z-10 rounded-2xl border bg-white p-4 shadow-sm"
            style={{ borderColor: ADMIN_BORDER }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-[#0A1F44]">{hubLabel(selectedHub)}</h2>
                {!selectedHub.is_blog_hub_misc ? (
                  <p className="mt-0.5 truncate text-sm text-[#64748B]">{selectedHub.route_path}</p>
                ) : null}
                {coverage ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { label: "Ideas", value: coverage.ideas },
                      { label: "In editor", value: coverage.inContentEditor },
                      { label: "Published", value: coverage.published },
                      { label: "Attached", value: links.length },
                    ].map((chip) => (
                      <span
                        key={chip.label}
                        className="rounded-full bg-[#F4F7FB] px-2.5 py-1 text-xs font-medium text-[#475569]"
                      >
                        {chip.label}: <strong className="text-[#0A1F44]">{chip.value}</strong>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex rounded-lg border border-[#E2E8F0] p-0.5">
                  <button
                    type="button"
                    disabled={!prevHub}
                    onClick={() => prevHub && openWorkspace(prevHub.id)}
                    className="rounded-md px-2.5 py-2 text-[#64748B] hover:bg-[#F4F7FB] disabled:opacity-30"
                    aria-label="Previous hub"
                  >
                    <i className="ri-arrow-left-s-line text-lg" />
                  </button>
                  <button
                    type="button"
                    disabled={!nextHub}
                    onClick={() => nextHub && openWorkspace(nextHub.id)}
                    className="rounded-md px-2.5 py-2 text-[#64748B] hover:bg-[#F4F7FB] disabled:opacity-30"
                    aria-label="Next hub"
                  >
                    <i className="ri-arrow-right-s-line text-lg" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1.5">
                  <label className="text-xs font-medium text-[#64748B]">Target</label>
                  <input
                    type="number"
                    min={0}
                    className="w-14 rounded border border-[#E2E8F0] bg-white px-2 py-0.5 text-sm"
                    value={targetDraft}
                    onChange={(e) => setTargetDraft(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => void saveTarget()}
                    className="text-xs font-semibold text-[#507969] hover:underline"
                  >
                    Save
                  </button>
                </div>

                <button
                  type="button"
                  disabled={discovering || loadingDetail}
                  onClick={() => void runDiscover()}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: ADMIN_NAVY }}
                >
                  <i className={discovering ? "ri-loader-4-line animate-spin" : "ri-radar-line"} />
                  {discovering ? "Discovering…" : "Discover topics"}
                </button>
              </div>
            </div>

            {coverage && coverage.target != null && coverage.target > 0 ? (
              <div className="mt-4 border-t pt-4" style={{ borderColor: ADMIN_BORDER }}>
                <div className="flex justify-between text-xs text-[#64748B]">
                  <span>
                    {coverage.totalSupporting} of {coverage.target} supporting posts
                  </span>
                  {coverage.percentOfTarget != null ? (
                    <span>{coverage.percentOfTarget}%</span>
                  ) : null}
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${coverage.percentOfTarget ?? 0}%`,
                      backgroundColor: ADMIN_ACCENT,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className="flex flex-col gap-3 rounded-2xl border bg-[#F8FAFC] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: ADMIN_BORDER }}
          >
            <div className="text-sm text-[#64748B]">
              <span className="font-semibold text-[#0A1F44]">{pendingHubItems.length}</span> ideas
              ready for editors
              {selectedEligibleCount > 0 ? (
                <span className="text-[#507969]"> · {selectedEligibleCount} selected</span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={selectAllPendingInTab}
                disabled={pendingTabItems.length === 0 || bulkRunning}
                className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#475569] hover:border-[#7B9FD4] disabled:opacity-50"
              >
                Select tab ({pendingTabItems.length})
              </button>
              <button
                type="button"
                onClick={() => void runBulkCreate(pendingHubItems.map((i) => i.id))}
                disabled={pendingHubItems.length === 0 || bulkRunning}
                className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#475569] hover:border-[#7B9FD4] disabled:opacity-50"
              >
                All pending ({pendingHubItems.length})
              </button>
              <button
                type="button"
                onClick={() => void startBulkFromSelection()}
                disabled={
                  (selectedEligibleCount === 0 && pendingHubItems.length === 0) || bulkRunning
                }
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ backgroundColor: ADMIN_NAVY }}
              >
                <i className="ri-stack-line" />
                {bulkJobStarting
                  ? "Starting…"
                  : selectedEligibleCount > 0
                    ? `Bulk create (${selectedEligibleCount})`
                    : `Bulk create all (${pendingHubItems.length})`}
              </button>
            </div>
          </div>

          <div className="inline-flex rounded-xl bg-[#F4F7FB] p-1">
            {(["semrush", "ai"] as const).map((tab) => {
              const count = tab === "semrush" ? semrushCount : aiCount;
              const active = ideaTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setIdeaTab(tab)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    active ? "bg-white text-[#0A1F44] shadow-sm" : "text-[#64748B] hover:text-[#0A1F44]"
                  }`}
                >
                  {tab === "semrush" ? "Search demand" : "Authority / FAQ"}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      active ? "bg-[#7B9FD4]/25" : "bg-[#E2E8F0]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            {loadingDetail ? (
              <p className="p-12 text-center text-sm text-[#94A3B8]">
                <i className="ri-loader-4-line mr-2 animate-spin" />
                Loading ideas…
              </p>
            ) : filteredItems.length === 0 ? (
              <p className="p-12 text-center text-sm text-[#94A3B8]">
                No ideas here yet — run Discover topics or add one below.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="bg-[#F8FAFC] text-left text-xs uppercase tracking-wider text-[#64748B]">
                    <tr>
                      <th className="w-10 px-3 py-3.5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-[#0A1F44]"
                          checked={tabSelectAllChecked}
                          ref={(el) => {
                            if (el) el.indeterminate = tabSelectAllIndeterminate;
                          }}
                          onChange={toggleTabSelectAll}
                          disabled={pendingTabItems.length === 0 || bulkRunning}
                          aria-label="Select all pending ideas in this tab"
                        />
                      </th>
                      <th className="px-5 py-3.5 w-[26%]">Keyword</th>
                      <th className="px-5 py-3.5">Suggested title</th>
                      {ideaTab === "semrush" ? (
                        <>
                          <th className="px-5 py-3.5 w-16">Vol</th>
                          <th className="px-5 py-3.5 w-14">KD</th>
                        </>
                      ) : null}
                      <th className="px-5 py-3.5 w-24">Status</th>
                      <th className="px-5 py-3.5 text-right w-44">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredItems.map((item) => {
                      const eligible = isBulkEligible(item);
                      const checked = selectedItemIds.has(item.id);
                      return (
                      <tr key={item.id} className="hover:bg-[#F8FAFC]/80">
                        <td className="px-3 py-4 align-top">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-[#0A1F44]"
                            checked={checked}
                            disabled={!eligible || bulkRunning}
                            onChange={() => toggleItemSelected(item.id)}
                            aria-label={`Select ${item.primary_keyword}`}
                          />
                        </td>
                        <td className="px-5 py-4 align-top font-medium text-[#0A1F44]">
                          {item.primary_keyword}
                        </td>
                        <td className="px-5 py-4 align-top text-[#475569] leading-snug">
                          {item.suggested_title}
                        </td>
                        {ideaTab === "semrush" ? (
                          <>
                            <td className="px-5 py-4 align-top tabular-nums">
                              {formatVol(item.search_volume)}
                            </td>
                            <td className="px-5 py-4 align-top tabular-nums">
                              {item.keyword_difficulty ?? "—"}
                            </td>
                          </>
                        ) : null}
                        <td className="px-5 py-4 align-top">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge(item.status)}`}
                          >
                            {item.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top text-right">
                          <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:justify-end">
                            {item.content_editor_id ? (
                              <Link
                                href={`/admin/content-editor/${item.content_editor_id}`}
                                className="inline-flex items-center gap-1 rounded-lg bg-[#7B9FD4]/20 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] hover:bg-[#7B9FD4]/35"
                              >
                                <i className="ri-quill-pen-line" />
                                Open editor
                              </Link>
                            ) : (
                              <button
                                type="button"
                                disabled={creatingEditorId === item.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  void createEditor(item.id);
                                }}
                                className="inline-flex items-center gap-1 rounded-lg bg-[#0A1F44] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#152d52] disabled:opacity-50"
                              >
                                <i
                                  className={
                                    creatingEditorId === item.id
                                      ? "ri-loader-4-line animate-spin"
                                      : "ri-magic-line"
                                  }
                                />
                                {creatingEditorId === item.id ? "Building…" : "Create editor"}
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                void dismissItem(item.id);
                              }}
                              className="text-xs text-[#94A3B8] hover:text-red-600"
                            >
                              Dismiss
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#0A1F44]">
                <i className="ri-add-line text-[#7B9FD4]" />
                Add idea manually
              </h3>
              <div className="mt-3 space-y-3">
                <input
                  className={inputCls}
                  placeholder="Primary keyword"
                  value={manualKw}
                  onChange={(e) => setManualKw(e.target.value)}
                />
                <input
                  className={inputCls}
                  placeholder="Blog title (optional)"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => void addManual()}
                className="mt-4 rounded-xl bg-[#0A1F44] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#152d52]"
              >
                Add idea
              </button>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#0A1F44]">
                <i className="ri-links-line text-[#7B9FD4]" />
                Attached supporting content
              </h3>
              {links.length === 0 ? (
                <p className="mt-2 text-sm text-[#94A3B8]">
                  Link existing editors or posts to count toward coverage.
                </p>
              ) : (
                <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto text-sm">
                  {links.map((link) => (
                    <li
                      key={link.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2"
                    >
                      {link.content_editor ? (
                        <Link
                          href={`/admin/content-editor/${link.content_editor.id}`}
                          className="truncate font-medium text-[#507969] hover:underline"
                        >
                          {link.content_editor.primary_keyword}
                        </Link>
                      ) : link.blog_post ? (
                        <Link
                          href={`/admin/blog-edit/${link.blog_post.slug}`}
                          className="truncate font-medium text-[#507969] hover:underline"
                        >
                          {link.blog_post.title}
                        </Link>
                      ) : (
                        <span>—</span>
                      )}
                      <span className="shrink-0 text-xs text-[#94A3B8]">linked</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#64748B]">Attach content editor</p>
                  <select
                    className={`${inputCls} mt-1`}
                    defaultValue=""
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v) void attachLink({ content_editor_id: v });
                      e.target.value = "";
                    }}
                  >
                    <option value="">Select editor…</option>
                    {attachEditors.map((ed) => (
                      <option key={ed.id} value={ed.id}>
                        {ed.primary_keyword} ({ed.status})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-[#64748B]">Attach blog post</p>
                  <select
                    className={`${inputCls} mt-1`}
                    defaultValue=""
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v) void attachLink({ blog_post_id: v });
                      e.target.value = "";
                    }}
                  >
                    <option value="">Select post…</option>
                    {attachBlogs.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} ({b.status})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {pageView === "workspace" && !selectedHub ? (
        <p className="text-sm text-[#94A3B8]">Hub not found.</p>
      ) : null}
    </div>
  );
}
