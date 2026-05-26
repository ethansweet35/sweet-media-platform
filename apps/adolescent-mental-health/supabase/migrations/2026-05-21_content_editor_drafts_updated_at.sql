-- content_editor_drafts.updated_at — required by admin-core list/brief queries.
-- Older content_editor_schema migrations only had created_at.

alter table public.content_editor_drafts
  add column if not exists updated_at timestamptz not null default now();

create index if not exists content_editor_drafts_updated_at_idx
  on public.content_editor_drafts (updated_at desc);
