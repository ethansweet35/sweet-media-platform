-- Extend brand_settings with social, accreditation, licensing, and location fields.
-- All columns are nullable so existing rows continue to load without backfill.

alter table public.brand_settings
  add column if not exists social_facebook    text,
  add column if not exists social_instagram   text,
  add column if not exists social_linkedin    text,
  add column if not exists social_twitter     text,
  add column if not exists accreditations     jsonb default '[]'::jsonb,
  add column if not exists insurance_accepted jsonb default '[]'::jsonb,
  add column if not exists levels_of_care     jsonb default '[]'::jsonb,
  add column if not exists license_number     text,
  add column if not exists license_authority  text,
  add column if not exists founded_year       integer,
  add column if not exists street_address     text,
  add column if not exists city               text,
  add column if not exists state              text,
  add column if not exists zip                text,
  add column if not exists phone              text,
  add column if not exists latitude           numeric(10,7),
  add column if not exists longitude          numeric(10,7),
  add column if not exists business_hours     jsonb default '[]'::jsonb;
