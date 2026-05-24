"use client";

import { useEffect, useState } from "react";
import { usePageEditor } from "../../contexts/PageEditorContext";
import PageEditorSeoPanel from "./PageEditorSeoPanel";

/**
 * Floating bottom-right toolbar. Visible only to authenticated admins.
 * Mounted automatically inside <PageEditorProvider>.
 */
export default function PageEditorToolbar() {
  const editor = usePageEditor();
  const [mounted, setMounted] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render nothing on the server (auth check is client-side).
  if (!mounted) return null;
  if (editor.isLoading) return null;
  if (!editor.isAdmin) return null;

  const isBusy = editor.status !== "idle";
  const hasPending = editor.pendingCount > 0;

  // Collapsed pill when in view mode (just the Edit button).
  if (!editor.isEditMode) {
    return (
      <div className="sm-page-editor-fab" data-state="view">
        <button
          type="button"
          className="sm-page-editor-fab-button"
          onClick={editor.toggleEditMode}
          aria-label="Edit page"
        >
          <i className="ri-edit-2-line" aria-hidden />
          <span>Edit page</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <PageEditorSeoPanel open={seoOpen} onClose={() => setSeoOpen(false)} />
      <div className="sm-page-editor-toolbar" data-state="edit">
      <div className="sm-page-editor-toolbar-inner">
        <div className="sm-page-editor-toolbar-status">
          <span className="sm-page-editor-toolbar-pill">
            <i className="ri-edit-2-line" aria-hidden />
            Edit mode
          </span>
          {hasPending ? (
            <span className="sm-page-editor-toolbar-dirty">
              <span className="sm-page-editor-toolbar-dirty-dot" aria-hidden />
              {editor.pendingCount} unsaved change{editor.pendingCount === 1 ? "" : "s"}
            </span>
          ) : (
            <span className="sm-page-editor-toolbar-clean">No unsaved changes</span>
          )}
        </div>

        <div className="sm-page-editor-toolbar-actions">
          <button
            type="button"
            className="sm-page-editor-toolbar-secondary"
            onClick={() => setSeoOpen(true)}
            disabled={isBusy}
            title="Edit page title, SEO title, meta description, and URL slug"
          >
            <i className="ri-search-eye-line" aria-hidden />
            SEO
          </button>
          <button
            type="button"
            className="sm-page-editor-toolbar-secondary"
            onClick={editor.discardDraft}
            disabled={isBusy}
            title="Discard all unpublished drafts for this page"
          >
            <i className="ri-arrow-go-back-line" aria-hidden />
            {editor.status === "discarding" ? "Discarding..." : "Discard drafts"}
          </button>
          <button
            type="button"
            className="sm-page-editor-toolbar-secondary"
            onClick={editor.saveDraft}
            disabled={isBusy || !hasPending}
          >
            <i className="ri-save-line" aria-hidden />
            {editor.status === "saving" ? "Saving..." : "Save draft"}
          </button>
          <button
            type="button"
            className="sm-page-editor-toolbar-primary"
            onClick={editor.publish}
            disabled={isBusy}
            title="Save and publish drafts to the live site"
          >
            <i className="ri-rocket-line" aria-hidden />
            {editor.status === "publishing" ? "Publishing..." : "Publish"}
          </button>
          <button
            type="button"
            className="sm-page-editor-toolbar-icon"
            onClick={editor.toggleEditMode}
            disabled={isBusy}
            aria-label="Exit edit mode"
            title="Exit edit mode"
          >
            <i className="ri-close-line" aria-hidden />
          </button>
        </div>
      </div>

      {editor.message ? (
        <div className="sm-page-editor-toolbar-message" role="status">
          {editor.message}
        </div>
      ) : null}
    </div>
    </>
  );
}
