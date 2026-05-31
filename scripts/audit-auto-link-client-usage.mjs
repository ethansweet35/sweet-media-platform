#!/usr/bin/env node
/**
 * Lists marketing files using AutoLinkedTextClient and ranks routes by instance count.
 * Wrap high-count routes in AutoLinkPageShell (see packages/blog-core).
 *
 * Usage: node scripts/audit-auto-link-client-usage.mjs [--min 10]
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const APPS_DIR = path.join(ROOT, "apps");
const MIN = Number(process.argv.find((a, i) => process.argv[i - 1] === "--min") ?? "5");

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "readdy-export") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function rel(p) {
  return path.relative(ROOT, p);
}

async function main() {
  const apps = await readdir(APPS_DIR, { withFileTypes: true });
  const rows = [];

  for (const app of apps) {
    if (!app.isDirectory()) continue;
    const srcDir = path.join(APPS_DIR, app.name, "src");
    const files = await walk(srcDir);

    for (const file of files) {
      const content = await readFile(file, "utf8");
      if (!content.includes("AutoLinkedTextClient")) continue;
      const count = (content.match(/AutoLinkedTextClient/g) ?? []).length;
      if (count === 0) continue;
      const hasShell = content.includes("AutoLinkPageShell");
      rows.push({
        app: app.name,
        file: rel(file),
        count,
        hasShell,
      });
    }
  }

  rows.sort((a, b) => b.count - a.count);

  console.log(`AutoLinkedTextClient usage (min display: ${MIN} per file)\n`);
  console.log("COUNT  APP                          FILE");
  console.log("-----  ---                          ----");

  for (const row of rows) {
    if (row.count < MIN) continue;
    const shell = row.hasShell ? " [shell in file]" : "";
    console.log(
      `${String(row.count).padStart(5)}  ${row.app.padEnd(28)} ${row.file}${shell}`,
    );
  }

  const hot = rows.filter((r) => r.count >= MIN);
  const wrappedAppPages = await findWrappedRoutes();

  console.log("\nRoutes already wrapped with AutoLinkPageShell:");
  if (wrappedAppPages.length === 0) {
    console.log("  (none found in app/**/page.tsx)");
  } else {
    for (const r of wrappedAppPages) {
      console.log(`  ${r.app}: ${r.route} (${rel(r.file)})`);
    }
  }

  console.log("\nSuggested next wraps (top files without shell in same app route):");
  const seen = new Set(wrappedAppPages.map((r) => `${r.app}:${r.route}`));
  for (const row of hot.slice(0, 15)) {
    if (row.file.includes("AutoLinkPageShell")) continue;
    console.log(`  ${row.app} — ${row.count}× in ${row.file}`);
  }

  console.log(
    `\nTotal files with AutoLinkedTextClient: ${rows.length} (${rows.reduce((s, r) => s + r.count, 0)} instances)`,
  );
}

async function findWrappedRoutes() {
  const apps = await readdir(APPS_DIR, { withFileTypes: true });
  const found = [];

  for (const app of apps) {
    if (!app.isDirectory()) continue;
    const appDir = path.join(APPS_DIR, app.name, "src", "app");
    const pages = await walk(appDir);
    for (const file of pages) {
      if (!file.endsWith(`${path.sep}page.tsx`) && !file.endsWith("/page.tsx")) continue;
      const content = await readFile(file, "utf8");
      if (!content.includes("AutoLinkPageShell")) continue;
      const routeMatch = content.match(/routePath=["']([^"']+)["']/);
      const route = routeMatch?.[1] ?? "(unknown routePath)";
      found.push({ app: app.name, route, file });
    }
  }
  return found;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
