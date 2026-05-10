"use client";

import { useMemo, useRef, useState } from "react";
import type { TrackedPage, TrackedPageInput } from "../types/tracked-page";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { useTrackedPages } from "../hooks/useTrackedPages";
import PageEditModal from "../components/pages/PageEditModal";
import PageDeleteModal from "../components/pages/PageDeleteModal";

type SortCol = "route" | "title" | "keyword" | "created_at" | "status";
type SortDir = "asc" | "desc";

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

  // Column widths (px) — resizable via drag
  const [colWidths, setColWidths] = useState({
    route: 155, title: 130, seo: 185, meta: 195, keyword: 115, status: 108, date: 100, actions: 108,
  });
  const resizeRef = useRef<{ col: keyof typeof colWidths; startX: number; startW: number } | null>(null);

  const startResize = (col: keyof typeof colWidths, e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = { col, startX: e.clientX, startW: colWidths[col] };
    const onMove = (me: MouseEvent) => {
      if (!resizeRef.current) return;
      const w = Math.max(70, resizeRef.current.startW + (me.clientX - resizeRef.current.startX));
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
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
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
          strVal(p.page_title).includes(q) ||
          strVal(p.route_path).includes(q) ||
          strVal(p.seo_title).includes(q) ||
          strVal(p.meta_description).includes(q) ||
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

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPages = useMemo(
    () => filteredSorted.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filteredSorted, safePage, pageSize],
  );

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
      if (ok) showToast("Page saved");
      else showToast("Failed to save page", "error");
      return ok;
    }
    const ok = await createPage(payload);
    if (ok) showToast("Page tracking created");
    else showToast("Failed to create page", "error");
    return ok;
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPage) return;
    const ok = await deletePage(deletingPage.id);
    setDeletingPage(null);
    if (ok) showToast("Page removed from tracking");
    else showToast("Failed to delete page", "error");
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

  // Sort icon helper
  const SortIcon = ({ col }: { col: SortCol }) => {
    if (sortCol !== col) return <i className="ri-arrows-up-down-line text-neutral-300 text-[10px] ml-1" />;
    return sortDir === "asc"
      ? <i className="ri-arrow-up-line text-[#3d6f7f] text-[10px] ml-1" />
      : <i className="ri-arrow-down-line text-[#3d6f7f] text-[10px] ml-1" />;
  };

  // Reusable sortable th
  const SortTh = ({
    col,
    label,
    resizeKey,
    right,
  }: {
    col: SortCol;
    label: string;
    resizeKey: keyof typeof colWidths;
    right?: boolean;
  }) => (
    <th
      className={`py-3 font-semibold text-neutral-500 text-[10px] uppercase tracking-[0.1em] relative select-none${right ? " text-right" : ""}`}
      style={{ paddingLeft: "14px", paddingRight: "12px" }}
    >
      <button
        type="button"
        onClick={() => handleSort(col)}
        className="inline-flex items-center gap-0.5 cursor-pointer hover:text-neutral-700 transition-colors"
      >
        {label}
        <SortIcon col={col} />
      </button>
      <div
        onMouseDown={(e) => startResize(resizeKey, e)}
        className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end"
      >
        <div className="h-full w-[2px] transition-opacity group-hover:opacity-100 opacity-20" style={{ backgroundColor: "#3d6f7f" }} />
      </div>
    </th>
  );

  // Static (non-sortable) th
  const StaticTh = ({
    label,
    resizeKey,
    right,
  }: {
    label: string;
    resizeKey: keyof typeof colWidths;
    right?: boolean;
  }) => (
    <th
      className={`py-3 font-semibold text-neutral-500 text-[10px] uppercase tracking-[0.1em] relative select-none${right ? " text-right" : ""}`}
      style={{ paddingLeft: "14px", paddingRight: "12px" }}
    >
      <span className="block truncate">{label}</span>
      <div
        onMouseDown={(e) => startResize(resizeKey, e)}
        className="absolute top-0 right-0 h-full w-2.5 cursor-col-resize z-10 group flex items-center justify-end"
      >
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
            <button
              type="button"
              onClick={() => void syncFromCodebase()}
              disabled={syncing}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 border border-neutral-200 bg-white hover:border-neutral-300 transition-all disabled:opacity-50"
            >
              <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing…" : "Sync from codebase"}
            </button>
            <button
              type="button"
              onClick={() => { setEditingPage(null); setModalOpen(true); }}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 shadow-[0_2px_12px_rgba(61,111,127,0.2)]"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-add-line text-xs" />
              New Page
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
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search route, title, SEO, meta, keyword…"
                className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
                >
                  <i className="ri-close-line text-[10px]" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[11px] text-neutral-400">Show</span>
              {([10, 20, 50] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => { setPageSize(n); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    pageSize === n ? "bg-[#3d6f7f] text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Count row */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-semibold text-neutral-800">
                {filteredSorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filteredSorted.length)}
              </span>{" "}
              of <span className="font-semibold text-neutral-800">{filteredSorted.length}</span> pages
            </p>
            {sortCol && (
              <button
                type="button"
                onClick={() => { setSortCol("created_at"); setSortDir("desc"); setCurrentPage(1); }}
                className="text-[11px] text-[#3d6f7f] hover:underline cursor-pointer"
              >
                Reset sort
              </button>
            )}
          </div>

          {pages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
              <i className="ri-pages-line text-3xl text-neutral-200 mb-3 block" />
              <p className="text-sm text-neutral-500 mb-6">No pages tracked yet. Sync from your codebase or add one manually.</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => void syncFromCodebase()}
                  disabled={syncing}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 border border-neutral-200 bg-white hover:border-neutral-300 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />
                  Sync from codebase
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingPage(null); setModalOpen(true); }}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_2px_12px_rgba(61,111,127,0.2)] transition-opacity hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: ADMIN_OCEAN }}
                >
                  <i className="ri-add-line text-xs" />
                  New Page
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
                  <table
                    className="text-left text-sm"
                    style={{ tableLayout: "fixed", width: tableWidth + "px", minWidth: "100%" }}
                  >
                    <colgroup>
                      {(["route","title","seo","meta","keyword","status","date","actions"] as (keyof typeof colWidths)[]).map((c) => (
                        <col key={c} style={{ width: colWidths[c] + "px" }} />
                      ))}
                    </colgroup>
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/80">
                        <SortTh col="route" label="Route" resizeKey="route" />
                        <SortTh col="title" label="Page Title" resizeKey="title" />
                        <StaticTh label="SEO Title" resizeKey="seo" />
                        <StaticTh label="Meta Desc." resizeKey="meta" />
                        <SortTh col="keyword" label="Keyword" resizeKey="keyword" />
                        <SortTh col="status" label="Status" resizeKey="status" />
                        <SortTh col="created_at" label="Date Added" resizeKey="date" />
                        <StaticTh label="Actions" resizeKey="actions" right />
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPages.map((p) => (
                        <tr key={p.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition-colors">

                          {/* Route */}
                          <td className="px-3.5 py-3 align-middle overflow-hidden">
                            <code
                              className="text-[11px] text-neutral-700 font-mono bg-neutral-100 px-1.5 py-0.5 rounded block truncate"
                              title={p.route_path}
                            >
                              {p.route_path}
                            </code>
                          </td>

                          {/* Title */}
                          <td className="px-3.5 py-3 align-middle overflow-hidden">
                            <span className="text-[13px] text-neutral-900 font-medium block truncate" title={p.page_title}>
                              {p.page_title}
                            </span>
                          </td>

                          {/* SEO Title */}
                          <td className="px-3.5 py-3 align-top overflow-hidden">
                            {(() => {
                              const key = `${p.id}-seo`;
                              const expanded = expandedCells.has(key);
                              const activeVal = p.seo_title;
                              const defaultVal = p.default_seo_title;
                              const displayVal = activeVal ?? defaultVal;
                              if (!displayVal) return <span className="text-neutral-300 text-[13px]">—</span>;
                              return (
                                <div className="flex flex-col gap-1">
                                  <span
                                    className={`text-[13px] leading-snug ${activeVal ? "text-neutral-800" : "text-neutral-500"} ${expanded ? "" : "line-clamp-2"}`}
                                    title={displayVal}
                                  >
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
                          <td className="px-3.5 py-3 align-top overflow-hidden">
                            {(() => {
                              const key = `${p.id}-meta`;
                              const expanded = expandedCells.has(key);
                              const activeVal = p.meta_description;
                              const defaultVal = p.default_meta_description;
                              const displayVal = activeVal ?? defaultVal;
                              if (!displayVal) return <span className="text-neutral-300 text-[13px]">—</span>;
                              return (
                                <div className="flex flex-col gap-1">
                                  <span
                                    className={`text-[13px] leading-snug ${activeVal ? "text-neutral-800" : "text-neutral-500"} ${expanded ? "" : "line-clamp-2"}`}
                                    title={displayVal}
                                  >
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
                          <td className="px-3.5 py-3 align-middle overflow-hidden">
                            <span className="block truncate text-[13px] text-neutral-600" title={p.primary_keyword ?? ""}>
                              {p.primary_keyword ?? <span className="text-neutral-300">—</span>}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-3.5 py-3 align-middle">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                role="switch"
                                aria-checked={p.is_active}
                                disabled={togglingId === p.id}
                                onClick={() => void handleToggle(p)}
                                className={`flex w-9 h-5 rounded-full p-0.5 transition-colors items-center shrink-0 ${
                                  togglingId === p.id ? "opacity-50 cursor-wait" : "cursor-pointer"
                                } ${p.is_active ? "justify-end bg-emerald-500" : "justify-start bg-neutral-300"}`}
                              >
                                <span className="h-4 w-4 rounded-full bg-white shadow-sm shrink-0" />
                              </button>
                              <span className={`text-[11px] font-semibold ${p.is_active ? "text-emerald-600" : "text-neutral-400"}`}>
                                {p.is_active ? "Active" : "Off"}
                              </span>
                            </div>
                          </td>

                          {/* Date Added */}
                          <td className="px-3.5 py-3 align-middle overflow-hidden">
                            <span className="text-[12px] text-neutral-500 block truncate">{fmtDate(p.created_at)}</span>
                          </td>

                          {/* Actions */}
                          <td className="px-3.5 py-3 align-middle text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                title="View public page"
                                onClick={() => viewPublicUrl(p.route_path)}
                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/6 transition-all cursor-pointer"
                              >
                                <i className="ri-external-link-line text-sm" />
                              </button>
                              <button
                                type="button"
                                title="Edit"
                                onClick={() => openEdit(p)}
                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-[#3d6f7f]/40 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/5 transition-all cursor-pointer"
                              >
                                <i className="ri-edit-line text-sm" />
                              </button>
                              <button
                                type="button"
                                title="Delete"
                                onClick={() => setDeletingPage(p)}
                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                              >
                                <i className="ri-delete-bin-line text-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                  <p className="text-[11px] text-neutral-400">Page {safePage} of {totalPages}</p>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setCurrentPage(1)} disabled={safePage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-skip-left-line text-sm" />
                    </button>
                    <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-arrow-left-s-line text-sm" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 2)
                      .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                        if (idx > 0 && (arr[idx - 1] as number) < n - 1) acc.push("…");
                        acc.push(n);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === "…" ? (
                          <span key={`ellipsis-${idx}`} className="w-8 text-center text-xs text-neutral-400">…</span>
                        ) : (
                          <button key={item} type="button" onClick={() => setCurrentPage(item as number)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              safePage === item ? "bg-[#3d6f7f] text-white" : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )}
                    <button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                      <i className="ri-arrow-right-s-line text-sm" />
                    </button>
                    <button type="button" onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages}
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
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
          toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
        }`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
