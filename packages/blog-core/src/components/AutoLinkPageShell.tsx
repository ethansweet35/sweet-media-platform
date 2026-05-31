import { getInternalLinkMappings } from "../lib/getInternalLinkMappings";
import { AutoLinkPageContextProvider } from "./AutoLinkPageContext";

function normalizeRoutePath(routePath: string): string {
  if (!routePath) return "/";
  let trimmed = routePath.trim();
  if (!trimmed.startsWith("/")) trimmed = `/${trimmed}`;
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
}

/**
 * Server wrapper for client pages that use many `<AutoLinkedTextClient>` blocks.
 * Fetches internal_links once on the server so links are in the initial HTML
 * and client components skip the post-hydration Supabase fetch.
 */
export async function AutoLinkPageShell({
  routePath,
  children,
}: {
  routePath: string;
  children: React.ReactNode;
}) {
  const mappings = await getInternalLinkMappings();
  const normalized = normalizeRoutePath(routePath);

  return (
    <AutoLinkPageContextProvider mappings={mappings} currentPath={normalized}>
      {children}
    </AutoLinkPageContextProvider>
  );
}

export default AutoLinkPageShell;
