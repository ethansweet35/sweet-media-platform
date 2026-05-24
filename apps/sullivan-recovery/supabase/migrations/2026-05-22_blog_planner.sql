-- Blog Planner: hub pages, topic ideas, and retroactive hub links.

alter table public.tracked_pages
  add column if not exists is_blog_hub boolean not null default false;

alter table public.tracked_pages
  add column if not exists is_blog_hub_misc boolean not null default false;

alter table public.tracked_pages
  add column if not exists blog_hub_target_count integer;

create table if not exists public.blog_planner_items (
  id uuid primary key default gen_random_uuid(),
  hub_tracked_page_id uuid not null references public.tracked_pages(id) on delete cascade,
  source text not null check (source in ('semrush', 'ai', 'manual')),
  primary_keyword text not null,
  suggested_title text not null default '',
  suggested_meta_description text,
  suggested_h1 text,
  search_volume integer,
  keyword_difficulty integer,
  cpc numeric(10,2),
  status text not null default 'idea' check (status in ('idea', 'content_editor', 'published', 'dismissed')),
  content_editor_id uuid references public.content_editors(id) on delete set null,
  blog_post_id uuid references public.blog_posts(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists blog_planner_items_hub_keyword_uidx
  on public.blog_planner_items (hub_tracked_page_id, lower(primary_keyword));

create index if not exists blog_planner_items_hub_status_idx
  on public.blog_planner_items (hub_tracked_page_id, status);

create index if not exists blog_planner_items_editor_idx
  on public.blog_planner_items (content_editor_id);

create table if not exists public.blog_planner_hub_links (
  id uuid primary key default gen_random_uuid(),
  hub_tracked_page_id uuid not null references public.tracked_pages(id) on delete cascade,
  content_editor_id uuid references public.content_editors(id) on delete cascade,
  blog_post_id uuid references public.blog_posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint blog_planner_hub_links_target_check check (
    (content_editor_id is not null and blog_post_id is null)
    or (content_editor_id is null and blog_post_id is not null)
  )
);

create unique index if not exists blog_planner_hub_links_hub_editor_uidx
  on public.blog_planner_hub_links (hub_tracked_page_id, content_editor_id)
  where content_editor_id is not null;

create unique index if not exists blog_planner_hub_links_hub_blog_uidx
  on public.blog_planner_hub_links (hub_tracked_page_id, blog_post_id)
  where blog_post_id is not null;

alter table public.blog_planner_items enable row level security;
alter table public.blog_planner_hub_links enable row level security;

drop policy if exists "Admins can manage blog planner items" on public.blog_planner_items;
create policy "Admins can manage blog planner items"
on public.blog_planner_items
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage blog planner hub links" on public.blog_planner_hub_links;
create policy "Admins can manage blog planner hub links"
on public.blog_planner_hub_links
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
