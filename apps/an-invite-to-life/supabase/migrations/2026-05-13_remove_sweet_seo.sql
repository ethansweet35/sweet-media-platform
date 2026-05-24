-- Remove the Sweet SEO feature.
--
-- The Sweet SEO content brief was superseded by the Content Editor (which
-- ships its own brief generation, scoring, and PR-based application flow).
-- This migration:
--   1. Drops the FKs from blog_posts/tracked_pages -> seo_briefs.
--   2. Drops the seo_brief_id and seo_guidance_applied columns from both tables.
--   3. Drops the seo_briefs table itself.
--
-- Apply to every brand Supabase project. Idempotent.

-- Drop FKs first (these were named in 2026-05-12_swap_surfer_for_sweet_seo.sql).
alter table if exists public.blog_posts drop constraint if exists blog_posts_seo_brief_id_fkey;
alter table if exists public.tracked_pages drop constraint if exists tracked_pages_seo_brief_id_fkey;

drop index if exists public.blog_posts_seo_brief_idx;
drop index if exists public.tracked_pages_seo_brief_idx;

alter table if exists public.blog_posts
  drop column if exists seo_brief_id,
  drop column if exists seo_guidance_applied;

alter table if exists public.tracked_pages
  drop column if exists seo_brief_id,
  drop column if exists seo_guidance_applied;

drop table if exists public.seo_briefs;
