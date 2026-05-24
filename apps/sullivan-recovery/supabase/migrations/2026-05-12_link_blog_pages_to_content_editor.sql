-- Step 8 — link blog posts and tracked pages to content editors.
--
-- Adds `content_editor_id uuid` to both blog_posts and tracked_pages so the
-- new "Brief" button (now backed by the Content Editor pipeline) can link
-- an existing post/page to its analysis row.
--
-- The legacy `seo_brief_id` column stays in place for backwards-compat;
-- old Sweet SEO briefs remain accessible via /admin/sweet-seo.
--
-- Apply to every brand Supabase project. Idempotent.

alter table public.blog_posts
  add column if not exists content_editor_id uuid;

create index if not exists blog_posts_content_editor_idx
  on public.blog_posts(content_editor_id);

alter table public.tracked_pages
  add column if not exists content_editor_id uuid;

create index if not exists tracked_pages_content_editor_idx
  on public.tracked_pages(content_editor_id);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'blog_posts_content_editor_id_fkey'
  ) then
    alter table public.blog_posts
      add constraint blog_posts_content_editor_id_fkey
      foreign key (content_editor_id) references public.content_editors(id) on delete set null;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'tracked_pages_content_editor_id_fkey'
  ) then
    alter table public.tracked_pages
      add constraint tracked_pages_content_editor_id_fkey
      foreign key (content_editor_id) references public.content_editors(id) on delete set null;
  end if;
end $$;
