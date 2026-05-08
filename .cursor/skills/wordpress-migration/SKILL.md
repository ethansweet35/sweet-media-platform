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
- For review widgets (TrustIndex, Elfsight): if the plugin uses a `data-src` script loader, convert to a real `<script src="...">` tag, OR replace with a static testimonials block

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

### C. Move globals.css custom rules into `@layer base`

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

### D. Hero section: z-index stacking and image collapse

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

### E. Blog / posts widget image gaps

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

### F. Scope bridge CSS to a route group

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

### G. Bridge fix file pattern

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

### H. Check vendor CSS download completeness

When downloading CSS from DevTools → Network tab, look for these commonly missed files:
- `widget-posts.min.css` — required for the posts/blog widget aspect ratio and thumbnail CSS
- `widget-video.min.css` — required for video widget sizing
- `widget-nested-accordion.min.css` / `widget-accordion.min.css` — required for FAQ accordions
- `animations.min.css` — required for entrance animations (even if you strip `elementor-invisible`)
- Any map plugin CSS (e.g. `map.css` from fla-shop) — needed if the page has a custom map shortcode

Also check for a separate "global stylesheet" CSS (sometimes `post-<id>.css` where `<id>` is the Elementor kit ID, usually 8). This file contains **all CSS custom properties** (colors, fonts, spacing) used by every other Elementor file — it is always required.

---

### I. `next.config.ts` remotePatterns for bridge images

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
