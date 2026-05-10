import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { SitemapPageRow } from "./sitemap";

function collectPageFiles(dir: string): string[] {
  const paths: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return paths;
  }
  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      paths.push(...collectPageFiles(full));
    } else if (name === "page.tsx") {
      paths.push(full);
    }
  }
  return paths;
}

function resolveRoutePath(appDir: string, pageFileAbsolute: string): string | null {
  const norm = relative(appDir, dirname(pageFileAbsolute)).replace(/\\/g, "/");
  const rawSegments = norm.split("/").filter(Boolean);

  for (const seg of rawSegments) {
    if (seg.startsWith("@")) return null;
    if (/^\([^)]+\)$/.test(seg)) return null;
    if (seg.includes("[") || seg.includes("]")) return null;
  }

  if (rawSegments.includes("admin") || rawSegments.includes("api")) return null;

  const visibleSegments = rawSegments.filter((s) => !s.startsWith("_"));
  return visibleSegments.length === 0 ? "/" : `/${visibleSegments.join("/")}`;
}

/**
 * Scans the Next.js src/app directory at build/request time and returns
 * SitemapPageRow objects for all static public routes.
 * Returns empty array if the directory cannot be read.
 */
export function scanAppRoutes(cwd: string): SitemapPageRow[] {
  const appDir = join(cwd, "src", "app");
  try {
    const files = collectPageFiles(appDir);
    const seen = new Set<string>();
    const rows: SitemapPageRow[] = [];

    for (const file of files.sort()) {
      const route = resolveRoutePath(appDir, file);
      if (!route || seen.has(route)) continue;
      seen.add(route);
      rows.push({ route_path: route, updated_at: null });
    }

    return rows;
  } catch {
    return [];
  }
}

// ─── Title derivation ─────────────────────────────────────────────────────────

/** Segment tokens that should render as all-uppercase (e.g. "seo" → "SEO"). */
const TITLE_ACRONYMS = new Set(["seo", "ppc", "ai", "csr"]);

function titleCaseWord(w: string): string {
  const lower = w.toLowerCase();
  if (TITLE_ACRONYMS.has(lower)) return lower.toUpperCase();
  return lower.length === 0 ? "" : lower[0].toUpperCase() + lower.slice(1);
}

/**
 * Derive a human-readable page title from a route path.
 * `/` → "Home"; `/paid-media/foo` → "Paid Media Foo"
 */
export function derivePageTitle(routePath: string): string {
  if (routePath === "/") return "Home";
  const body = routePath.startsWith("/") ? routePath.slice(1) : routePath;
  const words: string[] = [];
  for (const segment of body.split("/").filter(Boolean)) {
    for (const raw of segment.split("-")) {
      if (raw) words.push(titleCaseWord(raw));
    }
  }
  return words.length > 0 ? words.join(" ") : "Home";
}

// ─── Supabase sync ────────────────────────────────────────────────────────────

/**
 * Post-build sync: scan static App Router pages and upsert new routes into
 * `tracked_pages`. Idempotent — existing rows are never overwritten. Exits 0
 * on missing env vars or Supabase errors so the build never fails.
 *
 * @param cwd Absolute path to the app root (typically `process.cwd()`).
 */
export async function syncTrackedPages(cwd: string): Promise<void> {
  console.log("[sync-tracked-pages] Scanning App Router pages under src/app …");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceKey) {
    console.warn(
      "[sync-tracked-pages] Skipping sync: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY missing (non-fatal).",
    );
    process.exitCode = 0;
    return;
  }

  const scanned = scanAppRoutes(cwd);

  if (scanned.length === 0) {
    console.log("[sync-tracked-pages] No static routes found.");
    process.exitCode = 0;
    return;
  }

  // route_path is typed as string | null in SitemapPageRow but scanAppRoutes
  // only ever produces non-null values. Filter defensively so TS is satisfied.
  const kept = scanned
    .filter((row): row is typeof row & { route_path: string } => row.route_path !== null)
    .map((row) => ({
      routePath: row.route_path,
      derivedTitle: derivePageTitle(row.route_path),
    }));

  console.log(`[sync-tracked-pages] Static routes found: ${kept.length}`);

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: maxRow, error: maxErr } = await supabase
    .from("tracked_pages")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxErr) {
    console.warn("[sync-tracked-pages] Aborting sync (could not read display_order max):", maxErr.message);
    process.exitCode = 0;
    return;
  }

  const rawMax =
    maxRow && typeof maxRow === "object" && "display_order" in maxRow && maxRow.display_order != null
      ? Number((maxRow as { display_order: number }).display_order)
      : -1;

  const routes = kept.map((k) => k.routePath);

  const { data: existingRows, error: exErr } = await supabase
    .from("tracked_pages")
    .select("route_path")
    .in("route_path", routes);

  if (exErr) {
    console.warn("[sync-tracked-pages] Aborting sync (could not read existing routes):", exErr.message);
    process.exitCode = 0;
    return;
  }

  const existingSet = new Set(
    (existingRows ?? []).map((r) => (typeof r.route_path === "string" ? r.route_path : "")),
  );

  const alreadyExisted = routes.filter((r) => existingSet.has(r)).length;
  const toInsert = kept.filter((k) => !existingSet.has(k.routePath));
  const baseOrder = rawMax + 10;

  const payloads = toInsert.map((row, idx) => ({
    route_path: row.routePath,
    page_title: row.derivedTitle,
    default_seo_title: row.derivedTitle,
    display_order: baseOrder + (idx + 1) * 10,
    is_active: true,
    seo_title: null as string | null,
    meta_description: null as string | null,
    primary_keyword: null as string | null,
    notes: null as string | null,
  }));

  let insertedAttempted = 0;
  if (payloads.length > 0) {
    const { error: upErr } = await supabase.from("tracked_pages").upsert(payloads, {
      onConflict: "route_path",
      ignoreDuplicates: true,
      defaultToNull: true,
    });
    if (upErr) {
      console.warn("[sync-tracked-pages] Upsert failed (non-fatal):", upErr.message);
      process.exitCode = 0;
      return;
    }
    insertedAttempted = payloads.length;
  }

  // Back-fill default_seo_title on existing rows that still have it null.
  const existingNullRows = kept.filter((k) => existingSet.has(k.routePath));
  if (existingNullRows.length > 0) {
    const { data: nullTitleRows } = await supabase
      .from("tracked_pages")
      .select("id, route_path")
      .in("route_path", existingNullRows.map((k) => k.routePath))
      .is("default_seo_title", null);

    const toBackfill = (nullTitleRows ?? []) as { id: string; route_path: string }[];
    for (const row of toBackfill) {
      const match = kept.find((k) => k.routePath === row.route_path);
      if (!match) continue;
      await supabase
        .from("tracked_pages")
        .update({ default_seo_title: match.derivedTitle })
        .eq("id", row.id);
    }
    if (toBackfill.length > 0) {
      console.log(`[sync-tracked-pages] Back-filled default_seo_title for ${toBackfill.length} existing rows.`);
    }
  }

  console.log(`[sync-tracked-pages] Routes targeted for inventory: ${kept.length}`);
  console.log(`[sync-tracked-pages] Already existed in tracked_pages: ${alreadyExisted}`);
  console.log(`[sync-tracked-pages] Insert attempted (new rows via upsert): ${insertedAttempted}`);
}
