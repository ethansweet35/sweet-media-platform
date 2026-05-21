import { revalidatePath } from "next/cache";
import { ContentEditorError } from "./errors";
import { syncEditorDraftToBlogPost } from "./syncToBlog";

export type BulkSyncEditorResult = {
  editorId: string;
  ok: boolean;
  error?: string;
  slug?: string;
  skipped?: boolean;
  skipReason?: string;
};

export type BulkSyncEditorsResponse = {
  ok: true;
  results: BulkSyncEditorResult[];
  succeeded: number;
  failed: number;
  skipped: number;
};

export async function bulkSyncEditorsToBlog(
  editorIds: string[],
): Promise<BulkSyncEditorsResponse> {
  const unique = [...new Set(editorIds.map((id) => id.trim()).filter(Boolean))];
  if (unique.length === 0) {
    throw new ContentEditorError("Provide at least one editor id.", { source: "api", status: 400 });
  }
  if (unique.length > 50) {
    throw new ContentEditorError("Maximum 50 editors per bulk sync.", { source: "api", status: 400 });
  }

  const results: BulkSyncEditorResult[] = [];
  let succeeded = 0;
  let failed = 0;
  let skipped = 0;

  for (const editorId of unique) {
    try {
      const result = await syncEditorDraftToBlogPost(editorId);
      try {
        revalidatePath(`/blog/${result.slug}`);
        revalidatePath("/blog");
      } catch {
        // non-fatal
      }
      results.push({ editorId, ok: true, slug: result.slug });
      succeeded += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const isPageSkip =
        message.includes("tracked page") || message.includes("Apply SEO Meta");
      if (isPageSkip) {
        results.push({
          editorId,
          ok: false,
          skipped: true,
          skipReason: "Page editors must be updated manually (Apply SEO Meta on the brief).",
        });
        skipped += 1;
      } else {
        results.push({ editorId, ok: false, error: message });
        failed += 1;
      }
    }
  }

  return { ok: true, results, succeeded, failed, skipped };
}

export async function handleBulkSyncContentEditorsPost(request: Request): Promise<Response> {
  let body: { editorIds?: string[] };
  try {
    body = (await request.json()) as { editorIds?: string[] };
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const editorIds = Array.isArray(body.editorIds) ? body.editorIds : [];
  try {
    const payload = await bulkSyncEditorsToBlog(editorIds);
    return Response.json(payload);
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return Response.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      );
    }
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Bulk sync failed." },
      { status: 500 },
    );
  }
}
