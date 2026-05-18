import type { ReactNode } from "react";
import type { AutoLinkMapping } from "../lib/autoInternalLinks";
import type { PageAutoLinkRegistry } from "../lib/getInternalLinkMappings";
import {
  DEFAULT_LINK_CLASS,
  filterMappingsForPage,
  renderAutoLinkedText,
  resolveAutoLinkedPlainText,
} from "./renderAutoLinkedText";

interface AutoLinkedTextSyncProps {
  children: ReactNode;
  mappings: AutoLinkMapping[];
  registry: PageAutoLinkRegistry;
  currentPath?: string;
  maxLinks?: number;
  linkClassName?: string;
}

/**
 * Synchronous <AutoLinkedText> — use after a single `getInternalLinkMappings()`
 * fetch at the page root to avoid dozens of async server boundaries per page.
 */
export function AutoLinkedTextSync({
  children,
  mappings,
  registry,
  currentPath,
  maxLinks = 2,
  linkClassName = DEFAULT_LINK_CLASS,
}: AutoLinkedTextSyncProps) {
  const text = resolveAutoLinkedPlainText(children);

  if (!text || text.trim().length === 0) {
    return <>{children}</>;
  }

  const effectivePath = currentPath ?? registry.currentPath;
  const filtered = filterMappingsForPage(mappings, effectivePath);

  return (
    <>
      {renderAutoLinkedText(text, filtered, registry, maxLinks, linkClassName)}
    </>
  );
}

export default AutoLinkedTextSync;
