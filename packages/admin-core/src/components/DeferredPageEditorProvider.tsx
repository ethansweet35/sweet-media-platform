"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const PageEditorProvider = dynamic(() => import("./page-editor/PageEditorProvider"), {
  ssr: false,
});

function hasAdminSessionHint(): boolean {
  if (typeof document === "undefined") return false;
  if (document.cookie.split(";").some((c) => c.trim() === "sm_internal=1")) {
    return true;
  }
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
 * Loads the inline page editor bundle only when needed:
 * - immediately for signed-in admins (cookie / Supabase session hint)
 * - after idle for anonymous visitors (toolbar is unused)
 * - never on /admin/* (admin chrome is separate)
 */
export function DeferredPageEditorProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const isAdminRoute = pathname.startsWith("/admin");
  const [loadEditor, setLoadEditor] = useState(false);

  useEffect(() => {
    if (isAdminRoute) return;

    if (hasAdminSessionHint()) {
      setLoadEditor(true);
      return;
    }

    const onIdle = () => setLoadEditor(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(onIdle, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(onIdle, 2500);
    return () => clearTimeout(t);
  }, [isAdminRoute, pathname]);

  if (isAdminRoute || !loadEditor) {
    return <>{children}</>;
  }

  return <PageEditorProvider>{children}</PageEditorProvider>;
}
