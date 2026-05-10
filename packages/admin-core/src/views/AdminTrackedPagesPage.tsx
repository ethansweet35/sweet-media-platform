"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import type { TrackedPage, TrackedPageInput } from "../types/tracked-page";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { useTrackedPages } from "../hooks/useTrackedPages";
import PageEditModal from "../components/pages/PageEditModal";
import PageDeleteModal from "../components/pages/PageDeleteModal";
import { callGenerateSeoMetadata, type SeoGenResult } from "../lib/generateSeoMetadata";

type SortCol = "route" | "title" | "keyword" | "created_at" | "status";
type SortDir = "asc" | "desc";

type SeoStatus = {
  status: "generating" | "done" | "error";
  result?: SeoGenResult;
  error?: string;
};

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function strVal(v: string | null | undefined) {
  return (v ?? "").toLowerCase();
}

export default function AdminTrackedPagesPage() {
  const { pages, loading, error, createPage, updatePage, deletePage, toggleActive, refetch } =
    useTrackedPages();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Column widths (px)
  const [colWidths, setColWidths] = useState({
    check: 40, route: 150, title: 125, seo: 180, meta: 190, keyword: 110, status: 100, date: 95, actions: 120,
  });
  const resizeRef = useRef<{ col: keyof typeof colWidths; startX: number; startW: number } | null>(null);

  const startResize = (col: keyof typeof colWidths, e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = { col, startX: e.clientX, startW: colWidths[col] };
    const onMove = (me: MouseEvent) => {
      if (!resizeRef.current) return;
      const w = Math.max(60, resizeRef.current.startW + (me.clientX - resizeRef.current.startX));
      setColWidths((p) => ({ ...p, [resizeRef.current!.col]: w }));
    };
    const onUp = () => {
      resizeRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

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

  // ── AI SEO ─────────────────────────────────────────────────────────────────

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
    const ok = await updatePage(p.id, {
      seo_title: result.seo_title ?? undefined,
      meta_description: result.meta_description,
    });
    if (ok) {
      showToast("SEO metadata saved");
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
    showToast(`AI SEO generated for ${done} page${done !== 1 ? "s" : ""}. Review and apply below.`);
  }, [pages, selectedIds]);

  const handleApplyAllGenerated = useCallback(async () => {
    const toApply = pages.filter((p) => seoStatuses[p.id]?.status === "done" && seoStatuses[p.id]?.result);
    let saved = 0;
    for (const p of toApply) {
      const result = seoStatuses[p.id]?.result!;
      const ok = await updatePage(p.id, {
        seo_title: result.seo_title ?? undefined,
        meta_description: result.meta_description,
      });
      if (ok) {
        saved++;
        void revalidatePage(p.route_path);
      }
    }
    setSeoStatuses({});
    setSelectedIds(new Set());
    showToast(`Applied SEO to ${saved} page${saved !== 1 ? "s" : ""}`);
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
    const filtered = q
      ? pages.filter((p) =>
          strVal(p.page_title).includes(q) || strVal(p.route_path).includes(q) ||
          strVal(p.seo_title).includes(q) || strVal(p.meta_description).includes(q) ||
          strVal(p.primary_keyword).includes(q),
        )
      : [...pages];

    filtered.sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      if (sortCol === "route") { av = strVal(a.route_path); bv = strVal(b.route_path); }
      else if (sortCol === "title") { av = strVal(a.page_title); bv = strVal(b.page_title); }
      else if (sortCol === "keyword") { av = strVal(a.primary_keyword); bv = strVal(b.primary_keyword); }
      else if (sortCol === "created_at") { av = a.created_at ?? ""; bv = b.created_at ?? ""; }
      else if (sortCol === "status") { av = a.is_active ? 1 : 0; bv = b.is_active ? 1 : 0; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [pages, searchQuery, sortCol, sortDir]);

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

  // ── Sort helpers ───────────────────────────────────────────────────────────

  const SortIcon = ({ col }: { col: SortCol }) =>
    sortCol !== col
      ? <i className="ri-arrows-up-down-line text-neutral-300 text-[10px] ml-1" />
      : sortDir === "asc"
      ? <i className="ri-arrow-up-line text-[#3d6f7f] text-[10px] ml-1" />
      : <i className="ri-arrow-down-line text-[#3d6f7f] text-[10px] ml-1" />;

  const SortTh = ({ col, label, rk }: { col: SortCol; label: string; rk: keyof typeof colWidths }) => (
    <th className="py-3 font-semibold text-neutral-500 text-[10px] uppercase tracking-[0.1em] relative select-none" style={{ paddingLeft: "12px", paddingRight: "10px" }}>
      <button type="button" onClick={() => handleSort(col)} className="inline-flex items-center cursor-pointer hover:text-neutral-700 transition-colors">
        {label}<SortIcon col={col} />
      </button>
      <div onMouseDown={(e) => startResize(rk, e)} className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end">
        <div className="h-full w-[2px] transition-opacity group-hover:opacity-100 opacity-20" style={{ backgroundColor: "#3d6f7f" }} />
      </div>
    </th>
  );

  const StaticTh = ({ label, rk, right }: { label: string; rk: keyof typeof colWidths; right?: boolean }) => (
    <th className={`py-3 font-semibold text-neutral-500 text-[10px] uppercase tracking-[0.1em] relative select-none${right ? " text-right" : ""}`} style={{ paddingLeft: "12px", paddingRight: "10px" }}>
      <span className="block truncate">{label}</span>
      <div onMouseDown={(e) => startResize(rk, e)} className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end">
        <div className="h-full w-[2px] transition-opacity group-hover:opacity-100 opacity-20" style={{ backgroundColor: "#3d6f7f" }} />
      </div>
    </th>
  );

  const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);

  return (
    <div>
      <AdminPageHeader
        title="Pages"
        subtitle="Track your core pages and SEO metadata"
        actions={
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => void syncFromCodebase()} disabled={syncing}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 border border-neutral-200 bg-white hover:border-neutral-300 transition-all disabled:opacity-50">
              <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing…" : "Sync from codebase"}
            </button>
            <button type="button" onClick={() => { setEditingPage(null); setModalOpen(true); }}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 shadow-[0_2px_12px_rgba(61,111,127,0.2)]"
              style={{ backgroundColor: ADMIN_OCEAN }}>
              <i className="ri-add-line text-xs" />New Page
            </button>
          </div>
        }
      />

      {loading && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
          <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block" />
          <p className="text-sm text-neutral-400">Loading pages...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <i className="ri-error-warning-line text-2xl text-red-400 mb-2 block" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total pages", value: stats.total, icon: "ri-pages-line", color: "text-[#3d6f7f]", bg: "bg-[#3d6f7f]/8" },
              { label: "Active", value: stats.active, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Inactive", value: stats.inactive, icon: "ri-indeterminate-circle-line", color: "text-neutral-500", bg: "bg-neutral-100" },
              { label: "With keyword", value: stats.withKeyword, icon: "ri-keyboard-line", color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <i className={`${stat.icon} ${stat.color} text-lg`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 leading-none">{stat.value}</p>
                  <p className="text-[11px] text-neutral-400 mt-1 tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-neutral-100 px-4 py-3 mb-3 flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">
              <i className="ri-search-line text-neutral-400 text-sm flex-shrink-0" />
              <input type="text" value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search route, title, SEO, meta, keyword…"
                className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0" />
              {searchQuery && (
                <button type="button" onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0">
                  <i className="ri-close-line text-[10px]" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[11px] text-neutral-400">Show</span>
              {([10, 20, 50] as const).map((n) => (
                <button key={n} type="button" onClick={() => { setPageSize(n); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${pageSize === n ? "bg-[#3d6f7f] text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedCount > 0 && (
            <div className="rounded-2xl px-5 py-3.5 mb-3 flex items-center gap-4 flex-wrap" style={{ backgroundColor: ADMIN_OCEAN }}>
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[11px] font-bold">{selectedCount}</span>
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  {selectedCount} page{selectedCount !== 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {bulkSeoRunning ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                      <i className="ri-loader-4-line animate-spin text-white text-sm" />
                      <span className="text-white text-[11px] font-semibold whitespace-nowrap">
                        Generating {bulkSeoProgress.done}/{bulkSeoProgress.total}…
                      </span>
                      <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${bulkSeoProgress.total > 0 ? (bulkSeoProgress.done / bulkSeoProgress.total) * 100 : 0}%` }} />
                      </div>
                    </div>
                    <button onClick={() => { abortRef.current = true; }}
                      className="flex items-center gap-1.5 bg-red-500/80 hover:bg-red-500 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-stop-line text-xs" />Stop
                    </button>
                  </div>
                ) : (
                  <button onClick={() => void handleBulkSeo()}
                    className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-sparkling-2-line text-xs" />AI Optimize SEO
                  </button>
                )}
                {pendingReviewCount > 0 && !bulkSeoRunning && (
                  <button onClick={() => void handleApplyAllGenerated()}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-check-double-line text-xs" />Apply All ({pendingReviewCount})
                  </button>
                )}
                <button onClick={() => setSelectedIds(new Set())}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-close-line text-xs" />Deselect
                </button>
              </div>
            </div>
          )}

          {/* Count row */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-semibold text-neutral-800">
                {filteredSorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filteredSorted.length)}
              </span>{" "}
              of <span className="font-semibold text-neutral-800">{filteredSorted.length}</span> pages
            </p>
            <button type="button" onClick={() => { setSortCol("created_at"); setSortDir("desc"); setCurrentPage(1); }}
              className="text-[11px] text-[#3d6f7f] hover:underline cursor-pointer">
              Reset sort
            </button>
          </div>

          {pages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
              <i className="ri-pages-line text-3xl text-neutral-200 mb-3 block" />
              <p className="text-sm text-neutral-500 mb-6">No pages tracked yet. Sync from your codebase or add one manually.</p>
              <div className="flex items-center justify-center gap-3">
                <button type="button" onClick={() => void syncFromCodebase()} disabled={syncing}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 border border-neutral-200 bg-white hover:border-neutral-300 transition-all disabled:opacity-50 cursor-pointer">
                  <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />Sync from codebase
                </button>
                <button type="button" onClick={() => { setEditingPage(null); setModalOpen(true); }}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_2px_12px_rgba(61,111,127,0.2)] transition-opacity hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: ADMIN_OCEAN }}>
                  <i className="ri-add-line text-xs" />New Page
                </button>
              </div>
            </div>
          ) : filteredSorted.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
              <p className="text-sm text-neutral-500">No pages match &ldquo;{searchQuery.trim()}&rdquo;.</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="text-left text-sm" style={{ tableLayout: "fixed", width: tableWidth + "px", minWidth: "100%" }}>
                    <colgroup>
                      {(["check","route","title","seo","meta","keyword","status","date","actions"] as (keyof typeof colWidths)[]).map((c) => (
                        <col key={c} style={{ width: colWidths[c] + "px" }} />
                      ))}
                    </colgroup>
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/80">
                        {/* Checkbox */}
                        <th className="py-3 pl-4 pr-2 relative select-none">
                          <input type="checkbox" checked={allPageSelected}
                            ref={(el) => { if (el) el.indeterminate = somePageSelected; }}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-neutral-300 accent-[#3d6f7f] cursor-pointer" />
                        </th>
                        <SortTh col="route" label="Route" rk="route" />
                        <SortTh col="title" label="Title" rk="title" />
                        <StaticTh label="SEO Title" rk="seo" />
                        <StaticTh label="Meta Desc." rk="meta" />
                        <SortTh col="keyword" label="Keyword" rk="keyword" />
                        <SortTh col="status" label="Status" rk="status" />
                        <SortTh col="created_at" label="Added" rk="date" />
                        <StaticTh label="Actions" rk="actions" right />
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPages.map((p) => {
                        const seoStatus = seoStatuses[p.id];
                        const isSelected = selectedIds.has(p.id);
                        return (
                          <>
                            <tr key={p.id}
                              className={`border-b border-neutral-100 transition-colors ${seoStatus?.status === "done" ? "bg-violet-50/60" : isSelected ? "bg-[#3d6f7f]/3" : "hover:bg-neutral-50/60"}`}>

                              {/* Checkbox */}
                              <td className="pl-4 pr-2 py-3 align-middle">
                                <input type="checkbox" checked={isSelected}
                                  onChange={(e) => setSelectedIds((prev) => {
                                    const next = new Set(prev);
                                    e.target.checked ? next.add(p.id) : next.delete(p.id);
                                    return next;
                                  })}
                                  className="w-3.5 h-3.5 rounded border-neutral-300 accent-[#3d6f7f] cursor-pointer" />
                              </td>

                              {/* Route */}
                              <td className="px-3 py-3 align-middle overflow-hidden">
                                <code className="text-[11px] text-neutral-700 font-mono bg-neutral-100 px-1.5 py-0.5 rounded block truncate" title={p.route_path}>
                                  {p.route_path}
                                </code>
                              </td>

                              {/* Title */}
                              <td className="px-3 py-3 align-middle overflow-hidden">
                                <span className="text-[13px] text-neutral-900 font-medium block truncate" title={p.page_title}>{p.page_title}</span>
                              </td>

                              {/* SEO Title */}
                              <td className="px-3 py-3 align-top overflow-hidden">
                                {(() => {
                                  const key = `${p.id}-seo`;
                                  const expanded = expandedCells.has(key);
                                  const activeVal = p.seo_title;
                                  const defaultVal = p.default_seo_title;
                                  const displayVal = activeVal ?? defaultVal;
                                  if (!displayVal) return <span className="text-neutral-300 text-[13px]">—</span>;
                                  return (
                                    <div className="flex flex-col gap-1">
                                      <span className={`text-[13px] leading-snug ${activeVal ? "text-neutral-800" : "text-neutral-500"} ${expanded ? "" : "line-clamp-2"}`} title={displayVal}>
                                        {displayVal}
                                      </span>
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className={`inline-flex items-center px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${activeVal ? "bg-amber-50 text-amber-600" : "bg-neutral-100 text-neutral-400"}`}>
                                          {activeVal ? "Override" : "Default"}
                                        </span>
                                        {displayVal.length > 50 && (
                                          <button type="button" onClick={() => toggleCell(key)} className="text-[10px] text-[#3d6f7f] hover:underline cursor-pointer">
                                            {expanded ? "less ↑" : "more ↓"}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}
                              </td>

                              {/* Meta Description */}
                              <td className="px-3 py-3 align-top overflow-hidden">
                                {(() => {
                                  const key = `${p.id}-meta`;
                                  const expanded = expandedCells.has(key);
                                  const activeVal = p.meta_description;
                                  const defaultVal = p.default_meta_description;
                                  const displayVal = activeVal ?? defaultVal;
                                  if (!displayVal) return <span className="text-neutral-300 text-[13px]">—</span>;
                                  return (
                                    <div className="flex flex-col gap-1">
                                      <span className={`text-[13px] leading-snug ${activeVal ? "text-neutral-800" : "text-neutral-500"} ${expanded ? "" : "line-clamp-2"}`} title={displayVal}>
                                        {displayVal}
                                      </span>
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className={`inline-flex items-center px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${activeVal ? "bg-amber-50 text-amber-600" : "bg-neutral-100 text-neutral-400"}`}>
                                          {activeVal ? "Override" : "Default"}
                                        </span>
                                        {displayVal.length > 90 && (
                                          <button type="button" onClick={() => toggleCell(key)} className="text-[10px] text-[#3d6f7f] hover:underline cursor-pointer">
                                            {expanded ? "less ↑" : "more ↓"}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}
                              </td>

                              {/* Keyword */}
                              <td className="px-3 py-3 align-middle overflow-hidden">
                                <span className="block truncate text-[13px] text-neutral-600" title={p.primary_keyword ?? ""}>
                                  {p.primary_keyword ?? <span className="text-neutral-300">—</span>}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="px-3 py-3 align-middle">
                                <div className="flex items-center gap-2">
                                  <button type="button" role="switch" aria-checked={p.is_active}
                                    disabled={togglingId === p.id}
                                    onClick={() => void handleToggle(p)}
                                    className={`flex w-9 h-5 rounded-full p-0.5 transition-colors items-center shrink-0 ${togglingId === p.id ? "opacity-50 cursor-wait" : "cursor-pointer"} ${p.is_active ? "justify-end bg-emerald-500" : "justify-start bg-neutral-300"}`}>
                                    <span className="h-4 w-4 rounded-full bg-white shadow-sm shrink-0" />
                                  </button>
                                  <span className={`text-[11px] font-semibold ${p.is_active ? "text-emerald-600" : "text-neutral-400"}`}>
                                    {p.is_active ? "Active" : "Off"}
                                  </span>
                                </div>
                              </td>

                              {/* Date Added */}
                              <td className="px-3 py-3 align-middle overflow-hidden">
                                <span className="text-[12px] text-neutral-500 block truncate">{fmtDate(p.created_at)}</span>
                              </td>

                              {/* Actions */}
                              <td className="px-3 py-3 align-middle text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {/* Inline AI SEO */}
                                  {seoStatus?.status === "generating" ? (
                                    <div className="w-8 h-8 flex items-center justify-center">
                                      <i className="ri-loader-4-line animate-spin text-violet-500 text-sm" />
                                    </div>
                                  ) : (
                                    <button type="button" title="AI Optimize SEO" onClick={() => void runSeoForPage(p)}
                                      className={`w-8 h-8 inline-flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                                        seoStatus?.status === "done"
                                          ? "text-violet-600 bg-violet-100 hover:bg-violet-200"
                                          : seoStatus?.status === "error"
                                          ? "text-red-500 bg-red-50 hover:bg-red-100"
                                          : "text-neutral-400 hover:text-violet-600 hover:bg-violet-50"
                                      }`}>
                                      <i className="ri-sparkling-2-line text-sm" />
                                    </button>
                                  )}
                                  <button type="button" title="View public page" onClick={() => viewPublicUrl(p.route_path)}
                                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/6 transition-all cursor-pointer">
                                    <i className="ri-external-link-line text-sm" />
                                  </button>
                                  <button type="button" title="Edit" onClick={() => openEdit(p)}
                                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-[#3d6f7f]/40 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/5 transition-all cursor-pointer">
                                    <i className="ri-edit-line text-sm" />
                                  </button>
                                  <button type="button" title="Delete" onClick={() => setDeletingPage(p)}
                                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer">
                                    <i className="ri-delete-bin-line text-sm" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* AI SEO result preview row */}
                            {seoStatus?.status === "done" && seoStatus.result && (
                              <tr key={`${p.id}-seo-preview`} className="bg-violet-50 border-b border-violet-100">
                                <td colSpan={9} className="px-5 py-3">
                                  <div className="flex items-start gap-4 flex-wrap">
                                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                                      <i className="ri-sparkling-2-line text-violet-500 text-sm" />
                                      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-violet-600">AI Suggestion</span>
                                    </div>
                                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {seoStatus.result.seo_title && (
                                        <div>
                                          <p className="text-[9px] uppercase tracking-wider text-violet-400 font-bold mb-0.5">SEO Title ({seoStatus.result.seo_title.length} chars)</p>
                                          <p className="text-[13px] text-neutral-800 leading-snug">{seoStatus.result.seo_title}</p>
                                        </div>
                                      )}
                                      <div>
                                        <p className="text-[9px] uppercase tracking-wider text-violet-400 font-bold mb-0.5">Meta Description ({seoStatus.result.meta_description.length} chars)</p>
                                        <p className="text-[13px] text-neutral-700 leading-snug">{seoStatus.result.meta_description}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <button type="button" onClick={() => void applySeoForPage(p, seoStatus.result!)}
                                        className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                                        <i className="ri-check-line text-xs" />Apply
                                      </button>
                                      <button type="button" onClick={() => setSeoStatuses((prev) => { const n = { ...prev }; delete n[p.id]; return n; })}
                                        className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors">
                                        <i className="ri-close-line text-xs" />Dismiss
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}

                            {seoStatus?.status === "error" && (
                              <tr key={`${p.id}-seo-error`} className="bg-red-50 border-b border-red-100">
                                <td colSpan={9} className="px-5 py-2">
                                  <div className="flex items-center gap-3">
                                    <i className="ri-error-warning-line text-red-400 text-sm flex-shrink-0" />
                                    <p className="text-[12px] text-red-600 flex-1">{seoStatus.error}</p>
                                    <button type="button" onClick={() => void runSeoForPage(p)}
                                      className="text-[11px] text-red-500 hover:underline cursor-pointer flex-shrink-0">Retry</button>
                                    <button type="button" onClick={() => setSeoStatuses((prev) => { const n = { ...prev }; delete n[p.id]; return n; })}
                                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer flex-shrink-0">
                                      <i className="ri-close-line text-sm" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPaginatedPages > 1 && (
                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                  <p className="text-[11px] text-neutral-400">Page {safePage} of {totalPaginatedPages}</p>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setCurrentPage(1)} disabled={safePage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-skip-left-line text-sm" />
                    </button>
                    <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-arrow-left-s-line text-sm" />
                    </button>
                    {Array.from({ length: totalPaginatedPages }, (_, i) => i + 1)
                      .filter((n) => n === 1 || n === totalPaginatedPages || Math.abs(n - safePage) <= 2)
                      .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                        if (idx > 0 && (arr[idx - 1] as number) < n - 1) acc.push("…");
                        acc.push(n);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === "…" ? (
                          <span key={`e-${idx}`} className="w-8 text-center text-xs text-neutral-400">…</span>
                        ) : (
                          <button key={item} type="button" onClick={() => setCurrentPage(item as number)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${safePage === item ? "bg-[#3d6f7f] text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
                            {item}
                          </button>
                        )
                      )}
                    <button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPaginatedPages, p + 1))} disabled={safePage === totalPaginatedPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-arrow-right-s-line text-sm" />
                    </button>
                    <button type="button" onClick={() => setCurrentPage(totalPaginatedPages)} disabled={safePage === totalPaginatedPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-skip-right-line text-sm" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      <PageEditModal page={editingPage} isOpen={modalOpen} onClose={closeModal} onSubmit={handleSubmitPage} />
      {deletingPage && (
        <PageDeleteModal page={deletingPage} onConfirm={handleDeleteConfirm} onCancel={() => setDeletingPage(null)} />
      )}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"}`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
