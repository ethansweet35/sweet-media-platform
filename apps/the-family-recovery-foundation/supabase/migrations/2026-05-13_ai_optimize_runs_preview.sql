-- Add Vercel preview tracking + projected content score columns to
-- ai_optimize_runs. Populated by the optimize-pr GET handler after the
-- agent's PR is opened. The admin AiOptimizeRunsPanel surfaces these so
-- you can preview the rewritten page and see the projected score lift
-- before merging.
--
-- Idempotent. Safe to re-run.

alter table public.ai_optimize_runs
  add column if not exists vercel_project_id text,
  add column if not exists preview_url text,
  add column if not exists preview_content_score numeric(5,2),
  add column if not exists preview_word_count int,
  add column if not exists preview_scored_at timestamptz,
  add column if not exists preview_fetch_error text;
