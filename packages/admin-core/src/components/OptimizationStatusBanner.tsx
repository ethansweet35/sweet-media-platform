/**
 * <OptimizationStatusBanner trackedPagePath="/route" />
 * <OptimizationStatusBanner contentEditorId={editorId} />
 *
 * Async server component that renders a subtle top-of-page banner when a
 * Cursor cloud-agent optimization run is queued or running for the
 * current page. Returns null otherwise.
 *
 * Use on every tracked page (or blog post) so visitors get a small signal
 * that fresh content is on the way. The banner auto-disappears via ISR
 * revalidation once the run completes.
 *
 * Data source: `ai_optimize_runs` table, joined to the page or blog post
 * via its `content_editor_id`. Reads with the service-role key (the table
 * is admin-only via RLS, and the `prompt` column has the full content
 * brief that shouldn't be exposed to anon). Safe to ship in any server
 * component because this file is never bundled into client code — Next.js
 * tree-shakes server-only env reads out of the client bundle.
 */
import { createClient } from "@supabase/supabase-js";

interface OptimizationStatusBannerProps {
  /** Route path of the tracked page, e.g. "/service-areas/alaska". */
  trackedPagePath?: string;
  /** Content editor id, when the calling page knows it directly (blog posts). */
  contentEditorId?: string;
  /** Tailwind classes for the wrapping <aside>. */
  className?: string;
  /** Optional explicit "site name" so the message reads naturally. */
  brandName?: string;
}

interface ActiveRun {
  id: string;
  status: "queued" | "running";
  created_at: string;
  status_message: string | null;
}

async function fetchActiveRun(opts: {
  trackedPagePath?: string;
  contentEditorId?: string;
}): Promise<ActiveRun | null> {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch },
  });

  // Resolve editor id from the route path when not passed directly.
  let editorId = opts.contentEditorId ?? null;
  if (!editorId && opts.trackedPagePath) {
    const path = opts.trackedPagePath.startsWith("/")
      ? opts.trackedPagePath
      : `/${opts.trackedPagePath}`;
    const { data } = await supabase
      .from("tracked_pages")
      .select("content_editor_id")
      .eq("route_path", path)
      .maybeSingle();
    editorId = (data as { content_editor_id: string | null } | null)?.content_editor_id ?? null;
  }
  if (!editorId) return null;

  const { data } = await supabase
    .from("ai_optimize_runs")
    .select("id, status, created_at, status_message")
    .eq("editor_id", editorId)
    .in("status", ["queued", "running"])
    .order("created_at", { ascending: false })
    .limit(1);

  const rows = (data ?? []) as ActiveRun[];
  return rows[0] ?? null;
}

function ageLabel(iso: string): string {
  const ms = Date.now() - Date.parse(iso);
  if (Number.isNaN(ms) || ms < 0) return "just now";
  const mins = Math.round(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  return `${hours}h ago`;
}

export default async function OptimizationStatusBanner({
  trackedPagePath,
  contentEditorId,
  className = "",
  brandName,
}: OptimizationStatusBannerProps) {
  const run = await fetchActiveRun({ trackedPagePath, contentEditorId });
  if (!run) return null;

  return (
    <aside
      data-ai-optimization-banner
      role="status"
      aria-live="polite"
      className={
        className ||
        "sticky top-0 z-40 w-full border-b border-sky-200/60 bg-sky-50/95 backdrop-blur px-4 py-2 text-center text-[12px] text-sky-900 shadow-sm"
      }
    >
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-sky-500 animate-pulse"
        />
        <span>
          <strong className="font-semibold">
            {brandName ? `${brandName} is updating this page` : "This page is being updated"}
          </strong>{" "}
          with fresh content
          {run.status === "queued" ? " — agent queued" : " — agent running"}
          <span className="opacity-60"> · started {ageLabel(run.created_at)}</span>
          <span className="opacity-60"> · refresh in a couple of minutes</span>
        </span>
      </span>
    </aside>
  );
}
