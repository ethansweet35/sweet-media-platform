/** Generic categories seeded by client-template / setup-new-client for every new site. */
export const TEMPLATE_BLOG_CATEGORY_NAMES = [
  "Company News",
  "Education",
  "Resources",
  "Guides",
] as const;

/** Per-brand canonical blog categories (admin dropdowns + public filters). */
export const BRAND_BLOG_CATEGORY_DEFAULTS: Record<string, readonly string[]> = {
  "sweet-media": [
    "SEO",
    "Paid Media",
    "Web Development",
    "Social Media",
    "Compliance",
    "Strategy",
  ],
  "addiction-interventions": [
    "Addiction & Recovery",
    "Alcohol",
    "Intervention",
    "Mental Health",
    "State Resources",
    "Strategy",
  ],
  "northbound-treatment": [
    "Addiction Treatment",
    "Mental Health",
    "Family Resources",
    "Insurance & Admissions",
    "Recovery & Aftercare",
    "Clinical Education",
  ],
  "inner-peak-colorado": [
    "Mental Health",
    "Women's Treatment",
    "Levels of Care",
    "Therapy & Healing",
    "Family & Support",
    "Colorado Resources",
  ],
  "cipher-billing": [
    "Billing & Coding",
    "Revenue Cycle",
    "Compliance",
    "IOP & PHP Billing",
    "Insurance & Payers",
    "Practice Management",
  ],
  "rize-oc": [
    "Treatment & Recovery",
    "Mental Health",
    "Family Resources",
    "Orange County",
    "Admissions & Insurance",
    "Education",
  ],
  "simple-health": [
    "Weight Loss",
    "Peptides & Hormones",
    "GLP-1",
    "Wellness",
    "Patient Education",
    "Treatment Guides",
  ],
  "adolescent-mental-health": [
    "Teen Mental Health",
    "Family Support",
    "Treatment Programs",
    "School & Social Life",
    "Crisis & Safety",
    "Parent Resources",
  ],
  "the-family-recovery-foundation": [
    "Family Recovery",
    "Education",
    "Community",
    "Resources",
    "Events",
    "Support",
  ],
  "mountainview-treatment": [
    "Addiction Treatment",
    "Mental Health",
    "Veterans & Tricare",
    "Family Resources",
    "Levels of Care",
    "Nevada Resources",
  ],
  "client-template": [...TEMPLATE_BLOG_CATEGORY_NAMES],
};

export function getBrandBlogCategoryDefaults(siteId: string): string[] | null {
  const list = BRAND_BLOG_CATEGORY_DEFAULTS[siteId];
  return list ? [...list] : null;
}

export function isTemplateBlogCategoryList(names: string[]): boolean {
  if (names.length !== TEMPLATE_BLOG_CATEGORY_NAMES.length) return false;
  const set = new Set(names.map((n) => n.trim()));
  return TEMPLATE_BLOG_CATEGORY_NAMES.every((t) => set.has(t));
}

/** Slug for `blog_categories.slug` from display name. */
export function blogCategoryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
