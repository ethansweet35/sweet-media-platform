const ALLOWED_IMAGE_HOSTS = [
  "jkiafgbizwufsycqlfyr.supabase.co",
  "images.squarespace-cdn.com",
  "static1.squarespace.com",
  "static.readdy.ai",
  "readdy.ai",
];

/** Legacy scaffold placeholders from other Supabase projects — hide in public UI. */
const LEGACY_PLACEHOLDER_HOSTS = [
  "ynmldknprfusujudvutq.supabase.co/public_bucket",
  "grbxnkgzhquwdqxlscv.supabase.co",
  "papiwmobmdbtzeeebmpr.supabase.co/public_bucket",
];

export function sanitizeBlogImageSrc(src: string | null | undefined): string | null {
  const trimmed = src?.trim();
  if (!trimmed) return null;
  if (LEGACY_PLACEHOLDER_HOSTS.some((fragment) => trimmed.includes(fragment))) {
    return null;
  }
  return trimmed;
}

export function shouldUnoptimizeBlogImage(src: string): boolean {
  try {
    const hostname = new URL(src).hostname;
    return !ALLOWED_IMAGE_HOSTS.includes(hostname);
  } catch {
    return true;
  }
}
