-- Live page snapshots for Content Editor page mode (scan-live / score against brief).

create table if not exists public.tracked_page_live_snapshots (
  id uuid primary key default gen_random_uuid(),
  tracked_page_id uuid not null references public.tracked_pages (id) on delete cascade,
  fetched_at timestamptz not null default now(),
  status_code int,
  url text not null,
  plaintext text,
  headings jsonb,
  word_count int,
  computed_content_score numeric(5,2),
  computed_coverage_score numeric(5,2),
  computed_frequency_score numeric(5,2),
  computed_placement_score numeric(5,2),
  computed_seo_score numeric(5,2),
  computed_eeat_score numeric(5,2),
  fetch_error text,
  scored_against_editor_id uuid references public.content_editors (id) on delete set null
);

create index if not exists tracked_page_live_snapshots_page_idx
  on public.tracked_page_live_snapshots (tracked_page_id, fetched_at desc);

create index if not exists tracked_page_live_snapshots_editor_idx
  on public.tracked_page_live_snapshots (scored_against_editor_id, fetched_at desc);

alter table public.tracked_page_live_snapshots enable row level security;

drop policy if exists "Admins can manage tracked_page_live_snapshots" on public.tracked_page_live_snapshots;
create policy "Admins can manage tracked_page_live_snapshots" on public.tracked_page_live_snapshots
  for all to authenticated
  using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
  with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
