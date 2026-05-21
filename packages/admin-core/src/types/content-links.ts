export type LinkStatus = "pending" | "checking" | "ok" | "broken" | "redirect" | "error";
export type FilterType = "all" | "broken" | "redirect" | "ok";

export type ActionModal =
  | { type: "remove"; link: FoundLink }
  | { type: "replace"; link: FoundLink }
  | { type: "auto"; link: FoundLink }
  | { type: "bulk-remove" }
  | { type: "bulk-auto" }
  | null;

export interface FoundLink {
  uid: string;
  postSlug: string;
  postTitle: string;
  anchorText: string;
  url: string;
  isExternal: boolean;
  blockIndex: number;
  blockType: string;
  status: LinkStatus;
  statusCode?: number;
  finalUrl?: string;
  errorMessage?: string;
  checked: boolean;
}

export interface ContentBlock {
  type: string;
  text?: string;
  items?: string[];
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface Suggestion {
  url: string;
  title: string;
  description: string;
  source: "internal" | "web";
  score?: number;
}

export type BulkAutoResult =
  | { uid: string; newUrl: string }
  | { uid: string; skipped: true; reason: string };

export const STATUS_CONFIG: Record<LinkStatus, { label: string; color: string; bg: string; border: string; icon: string }> = {
  pending:  { label: "Pending",  color: "text-[#94A3B8]", bg: "bg-[#F4F7FB]", border: "border-[#E2E8F0]", icon: "ri-time-line" },
  checking: { label: "Checking", color: "text-amber-500",   bg: "bg-amber-50",    border: "border-amber-100",   icon: "ri-loader-4-line" },
  ok:       { label: "OK",       color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-100", icon: "ri-checkbox-circle-line" },
  broken:   { label: "Broken",   color: "text-red-600",     bg: "bg-red-50",      border: "border-red-200",     icon: "ri-error-warning-line" },
  redirect: { label: "Redirect", color: "text-amber-600",   bg: "bg-amber-50",    border: "border-amber-200",   icon: "ri-arrow-right-circle-line" },
  error:    { label: "Error",    color: "text-red-500",     bg: "bg-red-50",      border: "border-red-200",     icon: "ri-close-circle-line" },
};

export const STATIC_ROUTES = new Set([
  "/",
  "/industries",
  "/results",
  "/about",
  "/contact",
  "/blog",
  "/seo",
  "/paid-media",
  "/social-media",
  "/web-dev",
  "/case-studies/california-prime-recovery",
  "/case-studies/rize-oc",
]);

/** Legacy paths from the old SPA router → canonical App Router URLs */
export const REDIRECT_MAP: Record<string, string> = {
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/services/seo": "/seo",
  "/services/paid-media": "/paid-media",
  "/services/social-media": "/social-media",
  "/services/web-development": "/web-dev",
};
