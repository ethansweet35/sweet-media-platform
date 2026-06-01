-- =========================================================
-- Marketing Reporting — channel_metrics + report_shares
--
-- Powers the unified marketing dashboard (admin) and the
-- tokenized public client report at /report/[token].
--
-- channel_metrics: normalized time-series store populated by
--   scheduled ingest (native PageSpeed + Windsor.ai connectors
--   for Google Ads / Meta / GMB). Read by both the admin
--   dashboard and the public report. Metric names are kept
--   identical across brands so a future agency roll-up can
--   aggregate cleanly.
--
-- report_shares: tokenized, read-only public report links an
--   admin can create and share with a client. Public access is
--   served by a service-role server route keyed on `token`, so
--   no anon RLS policy is granted on either table.
--
-- Idempotent: safe to run multiple times and on existing brands.
-- =========================================================

create extension if not exists "pgcrypto";

-- ─── channel_metrics ──────────────────────────────────────────────────────────
create table if not exists public.channel_metrics (
  id uuid primary key default gen_random_uuid(),
  -- 'gsc' | 'psi' | 'ga4' | 'gmb' | 'ads' | 'callrail'
  channel text not null,
  -- e.g. 'clicks','impressions','spend','conversions','sessions',
  --      'performance','lcp_ms','cls','inp_ms','views','calls'
  metric text not null,
  metric_date date not null,
  value numeric not null default 0,
  -- free-form breakdown (url, strategy, source, account_name, ...)
  dimensions jsonb not null default '{}'::jsonb,
  -- stable string form of `dimensions` used for idempotent upserts
  -- (supabase-js upsert needs concrete conflict columns, not an expression)
  dim_key text not null default '',
  ingested_at timestamptz not null default now(),
  constraint channel_metrics_unique unique (channel, metric, metric_date, dim_key)
);

create index if not exists channel_metrics_channel_date_idx
  on public.channel_metrics (channel, metric_date desc);

create index if not exists channel_metrics_channel_metric_idx
  on public.channel_metrics (channel, metric, metric_date desc);

alter table public.channel_metrics enable row level security;

drop policy if exists "Admins can manage channel metrics" on public.channel_metrics;
create policy "Admins can manage channel metrics"
on public.channel_metrics
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

-- ─── report_shares ────────────────────────────────────────────────────────────
create table if not exists public.report_shares (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  label text not null default 'Client report',
  period_days integer not null default 28,
  is_active boolean not null default true,
  created_by text,
  last_viewed_at timestamptz,
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists report_shares_active_idx
  on public.report_shares (is_active, created_at desc);

alter table public.report_shares enable row level security;

-- Only admins manage shares. Public report rendering uses the service role
-- (server-side, keyed on token) and therefore bypasses RLS — there is
-- intentionally no anon SELECT policy here.
drop policy if exists "Admins can manage report shares" on public.report_shares;
create policy "Admins can manage report shares"
on public.report_shares
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

create or replace function public.tg_report_shares_updated_at()
returns trigger language plpgsql as $fn$
begin
  new.updated_at = now();
  return new;
end;
$fn$;

drop trigger if exists report_shares_updated_at on public.report_shares;
create trigger report_shares_updated_at
  before update on public.report_shares
  for each row execute function public.tg_report_shares_updated_at();

-- ─── marketing config keys (system_settings) ──────────────────────────────────
-- Per-brand connector config is stored in system_settings (jsonb), same pattern
-- as the Google Search Console OAuth tokens. Seeded as empty so the admin UI can
-- populate them. Keys used by the ingest pipeline / report builder:
--   marketing_psi_urls           : ["https://brand.com/", "https://brand.com/contact"]
--   marketing_windsor_accounts   : { "google_ads": "...", "facebook": "...",
--                                     "google_my_business": "...", "searchconsole": "..." }
insert into public.system_settings (key, value)
values
  ('marketing_psi_urls', '[]'::jsonb),
  ('marketing_windsor_accounts', '{}'::jsonb)
on conflict (key) do nothing;
