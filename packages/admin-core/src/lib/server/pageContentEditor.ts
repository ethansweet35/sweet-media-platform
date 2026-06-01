/**
 * Server-side handlers for the inline page editor's API routes:
 *
 *   POST /api/admin/page-content/save-draft
 *   POST /api/admin/page-content/publish
 *   POST /api/admin/page-content/discard
 *   POST /api/admin/page-content/upload-image
 *
 * These are invoked from per-app route handlers under each app's
 * src/app/api/admin/page-content directory, so each brand stays in its
 * own Supabase project. The route handlers only do request parsing,
 * auth verification, and delegation to functions in this module.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SEO_OVERRIDE_KEY_LIST } from "../../components/page-editor/pageEditorSeoTypes";
import {
  fetchPageEditorSeoContext,
  parsePageEditorRoute,
  syncPublishedSeoToCanonical,
  type PageEditorSeoContextResult,
} from "./pageContentSeo";
import { revalidatePageContentCaches } from "./revalidatePageContentCaches";
import type { PageContentFieldType } from "./pageContentOverrides";
import { diffPageContentOverridePublishes, type ContentEntityType } from "../contentChangeLog";
import { insertContentChangeLogEntries } from "./contentChangeLogServer";

export interface PageContentEditorError {
  status: number;
  message: string;
}

export interface AdminContext {
  email: string;
  adminId: string;
}

function getServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw {
      status: 500,
      message:
        "Supabase server config missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
    } satisfies PageContentEditorError;
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function getAnonClient(accessToken: string): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    throw {
      status: 500,
      message:
        "Supabase public config missing (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    } satisfies PageContentEditorError;
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

/**
 * Verify the request's Authorization header carries a valid Supabase
 * session AND the session email exists in admin_users. Throws with
 * a 401/403 PageContentEditorError on failure.
 */
export async function requireAdminContext(request: Request): Promise<AdminContext> {
  const authHeader = request.headers.get("authorization") ?? request.headers.get("Authorization");
  if (!authHeader?.toLowerCase().startsWith("bearer ")) {
    throw { status: 401, message: "Missing bearer token." } satisfies PageContentEditorError;
  }
  const token = authHeader.slice(7).trim();
  if (!token) {
    throw { status: 401, message: "Missing bearer token." } satisfies PageContentEditorError;
  }

  // Use anon client with the user's JWT so we can call auth.getUser().
  const userClient = getAnonClient(token);
  const { data: userResult, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userResult?.user?.email) {
    throw { status: 401, message: "Invalid session." } satisfies PageContentEditorError;
  }
  const email = userResult.user.email.toLowerCase();

  // Verify against admin_users (use service role to bypass RLS quirks).
  const admin = getServiceRoleClient();
  const { data, error } = await admin
    .from("admin_users")
    .select("id, email")
    .ilike("email", email)
    .maybeSingle();
  if (error) {
    throw {
      status: 500,
      message: `Failed to verify admin access: ${error.message}`,
    } satisfies PageContentEditorError;
  }
  if (!data) {
    throw { status: 403, message: "Not authorized." } satisfies PageContentEditorError;
  }
  return { email, adminId: (data as { id: string }).id };
}

function normalizeRoutePath(routePath: unknown): string {
  if (typeof routePath !== "string" || routePath.length === 0) {
    throw { status: 400, message: "routePath is required." } satisfies PageContentEditorError;
  }
  let trimmed = routePath.trim();
  if (!trimmed.startsWith("/")) {
    throw {
      status: 400,
      message: "routePath must start with '/'.",
    } satisfies PageContentEditorError;
  }
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
}

function normalizeFieldType(value: unknown): PageContentFieldType {
  if (value === "text" || value === "rich_text" || value === "image" || value === "icon") {
    return value;
  }
  throw {
    status: 400,
    message: `Invalid field_type '${String(value)}' (expected text | rich_text | image | icon).`,
  } satisfies PageContentEditorError;
}

function normalizeFieldKey(value: unknown): string {
  if (typeof value !== "string" || value.length === 0) {
    throw { status: 400, message: "fieldKey is required." } satisfies PageContentEditorError;
  }
  const trimmed = value.trim();
  if (!/^[A-Za-z0-9_.\-]+$/.test(trimmed)) {
    throw {
      status: 400,
      message: "fieldKey may only contain letters, digits, dot, dash, and underscore.",
    } satisfies PageContentEditorError;
  }
  return trimmed;
}

function getSiteKey(): string {
  return process.env.NEXT_PUBLIC_SITE_ID?.trim() ?? "";
}

async function resolveContentLogEntity(
  client: SupabaseClient,
  routePath: string,
): Promise<{ entity_type: ContentEntityType; entity_id: string; route_path: string } | null> {
  const info = parsePageEditorRoute(routePath);
  if (info.entityType === "unsupported") return null;

  if (info.entityType === "blog" && info.blogSlug) {
    const { data } = await client.from("blog_posts").select("id").eq("slug", info.blogSlug).maybeSingle();
    if (!data) return null;
    return {
      entity_type: "blog",
      entity_id: (data as { id: string }).id,
      route_path: info.routePath,
    };
  }

  const { data } = await client
    .from("tracked_pages")
    .select("id")
    .eq("route_path", info.routePath)
    .maybeSingle();
  if (data) {
    return {
      entity_type: "page",
      entity_id: (data as { id: string }).id,
      route_path: info.routePath,
    };
  }

  return {
    entity_type: "page",
    entity_id: info.routePath,
    route_path: info.routePath,
  };
}

async function recordPublishedPageContentOverrides(
  client: SupabaseClient,
  routePath: string,
  drafts: Array<{ field_key: string; draft_value: string | null; published_value: string | null }>,
  changed_by: string,
): Promise<void> {
  const changes = diffPageContentOverridePublishes(drafts);
  if (!changes.length) return;

  const entity = await resolveContentLogEntity(client, routePath);
  if (!entity) return;

  const result = await insertContentChangeLogEntries({
    entity_type: entity.entity_type,
    entity_id: entity.entity_id,
    route_path: entity.route_path,
    changes,
    changed_by,
  });
  if (!result.ok) {
    console.warn("[content_change_log] failed to record page content publish:", result.error);
  }
}

// ─────────────────────────────────────────────────────────────────────
// save-draft
// ─────────────────────────────────────────────────────────────────────

export interface PageContentDraftFieldInput {
  fieldKey: string;
  fieldType: PageContentFieldType;
  value: string;
}

export interface PageContentSaveDraftInput {
  routePath: string;
  fields: PageContentDraftFieldInput[];
}

export interface PageContentSaveDraftResult {
  saved: number;
  routePath: string;
}

export async function handleSaveDraft(
  request: Request,
): Promise<PageContentSaveDraftResult> {
  const admin = await requireAdminContext(request);

  let body: PageContentSaveDraftInput;
  try {
    body = (await request.json()) as PageContentSaveDraftInput;
  } catch {
    throw { status: 400, message: "Invalid JSON body." } satisfies PageContentEditorError;
  }

  const routePath = normalizeRoutePath(body.routePath);
  if (!Array.isArray(body.fields) || body.fields.length === 0) {
    throw { status: 400, message: "fields[] must be a non-empty array." } satisfies PageContentEditorError;
  }

  const siteKey = getSiteKey();
  const now = new Date().toISOString();

  const rows = body.fields.map((field) => ({
    site_key: siteKey,
    route_path: routePath,
    field_key: normalizeFieldKey(field.fieldKey),
    field_type: normalizeFieldType(field.fieldType),
    draft_value: typeof field.value === "string" ? field.value : "",
    draft_updated_at: now,
    updated_by: admin.email,
    updated_at: now,
  }));

  const client = getServiceRoleClient();
  const { error } = await client
    .from("page_content_overrides")
    .upsert(rows, { onConflict: "route_path,field_key" });
  if (error) {
    throw {
      status: 500,
      message: `Failed to save drafts: ${error.message}`,
    } satisfies PageContentEditorError;
  }

  return { saved: rows.length, routePath };
}

// ─────────────────────────────────────────────────────────────────────
// publish
// ─────────────────────────────────────────────────────────────────────

export interface PageContentPublishInput {
  routePath: string;
  /**
   * Optional list of field keys to publish. When omitted, every draft
   * on the route is promoted.
   */
  fieldKeys?: string[];
}

export interface PageContentPublishResult {
  published: number;
  routePath: string;
  fieldKeys: string[];
  /** Set when a slug change moved the page/blog to a new URL. */
  redirectTo?: string;
}

export async function handlePublish(request: Request): Promise<PageContentPublishResult> {
  const admin = await requireAdminContext(request);

  let body: PageContentPublishInput;
  try {
    body = (await request.json()) as PageContentPublishInput;
  } catch {
    throw { status: 400, message: "Invalid JSON body." } satisfies PageContentEditorError;
  }

  const routePath = normalizeRoutePath(body.routePath);
  const explicitKeys = Array.isArray(body.fieldKeys)
    ? body.fieldKeys.map(normalizeFieldKey)
    : null;

  const client = getServiceRoleClient();

  let query = client
    .from("page_content_overrides")
    .select("id, field_key, draft_value, published_value")
    .eq("route_path", routePath)
    .not("draft_value", "is", null);
  if (explicitKeys && explicitKeys.length > 0) {
    query = query.in("field_key", explicitKeys);
  }
  const { data: rows, error: loadErr } = await query;
  if (loadErr) {
    throw {
      status: 500,
      message: `Failed to load drafts for publish: ${loadErr.message}`,
    } satisfies PageContentEditorError;
  }
  const drafts = (rows as Array<{
    id: string;
    field_key: string;
    draft_value: string | null;
    published_value: string | null;
  }>) ?? [];

  if (drafts.length === 0) {
    const seoSync = await syncPublishedSeoToCanonical(client, routePath, admin.email);
    return {
      published: 0,
      routePath: seoSync.routePath,
      fieldKeys: [],
      ...(seoSync.slugChanged ? { redirectTo: seoSync.routePath } : {}),
    };
  }

  const now = new Date().toISOString();
  const patch = {
    published_at: now,
    draft_value: null,
    draft_updated_at: null,
    updated_by: admin.email,
    updated_at: now,
  };

  // Update existing rows by id — do not upsert partial rows (PostgREST would INSERT
  // without route_path/field_key and violate NOT NULL).
  const results = await Promise.all(
    drafts.map((row) =>
      client
        .from("page_content_overrides")
        .update({
          ...patch,
          published_value: row.draft_value,
        })
        .eq("id", row.id),
    ),
  );
  const publishErr = results.find((r) => r.error)?.error;
  if (publishErr) {
    throw {
      status: 500,
      message: `Failed to publish drafts: ${publishErr.message}`,
    } satisfies PageContentEditorError;
  }

  await recordPublishedPageContentOverrides(client, routePath, drafts, admin.email);

  revalidatePageContentCaches(routePath);

  const freshlyPublished = new Map<string, string>();
  for (const row of drafts) {
    if (
      row.draft_value &&
      (SEO_OVERRIDE_KEY_LIST as readonly string[]).includes(row.field_key)
    ) {
      freshlyPublished.set(row.field_key, row.draft_value);
    }
  }

  const seoSync = await syncPublishedSeoToCanonical(
    client,
    routePath,
    admin.email,
    freshlyPublished,
  );

  return {
    published: drafts.length,
    routePath: seoSync.routePath,
    fieldKeys: drafts.map((d) => d.field_key),
    ...(seoSync.slugChanged ? { redirectTo: seoSync.routePath } : {}),
  };
}

// ─────────────────────────────────────────────────────────────────────
// seo-context
// ─────────────────────────────────────────────────────────────────────

export async function handleGetSeoContext(
  request: Request,
  routePathParam: string | null,
): Promise<PageEditorSeoContextResult> {
  await requireAdminContext(request);
  const routePath = normalizeRoutePath(routePathParam ?? "");
  const client = getServiceRoleClient();
  return fetchPageEditorSeoContext(client, routePath);
}

// ─────────────────────────────────────────────────────────────────────
// discard
// ─────────────────────────────────────────────────────────────────────

export interface PageContentDiscardInput {
  routePath: string;
  fieldKeys?: string[];
}

export interface PageContentDiscardResult {
  discarded: number;
  routePath: string;
}

export async function handleDiscard(request: Request): Promise<PageContentDiscardResult> {
  const admin = await requireAdminContext(request);

  let body: PageContentDiscardInput;
  try {
    body = (await request.json()) as PageContentDiscardInput;
  } catch {
    throw { status: 400, message: "Invalid JSON body." } satisfies PageContentEditorError;
  }

  const routePath = normalizeRoutePath(body.routePath);
  const explicitKeys = Array.isArray(body.fieldKeys)
    ? body.fieldKeys.map(normalizeFieldKey)
    : null;

  const client = getServiceRoleClient();
  const now = new Date().toISOString();

  // Two cases: rows with a published_value (just null out the draft) and
  // rows without (delete the row entirely so the page falls back to its
  // hardcoded default).
  let listQuery = client
    .from("page_content_overrides")
    .select("id, field_key, published_value")
    .eq("route_path", routePath)
    .not("draft_value", "is", null);
  if (explicitKeys && explicitKeys.length > 0) {
    listQuery = listQuery.in("field_key", explicitKeys);
  }
  const { data: rows, error: loadErr } = await listQuery;
  if (loadErr) {
    throw {
      status: 500,
      message: `Failed to load drafts for discard: ${loadErr.message}`,
    } satisfies PageContentEditorError;
  }
  const drafts =
    (rows as Array<{ id: string; field_key: string; published_value: string | null }>) ?? [];
  if (drafts.length === 0) {
    return { discarded: 0, routePath };
  }

  const toDelete = drafts.filter((r) => r.published_value === null).map((r) => r.id);
  const toNull = drafts.filter((r) => r.published_value !== null).map((r) => r.id);

  if (toDelete.length > 0) {
    const { error: delErr } = await client
      .from("page_content_overrides")
      .delete()
      .in("id", toDelete);
    if (delErr) {
      throw {
        status: 500,
        message: `Failed to delete draft rows: ${delErr.message}`,
      } satisfies PageContentEditorError;
    }
  }
  if (toNull.length > 0) {
    const { error: nullErr } = await client
      .from("page_content_overrides")
      .update({
        draft_value: null,
        draft_updated_at: null,
        updated_by: admin.email,
        updated_at: now,
      })
      .in("id", toNull);
    if (nullErr) {
      throw {
        status: 500,
        message: `Failed to clear drafts: ${nullErr.message}`,
      } satisfies PageContentEditorError;
    }
  }

  revalidatePageContentCaches(routePath);

  return { discarded: drafts.length, routePath };
}

// ─────────────────────────────────────────────────────────────────────
// upload-image
// ─────────────────────────────────────────────────────────────────────

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
]);
const MAX_BYTES = 12 * 1024 * 1024;
const BUCKET = "site-assets";

function slugifyForPath(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "field";
}

function extensionForContentType(contentType: string): string {
  if (contentType === "image/png") return "png";
  if (contentType === "image/jpeg") return "jpg";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/avif") return "avif";
  return "bin";
}

export interface PageContentUploadImageResult {
  url: string;
  path: string;
  routePath: string;
  fieldKey: string;
}

export async function handleUploadImage(request: Request): Promise<PageContentUploadImageResult> {
  await requireAdminContext(request);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    throw { status: 400, message: "Invalid multipart body." } satisfies PageContentEditorError;
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    throw { status: 400, message: "file is required." } satisfies PageContentEditorError;
  }
  if (file.size > MAX_BYTES) {
    throw { status: 413, message: "Image is too large (max 12MB)." } satisfies PageContentEditorError;
  }
  if (!ALLOWED_MIME.has(file.type)) {
    throw {
      status: 415,
      message: `Unsupported image type '${file.type}'. Use PNG, JPEG, WEBP, or AVIF.`,
    } satisfies PageContentEditorError;
  }

  const routePath = normalizeRoutePath(form.get("routePath"));
  const fieldKey = normalizeFieldKey(form.get("fieldKey"));

  const siteKey = getSiteKey() || "default";
  const routeSlug = slugifyForPath(routePath.replace(/\//g, "_"));
  const fieldSlug = slugifyForPath(fieldKey);
  const ext = extensionForContentType(file.type);
  const path = `page-edits/${siteKey}/${routeSlug}/${fieldSlug}-${Date.now()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();

  const client = getServiceRoleClient();
  const { error: uploadErr } = await client.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });
  if (uploadErr) {
    throw {
      status: 500,
      message: `Image upload failed: ${uploadErr.message}`,
    } satisfies PageContentEditorError;
  }

  const { data: publicUrlData } = client.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = publicUrlData?.publicUrl;
  if (!publicUrl) {
    throw {
      status: 500,
      message: "Image uploaded but public URL could not be resolved.",
    } satisfies PageContentEditorError;
  }

  return { url: publicUrl, path, routePath, fieldKey };
}

// ─────────────────────────────────────────────────────────────────────
// Helper to turn handler errors into JSON Response objects.
// ─────────────────────────────────────────────────────────────────────

export function pageContentErrorToResponse(err: unknown): Response {
  const isShaped =
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    "message" in err &&
    typeof (err as { status: unknown }).status === "number";
  if (isShaped) {
    const e = err as PageContentEditorError;
    return new Response(JSON.stringify({ error: e.message }), {
      status: e.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  const message = err instanceof Error ? err.message : "Request failed.";
  return new Response(JSON.stringify({ error: message }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
