-- Add schema_phone — a static, tracking-free phone number for use in
-- structured data (JSON-LD schema.org). Kept separate from `phone` so
-- CallRail DNI or other frontend number-swapping never pollutes the
-- schema output that Google and other crawlers read server-side.
-- Falls back to `phone` in the seo-schema builders when null.

alter table public.brand_settings
  add column if not exists schema_phone text;
