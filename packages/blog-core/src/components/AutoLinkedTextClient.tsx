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
 *   2. One link per destination per page — a path-keyed module-level Map
 *      tracks used hrefs across all instances rendered on the same URL.
 *      The Map entry is cleared whenever the pathname changes (navigation).
 *
 * For pure server components prefer <AutoLinkedText> instead — links are
 * server-rendered, no JS execution required.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

/**
 * Per-page usedHrefs registry keyed by pathname.
 * Cleared on navigation so a fresh page always starts with an empty set.
 */
const _pageUsedHrefs = new Map<string, Set<string>>();

function getPageUsedHrefs(pathname: string): Set<string> {
  if (!_pageUsedHrefs.has(pathname)) {
    _pageUsedHrefs.set(pathname, new Set<string>());
  }
  return _pageUsedHrefs.get(pathname)!;
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

  // Track the instance's own contribution to the page registry so we can
  // remove it if the component unmounts mid-render (e.g. React strict mode).
  const ownLinkedHrefs = useRef<string[]>([]);

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

  // Clear stale page registry on pathname change (client navigation).
  useEffect(() => {
    // Keep only the current page's entry; discard all others.
    for (const key of _pageUsedHrefs.keys()) {
      if (key !== pathname) _pageUsedHrefs.delete(key);
    }
  }, [pathname]);

  const segments = useMemo(() => {
    if (!text || !mappings || mappings.length === 0) return null;

    // Exclude self-links automatically.
    const filtered = effectivePath
      ? mappings.filter((m) => m.href !== effectivePath)
      : mappings;
    if (filtered.length === 0) return null;

    // Share the page-level usedHrefs set across all instances on this path.
    const pageUsedHrefs = getPageUsedHrefs(pathname);
    const before = new Set(pageUsedHrefs);
    const result = autoLinkText(
      text,
      filtered,
      undefined,
      pageUsedHrefs,
      maxLinks
    );

    // Record which hrefs this instance added so we can clean up if needed.
    ownLinkedHrefs.current = [...pageUsedHrefs].filter((h) => !before.has(h));

    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, mappings, effectivePath, pathname, maxLinks]);

  const text = typeof children === "string" ? children : "";

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

export default AutoLinkedTextClient;
