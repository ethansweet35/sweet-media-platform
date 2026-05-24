"use client";

/**
 * Inline-injected stylesheet for the inline page editor UI. Kept in a
 * single string so client apps don't have to import any extra CSS files
 * — mounting <PageEditorProvider> brings the styles along with it.
 *
 * Styles are scoped under sm-page-* prefixes so they don't conflict with
 * brand styles. Edit affordances are only visible to authenticated
 * admins (the wrappers gate themselves via PageEditorContext).
 */
const STYLES = `
  /* Editable text — subtle outline that doesn't shift layout. */
  .sm-page-edit-target {
    outline: 2px dashed rgba(167, 139, 250, 0.85);
    outline-offset: 3px;
    border-radius: 3px;
    cursor: text;
    transition: outline-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease;
    box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.15);
  }
  .sm-page-edit-target:hover {
    outline-color: #c4b5fd;
    background-color: rgba(167, 139, 250, 0.14);
    box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.35);
  }
  .sm-page-edit-active {
    outline: 2px solid #4f46e5 !important;
    outline-offset: 2px;
    background-color: rgba(99, 102, 241, 0.06);
  }
  .sm-page-edit-dirty {
    outline-color: #f59e0b !important;
    background-color: rgba(245, 158, 11, 0.07);
  }

  /* Editable image — overlay with replace button. */
  .sm-page-edit-image {
    position: relative;
    display: inline-block;
    isolation: isolate;
  }
  .sm-page-edit-image-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    background-color: rgba(15, 23, 42, 0);
    transition: background-color 160ms ease;
    pointer-events: none;
    z-index: 5;
  }
  .sm-page-edit-image:hover .sm-page-edit-image-overlay,
  .sm-page-edit-image:focus-within .sm-page-edit-image-overlay {
    background-color: rgba(15, 23, 42, 0.45);
    pointer-events: auto;
  }
  .sm-page-edit-image-button {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1rem;
    border-radius: 9999px;
    background: #ffffff;
    color: #0f172a;
    border: 1px solid rgba(15, 23, 42, 0.08);
    font: 600 0.8125rem / 1.2 system-ui, -apple-system, sans-serif;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 160ms ease, transform 160ms ease;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
  }
  .sm-page-edit-image-button i {
    font-size: 1rem;
  }
  .sm-page-edit-image-button:hover {
    background: #f8fafc;
  }
  .sm-page-edit-image-button:disabled {
    opacity: 0.7 !important;
    cursor: progress;
  }
  .sm-page-edit-image:hover .sm-page-edit-image-button,
  .sm-page-edit-image:focus-within .sm-page-edit-image-button {
    opacity: 1;
    transform: translateY(0);
  }
  .sm-page-edit-image-error {
    background: rgba(248, 113, 113, 0.95);
    color: #fff;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font: 500 0.75rem / 1.2 system-ui, sans-serif;
  }
  .sm-page-edit-image-dirty-dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background: #f59e0b;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.7);
  }
  .sm-page-edit-image-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
  .sm-page-edit-image[data-sm-dirty="1"] {
    outline: 2px solid #f59e0b;
    outline-offset: 3px;
  }

  /* Editable icon slots */
  .sm-page-edit-icon-slot {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .sm-page-edit-icon-trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    outline: 1px dashed rgba(99, 102, 241, 0.45);
    outline-offset: 3px;
    transition: outline-color 120ms ease, background 120ms ease;
  }
  .sm-page-edit-icon-trigger:hover {
    outline-color: rgba(99, 102, 241, 0.9);
    background: rgba(99, 102, 241, 0.08);
  }
  .sm-page-edit-icon-trigger-graphic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    min-height: 1.25rem;
  }
  .sm-page-edit-icon-live-preview {
    margin-bottom: 0.65rem;
    padding: 0.65rem;
    border-radius: 10px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
  }
  .sm-page-edit-icon-live-hint {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    color: #64748b;
    line-height: 1.35;
  }
  .sm-page-edit-icon-live-preview-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 0.5rem;
    border-radius: 8px;
    background: #fff;
    border: 2px dashed #94a3b8;
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);
  }
  .sm-page-edit-icon-live-size {
    margin: 0.35rem 0 0;
    text-align: center;
    font-size: 0.6875rem;
    color: #64748b;
  }
  .sm-page-edit-icon-dirty .sm-page-edit-icon-trigger {
    outline-color: #f59e0b;
    background: rgba(245, 158, 11, 0.1);
  }
  .sm-page-edit-icon-badge {
    position: absolute;
    right: -6px;
    bottom: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background: #4f46e5;
    color: #fff;
    font-size: 10px;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
    pointer-events: none;
  }
  .sm-page-edit-icon-panel {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 10px);
    transform: translateX(-50%);
    z-index: 2147483641;
    width: min(320px, calc(100vw - 2rem));
    max-height: min(420px, 70vh);
    overflow-y: auto;
    background: #fff;
    color: #0f172a;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.22);
    padding: 0.75rem;
    text-align: left;
    font: 400 13px / 1.4 system-ui, -apple-system, sans-serif;
  }
  .sm-page-edit-icon-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .sm-page-edit-icon-panel-title {
    font-weight: 600;
    font-size: 0.875rem;
  }
  .sm-page-edit-icon-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: #f1f5f9;
    border-radius: 6px;
    cursor: pointer;
    color: #475569;
  }
  .sm-page-edit-icon-panel-section {
    margin-top: 0.65rem;
    padding-top: 0.65rem;
    border-top: 1px solid #e2e8f0;
  }
  .sm-page-edit-icon-panel-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
    margin: 0 0 0.5rem;
  }
  .sm-page-edit-icon-search {
    width: 100%;
    box-sizing: border-box;
    padding: 0.45rem 0.6rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.8125rem;
    margin-bottom: 0.5rem;
  }
  .sm-page-edit-icon-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.35rem;
    max-height: 160px;
    overflow-y: auto;
  }
  .sm-page-edit-icon-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    padding: 0.4rem 0.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    cursor: pointer;
    color: #334155;
    font-size: 0.625rem;
    line-height: 1.2;
  }
  .sm-page-edit-icon-option:hover {
    border-color: #4f46e5;
    background: #eef2ff;
  }
  .sm-page-edit-icon-option-active {
    border-color: #4f46e5;
    background: #e0e7ff;
    color: #312e81;
  }
  .sm-page-edit-icon-upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
    justify-content: center;
    padding: 0.5rem;
    border: 1px dashed #94a3b8;
    border-radius: 8px;
    background: #f8fafc;
    cursor: pointer;
    font-size: 0.8125rem;
    font-weight: 500;
  }
  .sm-page-edit-icon-upload-btn:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  .sm-page-edit-icon-error {
    margin: 0.35rem 0 0;
    font-size: 0.75rem;
    color: #b91c1c;
  }
  .sm-page-edit-icon-size {
    margin-top: 0.65rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .sm-page-edit-icon-size-row {
    display: grid;
    grid-template-columns: 72px 1fr 48px;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: #475569;
  }
  .sm-page-edit-icon-size-row input[type="range"] {
    width: 100%;
  }
  .sm-page-edit-icon-size-num {
    width: 100%;
    padding: 0.2rem 0.35rem;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    font-size: 0.75rem;
  }
  .sm-page-edit-icon-lock {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: #64748b;
  }
  .sm-page-edit-icon-apply-size {
    padding: 0.35rem 0.6rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #f1f5f9;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .sm-page-edit-icon-reset {
    margin-top: 0.65rem;
    width: 100%;
    padding: 0.45rem;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 0.75rem;
    text-decoration: underline;
    cursor: pointer;
  }

  /* Admin session chip — top-right on every route when signed in. */
  .sm-admin-session {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2147483646;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.4rem 0.35rem 0.55rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.97);
    color: #0f172a;
    border: 1px solid rgba(15, 23, 42, 0.1);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.14);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font: 500 0.75rem / 1.2 system-ui, -apple-system, sans-serif;
    pointer-events: auto;
  }
  .sm-admin-session-status {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding-right: 0.15rem;
  }
  .sm-admin-session-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
    flex-shrink: 0;
  }
  .sm-admin-session-label {
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
  }
  .sm-admin-session-email {
    max-width: 7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #64748b;
    font-weight: 500;
  }
  @media (max-width: 480px) {
    .sm-admin-session-email {
      display: none;
    }
  }
  .sm-admin-session-link,
  .sm-admin-session-logout {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.55rem;
    border-radius: 9999px;
    border: none;
    background: #f1f5f9;
    color: #334155;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background 120ms ease, color 120ms ease;
  }
  .sm-admin-session-link:hover,
  .sm-admin-session-logout:hover:not(:disabled) {
    background: #e2e8f0;
    color: #0f172a;
  }
  .sm-admin-session-logout:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  .sm-admin-session-link i,
  .sm-admin-session-logout i {
    font-size: 0.95rem;
  }
  @media (max-width: 380px) {
    .sm-admin-session-link-text,
    .sm-admin-session-logout-text {
      display: none;
    }
  }

  /* Floating toolbar / FAB. Pinned to the LEFT side so it never collides
     with the chat widgets that most client sites mount in the bottom-right. */
  .sm-page-editor-fab {
    position: fixed;
    bottom: 1.25rem;
    left: 1.25rem;
    z-index: 2147483647;
    pointer-events: auto;
  }
  .sm-page-editor-fab-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #0f172a;
    color: #fff;
    border: none;
    padding: 0.7rem 1.1rem;
    border-radius: 9999px;
    font: 600 0.875rem / 1 system-ui, -apple-system, sans-serif;
    cursor: pointer;
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.35);
    transition: transform 120ms ease, background 120ms ease;
  }
  .sm-page-editor-fab-button:hover {
    transform: translateY(-1px);
    background: #1e293b;
  }
  .sm-page-editor-fab-button i {
    font-size: 1rem;
  }

  .sm-page-editor-toolbar {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2147483647;
    pointer-events: auto;
    max-width: calc(100vw - 2rem);
    width: max-content;
    background: rgba(15, 23, 42, 0.97);
    color: #f8fafc;
    border-radius: 14px;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .sm-page-editor-toolbar-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.65rem 0.9rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .sm-page-editor-toolbar-status {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font: 500 0.8125rem / 1.2 system-ui, sans-serif;
    color: #cbd5e1;
  }
  .sm-page-editor-toolbar-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.6rem;
    border-radius: 9999px;
    background: rgba(79, 70, 229, 0.25);
    color: #c7d2fe;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.02em;
  }
  .sm-page-editor-toolbar-pill i {
    font-size: 0.875rem;
  }
  .sm-page-editor-toolbar-pill-btn {
    border: none;
    cursor: pointer;
    font: inherit;
    transition: background 120ms ease, color 120ms ease;
  }
  .sm-page-editor-toolbar-pill-btn:hover:not(:disabled) {
    background: rgba(79, 70, 229, 0.4);
    color: #e0e7ff;
  }
  .sm-page-editor-toolbar-pill-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .sm-page-editor-toolbar-hint {
    display: none;
    font-size: 0.6875rem;
    color: #94a3b8;
    max-width: 11rem;
    line-height: 1.35;
  }
  @media (min-width: 900px) {
    .sm-page-editor-toolbar-hint {
      display: block;
    }
  }
  .sm-page-editor-toolbar-dirty {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: #fcd34d;
    font-weight: 500;
  }
  .sm-page-editor-toolbar-dirty-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #f59e0b;
  }
  .sm-page-editor-toolbar-clean {
    color: #94a3b8;
    font-style: italic;
    font-size: 0.75rem;
  }
  .sm-page-editor-toolbar-actions {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .sm-page-editor-toolbar-secondary,
  .sm-page-editor-toolbar-primary,
  .sm-page-editor-toolbar-icon {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.85rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: #f1f5f9;
    font: 600 0.8125rem / 1 system-ui, sans-serif;
    cursor: pointer;
    transition: background 120ms ease, opacity 120ms ease;
  }
  .sm-page-editor-toolbar-secondary:hover,
  .sm-page-editor-toolbar-icon:hover {
    background: rgba(255, 255, 255, 0.12);
  }
  .sm-page-editor-toolbar-secondary:disabled,
  .sm-page-editor-toolbar-primary:disabled,
  .sm-page-editor-toolbar-icon:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .sm-page-editor-toolbar-primary {
    background: #4f46e5;
    border-color: #4f46e5;
  }
  .sm-page-editor-toolbar-primary:hover:not(:disabled) {
    background: #4338ca;
  }
  .sm-page-editor-toolbar-icon {
    padding: 0.5rem 0.6rem;
  }
  .sm-page-editor-toolbar-icon i {
    font-size: 1.05rem;
  }
  .sm-page-editor-toolbar-message {
    padding: 0.55rem 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font: 500 0.8125rem / 1.4 system-ui, sans-serif;
    color: #fde68a;
    text-align: center;
  }

  /* SEO settings drawer (above toolbar) */
  .sm-page-editor-seo-panel {
    position: fixed;
    bottom: 5.5rem;
    left: 50%;
    z-index: 10001;
    transform: translateX(-50%);
    width: min(28rem, calc(100vw - 2rem));
    max-height: min(70vh, 32rem);
    overflow-y: auto;
    padding: 1rem 1.1rem 1.15rem;
    border-radius: 14px;
    background: #fff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.22);
    font-family: system-ui, -apple-system, sans-serif;
  }
  .sm-page-editor-seo-panel-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
  }
  .sm-page-editor-seo-panel-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
  }
  .sm-page-editor-seo-panel-sub {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #64748b;
    line-height: 1.4;
  }
  .sm-page-editor-seo-form {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .sm-page-editor-seo-field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.8125rem;
    color: #0f172a;
  }
  .sm-page-editor-seo-field > span:first-child {
    font-weight: 600;
  }
  .sm-page-editor-seo-hint {
    font-size: 0.6875rem;
    color: #64748b;
    line-height: 1.35;
    font-weight: 400;
  }
  .sm-page-editor-seo-field input,
  .sm-page-editor-seo-field textarea {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font: inherit;
    color: #0f172a;
    background: #fff;
  }
  .sm-page-editor-seo-field textarea {
    resize: vertical;
    min-height: 4rem;
  }
  .sm-page-editor-seo-slug-row {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    background: #f8fafc;
  }
  .sm-page-editor-seo-slug-prefix {
    padding: 0.5rem 0.55rem;
    font-size: 0.8125rem;
    color: #64748b;
    border-right: 1px solid #e2e8f0;
    white-space: nowrap;
  }
  .sm-page-editor-seo-slug-row input {
    border: none;
    border-radius: 0;
    background: #fff;
    flex: 1;
  }
  .sm-page-editor-seo-route {
    margin: 0.25rem 0 0;
    font-size: 0.6875rem;
    color: #94a3b8;
  }
  .sm-page-editor-seo-route code {
    font-size: 0.6875rem;
    color: #475569;
  }
  .sm-page-editor-seo-muted {
    margin: 0;
    font-size: 0.8125rem;
    color: #64748b;
  }
`;

export default function PageEditorStyles() {
  return <style dangerouslySetInnerHTML={{ __html: STYLES }} />;
}
