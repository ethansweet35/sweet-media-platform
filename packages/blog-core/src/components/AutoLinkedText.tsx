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
 *
 * For pages with many text blocks (e.g. homepage), prefer fetching mappings once
 * and using <AutoLinkedTextSync> to avoid dozens of async boundaries.
 */

import type { ReactNode } from "react";
import {
  getInternalLinkMappings,
  getPageAutoLinkRegistry,
} from "../lib/getInternalLinkMappings";
import {
  filterMappingsForPage,
  renderAutoLinkedText,
  resolveAutoLinkedPlainText,
  DEFAULT_LINK_CLASS,
} from "./renderAutoLinkedText";

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

export async function AutoLinkedText({
  children,
  currentPath,
  maxLinks = 2,
  linkClassName = DEFAULT_LINK_CLASS,
}: AutoLinkedTextProps) {
  const text = resolveAutoLinkedPlainText(children);

  if (!text || text.trim().length === 0) {
    return <>{children}</>;
  }

  const [allMappings, registry] = await Promise.all([
    getInternalLinkMappings(),
    Promise.resolve(getPageAutoLinkRegistry()),
  ]);

  const effectivePath = currentPath ?? registry.currentPath;
  const mappings = filterMappingsForPage(allMappings, effectivePath);

  if (mappings.length === 0) {
    return <>{text}</>;
  }

  return (
    <>
      {renderAutoLinkedText(text, mappings, registry, maxLinks, linkClassName)}
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
