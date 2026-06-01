/** Canonical Cipher Billing blog byline — matches `brand_settings` for cipher-billing. */
export const DEFAULT_BLOG_AUTHOR = "Cipher Billing";
export const DEFAULT_BLOG_AUTHOR_ROLE = "Behavioral Health Billing Team";
export const DEFAULT_BLOG_AUTHOR_BIO =
  "Cipher Billing specializes in revenue cycle management for behavioral health organizations, helping mental health and substance use treatment providers maximize reimbursements and reduce claim denials.";

const LEGACY_AUTHOR_NAMES = new Set([
  "",
  "ethan sweet",
  "cipher admin",
  "sweet media",
]);

const LEGACY_AUTHOR_ROLES = new Set([
  "",
  "founder",
  "cipher billing team",
  "billing team",
  "content team",
]);

export function blogAuthorName(author?: string | null): string {
  const trimmed = author?.trim() ?? "";
  if (LEGACY_AUTHOR_NAMES.has(trimmed.toLowerCase())) {
    return DEFAULT_BLOG_AUTHOR;
  }
  return trimmed || DEFAULT_BLOG_AUTHOR;
}

export function blogAuthorRole(author?: string | null, role?: string | null): string {
  const name = blogAuthorName(author);
  const trimmedRole = role?.trim() ?? "";
  if (name !== (author?.trim() ?? "") || LEGACY_AUTHOR_ROLES.has(trimmedRole.toLowerCase())) {
    return DEFAULT_BLOG_AUTHOR_ROLE;
  }
  return trimmedRole || DEFAULT_BLOG_AUTHOR_ROLE;
}

export function blogAuthorInitials(author?: string | null): string {
  return blogAuthorName(author)
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}
