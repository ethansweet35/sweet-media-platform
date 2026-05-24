import { headers } from "next/headers";
import { normalizeRoutePath } from "../../components/page-editor/routePath";

/**
 * Current public route for inline page-editor field lookups.
 * Set by `withPageEditorPathname` middleware on each client app.
 */
export async function getPageEditorRoutePath(): Promise<string> {
  const headerList = await headers();
  const fromMiddleware = headerList.get("x-pathname");
  if (fromMiddleware) {
    return normalizeRoutePath(fromMiddleware);
  }
  return "/";
}
