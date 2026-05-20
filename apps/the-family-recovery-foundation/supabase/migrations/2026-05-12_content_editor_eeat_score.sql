-- Step 9 — add EEAT score column to content_editor_drafts.
--
-- The scoring module now computes a YMYL E-E-A-T score based on author
-- byline, medical reviewer byline, last-updated date, authoritative
-- citations, and schema markup. Persist it alongside the other component
-- scores on the draft row so the UI doesn't need to recompute on load.
--
-- Apply to every brand Supabase project. Idempotent.

alter table public.content_editor_drafts
  add column if not exists computed_eeat_score numeric(5,2);
