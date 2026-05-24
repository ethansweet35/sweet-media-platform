-- Allow field_type = 'icon' for inline page editor (Remix icon or custom image JSON).

alter table public.page_content_overrides
  drop constraint if exists page_content_overrides_field_type_check;

alter table public.page_content_overrides
  add constraint page_content_overrides_field_type_check
  check (field_type in ('text', 'rich_text', 'image', 'icon'));
