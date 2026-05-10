import { supabase } from "./supabase";

export interface SeoGenInput {
  type: "page" | "post";
  title: string;
  route?: string;
  excerpt?: string;
  category?: string;
  keyword?: string;
}

export interface SeoGenResult {
  seo_title: string | null;
  meta_description: string;
}

export async function callGenerateSeoMetadata(input: SeoGenInput): Promise<SeoGenResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("You must be logged in to use AI SEO.");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");

  const apikey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  const res = await fetch(`${supabaseUrl}/functions/v1/generate-seo-metadata`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      apikey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  let body: Record<string, unknown>;
  try {
    body = (await res.json()) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from SEO generator");
  }

  if (!res.ok || body.error) {
    throw new Error(
      typeof body.error === "string" ? body.error.slice(0, 500) : `HTTP ${res.status}`,
    );
  }

  return {
    seo_title: typeof body.seo_title === "string" ? body.seo_title : null,
    meta_description: typeof body.meta_description === "string" ? body.meta_description : "",
  };
}
