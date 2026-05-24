#!/usr/bin/env node
/**
 * Copy inline page-editor API routes from client-template to every client app
 * and ensure PageEditorProvider is mounted in the root layout.
 */
import { cpSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const templateApp = join(root, "apps/client-template");
const routeNames = [
  "save-draft",
  "publish",
  "discard",
  "upload-image",
  "seo-context",
];

const clientApps = [
  "client-template",
  "northbound-treatment",
  "inner-peak-colorado",
  "cipher-billing",
  "sweet-media",
  "addiction-interventions",
  "rize-oc",
  "simple-health",
  "mountainview-treatment",
  "sullivan-recovery",
  "adolescent-mental-health",
  "the-family-recovery-foundation",
  "an-invite-to-life",
];

function copyRoutes(slug) {
  const destBase = join(root, "apps", slug, "src/app/api/admin/page-content");
  for (const name of routeNames) {
    const src = join(templateApp, "src/app/api/admin/page-content", name, "route.ts");
    if (!existsSync(src)) {
      console.warn(`skip missing template route: ${name}`);
      continue;
    }
    const destDir = join(destBase, name);
    const dest = join(destDir, "route.ts");
    if (src === dest) continue;
    cpSync(src, dest);
    console.log(`  ${slug}: page-content/${name}`);
  }
}

function ensurePageEditorProvider(slug) {
  const layoutPath = join(root, "apps", slug, "src/app/layout.tsx");
  if (!existsSync(layoutPath)) {
    console.warn(`  ${slug}: no src/app/layout.tsx`);
    return;
  }
  let src = readFileSync(layoutPath, "utf8");
  if (src.includes("PageEditorProvider")) {
    console.log(`  ${slug}: layout already has PageEditorProvider`);
    return;
  }
  if (!src.includes("PageEditorProvider")) {
    const importMatch = src.match(/import \{([^}]+)\} from "@sweetmedia\/admin-core";/);
    if (importMatch) {
      const names = importMatch[1].trim();
      if (!names.includes("PageEditorProvider")) {
        src = src.replace(
          importMatch[0],
          `import { ${names}, PageEditorProvider } from "@sweetmedia/admin-core";`,
        );
      }
    } else {
      src = `import { PageEditorProvider } from "@sweetmedia/admin-core";\n${src}`;
    }
  }

  // Wrap first {children} inside <body> (single-child pattern).
  if (src.includes("{children}") && !src.includes("<PageEditorProvider>")) {
    src = src.replace(
      /(<body[^>]*>\s*)([\s\S]*?)(\s*<\/body>)/,
      (full, open, body, close) => {
        if (body.includes("<PageEditorProvider>")) return full;
        const trimmed = body.trim();
        if (!trimmed) return full;
        return `${open}<PageEditorProvider>\n          ${trimmed}\n        </PageEditorProvider>${close}`;
      },
    );
  }

  writeFileSync(layoutPath, src);
  console.log(`  ${slug}: added PageEditorProvider to layout`);
}

for (const slug of clientApps) {
  const appDir = join(root, "apps", slug);
  if (!existsSync(appDir)) {
    console.warn(`skip missing app: ${slug}`);
    continue;
  }
  console.log(`\n${slug}:`);
  copyRoutes(slug);
  ensurePageEditorProvider(slug);
}

console.log("\nDone.");
