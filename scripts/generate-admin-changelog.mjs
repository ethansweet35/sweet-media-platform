#!/usr/bin/env node
/**
 * Generate admin "What's New" entries from git history (packages/admin-core).
 *
 * Runs automatically on app prebuild / root build & dev so the dashboard feed
 * stays current without hand-editing adminChangelog.ts.
 *
 * Usage: node scripts/generate-admin-changelog.mjs [--days 90] [--max 16]
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_FILE = join(REPO_ROOT, "packages/admin-core/src/lib/adminChangelog.generated.ts");
const ENRICHMENTS_FILE = join(REPO_ROOT, "packages/admin-core/src/lib/adminChangelog.enrichments.json");

const MS_PER_DAY = 86_400_000;

function getArg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const LOOKBACK_DAYS = Number(getArg("--days", "90"));
const MAX_ENTRIES = Number(getArg("--max", "16"));

/** Skip internal / non-user-facing commits. */
const EXCLUDE_SUBJECT = [
  /^Merge /i,
  /^chore(\(|:)/i,
  /^perf(\(|:)/i,
  /TypeScript build error/i,
  /DeferredAnalyticsWrapper/i,
  /resolve build/i,
  /^Revert /i,
];

const ROUTE_HINTS = [
  [/marketing report|reporting admin|report-shares|ingest-metrics/i, { href: "/admin/reporting", hrefLabel: "Marketing Report" }],
  [/content editor/i, { href: "/admin/content-editor", hrefLabel: "Content Editor" }],
  [/blog planner/i, { href: "/admin/blog-planner", hrefLabel: "Blog Planner" }],
  [/forgot password|reset password|password reset/i, { href: "/admin/login", hrefLabel: "Admin login" }],
  [/user management|admin users/i, { href: "/admin/users", hrefLabel: "User Management" }],
  [/search console|\bgsc\b/i, { href: "/admin/search-console", hrefLabel: "Search Console" }],
  [/inline (page )?edit|page editor/i, { href: "/admin/pages", hrefLabel: "Pages" }],
  [/dashboard|performance tab/i, { href: "/admin", hrefLabel: "Dashboard" }],
  [/blog writer/i, { href: "/admin/blog-writer", hrefLabel: "Blog Writer" }],
  [/blog post|blog queue|blog edit/i, { href: "/admin/blogs", hrefLabel: "Blog Posts" }],
  [/keyword research|semrush suggest/i, { href: "/admin/keyword-research", hrefLabel: "Keyword Research" }],
  [/link health|internal link|content link/i, { href: "/admin/link-health", hrefLabel: "Link Health" }],
  [/indexing status|google indexing/i, { href: "/admin/indexing-status", hrefLabel: "Indexing Status" }],
  [/sitemap/i, { href: "/admin/sitemap", hrefLabel: "Sitemap" }],
  [/brand settings/i, { href: "/admin/brand-settings", hrefLabel: "Brand Settings" }],
  [/content calendar|blog queue/i, { href: "/admin/content-calendar", hrefLabel: "Content Calendar" }],
  [/knowledge base/i, { href: "/admin/knowledge-base", hrefLabel: "Knowledge Base" }],
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function parseCategory(subject) {
  const s = subject.trim();
  if (/^fix(\(|:)/i.test(s)) return "fix";
  if (/^feat(\(|:)/i.test(s) || /\badd\b/i.test(s)) return "new";
  if (/^improve|^enhance|^redesign|^wire\b|^roll out|^share\b|^enable\b/i.test(s)) return "new";
  return "improved";
}

function cleanSubject(subject) {
  let s = subject.trim();
  // Conventional commit prefix: feat(admin): Title
  s = s.replace(/^(feat|fix|perf|chore|docs|refactor|improve|enhance)(\([^)]+\))?:\s*/i, "");
  // Scoped without type: admin: Title
  s = s.replace(/^admin(-core)?:\s*/i, "");
  if (s.length > 0) s = s.charAt(0).toUpperCase() + s.slice(1);
  // Keep dashboard titles scannable
  if (s.length > 96) s = `${s.slice(0, 93).trim()}…`;
  return s;
}

function routeHint(subject) {
  for (const [re, link] of ROUTE_HINTS) {
    if (re.test(subject)) return link;
  }
  return null;
}

function shouldExclude(subject) {
  return EXCLUDE_SUBJECT.some((re) => re.test(subject));
}

function loadEnrichments() {
  if (!existsSync(ENRICHMENTS_FILE)) return {};
  try {
    return JSON.parse(readFileSync(ENRICHMENTS_FILE, "utf8"));
  } catch {
    return {};
  }
}

function gitLog() {
  try {
    const since = new Date(Date.now() - LOOKBACK_DAYS * MS_PER_DAY).toISOString().slice(0, 10);
    const raw = execSync(
      `git log --format='%H|%ad|%s' --date=short --since=${since} -- packages/admin-core`,
      { cwd: REPO_ROOT, encoding: "utf8", maxBuffer: 4 * 1024 * 1024 },
    );
    return raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, date, ...rest] = line.split("|");
        return { hash: hash.slice(0, 8), date, subject: rest.join("|") };
      });
  } catch {
    return [];
  }
}

function mergeEnrichment(entry, enrichments) {
  const exact = enrichments[entry.id];
  if (exact) return { ...entry, ...exact };
  for (const [key, val] of Object.entries(enrichments)) {
    if (entry.id.startsWith(key)) return { ...entry, ...val };
  }
  return entry;
}

function buildEntries() {
  const enrichments = loadEnrichments();
  const seenIds = new Set();
  const seenTopics = new Set();
  const entries = [];

  for (const { hash, date, subject } of gitLog()) {
    if (shouldExclude(subject)) continue;
    const title = cleanSubject(subject);
    if (!title || title.length < 8) continue;

    const link = routeHint(subject);
    const topicKey = link?.href ? `${date}:${link.href}` : `${date}:${slugify(title.split(/\s+/).slice(0, 4).join(" "))}`;
    if (seenTopics.has(topicKey)) continue;
    seenTopics.add(topicKey);

    const id = `${date}-${slugify(title)}`;
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const entry = {
      id,
      date,
      category: parseCategory(subject),
      title,
      summary: subject.endsWith(".") ? subject : `${subject}.`,
      ...(link ?? {}),
    };

    entries.push(mergeEnrichment(entry, enrichments));
    if (entries.length >= MAX_ENTRIES) break;
  }

  return entries;
}

function emit(entries) {
  const body = JSON.stringify(entries, null, 2)
    .replace(/"category": "new"/g, '"category": "new" as const')
    .replace(/"category": "fix"/g, '"category": "fix" as const')
    .replace(/"category": "improved"/g, '"category": "improved" as const');

  // Fix the `as const` in JSON - actually use proper TS generation instead
  const lines = entries.map((e) => {
    const parts = [
      `    id: ${JSON.stringify(e.id)},`,
      `    date: ${JSON.stringify(e.date)},`,
      `    category: ${JSON.stringify(e.category)},`,
      `    title: ${JSON.stringify(e.title)},`,
      `    summary: ${JSON.stringify(e.summary)},`,
    ];
    if (e.href) parts.push(`    href: ${JSON.stringify(e.href)},`);
    if (e.hrefLabel) parts.push(`    hrefLabel: ${JSON.stringify(e.hrefLabel)},`);
    if (e.tips?.length) {
      parts.push(`    tips: [${e.tips.map((t) => JSON.stringify(t)).join(", ")}],`);
    }
    return `  {\n${parts.join("\n")}\n  }`;
  });

  const ts = `/**
 * AUTO-GENERATED by scripts/generate-admin-changelog.mjs — do not edit.
 * Regenerated on every app prebuild and \`pnpm dev\` / \`pnpm build\`.
 * Optional enrichments: packages/admin-core/src/lib/adminChangelog.enrichments.json
 */
import type { AdminChangelogEntry } from "./adminChangelog";

export const ADMIN_CHANGELOG_GENERATED: AdminChangelogEntry[] = [
${lines.join(",\n")}
];
`;

  writeFileSync(OUT_FILE, ts, "utf8");
  return entries.length;
}

const count = emit(buildEntries());
console.log(`[generate-admin-changelog] Wrote ${count} entries → ${OUT_FILE.replace(REPO_ROOT + "/", "")}`);
