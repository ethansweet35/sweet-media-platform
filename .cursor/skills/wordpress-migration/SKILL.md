---
name: wordpress-migration
description: Step-by-step workflow for migrating a WordPress/Elementor site to a Next.js client app on this platform. Use when the user says "migrate from WordPress", "WP migration", "move off WordPress", "migrate this site", or is transitioning a client away from WordPress. Covers visual audit, design token extraction, content migration, Elementor bridge pages (raw HTML + vendor CSS strategy), native page rebuilds, image upload workflow, and post-migration cleanup. Read and follow this entire file before beginning any migration work.
---

# WordPress to Next.js Migration Skill

Use this skill whenever the user asks to migrate a WordPress/Elementor site to a new client app on this platform, or says "migrate from WordPress", "WP migration", "move off WordPress", etc.

Read this entire file before starting any migration work.

---

## Overview

The migration converts a live WordPress/Elementor site into a Next.js app scaffolded from `apps/client-template`. Complex Elementor pages get a **bridge render** (raw HTML + vendor CSS) while simpler pages are rebuilt natively in React/Tailwind. The bridge pages can be replaced with native rebuilds incrementally after launch.

---

## Phase 1 — Audit the Live WordPress Site

### 1a. Recommended script order

Run in this order to avoid dependency issues:

```bash
# Step 1 — extract design tokens (no Supabase required)
node scripts/extract-wp-design-tokens.mjs --url https://client-site.com

# Step 2 — dry-run content inventory (no Supabase required, produces report for screenshot sampling)
node scripts/migrate-wordpress-content.mjs --url https://client-site.com --site-id <slug> --dry-run

# Step 3 — visual audit using the page list from the report (optional but useful)
node scripts/visual-audit-wp.mjs --url https://client-site.com --out ./wp-screenshots/<slug>/
```

This order matters: `visual-audit-wp.mjs` benefits from knowing which pages exist, and the dry-run report provides that list without needing a Supabase connection. For large sites, use explicit `--pages` sampling rather than auditing all 70+ pages.

**Playwright / Chromium arch issue (Apple Silicon):** If the visual audit fails to launch a browser, the installed Playwright browser bundle may be the wrong CPU arch (x64 vs arm64). Fix with `npx playwright install` or switch to the correct Chromium channel. The audit is optional — if tokens + selective HTML/CSS inspection already give you enough context, skip it.

This outputs:
- `wp-screenshots/<slug>/` — per-page Playwright screenshots
- `design-tokens-<slug>-computed.json` — computed Elementor CSS variables (colors, fonts, spacing)
- `design-tokens-<slug>.com.json` — raw extracted token source

**These are reference-only artifacts. Delete them after Phase 3.**

### 1b. Extract design system from tokens

Open the token JSONs and identify:
- **Font stack**: heading font + body font (usually Google Fonts or Adobe Typekit)
- **Color palette**: primary, secondary, accent, text, background
- **Border radius, spacing, shadow scales**

**Important:** Token JSONs often include many globals that are unused on the visible site. Always cross-check extracted tokens against the live homepage's computed CSS (DevTools → Elements → Computed) before wiring them into Tailwind. Only include values you can confirm are visually active.

Map these to Tailwind CSS variables in the new app's `globals.css`:
```css
@layer base {
  :root {
    --font-heading: "Marcellus", serif;
    --font-body: "Montserrat", sans-serif;
    --color-primary: #1a2e4a;
    /* etc. */
  }
}
```

And set up fonts in `src/app/layout.tsx` via `next/font/google`.

**Font strategy note:** Initial token extraction will identify the WP/Elementor font stack. Mirror it exactly in `next/font/google` for launch parity. If a design system refactor later shifts to different fonts (e.g. a brand rule update), update `layout.tsx` and CSS variables deliberately — don't carry over WP fonts indefinitely.

---

## Phase 2 — Scaffold the New Client App

If not already done, run the full provisioning:
```bash
pnpm new-client --slug <slug> --name "Brand Name" --url https://brand.com --admin-email admin@brand.com
```

Or just scaffold without provisioning a new Supabase project:
```bash
pnpm scaffold-client --slug <slug> --name "Brand Name"
```

Update `next.config.ts` with the correct Supabase `remotePatterns` hostname.

### Operational gotchas

**pnpm install hang after scaffold:** If `pnpm install` hangs during workspace linking (e.g. "Resolving packages... [stuck]"), inspect running pnpm/node child PIDs and kill them. Retry from repo root with `pnpm install --prefer-offline`. Avoid running in environments where `CI=true` combined with a fresh `node_modules` recreate causes prompt conflicts.

**Supabase Auth user creation 500:** The `setup-new-client` script creates an initial admin Auth user. This can transiently fail with a 500 error immediately after project creation while Supabase is still warming up. Wait 30–60 seconds and retry. If the `admin_users` table row exists but the Auth user was not created, create the user manually via the Supabase Dashboard → Authentication → Users.

**Default admin password:** `setup-new-client` provisions the initial admin with the password `ChangeMe123!`. Force a password reset immediately via the Supabase Dashboard → Authentication → Users → Send Reset Email. Do not rely on CLI for password changes.

**`SUPABASE_SERVICE_ROLE_KEY` on Vercel:** The postbuild `sync-tracked-pages` script and admin API routes require this key. It must be set on the Vercel project — the scaffold writes `.env.local` locally but Vercel env vars still need to be set manually (or via Vercel API). Missing this key on Vercel will silently skip tracked page syncing and block admin API routes on production.

---

## Phase 3 — Pull WordPress Content

### 3a. Quick inventory (no Supabase required)

For large sites (hundreds of posts/pages), do a fast read-only inventory **before** running the full migration. This lets you scope the work, identify cruft, and review URL structure without committing anything.

```bash
node scripts/wp-quick-inventory.mjs --wp-url https://client-site.com
```

Writes `wp-inventory-<host>.json` with id/slug/title/path/categories for every post and page. Then analyze it:

```bash
node scripts/wp-analyze-inventory.mjs --in wp-inventory-<host>.json
```

Prints page counts grouped by URL prefix, suspicious slug patterns (`-2`, `-old`, `-lp`, `__trashed`), post date distribution by year, and top categories. Use this to decide:
- What pages are clearly cruft (LP-test pages, duplicates with `-2` suffix, old/staging pages)
- Whether to keep all blog posts or filter by traffic (Phase 3.5)
- Whether the URL hierarchy needs restructuring or should be preserved exactly

### 3b. Traffic-driven blog filtering (recommended for sites with > 200 posts)

Most WP sites accumulate years of low-value posts. To avoid migrating dead content, cross-reference the post inventory against Google Search Console traffic data and migrate only the posts that are ranking or recently published:

1. **Get a GSC export.** In Google Search Console → Performance → Pages → set range to "Last 12 months" → export → unzip. You want `Pages.csv`.

2. **Run the analyzer:**
   ```bash
   node scripts/wp-analyze-blog-rankings.mjs \
     --inventory wp-inventory-<host>.json \
     --gsc <path>/Pages.csv \
     --out apps/<slug>-migration/blog-analysis.csv \
     --keep-clicks 10 \
     --keep-impressions 1000 \
     --keep-since-year 2025
   ```

   Defaults: keep posts with ≥ 10 clicks; mark "review" for ≥ 1000 impressions or any clicks; drop the rest. `--keep-since-year` overrides the verdict for any post published in/after that year (protects fresh content that hasn't ranked yet). Output is a CSV with `decision` per post (`keep` / `review` / `drop`) plus a summary of SEO impact.

3. **Review the CSV** — sort by clicks, scan medium-confidence verdicts, override individual rows by editing the `decision` column. The migration script reads this CSV directly via `--keep-slugs`.

### 3c. Build a redirect map for dropped URLs

Whenever you drop content, every dropped URL needs a 301 redirect to a relevant destination — otherwise external backlinks 404, internal links inside kept content break, and SEO equity is lost.

```bash
node scripts/wp-build-redirect-map.mjs \
  --inventory wp-inventory-<host>.json \
  --analysis  apps/<slug>-migration/blog-analysis.csv \
  --keep-2025-plus \
  --out apps/<slug>-migration/redirect-map.csv
```

For each dropped URL, picks a destination via:
1. **Title-token Jaccard similarity** vs every kept post title (≥ 0.4 = high confidence)
2. **Same-category post** (preferred over cross-category match)
3. **Category landing page** fallback (`/blog/category/<slug>/`)
4. **Manual cruft mappings** — hardcode 13–25 known stale pages with explicit destinations directly in the script's `CRUFT_PAGE_REDIRECTS` constant

Output is a CSV that the user can scan and override before locking. The script's defaults handle 95% of cases automatically.

### 3d. Run the migration

The platform's `migrate-wordpress-content.mjs` supports filtering and link rewriting natively:

```bash
node scripts/migrate-wordpress-content.mjs \
  --wp-url https://client-site.com \
  --site-id <slug> \
  --supabase-ref <ref> \
  --supabase-key <service_role_key> \
  --keep-slugs   apps/<slug>-migration/blog-analysis.csv \
  --redirect-map apps/<slug>-migration/redirect-map.csv
```

The `--keep-slugs` flag accepts the analyzer's CSV directly (recognizes the `decision` column and skips `drop` rows). The `--redirect-map` flag activates an in-process markdown link rewriter — every internal link inside migrated post content that targets a dropped URL is rewritten to its mapped destination, so kept posts never link to 404s after migration.

The migration outputs `migration-report-<slug>.json` (move to `apps/<slug>-migration/migration-report.json` for organization). It contains every WP page's full HTML body — that's your reference material for native page rebuilds in Phase 6.

**URL preservation is on by default:** the script uses each WP page's actual URL pathname for `suggestedRoute` (e.g. `/about/code-of-ethics/` stays nested) instead of flattening to `/code-of-ethics/`. Combined with `trailingSlash: true` in `next.config.ts`, this preserves WP URL parity exactly.

**Slug collisions warning:** the platform's `scaffold-wp-pages.mjs` keys view directories by slug, not full path. Check for collisions before scaffolding:
```bash
node -e "const inv = require('./wp-inventory-<host>.json'); const counts = new Map(); for (const p of inv.pages) counts.set(p.slug, (counts.get(p.slug) || 0) + 1); for (const [s, n] of counts) if (n > 1) console.log(s, n);"
```
If collisions exist (common on sites with `/programs/detox/` AND `/treatment/methadone/detox/` both with slug `detox`), either rename pages in WP first OR patch the scaffolder to key by full route path.

### 3e. Generate `next.config.ts` redirects

After migration, generate the Next.js redirects file from the redirect map:

```bash
node scripts/wp-generate-redirects.mjs \
  --map apps/<slug>-migration/redirect-map.csv \
  --out apps/<slug>/src/lib/wp-redirects.ts
```

Then wire it into `next.config.ts`:
```ts
import { wpRedirects } from "./src/lib/wp-redirects";
const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() { return wpRedirects; },
  /* ...images config */
};
```

### 3f. Migrate inline images (blog content + page reference HTML)

The migration script uploads featured/hero images but inline images in post bodies and page HTML still point at the legacy WP domain. Use the dedicated migrator to fix both in one pass:

```bash
node scripts/wp-migrate-inline-images.mjs \
  --supabase-ref <ref> \
  --supabase-key <service_role_key> \
  --wp-host www.client-site.com \
  --report apps/<slug>-migration/migration-report.json \
  --concurrency 8
```

This script:
1. Loads all `blog_posts.content` from Supabase
2. Loads `migration-report.json`'s `pageContents[].rawHtml`
3. Extracts every unique WP image URL across both sources (handles markdown `![alt](url)`, HTML `<img src>`, `<img srcset>`, `<picture><source srcset>`, lightbox `<a href>` to image files, and inline `background-image: url()`)
4. Downloads + uploads each unique image to Supabase `site-assets/images/wp-inline/<year>/<month>/<filename>` (preserves WP date structure)
5. Patches every blog post body and the migration report's page HTML in-place with the new Supabase URLs

It's **idempotent** — re-running skips images already in storage. Concurrency 8 is polite to most WP servers; bump higher for fast sites or lower if you see rate-limit errors.

For content-heavy sites (multiple staff/facility/location pages), expect 1,000+ unique inline images — the page side typically dwarfs the blog side. Plan 5–15 minutes for this step on large migrations.

After this pass, you can remove the WP domain hostnames from `next.config.ts` `remotePatterns` (gravatar.com may still be needed if WP author avatars survived).

---

## Phase 4 — Classify Each Page

Go through every scaffolded route and decide:

| Type | Criteria | Strategy |
|---|---|---|
| **Rebuild natively** | Mostly text/images, standard layout (hero + sections + CTA) | React/Tailwind immediately |
| **Elementor bridge** | Complex widget layouts, tight CSS coupling, many Elementor classes | Bridge render (see Phase 5) |

Most landing pages and content pages are native rebuilds. Resource-heavy pages with Elementor widgets (counters, icon lists, animated headlines, complex grid layouts) are bridge candidates.

---

## Phase 5 — Elementor Bridge (Complex Pages Only)

For each complex page that can't be rebuilt immediately:

### 5a. Extract vendor CSS

1. Open the live WP page in Chrome DevTools → Network tab → filter `.css`
2. Download all Elementor post-specific CSS files: `post-<id>.css`, `widget-*.min.css`, `frontend.min.css`
3. Save to `src/styles/vendor-elementor-<pagename>/`

The files you typically need:
- `frontend.min.css` — Elementor core (can be shared across pages)
- `post-8.css` — global kit (colors, typography CSS variables — **always needed**)
- `post-<id>.css` — page-specific layout CSS
- `widget-icon-list.min.css`, `widget-icon-box.min.css`, `widget-divider.min.css`, etc. — widget CSS for widgets used on that page

### 5b. Create the CSS bundle

Create `src/styles/elementor-<pagename>-bundle.css`:
```css
@import "./vendor-elementor-<pagename>/frontend.min.css";
@import "./vendor-elementor-<pagename>/post-8.css";
@import "./vendor-elementor-<pagename>/post-<id>.css";
@import "./vendor-elementor-<pagename>/widget-icon-list.min.css";
/* add any other widget CSS files the page uses */
```

Also ensure `src/styles/elementor-kit-fallback.css` exists (shared across bridge pages):
```css
/* Elementor kit anchor — ensures post-8.css global vars are active */
.elementor-kit-8 { display: block; }
```

### 5c. Create the route layout.tsx

At `src/app/<route>/layout.tsx`:
```tsx
import "@/styles/elementor-<pagename>-bundle.css";
import "@/styles/elementor-kit-fallback.css";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
```

This loads the CSS in `<head>` via Turbopack's route chunk — scoped to this route only.

### 5d. Save the raw HTML

1. Open the live WP page
2. View Page Source (Cmd+U)
3. Copy the full HTML
4. Save as `src/views/<route>/migrated-raw.html`

### 5e. Build the loader (if not already in the app)

At `src/lib/<brandname>ElementorMigrated.ts`:
```ts
import fs from "fs";
import path from "path";

export function loadCipherElementorFullPage(relPath: string): string {
  const filePath = path.join(process.cwd(), "src/views", relPath);
  return fs.readFileSync(filePath, "utf-8");
}

export function loadCipherElementorBody(relPath: string): string {
  const html = loadCipherElementorFullPage(relPath);
  // Slice from first content section onward, skipping WP header/nav
  const marker = html.indexOf('<section');
  return marker === -1 ? html : html.slice(marker);
}
```

### 5f. Build the view page

At `src/views/<route>/page.tsx`:
```tsx
import { loadCipherElementorFullPage } from "@/lib/<brand>ElementorMigrated";

export default function PageName() {
  const html = loadCipherElementorFullPage("<route>/migrated-raw.html");

  return (
    <main className="min-h-screen bg-white">
      {/*
        elementor-kit-8: required ancestor — activates post-8.css CSS variable system.
        Do NOT add any other wrapper class that fights Elementor's flex/grid.
      */}
      <div className="elementor-kit-8 w-full overflow-x-hidden text-[var(--e-global-color-text,#000)]">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
```

**Key rules:**
- Always use `elementor-kit-8` as the wrapper class — this is what Elementor's CSS uses as the ancestor selector for global variables
- Do NOT add `cipher-migrated-html` or any other class on the outer wrapper for Elementor pages — those rules fight Elementor's flex/grid system
- The view is a Server Component (no `"use client"`) — `readFileSync` is fine at build time

---

## Phase 6 — Native Page Rebuilds

For each non-bridge page, build it natively using the brand's Tailwind design system. Follow the platform's standard patterns:
- `src/app/<route>/page.tsx` — thin route file, imports view
- `src/views/<route>/page.tsx` — the actual component

Use `next/image` for all images. Use Remix Icon (`ri-*-line`) for icons.

### Navigation reconstruction

After scaffolding, rebuild the navbar and footer natively. Key considerations:

- **Start with one gold-template page** that includes the hero form/CTA pattern, then systematically elevate stubs to match it.
- **Mega-menus:** When WP had a mega-menu or grouped submenu (e.g. grouped services with icons), define an explicit data structure (`src/lib/navigation.ts` or similar) with typed groups and children rather than a flat links array.
- **Logo lockup:** WP often uses separate graphic + wordmark crops. Verify the exact asset you want — a single combined lockup vs a graphic-only mark — and pull the correct URL or SVG.
- **Sticky CTAs and mobile header colors:** When building the header, check that sticky behavior and mobile CTA button colors match the design. These are easy to miss when focused on desktop layout.

### SEO metadata integration

Every native page should use `resolveTrackedPageMetadata` so admins can update SEO fields without a redeploy:

```ts
// src/app/<route>/page.tsx
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";

export async function generateMetadata() {
  return resolveTrackedPageMetadata("/<route>", {
    title: "Fallback Title | Brand Name",
    description: "Fallback description.",
  });
}
```

Set `TRACKED_PAGE_METADATA_CACHE_SECONDS` to a short value (e.g. 15) during active content work so DB edits reflect quickly.

---

## Phase 7 — Image Workflow

### 7a. Generate unique AI images per page
Use the `GenerateImage` tool with page-specific, on-brand prompts. See `platform-unique-page-imagery` rule for naming convention: `<prefix>_<section><index>.jpg` (e.g. `cb_hero01.jpg`).

### 7b. Upload images to Supabase

Create a temporary `.upload.env` file (already gitignored at root):
```
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<key>
SUPABASE_PROJECT_REF=<ref>
SUPABASE_BUCKET=site-assets
LOCAL_IMAGE_DIR=./generated-images/
```

Copy `upload-images-to-supabase.mjs` from another app's `scripts/` folder and run:
```bash
node scripts/upload-images-to-supabase.mjs
```

This outputs the Supabase public URL for each file. Reference those URLs directly in page source.

### 7c. Replace any placeholder image URLs

If images were built with Readdy.ai or another placeholder service, copy and run `replace-readdy-images.mjs` to swap all URLs in source files automatically after the upload step.

**Delete both scripts when done.** They are one-time migration utilities.

---

## Phase 8 — QA & Cleanup

### Postbuild `sync-tracked-pages` and local env

`tsx scripts/sync-tracked-pages.ts` (postbuild) does **not** auto-load `.env.local` the way Next.js does. Running `pnpm build` locally without exporting env vars will silently skip the sync (no error, just no upsert). To run it locally:

```bash
set -a && source apps/<slug>/.env.local && set +a && pnpm --filter @sweetmedia/<slug> build
```

On Vercel this works automatically since env vars are injected at build time. After first deploy, verify `tracked_pages` rows in the Supabase Dashboard, or trigger the on-demand sync via `/api/admin/sync-pages`.

### Pre-launch QA checklist

Work through this before going live:

- [ ] All nav links resolve — no 404s on primary navigation targets
- [ ] No routes are still empty stubs (view returns a blank/placeholder component)
- [ ] Logo and favicon are the real brand assets, not placeholders
- [ ] Contact form submits successfully and delivers email via Resend
- [ ] Blog routes load published posts; `/blog/[slug]` renders correctly
- [ ] **Author photos / avatars on `blog_posts` are migrated** (see Author photo gotcha below) — they live in the `author_photo` column, NOT in `content`, and are missed by the inline-image migration script
- [ ] **`/blog/category/[slug]/` route exists** if any redirect targets are `/blog/category/*` (the client template ships only `/blog/` and `/blog/[slug]/` — see Category route gotcha below)
- [ ] Admin login works at `/admin/login` with correct credentials
- [ ] `tracked_pages` rows exist in Supabase (postbuild ran on first deploy)
- [ ] `robots.txt` and `sitemap.xml` are returning correct content
- [ ] All redirects from old WP URLs are in `next.config.ts` (sample-test 30+ chains: 308 → 200)
- [ ] No remaining WP image domain references in `next/image` `src` props (sweep all `blog_posts` columns, not just `content`)
- [ ] `src/pages/` directory does NOT exist in the new app — see "Accidental Pages Router exposure" below
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set on the Vercel project
- [ ] Bridge pages: verify on mobile — Elementor layouts can break at narrow widths
- [ ] `next dev` badges/overlays are not being interpreted as prod bugs (they disappear in production builds)

### Migration verification gotchas (discovered on real migrations)

**1. Author photo gotcha** — The inline-image migration (`wp-migrate-inline-images.mjs`) only scans `blog_posts.content`. Author photos live in `blog_posts.author_photo` and are skipped. Run this audit after the main migration:
```bash
# Find any post field still pointing at the WP host
curl -s "https://<ref>.supabase.co/rest/v1/blog_posts?select=*&limit=500" \
  -H "apikey: <service_role>" -H "Authorization: Bearer <service_role>" \
  | python3 -c "import sys,json; posts=json.load(sys.stdin); from collections import Counter
c=Counter()
for p in posts:
  for k,v in p.items():
    if k=='content': continue
    if isinstance(v,str) and 'wp-content' in v: c[k]+=1
print(c)"
```
Then download → upload to `site-assets/images/blog/authors/<filename>` → PATCH `blog_posts.author_photo` for each unique URL.

**2. Category route gotcha** — When the redirect map includes any `/blog/category/<slug>/` targets, you must build the matching route. The client-template only ships `/blog/` and `/blog/[slug]/`. Add `apps/<slug>/src/app/blog/category/[slug]/page.tsx` that loads the category by slug from `blog_categories` and renders the existing `BlogGrid` with a `lockedCategoryName` prop (see northbound-treatment for the reference implementation). Without this, ~33% of redirects can land on a 404.

**3. Accidental Pages Router exposure** — The client-template puts the `BlogPage` component at `src/pages/blog/page.tsx`. Next.js auto-detects `src/pages/` as the legacy Pages Router root, so this component is silently exposed at `/blog/page/` (and any siblings at `/blog/<sibling>/`). Move all such components to `src/views/...` (the convention used everywhere else in the same template) and update the App Router imports. Confirm with `pnpm build` that there is no `Route (pages)` section in the route table. **Fix this in the client-template and apply to all existing brands.**

**4. Turbopack HMR cache rot** — During verification you may see `ReferenceError: require is not defined` on routes that were previously 200. This is a Next 16 Turbopack dev-server bug after rapid edits. Kill the dev process, `rm -rf apps/<slug>/.next`, and restart. The production build is unaffected.

**5. 308 vs 301** — `permanent: true` in `next.config.ts redirects()` returns **308 Permanent Redirect**, not 301. Both are valid permanent redirects (Google treats them equivalently for SEO), but third-party tools and older crawlers may have different handling. Don't waste time "fixing" this unless the client specifically requires 301.

### Cleanup

1. Verify all routes render correctly in `pnpm dev`
2. Check nav links, contact forms, blog routes
3. Run `pnpm build` — ensure no TypeScript errors or missing imports
4. Delete all migration artifacts from the monorepo root:
   - `design-tokens-<slug>-computed.json`
   - `design-tokens-<slug>.com.json`
   - `migration-report-<slug>.json`
   - `wp-screenshots/<slug>/` (entire folder)
5. Delete one-time scripts from `apps/<slug>/scripts/` (upload-images, replace-readdy-images)
6. The `.gitignore` at repo root already ignores all of the above patterns — no further action needed

---

## Phase 5 Supplement — Elementor Bridge: Known Issues & Fixes

This section documents every CSS conflict, rendering bug, and WordPress plugin issue encountered during real migrations. Check each one before shipping a bridge page.

---

### A. Pre-process the raw HTML before saving

Do NOT save the raw HTML directly from WordPress. Run it through a cleanup script first. The following transformations are required:

**1. Strip `elementor-invisible`**
Elementor's animation system hides elements on page load with `.elementor-invisible` and JS reveals them. Without WP's JS, they stay hidden forever.
```js
html = html.replace(/\belementor-invisible\b/g, "");
```

**2. Fix lazy-loaded images (Perfmatters and similar plugins)**
Perfmatters swaps `src`/`srcset` with `data-src`/`data-srcset`. Without the plugin's JS, images render blank.
```js
// <img> tags
html = html.replace(/\bdata-src=/g, "src=");
html = html.replace(/\bdata-srcset=/g, "srcset=");
// <source> tags in <picture> elements
html = html.replace(/<source([^>]*)\bdata-srcset=/g, "<source$1 srcset=");
html = html.replace(/<source([^>]*)\bdata-src=/g, "<source$1 src=");
// Strip loading="lazy" (not critical but prevents layout interference)
html = html.replace(/\bloading="lazy"/g, "");
```

**3. Replace JS-rendered video widgets**
Elementor's video widget outputs an empty `<div>` with the video ID in `data-settings`. The JS never runs, so the video never appears. Inject the iframe directly:
```js
html = html.replace(
  /<div[^>]+data-widget_type="video\.default"[^>]*>[\s\S]*?data-settings="([^"]+)"[\s\S]*?<\/div>/g,
  (match, settings) => {
    try {
      const parsed = JSON.parse(settings.replace(/&quot;/g, '"'));
      const videoId = parsed.youtube_url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      if (!videoId) return match;
      return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
        <iframe src="https://www.youtube.com/embed/${videoId}" 
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
          allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
          allowfullscreen></iframe>
      </div>`;
    } catch { return match; }
  }
);
```
A simpler approach: identify the exact empty video div in DevTools → find its `data-settings` attribute → extract the YouTube video ID → manually inject an `<iframe>` directly in `migrated-raw.html`.

**4. Replace JS-only shortcode widgets (maps, review widgets, etc.)**
Plugins like Fla-shop USA Map or TrustIndex render empty divs without their JS. Replace with static alternatives:
- For USA maps: generate an AI image of a map and replace the shortcode div with `<img src="..." style="max-width:980px;width:100%;height:auto;display:block;margin:0 auto;" />`
- For review widgets (TrustIndex, Elfsight): WP injects these via a `<template>` element with a `data-src` script loader. The loader never fires without WP's plugin JS. Fix: replace the `<template>` with a real `<script async src="https://cdn.trustindex.io/loader.js?...">` tag directly in `migrated-raw.html`. Alternatively replace entirely with a static testimonials block.

**5. Perfmatters lazy video (distinct from Elementor video widget)**
Perfmatters wraps YouTube embeds in a `<div class="perfmatters-lazy-video" data-src="https://www.youtube.com/embed/...">` container. The YouTube iframe is never inserted without the plugin's JS. Fix:
```js
html = html.replace(
  /<div[^>]+class="[^"]*perfmatters-lazy-video[^"]*"[^>]+data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
  (_, src) =>
    `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
      <iframe src="${src}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
        allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
        allowfullscreen></iframe>
    </div>`
);
```
Or locate the element in DevTools and manually inject the iframe into `migrated-raw.html`.

---

### B. Do NOT include Hello Elementor theme CSS

The theme files `theme-reset.css`, `theme.css`, and `theme-header-footer.css` contain global overrides that conflict with your Next.js layout. The most destructive one:

```css
/* theme-reset.css — turns ALL links red site-wide */
a { color: #c36; }
```

**Never import these into the bundle:**
```css
/* ❌ Do NOT add these */
@import "./vendor-elementor-home/theme-reset.css";
@import "./vendor-elementor-home/theme.css";
@import "./vendor-elementor-home/theme-header-footer.css";
```

Only import Elementor's own files: `frontend.min.css`, `post-8.css`, `post-<id>.css`, and widget CSS files.

---

### C. Missing inline `<style>` blocks from the WP `<head>`

WP pages often include `<style>` blocks directly in the HTML `<head>` that carry critical backgrounds, color overrides, or layout values. These are not linked CSS files and won't appear in DevTools Network → CSS. When a bridge page is missing expected backgrounds or colors even after importing all linked CSS files:

1. Open View Source (Cmd+U) on the live WP page
2. Look for `<style id="...">` blocks in the `<head>` — especially ones with `elementor-post-*` or custom inline CSS
3. Copy the relevant rules into `src/styles/elementor-<pagename>-bridge-fixes.css` or directly into the bundle CSS

This is the most commonly missed step when bridge pages look visually incomplete despite correct vendor CSS imports.

---

### D. Move globals.css custom rules into `@layer base`

If your `globals.css` has unlayered custom rules (heading styles, link colors, body font, etc.) they will fight Elementor's unlayered CSS on bridge pages — cascade order is unpredictable.

**Fix: wrap all custom global styles in `@layer base`** so that Elementor's unlayered rules automatically win on bridge routes:

```css
/* globals.css */
@import "tailwindcss";

@layer base {
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); /* ... */ }
  h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); /* ... */ }
  button, a { transition: all 180ms ease; }
}

/* Any unlayered rules here will beat @layer base but still lose to Elementor's unlayered CSS */
```

This is the correct long-term architecture for apps that mix Tailwind and Elementor bridge pages.

---

### E. Hero section: z-index stacking and image collapse

Elementor hero sections with a background image widget on an absolutely-positioned layer require three fixes:

**1. Force z-index on the image widget**
Elementor's `frontend.min.css` sets `z-index: 1` on `.elementor-absolute` (specificity 0,2,0). The page CSS sets `z-index: -1` on the image widget (specificity 0,1,0). Base wins. Override with `!important`:
```css
/* Target the image widget element by its Elementor ID */
.elementor-4848 .elementor-element-ffd9f79 {
  z-index: -1 !important;
}
```

**2. Create a stacking context on the hero container**
Without `isolation: isolate`, a `z-index: -1` child is positioned relative to the page root and disappears behind the `<body>` background. Also add `overflow: hidden` to clip the wave shape divider:
```css
.elementor-4848 .elementor-element-2e2d30b {
  isolation: isolate;
  overflow: hidden;
}
```

**3. Assert explicit height on the hero image**
Tailwind preflight sets `img { height: auto }`. For an absolutely-positioned hero image, `height: auto` collapses it to 0 if the container has no intrinsic height:
```css
.elementor-4848 .elementor-element-ffd9f79 img {
  height: 614px !important;   /* match the original design */
  width: 100% !important;
  max-width: none !important;
  object-fit: cover;
}
@media (max-width: 1024px) { /* scale down at tablet */ }
@media (max-width: 767px)  { /* scale down at mobile */ }
```

**How to find the element IDs:** In DevTools → inspect the hero section → look for `data-id="..."` on the section container and on the image widget div. The Elementor element ID is the last segment of the class like `elementor-element-ffd9f79` → the ID is `ffd9f79`.

---

### F. Blog / posts widget image gaps

Elementor's posts widget uses a `padding-bottom` aspect-ratio trick for thumbnails. The typical post-specific CSS sets something like:
```css
.elementor-element-09ef7e6 .elementor-posts-container .elementor-post__thumbnail {
  padding-bottom: calc(0.66 * 100%);
}
```

The widget CSS positions the image absolutely inside this container:
```css
.elementor-post__thumbnail img {
  position: absolute; top: calc(50% + 1px); left: calc(50% + 1px);
  transform: scale(1.01) translate(-50%, -50%);
  height: auto; width: 100%;
}
```

The problem: if blog images are a different aspect ratio than the container (e.g., images are 16:9 ≈ 56% but container is 66%), the image is shorter than the container. Tailwind's `height: auto` keeps this discrepancy and you see background color bleeding at top and bottom.

**Fix:** Target the posts widget by its Elementor element ID (NOT by `.elementor-has-item-ratio` — that class may not be present):
```css
/* Find the element ID from the widget's data-id attribute in the HTML */
.elementor-4848 .elementor-element-09ef7e6 .elementor-post__thumbnail img {
  height: 100% !important;
  width: 100% !important;
  max-width: none !important;
  object-fit: cover;
}

/* <picture> wrapper defaults to inline — prevents line-height gaps */
.elementor-4848 .elementor-element-09ef7e6 .elementor-post__thumbnail picture {
  display: block;
}
```

**Note:** Do NOT target `.elementor-has-item-ratio` — that class is not always present. Always use the specific widget element ID from `data-id` in the HTML.

---

### G. Scope bridge CSS to a route group

If the bridge page is the homepage `/`, it lives in `src/app/page.tsx`. To avoid importing Elementor's heavy CSS globally, wrap it in a route group:

```
src/app/
  (home)/           ← route group (no URL segment)
    layout.tsx      ← imports elementor-home-bundle.css here
    page.tsx        ← homepage
```

```tsx
// (home)/layout.tsx
import "@/styles/elementor-home-bundle.css";
import "@/styles/elementor-kit-fallback.css";
import "@/styles/elementor-home-bridge-fixes.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

This keeps all Elementor CSS scoped to just the homepage route chunk.

---

### H. Bridge fix file pattern

Create a dedicated `src/styles/elementor-<pagename>-bridge-fixes.css` for every bridge page. Import it last in the route `layout.tsx`. This file:
- Is **unlayered** so it beats both `@layer base` and Elementor's own CSS when needed
- Is **scoped to the page-specific selector** (e.g. `.elementor-4848`) to avoid bleeding
- Should be used for z-index corrections, explicit dimension overrides, and aspect-ratio fixes

Import order in `layout.tsx`:
```css
@import "@/styles/elementor-home-bundle.css";       /* vendor CSS */
@import "@/styles/elementor-kit-fallback.css";      /* kit anchor */
@import "@/styles/elementor-home-bridge-fixes.css"; /* overrides — last always */
```

---

### I. Check vendor CSS download completeness

When downloading CSS from DevTools → Network tab, look for these commonly missed files:
- `widget-posts.min.css` — required for the posts/blog widget aspect ratio and thumbnail CSS
- `widget-video.min.css` — required for video widget sizing
- `widget-nested-accordion.min.css` / `widget-accordion.min.css` — required for FAQ accordions
- `animations.min.css` — required for entrance animations (even if you strip `elementor-invisible`)
- Any map plugin CSS (e.g. `map.css` from fla-shop) — needed if the page has a custom map shortcode

Also check for a separate "global stylesheet" CSS (sometimes `post-<id>.css` where `<id>` is the Elementor kit ID, usually 8). This file contains **all CSS custom properties** (colors, fonts, spacing) used by every other Elementor file — it is always required.

---

### J. `next.config.ts` remotePatterns for bridge images

Bridge pages reference images directly from the live WordPress domain. Add the WP hostname to `remotePatterns`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "<ref>.supabase.co" },
    { protocol: "https", hostname: "clientsite.com" },         // ← WP image domain
    { protocol: "https", hostname: "secure.gravatar.com" },    // ← if WP uses Gravatar avatars
  ],
},
```

Without this, `next/image` will throw for any `<img>` referencing the WP domain. Note: bridge pages use raw `<img>` tags (not `next/image`), so this only matters if you're also using `next/image` elsewhere on the same hostname.

---

## Incremental Native Rebuild (Post-Launch)

To replace a bridge page with a native one:
1. Build the native React/Tailwind page in the view file
2. Remove the `loadCipherElementorFullPage` call
3. Delete the `migrated-raw.html` for that route
4. Delete the vendor CSS folder for that route
5. Delete the route `layout.tsx` (or remove the CSS imports if the layout serves another purpose)
6. Delete the bundle CSS file
7. Once ALL bridge pages are replaced: delete `<brand>ElementorMigrated.ts` entirely

---

## Gitignored Artifact Patterns (already in root .gitignore)

```
design-tokens-*.json
migration-report-*.json
wp-screenshots/
.upload.env
uploaded-image-files.txt
```
