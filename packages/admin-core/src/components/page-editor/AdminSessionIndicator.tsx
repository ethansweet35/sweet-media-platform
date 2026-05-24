"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePageEditor } from "../../contexts/PageEditorContext";

function displayEmail(email: string): string {
  const local = email.split("@")[0] ?? email;
  return local.length > 18 ? `${local.slice(0, 16)}…` : local;
}

/**
 * Fixed session chip for authenticated admins on every public route (and /admin).
 * Mounted from PageEditorProvider so all client apps get it without per-app wiring.
 */
export default function AdminSessionIndicator() {
  const editor = usePageEditor();
  const [mounted, setMounted] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (editor.isLoading) return null;
  if (!editor.isAdmin) return null;

  const emailLabel = editor.userEmail ? displayEmail(editor.userEmail) : "Admin";

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await editor.signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return createPortal(
    <div className="sm-admin-session" role="status" aria-live="polite">
      <span className="sm-admin-session-status">
        <span className="sm-admin-session-dot" aria-hidden />
        <span className="sm-admin-session-label">Logged in</span>
        <span className="sm-admin-session-email" title={editor.userEmail ?? undefined}>
          {emailLabel}
        </span>
      </span>
      <a
        href="/admin"
        className="sm-admin-session-link"
        title="Open admin dashboard"
      >
        <i className="ri-dashboard-line" aria-hidden />
        <span className="sm-admin-session-link-text">Admin</span>
      </a>
      <button
        type="button"
        className="sm-admin-session-logout"
        onClick={handleSignOut}
        disabled={signingOut}
        aria-label="Log out"
        title="Log out"
      >
        <i className="ri-logout-box-r-line" aria-hidden />
        <span className="sm-admin-session-logout-text">
          {signingOut ? "…" : "Log out"}
        </span>
      </button>
    </div>,
    document.body,
  );
}
