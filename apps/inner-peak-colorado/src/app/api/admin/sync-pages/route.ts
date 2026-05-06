import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const APP_DIR = join(process.cwd(), "src", "app");

function collectPageFiles(dir: string): string[] {
  const paths: string[] = [];
  try {
    for (const name of readdirSync(dir)) {
      if (name.startsWith(".")) continue;
      const full = join(dir, name);
      if (statSync(full).isDirectory()) paths.push(...collectPageFiles(full));
      else if (name === "page.tsx") paths.push(full);
    }
  } catch { /* non-fatal */ }
  return paths;
}

function resolveRoutePath(file: string): string | null {
  const norm = relative(APP_DIR, dirname(file)).replace(/\\/g, "/");
  const segs = norm.split("/").filter(Boolean);
  for (const s of segs) {
    if (s.startsWith("@") || /^\([^)]+\)$/.test(s) || s.includes("[") || s === "admin" || s === "api") return null;
  }
  const visible = segs.filter((s) => !s.startsWith("_"));
  return visible.length === 0 ? "/" : `/${visible.join("/")}`;
}

function deriveTitle(route: string): string {
  if (route === "/") return "Home";
  return route.replace(/^\//, "").split("/").map((seg) =>
    seg.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  ).join(" › ");
}

function extractFallbackMetadata(routePath: string): { title: string | null; description: string | null } {
  try {
    const seg = routePath === "/" ? "" : routePath.replace(/^\//, "");
    const filePath = join(APP_DIR, seg, "page.tsx");
    const content = readFileSync(filePath, "utf-8");

    const start = content.indexOf("fallbackMetadata");
    if (start === -1) return { title: null, description: null };
    const block = content.slice(start, start + 3000);

    const titleMatch = block.match(/title:\s*"([^"]+)"/) ?? block.match(/title:\s*'([^']+)'/);
    const descMatch =
      block.match(/description:\s*\n?\s*"([^"]+)"/) ??
      block.match(/description:\s*\n?\s*'([^']+)'/);

    return {
      title: titleMatch?.[1]?.trim() ?? null,
      description: descMatch?.[1]?.trim() ?? null,
    };
  } catch {
    return { title: null, description: null };
  }
}

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY is not set in Vercel environment variables. Add it under Settings → Environment Variables." },
      { status: 500 }
    );
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Scan routes
  const seen = new Set<string>();
  const routes: string[] = [];
  for (const file of collectPageFiles(APP_DIR).sort()) {
    const route = resolveRoutePath(file);
    if (!route || seen.has(route)) continue;
    seen.add(route);
    routes.push(route);
  }

  if (routes.length === 0) {
    return NextResponse.json({ inserted: 0, skipped: 0, total: 0 });
  }

  // Find existing routes
  const { data: existing } = await admin.from("tracked_pages").select("route_path");
  const existingSet = new Set((existing ?? []).map((r: { route_path: string }) => r.route_path));

  const { data: maxRow } = await admin.from("tracked_pages")
    .select("display_order").order("display_order", { ascending: false }).limit(1).maybeSingle();
  const baseOrder = maxRow ? Number((maxRow as { display_order: number }).display_order) + 10 : 0;

  const newRoutes = routes.filter((r) => !existingSet.has(r));
  const existingRoutes = routes.filter((r) => existingSet.has(r));

  // Backfill default metadata for already-tracked pages
  for (const r of existingRoutes) {
    const defaults = extractFallbackMetadata(r);
    if (defaults.title || defaults.description) {
      await admin.from("tracked_pages").update({
        default_seo_title: defaults.title,
        default_meta_description: defaults.description,
      }).eq("route_path", r);
    }
  }

  if (newRoutes.length === 0) {
    return NextResponse.json({ inserted: 0, skipped: routes.length, total: routes.length });
  }

  const toInsert = newRoutes.map((r, i) => {
    const defaults = extractFallbackMetadata(r);
    return {
      route_path: r,
      page_title: deriveTitle(r),
      display_order: baseOrder + (i + 1) * 10,
      is_active: true,
      default_seo_title: defaults.title,
      default_meta_description: defaults.description,
    };
  });

  const { error } = await admin.from("tracked_pages").insert(toInsert);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ inserted: toInsert.length, skipped: existingSet.size, total: routes.length });
}
