"use client";

/**
 * <AutoLinkedTextClient> — drop-in client variant of <AutoLinkedText>.
 *
 * Use inside files marked "use client" (e.g. shared templates with
 * accordion/form state). Fetches the active internal_links mappings once
 * on mount via the public anon client, caches them at module level so
 * subsequent instances reuse the result, and renders real <a> tags into
 * the DOM. Google's modern crawler executes JS and indexes these links.
 *
 * Platform linking rules enforced automatically:
 *   1. No self-links — automatically detected via usePathname() so no prop
 *      needed. The current page's href is always excluded from linking.
 *   2. Per-instance link cap via `maxLinks` (default 2). Each instance
 *      links independently — no cross-instance shared state to mutate
 *      during render, which would crash React 19 concurrent client
 *      navigation between pages that render many instances (e.g. location
 *      pages with 15-26 instances each). Cross-instance dedup is left
 *      to the server-rendered <AutoLinkedText> variant which uses
 *      React.cache() for a safe per-request registry.
 *
 * For pure server components prefer <AutoLinkedText> instead — links are
 * server-rendered, no JS execution required.
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { autoLinkText, type AutoLinkMapping } from "../lib/autoInternalLinks";
import { fetchManualLinkMappings } from "../lib/autoInternalLinks";

interface Props {
  children: ReactNode;
  /** Explicit path override — only needed in rare cases; normally auto-detected. */
  currentPath?: string;
  maxLinks?: number;
  linkClassName?: string;
}

const DEFAULT_LINK_CLASS =
  "underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors";

// Module-level mapping cache (one DB fetch shared by all instances).
// Read-only after initial fetch — safe across navigations.
let _cachedMappings: AutoLinkMapping[] | null = null;
let _inFlight: Promise<AutoLinkMapping[]> | null = null;

async function getCachedMappings(): Promise<AutoLinkMapping[]> {
  if (_cachedMappings) return _cachedMappings;
  if (_inFlight) return _inFlight;
  _inFlight = fetchManualLinkMappings().then((data) => {
    _cachedMappings = data;
    _inFlight = null;
    return data;
  });
  return _inFlight;
}

export function AutoLinkedTextClient({
  children,
  currentPath,
  maxLinks = 2,
  linkClassName = DEFAULT_LINK_CLASS,
}: Props) {
  const pathname = usePathname();
  const effectivePath = currentPath ?? pathname;

  const [mappings, setMappings] = useState<AutoLinkMapping[] | null>(
    _cachedMappings
  );

  useEffect(() => {
    if (mappings !== null) return;
    let cancelled = false;
    getCachedMappings().then((m) => {
      if (!cancelled) setMappings(m);
    });
    return () => {
      cancelled = true;
    };
  }, [mappings]);

  const text = typeof children === "string" ? children : "";

  const segments = useMemo(() => {
    if (!text || !mappings || mappings.length === 0) return null;

    // Exclude self-links automatically — normalize trailing slashes so
    // "/foo" and "/foo/" compare equal.
    const normalizedSelf = effectivePath ? normalizePath(effectivePath) : null;
    const filtered = normalizedSelf
      ? mappings.filter((m) => normalizePath(m.href) !== normalizedSelf)
      : mappings;
    if (filtered.length === 0) return null;

    // Pure: each instance gets its own fresh Set. No cross-instance dedup
    // on the client (the cost of safe concurrent rendering). The
    // server-rendered <AutoLinkedText> handles cross-instance dedup safely
    // via React.cache().
    return autoLinkText(text, filtered, undefined, new Set<string>(), maxLinks);
  }, [text, mappings, effectivePath, maxLinks]);

  if (!segments) {
    return <>{text || children}</>;
  }

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

/** Strip a single trailing slash so "/foo/" and "/foo" compare equal. */
function normalizePath(path: string): string {
  if (!path || path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export default AutoLinkedTextClient;
