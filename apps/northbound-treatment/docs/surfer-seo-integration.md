# Surfer SEO Integration — Northbound Pilot

This doc captures the pilot rollout of the Surfer SEO content-score
+ Content-Editor integration for `apps/northbound-treatment`. Once verified,
roll out to the other client apps using the same recipe.

## What it does

- Adds a **Content Score** column on `/admin/blogs` and `/admin/pages`,
  showing the live Surfer score for each post or page.
- Adds **"Linked"** indicator + **"Create Content Editor"** button per row.
- Adds a **"Applied"** checkbox the writer ticks once the page has been
  rewritten using Surfer's recommendations.
- Adds a **Refresh Surfer** button on both list views and a per-row refresh.
- Adds a **weekly Vercel Cron** that re-audits any row older than 24 h.
- Adds a Surfer summary card on `/admin` (avg score, linked count, applied
  count, count of un-linked active rows).

## Vercel env vars (per project)

Already present (from existing infra):
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Add these for Surfer:

| Name | Scope | Value |
|---|---|---|
| `SURFER_API_KEY` | Production + Preview | Surfer Enterprise API key (already added) |
| `SURFER_PROJECT_ID` | Production + Preview | `1335670` (Northbound's Surfer project) |
| `NEXT_PUBLIC_BLOG_PATH_BASE` | Production + Preview | `/blog` (omit if default) |
| `CRON_SECRET` | Production | `openssl rand -hex 32` — required to authorize the weekly cron |

> The `SURFER_API_KEY` is **server-only**. Never expose it via a `NEXT_PUBLIC_` var.

## Supabase migration

Apply once per brand. SQL lives at:

```
apps/northbound-treatment/supabase/migrations/2026-05-10_surfer_seo_integration.sql
```

Run it in the Supabase SQL Editor for `ahufsygjwpbymomfdazb`:
https://supabase.com/dashboard/project/ahufsygjwpbymomfdazb/sql

Adds 9 columns to both `blog_posts` and `tracked_pages`:
- `surfer_content_editor_id` (bigint)
- `surfer_permalink_hash` (text)
- `surfer_audit_id` (bigint)
- `surfer_audit_state` (text — `scheduled` | `completed` | `error`)
- `surfer_content_score` (int)
- `surfer_score_updated_at` (timestamptz)
- `surfer_last_error` (text)
- `surfer_guidance_applied` (bool)
- `published_url` (text — optional URL override sent to Surfer)

## Vercel Cron

The weekly cron is wired in `apps/northbound-treatment/vercel.json`:

```json
{
  "crons": [
    { "path": "/api/admin/surfer/refresh-stale", "schedule": "0 4 * * 0" }
  ]
}
```

Runs every Sunday at 04:00 UTC. The route checks
`Authorization: Bearer ${CRON_SECRET}` — Vercel attaches this header
automatically when `CRON_SECRET` is set in the project's env.

## API routes

All under `apps/northbound-treatment/src/app/api/admin/surfer/`:

| Method | Path | Body | What it does |
|---|---|---|---|
| POST | `/audit` | `{ kind, id }` | Kicks a fresh Surfer audit for the row's URL |
| POST | `/audit` | `{ kind, id, poll: true }` | Polls the in-flight audit, persists score on completion |
| POST | `/content-editor` | `{ kind, id, keyword? }` | Creates a Surfer Content Editor for the row |
| POST | `/refresh-stale` | `{ max_age_ms? }` | Bulk-refreshes any row older than `max_age_ms` (default 24 h) |
| GET | `/refresh-stale` | (cron) | Same, but expects `Authorization: Bearer ${CRON_SECRET}` |

`kind` is `"blog"` or `"page"`. `id` is the row's UUID.

## Rolling out to other client apps

After the pilot verification, repeat for each app:

1. **Vercel**: add the 4 env vars (`SURFER_API_KEY`, `SURFER_PROJECT_ID`,
   optional `NEXT_PUBLIC_BLOG_PATH_BASE`, `CRON_SECRET`). The project ID is
   per-brand.
2. **Supabase**: run the migration SQL in that brand's SQL editor.
3. **Code**: copy the API route folder (`src/app/api/admin/surfer/`) and the
   `vercel.json` cron entry into each client app. (Identical code; the routes
   only depend on the per-app env vars + admin-core's shared library.)
4. **Deploy**: push.

The `packages/admin-core` UI changes apply automatically to every app once
they bump their dependency (it's a workspace package).
