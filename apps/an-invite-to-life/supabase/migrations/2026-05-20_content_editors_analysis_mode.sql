-- Content Editor: persist analysis mode (lite = fast/cheaper, deep = full pipeline).
alter table public.content_editors
  add column if not exists analysis_mode text not null default 'lite'
  check (analysis_mode in ('lite', 'deep'));
