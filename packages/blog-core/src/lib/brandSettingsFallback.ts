import type { BrandSettings } from "../types/brandSettings";

export const defaultBrandSettings: Partial<BrandSettings> = {
  site_key: "default",
  site_name: "Website",
  primary_color: "#1F2937",
  secondary_color: "#6B7280",
  accent_color: "#6B7280",
  background_color: "#FFFFFF",
  heading_font: "Cormorant Garamond",
  body_font: "DM Sans",
  blog_categories: [],
  image_bucket: "site-assets",
  image_folder: "blog-featured",
};

export function mergeBrandSettings(
  data: Partial<BrandSettings> | null,
): Partial<BrandSettings> {
  return {
    ...defaultBrandSettings,
    ...(data ?? {}),
  };
}
