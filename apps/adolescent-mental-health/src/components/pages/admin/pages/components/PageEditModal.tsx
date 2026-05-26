"use client";

import { useState } from "react";
import type { TrackedPage, TrackedPageInput } from "@sweetmedia/admin-core";

interface PageEditModalProps {
  page: TrackedPage | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: TrackedPageInput) => Promise<boolean>;
}

function PageEditForm({
  page,
  onClose,
  onSubmit,
}: {
  page: TrackedPage | null;
  onClose: () => void;
  onSubmit: (payload: TrackedPageInput) => Promise<boolean>;
}) {
  const isEdit = !!page;

  const [routePath, setRoutePath] = useState(page?.route_path ?? "");
  const [pageTitle, setPageTitle] = useState(page?.page_title ?? "");
  const [seoTitle, setSeoTitle] = useState(page?.seo_title ?? "");
  const [metaDescription, setMetaDescription] = useState(page?.meta_description ?? "");
  const [primaryKeyword, setPrimaryKeyword] = useState(page?.primary_keyword ?? "");
  const [notes, setNotes] = useState(page?.notes ?? "");
  const [isActive, setIsActive] = useState(page?.is_active ?? true);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const metaLen = metaDescription.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const route = routePath.trim();
    const title = pageTitle.trim();
    if (!route) {
      setFieldError("Route path is required.");
      return;
    }
    if (!route.startsWith("/")) {
      setFieldError('Route path must start with "/".');
      return;
    }
    if (!title) {
      setFieldError("Page title is required.");
      return;
    }
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
    "w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#3d6f7f] transition-colors";

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          {isEdit ? "Edit page" : "New tracked page"}
        </h2>
        <button
          type="button"
          onClick={() => !saving && onClose()}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors cursor-pointer shrink-0"
          aria-label="Close"
        >
          <i className="ri-close-line text-lg" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-h-0 flex-1">
        {fieldError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm text-red-700 flex items-start gap-2">
            <i className="ri-error-warning-line mt-0.5 shrink-0" />
            <span>{fieldError}</span>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
            Route Path <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={routePath}
            onChange={(e) => setRoutePath(e.target.value)}
            className={`${inputCls} font-mono text-[13px]`}
            placeholder="/about"
            disabled={saving}
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
            Page Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className={inputCls}
            placeholder="Display title"
            disabled={saving}
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
            SEO Title
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className={inputCls}
            placeholder="Optional meta title"
            disabled={saving}
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500">
              Meta Description
            </label>
            <span className="text-[11px] text-neutral-400 tabular-nums">
              {metaLen}/160
            </span>
          </div>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={4}
            className={`${inputCls} resize-y min-h-[100px]`}
            placeholder="Optional meta description"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
            Primary Keyword
          </label>
          <input
            type="text"
            value={primaryKeyword}
            onChange={(e) => setPrimaryKeyword(e.target.value)}
            className={inputCls}
            placeholder="Optional"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            className={`${inputCls} resize-y min-h-[140px]`}
            placeholder="Internal notes"
            disabled={saving}
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            disabled={saving}
            className="w-4 h-4 rounded border-neutral-300 text-[#3d6f7f] accent-[#3d6f7f] cursor-pointer"
          />
          <span className="text-sm text-neutral-800 font-medium">Is Active</span>
        </label>

        <div className="flex gap-3 pt-2 mt-auto border-t border-neutral-100">
          <button
            type="button"
            onClick={() => !saving && onClose()}
            className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:border-neutral-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#3d6f7f] text-white text-[11px] tracking-[0.15em] uppercase font-bold py-3 rounded-xl hover:bg-[#35636f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                Saving...
              </span>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Page"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default function PageEditModal({ page, isOpen, onClose, onSubmit }: PageEditModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl my-auto max-h-[min(92vh,900px)] flex flex-col">
        <PageEditForm key={page?.id ?? "new"} page={page} onClose={onClose} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
