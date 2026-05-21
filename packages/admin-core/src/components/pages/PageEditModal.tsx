"use client";

import { useEffect, useState } from "react";
import type { TrackedPage, TrackedPageInput } from "../../types/tracked-page";
import { ADMIN_ACCENT, ADMIN_OCEAN } from "../../lib/adminTheme";
import KeywordSuggestPopover from "../KeywordSuggestPopover";
import {
  buildPrimaryPageKeywordSeed,
  toPageKeywordSeedContextPayload,
} from "../../lib/seedCleaner";

interface PageEditModalProps {
  page: TrackedPage | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: TrackedPageInput) => Promise<boolean>;
}

export default function PageEditModal({ page, isOpen, onClose, onSubmit }: PageEditModalProps) {
  const isEdit = !!page;

  const [routePath, setRoutePath] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generateSuccess, setGenerateSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFieldError(null);
    setGenerateError(null);
    setGenerateSuccess(false);
    if (page) {
      setRoutePath(page.route_path);
      setPageTitle(page.page_title);
      setSeoTitle(page.seo_title ?? "");
      setMetaDescription(page.meta_description ?? "");
      setPrimaryKeyword(page.primary_keyword ?? "");
      setNotes(page.notes ?? "");
      setIsActive(page.is_active);
    } else {
      setRoutePath("");
      setPageTitle("");
      setSeoTitle("");
      setMetaDescription("");
      setPrimaryKeyword("");
      setNotes("");
      setIsActive(true);
    }
  }, [page, isOpen]);

  if (!isOpen) return null;

  const metaLen = metaDescription.length;
  const seoLen = seoTitle.length;
  const canGenerate = !!(pageTitle.trim() && routePath.trim());

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    setGenerateError(null);
    setGenerateSuccess(false);
    try {
      const res = await fetch("/api/admin/generate-seo-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_title: pageTitle.trim(),
          route_path: routePath.trim(),
          primary_keyword: primaryKeyword.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        page_title?: string;
        seo_title?: string;
        meta_description?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      if (data.page_title?.trim()) setPageTitle(data.page_title.trim());
      if (data.seo_title?.trim()) setSeoTitle(data.seo_title.trim());
      if (data.meta_description?.trim()) setMetaDescription(data.meta_description.trim());
      setGenerateSuccess(true);
      setTimeout(() => setGenerateSuccess(false), 3000);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const route = routePath.trim();
    const title = pageTitle.trim();
    if (!route) { setFieldError("Route path is required."); return; }
    if (!route.startsWith("/")) { setFieldError('Route path must start with "/".'); return; }
    if (!title) { setFieldError("Page title is required."); return; }
    setFieldError(null);
    const payload: TrackedPageInput = {
      route_path: route,
      page_title: title,
      seo_title: seoTitle.trim() ? seoTitle.trim() : null,
      meta_description: metaDescription.trim() ? metaDescription.trim() : null,
      primary_keyword: primaryKeyword.trim() ? primaryKeyword.trim() : null,
      notes: notes.trim() ? notes.trim() : null,
      is_active: isActive,
    };
    setSaving(true);
    const ok = await onSubmit(payload);
    setSaving(false);
    if (ok) onClose();
  };

  const inputCls =
    "w-full px-3.5 py-2.5 text-sm border border-[#E2E8F0] rounded-xl bg-white text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:border-[#7B9FD4] transition-colors";

  const busy = saving || generating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !busy && onClose()} aria-hidden />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl my-auto flex flex-col" style={{ maxHeight: "min(92vh, 900px)" }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5 shrink-0">
          <h2 className="text-lg font-semibold text-[#0A1F44]">
            {isEdit ? "Edit page" : "New tracked page"}
          </h2>
          <button
            type="button"
            onClick={() => !busy && onClose()}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#94A3B8] hover:bg-[#F4F7FB] hover:text-[#64748B] transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-h-0 flex-1 overflow-y-auto pr-1">
          {fieldError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm text-red-700 flex items-start gap-2 shrink-0">
              <i className="ri-error-warning-line mt-0.5 shrink-0" />
              <span>{fieldError}</span>
            </div>
          )}

          {/* Route + Title in a grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B] mb-1.5">
                Route Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={routePath}
                onChange={(e) => setRoutePath(e.target.value)}
                className={`${inputCls} font-mono text-[13px]`}
                placeholder="/about"
                disabled={busy}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B] mb-1.5">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className={inputCls}
                placeholder="Display title"
                disabled={busy}
                required
              />
            </div>
          </div>

          {/* Primary Keyword (moved up so AI can use it) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B]">
                Primary Keyword
              </label>
              <KeywordSuggestPopover
                currentKeyword={primaryKeyword}
                seedFallback={buildPrimaryPageKeywordSeed({
                  route_path: routePath,
                  page_title: pageTitle,
                  seo_title: seoTitle || null,
                  default_seo_title: page?.default_seo_title ?? null,
                  meta_description: metaDescription || null,
                })}
                routePath={routePath || undefined}
                pageContext={toPageKeywordSeedContextPayload({
                  route_path: routePath,
                  page_title: pageTitle,
                  seo_title: seoTitle || null,
                  default_seo_title: page?.default_seo_title ?? null,
                  meta_description: metaDescription || null,
                })}
                onSelect={(phrase) => setPrimaryKeyword(phrase)}
                disabled={busy}
              />
            </div>
            <input
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              className={inputCls}
              placeholder="Optional — included in AI generation if set"
              disabled={busy}
            />
          </div>

          {/* AI Generate */}
          <div
            className="rounded-xl border p-4 flex items-center justify-between gap-4"
            style={{ borderColor: generateSuccess ? "#86efac" : "#e5e7eb", backgroundColor: generateSuccess ? "#f0fdf4" : "#fafafa" }}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#334155] flex items-center gap-1.5">
                <i className="ri-sparkling-2-line text-xs" style={{ color: ADMIN_ACCENT }} />
                AI Generate Meta Data
              </p>
              {generateSuccess ? (
                <p className="text-[11px] text-emerald-600 mt-0.5 flex items-center gap-1">
                  <i className="ri-check-line" /> Page title, SEO title &amp; meta description filled in
                </p>
              ) : generateError ? (
                <p className="text-[11px] text-red-600 mt-0.5">{generateError}</p>
              ) : (
                <p className="text-[11px] text-[#94A3B8] mt-0.5">
                  {canGenerate
                    ? "Generates page title + SEO title + meta description from current values & keyword"
                    : "Fill in Route Path and Page Title to enable"}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void handleGenerate()}
              disabled={!canGenerate || busy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              {generating ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xs" />
                  Generating…
                </>
              ) : (
                <>
                  <i className="ri-sparkling-2-line text-xs" />
                  Generate
                </>
              )}
            </button>
          </div>

          {/* SEO Title */}
          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B]">
                SEO Title
              </label>
              <span className={`text-[11px] tabular-nums ${seoLen > 60 ? "text-red-500" : seoLen > 50 ? "text-amber-500" : "text-[#94A3B8]"}`}>
                {seoLen}/60
              </span>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className={inputCls}
              placeholder="Leave blank to use code default"
              disabled={busy}
            />
            {page?.default_seo_title && (
              <p className="text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed">
                <span className="font-medium text-[#64748B]">Code default:</span>{" "}
                <span className="italic">{page.default_seo_title}</span>
              </p>
            )}
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B]">
                Meta Description
              </label>
              <span className={`text-[11px] tabular-nums ${metaLen > 160 ? "text-red-500" : metaLen > 140 ? "text-amber-500" : "text-[#94A3B8]"}`}>
                {metaLen}/160
              </span>
            </div>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              className={`${inputCls} resize-y min-h-[100px]`}
              placeholder="Leave blank to use code default"
              disabled={busy}
            />
            {page?.default_meta_description && (
              <p className="text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed">
                <span className="font-medium text-[#64748B]">Code default:</span>{" "}
                <span className="italic">{page.default_meta_description}</span>
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B] mb-1.5">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`${inputCls} resize-y`}
              placeholder="Internal notes"
              disabled={busy}
            />
          </div>

          {/* Active */}
          <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={busy}
              className="w-4 h-4 rounded border-[#CBD5E1] accent-[#0A1F44] cursor-pointer"
            />
            <span className="text-sm text-[#0A1F44] font-medium">Is Active</span>
          </label>

          {/* Footer actions */}
          <div className="flex gap-3 pt-2 mt-auto border-t border-[#E2E8F0] shrink-0">
            <button
              type="button"
              onClick={() => !busy && onClose()}
              className="flex-1 border border-[#E2E8F0] text-[#64748B] text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:border-[#CBD5E1] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="flex-1 text-white text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin" />
                  Saving…
                </span>
              ) : isEdit ? "Save Changes" : "Create Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
