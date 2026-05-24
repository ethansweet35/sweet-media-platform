"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import type { PageContentFieldType, PendingEdit } from "../components/page-editor/types";
import { buildPendingEditKey, isPublicPageEditorRoute, normalizeRoutePath } from "../components/page-editor/routePath";

export type PageEditorMode = "view" | "edit";

export interface PageEditorContextValue {
  /** Are we currently in edit mode? Always false when isAdmin is false. */
  isEditMode: boolean;
  /** Has the current visitor authenticated as an admin user? */
  isAdmin: boolean;
  /** Still loading auth state. */
  isLoading: boolean;
  /** Live route path (from next/navigation). */
  routePath: string;
  /** False on /admin/* — toolbar and edit affordances are hidden. */
  isEditorAvailable: boolean;
  /** Per-field pending edits keyed by `${routePath}::${fieldKey}`. */
  pending: Map<string, PendingEdit>;
  /** Number of pending edits for the current route. */
  pendingCount: number;
  /** Submit/save/discard state for the toolbar. */
  status: "idle" | "saving" | "publishing" | "discarding";
  /** Last user-facing message after save/publish/discard. */
  message: string | null;
  toggleEditMode: () => void;
  exitEditMode: () => void;
  setPendingEdit: (input: {
    fieldKey: string;
    fieldType: PageContentFieldType;
    value: string;
    originalValue: string | null;
  }) => void;
  clearPendingEdit: (fieldKey: string) => void;
  saveDraft: () => Promise<void>;
  publish: () => Promise<void>;
  discardDraft: () => Promise<void>;
}

const PageEditorContext = createContext<PageEditorContextValue | null>(null);

const EDIT_QUERY_KEY = "sm_edit";
const EDIT_COOKIE_NAME = "sm_edit_mode";

function getEditCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim() === `${EDIT_COOKIE_NAME}=1`);
}

function writeEditCookie(on: boolean) {
  if (typeof document === "undefined") return;
  document.cookie = on
    ? `${EDIT_COOKIE_NAME}=1; max-age=31536000; path=/; SameSite=Strict`
    : `${EDIT_COOKIE_NAME}=; max-age=0; path=/; SameSite=Strict`;
}

interface ProviderProps {
  children: React.ReactNode;
}

export function PageEditorContextProvider({ children }: ProviderProps) {
  const pathname = usePathname() ?? "/";
  const routePath = normalizeRoutePath(pathname);
  const isEditorAvailable = isPublicPageEditorRoute(routePath);
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pending, setPending] = useState<Map<string, PendingEdit>>(() => new Map());
  const [status, setStatus] = useState<"idle" | "saving" | "publishing" | "discarding">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const adminCheckRef = useRef(false);
  /** When set, overrides URL/cookie auto-detection until the route changes. */
  const userEditPreferenceRef = useRef<boolean | null>(null);

  const syncEditQueryParam = useCallback(
    (enabled: boolean) => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      if (enabled) {
        url.searchParams.set(EDIT_QUERY_KEY, "1");
      } else {
        url.searchParams.delete(EDIT_QUERY_KEY);
      }
      const next = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next !== current) {
        router.replace(next, { scroll: false });
      }
    },
    [router],
  );

  const checkAdmin = useCallback(async (email: string | null | undefined) => {
    if (!email) return false;
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      if (error) return false;
      return !!data;
    } catch {
      return false;
    }
  }, []);

  // Auth check (independent of AdminGuard's AuthProvider — works on any page).
  useEffect(() => {
    let mounted = true;

    const run = async (email: string | null | undefined) => {
      if (adminCheckRef.current) return;
      adminCheckRef.current = true;
      try {
        const admin = email ? await checkAdmin(email) : false;
        if (mounted) {
          setIsAdmin(admin);
          setIsLoading(false);
        }
      } finally {
        adminCheckRef.current = false;
      }
    };

    supabase.auth
      .getSession()
      .then(({ data: { session: s } }) => run(s?.user?.email))
      .catch(() => {
        if (mounted) setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, s) => {
      run(s?.user?.email);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdmin]);

  // Reset manual preference when navigating to a different route.
  useEffect(() => {
    userEditPreferenceRef.current = null;
  }, [pathname]);

  // Determine edit mode from URL/cookie unless the user explicitly toggled on this route.
  useEffect(() => {
    if (!isAdmin || !isEditorAvailable) {
      setIsEditMode(false);
      return;
    }

    if (userEditPreferenceRef.current !== null) {
      setIsEditMode(userEditPreferenceRef.current);
      return;
    }

    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const wantsEdit = params.get(EDIT_QUERY_KEY) === "1" || getEditCookie();
    setIsEditMode(wantsEdit);
  }, [isAdmin, isEditorAvailable, pathname]);

  // Persist edit-mode preference to cookie so it follows across routes.
  useEffect(() => {
    if (!isAdmin) return;
    writeEditCookie(isEditMode);
  }, [isAdmin, isEditMode]);

  const toggleEditMode = useCallback(() => {
    if (!isAdmin || !isEditorAvailable) return;
    setIsEditMode((prev) => {
      const next = !prev;
      userEditPreferenceRef.current = next;
      writeEditCookie(next);
      syncEditQueryParam(next);
      return next;
    });
    setMessage(null);
  }, [isAdmin, isEditorAvailable, syncEditQueryParam]);

  const exitEditMode = useCallback(() => {
    userEditPreferenceRef.current = false;
    setIsEditMode(false);
    setPending(new Map());
    writeEditCookie(false);
    syncEditQueryParam(false);
  }, [syncEditQueryParam]);

  const fieldId = useCallback(
    (fieldKey: string) => buildPendingEditKey(routePath, fieldKey),
    [routePath],
  );

  const setPendingEdit = useCallback<PageEditorContextValue["setPendingEdit"]>(
    ({ fieldKey, fieldType, value, originalValue }) => {
      setPending((prev) => {
        const next = new Map(prev);
        const id = buildPendingEditKey(routePath, fieldKey);
        // Drop the edit when the new value matches the originally-rendered value.
        if (value === (originalValue ?? "")) {
          next.delete(id);
          return next;
        }
        next.set(id, {
          routePath,
          fieldKey,
          fieldType,
          value,
          originalValue,
        });
        return next;
      });
    },
    [routePath],
  );

  const clearPendingEdit = useCallback(
    (fieldKey: string) => {
      setPending((prev) => {
        const next = new Map(prev);
        next.delete(fieldId(fieldKey));
        return next;
      });
    },
    [fieldId],
  );

  const pendingForCurrentRoute = useMemo(() => {
    return Array.from(pending.values()).filter(
      (edit) => normalizeRoutePath(edit.routePath) === routePath,
    );
  }, [pending, routePath]);

  const callAdminEndpoint = useCallback(
    async (
      path: string,
      body: Record<string, unknown>,
    ): Promise<{ ok: boolean; status: number; data: unknown }> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      return { ok: res.ok, status: res.status, data };
    },
    [],
  );

  const saveDraft = useCallback(async () => {
    if (pendingForCurrentRoute.length === 0) {
      setMessage("Nothing to save.");
      return;
    }
    setStatus("saving");
    setMessage(null);
    try {
      const result = await callAdminEndpoint("/api/admin/page-content/save-draft", {
        routePath,
        fields: pendingForCurrentRoute.map((edit) => ({
          fieldKey: edit.fieldKey,
          fieldType: edit.fieldType,
          value: edit.value,
        })),
      });
      if (!result.ok) {
        const errMsg =
          (result.data as { error?: string } | null)?.error ?? `Save failed (HTTP ${result.status})`;
        setMessage(errMsg);
      } else {
        setMessage(`Saved ${pendingForCurrentRoute.length} draft change${pendingForCurrentRoute.length === 1 ? "" : "s"}.`);
        setPending((prev) => {
          const next = new Map(prev);
          for (const edit of pendingForCurrentRoute) {
            next.delete(buildPendingEditKey(edit.routePath, edit.fieldKey));
          }
          return next;
        });
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setStatus("idle");
    }
  }, [callAdminEndpoint, routePath, pendingForCurrentRoute]);

  const publish = useCallback(async () => {
    setStatus("publishing");
    setMessage(null);
    try {
      // If there are pending edits, save them as drafts first.
      if (pendingForCurrentRoute.length > 0) {
        const saveResult = await callAdminEndpoint("/api/admin/page-content/save-draft", {
          routePath,
          fields: pendingForCurrentRoute.map((edit) => ({
            fieldKey: edit.fieldKey,
            fieldType: edit.fieldType,
            value: edit.value,
          })),
        });
        if (!saveResult.ok) {
          const errMsg =
            (saveResult.data as { error?: string } | null)?.error ??
            `Save failed (HTTP ${saveResult.status})`;
          setMessage(errMsg);
          setStatus("idle");
          return;
        }
      }
      const result = await callAdminEndpoint("/api/admin/page-content/publish", {
        routePath,
      });
      if (!result.ok) {
        const errMsg =
          (result.data as { error?: string } | null)?.error ??
          `Publish failed (HTTP ${result.status})`;
        setMessage(errMsg);
      } else {
        const payload = result.data as {
          published?: number;
          redirectTo?: string;
        } | null;
        const published = payload?.published ?? 0;
        setMessage(`Published ${published} change${published === 1 ? "" : "s"} to the live site.`);
        setPending((prev) => {
          const next = new Map(prev);
          for (const edit of pendingForCurrentRoute) {
            next.delete(buildPendingEditKey(edit.routePath, edit.fieldKey));
          }
          return next;
        });
        const redirectTo = payload?.redirectTo?.trim();
        if (redirectTo && redirectTo !== routePath) {
          const href = redirectTo === "/" ? "/" : `${redirectTo}/`;
          router.push(href);
        } else {
          router.refresh();
        }
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setStatus("idle");
    }
  }, [callAdminEndpoint, routePath, pendingForCurrentRoute, router]);

  const discardDraft = useCallback(async () => {
    setStatus("discarding");
    setMessage(null);
    try {
      const result = await callAdminEndpoint("/api/admin/page-content/discard", {
        routePath,
      });
      if (!result.ok) {
        const errMsg =
          (result.data as { error?: string } | null)?.error ??
          `Discard failed (HTTP ${result.status})`;
        setMessage(errMsg);
      } else {
        setMessage("Discarded all draft changes.");
        setPending((prev) => {
          const next = new Map(prev);
          for (const [k, edit] of prev.entries()) {
            if (normalizeRoutePath(edit.routePath) === routePath) next.delete(k);
          }
          return next;
        });
        router.refresh();
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Discard failed");
    } finally {
      setStatus("idle");
    }
  }, [callAdminEndpoint, routePath, router]);

  const value: PageEditorContextValue = useMemo(
    () => ({
      isEditMode: isEditorAvailable && isEditMode,
      isAdmin,
      isLoading,
      isEditorAvailable,
      routePath,
      pending,
      pendingCount: pendingForCurrentRoute.length,
      status,
      message,
      toggleEditMode,
      exitEditMode,
      setPendingEdit,
      clearPendingEdit,
      saveDraft,
      publish,
      discardDraft,
    }),
    [
      clearPendingEdit,
      discardDraft,
      exitEditMode,
      isAdmin,
      isEditMode,
      isEditorAvailable,
      isLoading,
      message,
      routePath,
      pending,
      pendingForCurrentRoute.length,
      publish,
      saveDraft,
      setPendingEdit,
      status,
      toggleEditMode,
    ],
  );

  return <PageEditorContext.Provider value={value}>{children}</PageEditorContext.Provider>;
}

export function usePageEditor(): PageEditorContextValue {
  const ctx = useContext(PageEditorContext);
  if (!ctx) {
    // Allow EditableText / EditableImage to be used in pages without the
    // provider mounted by returning a safe no-op stub.
    return {
      isEditMode: false,
      isAdmin: false,
      isLoading: false,
      isEditorAvailable: false,
      routePath: "/",
      pending: new Map(),
      pendingCount: 0,
      status: "idle",
      message: null,
      toggleEditMode: () => {},
      exitEditMode: () => {},
      setPendingEdit: () => {},
      clearPendingEdit: () => {},
      saveDraft: async () => {},
      publish: async () => {},
      discardDraft: async () => {},
    };
  }
  return ctx;
}
