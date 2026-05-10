import { NextResponse, type NextRequest } from "next/server";

/**
 * Stamps the current pathname as an `x-pathname` response header so that
 * server components (e.g. AutoLinkedText) can read the active page path
 * via headers() without needing it threaded down through props.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
