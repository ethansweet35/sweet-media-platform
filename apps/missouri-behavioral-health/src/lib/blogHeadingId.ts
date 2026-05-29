/** Stable anchor IDs for in-article TOC links (must match PostBody h2 ids). */
export function blogHeadingId(text: string, sectionIndex: number): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
  return `${base}-${sectionIndex}`;
}
