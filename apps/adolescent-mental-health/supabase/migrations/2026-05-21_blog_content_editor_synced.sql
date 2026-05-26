-- Track when a blog post last received the Content Editor draft (for sync status in admin).
alter table public.blog_posts
  add column if not exists content_editor_synced_at timestamptz;
