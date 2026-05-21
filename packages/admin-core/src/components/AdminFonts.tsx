"use client";

import { ADMIN_FONT_URL } from "../lib/adminTheme";

/** Loads Outfit + Cormorant Garamond for admin UI on every brand app. */
export default function AdminFonts() {
  return (
    // eslint-disable-next-line @next/next/no-page-custom-font
    <link rel="stylesheet" href={ADMIN_FONT_URL} />
  );
}
