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
This script (in order) creates the Supabase project, applies `apps/client-template/supabase/client-template-schema.sql`, seeds `brand_settings` + `blog_categories`, creates the public `site-assets` storage bucket, seeds the admin user (and Supabase Auth user when possible), pushes the canonical Edge Function secrets (`BLOG_IMAGE_BUCKET`, `BLOG_IMAGE_FOLDER`, `BLOG_WEBHOOK_SECRET`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_INDEXING_CLIENT_EMAIL`, `GOOGLE_INDEXING_PRIVATE_KEY`), deploys the four canonical Edge Functions (`generate-blog-post`, `generate-blog-image`, `ping-google-indexing`, `inspect-google-indexing`), and finally scaffolds `apps/new-client-slug` from `apps/client-template` with a populated `.env.local` (Supabase URL/keys, `NEXT_PUBLIC_SITE_ID`, `NEXT_PUBLIC_SITE_URL`, contact form vars) and a brand-correct `.upload.env`.

Required in repo-root `.env`: `SUPABASE_ACCESS_TOKEN`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_INDEXING_CLIENT_EMAIL`, `GOOGLE_INDEXING_PRIVATE_KEY`, `BLOG_WEBHOOK_SECRET` (auto-generated if missing), `VERCEL_TOKEN`, `GITHUB_REPO`, `SEMRUSH_API_KEY`.

## 2. Publish to Vercel
```
node scripts/publish-client-to-vercel.mjs \
  --slug new-client-slug \
  --name "New Client" \
  --domain newclient.com
```
This creates the Vercel project, pushes every required env var (public Supabase, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_BRAND_NAME`, plus the shared `OPENROUTER_API_KEY` and `SEMRUSH_API_KEY` from repo-root `.env`), adds the custom domain, and triggers the first production deploy.

Pass `--project <vercel-project-name>` when the brand's Vercel project name does not match its slug (`apps/sweet-media` → `--project sweet-media-platform`, `apps/inner-peak-colorado` → `--project inner-peak-colorado-platform`).

Re-push env vars later without redeploying via `--update-env --skip-deploy`.

## 3. Save credentials to 1Password

After adding `RESEND_API_KEY` to `apps/new-client-slug/.env.local`, save both env files to the **Sweet Media Platform** vault automatically:

```
node scripts/setup-new-client.mjs --slug new-client-slug ... --save-to-1password
```

Requires 1Password CLI (`brew install 1password-cli`) and an active session (`op signin`). This creates or updates two Secure Notes in the vault:
- `new-client-slug — .env.local`
- `new-client-slug — .upload.env`

If the CLI is not available, save the files manually: open each in Cursor, copy, create a Secure Note in 1Password with the title above.

## 4. Configure image upload script (for bulk asset upload)
The scaffold now auto-generates `apps/new-client-slug/.upload.env` with the correct Supabase project ref and URL. After provisioning:
- Fill in `SUPABASE_SERVICE_ROLE_KEY` (copy from `.env.local`)
- Set `LOCAL_IMAGE_DIR` to the folder containing images on your machine
- Run `pnpm --filter @sweetmedia/new-client-slug run upload:images`

## 5. Manual touches still required
- **Supabase org invites** — `setup-new-client.mjs` warns about each standing team member; invite them via the Supabase dashboard members page (one-time per org).
- **Vercel team access** — invite developers in the Vercel team settings; once added they can run `pnpm dev-setup` to pull all secrets automatically.
- **GitHub collaborators** — add via repo Settings → Collaborators if needed (or push directly).
- **Resend domain verification** — verify the `CONTACT_FROM_EMAIL` sender domain in Resend; otherwise the contact form silently fails.
- **DNS** — point the apex domain at Vercel (`CNAME cname.vercel-dns.com` or `A 76.76.21.21`).

## 6. Replace template content
Swap blank template pages for client-specific design, copy, imagery, and CTAs. Generate AI imagery per page and upload via the script above.

## 7. QA before launch
Homepage, blog index, blog post slugs, admin login, blog generation + image generation flows, contact form delivery, page metadata, domain resolution, Vercel root directory, sitemap (`/sitemap.xml` + `/sitemaps/[group]`), robots.

---

## Developer onboarding (new machine or new team member)

### Prerequisites
```bash
npm i -g vercel          # Vercel CLI
brew install 1password-cli  # 1Password CLI
vercel login             # authenticate with Vercel
op signin                # authenticate with 1Password
```

Both tools only need to be installed and authenticated once per machine. Vercel and 1Password team access must be granted by Ethan first.

### Pull all secrets in one command
```bash
pnpm dev-setup
```

This pulls:
- Root `.env` from 1Password (`platform — root .env`)
- `.env.local` for every brand via `vercel env pull`
- `.upload.env` for every brand from 1Password

### Pull secrets for specific brands only
```bash
pnpm dev-setup --brands northbound-treatment,cipher-billing
```

### Options
```
--brands <slug,slug>   Only set up the listed brands (default: all)
--skip-1password       Skip 1Password pulls (Vercel only)
--skip-vercel          Skip vercel env pull (1Password only)
```

### Manual fallback (if CLI tools aren't set up)
- Root `.env` → copy from 1Password "Sweet Media Platform" vault → `platform — root .env`
- Per brand `.env.local` → `cd apps/<slug> && vercel link && vercel env pull`
- Per brand `.upload.env` → copy from 1Password → `<slug> — .upload.env`
