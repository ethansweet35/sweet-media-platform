import { NextResponse } from "next/server";
import {
  handleAdminUsersGet,
  handleAdminUsersPost,
  handleAdminUsersDelete,
  pageContentErrorToResponse,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const result = await handleAdminUsersGet(request);
    return NextResponse.json(result);
  } catch (err) {
    return pageContentErrorToResponse(err);
  }
}

export async function POST(request: Request) {
  try {
    const result = await handleAdminUsersPost(request);
    return NextResponse.json(result);
  } catch (err) {
    return pageContentErrorToResponse(err);
  }
}

export async function DELETE(request: Request) {
  try {
    const result = await handleAdminUsersDelete(request);
    return NextResponse.json(result);
  } catch (err) {
    return pageContentErrorToResponse(err);
  }
}

