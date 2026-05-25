/** Routes kept live for admins/legacy URLs but not indexed or linked in public nav */
export const DRAFT_PAGE_PATHS = [
  "/contact-us/",
  "/admissions-process/",
  "/admissions/",
] as const;

export type DraftPagePath = (typeof DRAFT_PAGE_PATHS)[number];

export function isDraftPagePath(path: string): boolean {
  const norm = path.endsWith("/") ? path : `${path}/`;
  return (DRAFT_PAGE_PATHS as readonly string[]).includes(norm);
}
