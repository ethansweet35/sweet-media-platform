import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Attach the request pathname so server components can resolve
 * `page_content_overrides` for the current page without passing routePath
 * on every <EditableText>.
 */
export function withPageEditorPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
