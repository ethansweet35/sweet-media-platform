/**
 * Post-build: sync static App Router URLs into tracked_pages (idempotent).
 * Never fails the build — exits 0 on missing env or Supabase errors.
 */
import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createClient } from "@supabase/supabase-js";

const APP_DIR = join(process.cwd(), "src", "app");

/** Lowercase slug piece → uppercase display token when whole word matches */
const TITLE_ACRONYMS = new Set(["seo", "ppc", "ai", "csr"]);

type SkipReason =
  | "dynamic-segment"
  | "route-group"
  | "admin"
  | "parallel-slot"
  | "private-route";

interface ScanOutcome {
  file: string;
  routePath?: string;
  skipped?: SkipReason;
}

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
      continue;
    }
    if (name === "page.tsx") paths.push(full);
  }
  return paths;
}

/**
 * Routes use URL-visible segments only: route groups (...)/ are skipped entirely;
 * segments starting with _ are omitted (Next private folders).
 */
function classifyPageFile(pageFileAbsolute: string): ScanOutcome {
  const norm = relative(APP_DIR, dirname(pageFileAbsolute)).replace(/\\/g, "/");
  const rawSegments = norm.split("/").filter(Boolean);

  for (const seg of rawSegments) {
    if (seg.startsWith("@")) {
      return { file: pageFileAbsolute, skipped: "parallel-slot" };
    }
    if (/^\([^)]+\)$/.test(seg)) {
      return { file: pageFileAbsolute, skipped: "route-group" };
    }
    if (seg.includes("[") || seg.includes("]")) {
      return { file: pageFileAbsolute, skipped: "dynamic-segment" };
    }
  }

  if (rawSegments.includes("admin")) {
    return { file: pageFileAbsolute, skipped: "admin" };
  }

  const visibleSegments = rawSegments.filter((s) => !s.startsWith("_"));

  if (visibleSegments.length === 0 && rawSegments.some((s) => s.startsWith("_"))) {
    return { file: pageFileAbsolute, skipped: "private-route" };
  }

  const routePath = visibleSegments.length === 0 ? "/" : `/${visibleSegments.join("/")}`;

  return { file: pageFileAbsolute, routePath };
}

function titleCaseWord(w: string): string {
  const lower = w.toLowerCase();
  if (TITLE_ACRONYMS.has(lower)) return lower.toUpperCase();
  return lower.length === 0 ? "" : lower[0].toUpperCase() + lower.slice(1);
}

/** / → Home; /paid-media/foo → Paid Media Foo */
function derivePageTitle(routePath: string): string {
  if (routePath === "/") return "Home";
  const body = routePath.startsWith("/") ? routePath.slice(1) : routePath;
  const pathSegments = body.split("/").filter(Boolean);
  const words: string[] = [];
  for (const segment of pathSegments) {
    for (const raw of segment.split("-")) {
      if (raw) words.push(titleCaseWord(raw));
    }
  }
  return words.length > 0 ? words.join(" ") : "Home";
}

async function main(): Promise<void> {
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

  let pageFiles: string[];
  try {
    pageFiles = collectPageFiles(APP_DIR);
  } catch (e) {
    console.warn("[sync-tracked-pages] Could not scan src/app:", e);
    process.exitCode = 0;
    return;
  }

  const skipCounts: Record<SkipReason | "duplicate-route", number> = {
    "dynamic-segment": 0,
    "route-group": 0,
    admin: 0,
    "parallel-slot": 0,
    "private-route": 0,
    "duplicate-route": 0,
  };

  const kept: { routePath: string; derivedTitle: string }[] = [];
  const seenRoutes = new Set<string>();

  for (const file of pageFiles.sort()) {
    const outcome = classifyPageFile(file);
    if (outcome.skipped) {
      skipCounts[outcome.skipped]++;
      continue;
    }
    const routePath = outcome.routePath!;
    if (seenRoutes.has(routePath)) {
      skipCounts["duplicate-route"]++;
      continue;
    }
    seenRoutes.add(routePath);
    kept.push({
      routePath,
      derivedTitle: derivePageTitle(routePath),
    });
  }

  const totalSkipped =
    skipCounts["dynamic-segment"] +
    skipCounts["route-group"] +
    skipCounts.admin +
    skipCounts["parallel-slot"] +
    skipCounts["private-route"] +
    skipCounts["duplicate-route"];

  console.log(`[sync-tracked-pages] Total page.tsx scanned: ${pageFiles.length}`);
  console.log(
    `[sync-tracked-pages] Skipped (${totalSkipped}): dynamic=${skipCounts["dynamic-segment"]}, route-group=${skipCounts["route-group"]}, admin=${skipCounts.admin}, parallel @=${skipCounts["parallel-slot"]}, private (_)=${skipCounts["private-route"]}, duplicate-route=${skipCounts["duplicate-route"]}`,
  );

  if (kept.length === 0) {
    console.log("[sync-tracked-pages] No routes to sync.");
    process.exitCode = 0;
    return;
  }

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

  console.log(`[sync-tracked-pages] Routes targeted for inventory: ${kept.length}`);
  console.log(`[sync-tracked-pages] Already existed in tracked_pages: ${alreadyExisted}`);
  console.log(`[sync-tracked-pages] Insert attempted (new rows via upsert): ${insertedAttempted}`);
}

main().catch((e) => {
  console.warn("[sync-tracked-pages] Unexpected error (non-fatal):", e);
  process.exitCode = 0;
});
