/**
 * Server-only Surfer SEO API client.
 *
 * Reads `SURFER_API_KEY` (and optional `SURFER_PROJECT_ID`) from process env.
 * Never import this from a client component — the API key must stay server-side.
 *
 * Surfer API docs: https://app.surferseo.com/api/v1/docs
 * Auth: every request sends `API-KEY: <key>` header.
 */

const SURFER_BASE_URL = "https://app.surferseo.com/api/v1";

export class SurferApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "SurferApiError";
    this.status = status;
    this.body = body;
  }
}

interface SurferEnv {
  apiKey: string;
  projectId: number | null;
}

export function getSurferEnv(): SurferEnv {
  const apiKey = (process.env.SURFER_API_KEY ?? "").trim();
  if (!apiKey) {
    throw new SurferApiError(
      "SURFER_API_KEY is not configured. Add it to the app's Vercel environment variables.",
      500,
      null,
    );
  }
  const rawProj = (process.env.SURFER_PROJECT_ID ?? "").trim();
  const projectId = rawProj ? Number(rawProj) : null;
  return {
    apiKey,
    projectId: projectId && Number.isFinite(projectId) ? projectId : null,
  };
}

async function surferFetch<T>(
  path: string,
  init: RequestInit & { apiKey: string },
): Promise<T> {
  const { apiKey, headers, ...rest } = init;
  const res = await fetch(`${SURFER_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "API-KEY": apiKey,
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    cache: "no-store",
  });

  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    let summary = `Surfer API error (HTTP ${res.status})`;
    if (typeof body === "string") {
      summary = body.slice(0, 500);
    } else if (typeof body === "object" && body !== null) {
      const b = body as Record<string, unknown>;
      // Try scalar fields first
      const scalar = b["message"] ?? b["error"] ?? b["detail"];
      if (typeof scalar === "string") {
        summary = scalar;
      } else if (Array.isArray(b["errors"]) && (b["errors"] as unknown[]).length > 0) {
        // errors array — each item may be a string or an object with a message field
        const first = (b["errors"] as unknown[])[0];
        if (typeof first === "string") {
          summary = first;
        } else if (typeof first === "object" && first !== null) {
          const fm = (first as Record<string, unknown>)["message"] ??
            (first as Record<string, unknown>)["detail"] ??
            (first as Record<string, unknown>)["error"];
          summary = typeof fm === "string" ? fm : JSON.stringify(b["errors"]).slice(0, 300);
        }
      } else {
        summary = `Surfer API error (HTTP ${res.status}): ${JSON.stringify(body).slice(0, 300)}`;
      }
    }
    throw new SurferApiError(summary, res.status, body);
  }

  return body as T;
}

// =========================================================
// Audit endpoints (live URL → content score)
// =========================================================

export interface SurferAuditCreateInput {
  url: string;
  /** Primary keyword the page targets. Required by the Audit endpoint. */
  keywords: string[];
  /** Surfer location string (e.g. "United States"). */
  location?: string;
  /** "desktop" | "mobile" — Surfer crawler type. */
  device?: "desktop" | "mobile";
}

export interface SurferAuditCreateResponse {
  state: "scheduled" | "completed" | "error" | string;
  id: number;
}

export async function createAudit(
  input: SurferAuditCreateInput,
): Promise<SurferAuditCreateResponse> {
  const { apiKey, projectId } = getSurferEnv();
  // Surfer audit endpoint accepts `keywords` (array) per their docs.
  // Some account types also require `project_id`.
  const body: Record<string, unknown> = {
    url: input.url,
    // Surfer Audit API uses singular `keyword`, not an array
    keyword: input.keywords[0],
    location: input.location ?? "United States",
    device: input.device ?? "mobile",
  };
  if (projectId) body.project_id = projectId;
  return surferFetch<SurferAuditCreateResponse>("/audits", {
    apiKey,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface SurferAuditDetail {
  state: "scheduled" | "completed" | "error" | string;
  id: number;
  audited_page?: {
    url: string;
    content_score: number | null;
  };
  competitors_pages?: Array<{
    url: string;
    content_score: number | null;
  }>;
  /** Some endpoints surface error messages here when state = "error". */
  error?: string | null;
  message?: string | null;
}

export async function getAudit(auditId: number): Promise<SurferAuditDetail> {
  const { apiKey } = getSurferEnv();
  return surferFetch<SurferAuditDetail>(`/audits/${auditId}`, {
    apiKey,
    method: "GET",
  });
}

// =========================================================
// Content Editor endpoints
// =========================================================

export interface SurferContentEditorCreateInput {
  keywords: string[];
  location?: string;
  device?: "desktop" | "mobile";
  /** Optional language override. Defaults to language matching `location`. */
  language?: string;
}

export interface SurferContentEditorCreateResponse {
  state: "scheduled" | "completed" | "error" | string;
  id: number;
  permalink_hash: string;
}

export async function createContentEditor(
  input: SurferContentEditorCreateInput,
): Promise<SurferContentEditorCreateResponse> {
  const { apiKey, projectId } = getSurferEnv();
  const body: Record<string, unknown> = {
    keywords: input.keywords,
    location: input.location ?? "United States",
    device: input.device ?? "mobile",
  };
  if (input.language) body.language = input.language;
  // Surfer historically used `folder_id` for organizing queries; some accounts
  // accept `project_id` instead. We send both — Surfer ignores unknown fields.
  if (projectId) {
    body.project_id = projectId;
    body.folder_id = projectId;
  }

  return surferFetch<SurferContentEditorCreateResponse>("/content_editors", {
    apiKey,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface SurferContentEditorContent {
  content?: string;
  content_score?: number | null;
  state?: string;
}

export async function getContentEditorContent(
  contentEditorId: number,
): Promise<SurferContentEditorContent> {
  const { apiKey } = getSurferEnv();
  return surferFetch<SurferContentEditorContent>(
    `/content_editors/${contentEditorId}/content`,
    { apiKey, method: "GET" },
  );
}
