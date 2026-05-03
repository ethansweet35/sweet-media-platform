export type BrandSettings = {
  id: string;
  site_key: string;
  site_name: string;
  site_url: string | null;
  logo_url: string | null;

  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  background_color: string | null;

  heading_font: string | null;
  body_font: string | null;

  tone: string | null;
  audience: string | null;

  author_name: string | null;
  author_title: string | null;
  author_bio: string | null;

  blog_categories: string[];

  image_style_prompt: string | null;
  image_negative_prompt: string | null;

  image_bucket: string | null;
  image_folder: string | null;

  contact_phone: string | null;
  contact_email: string | null;
  cta_label: string | null;
  cta_href: string | null;

  created_at: string;
  updated_at: string;
};
