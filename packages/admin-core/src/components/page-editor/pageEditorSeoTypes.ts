/** Stored in page_content_overrides; synced to tracked_pages / blog_posts on publish. */
export const SEO_OVERRIDE_KEYS = {
  pageTitle: "__seo.page_title",
  seoTitle: "__seo.seo_title",
  metaDescription: "__seo.meta_description",
  slug: "__seo.slug",
} as const;

export const SEO_OVERRIDE_KEY_LIST = Object.values(SEO_OVERRIDE_KEYS);

export type PageEditorEntityType = "page" | "blog" | "unsupported";

export interface PageEditorSeoSnapshot {
  pageTitle: string;
  seoTitle: string;
  metaDescription: string;
  /** Path segment only (no leading slash). */
  slug: string;
}

export interface PageEditorSeoContextResult {
  entityType: PageEditorEntityType;
  routePath: string;
  blogSlug: string | null;
  source: PageEditorSeoSnapshot;
  publishedOverrides: Partial<PageEditorSeoSnapshot>;
  draftOverrides: Partial<PageEditorSeoSnapshot>;
  effective: PageEditorSeoSnapshot;
  trackedPageId: string | null;
  blogPostId: string | null;
}
