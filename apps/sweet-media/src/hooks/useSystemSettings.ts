import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useSystemSettings() {
  const getSetting = useCallback(async <T,>(key: string): Promise<T | null> => {
    const { data, error } = await supabase
      .from("system_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) throw error;
    if (data === null || data.value === undefined) return null;
    return data.value as T;
  }, []);

  const setSetting = useCallback(async <T,>(key: string, value: T): Promise<boolean> => {
    const { error } = await supabase.from("system_settings").upsert(
      { key, value },
      { onConflict: "key" },
    );
    return error === null;
  }, []);

  return useMemo(() => ({ getSetting, setSetting }), [getSetting, setSetting]);
}

/**
 * Reads / flips `auto_publish_enabled`.
 * Missing row → enabled interpreted as true once loaded (`enabled === true`).
 */
export function useAutoPublishEnabled() {
  const { getSetting, setSetting } = useSystemSettings();

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const v = await getSetting<boolean>("auto_publish_enabled");
      const off = v === false;
      setEnabled(!off);
    } catch {
      setEnabled(true);
    } finally {
      setLoading(false);
    }
  }, [getSetting]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(async () => {
    if (loading) return false;
    const cur = enabled !== false;
    const next = !cur;
    const ok = await setSetting<boolean>("auto_publish_enabled", next);
    if (ok) setEnabled(next);
    return ok;
  }, [enabled, loading, setSetting]);

  return useMemo(
    () => ({
      enabled,
      loading,
      toggle,
      refetch: refresh,
    }),
    [enabled, loading, refresh, toggle],
  );
}
