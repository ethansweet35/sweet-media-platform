import { NextResponse } from "next/server";
import {
  handleAdminForgotPasswordPost,
  pageContentErrorToResponse,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const result = await handleAdminForgotPasswordPost(request);
    return NextResponse.json(result);
  } catch (err) {
    return pageContentErrorToResponse(err);
  }
}
