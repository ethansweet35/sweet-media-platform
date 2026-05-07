# WordPress to Sweet Media Platform — Migration Runbook

This guide covers the complete workflow for migrating a WordPress/Elementor site into the monorepo as a fully independent brand app. Every site follows this same two-track sequence.

**Canonical repeat process:** The steps below match what was used for **Cipher Billing** (`cipherbilling.com` → `apps/cipher-billing`). For each new WordPress site, run the same commands in the same order and apply the same build rules — only the slug, URLs, and page-specific copy change.

---

## Replication playbook (use for every WordPress site)

Follow this sequence end-to-end. Skipping steps is how designs drift.

### Phase 1 — Supabase + app shell

1. **Provision infrastructure**

   ```bash
   node scripts/setup-new-client.mjs \
     --slug  brand-slug \
     --name  "Brand Display Name" \
     --url   https://example.com \
     --admin-email your@email.com
   ```

   If Supabase returns **“project name already exists”**, pick a distinct `--name` (e.g. `"Brand Name Test"`) while keeping `--slug` as the real site key (`NEXT_PUBLIC_SITE_ID`).

2. **Clone the app from template**

   ```bash
   cp -r apps/client-template apps/brand-slug
   ```

3. **Wire the app**
   - `apps/brand-slug/package.json` → `"name": "@sweetmedia/brand-slug"`
   - `apps/brand-slug/.env.local` → paste `NEXT_PUBLIC_SUPABASE_*` and `NEXT_PUBLIC_SITE_ID` from the setup script output
   - `apps/brand-slug/next.config.ts` → add **both**:
     - `https://<ref>.supabase.co` (blog/OG images from Storage)
     - `https://<live-wp-hostname>` (migrations often load hero/video/logo URLs from the old site until assets are re-hosted)

4. **Install**

   ```bash
   pnpm install
   ```

### Phase 2 — Content + inventory (automated)

5. **Migrate blogs + page inventory**

   ```bash
   node scripts/migrate-wordpress-content.mjs \
     --wp-url         https://example.com \
     --site-id        brand-slug \
     --supabase-ref   <ref> \
     --supabase-key   <service_role_key>
   ```

   - Produces `migration-report-brand-slug.json` at repo root (all WP pages + raw HTML for build reference).
   - Run `--dry-run` first if you only want to validate the REST API.
   - Optional: `--skip-images` for a fast first pass, then re-run without it to re-host featured images to Supabase.

### Phase 3 — Design spec (tokens + screenshots + computed layout)

6. **Static token extraction (CSS / Elementor globals)**

   ```bash
   node scripts/extract-wp-design-tokens.mjs --wp-url https://example.com
   ```

   - Writes `design-tokens-<hostname>.json` with Elementor `--e-global-color-*` and typography vars when present.
   - If the fetch fails, some hosts (e.g. Cloudflare) block non-browser `User-Agent` patterns — the script uses a minimal fetch profile for compatibility.

7. **Visual audit (full-page screenshots + computed styles)**

   Requires Playwright browsers installed (from repo root):

   ```bash
   PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium
   PLAYWRIGHT_BROWSERS_PATH=0 node scripts/visual-audit-wp.mjs \
     --wp-url https://example.com \
     --site-id brand-slug
   ```

   - Reads **`migration-report-brand-slug.json`** for the URL list (run Phase 2 first).
   - Outputs:
     - `wp-screenshots/brand-slug/<page-slug>/{desktop,tablet,mobile}.png`
     - `design-tokens-brand-slug-computed.json`

8. **Merge Elementor “Site Settings” colors into the token sheet**

   Open Elementor → Site Settings → Global Colors on the live WP site and copy **exact hex values** into `design-tokens-brand-slug-computed.json` → `platformTokenSheet` (or maintain a parallel `design-tokens-brand-slug-final.json`). Map semantics explicitly, e.g.:
   - **Medium blue** → primary section backgrounds
   - **Primary blue** → nav links, accents, primary buttons
   - **Dark blue** → top bar / footer strip / deep panels

   Automated extraction cannot read those labels — this manual merge step is what prevents “almost right” palettes.

### Phase 4 — Route stubs (optional but recommended)

9. **Scaffold App Router + view stubs from the migration report**

   ```bash
   node scripts/scaffold-wp-pages.mjs \
     --site-id  brand-slug \
     --app-slug brand-slug \
     --overwrite
   ```

   Each stub includes the **original WP HTML as a comment** at the top of the view file — use it as structure reference while rebuilding in React.

### Phase 5 — Page build for ~95% visual match (Cipher method)

This is **manual** Next.js + Tailwind work, not another automated converter.

10. **Homepage first (always)**

    - **Visual target:** `wp-screenshots/brand-slug/<home-slug>/desktop.png` side-by-side with localhost.
    - **Exact copy & numbers:** Pull from the **live HTML**, not from memory. Quick approach:

      ```bash
      curl -sL "https://example.com/" | node -e "/* small script: print headings, $ amounts, video .mp4 URLs */"
      ```

      Use the **real** hero video URL from WP uploads if the page uses `background_video` (Cipher used `.../video2-compressed.mp4`).

    - **Fonts:** In `src/app/layout.tsx`, use `next/font/google` for the brand’s display + body fonts (Cipher: Marcellus + Montserrat). Map variables on `<body>` and wire `--font-marcellus` / `--font-montserrat` in `globals.css` so headings/body match Elementor.

    - **Globals:** Set CSS variables for brand hex colors (`--color-medium-blue`, `--color-dark-blue`, `--color-accent`, etc.) and use them in sections instead of one-off random hex classes where possible.

    - **Chrome:** Replace template `Navbar`, `Footer`, and strip template-only UI from `Layout` (floating CTAs, generic “client brand” copy).

    - **Nav:** Match the **published WP menu** labels and destinations (Cipher used six top-level items including Our Solution vs Our Services — mirror what WP shows).

    - **`next/image`:** Add every external image hostname to `next.config.ts` `images.remotePatterns`. Use `sizes` on any `Image` with `fill`.

    - **Forms:** Point contact forms at `apps/.../src/app/api/contact/route.ts` and align field **names** with what the route reads (`name`, `email`, `phone`, `service`, `message`, etc.).

11. **Inner pages**

    Same loop per route: screenshot folder + WP HTML comment in the scaffold + token sheet. Priority: conversion pages → company/contact → long-tail.

12. **Tracked pages sync** (when Supabase env is available in the shell)

    ```bash
    export SUPABASE_SERVICE_ROLE_KEY=...
    pnpm --filter @sweetmedia/brand-slug exec npx tsx scripts/sync-tracked-pages.ts
    ```

    The script needs **both** `NEXT_PUBLIC_SUPABASE_URL` (from `.env.local` or export) and **`SUPABASE_SERVICE_ROLE_KEY`** — without the service role key it exits early (non-fatal).

### Phase 6 — Dev server reliability (macOS)

13. If **`next dev` hangs on “Compiling / …”** with Turbopack, use Webpack:

    ```bash
    unset MallocStackLogging
    unset MallocStackLoggingNoCompact
    pnpm --filter @sweetmedia/brand-slug exec next dev --webpack
    ```

### Phase 7 — Console hygiene (what Cipher surfaced)

14. **Duplicate React `key` warnings** — If two footer/nav links share the same `href`, never use `key={path}` alone; use `key={\`nav-${label}\`}` / `key={\`svc-${label}\`}`.

15. **`Multiple GoTrueClient instances`** — Often benign in dev when multiple Supabase client modules load; note for later if auth behaves oddly. Not a blocker for static marketing pages.

16. **`next/image` “fill” + `sizes`** — Performance hint; add `sizes` to remove the warning.

---

## Prerequisites

- Node.js 18+ installed
- pnpm installed globally (`npm install -g pnpm`)
- Supabase CLI installed (`brew install supabase/tap/supabase`)
- Supabase access token (one-time: `supabase login`)
- Access to the WordPress site (REST API must be enabled, which it is by default on WP 4.7+)
- Vercel account with access to the Sweet Media team

---

## Track A — Infrastructure + Content (Automated, ~1–2 hrs)

### A1. Provision Supabase

```bash
node scripts/setup-new-client.mjs \
  --slug  brand-slug \
  --name  "Brand Name" \
  --url   https://brandsite.com \
  --admin-email your@email.com
```

Save the output — you need the `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_ID` values for A3.

### A2. Copy the Client Template

```bash
cp -r apps/client-template apps/brand-slug
```

Then make 3 edits in the new app:

1. **`apps/brand-slug/package.json`** — change `"name"` to `"@sweetmedia/brand-slug"`
2. **`apps/brand-slug/.env.local`** — paste the env vars from the setup script output
3. **`apps/brand-slug/next.config.ts`** — add the Supabase image hostname:

```ts
// In the images.remotePatterns array:
{ protocol: "https", hostname: "<ref>.supabase.co" }
```

Then install:

```bash
pnpm install
```

### A3. Migrate Blog Content

```bash
node scripts/migrate-wordpress-content.mjs \
  --wp-url      https://brandsite.com \
  --site-id     brand-slug \
  --supabase-ref  <ref from setup output> \
  --supabase-key  <service role key from Supabase dashboard>
```

**Flags:**
- `--wp-user` / `--wp-pass` — WP application password credentials (if needed for private posts)
- `--skip-images` — skips re-hosting images (faster, uses WP URLs temporarily)
- `--dry-run` — validates without writing anything

**Output:**
- All published posts are in Supabase `blog_posts` and visible at `/blog`
- `migration-report-brand-slug.json` is written to repo root (your Track B build list)

### A4. Verify Blog Content

```bash
pnpm --filter @sweetmedia/brand-slug dev
```

Open `http://localhost:3001/blog` (or whichever port) and verify posts render. Check 3–5 individual post pages. If images are missing, re-run without `--skip-images`.

---

## Track B — Design + Page Build (Manual, 3–5 days per site)

Run concurrently with Track A once the app is copied.

### B1. Extract Design Tokens

```bash
node scripts/extract-wp-design-tokens.mjs --wp-url https://brandsite.com
```

This writes `design-tokens-brand-slug.json` with Elementor global colors, font families, and a `platformTokenSheet` scaffold to fill in.

**Then open the live WP site in a browser and complete the token sheet using DevTools:**

| What to check | DevTools path |
|---|---|
| Section background colors | Elements → select section → Computed → background-color |
| Heading color | Elements → select h1 → Computed → color |
| Body text color | Elements → select p → Computed → color |
| Primary font family | Elements → select h1 → Computed → font-family |
| Body font family | Elements → select p → Computed → font-family |
| Section padding | Elements → select section → Box Model (bottom panel) |
| CTA button background | Elements → select `.elementor-button` → Computed → background-color |
| CTA text color | Elements → select `.elementor-button` → Computed → color |
| Border radius | Elements → select button or card → Computed → border-radius |

### B2. Capture Reference Screenshots

In the browser at 375px, 768px, and 1440px (use responsive toggle), screenshot every page in the WP site. Store in a local folder like `~/Desktop/brand-slug-refs/`. These are your build target for each page.

### B3. Follow New Brand Prototype Skill (Replicate Mode)

Start a new Cursor session and reference the new-brand-prototype skill. Say:

> "I'm migrating [Brand Name] from WordPress. I have the design token extraction at design-tokens-brand-slug.json and screenshots. Start the new-brand-prototype workflow in replicate mode."

The skill will:
1. Map the extracted tokens to Design DNA axes (Phase 2 in replicate mode)
2. Finalize the complete design token table (Phase 4)
3. Build the design-preview page (Phase 6)
4. Build the homepage (Phase 7)

### B4. Scaffold Page Stubs

After the homepage is approved:

```bash
node scripts/scaffold-wp-pages.mjs \
  --site-id  brand-slug \
  --app-slug brand-slug
```

This reads `migration-report-brand-slug.json` and generates:
- `apps/brand-slug/src/app/[route]/page.tsx` — App Router route with metadata
- `apps/brand-slug/src/views/[page]/page.tsx` — view stub with WP HTML content as a comment reference

Flags:
- `--dry-run` — preview what will be created
- `--overwrite` — replace existing stubs
- `--skip home,contact` — skip specific slugs

### B5. Build Pages

Work through `migration-report-brand-slug.json`'s `buildChecklist` top-to-bottom. Priority order:

1. Homepage (done in B3)
2. Main services / conversion pages
3. About / Contact
4. Secondary content pages
5. Resource / FAQ pages

For each page:
1. Open the view stub — the WP HTML is in the top comment
2. Use the reference screenshot as the visual target
3. Build with the approved design tokens and new-brand-prototype section composition rules
4. Mark `buildStatus: "complete"` in the migration report when done

### B6. Register Routes

```bash
pnpm --filter @sweetmedia/brand-slug exec npx tsx scripts/sync-tracked-pages.ts
```

This syncs all `src/app/**/page.tsx` routes into Supabase `tracked_pages` for SEO metadata management.

---

## Track C — Deployment (Automated + DNS config, ~2 hrs)

### C1. Push to GitHub

Commit the new `apps/brand-slug/` directory:

```bash
git add apps/brand-slug
git commit -m "feat: add brand-slug brand app (migrated from WordPress)"
git push
```

### C2. Deploy to Vercel

In the Vercel dashboard:

1. New Project → Import from Git → select `sweet-media-platform`
2. Root Directory: `apps/brand-slug`
3. Framework Preset: Next.js
4. Add environment variables (copy from `apps/brand-slug/.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_ID`
5. Deploy

### C3. DNS Cutover

**Preparation (before cutover):**
- Verify the new site looks correct at the Vercel preview URL
- Test `/blog` and 5 individual blog post slugs — confirm they match the old WP URLs exactly
- Test contact form, navigation, and mobile responsiveness

**Cutover:**
1. Add the production domain in Vercel Project Settings → Domains
2. In your DNS provider, update the A/CNAME records to point to Vercel:
   - CNAME: `www` → `cname.vercel-dns.com`
   - A: `@` → `76.76.21.21` (Vercel IP)
3. Wait for DNS propagation (5–60 minutes)
4. Verify the live site loads from the new platform
5. Check SSL certificate auto-provisioned by Vercel

**Keep WordPress live as read-only until verified.** Do not take WP offline until:
- All pages render correctly
- All `/blog/[slug]` URLs return 200 (not 404)
- Google Search Console shows no new crawl errors (check at 48 hrs)
- Contact form sends email correctly

### C4. Final Verification Checklist

- [ ] Homepage loads and matches WP design
- [ ] All core pages accessible with correct content
- [ ] `/blog` listing shows all migrated posts
- [ ] Individual blog slugs match original WP slugs exactly (no redirects needed)
- [ ] Featured images load (from Supabase storage if re-hosted, or WP URLs if skipped)
- [ ] Contact form functional
- [ ] Mobile layout correct at 375px
- [ ] Google Analytics / tracking pixel fires (if applicable)
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Admin dashboard accessible at `/admin` (after adding admin user to Supabase)

### C5. Decommission WordPress

Once verification passes (minimum 48 hours after cutover):

1. Export WordPress XML backup (`Tools → Export → All content`) — keep as archive
2. Cancel WordPress hosting
3. Remove WP DNS records (if any remain)

---

## Quick Reference: Command Cheatsheet

Same order as **Replication playbook** above (Cipher Billing reference).

```bash
# 1. Provision Supabase
node scripts/setup-new-client.mjs --slug brand --name "Brand" --url https://brand.com

# 2. Copy template
cp -r apps/client-template apps/brand

# 3. Migrate blog + migration-report JSON (before visual audit)
node scripts/migrate-wordpress-content.mjs --wp-url https://brand.com --site-id brand \
  --supabase-ref <ref> --supabase-key <key> --dry-run
node scripts/migrate-wordpress-content.mjs --wp-url https://brand.com --site-id brand \
  --supabase-ref <ref> --supabase-key <key>

# 4. Static CSS token extraction
node scripts/extract-wp-design-tokens.mjs --wp-url https://brand.com

# 5. Full screenshots + computed tokens (install browsers once per machine)
PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=0 node scripts/visual-audit-wp.mjs \
  --wp-url https://brand.com --site-id brand

# 6. Merge Elementor Site Settings hex values into design-tokens-*-computed.json (manual step)

# 7. Scaffold page stubs
node scripts/scaffold-wp-pages.mjs --site-id brand --app-slug brand --overwrite

# 8. Register routes (needs service role in env)
pnpm --filter @sweetmedia/brand exec npx tsx scripts/sync-tracked-pages.ts

# 9. Dev (Webpack if Turbopack hangs on macOS)
pnpm --filter @sweetmedia/brand exec next dev --webpack
```

---

## Common Issues

| Problem | Fix |
|---|---|
| WP REST API returns 401 | Add `--wp-user` and `--wp-pass` with a WP Application Password |
| WP REST API disabled | Add `add_filter('rest_authentication_errors', '__return_null')` to `functions.php`, or use XML export mode |
| Image upload fails | Run with `--skip-images` first to get all posts in, then re-run without it once confirmed |
| Slug conflict in Supabase | WP slugs are globally unique per WP site, but if two WP sites have the same slug, the second upsert will overwrite the first. Each WP site must go into its own Supabase project. |
| Elementor tokens not found in extractor | The site may use a non-Elementor theme. Check `allCssVars` in the JSON output for `--wp--preset--color--*` (Gutenberg) or other patterns. |
| Post content missing formatting | Turndown converts HTML to Markdown — complex Elementor layouts with nested divs may need manual cleanup. Check a few posts in the admin editor. |
