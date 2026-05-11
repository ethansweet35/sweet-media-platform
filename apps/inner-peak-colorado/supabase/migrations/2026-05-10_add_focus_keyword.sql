-- Add focus_keyword column to blog_posts for Surfer SEO integration
alter table public.blog_posts add column if not exists focus_keyword text;
