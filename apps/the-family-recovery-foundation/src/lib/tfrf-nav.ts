/** Navigation + footer links aligned to live Squarespace (tfrfoundation.org). */

export const SOCIAL_LINKS = [
  { icon: "ri-youtube-fill", href: "https://www.youtube.com/@tfrfoundation", label: "YouTube", color: "text-red-600" },
  { icon: "ri-tiktok-fill", href: "https://www.tiktok.com/@tfr.foundation", label: "TikTok", color: "text-deep-navy" },
  { icon: "ri-instagram-line", href: "https://www.instagram.com/tfr_foundation", label: "Instagram", color: "text-deep-navy" },
  {
    icon: "ri-facebook-fill",
    href: "https://www.facebook.com/profile.php?id=100092215663251",
    label: "Facebook",
    color: "text-deep-navy",
  },
] as const;

export const LOGO_SRC =
  "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_static_c47e20f5f72a.jpg";

/** White logo for transparent header over the home hero */
export const LOGO_SRC_OVERLAY =
  "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_beab34e0_TheFamilyRecoveryFoundation-FooterWhiteLogo.png";

/** Canonical about page (live “About TFRF” — same content as legacy /about) */
export const ABOUT_HREF = "/about-the-family-recovery-foundation";

export const aboutDropdownItems = [
  { label: "About TFRF", href: ABOUT_HREF },
  { label: "Partnerships & Resources", href: "/partnerships" },
  { label: "Testimonials", href: "/about/testimonials" },
  { label: "Impact Report", href: "/2025-survey-results" },
] as const;

export const servicesDropdownItems = [
  { label: "Family Services", href: "/family-programming" },
] as const;

export const eventsDropdownItems = [
  { label: "Oklahoma Gala", href: "/gala" },
  { label: "Nashville Gala", href: "/gala/nashville" },
] as const;

export const contactDropdownItems = [
  { label: "Contact", href: "/contact" },
  { label: "Get Help", href: "/get-help" },
] as const;

export const mainNavItems = [
  { label: "About", href: ABOUT_HREF, hasDropdown: true as const, dropdown: "about" as const },
  { label: "Our Services", href: "/family-programming", hasDropdown: true as const, dropdown: "services" as const },
  { label: "Events", href: "/gala", hasDropdown: true as const, dropdown: "events" as const },
  { label: "Donate", href: "/donate", hasDropdown: false as const, dropdown: null },
  { label: "Contact", href: "/contact", hasDropdown: true as const, dropdown: "contact" as const },
] as const;

export const footerLinkColumns = [
  {
    title: "About Us",
    links: [
      { label: "About Us", href: ABOUT_HREF },
      { label: "Get Help", href: "/get-help" },
      { label: "Donate", href: "/donate" },
      { label: "Get Involved", href: "/get-involved" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learn More",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Events", href: "/gala" },
    ],
  },
] as const;

export const CONTACT_EMAIL = "info@tfrfoundation.org";
export const CONTACT_PHONE = "888-964-8825";
export const CONTACT_PHONE_HREF = "tel:8889648825";
