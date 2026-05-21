"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import type { TrackedPage, TrackedPageInput } from "../types/tracked-page";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminContentBulkBar from "../components/content-list/AdminContentBulkBar";
import AdminContentFilterPills from "../components/content-list/AdminContentFilterPills";
import AdminContentListMeta from "../components/content-list/AdminContentListMeta";
import AdminContentPagination from "../components/content-list/AdminContentPagination";
import {
  AdminContentEmptyState,
  AdminContentErrorState,
  AdminContentLoadingState,
} from "../components/content-list/AdminContentListStates";
import AdminContentSearchBar from "../components/content-list/AdminContentSearchBar";
import AdminContentStatsGrid from "../components/content-list/AdminContentStatsGrid";
import AdminGscConnectBanner from "../components/content-list/AdminGscConnectBanner";
import AdminTrackedPagesTable, {
  type TrackedPagesSortCol,
} from "../components/content-list/AdminTrackedPagesTable";
import {
  ADMIN_OCEAN,
  adminPrimaryActionCls,
  adminPrimaryBtnCls,
  adminSecondaryBtnCls,
  adminToastErrorCls,
  adminToastSuccessCls,
} from "../lib/adminTheme";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { useTrackedPages } from "../hooks/useTrackedPages";
import { useSearchConsoleData } from "../hooks/useSearchConsoleData";
import PageEditModal from "../components/pages/PageEditModal";
import PageDeleteModal from "../components/pages/PageDeleteModal";
import BulkPickKeywordModal from "../components/BulkPickKeywordModal";
import { callGenerateSeoMetadata, type SeoGenResult } from "../lib/generateSeoMetadata";
import {
  buildPrimaryPageKeywordSeed,
  toPageKeywordSeedContextPayload,
} from "../lib/seedCleaner";

type SortCol = TrackedPagesSortCol;
type SortDir = "asc" | "desc";
type PageFilterStatus = "all" | "active" | "inactive";

type SeoStatus = {
  status: "generating" | "done" | "error";
  result?: SeoGenResult;
  error?: string;
};

function strVal(v: string | null | undefined) {
  return (v ?? "").toLowerCase();
}

export default function AdminTrackedPagesPage() {
  const { pages, loading, error, createPage, updatePage, deletePage, toggleActive, refetch } =
    useTrackedPages();
  const { data: gscData, loading: gscLoading, needsOAuth: gscNeedsOAuth } = useSearchConsoleData();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<PageFilterStatus>("all");
  const [pageSize, setPageSize] = useState<10 | 20 | 50>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState<SortCol>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<TrackedPage | null>(null);
  const [deletingPage, setDeletingPage] = useState<TrackedPage | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Per-row SEO gen status
  const [seoStatuses, setSeoStatuses] = useState<Record<string, SeoStatus>>({});
  const [bulkSeoRunning, setBulkSeoRunning] = useState(false);
  const [bulkSeoProgress, setBulkSeoProgress] = useState({ done: 0, total: 0 });
  const abortRef = useRef(false);
  const [bulkPickKeywordOpen, setBulkPickKeywordOpen] = useState(false);

  // Word counts for tracked pages — fetched on demand via server API
  type WcEntry = { status: "idle" | "loading" | "done" | "error"; words?: number; error?: string };
  const [wordCounts, setWordCounts] = useState<Record<string, WcEntry>>({});
  const [analyzingAll, setAnalyzingAll] = useState(false);

  // Expanded long-text cells
  const [expandedCells, setExpandedCells] = useState<Set<string>>(new Set());
  const toggleCell = (key: string) =>
    setExpandedCells((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const handleSort = (col: SortCol) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const syncFromCodebase = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/sync-pages", { method: "POST", cache: "no-store" });
      const contentType = res.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? ((await res.json()) as { inserted?: number; error?: string })
        : { error: await res.text() };
      if (!res.ok || payload.error) throw new Error(payload.error ?? "Sync failed");
      if ((payload.inserted ?? 0) === 0) showToast("All pages already tracked");
      else showToast(`Synced ${payload.inserted} page${payload.inserted !== 1 ? "s" : ""} from codebase`);
      await refetch();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Sync failed", "error");
    } finally {
      setSyncing(false);
    }
  };

  // ── AI Generate Meta Data ───────────────────────────────────────────────────

  const runSeoForPage = useCallback(async (p: TrackedPage) => {
    setSeoStatuses((prev) => ({ ...prev, [p.id]: { status: "generating" } }));
    try {
      const result = await callGenerateSeoMetadata({
        type: "page",
        title: p.page_title,
        route: p.route_path,
        keyword: p.primary_keyword ?? undefined,
      });
      setSeoStatuses((prev) => ({ ...prev, [p.id]: { status: "done", result } }));
    } catch (err) {
      setSeoStatuses((prev) => ({
        ...prev,
        [p.id]: { status: "error", error: err instanceof Error ? err.message : "Failed" },
      }));
    }
  }, []);

  const revalidatePage = useCallback(async (routePath: string) => {
    try {
      const origin = getPublicSiteOrigin();
      await fetch(`${origin}/api/admin/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: routePath }),
      });
    } catch {
      // non-critical — page will still update on next ISR cycle
    }
  }, []);

  const applySeoForPage = useCallback(async (p: TrackedPage, result: SeoGenResult) => {
    const updates: { page_title?: string; seo_title?: string; meta_description: string } = {
      meta_description: result.meta_description,
    };
    if (result.page_title?.trim()) updates.page_title = result.page_title.trim();
    if (result.seo_title?.trim()) updates.seo_title = result.seo_title.trim();
    const ok = await updatePage(p.id, updates);
    if (ok) {
      showToast("Meta data saved");
      setSeoStatuses((prev) => {
        const next = { ...prev };
        delete next[p.id];
        return next;
      });
      void revalidatePage(p.route_path);
    } else {
      showToast("Failed to save SEO metadata", "error");
    }
  }, [updatePage, revalidatePage]);

  const handleBulkSeo = useCallback(async () => {
    const targets = pages.filter((p) => selectedIds.has(p.id));
    if (targets.length === 0) return;
    abortRef.current = false;
    setBulkSeoRunning(true);
    setBulkSeoProgress({ done: 0, total: targets.length });

    // Mark all pending
    setSeoStatuses((prev) => {
      const next = { ...prev };
      targets.forEach((p) => { next[p.id] = { status: "generating" }; });
      return next;
    });

    let done = 0;
    for (const p of targets) {
      if (abortRef.current) break;
      try {
        const result = await callGenerateSeoMetadata({
          type: "page", title: p.page_title, route: p.route_path, keyword: p.primary_keyword ?? undefined,
        });
        setSeoStatuses((prev) => ({ ...prev, [p.id]: { status: "done", result } }));
      } catch (err) {
        setSeoStatuses((prev) => ({
          ...prev,
          [p.id]: { status: "error", error: err instanceof Error ? err.message : "Failed" },
        }));
      }
      done++;
      setBulkSeoProgress({ done, total: targets.length });
    }
    setBulkSeoRunning(false);
    showToast(`Meta data generated for ${done} page${done !== 1 ? "s" : ""}. Review and apply below.`);
  }, [pages, selectedIds]);

  const handleApplyAllGenerated = useCallback(async () => {
    const toApply = pages.filter((p) => seoStatuses[p.id]?.status === "done" && seoStatuses[p.id]?.result);
    let saved = 0;
    for (const p of toApply) {
      const result = seoStatuses[p.id]?.result!;
      const updates: { page_title?: string; seo_title?: string; meta_description: string } = {
        meta_description: result.meta_description,
      };
      if (result.page_title?.trim()) updates.page_title = result.page_title.trim();
      if (result.seo_title?.trim()) updates.seo_title = result.seo_title.trim();
      const ok = await updatePage(p.id, updates);
      if (ok) {
        saved++;
        void revalidatePage(p.route_path);
      }
    }
    setSeoStatuses({});
    setSelectedIds(new Set());
    showToast(`Applied meta data to ${saved} page${saved !== 1 ? "s" : ""}`);
  }, [pages, seoStatuses, updatePage, revalidatePage]);

  // ── Stats / filter / sort ───────────────────────────────────────────────────

  const stats = useMemo(() => {
    const total = pages.length;
    const active = pages.filter((p) => p.is_active).length;
    const inactive = total - active;
    const withKeyword = pages.filter((p) => (p.primary_keyword?.trim() ?? "").length > 0).length;
    return { total, active, inactive, withKeyword };
  }, [pages]);

  const filteredSorted = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let filtered = q
      ? pages.filter((p) =>
          strVal(p.page_title).includes(q) || strVal(p.route_path).includes(q) ||
          strVal(p.seo_title).includes(q) || strVal(p.meta_description).includes(q) ||
          strVal(p.primary_keyword).includes(q),
        )
      : [...pages];

    if (filterStatus === "active") filtered = filtered.filter((p) => p.is_active);
    else if (filterStatus === "inactive") filtered = filtered.filter((p) => !p.is_active);

    filtered.sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      if (sortCol === "route") { av = strVal(a.route_path); bv = strVal(b.route_path); }
      else if (sortCol === "title") { av = strVal(a.page_title); bv = strVal(b.page_title); }
      else if (sortCol === "keyword") { av = strVal(a.primary_keyword); bv = strVal(b.primary_keyword); }
      else if (sortCol === "created_at") { av = a.created_at ?? ""; bv = b.created_at ?? ""; }
      else if (sortCol === "status") { av = a.is_active ? 1 : 0; bv = b.is_active ? 1 : 0; }
      else if (sortCol === "wordCount") { av = wordCounts[a.id]?.words ?? -1; bv = wordCounts[b.id]?.words ?? -1; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [pages, searchQuery, filterStatus, sortCol, sortDir, wordCounts]);

  const totalPaginatedPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const safePage = Math.min(currentPage, totalPaginatedPages);
  const paginatedPages = useMemo(
    () => filteredSorted.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filteredSorted, safePage, pageSize],
  );

  const allPageSelected = paginatedPages.length > 0 && paginatedPages.every((p) => selectedIds.has(p.id));
  const somePageSelected = paginatedPages.some((p) => selectedIds.has(p.id)) && !allPageSelected;
  const selectedCount = selectedIds.size;
  const pendingReviewCount = Object.values(seoStatuses).filter((s) => s.status === "done").length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      paginatedPages.forEach((p) => checked ? next.add(p.id) : next.delete(p.id));
      return next;
    });
  };

  // ── Edit / delete handlers ─────────────────────────────────────────────────

  const openEdit = (p: TrackedPage) => { setEditingPage(p); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingPage(null); };

  const handleSubmitPage = async (payload: TrackedPageInput): Promise<boolean> => {
    if (editingPage) {
      const ok = await updatePage(editingPage.id, {
        route_path: payload.route_path,
        page_title: payload.page_title,
        seo_title: payload.seo_title,
        meta_description: payload.meta_description,
        primary_keyword: payload.primary_keyword,
        notes: payload.notes,
        is_active: payload.is_active,
      });
      if (ok) showToast("Page saved"); else showToast("Failed to save page", "error");
      return ok;
    }
    const ok = await createPage(payload);
    if (ok) showToast("Page tracking created"); else showToast("Failed to create page", "error");
    return ok;
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPage) return;
    const ok = await deletePage(deletingPage.id);
    setDeletingPage(null);
    if (ok) showToast("Page removed from tracking"); else showToast("Failed to delete page", "error");
  };

  const handleToggle = async (p: TrackedPage) => {
    setTogglingId(p.id);
    const ok = await toggleActive(p.id, p.is_active);
    setTogglingId(null);
    if (ok) showToast(p.is_active ? "Page deactivated" : "Page activated");
    else showToast("Failed to update status", "error");
  };

  const viewPublicUrl = (routePath: string) => {
    const origin = getPublicSiteOrigin();
    const path = routePath.startsWith("/") ? routePath : `/${routePath}`;
    window.open(`${origin}${path}`, "_blank", "noopener,noreferrer");
  };

  // ── Page word count ────────────────────────────────────────────────────────

  const fetchPageWordCount = async (p: TrackedPage) => {
    setWordCounts((prev) => ({ ...prev, [p.id]: { status: "loading" } }));
    try {
      const res = await fetch("/api/admin/page-word-count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route_path: p.route_path }),
        cache: "no-store",
      });
      const json = (await res.json()) as { ok?: boolean; words?: number; error?: string };
      if (!res.ok || !json.ok || typeof json.words !== "number") {
        throw new Error(json.error ?? `HTTP ${res.status}`);
      }
      setWordCounts((prev) => ({ ...prev, [p.id]: { status: "done", words: json.words } }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not count words.";
      setWordCounts((prev) => ({ ...prev, [p.id]: { status: "error", error: message } }));
    }
  };

  const analyzeVisible = async () => {
    setAnalyzingAll(true);
    for (const p of paginatedPages) {
      if (wordCounts[p.id]?.status === "done") continue;
      await fetchPageWordCount(p);
    }
    setAnalyzingAll(false);
  };

  const dismissSeoStatus = useCallback((id: string) => {
    setSeoStatuses((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Pages"
        subtitle="Manage tracked pages, SEO metadata, keywords, and content editor links."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void syncFromCodebase()}
              disabled={syncing}
              className={adminSecondaryBtnCls}
            >
              <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing…" : "Sync from codebase"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingPage(null);
                setModalOpen(true);
              }}
              className={adminPrimaryActionCls}
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-add-line text-xs" />
              New Page
            </button>
          </div>
        }
      />

      <AdminContentStatsGrid
        stats={[
          { label: "Total Pages", value: stats.total, icon: "ri-pages-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/8" },
          { label: "Active", value: stats.active, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Inactive", value: stats.inactive, icon: "ri-indeterminate-circle-line", color: "text-[#64748B]", bg: "bg-[#F4F7FB]" },
          { label: "With Keyword", value: stats.withKeyword, icon: "ri-keyboard-line", color: "text-amber-600", bg: "bg-amber-50" },
        ]}
      />

      <AdminContentSearchBar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
        placeholder="Search route, title, SEO, meta, keyword…"
      >
        <AdminContentFilterPills
          value={filterStatus}
          options={["all", "active", "inactive"] as const}
          onChange={(value) => {
            setFilterStatus(value);
            setCurrentPage(1);
          }}
        />
      </AdminContentSearchBar>

      {gscNeedsOAuth && !gscLoading ? <AdminGscConnectBanner entityLabel="page" /> : null}

      <AdminContentBulkBar count={selectedCount} noun="page">
        {bulkSeoRunning ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2">
              <i className="ri-loader-4-line animate-spin text-sm text-white" />
              <span className="whitespace-nowrap text-[11px] font-semibold text-white">
                Generating {bulkSeoProgress.done}/{bulkSeoProgress.total}…
              </span>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                  style={{
                    width: `${bulkSeoProgress.total > 0 ? (bulkSeoProgress.done / bulkSeoProgress.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                abortRef.current = true;
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-red-500/80 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-500"
            >
              <i className="ri-stop-line text-xs" />
              Stop
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => void handleBulkSeo()}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-violet-500 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-violet-400"
          >
            <i className="ri-sparkling-2-line text-xs" />
            AI Generate Meta Data
          </button>
        )}
        {pendingReviewCount > 0 && !bulkSeoRunning ? (
          <button
            type="button"
            onClick={() => void handleApplyAllGenerated()}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-emerald-400"
          >
            <i className="ri-check-double-line text-xs" />
            Apply All ({pendingReviewCount})
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => setBulkPickKeywordOpen(true)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0A1F44] transition-colors hover:bg-white/90"
        >
          <i className="ri-search-eye-line text-xs" />
          Auto-pick Keywords
        </button>
        <button
          type="button"
          onClick={() => setSelectedIds(new Set())}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/20"
        >
          <i className="ri-close-line text-xs" />
          Deselect
        </button>
      </AdminContentBulkBar>

      <AdminContentListMeta
        rangeStart={filteredSorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
        rangeEnd={Math.min(safePage * pageSize, filteredSorted.length)}
        total={filteredSorted.length}
        noun="pages"
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        hint={selectedCount === 0 ? "Select pages to use bulk actions" : undefined}
        trailing={
          <button
            type="button"
            onClick={() => {
              setSortCol("created_at");
              setSortDir("desc");
              setCurrentPage(1);
            }}
            className="cursor-pointer text-[11px] text-[#0A1F44] hover:underline"
          >
            Reset sort
          </button>
        }
      />

      {loading ? <AdminContentLoadingState label="Loading pages…" /> : null}

      {error && !loading ? <AdminContentErrorState message={error} /> : null}

      {!loading && !error && pages.length === 0 ? (
        <AdminContentEmptyState
          icon="ri-pages-line"
          message="No pages tracked yet. Sync from your codebase or add one manually."
          actions={
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => void syncFromCodebase()}
                disabled={syncing}
                className={adminSecondaryBtnCls}
              >
                <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />
                Sync from codebase
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingPage(null);
                  setModalOpen(true);
                }}
                className={adminPrimaryBtnCls}
              >
                <i className="ri-add-line text-xs" />
                New Page
              </button>
            </div>
          }
        />
      ) : null}

      {!loading && !error && pages.length > 0 && filteredSorted.length === 0 ? (
        <AdminContentEmptyState
          icon="ri-search-line"
          message={`No pages match "${searchQuery.trim()}".`}
        />
      ) : null}

      {!loading && !error && filteredSorted.length > 0 ? (
        <>
          <AdminTrackedPagesTable
            pages={paginatedPages}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            allPageSelected={allPageSelected}
            somePageSelected={somePageSelected}
            onSelectAll={handleSelectAll}
            sortCol={sortCol}
            sortDir={sortDir}
            onSort={handleSort}
            wordCounts={wordCounts}
            fetchPageWordCount={fetchPageWordCount}
            analyzeVisible={analyzeVisible}
            analyzingAll={analyzingAll}
            expandedCells={expandedCells}
            toggleCell={toggleCell}
            seoStatuses={seoStatuses}
            runSeoForPage={runSeoForPage}
            applySeoForPage={applySeoForPage}
            onDismissSeo={dismissSeoStatus}
            gscData={gscData}
            gscLoading={gscLoading}
            togglingId={togglingId}
            handleToggle={handleToggle}
            openEdit={openEdit}
            setDeletingPage={setDeletingPage}
            viewPublicUrl={viewPublicUrl}
            updatePage={updatePage}
            refetch={refetch}
          />

          <AdminContentPagination
                currentPage={safePage}
                totalPages={totalPaginatedPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : null}

      <PageEditModal page={editingPage} isOpen={modalOpen} onClose={closeModal} onSubmit={handleSubmitPage} />
      {deletingPage && (
        <PageDeleteModal page={deletingPage} onConfirm={handleDeleteConfirm} onCancel={() => setDeletingPage(null)} />
      )}

      {/* Bulk Auto-pick Primary Keyword Modal */}
      {bulkPickKeywordOpen && (
        <BulkPickKeywordModal
          mode="page"
          rows={pages
            .filter((p) => selectedIds.has(p.id))
            .map((p) => ({
              id: p.id,
              title: p.page_title || p.route_path,
              seed: buildPrimaryPageKeywordSeed(p),
              currentKeyword: p.primary_keyword ?? null,
              routePath: p.route_path,
              pageContext: toPageKeywordSeedContextPayload(p),
            }))}
          onApplyRow={async (row, keyword) =>
            updatePage(row.id, { primary_keyword: keyword })
          }
          onClose={() => setBulkPickKeywordOpen(false)}
          onComplete={() => { setBulkPickKeywordOpen(false); void refetch(); }}
        />
      )}
      {toast && (
        <div className={toast.type === "success" ? adminToastSuccessCls : adminToastErrorCls}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
