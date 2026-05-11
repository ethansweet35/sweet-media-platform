import { NextResponse } from "next/server";
import {
  createEditorForRow,
  SurferApiError,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CreateEditorRequest {
  kind?: "blog" | "page";
  id?: string;
  /** Optional override; defaults to the row's primary keyword. */
  keyword?: string;
}

export async function POST(request: Request) {
  let body: CreateEditorRequest;
  try {
    body = (await request.json()) as CreateEditorRequest;
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
    const r = await createEditorForRow(kind, id, {
      keywordOverride: body.keyword?.trim() || undefined,
    });
    return NextResponse.json({ ok: true, ...r });
  } catch (err) {
    if (err instanceof SurferApiError) {
      return NextResponse.json(
        { ok: false, error: err.message, status: err.status, body: err.body },
        { status: err.status >= 400 && err.status < 600 ? err.status : 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to create Content Editor." },
      { status: 500 },
    );
  }
}
