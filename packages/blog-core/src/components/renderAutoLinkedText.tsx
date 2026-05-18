import type { ReactNode } from "react";
import Link from "next/link";
import { autoLinkText, type AutoLinkMapping } from "../lib/autoInternalLinks";
import type { PageAutoLinkRegistry } from "../lib/getInternalLinkMappings";

const DEFAULT_LINK_CLASS =
  "underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors";

export function normalizeAutoLinkPath(path: string): string {
  if (!path || path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function filterMappingsForPage(
  mappings: AutoLinkMapping[],
  effectivePath: string | null | undefined,
): AutoLinkMapping[] {
  const normalizedSelf = effectivePath ? normalizeAutoLinkPath(effectivePath) : null;
  if (!normalizedSelf) return mappings;
  return mappings.filter((m) => normalizeAutoLinkPath(m.href) !== normalizedSelf);
}

export function renderAutoLinkedText(
  text: string,
  mappings: AutoLinkMapping[],
  registry: PageAutoLinkRegistry,
  maxLinks: number,
  linkClassName: string,
): ReactNode {
  if (!text || text.trim().length === 0) {
    return text;
  }

  if (mappings.length === 0) {
    return text;
  }

  const segments = autoLinkText(text, mappings, undefined, registry.usedHrefs, maxLinks);

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

export function resolveAutoLinkedPlainText(
  children: ReactNode,
): string {
  return typeof children === "string" ? children : "";
}

export { DEFAULT_LINK_CLASS };
