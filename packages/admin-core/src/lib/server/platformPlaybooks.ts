/**
 * Platform-specific overrides for generic Lighthouse recommendations.
 */

import type { SitePlatform, SpeedTestRecommendation } from "../../types/speed-test";

type AuditOverride = {
  summary?: string;
  whyItMatters?: string;
  actions?: string[];
};

const OVERRIDES: Partial<Record<SitePlatform, Record<string, AuditOverride>>> = {
  "wordpress-elementor": {
    "render-blocking-insight": {
      summary: "Elementor and WordPress are loading styles before your hero appears.",
      whyItMatters:
        "Families on mobile often leave if the page looks blank for more than 2–3 seconds — you lose calls before they see your phone number.",
      actions: [
        "In Elementor → Settings → Advanced, enable improved asset loading / disable unused icon sets if available.",
        "Use only 1–2 Google Fonts in Site Settings → Fonts; remove extra font widgets.",
        "Install WP Rocket or LiteSpeed Cache and turn on “Remove unused CSS” (test the homepage after).",
        "Move Google Tag Manager, chat, and CallRail to load after the page is visible (your developer can use a “delay” setting in the cache plugin).",
      ],
    },
    "unused-javascript": {
      summary: "Elementor, sliders, and plugins are loading JavaScript your homepage does not use right away.",
      whyItMatters:
        "On mobile networks, extra scripts can add seconds of waiting before the page becomes tappable — hurting calls and form fills.",
      actions: [
        "Deactivate slider, popup, and “all-in-one” plugins if the homepage does not need them.",
        "Replace Elementor carousel/slider sections with a single image + text block.",
        "In your cache plugin, enable delay JavaScript execution (exclude jQuery if the site breaks, then fix with your developer).",
      ],
    },
    "modern-image-formats": {
      summary: "Photos are likely full-size JPEG/PNG uploads from Elementor.",
      whyItMatters: "Large hero images are usually the #1 reason treatment sites fail mobile PageSpeed.",
      actions: [
        "Before uploading, resize heroes to ~1600px wide and compress at squoosh.app (aim under 200 KB).",
        "Re-upload the homepage hero through Elementor’s image widget — do not hotlink huge stock files.",
        "Enable WebP in your cache plugin if offered (WP Rocket / LiteSpeed).",
      ],
    },
    "lcp-lazy-loaded": {
      summary: "Your main hero image may be lazy-loaded — Elementor sometimes does this on background images.",
      whyItMatters: "Google treats the largest visible image as LCP; lazy-loading it delays your score and real load time.",
      actions: [
        "Use a standard Image widget (not background-only) for the hero and avoid lazy-load on that widget.",
        "In Elementor, set the homepage hero image as the first visible image above the fold.",
        "Mark the hero NOT lazy in your SEO/cache plugin if there is an “exclude from lazy load” list.",
      ],
    },
    "third-parties-insight": {
      summary: "Chat, analytics, or ads are competing with your homepage content.",
      whyItMatters: "Third-party scripts are a top cause of slow mobile scores on WordPress marketing sites.",
      actions: [
        "Load chat (Birdeye, LeadConnector, etc.) only after scroll or click — ask your vendor for “delay load” instructions.",
        "Keep one analytics tool; avoid duplicate GTM + plugin analytics.",
        "Remove embedded review widgets on the homepage if you already show testimonials in Elementor.",
      ],
    },
  },
  wix: {
    "render-blocking-insight": {
      summary: "Wix is loading design and app scripts before your content shows.",
      whyItMatters: "On mobile, slow first paint means fewer people scroll to your call button.",
      actions: [
        "Remove unused apps from Site → Apps in the Wix dashboard.",
        "Simplify the header: fewer animations and layers in the mobile editor.",
        "Avoid pasting custom <script> tags in embeds unless your developer needs them.",
      ],
    },
    "modern-image-formats": {
      summary: "Images may be larger than Wix can efficiently resize on the fly.",
      whyItMatters: "Phone photos are often 3–8 MB — Wix still has to process them for every new visitor.",
      actions: [
        "Resize photos on your computer before uploading to Wix.",
        "Use still images instead of video for the mobile homepage header.",
      ],
    },
    "unused-javascript": {
      summary: "Wix apps and marketing widgets add JavaScript to every page load.",
      actions: [
        "Uninstall marketing apps you are not actively using.",
        "Use native Wix forms and booking instead of embedding heavy iframes.",
      ],
    },
  },
  squarespace: {
    "render-blocking-insight": {
      summary: "Squarespace styles and scripts are delaying your first visible content.",
      actions: [
        "Disable parallax on homepage sections (Section → Background).",
        "Reduce the number of banner videos — use one compressed image instead.",
        "Limit custom code injections in Settings → Advanced unless required.",
      ],
    },
    "font-display-insight": {
      summary: "Multiple Squarespace font styles are loading before text appears.",
      actions: [
        "Site Styles → Fonts: stick to one header and one body font.",
        "Avoid switching font families per section.",
      ],
    },
  },
  "wordpress-divi": {
    "unused-javascript": {
      summary: "Divi modules and WordPress plugins are loading extra scripts.",
      actions: [
        "Divi → Theme Options → enable static CSS and remove unused module styles where possible.",
        "Reduce slider/video modules on the homepage.",
        "Audit plugins the same way as any WordPress site — deactivate what you do not need.",
      ],
    },
  },
  "wordpress-other": {
    "unused-javascript": {
      summary: "Active plugins are adding JavaScript across the whole site.",
      actions: [
        "Plugins → deactivate anything not required for lead capture.",
        "Avoid page builders on top of heavy themes unless necessary.",
      ],
    },
  },
};

const WHY_DEFAULT: Partial<Record<string, string>> = {
  "render-blocking-insight":
    "Visitors see a blank screen longer — on treatment sites that usually means fewer calls and form starts.",
  "unused-javascript":
    "Extra scripts delay when people can tap “Call now” or scroll to your admissions section.",
  "modern-image-formats":
    "Oversized photos are the most common fixable issue we see on healthcare homepages.",
  "lcp-lazy-loaded":
    "Your hero image should load immediately — not after someone starts scrolling.",
  "third-parties-insight":
    "Chat widgets and trackers are useful, but loading them first slows everything else down.",
  "font-display-insight":
    "Text that appears late looks broken on phones and hurts trust for clinical brands.",
  "layout-shift-elements":
    "Content jumping around feels unprofessional and makes Google score the page lower.",
};

export function tailorRecommendation(
  rec: SpeedTestRecommendation,
  platform: SitePlatform,
): SpeedTestRecommendation {
  const override = OVERRIDES[platform]?.[rec.id];
  if (!override) {
    return {
      ...rec,
      whyItMatters: rec.whyItMatters ?? WHY_DEFAULT[rec.id] ?? null,
      tailored: false,
    };
  }
  return {
    ...rec,
    summary: override.summary ?? rec.summary,
    whyItMatters: override.whyItMatters ?? WHY_DEFAULT[rec.id] ?? null,
    actions: override.actions ?? rec.actions,
    tailored: true,
  };
}
