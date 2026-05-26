-- Link calendar queue rows to a Content Editor brief (sync draft → blog, no AI regen).

alter table public.blog_queue
  add column if not exists content_editor_id uuid references public.content_editors(id) on delete set null;

create index if not exists blog_queue_content_editor_id_idx
  on public.blog_queue (content_editor_id)
  where content_editor_id is not null;
