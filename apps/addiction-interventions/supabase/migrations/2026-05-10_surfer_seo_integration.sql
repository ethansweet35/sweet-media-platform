-- Surfer SEO Integration — adds columns for Surfer Audit + Content Editor tracking
-- to both blog_posts and tracked_pages.
--
-- Run this in the Northbound Treatment Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ahufsygjwpbymomfdazb/sql
--
-- Idempotent (uses if not exists).

alter table public.blog_posts
  add column if not exists surfer_content_editor_id bigint,
  add column if not exists surfer_permalink_hash text,
  add column if not exists surfer_audit_id bigint,
  add column if not exists surfer_audit_state text,
  add column if not exists surfer_content_score integer,
  add column if not exists surfer_score_updated_at timestamptz,
  add column if not exists surfer_last_error text,
  add column if not exists surfer_guidance_applied boolean not null default false,
  add column if not exists published_url text;

create index if not exists blog_posts_surfer_score_updated_idx
  on public.blog_posts(surfer_score_updated_at);

create index if not exists blog_posts_surfer_audit_state_idx
  on public.blog_posts(surfer_audit_state)
  where surfer_audit_state is not null;

alter table public.tracked_pages
  add column if not exists surfer_content_editor_id bigint,
  add column if not exists surfer_permalink_hash text,
  add column if not exists surfer_audit_id bigint,
  add column if not exists surfer_audit_state text,
  add column if not exists surfer_content_score integer,
  add column if not exists surfer_score_updated_at timestamptz,
  add column if not exists surfer_last_error text,
  add column if not exists surfer_guidance_applied boolean not null default false,
  add column if not exists published_url text;

create index if not exists tracked_pages_surfer_score_updated_idx
  on public.tracked_pages(surfer_score_updated_at);

create index if not exists tracked_pages_surfer_audit_state_idx
  on public.tracked_pages(surfer_audit_state)
  where surfer_audit_state is not null;
