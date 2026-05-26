#!/usr/bin/env node
/**
 * scripts/wrap-prose-with-autolink.mjs
 *
 * Codemod: wraps body-text <p> tags in view files with <AutoLinkedText>
 * so prose is auto-linked at render time using the internal_links table.
 *
 * Wraps:
 *   <p ATTRS>plain text</p>
 *   <p ATTRS>{simpleIdent}</p>           (e.g. {v.body}, {section.text})
 *
 * Skips:
 *   <p>...mixed JSX content...</p>       (any '<' inside body → mixed)
 *   <p>{conditional ? a : b}</p>         (multiple expressions / non-simple)
 *   "use client" files                   (AutoLinkedText is async server)
 *   admin/*, blog/*, chrome files        (not marketing prose)
 *
 * Usage:
 *   node scripts/wrap-prose-with-autolink.mjs apps/<slug>          # live
 *   node scripts/wrap-prose-with-autolink.mjs apps/<slug> --dry    # preview
 */

import { readFileSync, writeFileSync, statSync, existsSync } from "fs";
import { resolve, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const targetArg = args.find((a) => !a.startsWith("--"));

if (!targetArg) {
  console.error("Usage: node scripts/wrap-prose-with-autolink.mjs apps/<slug> [--dry]");
  process.exit(1);
}

const APP_ROOT = resolve(REPO_ROOT, targetArg);
try {
  if (!statSync(APP_ROOT).isDirectory()) throw new Error("not a dir");
} catch {
  console.error(`Not a directory: ${APP_ROOT}`);
  process.exit(1);
}

const VIEWS_ROOT = resolve(APP_ROOT, "src/views");

// ── Walk view files ────────────────────────────────────────────────────────

const SKIP_DIR_RE = /\/(admin|blog|home\/chrome)(\/|$)/;

async function walk(dir) {
  const { readdirSync } = await import("fs");
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = resolve(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIR_RE.test("/" + relative(VIEWS_ROOT, full))) continue;
      files.push(...(await walk(full)));
    } else if (e.isFile() && e.name.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

// ── Codemod logic ──────────────────────────────────────────────────────────

const IMPORT_LINE_SERVER = `import { AutoLinkedText } from "@sweetmedia/blog-core";`;
const IMPORT_LINE_CLIENT = `import { AutoLinkedTextClient } from "@sweetmedia/blog-core";`;

// Single curly expression that's safe to wrap. Allows:
//   {v.body}, {section.text}, {post.excerpt}, {item}, {item?.label}
//   Optional chaining + dotted/bracket access; no operators, no JSX.
const SIMPLE_CURLY_RE =
  /^\s*\{\s*([a-zA-Z_$][\w$]*(?:\??\.[a-zA-Z_$][\w$]*|\[(?:"[^"]*"|'[^']*'|\d+)\])*)\s*\}\s*$/;

const P_RE = /<p\b([^>]*)>([\s\S]*?)<\/p>/g;

function classifyBody(body) {
  const trimmed = body.trim();
  if (trimmed.length === 0) return "empty";

  // Anything looking like JSX or HTML inside → mixed; skip.
  // (Includes nested elements, line-break tags, italic spans, etc.)
  if (/<[a-zA-Z/]/.test(body)) return "mixed";

  // Single safe curly expression → wrap as expression child.
  if (body.includes("{") || body.includes("}")) {
    return SIMPLE_CURLY_RE.test(body) ? "curly" : "complex";
  }

  // Pure text — must have at least 20 chars of substance to be worth linking.
  // Filters out things like <p>—</p>, <p>4.6/5</p>, button-like single phrases.
  if (trimmed.length < 20) return "tooShort";

  return "text";
}

function wrapBody(body, kind, tag) {
  if (kind === "text") {
    // Preserve original whitespace/newlines around text.
    const leading = body.match(/^\s*/)[0];
    const trailing = body.match(/\s*$/)[0];
    const core = body.slice(leading.length, body.length - trailing.length);
    return `${leading}<${tag}>{${JSON.stringify(core)}}</${tag}>${trailing}`;
  }
  if (kind === "curly") {
    return `<${tag}>${body.trim()}</${tag}>`;
  }
  return body;
}

function processFile(file) {
  const original = readFileSync(file, "utf-8");

  // Detect client vs server: client files use AutoLinkedTextClient.
  const isClient = /^["']use client["'];?/m.test(original);
  const tag = isClient ? "AutoLinkedTextClient" : "AutoLinkedText";
  const importLine = isClient ? IMPORT_LINE_CLIENT : IMPORT_LINE_SERVER;

  let changed = false;
  let stats = { wrapped: 0, skippedMixed: 0, skippedShort: 0, skippedComplex: 0 };

  const updated = original.replace(P_RE, (full, attrs, body) => {
    // Don't double-wrap (either variant)
    if (body.includes("<AutoLinkedText")) return full;

    const kind = classifyBody(body);
    if (kind === "text" || kind === "curly") {
      changed = true;
      stats.wrapped++;
      return `<p${attrs}>${wrapBody(body, kind, tag)}</p>`;
    }
    if (kind === "mixed") stats.skippedMixed++;
    else if (kind === "tooShort") stats.skippedShort++;
    else if (kind === "complex") stats.skippedComplex++;
    return full;
  });

  if (!changed) return { skipped: "no matches", stats };

  // Add import if missing
  let withImport = updated;
  const existingBlogCoreImport = updated.match(
    /import\s+\{([^}]*)\}\s+from\s+["']@sweetmedia\/blog-core["'];?/
  );

  if (!existingBlogCoreImport) {
    // Insert after the first complete import statement (handles multi-line import blocks).
    const importEnd = updated.match(/^import[\s\S]*?;\n/m);
    if (importEnd) {
      const endIdx = importEnd.index + importEnd[0].length;
      withImport = updated.slice(0, endIdx) + importLine + "\n" + updated.slice(endIdx);
    } else {
      withImport = `${importLine}\n${updated}`;
    }
  } else if (!new RegExp(`\\b${tag}\\b`).test(existingBlogCoreImport[0])) {
    // Existing blog-core import without our tag — append.
    withImport = updated.replace(
      /import\s+\{([^}]*)\}\s+from\s+["']@sweetmedia\/blog-core["'];?/,
      (m, inner) => {
        const names = inner
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (!names.includes(tag)) names.push(tag);
        return `import { ${names.join(", ")} } from "@sweetmedia/blog-core";`;
      }
    );
  }

  if (!DRY) writeFileSync(file, withImport);
  return { changed: true, stats };
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const files = await walk(VIEWS_ROOT);
  const homePage = resolve(APP_ROOT, "src/app/page.tsx");
  if (existsSync(homePage) && !files.includes(homePage)) {
    files.push(homePage);
  }
  console.log(
    `\n${DRY ? "[DRY RUN] " : ""}Wrapping prose in ${files.length} view files under ${relative(REPO_ROOT, VIEWS_ROOT)}\n`
  );

  let touched = 0;
  let totalWrapped = 0;
  let totalSkipped = 0;
  let totalShort = 0;
  let totalMixed = 0;
  let totalComplex = 0;

  for (const f of files) {
    const result = processFile(f);
    if (result.skipped === "use client") {
      // silent
      continue;
    }
    if (result.changed) {
      touched++;
      totalWrapped += result.stats.wrapped;
      totalShort += result.stats.skippedShort;
      totalMixed += result.stats.skippedMixed;
      totalComplex += result.stats.skippedComplex;
      console.log(
        `  ✓ ${relative(REPO_ROOT, f).padEnd(70)}  +${result.stats.wrapped}`
      );
    } else if (result.stats) {
      totalShort += result.stats.skippedShort;
      totalMixed += result.stats.skippedMixed;
      totalComplex += result.stats.skippedComplex;
    }
    totalSkipped += result.stats?.skippedMixed ?? 0;
  }

  console.log(
    `\n${touched} files modified, ${totalWrapped} <p> tags wrapped`
  );
  console.log(
    `Skipped: ${totalShort} too-short, ${totalMixed} mixed-JSX, ${totalComplex} complex-expression`
  );
  if (DRY) console.log("\nDry run — no files written.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
