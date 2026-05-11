# Client Template

This is the canonical scaffold template for new Sweet Media client sites. **Do not run or deploy this app directly.** It exists to be copied by the provisioning script.

---

## How this gets used

When `setup-new-client.mjs` runs, it copies this entire directory into `apps/<slug>/`, rewrites the package name, sets the Supabase hostname in `next.config.ts`, and writes `.env.local`. You should never need to edit this template for individual clients — only edit it when adding a platform-wide feature that every future client should get.

---

## What's included

- Full Next.js 16 + Tailwind v4 app shell
- Admin system (`/admin/*`) wired to `@sweetmedia/admin-core`
- Blog routes (`/blog`, `/blog/[slug]`)
- Contact form API route (`/api/admin/contact`)
- Full set of admin API routes (`/api/admin/revalidate`, `/api/admin/sync-pages`, `/api/admin/generate-seo-meta`, `/api/admin/surfer/*`, etc.)
- SEO infrastructure (`resolveTrackedPageMetadata`, `sync-tracked-pages.ts`, `sitemap.ts`, `robots.ts`)
- Supabase client configured from `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Placeholder brand strings to replace: `Client Brand`, `hello@example.com`, `https://example.com`

---

## Making platform-wide changes

If you add a new admin feature, API route, or shared dependency:

1. Add it here first (`apps/client-template`)
2. Port it to every existing client app
3. Update `apps/client-template/supabase/client-template-schema.sql` if there's a schema change
4. Provide migration SQL for existing brands in your commit message

See `CONTRIBUTING.md` for the full cross-client consistency rules.

---

## Brand placeholder strings

When scaffolding manually (without the setup script), find-and-replace these strings:

| Placeholder | Replace with |
|---|---|
| `Client Brand` | Brand display name (e.g. `Acme Recovery`) |
| `hello@example.com` | Contact / from email |
| `https://example.com` | Production domain |
| `papiwmobmdbtzeeebmpr.supabase.co` | Actual Supabase project hostname |

---

*Part of the Sweet Media Platform monorepo — `pnpm 10.33.2` · `Next.js 16` · `Tailwind v4` · `Supabase`*
