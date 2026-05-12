-- Sweet SEO — content brief table.
-- Stores AI-generated SEO research briefs (keyword analysis of top-ranking
-- competitor content) and the user's working draft for that brief.
--
-- Apply to every brand Supabase project. Idempotent.

create extension if not exists "pgcrypto";

create table if not exists public.seo_briefs (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  country text not null default 'US',
  status text not null default 'pending',
  model text,
  content_structure jsonb,
  important_terms jsonb,
  questions jsonb,
  facts jsonb,
  citations jsonb,
  notes text,
  draft_content text not null default '',
  error_message text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists seo_briefs_created_at_idx
  on public.seo_briefs(created_at desc);

create index if not exists seo_briefs_status_idx
  on public.seo_briefs(status);

create index if not exists seo_briefs_keyword_idx
  on public.seo_briefs(lower(keyword));

alter table public.seo_briefs enable row level security;

drop policy if exists "Admins can manage seo briefs" on public.seo_briefs;
create policy "Admins can manage seo briefs"
on public.seo_briefs
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

-- Status values: 'pending' | 'processing' | 'ready' | 'error'.
-- content_structure shape:
--   { characters: {min, max}, images: {min, max}, headings: {min, max},
--     paragraphs: {min, max|null}, words: {min, max} }
-- important_terms shape: [{ term, min, max }]
-- questions shape: string[]
-- facts shape: [{ topic, points: string[] }]
-- citations shape: [{ url, title }]
