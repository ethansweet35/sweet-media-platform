"use client";

import { useMemo, useState } from "react";
import { AdminPageHeader, supabase } from "@sweetmedia/admin-core";
import { ADMIN_OCEAN } from "@sweetmedia/admin-core";
import Seo from "@/components/feature/Seo";
import { useTrackedPages } from "@sweetmedia/admin-core";
import PageEditModal from "@/components/pages/admin/pages/components/PageEditModal";
import PageDeleteModal from "@/components/pages/admin/pages/components/PageDeleteModal";
import { getPublicSiteOrigin } from "@/lib/publicSiteUrl";
import type { TrackedPage, TrackedPageInput } from "@sweetmedia/admin-core";

function truncateSeoTitle(title: string | null, max = 60): string {
  if (!title) return "—";
  const t = title.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export default function AdminPagesTrackingPage() {
  const { pages, loading, error, createPage, updatePage, deletePage, toggleActive, refetch } =
    useTrackedPages();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<TrackedPage | null>(null);
  const [deletingPage, setDeletingPage] = useState<TrackedPage | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const syncFromCodebase = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/app-pages", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch app pages");
      const json = (await res.json()) as { routes?: string[] };
      const routes = json.routes ?? [];
      if (routes.length === 0) { showToast("No routes found in codebase", "error"); return; }

      const { data: existing } = await supabase.from("tracked_pages").select("route_path");
      const existingSet = new Set((existing ?? []).map((r: { route_path: string }) => r.route_path));

      const { data: maxRow } = await supabase.from("tracked_pages").select("display_order")
        .order("display_order", { ascending: false }).limit(1).maybeSingle();
      const baseOrder = maxRow ? Number((maxRow as { display_order: number }).display_order) + 10 : 0;

      const toInsert = routes
        .filter((r) => !existingSet.has(r))
        .map((r, i) => ({
          route_path: r,
          page_title: r === "/" ? "Home" : r.replace(/^\//, "").split("/").map((s) =>
            s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
          ).join(" › "),
          display_order: baseOrder + (i + 1) * 10,
          is_active: true,
        }));

      if (toInsert.length === 0) { showToast("All pages already tracked"); return; }

      const { error } = await supabase.from("tracked_pages").upsert(toInsert, {
        onConflict: "route_path",
        ignoreDuplicates: true,
      });
      if (error) throw error;
      showToast(`Synced ${toInsert.length} page${toInsert.length > 1 ? "s" : ""} from codebase`);
      await refetch();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Sync failed", "error");
    } finally {
      setSyncing(false);
    }
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const stats = useMemo(() => {
    const total = pages.length;
    const active = pages.filter((p) => p.is_active).length;
    const inactive = total - active;
    const withKeyword = pages.filter((p) => (p.primary_keyword?.trim() ?? "").length > 0).length;
    return { total, active, inactive, withKeyword };
  }, [pages]);

  const filteredPages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter((p) => {
      const title = (p.page_title ?? "").toLowerCase();
      const route = (p.route_path ?? "").toLowerCase();
      const kw = (p.primary_keyword ?? "").toLowerCase();
      return title.includes(q) || route.includes(q) || kw.includes(q);
    });
  }, [pages, searchQuery]);

  const openNewPage = () => {
    setEditingPage(null);
    setModalOpen(true);
  };

  const openEdit = (p: TrackedPage) => {
    setEditingPage(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPage(null);
  };

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

  const viewPublicUrl = (route_path: string) => {
    const origin = getPublicSiteOrigin();
    const path = route_path.startsWith("/") ? route_path : `/${route_path}`;
    const url = `${origin}${path}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="">
      <Seo title="Pages | Admin" description="Track core pages and SEO metadata" noindex />

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
              onClick={openNewPage}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 shadow-[0_2px_12px_rgba(61,111,127,0.2)]"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-add-line text-xs" />
              New Page
            </button>
          </div>
        }
      />

      <div className="">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total pages",
                  value: stats.total,
                  icon: "ri-pages-line",
                  color: "text-[#3d6f7f]",
                  bg: "bg-[#3d6f7f]/8",
                },
                {
                  label: "Active",
                  value: stats.active,
                  icon: "ri-checkbox-circle-line",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Inactive",
                  value: stats.inactive,
                  icon: "ri-indeterminate-circle-line",
                  color: "text-neutral-500",
                  bg: "bg-neutral-100",
                },
                {
                  label: "With primary keyword",
                  value: stats.withKeyword,
                  icon: "ri-keyboard-line",
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <i className={`${stat.icon} ${stat.color} text-lg`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 leading-none">{stat.value}</p>
                    <p className="text-[11px] text-neutral-400 mt-1 tracking-wide">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-4 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
                <i className="ri-search-line text-neutral-400 text-sm flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by page title, route path, or primary keyword..."
                  className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <i className="ri-close-line text-[10px]" />
                  </button>
                )}
              </div>
            </div>

            {pages.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                <i className="ri-pages-line text-3xl text-neutral-200 mb-3 block" />
                <p className="text-sm text-neutral-500 mb-6">
                  No pages tracked yet. Sync from your codebase or add one manually.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => void syncFromCodebase()}
                    disabled={syncing}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 border border-neutral-200 bg-white hover:border-neutral-300 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <i className={`ri-refresh-line text-xs ${syncing ? "animate-spin" : ""}`} />
                    {syncing ? "Syncing…" : "Sync from codebase"}
                  </button>
                  <button
                    type="button"
                    onClick={openNewPage}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_2px_12px_rgba(61,111,127,0.2)] transition-opacity hover:opacity-95 cursor-pointer"
                    style={{ backgroundColor: ADMIN_OCEAN }}
                  >
                    <i className="ri-add-line text-xs" />
                    New Page
                  </button>
                </div>
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                <p className="text-sm text-neutral-500">
                  No pages match &ldquo;{searchQuery.trim()}&rdquo;. Try another search.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/80">
                        <th className="px-5 py-3.5 font-semibold text-neutral-600 text-[11px] uppercase tracking-[0.1em]">
                          Route Path
                        </th>
                        <th className="px-5 py-3.5 font-semibold text-neutral-600 text-[11px] uppercase tracking-[0.1em]">
                          Page Title
                        </th>
                        <th className="px-5 py-3.5 font-semibold text-neutral-600 text-[11px] uppercase tracking-[0.1em]">
                          SEO Title
                        </th>
                        <th className="px-5 py-3.5 font-semibold text-neutral-600 text-[11px] uppercase tracking-[0.1em]">
                          Primary Keyword
                        </th>
                        <th className="px-5 py-3.5 font-semibold text-neutral-600 text-[11px] uppercase tracking-[0.1em]">
                          Status
                        </th>
                        <th className="px-5 py-3.5 font-semibold text-neutral-600 text-[11px] uppercase tracking-[0.1em] text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.map((p) => (
                        <tr key={p.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                          <td className="px-5 py-3.5 align-middle">
                            <code className="text-[13px] text-neutral-800 font-mono bg-neutral-100 px-2 py-0.5 rounded-md">
                              {p.route_path}
                            </code>
                          </td>
                          <td className="px-5 py-3.5 align-middle text-neutral-900 font-medium max-w-[220px]">
                            <span className="line-clamp-2">{p.page_title}</span>
                          </td>
                          <td className="px-5 py-3.5 align-middle text-neutral-600 max-w-[200px]" title={p.seo_title ?? ""}>
                            <span className="line-clamp-2">{truncateSeoTitle(p.seo_title)}</span>
                          </td>
                          <td className="px-5 py-3.5 align-middle text-neutral-600">
                            {p.primary_keyword ?? "—"}
                          </td>
                          <td className="px-5 py-3.5 align-middle">
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.12em] ${
                                  p.is_active
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-neutral-100 text-neutral-500"
                                }`}
                              >
                                {p.is_active ? "Active" : "Inactive"}
                              </span>
                              <button
                                type="button"
                                role="switch"
                                aria-checked={p.is_active}
                                disabled={togglingId === p.id}
                                onClick={() => handleToggle(p)}
                                className={`flex w-11 h-6 rounded-full p-0.5 transition-colors items-center shrink-0 ${
                                  togglingId === p.id ? "opacity-50 cursor-wait" : "cursor-pointer"
                                } ${p.is_active ? "justify-end bg-emerald-500" : "justify-start bg-neutral-300"}`}
                              >
                                <span className="h-5 w-5 rounded-full bg-white shadow-sm shrink-0" />
                              </button>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 align-middle text-right whitespace-nowrap">
                            <button
                              type="button"
                              title="View public page"
                              onClick={() => viewPublicUrl(p.route_path)}
                              className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/5 transition-all cursor-pointer"
                            >
                              <i className="ri-external-link-line text-base" />
                            </button>
                            <button
                              type="button"
                              title="Edit"
                              onClick={() => openEdit(p)}
                              className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/5 transition-all cursor-pointer"
                            >
                              <i className="ri-edit-line text-base" />
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              onClick={() => setDeletingPage(p)}
                              className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                            >
                              <i className="ri-delete-bin-line text-base" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <PageEditModal page={editingPage} isOpen={modalOpen} onClose={closeModal} onSubmit={handleSubmitPage} />

      {deletingPage && (
        <PageDeleteModal page={deletingPage} onConfirm={handleDeleteConfirm} onCancel={() => setDeletingPage(null)} />
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
            toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
          }`}
        >
          <i
            className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}
          />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
