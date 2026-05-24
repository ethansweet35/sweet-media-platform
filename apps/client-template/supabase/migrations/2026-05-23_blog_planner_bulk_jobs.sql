-- Background bulk Content Editor creation for Blog Planner.

create table if not exists public.blog_planner_bulk_jobs (
  id uuid primary key default gen_random_uuid(),
  hub_tracked_page_id uuid references public.tracked_pages(id) on delete set null,
  status text not null default 'running' check (status in ('running', 'completed', 'cancelled')),
  item_ids uuid[] not null default '{}',
  total integer not null default 0,
  completed integer not null default 0,
  current_keyword text,
  logs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_planner_bulk_jobs_status_idx
  on public.blog_planner_bulk_jobs (status, created_at desc);

alter table public.blog_planner_bulk_jobs enable row level security;

drop policy if exists "Admins can manage blog planner bulk jobs" on public.blog_planner_bulk_jobs;
create policy "Admins can manage blog planner bulk jobs"
on public.blog_planner_bulk_jobs
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
