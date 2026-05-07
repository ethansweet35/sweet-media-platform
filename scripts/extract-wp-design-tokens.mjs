#!/usr/bin/env node
/**
 * Sweet Media — WordPress/Elementor Design Token Extractor
 *
 * Fetches the live WordPress site, parses all CSS (inline + linked stylesheets),
 * and extracts Elementor global color/typography tokens along with any explicitly
 * defined CSS custom properties. Outputs a ready-to-paste design token sheet.
 *
 * Usage:
 *   node scripts/extract-wp-design-tokens.mjs --wp-url https://example.com
 *
 * Optional flags:
 *   --out   Path to write the JSON token file (default: design-tokens-[slug].json)
 *
 * What it extracts:
 *   - Elementor global colors  (--e-global-color-*)
 *   - Elementor global fonts   (--e-global-typography-*-font-family, -font-size, -font-weight)
 *   - Any other --wp-* or --theme-* CSS custom properties
 *   - Google Fonts @import URLs from stylesheets
 *   - Body / heading / link colors inferred from inline style blocks
 *
 * Limitations:
 *   - Cannot access computed styles (requires a real browser for full accuracy)
 *   - Dynamically injected styles (via JS) will be missed
 *   - Password-protected sites require --wp-user / --wp-pass
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT  = join(__dirname, '..');

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }
function info(msg) { console.log(`    ${msg}`); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

// Use no custom headers — Cloudflare and other WAFs often block custom User-Agent strings.
// Node's default fetch headers (no UA, no Accept) pass through cleanly on most WP hosts.
const FETCH_HEADERS = {};

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Extract CSS custom properties from a CSS text block */
function extractCssVars(css) {
  const vars = {};
  // Match :root { ... } blocks and inline style declarations
  const rootBlocks = [...css.matchAll(/:root\s*\{([^}]+)\}/gis)].map(m => m[1]);
  const allContexts = [css, ...rootBlocks];

  for (const block of allContexts) {
    const matches = [...block.matchAll(/--([\w-]+)\s*:\s*([^;}\n]+)/g)];
    for (const [, name, value] of matches) {
      const trimmed = value.trim();
      if (trimmed && !trimmed.startsWith('/*')) {
        vars[`--${name}`] = trimmed;
      }
    }
  }
  return vars;
}

/** Extract Google Fonts @import URLs */
function extractGoogleFonts(css) {
  const fonts = new Set();
  const imports = [...css.matchAll(/@import\s+url\(['"]?(https:\/\/fonts\.googleapis\.com[^'")\s]+)['"]?\)/gi)];
  for (const [, url] of imports) {
    // Parse font family names from the URL
    const familyMatch = url.match(/family=([^&]+)/);
    if (familyMatch) {
      familyMatch[1].split('|').forEach(f => {
        const name = decodeURIComponent(f.split(':')[0]).replace(/\+/g, ' ');
        if (name) fonts.add(name);
      });
    }
  }
  return [...fonts];
}

/** Parse Elementor color tokens from CSS vars */
function parseElementorColors(vars) {
  const colors = {};
  for (const [key, value] of Object.entries(vars)) {
    if (key.startsWith('--e-global-color-')) {
      const tokenName = key.replace('--e-global-color-', '');
      colors[tokenName] = value;
    }
  }
  return colors;
}

/** Parse Elementor typography tokens */
function parseElementorTypography(vars) {
  const typo = {};
  for (const [key, value] of Object.entries(vars)) {
    if (key.startsWith('--e-global-typography-')) {
      const rest = key.replace('--e-global-typography-', '');
      // e.g. primary-font-family, primary-font-size, primary-font-weight
      const parts = rest.split('-');
      const tokenName = parts[0];
      const prop = parts.slice(1).join('-');
      if (!typo[tokenName]) typo[tokenName] = {};
      typo[tokenName][prop] = value;
    }
  }
  return typo;
}

/** Extract hex colors and rgba() values from CSS text */
function extractColorValues(css) {
  const colorSet = new Set();

  // Hex colors
  const hexMatches = [...css.matchAll(/#([0-9a-f]{3,8})\b/gi)];
  for (const [hex] of hexMatches) {
    if (hex.length >= 4) colorSet.add(hex.toUpperCase());
  }

  // rgba / rgb
  const rgbMatches = [...css.matchAll(/rgba?\([^)]+\)/gi)];
  for (const [rgb] of rgbMatches) {
    colorSet.add(rgb);
  }

  return [...colorSet]
    .filter(c => {
      // Filter out pure black/white and very common utility colors
      const upper = c.toUpperCase();
      return !['#000', '#FFF', '#000000', '#FFFFFF', '#TRANSPARENT'].includes(upper);
    })
    .slice(0, 50); // cap at 50 to keep output readable
}

/** Infer semantic color roles from common CSS selectors */
function inferSemanticColors(css) {
  const semantic = {};
  const rules = [
    { pattern: /body\s*\{[^}]*\bcolor\s*:\s*([^;}\n]+)/i, key: 'bodyText' },
    { pattern: /h1\s*(?:,\s*h[2-6]\s*)*\{[^}]*\bcolor\s*:\s*([^;}\n]+)/i, key: 'headingText' },
    { pattern: /\ba\s*\{[^}]*\bcolor\s*:\s*([^;}\n]+)/i, key: 'linkColor' },
    { pattern: /body\s*\{[^}]*background(?:-color)?\s*:\s*([^;}\n]+)/i, key: 'bodyBackground' },
    { pattern: /\.elementor-button[^{]*\{[^}]*background(?:-color)?\s*:\s*([^;}\n]+)/i, key: 'primaryCta' },
    { pattern: /\.elementor-button[^{]*\{[^}]*\bcolor\s*:\s*([^;}\n]+)/i, key: 'primaryCtaText' },
  ];

  for (const { pattern, key } of rules) {
    const match = css.match(pattern);
    if (match) semantic[key] = match[1].trim();
  }
  return semantic;
}

/** Extract font-family declarations */
function extractFontFamilies(css) {
  const families = new Set();
  const matches = [...css.matchAll(/font-family\s*:\s*([^;}\n]+)/gi)];
  for (const [, family] of matches) {
    const cleaned = family.trim().replace(/!important/i, '').trim();
    // Take the first font in the stack (most specific)
    const primary = cleaned.split(',')[0].replace(/['"]/g, '').trim();
    if (primary && !primary.toLowerCase().startsWith('var(') && primary.length > 1) {
      families.add(primary);
    }
  }
  return [...families].slice(0, 15);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🎨  Sweet Media — WordPress Design Token Extractor\n');

  const wpUrl = (getArg('--wp-url') || '').replace(/\/$/, '');
  if (!wpUrl) die('--wp-url is required (e.g. https://example.com)');

  const siteSlug = wpUrl.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const outPath  = getArg('--out') || join(REPO_ROOT, `design-tokens-${siteSlug}.json`);

  // ── 1. Fetch homepage HTML ──────────────────────────────────────────────────
  step(`Fetching ${wpUrl}`);
  const html = await fetchText(wpUrl);
  if (!html) die(`Could not fetch ${wpUrl} — check the URL and network access`);
  log('Homepage fetched');

  // ── 2. Collect all CSS sources ──────────────────────────────────────────────
  step('Collecting CSS sources');
  const cssTexts = [];

  // Inline <style> blocks
  const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  for (const [, css] of inlineStyles) {
    cssTexts.push(css);
  }
  info(`Found ${inlineStyles.length} inline <style> blocks`);

  // Linked stylesheets
  const linkRefs = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)];
  const styleHrefs = linkRefs.map(([, href]) => {
    try {
      return new URL(href, wpUrl).href;
    } catch {
      return null;
    }
  }).filter(Boolean);

  info(`Found ${styleHrefs.length} linked stylesheets — fetching...`);
  let fetchedCount = 0;
  for (const href of styleHrefs) {
    const css = await fetchText(href);
    if (css) {
      cssTexts.push(css);
      fetchedCount++;
    }
  }
  log(`Collected ${cssTexts.length} CSS sources (${fetchedCount} external sheets)`);

  // ── 3. Parse all CSS ────────────────────────────────────────────────────────
  step('Parsing CSS tokens');
  const allCss = cssTexts.join('\n');

  const allVars              = extractCssVars(allCss);
  const elementorColors      = parseElementorColors(allVars);
  const elementorTypography  = parseElementorTypography(allVars);
  const googleFonts          = extractGoogleFonts(allCss);
  const allColors            = extractColorValues(allCss);
  const semanticColors       = inferSemanticColors(allCss);
  const fontFamilies         = extractFontFamilies(allCss);

  // ── 4. Extract other useful tokens ─────────────────────────────────────────
  const wpVars   = Object.fromEntries(Object.entries(allVars).filter(([k]) => k.startsWith('--wp-')));
  const themeVars = Object.fromEntries(Object.entries(allVars).filter(([k]) => k.startsWith('--theme-')));
  const totalVarsFound = Object.keys(allVars).length;

  log(`Extracted ${totalVarsFound} CSS custom properties`);

  // ── 5. Build output report ──────────────────────────────────────────────────
  const hasElementorColors = Object.keys(elementorColors).length > 0;
  const hasElementorTypo   = Object.keys(elementorTypography).length > 0;

  const report = {
    _meta: {
      extractedAt: new Date().toISOString(),
      sourceUrl:   wpUrl,
      note: 'Automated extraction — verify values in browser DevTools before using. Computed styles (hover states, JS-injected styles) are not captured.',
    },

    pageBuilder: hasElementorColors ? 'Elementor' : 'Unknown/Other',

    // ── Colors ────────────────────────────────────────────────────────────────
    colors: {
      elementorGlobalColors: elementorColors,
      semanticInferred: semanticColors,
      wpColorVars: wpVars,
      themeColorVars: themeVars,
      allExtractedColors: allColors,
    },

    // ── Typography ────────────────────────────────────────────────────────────
    typography: {
      elementorGlobalTypography: elementorTypography,
      googleFontsDetected: googleFonts,
      allFontFamiliesFound: fontFamilies,
    },

    // ── Platform Token Sheet (fill in for new-brand-prototype Phase 4) ────────
    platformTokenSheet: {
      _instructions: 'Fill in these values using the data above + browser DevTools inspection. Use this directly in new-brand-prototype Phase 4.',
      colors: {
        primaryBackground:   semanticColors.bodyBackground || '???',
        secondaryBackground: '???',
        surfaceCard:         '???',
        primaryText:         semanticColors.bodyText || '???',
        secondaryText:       '???',
        accentPrimary:       semanticColors.primaryCta || (hasElementorColors ? Object.values(elementorColors)[0] : '???'),
        accentSecondary:     '???',
        borderDivider:       '???',
      },
      typography: {
        displayFont:   googleFonts[0] || fontFamilies[0] || '???',
        bodyFont:      googleFonts[1] || fontFamilies[1] || fontFamilies[0] || '???',
        headingTracking: '???',
        bodyLineHeight:  '???',
      },
      spacingShape: {
        spacingUnit:     '8px base',
        borderRadius:    '???',
        sectionPadding:  '???',
        maxContentWidth: '???',
      },
      ctas: {
        primary:   `bg ??? / text ??? / shape ???`,
        secondary: '???',
      },
    },

    // ── Raw CSS vars for reference ────────────────────────────────────────────
    allCssVars: allVars,
  };

  // ── 6. Write output ─────────────────────────────────────────────────────────
  writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');

  // ── 7. Print summary ────────────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Design token extraction complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Page builder : ${report.pageBuilder}
CSS vars     : ${totalVarsFound} found
Fonts        : ${[...googleFonts, ...fontFamilies].slice(0, 5).join(', ') || 'none detected'}
Output       : ${outPath}

${hasElementorColors ? `Elementor global colors found:\n${Object.entries(elementorColors).map(([k, v]) => `  ${k}: ${v}`).join('\n')}\n` : '⚠️  No Elementor global colors found — may be a non-Elementor theme.\n   Check allCssVars in the output JSON for custom properties.\n'}
${hasElementorTypo ? `Elementor typography found:\n${Object.keys(elementorTypography).map(k => `  ${k}: ${JSON.stringify(elementorTypography[k])}`).join('\n')}\n` : ''}
─── Next steps ──────────────────────────────────────

1. Open ${outPath.split('/').pop()} and review platformTokenSheet
2. Open the live site in a browser and use DevTools to verify:
   - Colors: Inspect hero background, headings, CTAs, section backgrounds
   - Fonts: Elements panel → Computed → font-family on h1 and body
   - Spacing: Box model on 2-3 sections for padding values
   - Border radius: Inspect CTA buttons and cards
3. Fill in all ??? values in platformTokenSheet
4. Use the completed token sheet in new-brand-prototype Phase 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => { console.error(err); process.exit(1); });
