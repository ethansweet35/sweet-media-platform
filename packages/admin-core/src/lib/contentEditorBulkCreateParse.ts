import type {
  ContentEditorBulkJobItem,
  ContentEditorBulkPublishTarget,
} from "../types/content-editor-bulk-job";

function normalizeRoutePath(route: string): string {
  const t = route.trim();
  if (!t) return "";
  return t.startsWith("/") ? t : `/${t}`;
}

export function parseBulkCreateLines(
  raw: string,
  publishTarget: ContentEditorBulkPublishTarget,
): ContentEditorBulkJobItem[] {
  const lines = raw
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const items: ContentEditorBulkJobItem[] = [];

  for (const line of lines) {
    if (publishTarget === "blog") {
      items.push({ keyword: line });
      continue;
    }
    const pipe = line.indexOf("|");
    if (pipe === -1) {
      const route = normalizeRoutePath(line);
      items.push({
        keyword: route.replace(/^\//, "").replace(/-/g, " ") || line,
        route_path: route,
      });
    } else {
      const route = normalizeRoutePath(line.slice(0, pipe).trim());
      const keyword = line.slice(pipe + 1).trim() || route.replace(/^\//, "").replace(/-/g, " ");
      items.push({ keyword, route_path: route });
    }
  }

  return items;
}
