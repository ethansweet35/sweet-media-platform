/** Navigation + footer links aligned to live Squarespace URL paths. */

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

export const aboutDropdownItems = [
  { label: "About TFRF", href: "/about" },
  { label: "About the Foundation", href: "/about-the-family-recovery-foundation" },
  { label: "Partnerships & Resources", href: "/partnerships" },
  { label: "Testimonials", href: "/about/testimonials" },
  { label: "Impact Report", href: "/2025-survey-results" },
] as const;

export const servicesDropdownItems = [
  { label: "Three Pillars", href: "/3-pillars" },
  { label: "Prevention", href: "/prevention" },
  { label: "Education", href: "/education" },
  { label: "Family Programming", href: "/family-programming" },
  { label: "Meetings", href: "/meetings" },
  { label: "Worksheets", href: "/worksheets" },
  { label: "Financial Aid", href: "/financial-aid" },
] as const;

export const eventsDropdownItems = [
  { label: "Events", href: "/events-1" },
  { label: "Annual Gala", href: "/gala" },
  { label: "Nashville Gala", href: "/gala/nashville" },
] as const;

export const mainNavItems = [
  { label: "About", href: "/about", hasDropdown: true as const },
  { label: "Our Services", href: "/3-pillars", hasDropdown: true as const },
  { label: "Events", href: "/gala", hasDropdown: true as const },
  { label: "Donate", href: "/donate", hasDropdown: false as const },
  { label: "Contact", href: "/contact", hasDropdown: false as const },
];
