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
 * For pure server components prefer <AutoLinkedText> instead — links are
 * server-rendered, no JS execution required.
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { autoLinkText, type AutoLinkMapping } from "../lib/autoInternalLinks";
import { fetchManualLinkMappings } from "../lib/autoInternalLinks";

interface Props {
  children: ReactNode;
  currentPath?: string;
  maxLinks?: number;
  linkClassName?: string;
}

const DEFAULT_LINK_CLASS =
  "underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors";

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
    const filtered = currentPath
      ? mappings.filter((m) => m.href !== currentPath)
      : mappings;
    if (filtered.length === 0) return null;
    return autoLinkText(text, filtered, undefined, undefined, maxLinks);
  }, [text, mappings, currentPath, maxLinks]);

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
