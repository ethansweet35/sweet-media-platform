"use client";

import { useState } from "react";
import type { KbEntry, KbEntryInput } from "@sweetmedia/admin-core";

interface KnowledgeBaseEntryModalProps {
  entry: KbEntry | null;
  isOpen: boolean;
  onClose: () => void;
  /** Return true when the save succeeded — modal will close */
  onSubmit: (payload: KbEntryInput) => Promise<boolean>;
}

function splitTags(csv: string): string[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function KnowledgeBaseEntryModalForm({
  entry,
  onClose,
  onSubmit,
}: {
  entry: KbEntry | null;
  onClose: () => void;
  onSubmit: (payload: KbEntryInput) => Promise<boolean>;
}) {
  const isEdit = !!entry;

  const [title, setTitle] = useState(entry?.title ?? "");
  const [category, setCategory] = useState(entry?.category ?? "");
  const [content, setContent] = useState(entry?.content ?? "");
  const [tagsInput, setTagsInput] = useState(entry?.tags.join(", ") ?? "");
  const [isActive, setIsActive] = useState(entry?.is_active ?? true);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t) {
      setFieldError("Title is required.");
      return;
    }
    if (!c) {
      setFieldError("Content is required.");
      return;
    }
    setFieldError(null);
    const payload: KbEntryInput = {
      title: t,
      category: category.trim() ? category.trim() : null,
      content: c,
      tags: splitTags(tagsInput),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => !saving && onClose()}
        aria-hidden
      />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl my-auto max-h-[min(92vh,900px)] flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            {isEdit ? "Edit entry" : "New knowledge base entry"}
          </h2>
          <button
            type="button"
            onClick={() => !saving && onClose()}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-h-0 flex-1">
          {fieldError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm text-red-700 flex items-start gap-2">
              <i className="ri-error-warning-line mt-0.5 shrink-0"></i>
              <span>{fieldError}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
              placeholder="Short title"
              disabled={saving}
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputCls}
              placeholder="Optional"
              disabled={saving}
            />
          </div>

          <div className="min-h-0 flex-1 flex flex-col">
            <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className={`${inputCls} font-mono text-[13px] leading-relaxed resize-y min-h-[220px]`}
              placeholder="Guidance or facts the blog writer should consider..."
              disabled={saving}
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
              Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className={inputCls}
              placeholder="Comma-separated"
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
                  <i className="ri-loader-4-line animate-spin"></i>
                  Saving...
                </span>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create Entry"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function KnowledgeBaseEntryModal({
  entry,
  isOpen,
  onClose,
  onSubmit,
}: KnowledgeBaseEntryModalProps) {
  if (!isOpen) return null;

  return (
    <KnowledgeBaseEntryModalForm
      key={entry?.id ?? "new"}
      entry={entry}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
