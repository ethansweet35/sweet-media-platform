/**
 * <AutoLinkedText> — async Server Component for marketing-page prose.
 *
 * Wraps a string of body text and renders real <a> tags for any phrases that
 * match the active rows in the `internal_links` table for the current
 * Supabase project. All links are server-rendered HTML — Google sees them as
 * first-class internal links, not JavaScript-injected text.
 *
 * Usage (inside any Server Component view file):
 *
 *   <p className="text-base leading-7 text-[#64748b]">
 *     <AutoLinkedText>
 *       Northbound offers comprehensive alcohol detox and residential
 *       treatment for adults across Southern California.
 *     </AutoLinkedText>
 *   </p>
 *
 * Tenant isolation: reads from the current app's NEXT_PUBLIC_SUPABASE_URL
 * (Service role key preferred, anon key fallback). No cross-tenant queries.
 *
 * Per-block link cap defaults to 2 (lower than the blog default of 4) to
 * avoid over-linking on marketing copy. Pass `maxLinks` to override.
 *
 * Self-link guard: pass `currentPath` to suppress links pointing back to the
 * current page (e.g. on `/programs/detox`, the word "detox" won't auto-link
 * to itself).
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { autoLinkText } from "../lib/autoInternalLinks";
import { getInternalLinkMappings } from "../lib/getInternalLinkMappings";

interface AutoLinkedTextProps {
  /**
   * Plain text body. Accepts string or any ReactNode that resolves to a string
   * at render time (e.g. `data.body` typed as `string` from a data file).
   * Non-string children are passed through unchanged.
   */
  children: ReactNode;
  /** Current route path (e.g. "/programs/detox") to suppress self-links. Optional. */
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

  const allMappings = await getInternalLinkMappings();

  // Drop any mapping that points to the current page so we never self-link.
  const mappings = currentPath
    ? allMappings.filter((m) => m.href !== currentPath)
    : allMappings;

  if (mappings.length === 0) {
    return <>{text}</>;
  }

  const segments = autoLinkText(text, mappings, undefined, undefined, maxLinks);

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

export default AutoLinkedText;
