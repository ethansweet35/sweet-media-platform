import { NextResponse } from "next/server";
import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const APP_DIR = join(process.cwd(), "src", "app");

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

function resolveRoutePath(pageFileAbsolute: string): string | null {
  const norm = relative(APP_DIR, dirname(pageFileAbsolute)).replace(/\\/g, "/");
  const rawSegments = norm.split("/").filter(Boolean);

  for (const seg of rawSegments) {
    if (seg.startsWith("@")) return null;
    if (/^\([^)]+\)$/.test(seg)) return null;
    if (seg.includes("[") || seg.includes("]")) return null;
  }

  if (rawSegments.includes("admin")) return null;

  const visibleSegments = rawSegments.filter((s) => !s.startsWith("_"));
  return visibleSegments.length === 0 ? "/" : `/${visibleSegments.join("/")}`;
}

export async function GET() {
  try {
    const files = collectPageFiles(APP_DIR);
    const seen = new Set<string>();
    const routes: string[] = [];

    for (const file of files.sort()) {
      const route = resolveRoutePath(file);
      if (!route || seen.has(route)) continue;
      seen.add(route);
      routes.push(route);
    }

    return NextResponse.json({ routes });
  } catch {
    return NextResponse.json({ routes: [] });
  }
}
