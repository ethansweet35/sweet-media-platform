/**
 * <AutoLinkedText> — async Server Component for marketing-page prose.
 *
 * Wraps a string of body text and renders real <a> tags for any phrases that
 * match the active rows in the `internal_links` table for the current
 * Supabase project. All links are server-rendered HTML — Google sees them as
 * first-class internal links, not JavaScript-injected text.
 *
 * Platform linking rules enforced automatically:
 *   1. No self-links — pass `currentPath` (e.g. "/programs/detox") to suppress
 *      any link pointing back to the current page. All components on the same
 *      page share a per-request registry so `currentPath` only needs to be set
 *      once via `initPageAutoLinks(path)` rather than on every instance.
 *   2. One link per destination per page — a shared per-request `usedHrefs`
 *      Set (via React.cache) prevents the same destination from being linked
 *      more than once across all <AutoLinkedText> blocks on the same page.
 *   3. Per-block link cap defaults to 2.  Pass `maxLinks` to override.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { autoLinkText } from "../lib/autoInternalLinks";
import {
  getInternalLinkMappings,
  getPageAutoLinkRegistry,
} from "../lib/getInternalLinkMappings";

interface AutoLinkedTextProps {
  /**
   * Plain text body. Accepts string or any ReactNode that resolves to a string
   * at render time (e.g. `data.body` typed as `string` from a data file).
   * Non-string children are passed through unchanged.
   */
  children: ReactNode;
  /**
   * Current route path (e.g. "/programs/detox") to suppress self-links.
   * Optional — if omitted the registry's `currentPath` is used instead
   * (set once via `initPageAutoLinks` in the page's root component).
   */
  currentPath?: string;
  /** Max links per text block (default 2). */
  maxLinks?: number;
  /** Tailwind classes applied to each rendered <a>. */
  linkClassName?: string;
}

const DEFAULT_LINK_CLASS =
  "underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors";

export async function AutoLinkedText({
  children,
  currentPath,
  maxLinks = 2,
  linkClassName = DEFAULT_LINK_CLASS,
}: AutoLinkedTextProps) {
  const text = typeof children === "string" ? children : "";

  if (!text || text.trim().length === 0) {
    return <>{children}</>;
  }

  const [allMappings, registry] = await Promise.all([
    getInternalLinkMappings(),
    Promise.resolve(getPageAutoLinkRegistry()),
  ]);

  // Dynamically import next/headers so Turbopack never statically traces it
  // into client bundles (blog-core is also imported by client-side code paths
  // via admin-core). At SSR runtime inside a Server Component this resolves
  // normally; in any client-bundle analysis pass it is silently skipped.
  let xPathname: string | null = null;
  try {
    const { headers } = await import("next/headers");
    const h = await headers();
    xPathname = h.get("x-pathname");
  } catch {
    // Not in a server context or running outside App Router — safe to ignore.
  }

  // Resolve the effective current path — priority order:
  //   1. Explicit `currentPath` prop
  //   2. Path registered via initPageAutoLinks() in the page root
  //   3. `x-pathname` header injected by proxy (automatic, no props needed)
  const effectivePath = currentPath ?? registry.currentPath ?? xPathname;

  // Drop any mapping that points to the current page so we never self-link.
  const mappings = effectivePath
    ? allMappings.filter((m) => m.href !== effectivePath)
    : allMappings;

  if (mappings.length === 0) {
    return <>{text}</>;
  }

  // Pass the shared registry usedHrefs so every <AutoLinkedText> on this page
  // contributes to — and respects — the same "one link per destination" set.
  const segments = autoLinkText(
    text,
    mappings,
    undefined,
    registry.usedHrefs,
    maxLinks
  );

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          return <span key={i}>{seg.content}</span>;
        }
        return (
          <Link key={i} href={seg.href ?? "/"} className={linkClassName}>
            {seg.content}
          </Link>
        );
      })}
    </>
  );
}

/**
 * Call this once at the top of any Server Component page that uses
 * <AutoLinkedText>, passing the page's own route path.  Every
 * <AutoLinkedText> rendered below it will automatically skip that path.
 *
 * Example (in a page.tsx Server Component):
 *
 *   import { initPageAutoLinks } from "@sweetmedia/blog-core";
 *   initPageAutoLinks("/programs/detox");
 */
export function initPageAutoLinks(path: string): void {
  const registry = getPageAutoLinkRegistry();
  registry.currentPath = path;
}

export default AutoLinkedText;
