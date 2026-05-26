-- SEO change timeline: audit log for tracked pages and blog posts (admin).

create table if not exists public.content_change_log (
  id uuid primary key default gen_random_uuid(),
  site_id text not null default '',
  entity_type text not null check (entity_type in ('page', 'blog')),
  entity_id text not null,
  route_path text not null default '',
  field_key text not null,
  field_label text not null,
  summary text not null,
  old_value text,
  new_value text,
  changed_by text,
  created_at timestamptz not null default now()
);

create index if not exists content_change_log_entity_idx
  on public.content_change_log (entity_type, entity_id, created_at desc);

create index if not exists content_change_log_site_route_idx
  on public.content_change_log (site_id, route_path);

alter table public.content_change_log enable row level security;

drop policy if exists "Admins can read content change log" on public.content_change_log;
create policy "Admins can read content change log"
on public.content_change_log
for select
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where lower(au.email) = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Admins can insert content change log" on public.content_change_log;
create policy "Admins can insert content change log"
on public.content_change_log
for insert
to authenticated
with check (
  exists (
    select 1 from public.admin_users au
    where lower(au.email) = lower(auth.jwt() ->> 'email')
  )
);
