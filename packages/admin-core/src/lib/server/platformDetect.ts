/**
 * Detect CMS / site builder from page HTML and request URLs (server-only).
 */

import type { SitePlatform, SitePlatformInsight, PlatformQuickWin } from "../../types/speed-test";

export interface PlatformDetectionInput {
  html: string;
  requestUrls: string[];
  pageUrl: string;
}

interface Fingerprint {
  platform: SitePlatform;
  weight: number;
  signal: string;
}

const HTML_SAMPLE_MAX = 120_000;

function haystack(html: string, urls: string[]): string {
  const urlBlob = urls.slice(0, 200).join("\n");
  return `${html.slice(0, HTML_SAMPLE_MAX)}\n${urlBlob}`.toLowerCase();
}

function countMatches(text: string, patterns: RegExp[]): number {
  let n = 0;
  for (const p of patterns) {
    if (p.test(text)) n += 1;
  }
  return n;
}

function scanFingerprints(text: string): Fingerprint[] {
  const out: Fingerprint[] = [];

  const add = (platform: SitePlatform, weight: number, signal: string) => {
    out.push({ platform, weight, signal });
  };

  if (/elementor|e-gallery|elementor-widget|elementor-frontend/i.test(text)) {
    add("wordpress-elementor", 12, "Elementor page builder detected");
  }
  if (/et_pb_|et-builder|divi-builder|divi-style/i.test(text)) {
    add("wordpress-divi", 12, "Divi theme/builder detected");
  }
  if (/wp-content|wp-includes|\/wp-json\/|wordpress/i.test(text)) {
    add("wordpress-other", 8, "WordPress core files detected");
  }
  if (/woocommerce|wc-block/i.test(text)) {
    add("wordpress-other", 3, "WooCommerce detected");
  }

  if (/static\.wixstatic\.com|parastorage\.com|wix\.com\/|x-wix|wixsite\.com/i.test(text)) {
    add("wix", 14, "Wix hosting and scripts detected");
  }

  if (/squarespace\.com|static1\.squarespace|squarespace-cdn/i.test(text)) {
    add("squarespace", 14, "Squarespace platform detected");
  }

  if (/cdn\.shopify\.com|shopify-section|myshopify\.com/i.test(text)) {
    add("shopify", 14, "Shopify store detected");
  }

  if (/webflow\.com|website-files\.com|webflow\.io/i.test(text)) {
    add("webflow", 12, "Webflow hosting detected");
  }

  if (/\/_next\/static|__next_data__|x-powered-by:\s*next/i.test(text)) {
    add("nextjs", 10, "Next.js framework detected");
  }

  if (/hs-scripts\.com|hubspot|hbspt/i.test(text)) {
    add("hubspot", 6, "HubSpot CMS/marketing scripts detected");
  }

  if (/secureserver\.net|wsimg\.com|godaddy|websitebuilder/i.test(text)) {
    add("godaddy", 10, "GoDaddy Website Builder detected");
  }

  return out;
}

function aggregateScores(fingerprints: Fingerprint[]): Map<SitePlatform, { score: number; signals: string[] }> {
  const map = new Map<SitePlatform, { score: number; signals: string[] }>();
  for (const fp of fingerprints) {
    const cur = map.get(fp.platform) ?? { score: 0, signals: [] };
    cur.score += fp.weight;
    if (!cur.signals.includes(fp.signal)) cur.signals.push(fp.signal);
    map.set(fp.platform, cur);
  }
  return map;
}

function resolvePlatform(scores: Map<SitePlatform, { score: number; signals: string[] }>): {
  platform: SitePlatform;
  signals: string[];
  confidence: SitePlatformInsight["confidence"];
} {
  const ranked = [...scores.entries()].sort((a, b) => b[1].score - a[1].score);
  if (ranked.length === 0) {
    return { platform: "unknown", signals: [], confidence: "low" };
  }

  const [top, second] = ranked;
  const topScore = top[1].score;
  const secondScore = second?.[1].score ?? 0;

  let confidence: SitePlatformInsight["confidence"] = "low";
  if (topScore >= 12 && topScore - secondScore >= 4) confidence = "high";
  else if (topScore >= 8 && topScore - secondScore >= 2) confidence = "medium";

  // Elementor/Divi trump generic WordPress when both present
  let platform = top[0];
  if (platform === "wordpress-other") {
    if (scores.has("wordpress-elementor")) platform = "wordpress-elementor";
    else if (scores.has("wordpress-divi")) platform = "wordpress-divi";
  }

  return { platform, signals: top[1].signals.slice(0, 5), confidence };
}

const DISPLAY_NAMES: Record<SitePlatform, string> = {
  "wordpress-elementor": "WordPress + Elementor",
  "wordpress-divi": "WordPress + Divi",
  "wordpress-other": "WordPress",
  wix: "Wix",
  squarespace: "Squarespace",
  shopify: "Shopify",
  webflow: "Webflow",
  nextjs: "Next.js (modern stack)",
  hubspot: "HubSpot CMS",
  godaddy: "GoDaddy Website Builder",
  unknown: "Custom or unknown stack",
};

function platformQuickWins(platform: SitePlatform): PlatformQuickWin[] {
  switch (platform) {
    case "wordpress-elementor":
      return [
        {
          id: "el-cache",
          title: "Turn on caching (biggest win for WordPress)",
          why: "Elementor pages are heavy HTML. Without caching, every visitor waits for WordPress to rebuild the page from scratch.",
          steps: [
            "Install a caching plugin — ask your host or developer for WP Rocket, LiteSpeed Cache, or Flying Press.",
            "Enable page cache + CSS minify in the plugin settings (one checkbox each).",
            "Clear cache after saving, then re-run this speed test.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "el-slider",
          title: "Replace hero sliders with one strong image",
          why: "Sliders load several large images but only show one. Google scores the slowest one as your LCP.",
          steps: [
            "Edit your homepage in Elementor.",
            "Swap the Image Carousel / Slider widget for a single Image widget (your best photo).",
            "Compress that image to under 200 KB before uploading (use squoosh.app in a browser).",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "el-fonts",
          title: "Cut extra fonts and icon packs",
          why: "Elementor often loads Google Fonts, Font Awesome, and theme fonts at once — that blocks the page from showing text.",
          steps: [
            "Elementor → Site Settings → Fonts: use 1 heading font + 1 body font only.",
            "Elementor → Settings → Advanced: disable Font Awesome 4 if you do not need legacy icons.",
            "Avoid embedding multiple Google Font families in custom HTML widgets.",
          ],
          impact: "medium",
          effort: "quick",
        },
        {
          id: "el-plugins",
          title: "Remove plugins you are not actively using",
          why: "Many plugins add JavaScript on every page — chat, popups, reviews, sliders — even when you only use them once.",
          steps: [
            "WordPress → Plugins: deactivate anything non-essential, then test the site.",
            "Delete deactivated plugins you do not plan to restore.",
            "Keep one SEO plugin, one forms plugin, one cache plugin — not three of each.",
          ],
          impact: "high",
          effort: "moderate",
        },
      ];

    case "wordpress-divi":
      return [
        {
          id: "divi-cache",
          title: "Enable Divi + server caching",
          why: "Divi’s Visual Builder output is large. Caching stores a ready-made HTML file so visitors skip the slow build step.",
          steps: [
            "Divi → Theme Options → Builder → Static CSS File Generation: turn ON.",
            "Add a cache plugin (WP Rocket or LiteSpeed) if your host does not include caching.",
            "Purge all caches after changes.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "divi-modules",
          title: "Simplify the homepage module stack",
          why: "Each Divi section, slider, and blog module adds CSS and JS. Homepages with 15+ sections rarely need them all.",
          steps: [
            "Open the homepage in Divi Builder.",
            "Remove sections below the fold that repeat the same message (duplicate CTAs, multiple testimonial carousels).",
            "Replace video backgrounds with a compressed still image where possible.",
          ],
          impact: "high",
          effort: "moderate",
        },
      ];

    case "wordpress-other":
      return [
        {
          id: "wp-cache",
          title: "Add page caching today",
          why: "Stock WordPress rebuilds every page per visit. Caching is the single highest ROI fix for non-technical teams.",
          steps: [
            "Ask your host if they include free caching (SiteGround, Kinsta, WP Engine often do).",
            "If not, install LiteSpeed Cache or WP Rocket and enable page cache.",
            "Upload smaller images (max 2000px wide for heroes) before inserting into pages.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "wp-theme",
          title: "Use a lightweight theme — not a bloated multipurpose one",
          why: "Heavy themes ship hundreds of KB of CSS/JS on every page, even simple ones.",
          steps: [
            "If your site is mostly marketing pages, consider GeneratePress, Kadence, or a treatment-focused custom theme.",
            "This is a bigger project — pair with a developer — but scores often jump 20–40 points.",
          ],
          impact: "high",
          effort: "project",
        },
      ];

    case "wix":
      return [
        {
          id: "wix-video",
          title: "Remove or shorten homepage video backgrounds",
          why: "Wix video headers are a common reason mobile LCP is 8–20 seconds. A still image loads 10× faster.",
          steps: [
            "Editor → click the header section → Background → Image instead of Video on mobile (Wix ADI/settings vary).",
            "If you keep video, use a short (<5 MB) clip and no autoplay sound.",
            "Re-publish and test again on mobile.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "wix-apps",
          title: "Uninstall Wix apps you do not need",
          why: "Each app from the Wix App Market adds scripts that slow first load — chat, popups, reviews, calendars.",
          steps: [
            "Dashboard → Apps → remove apps not essential to admissions calls.",
            "Keep one chat tool, one analytics setup — not duplicates.",
            "Use Wix’s built-in forms instead of embedding heavy third-party widgets.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "wix-images",
          title: "Run images through Wix Pro Gallery optimizer",
          why: "Uploading full-resolution photos from a phone (4000×3000) forces Wix to resize on the fly — slow on mobile.",
          steps: [
            "Before upload, resize heroes to about 1600px wide using your phone’s edit tool or squoosh.app.",
            "In the editor, use Wix image settings to avoid “Original quality” on huge files.",
          ],
          impact: "medium",
          effort: "quick",
        },
      ];

    case "squarespace":
      return [
        {
          id: "sq-parallax",
          title: "Turn off parallax and banner videos",
          why: "Squarespace motion effects delay when the first image appears — exactly what hurts Google rankings.",
          steps: [
            "Edit the section → Background → disable parallax on mobile-heavy pages.",
            "Replace video banners with a single compressed photo for the homepage hero.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "sq-fonts",
          title: "Limit to two font families",
          why: "Each Squarespace font style downloads another file before text is visible.",
          steps: [
            "Design → Site Styles → Fonts: one headline + one paragraph font.",
            "Avoid mixing multiple display fonts across sections.",
          ],
          impact: "medium",
          effort: "quick",
        },
        {
          id: "sq-blocks",
          title: "Split long pages into focused landing pages",
          why: "Very long scrolling pages load dozens of images at once, even off-screen.",
          steps: [
            "Move program details to child pages; keep the homepage to hero + trust + one CTA.",
            "Link out instead of stacking every service in one page.",
          ],
          impact: "medium",
          effort: "moderate",
        },
      ];

    case "shopify":
      return [
        {
          id: "shopify-apps",
          title: "Audit Shopify apps",
          why: "Apps inject scripts globally — same pattern as WordPress plugins.",
          steps: [
            "Shopify Admin → Apps: remove unused apps.",
            "Prefer Shopify-native features over embedded widgets when possible.",
          ],
          impact: "high",
          effort: "quick",
        },
      ];

    case "webflow":
      return [
        {
          id: "wf-interactions",
          title: "Reduce interactions and embeds on the homepage",
          why: "Webflow interactions and custom embeds add JS weight on top of an already rich layout.",
          steps: [
            "Remove auto-play Lottie/animation above the fold if LCP is slow.",
            "Lazy-load video lightboxes; use poster images.",
            "Host fonts via Webfont settings — subset to used characters only.",
          ],
          impact: "medium",
          effort: "moderate",
        },
      ];

    case "nextjs":
      return [
        {
          id: "next-images",
          title: "You’re on a fast stack — tune images and third parties",
          why: "Next.js is already optimized; remaining issues are usually oversized heroes or marketing tags.",
          steps: [
            "Ensure hero images use next/image with priority on the LCP image only.",
            "Defer GTM, chat, and call-tracking scripts until after load.",
          ],
          impact: "medium",
          effort: "quick",
        },
      ];

    case "godaddy":
      return [
        {
          id: "gd-widgets",
          title: "Remove extra widgets and sections",
          why: "GoDaddy sites often slow down from stacked sections, slideshows, and marketing widgets — each adds load time.",
          steps: [
            "Website Builder → edit homepage → delete duplicate CTAs and unused sections.",
            "Use one slideshow image, not five, for the top banner.",
            "Remove embedded third-party widgets you do not actively use.",
          ],
          impact: "high",
          effort: "quick",
        },
        {
          id: "gd-images",
          title: "Upload smaller photos",
          why: "Full-resolution phone photos are the most common GoDaddy speed issue we see.",
          steps: [
            "Resize images to about 1600px wide before uploading in GoDaddy’s image library.",
            "Avoid auto-playing video banners on mobile.",
          ],
          impact: "high",
          effort: "quick",
        },
      ];

    case "hubspot":
      return [
        {
          id: "hs-modules",
          title: "Simplify homepage modules",
          why: "HubSpot pages can load tracking, forms, and chat together — slowing the first screen.",
          steps: [
            "Remove unused modules from the homepage template.",
            "Delay chat until after scroll if your HubSpot settings allow it.",
            "Compress hero images before uploading to the file manager.",
          ],
          impact: "medium",
          effort: "quick",
        },
      ];

    default:
      return [
        {
          id: "generic-cache",
          title: "Ask your host about CDN and caching",
          why: "We could not identify your builder, but most slow marketing sites improve dramatically with caching and smaller images.",
          steps: [
            "Compress hero photos before upload.",
            "Defer chat widgets and popups until after the page loads.",
            "Work with a developer to confirm a CDN is enabled.",
          ],
          impact: "medium",
          effort: "quick",
        },
      ];
  }
}

function realityCheck(platform: SitePlatform): string | null {
  switch (platform) {
    case "wix":
      return "Wix limits how much code you can change. Big gains come from simpler pages, fewer apps, and smaller media — not custom server tuning.";
    case "squarespace":
      return "Squarespace trades flexibility for simplicity. Focus on layout choices (video, parallax, page length) rather than expecting plugin-level control.";
    case "wordpress-elementor":
    case "wordpress-divi":
    case "wordpress-other":
      return "WordPress can score 90+ with caching, a lean theme, and disciplined plugins — but page builders add weight until you simplify the homepage.";
    case "godaddy":
      return "GoDaddy’s builder is similar to Wix: fastest wins are fewer widgets, smaller images, and removing unused add-ons.";
    default:
      return null;
  }
}

function headline(platform: SitePlatform): string {
  switch (platform) {
    case "wordpress-elementor":
      return "Your site runs WordPress with Elementor";
    case "wordpress-divi":
      return "Your site runs WordPress with Divi";
    case "wordpress-other":
      return "Your site runs WordPress";
    case "wix":
      return "Your site is built on Wix";
    case "squarespace":
      return "Your site is built on Squarespace";
    case "shopify":
      return "Your site is a Shopify store";
    case "webflow":
      return "Your site is built on Webflow";
    case "nextjs":
      return "Your site uses a modern Next.js stack";
    case "hubspot":
      return "Your site uses HubSpot";
    case "godaddy":
      return "Your site uses GoDaddy Website Builder";
    default:
      return "We could not confirm your website platform";
  }
}

function explanation(platform: SitePlatform): string {
  switch (platform) {
    case "wordpress-elementor":
      return "Elementor is powerful but loads extra CSS, JavaScript, and fonts on every page. The fixes below are the same ones we apply for treatment-center clients before a rebuild — most do not require coding.";
    case "wordpress-divi":
      return "Divi’s visual builder outputs rich layouts that can slow mobile load times. These steps target the usual Divi bottlenecks without touching code.";
    case "wordpress-other":
      return "WordPress is flexible, but themes and plugins easily stack up. These are the highest-impact changes marketing teams can make before hiring a developer.";
    case "wix":
      return "Wix handles hosting for you, which is convenient, but video headers, apps, and full-size phone photos are the usual reasons scores stay low on mobile.";
    case "squarespace":
      return "Squarespace sites often look great visually but load heavy banner effects. Small editor changes usually beat trying to “hack” performance.";
    case "shopify":
      return "Shopify themes and apps both affect speed. Start with apps and hero images before advanced theme code.";
    case "webflow":
      return "Webflow is capable and fast when designed lean. Focus on interactions, embeds, and image delivery first.";
    case "nextjs":
      return "You’re already on the type of stack we build for clients. Remaining issues are usually media size or third-party marketing scripts.";
    case "godaddy":
      return "GoDaddy Website Builder works like other drag-and-drop tools: fewer widgets, smaller images, and no autoplay video on mobile will move the score fastest.";
    case "hubspot":
      return "HubSpot-hosted pages include marketing tracking by default. Trim homepage modules and delay chat for the quickest gains.";
    default:
      return "These recommendations still apply — compress images, delay chat widgets, and reduce homepage clutter — even when we cannot name the exact builder.";
  }
}

export function detectPlatformFromSignals(input: PlatformDetectionInput): SitePlatformInsight {
  const text = haystack(input.html, input.requestUrls);
  const fingerprints = scanFingerprints(text);
  const scores = aggregateScores(fingerprints);
  const { platform, signals, confidence } = resolvePlatform(scores);

  return {
    platform,
    displayName: DISPLAY_NAMES[platform],
    confidence,
    detectedSignals: signals,
    headline: headline(platform),
    explanation: explanation(platform),
    quickWins: platformQuickWins(platform),
    realityCheck: realityCheck(platform),
  };
}

/** Fetch homepage HTML for fingerprinting (best-effort). */
export async function fetchPageHtml(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SweetMediaSpeedTest/1.0; +https://sweetmediaservices.com/site-speed-test)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return "";
    const text = await res.text();
    return text.slice(0, HTML_SAMPLE_MAX);
  } catch {
    return "";
  }
}

/** Pull URLs from Lighthouse audit detail items for stronger detection. */
export function extractUrlsFromPsiAudits(
  audits: Record<string, { details?: { items?: Array<Record<string, unknown>> } }>,
): string[] {
  const urls: string[] = [];
  for (const audit of Object.values(audits)) {
    const items = audit.details?.items;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const u = item.url;
      if (typeof u === "string") urls.push(u);
      const subs = item.subItems as { items?: Array<Record<string, unknown>> } | undefined;
      if (subs?.items) {
        for (const sub of subs.items) {
          if (typeof sub.url === "string") urls.push(sub.url);
        }
      }
    }
  }
  return urls;
}
