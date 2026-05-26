# Sullivan Recovery

Medical detox and residential treatment — Mission Viejo, Orange County. Production site: [sullivanrecovery.com](https://sullivanrecovery.com).

- **Package**: `@sweetmedia/sullivan-recovery`
- **Vercel project**: `sullivan-recovery` (root directory `apps/sullivan-recovery`)
- **Supabase**: `knvkrhwlflkulybcmgmq.supabase.co`
- **Site ID**: `sullivan-recovery`

## Development

```bash
pnpm --filter @sweetmedia/sullivan-recovery dev
```

Env is pulled via `predev` (`scripts/pull-brand-env.mjs`) or `vercel env pull .env.local` from this directory.

## URL structure

Marketing pages live under `/programs/*`, `/insurance/*`, `/our-approach/`, etc. Legacy WordPress paths 301 to the new structure — see [docs/legacy-url-mapping.md](./docs/legacy-url-mapping.md) and `src/lib/site-redirects.ts`. Root-level blog URLs rewrite via `src/lib/wp-blog-rewrites.ts`.

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm build` | Production build + `sync-tracked-pages` postbuild |
| `pnpm upload:images` | Bulk upload to Supabase `site-assets/images/` |

## Launch checklist

1. Vercel env: Supabase keys, `NEXT_PUBLIC_SITE_URL`, Resend + contact vars, shared admin API keys.
2. Resend: verify sender domain for `CONTACT_FROM_EMAIL`.
3. Supabase: apply migrations under `supabase/migrations/`; deploy edge functions; seed `admin_users`.
4. DNS: point apex + `www` at Vercel; keep WP briefly for rollback.
5. Post-cutover: test forms, CallRail swap, GSC, sitemap.
