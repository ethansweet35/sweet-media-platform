import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let path: string;
  try {
    const body = await request.json();
    path = body.path;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!path || typeof path !== "string" || !path.startsWith("/")) {
    return NextResponse.json({ error: "path must be a string starting with /" }, { status: 400 });
  }

  revalidatePath(path);
  revalidateTag("tracked-page-metadata");
  return NextResponse.json({ revalidated: true, path });
}
