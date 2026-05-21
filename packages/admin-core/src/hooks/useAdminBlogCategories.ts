"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchBlogCategoryNames } from "@sweetmedia/blog-core";
import { supabase } from "../lib/supabase";

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "client-template";

export interface AdminBlogCategoryOption {
  value: string;
  label: string;
}

export function useAdminBlogCategories(options?: {
  ensureValues?: string[];
  emptyOption?: AdminBlogCategoryOption;
}) {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const ensureKey = (options?.ensureValues ?? [])
    .map((v) => v.trim())
    .filter(Boolean)
    .join("\0");

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setLoading(true);
      try {
        const list = await fetchBlogCategoryNames(supabase, {
          siteId: SITE_ID,
          siteKey: SITE_ID,
          includeFromPosts: false,
          ensureValues: options?.ensureValues,
        });
        if (!cancelled) setNames(list);
      } catch {
        if (!cancelled) setNames([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ensureKey]);

  const categoryOptions = useMemo(() => {
    const opts: AdminBlogCategoryOption[] = [];
    if (options?.emptyOption) {
      opts.push(options.emptyOption);
    }
    for (const name of names) {
      opts.push({ value: name, label: name });
    }
    return opts;
  }, [names, options?.emptyOption?.value, options?.emptyOption?.label]);

  return { names, categoryOptions, loading };
}
