"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const PageEditorProvider = dynamic(() => import("./page-editor/PageEditorProvider"), {
  ssr: false,
});

/**
 * Detects whether the current visitor is (or is becoming) an admin, so we only
 * ever ship the inline-editor bundle (Supabase auth + toolbar, ~hundreds of KB)
 * to people who can actually use it. Anonymous visitors never download it.
 */
function hasAdminSessionHint(): boolean {
  if (typeof document === "undefined") return false;

  // Set by AuthContext on admin login; cleared on sign-out.
  if (document.cookie.split(";").some((c) => c.trim() === "sm_internal=1")) {
    return true;
  }
  // Set whenever an admin toggles inline edit mode.
  if (document.cookie.split(";").some((c) => c.trim() === "sm_edit_mode=1")) {
    return true;
  }
  // Explicit opt-in via query param (e.g. an admin opening ?sm_edit=1).
  try {
    if (new URLSearchParams(window.location.search).has("sm_edit")) return true;
  } catch {
    /* ignore */
  }
  // Persisted Supabase session token.
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("sb-") && key.includes("auth-token")) return true;
    }
  } catch {
    /* localStorage blocked */
  }
  return false;
}

/**
 * Loads the inline page editor bundle only for signed-in admins:
 * - never on /admin/* (admin chrome handles its own shell)
 * - only when an admin session hint is present (cookie / token / ?sm_edit)
 * - anonymous visitors render published content with zero editor JS
 *
 * EditableText / EditableImage fall back to a safe no-op stub when the provider
 * is absent, so public pages render their published values unchanged.
 */
export function DeferredPageEditorProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const isAdminRoute = pathname.startsWith("/admin");
  const [loadEditor, setLoadEditor] = useState(false);

  useEffect(() => {
    if (isAdminRoute) {
      setLoadEditor(false);
      return;
    }
    // Re-check on each navigation: an admin who just logged in elsewhere will
    // have the hint on their next public-page view.
    setLoadEditor(hasAdminSessionHint());
  }, [isAdminRoute, pathname]);

  if (isAdminRoute || !loadEditor) {
    return <>{children}</>;
  }

  return <PageEditorProvider>{children}</PageEditorProvider>;
}
