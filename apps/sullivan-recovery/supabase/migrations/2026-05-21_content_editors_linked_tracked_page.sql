-- Page-mode Content Editor: link an editor row to a tracked_pages row.
-- Present in client-template-schema.sql but omitted from early content_editor migrations.

alter table public.content_editors
  add column if not exists linked_tracked_page_id uuid;

create index if not exists content_editors_linked_tracked_page_idx
  on public.content_editors (linked_tracked_page_id);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'content_editors_linked_tracked_page_id_fkey'
  ) then
    alter table public.content_editors
      add constraint content_editors_linked_tracked_page_id_fkey
      foreign key (linked_tracked_page_id) references public.tracked_pages (id) on delete set null;
  end if;
end $$;
