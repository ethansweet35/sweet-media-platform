"use client";

function fromWindow(): string | null {
  if (typeof window === "undefined") return null;
  const origin = window.location?.origin?.trim();
  return origin && origin.length > 0 ? origin : null;
}

/** Resolve site origin from env first, then browser origin, then localhost. */
export function getPublicSiteOrigin(): string {
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const raw = (envOrigin && envOrigin.length > 0 ? envOrigin : fromWindow()) ?? "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function canonicalBlogPostUrl(slug: string): string {
  return `${getPublicSiteOrigin()}/blog/${slug}`;
}
