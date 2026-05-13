-- Client Template Supabase Schema
-- Run this in the new client Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admin users can read own admin row" on public.admin_users;
create policy "Admin users can read own admin row"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

-- Seed admin user after replacing email:
-- insert into public.admin_users (email, role) values ('YOUR_EMAIL@example.com', 'admin') on conflict (email) do update set role = excluded.role;

-- =========================================================
-- BRAND SETTINGS
-- =========================================================

create table if not exists public.brand_settings (
  id uuid primary key default gen_random_uuid(),
  site_key text not null default 'client-template',
  site_name text not null default 'Client Brand',
  site_url text not null default 'https://example.com',
  primary_color text not null default '#1F2937',
  secondary_color text not null default '#334155',
  accent_color text not null default '#2563EB',
  background_color text not null default '#F8FAFC',
  heading_font text not null default 'Inter',
  body_font text not null default 'Inter',
  tone text not null default 'clear, trustworthy, professional, warm, conversion-focused',
  audience text not null default 'the client ideal audience',
  author_name text not null default 'Client Brand',
  author_title text not null default 'Client Team',
  author_bio text not null default 'Helpful educational resources from the Client Brand team.',
  blog_categories jsonb not null default '["Company News","Education","Resources","Guides"]'::jsonb,
  cta_heading text not null default 'Ready to get started?',
  cta_body text not null default 'Contact our team today to learn more.',
  cta_button_label text not null default 'Contact Us',
  cta_button_url text not null default '/contact',
  image_bucket text not null default 'site-assets',
  image_folder text not null default 'blog-featured',
  image_style_prompt text,
  image_negative_prompt text,
  social_facebook text,
  social_instagram text,
  social_linkedin text,
  social_twitter text,
  accreditations jsonb default '[]'::jsonb,
  insurance_accepted jsonb default '[]'::jsonb,
  levels_of_care jsonb default '[]'::jsonb,
  license_number text,
  license_authority text,
  founded_year integer,
  street_address text,
  city text,
  state text,
  zip text,
  phone text,
  schema_phone text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  business_hours jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists brand_settings_site_key_unique
on public.brand_settings(site_key)
where site_key is not null;

alter table public.brand_settings enable row level security;

drop policy if exists "Public can read brand settings" on public.brand_settings;
create policy "Public can read brand settings"
on public.brand_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage brand settings" on public.brand_settings;
create policy "Admins can manage brand settings"
on public.brand_settings
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

insert into public.brand_settings (
  site_key,
  site_name,
  site_url,
  image_bucket,
  image_folder,
  image_style_prompt,
  image_negative_prompt
)
values (
  'client-template',
  'Client Brand',
  'https://example.com',
  'site-assets',
  'blog-featured',
  'Create a clean, professional editorial blog featured image aligned with the client brand. Use the client color palette, calm composition, premium lighting, and visually relevant abstract or lifestyle imagery. Avoid generic stock-photo styling.',
  'No logos, no watermarks, no distorted text, no cluttered layouts, no cheesy stock-photo look.'
)
on conflict (site_key) do update
set
  site_name = excluded.site_name,
  site_url = excluded.site_url,
  image_bucket = excluded.image_bucket,
  image_folder = excluded.image_folder,
  image_style_prompt = excluded.image_style_prompt,
  image_negative_prompt = excluded.image_negative_prompt,
  updated_at = now();

-- =========================================================
-- BLOG CATEGORIES
-- =========================================================

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  name text not null,
  slug text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint blog_categories_site_slug_unique unique (site_id, slug)
);

create index if not exists blog_categories_site_id_idx
on public.blog_categories(site_id);

create index if not exists blog_categories_active_idx
on public.blog_categories(site_id, is_active, sort_order);

alter table public.blog_categories enable row level security;

drop policy if exists "Public can read active blog categories" on public.blog_categories;
create policy "Public can read active blog categories"
on public.blog_categories
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Admins can manage blog categories" on public.blog_categories;
create policy "Admins can manage blog categories"
on public.blog_categories
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

insert into public.blog_categories (site_id, name, slug, sort_order)
values
  ('client-template', 'Company News', 'company-news', 10),
  ('client-template', 'Education', 'education', 20),
  ('client-template', 'Resources', 'resources', 30),
  ('client-template', 'Guides', 'guides', 40)
on conflict (site_id, slug) do update
set
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = now();

-- =========================================================
-- BLOG POSTS
-- =========================================================

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  status text not null default 'draft',
  category text,
  category_id uuid,
  author text,
  author_title text,
  author_bio text,
  author_photo text,
  hero_image_url text,
  featured_image_url text,
  read_time text,
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  meta_title text,
  meta_description text,
  focus_keyword text,
  tags text[],
  published_at timestamptz,
  scheduled_publish_at timestamptz,
  approved_for_publish boolean not null default false,
  -- Legacy Surfer columns — superseded by seo_brief_id (Sweet SEO). Kept for
  -- backward compatibility; safe to drop in a future migration.
  surfer_content_editor_id bigint,
  surfer_permalink_hash text,
  surfer_audit_id bigint,
  surfer_audit_state text,
  surfer_content_score integer,
  surfer_score_updated_at timestamptz,
  surfer_last_error text,
  surfer_guidance_applied boolean not null default false,
  published_url text,
  -- Sweet SEO integration (see migrations/2026-05-12_swap_surfer_for_sweet_seo.sql).
  -- FK to seo_briefs is added at the bottom of this file, after seo_briefs exists.
  seo_brief_id uuid,
  seo_guidance_applied boolean not null default false,
  -- Content Editor integration (see migrations/2026-05-12_link_blog_pages_to_content_editor.sql).
  -- FK to content_editors is added at the bottom of this file.
  content_editor_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_seo_brief_idx on public.blog_posts(seo_brief_id);
create index if not exists blog_posts_content_editor_idx on public.blog_posts(content_editor_id);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admins can manage blog posts" on public.blog_posts;
create policy "Admins can manage blog posts"
on public.blog_posts
for all
to authenticated
using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

-- =========================================================
-- BLOG QUEUE
-- =========================================================

create table if not exists public.blog_queue (
  id uuid primary key default gen_random_uuid(),
  primary_keyword text not null default '',
  blog_title text not null default '',
  url_slug text not null default '',
  writing_guidelines text,
  status text not null default 'pending',
  model_id text,
  batch_model_id text,
  generated_post_id uuid references public.blog_posts(id) on delete set null,
  error_message text,
  scheduled_publish_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text,
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.internal_links (
  id uuid primary key default gen_random_uuid(),
  keyword text not null default '',
  href text not null default '',
  priority integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tracked_pages (
  id uuid primary key default gen_random_uuid(),
  route_path text not null unique,
  page_title text not null default '',
  seo_title text,
  meta_description text,
  default_seo_title text,
  default_meta_description text,
  primary_keyword text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  notes text,
  -- Surfer SEO integration (see migrations/2026-05-10_surfer_seo_integration.sql)
  surfer_content_editor_id bigint,
  surfer_permalink_hash text,
  surfer_audit_id bigint,
  surfer_audit_state text,
  surfer_content_score integer,
  surfer_score_updated_at timestamptz,
  surfer_last_error text,
  surfer_guidance_applied boolean not null default false,
  published_url text,
  -- Sweet SEO integration. FK to seo_briefs is added at the bottom of this file.
  seo_brief_id uuid,
  seo_guidance_applied boolean not null default false,
  -- Content Editor integration. FK to content_editors is added at the bottom of this file.
  content_editor_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tracked_pages_seo_brief_idx on public.tracked_pages(seo_brief_id);
create index if not exists tracked_pages_content_editor_idx on public.tracked_pages(content_editor_id);

create table if not exists public.system_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Sweet SEO content briefs (see migrations/2026-05-12_sweet_seo_briefs.sql)
create table if not exists public.seo_briefs (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  country text not null default 'US',
  status text not null default 'pending',
  model text,
  content_structure jsonb,
  important_terms jsonb,
  questions jsonb,
  facts jsonb,
  citations jsonb,
  notes text,
  draft_content text not null default '',
  error_message text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists seo_briefs_created_at_idx on public.seo_briefs(created_at desc);
create index if not exists seo_briefs_status_idx on public.seo_briefs(status);
create index if not exists seo_briefs_keyword_idx on public.seo_briefs(lower(keyword));

-- Enable RLS on admin-managed tables
alter table public.blog_queue enable row level security;
alter table public.blog_knowledge_base enable row level security;
alter table public.internal_links enable row level security;
alter table public.tracked_pages enable row level security;
alter table public.system_settings enable row level security;
alter table public.seo_briefs enable row level security;

-- Admin policies for operational tables
drop policy if exists "Admins can manage blog queue" on public.blog_queue;
create policy "Admins can manage blog queue" on public.blog_queue for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage blog knowledge base" on public.blog_knowledge_base;
create policy "Admins can manage blog knowledge base" on public.blog_knowledge_base for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage internal links" on public.internal_links;
create policy "Admins can manage internal links" on public.internal_links for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Public can read active internal links" on public.internal_links;
create policy "Public can read active internal links" on public.internal_links for select to anon, authenticated using (active = true);

drop policy if exists "Admins can manage tracked pages" on public.tracked_pages;
create policy "Authenticated users can manage tracked pages" on public.tracked_pages for all to authenticated using (true) with check (true);

drop policy if exists "Admins can manage system settings" on public.system_settings;
create policy "Admins can manage system settings" on public.system_settings for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage seo briefs" on public.seo_briefs;
create policy "Admins can manage seo briefs" on public.seo_briefs for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

-- Wire up the FKs from blog_posts/tracked_pages.seo_brief_id -> seo_briefs.id
-- (declared as plain uuid above so the schema file can run top-to-bottom).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'blog_posts_seo_brief_id_fkey'
  ) then
    alter table public.blog_posts
      add constraint blog_posts_seo_brief_id_fkey
      foreign key (seo_brief_id) references public.seo_briefs(id) on delete set null;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'tracked_pages_seo_brief_id_fkey'
  ) then
    alter table public.tracked_pages
      add constraint tracked_pages_seo_brief_id_fkey
      foreign key (seo_brief_id) references public.seo_briefs(id) on delete set null;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'blog_posts_content_editor_id_fkey'
  ) then
    alter table public.blog_posts
      add constraint blog_posts_content_editor_id_fkey
      foreign key (content_editor_id) references public.content_editors(id) on delete set null;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'tracked_pages_content_editor_id_fkey'
  ) then
    alter table public.tracked_pages
      add constraint tracked_pages_content_editor_id_fkey
      foreign key (content_editor_id) references public.content_editors(id) on delete set null;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'content_editors_linked_tracked_page_id_fkey'
  ) then
    alter table public.content_editors
      add constraint content_editors_linked_tracked_page_id_fkey
      foreign key (linked_tracked_page_id) references public.tracked_pages(id) on delete set null;
  end if;
end $$;

-- =========================================================
-- CONTENT EDITOR (Surfer/Rankability-style content optimization)
-- See migrations/2026-05-12_content_editor_schema.sql for the full migration
-- with seed data and inline documentation. The block below is the structural
-- equivalent collapsed for the canonical schema file.
-- =========================================================

create extension if not exists vector;

create table if not exists public.content_editors (
  id uuid primary key default gen_random_uuid(),
  created_by uuid,
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  location_code int not null default 2840,
  language_code text not null default 'en',
  device text not null default 'desktop',
  competitor_pool_size int not null default 20,
  status text not null default 'pending',
  status_message text,
  error text,
  total_cost_usd numeric(10,4) not null default 0,
  blog_post_id text,                                    -- not FK: blog_posts.id type varies (text on sweet-media, uuid elsewhere)
  recommended_word_count_min int,
  recommended_word_count_max int,
  recommended_word_count_target int,
  recommended_h2_min int,
  recommended_h2_max int,
  recommended_h3_min int,
  recommended_h3_max int,
  recommended_image_min int,
  recommended_image_max int,
  recommended_paragraph_count_min int,
  recommended_paragraph_count_max int,
  competitor_avg_score numeric(5,2),
  target_score numeric(5,2),
  linked_tracked_page_id uuid,                          -- nullable FK to tracked_pages; set when editor is page-mode (added via ALTER below to break ordering cycle)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists content_editors_status_idx on public.content_editors(status);
create index if not exists content_editors_created_at_idx on public.content_editors(created_at desc);
create index if not exists content_editors_blog_post_idx on public.content_editors(blog_post_id);
create index if not exists content_editors_keyword_idx on public.content_editors(lower(primary_keyword));
create index if not exists content_editors_linked_tracked_page_idx on public.content_editors(linked_tracked_page_id);

create table if not exists public.content_editor_competitors (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,
  serp_position int not null,
  url text not null,
  domain text not null,
  title text,
  meta_description text,
  word_count int,
  h1_text text,
  h2_count int,
  h3_count int,
  paragraph_count int,
  image_count int,
  internal_link_count int,
  external_link_count int,
  raw_html_storage_key text,
  cleaned_text text,
  headings jsonb,
  individual_content_score numeric(5,2),
  included_in_benchmark boolean not null default true,
  fetch_status text not null default 'pending',
  fetch_error text,
  created_at timestamptz not null default now()
);

create index if not exists content_editor_competitors_editor_idx on public.content_editor_competitors(editor_id, serp_position);

create table if not exists public.content_editor_terms (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,
  term text not null,
  term_type text not null,
  entity_type text,
  relevance_score numeric(8,4) not null,
  avg_frequency numeric(8,4),
  min_recommended_uses int not null,
  max_recommended_uses int not null,
  target_uses int not null,
  competitor_coverage_pct numeric(5,2),
  is_heading_recommended boolean not null default false,
  is_primary_keyword boolean not null default false,
  user_blacklisted boolean not null default false,
  user_included boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists content_editor_terms_editor_relevance_idx on public.content_editor_terms(editor_id, relevance_score desc);
create index if not exists content_editor_terms_editor_term_idx on public.content_editor_terms(editor_id, lower(term));

create table if not exists public.content_editor_questions (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,
  question text not null,
  source text not null,
  recommended_position int,
  user_dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists content_editor_questions_editor_idx on public.content_editor_questions(editor_id);

create table if not exists public.content_editor_facts (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,
  fact_text text not null,
  source_url text not null,
  source_domain text not null,
  source_position int,
  source_count int not null default 1,
  embedding vector(1536),
  topic_cluster text,
  importance_score numeric(5,2),
  covered_in_draft boolean not null default false,
  user_dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists content_editor_facts_editor_idx on public.content_editor_facts(editor_id, importance_score desc);

create table if not exists public.content_editor_outlines (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,
  heading_level int not null,
  heading_text text not null,
  position int not null,
  source text,
  recommended_word_count int,
  created_at timestamptz not null default now()
);

create index if not exists content_editor_outlines_editor_idx on public.content_editor_outlines(editor_id, position);

create table if not exists public.content_editor_drafts (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,
  title_tag text,
  meta_description text,
  h1_text text,
  body_html text,
  body_plaintext text,
  body_markdown text,
  word_count int,
  computed_content_score numeric(5,2),
  computed_coverage_score numeric(5,2),
  computed_frequency_score numeric(5,2),
  computed_placement_score numeric(5,2),
  computed_seo_score numeric(5,2),
  computed_ai_search_score numeric(5,2),
  computed_eeat_score numeric(5,2),
  sentence_embeddings jsonb,
  is_current boolean not null default true,
  created_at timestamptz not null default now(),
  -- Bumped explicitly by saveDraft + scoreDraft so the brief workspace can
  -- detect content vs score updates (the row id stays stable across
  -- in-place updates so we use updated_at as the change signal instead).
  updated_at timestamptz not null default now()
);

create index if not exists content_editor_drafts_editor_idx on public.content_editor_drafts(editor_id, is_current);
create unique index if not exists content_editor_drafts_one_current_per_editor on public.content_editor_drafts(editor_id) where is_current = true;
create index if not exists content_editor_drafts_updated_at_idx on public.content_editor_drafts(updated_at desc);

create table if not exists public.content_editor_draft_term_usage (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid not null references public.content_editor_drafts(id) on delete cascade,
  term_id uuid not null references public.content_editor_terms(id) on delete cascade,
  occurrence_count int not null default 0,
  occurs_in_heading boolean not null default false,
  occurs_in_first_100_words boolean not null default false,
  status text not null
);

create index if not exists content_editor_draft_term_usage_draft_idx on public.content_editor_draft_term_usage(draft_id);
create unique index if not exists content_editor_draft_term_usage_unique on public.content_editor_draft_term_usage(draft_id, term_id);

create table if not exists public.content_editor_serp_cache (
  cache_key text primary key,
  payload jsonb not null,
  fetched_at timestamptz not null default now()
);

create table if not exists public.content_editor_domain_blacklist (
  domain_pattern text primary key,
  reason text,
  created_at timestamptz not null default now()
);

-- Cached live-page analysis snapshots for the Content Editor "Page Mode".
-- Populated by fetchAndScoreLivePage() in admin-core. TTL is enforced
-- application-side (default 1h); a fresh fetch is triggered when the
-- snapshot's fetched_at is older than the TTL or when the user clicks
-- "Refetch live page" in the brief workspace.
create table if not exists public.tracked_page_live_snapshots (
  id uuid primary key default gen_random_uuid(),
  tracked_page_id uuid not null references public.tracked_pages(id) on delete cascade,
  fetched_at timestamptz not null default now(),
  status_code int,
  url text not null,
  plaintext text,
  headings jsonb,
  word_count int,
  computed_content_score numeric(5,2),
  computed_coverage_score numeric(5,2),
  computed_frequency_score numeric(5,2),
  computed_placement_score numeric(5,2),
  computed_seo_score numeric(5,2),
  computed_eeat_score numeric(5,2),
  fetch_error text,
  -- Editor this snapshot was scored against. Multiple editors could
  -- (in theory) target the same tracked page; we score against the most
  -- recently linked editor and keep history per editor for diffing.
  scored_against_editor_id uuid references public.content_editors(id) on delete set null
);

create index if not exists tracked_page_live_snapshots_page_idx
  on public.tracked_page_live_snapshots(tracked_page_id, fetched_at desc);
create index if not exists tracked_page_live_snapshots_editor_idx
  on public.tracked_page_live_snapshots(scored_against_editor_id, fetched_at desc);

alter table public.content_editors                  enable row level security;
alter table public.content_editor_competitors       enable row level security;
alter table public.content_editor_terms             enable row level security;
alter table public.content_editor_questions         enable row level security;
alter table public.content_editor_facts             enable row level security;
alter table public.content_editor_outlines          enable row level security;
alter table public.content_editor_drafts            enable row level security;
alter table public.content_editor_draft_term_usage  enable row level security;
alter table public.content_editor_serp_cache        enable row level security;
alter table public.content_editor_domain_blacklist  enable row level security;
alter table public.tracked_page_live_snapshots      enable row level security;

do $$
declare tbl text; pname text;
begin
  for tbl in select unnest(array[
    'content_editors','content_editor_competitors','content_editor_terms','content_editor_questions',
    'content_editor_facts','content_editor_outlines','content_editor_drafts','content_editor_draft_term_usage',
    'content_editor_serp_cache','content_editor_domain_blacklist','tracked_page_live_snapshots'
  ]) loop
    pname := 'Admins can manage ' || tbl;
    execute format('drop policy if exists %I on public.%I', pname, tbl);
    execute format($p$
      create policy %I on public.%I for all to authenticated
        using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
        with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
    $p$, pname, tbl);
  end loop;
end $$;

-- Storage expectation: create a public bucket named site-assets.
-- Recommended folders: images/, blog-featured/, logos/, og/.
