-- tracked_page_content_blocks
--
-- DB-backed body content for tracked pages. Renders via the
-- <TrackedPageBody trackedPagePath="/route" /> server component from
-- @sweetmedia/admin-core. AI Auto-Optimize writes 'pending' blocks here
-- for admin review; applying them flips status to 'active' and triggers
-- revalidatePath on the route so the page updates immediately.
--
-- Idempotent. Safe to re-run.

create table if not exists public.tracked_page_content_blocks (
  id uuid primary key default gen_random_uuid(),
  tracked_page_id uuid not null references public.tracked_pages(id) on delete cascade,
  editor_id uuid references public.content_editors(id) on delete set null,

  position int not null default 0,

  block_type text not null,
  heading text,
  body_markdown text,
  list_items jsonb,
  callout_variant text,
  stats jsonb,
  table_headers jsonb,
  table_rows jsonb,

  status text not null default 'pending',

  source text not null default 'manual',
  ai_rationale text,
  ai_target_heading text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  applied_at timestamptz
);

create index if not exists tracked_page_content_blocks_page_idx
  on public.tracked_page_content_blocks(tracked_page_id, status, position);
create index if not exists tracked_page_content_blocks_editor_idx
  on public.tracked_page_content_blocks(editor_id);
create index if not exists tracked_page_content_blocks_status_idx
  on public.tracked_page_content_blocks(status);

create or replace function public.tg_tracked_page_content_blocks_updated_at()
returns trigger language plpgsql as $fn$
begin
  new.updated_at = now();
  return new;
end;
$fn$;

drop trigger if exists tracked_page_content_blocks_updated_at on public.tracked_page_content_blocks;
create trigger tracked_page_content_blocks_updated_at
  before update on public.tracked_page_content_blocks
  for each row execute function public.tg_tracked_page_content_blocks_updated_at();

alter table public.tracked_page_content_blocks enable row level security;

drop policy if exists "Anon can read active page content blocks" on public.tracked_page_content_blocks;
create policy "Anon can read active page content blocks" on public.tracked_page_content_blocks
  for select to anon using (status = 'active');

drop policy if exists "Admins can manage tracked_page_content_blocks" on public.tracked_page_content_blocks;
create policy "Admins can manage tracked_page_content_blocks" on public.tracked_page_content_blocks
  for all to authenticated
  using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
  with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
