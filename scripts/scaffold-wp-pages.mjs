#!/usr/bin/env node
/**
 * Sweet Media — WordPress Page Scaffolder
 *
 * Reads migration-report-[site-id].json and generates:
 *   - apps/[app-slug]/src/app/[route]/page.tsx  (App Router route with metadata)
 *   - apps/[app-slug]/src/views/[page]/page.tsx  (view stub with WP content as reference)
 *
 * Run AFTER migrate-wordpress-content.mjs and AFTER copying apps/client-template.
 *
 * Usage:
 *   node scripts/scaffold-wp-pages.mjs \
 *     --site-id    brand-slug \
 *     --app-slug   brand-slug
 *
 * Optional:
 *   --dry-run     Print what would be created without writing files
 *   --overwrite   Overwrite existing files (default: skip if file already exists)
 *   --skip        Comma-separated slugs to skip (e.g. --skip home,sample-page)
 *
 * The generated view stubs contain the original WP HTML as a JSX comment so you can
 * reference the content structure without leaving your editor.
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT  = join(__dirname, '..');

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }
function info(msg) { console.log(`    ${msg}`); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
function hasFlag(flag) { return process.argv.includes(flag); }

function slugToComponentName(slug) {
  return slug
    .split(/[-_\s]+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function slugToTitle(slug) {
  return slug
    .split(/[-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Determine the Next.js App Router directory path from a WP page slug.
 * e.g. "about-us" → "about-us", "home" → "" (root)
 */
function routeToAppDir(suggestedRoute) {
  if (suggestedRoute === '/') return '';
  return suggestedRoute.replace(/^\//, '').replace(/\/$/, '');
}

/** Generate the App Router page.tsx content */
function genRoutePage(title, slug, route, componentName, appSlug) {
  const isHome = route === '/';
  const routePath = isHome ? '/' : `/${slug}`;
  const viewImportPath = isHome
    ? `@/views/home/page`
    : `@/views/${slug}/page`;
  const viewComponentName = isHome ? 'HomePage' : `${componentName}Page`;

  return `import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ${viewComponentName} from "${viewImportPath}";

const fallbackMetadata: Metadata = {
  title: "${title} | ${slugToTitle(appSlug)}",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("${routePath}", fallbackMetadata);
}

export default function Page() {
  return <${viewComponentName} />;
}
`;
}

/** Generate the view stub page.tsx content */
function genViewPage(title, slug, componentName, wordCount, excerpt, rawHtml) {
  const isHome = slug === 'home' || slug === '';
  const viewComponentName = isHome ? 'HomePage' : `${componentName}Page`;

  // Truncate WP HTML for the reference comment (cap at 4000 chars to avoid huge files)
  const htmlRef = rawHtml
    ? rawHtml.substring(0, 4000).replace(/\*\//g, '* /') + (rawHtml.length > 4000 ? '\n... (truncated)' : '')
    : '(no content)';

  return `/*
 * ${title}
 * Word count: ~${wordCount} words
 * Excerpt: ${excerpt || '(none)'}
 *
 * Track B build instructions:
 * 1. Use the WP HTML reference below to understand the page structure
 * 2. Replace this stub with brand-specific Next.js components
 * 3. Apply the approved design token CSS variables throughout
 * 4. Follow new-brand-prototype Phase 6.5 section composition plan
 * 5. Mark buildStatus "complete" in migration-report-*.json when done
 *
 * --- WP HTML Reference (for content/structure reference only) ---
${htmlRef.split('\n').map(l => ` * ${l}`).join('\n')}
 * ---
 */

export default function ${viewComponentName}() {
  return (
    <main className="min-h-screen">
      {/* TODO: Build ${title} page — reference WP HTML in the comment above */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight">
          ${title}
        </h1>
        <p className="text-lg text-slate-600">
          {/* Replace with brand-specific content and layout */}
          Approximately ${wordCount} words of content to migrate.
        </p>
      </section>
    </main>
  );
}
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🏗️   Sweet Media — WordPress Page Scaffolder\n');

  const siteId    = getArg('--site-id');
  const appSlug   = getArg('--app-slug') || siteId;
  const dryRun    = hasFlag('--dry-run');
  const overwrite = hasFlag('--overwrite');
  const skipSlugs = new Set((getArg('--skip') || '').split(',').filter(Boolean));

  if (!siteId)  die('--site-id is required');
  if (!appSlug) die('--app-slug is required');

  const reportPath = join(REPO_ROOT, `migration-report-${siteId}.json`);
  if (!existsSync(reportPath)) {
    die(`migration-report-${siteId}.json not found.\nRun migrate-wordpress-content.mjs first.`);
  }

  const report = JSON.parse(readFileSync(reportPath, 'utf8'));
  const appDir = join(REPO_ROOT, 'apps', appSlug);

  if (!existsSync(appDir)) {
    die(`apps/${appSlug} does not exist.\nCopy apps/client-template → apps/${appSlug} first.`);
  }

  const { buildChecklist, pageContents } = report;
  const contentMap = new Map((pageContents || []).map(p => [p.slug, p.rawHtml]));

  if (dryRun) warn('DRY RUN — no files will be written');

  step(`Scaffolding ${buildChecklist.length} pages for apps/${appSlug}`);

  let created = 0;
  let skipped = 0;
  let existing = 0;

  for (const page of buildChecklist) {
    const { title, slug, suggestedRoute, wordCount, excerpt } = page;

    if (skipSlugs.has(slug)) {
      info(`SKIP  "${title}" (--skip list)`);
      skipped++;
      continue;
    }

    // Skip WP boilerplate pages
    if (['sample-page', 'privacy-policy'].includes(slug)) {
      info(`SKIP  "${title}" (WP default page)`);
      skipped++;
      continue;
    }

    const componentName = slugToComponentName(slug === 'home' ? 'Home' : slug);
    const routeDir = routeToAppDir(suggestedRoute);
    const rawHtml  = contentMap.get(slug) || '';

    // ── App Router route file ──────────────────────────────────────────────
    const routeFilePath = routeDir
      ? join(appDir, 'src', 'app', routeDir, 'page.tsx')
      : join(appDir, 'src', 'app', 'page.tsx');

    const routeFileDir = routeDir
      ? join(appDir, 'src', 'app', routeDir)
      : join(appDir, 'src', 'app');

    // ── View stub file ─────────────────────────────────────────────────────
    const viewDir  = slug === 'home' || suggestedRoute === '/'
      ? join(appDir, 'src', 'views', 'home')
      : join(appDir, 'src', 'views', slug);
    const viewFilePath = join(viewDir, 'page.tsx');

    // Check if files already exist
    const routeExists = existsSync(routeFilePath);
    const viewExists  = existsSync(viewFilePath);

    if ((routeExists || viewExists) && !overwrite) {
      info(`EXISTS "${title}" — skipping (use --overwrite to replace)`);
      existing++;
      continue;
    }

    // Generate content
    const routeContent = genRoutePage(title, slug, suggestedRoute, componentName, appSlug);
    const viewContent  = genViewPage(title, slug, componentName, wordCount, excerpt, rawHtml);

    if (!dryRun) {
      mkdirSync(routeFileDir, { recursive: true });
      mkdirSync(viewDir, { recursive: true });
      writeFileSync(routeFilePath, routeContent, 'utf8');
      writeFileSync(viewFilePath, viewContent, 'utf8');
    }

    const status = dryRun ? 'DRY ' : routeExists ? 'OVWR' : 'NEW ';
    info(`${status}  "${title}" → src/app/${routeDir || '(root)'}/page.tsx + src/views/${slug === 'home' || suggestedRoute === '/' ? 'home' : slug}/page.tsx`);
    created++;
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Scaffolding complete${dryRun ? ' (DRY RUN)' : ''}!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages scaffolded : ${created}
Already existed  : ${existing}
Skipped          : ${skipped}

─── Next steps ──────────────────────────────────────

1. Open apps/${appSlug}/src/views/ — each stub has WP HTML as a reference comment
2. Build each view using the approved design tokens from your design token sheet
3. Run pnpm --filter @sweetmedia/${appSlug} dev to preview
4. Follow new-brand-prototype phases 6.5 and 7 for section composition
5. When a page is complete, update its buildStatus in migration-report-${siteId}.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => { console.error(err); process.exit(1); });
