# New Client Launch Checklist

The repo-level scripts handle nearly every step below automatically. Use this checklist as the source of truth for what each automation does and which manual touches still remain.

## 1. Provision Supabase + scaffold the Next app
```
node scripts/setup-new-client.mjs \
  --slug new-client-slug \
  --name "New Client" \
  --url "https://newclient.com" \
  --admin-email you@example.com
```
This script (in order) creates the Supabase project, applies `apps/client-template/supabase/client-template-schema.sql`, seeds `brand_settings` + `blog_categories`, creates the public `site-assets` storage bucket, seeds the admin user (and Supabase Auth user when possible), pushes the canonical Edge Function secrets (`BLOG_IMAGE_BUCKET`, `BLOG_IMAGE_FOLDER`, `BLOG_WEBHOOK_SECRET`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_INDEXING_CLIENT_EMAIL`, `GOOGLE_INDEXING_PRIVATE_KEY`), deploys the four canonical Edge Functions (`generate-blog-post`, `generate-blog-image`, `ping-google-indexing`, `inspect-google-indexing`), and finally scaffolds `apps/new-client-slug` from `apps/client-template` with a populated `.env.local` (Supabase URL/keys, `NEXT_PUBLIC_SITE_ID`, `NEXT_PUBLIC_SITE_URL`, contact form vars).

Required in repo-root `.env`: `SUPABASE_ACCESS_TOKEN`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_INDEXING_CLIENT_EMAIL`, `GOOGLE_INDEXING_PRIVATE_KEY`, `BLOG_WEBHOOK_SECRET` (auto-generated if missing), `VERCEL_TOKEN`, `GITHUB_REPO`, `SURFER_API_KEY`.

## 2. Publish to Vercel
```
node scripts/publish-client-to-vercel.mjs \
  --slug new-client-slug \
  --name "New Client" \
  --domain newclient.com
```
This creates the Vercel project, pushes every required env var (public Supabase, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_BRAND_NAME`, plus the shared `OPENROUTER_API_KEY` and `SURFER_API_KEY` from repo-root `.env`), adds the custom domain, and triggers the first production deploy.

Pass `--project <vercel-project-name>` when the brand's Vercel project name does not match its slug (`apps/sweet-media` → `--project sweet-media-platform`, `apps/inner-peak-colorado` → `--project inner-peak-colorado-platform`).

Re-push env vars later without redeploying via `--update-env --skip-deploy`.

## 3. Configure image upload script (optional, for bulk asset migration)
- Copy `apps/new-client-slug/.upload.env.example` to `apps/new-client-slug/.upload.env`.
- Set `SUPABASE_PROJECT_REF`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET=site-assets`, `LOCAL_IMAGE_DIR`.
- Run `pnpm --filter @sweetmedia/new-client-slug run upload:images`.

## 4. Manual touches still required
- **Supabase org invites** — `setup-new-client.mjs` warns about each standing team member; invite them via the Supabase dashboard members page (one-time per org).
- **Vercel team access** — invite developers in the Vercel team settings; once added they can `vercel env pull .env.local` from any app dir.
- **GitHub collaborators** — add via repo Settings → Collaborators if needed (or push directly).
- **Resend domain verification** — verify the `CONTACT_FROM_EMAIL` sender domain in Resend; otherwise the contact form silently fails.
- **DNS** — point the apex domain at Vercel (`CNAME cname.vercel-dns.com` or `A 76.76.21.21`).
- **Per-brand Surfer scoping** (optional) — set `SURFER_PROJECT_ID`, `SURFER_FOLDER_ID_BLOGS`, `SURFER_FOLDER_ID_PAGES` on the Vercel project when the brand needs a non-default workspace.
- **`CRON_SECRET`** (optional) — generate and set on Vercel (`openssl rand -hex 32`) only when you want the weekly Surfer `refresh-stale` cron to be authorized.

## 5. Replace template content
Swap blank template pages for client-specific design, copy, imagery, and CTAs. Generate AI imagery per page and upload via the script above.

## 6. QA before launch
Homepage, blog index, blog post slugs, admin login, blog generation + image generation flows, contact form delivery, page metadata, domain resolution, Vercel root directory, sitemap (`/sitemap.xml` + `/sitemaps/[group]`), robots.
