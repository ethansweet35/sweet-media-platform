"use client";

import { useState } from "react";
import { AdminPageHeader } from "@sweetmedia/admin-core";
import { ADMIN_OCEAN } from "@sweetmedia/admin-core";
import { useKnowledgeBase } from "@sweetmedia/admin-core";
import Seo from "@/components/feature/Seo";
import KnowledgeBaseDeleteModal from "@/components/pages/admin/knowledge-base/components/KnowledgeBaseDeleteModal";
import KnowledgeBaseEntryModal from "@/components/pages/admin/knowledge-base/components/KnowledgeBaseEntryModal";
import type { KbEntry, KbEntryInput } from "@sweetmedia/admin-core";

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
    <div className="">
      <Seo title="Knowledge Base | Admin" description="Manage blog knowledge base entries" noindex />

      <AdminPageHeader
        title="Knowledge Base"
        subtitle={`${entries.length} ${entries.length === 1 ? "entry" : "entries"} • Feeds grounded context into the AI blog writer.`}
        actions={
          <button
            type="button"
            onClick={openNewEntry}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 shadow-[0_2px_12px_rgba(61,111,127,0.2)]"
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            <i className="ri-add-line text-xs"></i>
            New Entry
          </button>
        }
      />

      <div className="">

        {loading && (
          <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
            <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block"></i>
            <p className="text-sm text-neutral-400">Loading entries...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <i className="ri-error-warning-line text-2xl text-red-400 mb-2 block"></i>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
            <i className="ri-book-open-line text-3xl text-neutral-200 mb-3 block"></i>
            <p className="text-sm text-neutral-500 mb-4">No knowledge base entries yet.</p>
            <button
              type="button"
              onClick={openNewEntry}
              className="inline-flex items-center gap-1.5 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer"
            >
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
                className="bg-white rounded-2xl border border-neutral-100 p-5 flex gap-4 items-start hover:border-neutral-200 transition-colors"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 gap-y-2">
                    <h2 className="text-lg font-semibold text-neutral-900 leading-snug">{entry.title}</h2>
                    {entry.category && (
                      <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg">
                        {entry.category}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap break-words">
                    {contentPreview(entry.content)}
                  </p>

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-[11px] text-neutral-600 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-md"
                        >
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
                    } ${entry.is_active ? "bg-emerald-500 justify-end" : "bg-neutral-300 justify-start"}`}
                  >
                    <span className="h-5 w-5 rounded-full bg-white shadow-sm shrink-0" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => openEdit(entry)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/5 transition-all cursor-pointer"
                    >
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => setDeletingEntry(entry)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
            toast.type === "success"
              ? "bg-[#3d6f7f] text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <i
            className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}
          ></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
