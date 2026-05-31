"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import type { AutoLinkMapping } from "../lib/autoInternalLinks";
import type { PageAutoLinkRegistry } from "../lib/getInternalLinkMappings";

export type AutoLinkPageContextValue = {
  mappings: AutoLinkMapping[];
  registry: PageAutoLinkRegistry;
};

const AutoLinkPageContext = createContext<AutoLinkPageContextValue | null>(null);

export function AutoLinkPageContextProvider({
  mappings,
  currentPath,
  children,
}: {
  mappings: AutoLinkMapping[];
  currentPath: string;
  children: ReactNode;
}) {
  const registryRef = useRef<PageAutoLinkRegistry | null>(null);
  if (!registryRef.current) {
    registryRef.current = { usedHrefs: new Set<string>(), currentPath };
  }
  registryRef.current.currentPath = currentPath;

  return (
    <AutoLinkPageContext.Provider value={{ mappings, registry: registryRef.current }}>
      {children}
    </AutoLinkPageContext.Provider>
  );
}

export function useAutoLinkPageContext(): AutoLinkPageContextValue | null {
  return useContext(AutoLinkPageContext);
}
