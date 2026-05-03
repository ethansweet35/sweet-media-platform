import { createClient } from "@supabase/supabase-js";
import type { BrandSettings } from "../types/brandSettings";

export async function getBrandSettings(params: {
  supabaseUrl: string;
  supabaseKey: string;
  siteKey?: string;
}): Promise<BrandSettings | null> {
  const supabase = createClient(params.supabaseUrl, params.supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("brand_settings")
    .select("*")
    .eq("site_key", params.siteKey ?? "default")
    .maybeSingle();

  if (error || !data) return null;

  return {
    ...data,
    blog_categories: Array.isArray(data.blog_categories)
      ? data.blog_categories
      : [],
  } as BrandSettings;
}
