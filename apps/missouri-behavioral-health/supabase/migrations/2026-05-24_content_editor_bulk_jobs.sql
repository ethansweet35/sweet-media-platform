-- Background bulk Content Editor creation from the Editors list.

create table if not exists public.content_editor_bulk_jobs (
  id uuid primary key default gen_random_uuid(),
  publish_target text not null check (publish_target in ('blog', 'page')),
  analysis_mode text not null default 'lite' check (analysis_mode in ('lite', 'deep')),
  status text not null default 'running' check (status in ('running', 'completed', 'cancelled')),
  items jsonb not null default '[]'::jsonb,
  total integer not null default 0,
  completed integer not null default 0,
  current_keyword text,
  logs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_editor_bulk_jobs_status_idx
  on public.content_editor_bulk_jobs (status, created_at desc);

alter table public.content_editor_bulk_jobs enable row level security;

drop policy if exists "Admins can manage content editor bulk jobs" on public.content_editor_bulk_jobs;
create policy "Admins can manage content editor bulk jobs"
on public.content_editor_bulk_jobs
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
