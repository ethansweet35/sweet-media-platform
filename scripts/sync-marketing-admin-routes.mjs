#!/usr/bin/env node
/**
 * Copy marketing reporting admin routes + page from client-template into every client app.
 * Idempotent — skips files that already exist unless --force.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const TEMPLATE = join(REPO_ROOT, "apps/client-template/src");
const force = process.argv.includes("--force");

const ROUTE_FILES = [
  "app/api/admin/ingest-metrics/route.ts",
  "app/api/admin/marketing-overview/route.ts",
  "app/api/admin/report-shares/route.ts",
  "app/api/admin/report-shares/[id]/route.ts",
];

const PAGE_FILES = [
  { rel: "app/admin/reporting/page.tsx", content: `import AdminReportingView from "@/views/admin/reporting/page";

export const dynamic = "force-dynamic";

export default AdminReportingView;
` },
  {
    rel: "views/admin/reporting/page.tsx",
    content: `import { AdminReportingPage } from "@sweetmedia/admin-core";

export default AdminReportingPage;
`,
  },
];

function listAppSlugs() {
  return readdirSync(join(REPO_ROOT, "apps"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "client-template")
    .map((d) => d.name)
    .sort();
}

function writeIfNeeded(dest, content) {
  if (existsSync(dest) && !force) return false;
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content, "utf8");
  return true;
}

let written = 0;
for (const slug of listAppSlugs()) {
  const appSrc = join(REPO_ROOT, "apps", slug, "src");
  if (!existsSync(appSrc)) continue;

  for (const rel of ROUTE_FILES) {
    const src = join(TEMPLATE, rel);
    const dest = join(appSrc, rel);
    if (!existsSync(src)) {
      console.warn(`missing template: ${rel}`);
      continue;
    }
    if (writeIfNeeded(dest, readFileSync(src, "utf8"))) {
      console.log(`+ ${slug}/${rel}`);
      written++;
    }
  }

  for (const { rel, content } of PAGE_FILES) {
    const dest = join(appSrc, rel);
    if (writeIfNeeded(dest, content)) {
      console.log(`+ ${slug}/${rel}`);
      written++;
    }
  }
}

console.log(`Done. ${written} file(s) written${force ? " (force)" : ""}.`);
