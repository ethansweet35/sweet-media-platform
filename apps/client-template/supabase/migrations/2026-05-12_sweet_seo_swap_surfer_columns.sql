-- Swap Surfer SEO row linkage for Sweet SEO brief linkage.
--
-- Adds `seo_brief_id` (FK -> seo_briefs) and `seo_guidance_applied` to both
-- `blog_posts` and `tracked_pages`. The legacy `surfer_*` columns are left in
-- place for now (zero-cost, no data loss); they can be dropped in a future
-- migration once nothing references them.
--
-- Apply to every brand Supabase project. Idempotent.

alter table public.blog_posts
  add column if not exists seo_brief_id uuid references public.seo_briefs(id) on delete set null,
  add column if not exists seo_guidance_applied boolean not null default false;

alter table public.tracked_pages
  add column if not exists seo_brief_id uuid references public.seo_briefs(id) on delete set null,
  add column if not exists seo_guidance_applied boolean not null default false;

create index if not exists blog_posts_seo_brief_idx on public.blog_posts(seo_brief_id);
create index if not exists tracked_pages_seo_brief_idx on public.tracked_pages(seo_brief_id);
