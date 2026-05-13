-- ai_optimize_runs
--
-- Each row tracks a Cursor cloud-agent invocation triggered from the
-- Content Editor brief workspace's "Open new optimization PR" button.
-- The agent opens a real GitHub PR with code-level edits to the tracked
-- page's tsx + brand design system, which Vercel auto-deploys on merge.
--
-- See packages/admin-core/src/lib/server/aiOptimizeRuns.ts.
--
-- Idempotent. Safe to re-run.

create table if not exists public.ai_optimize_runs (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid references public.content_editors(id) on delete cascade,
  tracked_page_id uuid references public.tracked_pages(id) on delete cascade,

  cursor_agent_id text,
  cursor_run_id text,

  status text not null default 'queued',
  status_message text,

  pr_url text,
  pr_number int,
  branch_name text,
  diff_summary text,

  triggered_by_email text,
  model_id text,
  prompt text,
  error text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists ai_optimize_runs_editor_idx on public.ai_optimize_runs(editor_id, created_at desc);
create index if not exists ai_optimize_runs_page_idx on public.ai_optimize_runs(tracked_page_id, created_at desc);
create index if not exists ai_optimize_runs_status_idx on public.ai_optimize_runs(status);

create or replace function public.tg_ai_optimize_runs_updated_at()
returns trigger language plpgsql as $fn$
begin
  new.updated_at = now();
  return new;
end;
$fn$;

drop trigger if exists ai_optimize_runs_updated_at on public.ai_optimize_runs;
create trigger ai_optimize_runs_updated_at
  before update on public.ai_optimize_runs
  for each row execute function public.tg_ai_optimize_runs_updated_at();

alter table public.ai_optimize_runs enable row level security;

drop policy if exists "Admins can manage ai_optimize_runs" on public.ai_optimize_runs;
create policy "Admins can manage ai_optimize_runs" on public.ai_optimize_runs
  for all to authenticated
  using (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')))
  with check (exists (select 1 from public.admin_users au where lower(au.email) = lower(auth.jwt() ->> 'email')));
