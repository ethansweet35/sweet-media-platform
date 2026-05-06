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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  author text,
  author_title text,
  author_bio text,
  author_photo text,
  hero_image_url text,
  featured_image_url text,
  seo_title text,
  seo_description text,
  meta_title text,
  meta_description text,
  focus_keyword text,
  tags text[],
  published_at timestamptz,
  scheduled_publish_at timestamptz,
  approved_for_publish boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  topic text not null,
  keyword text,
  status text not null default 'queued',
  notes text,
  scheduled_for timestamptz,
  result_post_id uuid references public.blog_posts(id) on delete set null,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.internal_links (
  id uuid primary key default gen_random_uuid(),
  source_url text,
  target_url text not null,
  anchor_text text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tracked_pages (
  id uuid primary key default gen_random_uuid(),
  url text not null unique,
  title text,
  page_type text,
  status text not null default 'active',
  last_checked_at timestamptz,
  health_status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.system_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on admin-managed tables
alter table public.blog_queue enable row level security;
alter table public.blog_knowledge_base enable row level security;
alter table public.internal_links enable row level security;
alter table public.tracked_pages enable row level security;
alter table public.system_settings enable row level security;

-- Admin policies for operational tables
drop policy if exists "Admins can manage blog queue" on public.blog_queue;
create policy "Admins can manage blog queue" on public.blog_queue for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage blog knowledge base" on public.blog_knowledge_base;
create policy "Admins can manage blog knowledge base" on public.blog_knowledge_base for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage internal links" on public.internal_links;
create policy "Admins can manage internal links" on public.internal_links for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

drop policy if exists "Admins can manage tracked pages" on public.tracked_pages;
create policy "Authenticated users can manage tracked pages" on public.tracked_pages for all to authenticated using (true) with check (true);

drop policy if exists "Admins can manage system settings" on public.system_settings;
create policy "Admins can manage system settings" on public.system_settings for all to authenticated using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email'))) with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));

-- Storage expectation: create a public bucket named site-assets.
-- Recommended folders: images/, blog-featured/, logos/, og/.
