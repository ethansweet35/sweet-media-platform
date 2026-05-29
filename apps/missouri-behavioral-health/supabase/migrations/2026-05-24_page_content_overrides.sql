-- Page content overrides: per-field text/image overrides that power the
-- inline page editor. Each row maps one editable slot on a page to either
-- a pending draft value or a live published value. Public site reads the
-- published value; admins in edit mode read draft first, then published,
-- then the in-code default.

create table if not exists public.page_content_overrides (
  id uuid primary key default gen_random_uuid(),
  site_key text not null default '',
  route_path text not null,
  field_key text not null,
  field_type text not null check (field_type in ('text', 'rich_text', 'image', 'icon')),
  draft_value text,
  published_value text,
  draft_updated_at timestamptz,
  published_at timestamptz,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint page_content_overrides_route_field_unique unique (route_path, field_key)
);

create index if not exists page_content_overrides_route_idx
  on public.page_content_overrides (route_path);

create index if not exists page_content_overrides_site_route_idx
  on public.page_content_overrides (site_key, route_path);

alter table public.page_content_overrides enable row level security;

-- Public visitors only see rows that have actually been published.
drop policy if exists "Public can read published page content" on public.page_content_overrides;
create policy "Public can read published page content"
on public.page_content_overrides
for select
to anon, authenticated
using (published_value is not null);

-- Admins can read and write everything (drafts + published).
drop policy if exists "Admins can manage page content overrides" on public.page_content_overrides;
create policy "Admins can manage page content overrides"
on public.page_content_overrides
for all
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where lower(au.email) = lower(auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.admin_users au
    where lower(au.email) = lower(auth.jwt() ->> 'email')
  )
);

create or replace function public.tg_page_content_overrides_updated_at()
returns trigger language plpgsql as $fn$
begin
  new.updated_at = now();
  return new;
end;
$fn$;

drop trigger if exists page_content_overrides_updated_at on public.page_content_overrides;
create trigger page_content_overrides_updated_at
  before update on public.page_content_overrides
  for each row execute function public.tg_page_content_overrides_updated_at();
