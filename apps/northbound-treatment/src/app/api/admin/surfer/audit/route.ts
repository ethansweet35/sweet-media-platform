import { NextResponse } from "next/server";
import {
  kickAudit,
  pollAuditAndPersist,
  getAuditDetails,
  SurferApiError,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") as "blog" | "page" | null;
  const id = searchParams.get("id")?.trim();
  if (!kind || (kind !== "blog" && kind !== "page")) {
    return NextResponse.json({ error: "kind must be 'blog' or 'page'." }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }
  try {
    const details = await getAuditDetails(kind, id);
    return NextResponse.json({ ok: true, ...details });
  } catch (err) {
    if (err instanceof SurferApiError) {
      return NextResponse.json(
        { ok: false, error: err.message, surfer_body: err.body },
        { status: err.status >= 400 && err.status < 600 ? err.status : 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to fetch audit details." },
      { status: 500 },
    );
  }
}

interface AuditRequest {
  kind?: "blog" | "page";
  id?: string;
  /** When true, polls + persists the latest state instead of kicking a new audit. */
  poll?: boolean;
}

export async function POST(request: Request) {
  let body: AuditRequest;
  try {
    body = (await request.json()) as AuditRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const kind = body.kind;
  const id = body.id?.trim();
  if (!kind || (kind !== "blog" && kind !== "page")) {
    return NextResponse.json({ error: "kind must be 'blog' or 'page'." }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  try {
    if (body.poll) {
      const r = await pollAuditAndPersist(kind, id);
      return NextResponse.json({ ok: true, ...r });
    }
    const r = await kickAudit(kind, id);
    return NextResponse.json({ ok: true, ...r });
  } catch (err) {
    if (err instanceof SurferApiError) {
      return NextResponse.json(
        { ok: false, error: err.message, status: err.status, surfer_body: err.body },
        { status: err.status >= 400 && err.status < 600 ? err.status : 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Surfer audit failed." },
      { status: 500 },
    );
  }
}
