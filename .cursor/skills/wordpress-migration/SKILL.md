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

### 1a. Visual audit (screenshots + design tokens)

```bash
# From monorepo root
node scripts/visual-audit-wp.mjs --url https://client-site.com --out ./wp-screenshots/<slug>/
node scripts/extract-wp-design-tokens.mjs --url https://client-site.com
```

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

---

## Phase 3 — Pull WordPress Content

### 3a. Migrate blog posts
```bash
node scripts/migrate-wordpress-content.mjs --url https://client-site.com --site-id <slug>
```

Outputs `migration-report-<slug>.json` with every WP post/page. **Delete after Phase 4.**

### 3b. Scaffold page stubs
```bash
node scripts/scaffold-wp-pages.mjs --report migration-report-<slug>.json --app apps/<slug>
```

Creates skeleton `src/app/[route]/page.tsx` + `src/views/[route]/page.tsx` for each WP page.

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
