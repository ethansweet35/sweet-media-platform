"use client";

import { useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import {
  ADMIN_OCEAN,
  adminBadgeCls,
  adminEmptyStateCls,
  adminIconBtnCls,
  adminPageCardSmCls,
  adminPrimaryActionCls,
  adminPrimaryBtnCls,
  adminTagCls,
  adminToastErrorCls,
  adminToastSuccessCls,
} from "../lib/adminTheme";
import { useKnowledgeBase } from "../hooks/useKnowledgeBase";
import KnowledgeBaseDeleteModal from "../components/pages/admin/knowledge-base/components/KnowledgeBaseDeleteModal";
import KnowledgeBaseEntryModal from "../components/pages/admin/knowledge-base/components/KnowledgeBaseEntryModal";
import type { KbEntry, KbEntryInput } from "../types/knowledge-base";

function contentPreview(text: string, max = 200): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export default function AdminKnowledgeBasePage() {
  const { entries, loading, error, createEntry, updateEntry, deleteEntry, toggleActive } =
    useKnowledgeBase();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KbEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<KbEntry | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const openNewEntry = () => {
    setEditingEntry(null);
    setModalOpen(true);
  };

  const openEdit = (entry: KbEntry) => {
    setEditingEntry(entry);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEntry(null);
  };

  const handleSubmitEntry = async (payload: KbEntryInput): Promise<boolean> => {
    if (editingEntry) {
      const ok = await updateEntry(editingEntry.id, {
        title: payload.title,
        category: payload.category,
        content: payload.content,
        tags: payload.tags,
        is_active: payload.is_active,
      });
      if (ok) showToast("Entry saved");
      else showToast("Failed to save entry", "error");
      return ok;
    }

    const ok = await createEntry(payload);
    if (ok) showToast("Knowledge base entry created");
    else showToast("Failed to create entry", "error");
    return ok;
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEntry) return;
    const ok = await deleteEntry(deletingEntry.id);
    setDeletingEntry(null);
    if (ok) showToast("Entry deleted");
    else showToast("Failed to delete entry", "error");
  };

  const handleToggle = async (entry: KbEntry) => {
    setTogglingId(entry.id);
    const ok = await toggleActive(entry.id, entry.is_active);
    setTogglingId(null);
    if (ok) showToast(entry.is_active ? "Entry deactivated" : "Entry activated");
    else showToast("Failed to update status", "error");
  };

  return (
    <div>
      <AdminPageHeader
        title="Knowledge Base"
        subtitle={`${entries.length} ${entries.length === 1 ? "entry" : "entries"} · Feeds grounded context into the AI blog writer.`}
        actions={
          <button
            type="button"
            onClick={openNewEntry}
            className={adminPrimaryActionCls}
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            <i className="ri-add-line text-xs"></i>
            New Entry
          </button>
        }
      />

      {loading && (
        <div className={adminEmptyStateCls}>
          <i className="ri-loader-4-line animate-spin text-3xl text-[#CBD5E1] mb-3 block"></i>
          <p className="text-sm text-[#94A3B8]">Loading entries...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <i className="ri-error-warning-line text-2xl text-red-400 mb-2 block"></i>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <div className={adminEmptyStateCls}>
          <i className="ri-book-open-line text-3xl text-[#E2E8F0] mb-3 block"></i>
          <p className="text-sm text-[#64748B] mb-4">No knowledge base entries yet.</p>
          <button type="button" onClick={openNewEntry} className={adminPrimaryBtnCls}>
            <i className="ri-add-line text-xs"></i>
            New Entry
          </button>
        </div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`${adminPageCardSmCls} flex gap-4 items-start hover:border-[#7B9FD4]/40 transition-colors`}
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2 gap-y-2">
                  <h2 className="text-lg font-semibold text-[#0A1F44] leading-snug">{entry.title}</h2>
                  {entry.category && <span className={adminBadgeCls}>{entry.category}</span>}
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-wrap break-words">
                  {contentPreview(entry.content)}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {entry.tags.map((tag) => (
                      <span key={tag} className={adminTagCls}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <button
                  type="button"
                  role="switch"
                  aria-checked={entry.is_active}
                  disabled={togglingId === entry.id}
                  onClick={() => handleToggle(entry)}
                  className={`flex w-11 h-6 rounded-full p-0.5 transition-colors items-center shrink-0 ${
                    togglingId === entry.id ? "opacity-50 cursor-wait" : "cursor-pointer"
                  } ${entry.is_active ? "bg-emerald-500 justify-end" : "bg-[#CBD5E1] justify-start"}`}
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-sm shrink-0" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="Edit"
                    onClick={() => openEdit(entry)}
                    className={adminIconBtnCls}
                  >
                    <i className="ri-edit-line text-sm"></i>
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => setDeletingEntry(entry)}
                    className={`${adminIconBtnCls} hover:text-red-500 hover:bg-red-50`}
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <KnowledgeBaseEntryModal
        entry={editingEntry}
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitEntry}
      />

      {deletingEntry && (
        <KnowledgeBaseDeleteModal
          entry={deletingEntry}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingEntry(null)}
        />
      )}

      {toast && (
        <div className={toast.type === "success" ? adminToastSuccessCls : adminToastErrorCls}>
          <i
            className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}
          ></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
