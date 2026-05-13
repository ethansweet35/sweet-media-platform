-- Content Editor — full schema
--
-- Implements the Surfer/Rankability-style content editor pipeline:
--   1. Fetch top-20 SERP URLs (DataForSEO) + People Also Ask questions
--   2. Scrape each competitor (Firecrawl) → cleaned text + structural metrics
--   3. NLP entity extraction (Google Cloud Natural Language API) + TF-IDF n-grams
--   4. Compute recommended structural ranges from competitor pool
--   5. AI-synthesize an outline scaffold from competitor headings
--   6. Extract atomic facts for AI citation optimization
--   7. Score each competitor to derive a "target score" benchmark
--   8. Live-score the user's draft against all of the above
--
-- All tables prefixed with `content_editor_` to avoid collisions with future
-- generic tables (drafts, facts, serp_cache, etc.).
--
-- Apply to every brand Supabase project. Idempotent.

create extension if not exists "pgcrypto";
-- pgvector for fact embedding similarity. Supabase projects from 2024+ have
-- this available without manual enablement.
create extension if not exists vector;

-- =========================================================
-- content_editors — one row per "create editor" session
-- =========================================================

create table if not exists public.content_editors (
  id uuid primary key default gen_random_uuid(),
  created_by uuid,                                      -- admin user uuid (no FK; admin_users keys on email)

  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  location_code int not null default 2840,              -- DataForSEO location codes; 2840 = United States
  language_code text not null default 'en',
  device text not null default 'desktop',               -- 'desktop' | 'mobile'
  competitor_pool_size int not null default 20,

  -- Lifecycle
  status text not null default 'pending',               -- pending | fetching_serp | extracting_content | analyzing_nlp | extracting_facts | computing_guidelines | ready | failed
  status_message text,
  error text,
  total_cost_usd numeric(10,4) not null default 0,      -- running cost tally for visibility

  -- Optional linkage to an existing blog post (for "rewrite this post" flow).
  -- Stored as text because `blog_posts.id` is `uuid` on most brands but `text`
  -- on legacy Sweet Media. Application code handles cascade-on-delete.
  blog_post_id text,

  -- Denormalized recommendations (computed in Phase 4) for snappy UI loads
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

  -- Benchmark + target (computed in Phase 8)
  competitor_avg_score numeric(5,2),
  target_score numeric(5,2),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists content_editors_status_idx on public.content_editors(status);
create index if not exists content_editors_created_at_idx on public.content_editors(created_at desc);
create index if not exists content_editors_blog_post_idx on public.content_editors(blog_post_id);
create index if not exists content_editors_keyword_idx on public.content_editors(lower(primary_keyword));

-- updated_at trigger
create or replace function public.tg_content_editors_updated_at()
returns trigger
language plpgsql
as $fn$
begin
  new.updated_at = now();
  return new;
end;
$fn$;

drop trigger if exists content_editors_updated_at on public.content_editors;
create trigger content_editors_updated_at
  before update on public.content_editors
  for each row execute function public.tg_content_editors_updated_at();

-- =========================================================
-- content_editor_competitors — scraped competitor pages
-- =========================================================

create table if not exists public.content_editor_competitors (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,

  serp_position int not null,
  url text not null,
  domain text not null,
  title text,
  meta_description text,

  -- Structural metrics (parsed from scraped HTML)
  word_count int,
  h1_text text,
  h2_count int,
  h3_count int,
  paragraph_count int,
  image_count int,
  internal_link_count int,
  external_link_count int,

  -- Content artifacts
  raw_html_storage_key text,                            -- optional: Supabase Storage path for raw HTML
  cleaned_text text,
  headings jsonb,                                       -- [{level, text, position}]

  -- Individual scoring (computed in Phase 8)
  individual_content_score numeric(5,2),
  included_in_benchmark boolean not null default true,

  fetch_status text not null default 'pending',         -- pending | scraping | scraped | failed
  fetch_error text,

  created_at timestamptz not null default now()
);

create index if not exists content_editor_competitors_editor_idx
  on public.content_editor_competitors(editor_id, serp_position);

-- =========================================================
-- content_editor_terms — NLP entities + TF-IDF n-grams
-- =========================================================

create table if not exists public.content_editor_terms (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,

  term text not null,
  term_type text not null,                              -- 'entity' | 'ngram' | 'nlp_keyword'
  entity_type text,                                     -- Google NLP type: PERSON, ORG, LOCATION, etc.
  relevance_score numeric(8,4) not null,                -- tf-idf or salience score; drives sort order
  avg_frequency numeric(8,4),                           -- avg occurrences per competitor doc

  -- Recommended usage range (Surfer-style "True Density" equivalent)
  min_recommended_uses int not null,
  max_recommended_uses int not null,
  target_uses int not null,
  competitor_coverage_pct numeric(5,2),                 -- % of competitors using this term

  is_heading_recommended boolean not null default false,
  is_primary_keyword boolean not null default false,

  -- User overrides
  user_blacklisted boolean not null default false,
  user_included boolean not null default true,

  created_at timestamptz not null default now()
);

create index if not exists content_editor_terms_editor_relevance_idx
  on public.content_editor_terms(editor_id, relevance_score desc);
create index if not exists content_editor_terms_editor_term_idx
  on public.content_editor_terms(editor_id, lower(term));

-- =========================================================
-- content_editor_questions — PAA + competitor + AI-synthesized
-- =========================================================

create table if not exists public.content_editor_questions (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,

  question text not null,
  source text not null,                                 -- 'paa' | 'h2' | 'h3' | 'llm_synthesized'
  recommended_position int,
  user_dismissed boolean not null default false,

  created_at timestamptz not null default now()
);

create index if not exists content_editor_questions_editor_idx
  on public.content_editor_questions(editor_id);

-- =========================================================
-- content_editor_facts — extracted facts for AI search optimization
-- =========================================================

create table if not exists public.content_editor_facts (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,

  fact_text text not null,
  source_url text not null,
  source_domain text not null,
  source_position int,                                  -- SERP position of source
  source_count int not null default 1,                  -- # of competitors that stated this fact (after dedup)

  embedding vector(1536),                               -- OpenAI text-embedding-3-small dimension
  topic_cluster text,                                   -- short label grouping related facts
  importance_score numeric(5,2),                        -- LLM-rated 1-100

  -- Per-draft tracking flag (updated at score time)
  covered_in_draft boolean not null default false,
  user_dismissed boolean not null default false,

  created_at timestamptz not null default now()
);

create index if not exists content_editor_facts_editor_idx
  on public.content_editor_facts(editor_id, importance_score desc);

-- ivfflat vector index for cosine similarity search. Requires `lists` tuning;
-- 100 works well for our expected scale (a few thousand facts). Recreating
-- the index after large bulk inserts improves recall.
do $$
begin
  if not exists (
    select 1 from pg_class where relname = 'content_editor_facts_embedding_idx'
  ) then
    create index content_editor_facts_embedding_idx
      on public.content_editor_facts
      using ivfflat (embedding vector_cosine_ops)
      with (lists = 100);
  end if;
end $$;

-- =========================================================
-- content_editor_outlines — AI-synthesized outline scaffold
-- =========================================================

create table if not exists public.content_editor_outlines (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null references public.content_editors(id) on delete cascade,

  heading_level int not null,                           -- 1, 2, 3
  heading_text text not null,
  position int not null,
  source text,                                          -- 'ai_synthesized' | 'competitor:<domain>'
  recommended_word_count int,                           -- per-section length suggestion

  created_at timestamptz not null default now()
);

create index if not exists content_editor_outlines_editor_idx
  on public.content_editor_outlines(editor_id, position);

-- =========================================================
-- content_editor_drafts — user's draft snapshots
-- =========================================================

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

  -- Computed scores (cached for sort/filter; recomputed on each save)
  computed_content_score numeric(5,2),
  computed_coverage_score numeric(5,2),
  computed_frequency_score numeric(5,2),
  computed_placement_score numeric(5,2),
  computed_seo_score numeric(5,2),                      -- Surfer-style split
  computed_ai_search_score numeric(5,2),                -- Surfer-style split

  -- Cached sentence -> embedding map, keyed by sha256(sentence_text).
  -- Avoids re-embedding unchanged sentences on every score recomputation.
  -- Shape: { "<sentence hash>": [0.1, 0.2, ...] }
  sentence_embeddings jsonb,

  is_current boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists content_editor_drafts_editor_idx
  on public.content_editor_drafts(editor_id, is_current);

-- Only one draft per editor can be `is_current = true` at a time.
create unique index if not exists content_editor_drafts_one_current_per_editor
  on public.content_editor_drafts(editor_id)
  where is_current = true;

-- =========================================================
-- content_editor_draft_term_usage — per-term usage in a draft
-- =========================================================

create table if not exists public.content_editor_draft_term_usage (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid not null references public.content_editor_drafts(id) on delete cascade,
  term_id uuid not null references public.content_editor_terms(id) on delete cascade,

  occurrence_count int not null default 0,
  occurs_in_heading boolean not null default false,
  occurs_in_first_100_words boolean not null default false,
  status text not null                                  -- 'missing' | 'under' | 'good' | 'over'
);

create index if not exists content_editor_draft_term_usage_draft_idx
  on public.content_editor_draft_term_usage(draft_id);

create unique index if not exists content_editor_draft_term_usage_unique
  on public.content_editor_draft_term_usage(draft_id, term_id);

-- =========================================================
-- content_editor_serp_cache — avoid burning DataForSEO credits on repeat keywords
-- =========================================================

create table if not exists public.content_editor_serp_cache (
  cache_key text primary key,                           -- sha256(keyword|location|language|device)
  payload jsonb not null,
  fetched_at timestamptz not null default now()
);

-- Cache TTL is enforced in application code (24h). Optional periodic cleanup:
--   delete from content_editor_serp_cache where fetched_at < now() - interval '7 days';

-- =========================================================
-- content_editor_domain_blacklist — per-brand competitor exclusions
-- =========================================================
-- Behavioral-health-specific: pre-seed with domains that pollute SERP
-- (insurance directories, lead-gen aggregators). Each brand can add/remove.

create table if not exists public.content_editor_domain_blacklist (
  domain_pattern text primary key,                      -- e.g. 'psychologytoday.com' or '*.rehabs.com'
  reason text,
  created_at timestamptz not null default now()
);

-- Seed common behavioral-health SERP polluters. Idempotent; brands can delete
-- entries if they actually want to compete with one of these.
insert into public.content_editor_domain_blacklist (domain_pattern, reason) values
  ('psychologytoday.com',    'Insurance directory; not a content competitor'),
  ('therapyden.com',         'Therapist directory'),
  ('betterhelp.com',         'Insurance/lead aggregator'),
  ('talkspace.com',          'Insurance/lead aggregator'),
  ('rehabs.com',             'Lead-gen aggregator'),
  ('addictioncenter.com',    'Lead-gen aggregator'),
  ('treatment.com',          'Lead-gen aggregator'),
  ('americanaddictioncenters.org', 'Lead-gen aggregator'),
  ('detoxrehabs.net',        'Lead-gen aggregator'),
  ('drugrehab.com',          'Lead-gen aggregator')
on conflict (domain_pattern) do nothing;

-- =========================================================
-- RLS policies — admin-only via admin_users email check
-- =========================================================

alter table public.content_editors                       enable row level security;
alter table public.content_editor_competitors            enable row level security;
alter table public.content_editor_terms                  enable row level security;
alter table public.content_editor_questions              enable row level security;
alter table public.content_editor_facts                  enable row level security;
alter table public.content_editor_outlines               enable row level security;
alter table public.content_editor_drafts                 enable row level security;
alter table public.content_editor_draft_term_usage       enable row level security;
alter table public.content_editor_serp_cache             enable row level security;
alter table public.content_editor_domain_blacklist       enable row level security;

do $$
declare
  tbl text;
  policy_name text;
begin
  for tbl in
    select unnest(array[
      'content_editors',
      'content_editor_competitors',
      'content_editor_terms',
      'content_editor_questions',
      'content_editor_facts',
      'content_editor_outlines',
      'content_editor_drafts',
      'content_editor_draft_term_usage',
      'content_editor_serp_cache',
      'content_editor_domain_blacklist'
    ])
  loop
    policy_name := 'Admins can manage ' || tbl;
    execute format('drop policy if exists %I on public.%I', policy_name, tbl);
    execute format($p$
      create policy %I on public.%I
        for all
        to authenticated
        using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
        with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
    $p$, policy_name, tbl);
  end loop;
end $$;

-- Note: no FK from content_editors.blog_post_id → blog_posts.id because the
-- `id` column type varies across brand Supabase projects (text vs uuid).
-- Cascade cleanup is handled at the application layer.
