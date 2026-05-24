import type { NextRequest } from "next/server";
import { withPageEditorPathname } from "@sweetmedia/admin-core/middleware";

export function middleware(request: NextRequest) {
  return withPageEditorPathname(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
