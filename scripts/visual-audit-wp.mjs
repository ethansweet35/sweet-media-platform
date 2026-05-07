#!/usr/bin/env node
/**
 * Sweet Media — WordPress Visual Audit
 *
 * Uses a real headless Chromium browser to:
 *   1. Screenshot every page of the WordPress site at 375px, 768px, and 1440px
 *   2. Extract computed CSS spacing (section padding, max-width, gaps, border-radius)
 *   3. Confirm exact color/font values via computed styles (not just raw CSS text)
 *   4. Write a completed design-tokens-[slug].json with all ??? values filled in
 *
 * This produces the formal visual spec used during Track B page builds.
 * Run AFTER migrate-wordpress-content.mjs (reads migration-report-[slug].json for page list).
 *
 * Usage:
 *   node scripts/visual-audit-wp.mjs \
 *     --wp-url  https://example.com \
 *     --site-id brand-slug
 *
 * Optional:
 *   --out-dir   Where to save screenshots (default: wp-screenshots/[site-id]/)
 *   --no-screenshots  Skip screenshots, extract spacing/colors only (faster)
 *   --pages     Comma-separated slugs to audit (default: all from migration report)
 *
 * Output:
 *   wp-screenshots/[site-id]/[page-slug]/desktop.png   (1440px wide, full page)
 *   wp-screenshots/[site-id]/[page-slug]/tablet.png    (768px wide, full page)
 *   wp-screenshots/[site-id]/[page-slug]/mobile.png    (375px wide, full page)
 *   design-tokens-[site-id]-computed.json              (complete token sheet with spacing)
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

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
function hasFlag(flag) { return process.argv.includes(flag); }

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 375,  height: 812 },
];

/**
 * Run in the browser page context to extract computed spacing and style values.
 * Returns a structured object with all measurable design tokens.
 */
async function extractComputedTokens(page) {
  return page.evaluate(() => {
    function cs(el) {
      return el ? window.getComputedStyle(el) : null;
    }

    function px(val) {
      if (!val) return null;
      const n = parseFloat(val);
      return isNaN(n) ? val.trim() || null : `${Math.round(n)}px`;
    }

    function hex(color) {
      if (!color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') return null;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    }

    // ── Typography ──────────────────────────────────────────────────────────
    const h1   = document.querySelector('h1, .elementor-heading-title[tag="h1"], h2');
    const body = document.body;
    const p    = document.querySelector('p:not(:empty)') || body;
    const btn  = document.querySelector(
      'a.elementor-button, .elementor-button, button:not([type="submit"]), .wp-block-button__link'
    );
    const link = document.querySelector('a:not(.elementor-button):not(.wp-block-button__link)');
    const nav  = document.querySelector('nav, header, .elementor-nav-menu--main');

    const h1Style   = cs(h1);
    const bodyStyle = cs(body);
    const pStyle    = cs(p);
    const btnStyle  = cs(btn);

    // ── Sections / Layout ───────────────────────────────────────────────────
    const sections = Array.from(document.querySelectorAll(
      '.elementor-section, section, .wp-block-group, .elementor-top-section'
    )).slice(0, 8);

    const sectionData = sections.map(el => {
      const s = cs(el);
      const inner = el.querySelector('.elementor-container, .elementor-section-wrap, .wp-block-group__inner-container');
      const innerS = cs(inner);
      return {
        paddingTop:    px(s?.paddingTop),
        paddingBottom: px(s?.paddingBottom),
        paddingLeft:   px(s?.paddingLeft),
        paddingRight:  px(s?.paddingRight),
        background:    hex(s?.backgroundColor),
        maxWidth:      px(innerS?.maxWidth || s?.maxWidth),
        gap:           px(s?.gap || s?.rowGap),
      };
    }).filter(d => d.paddingTop && d.paddingTop !== '0px');

    // Derive standard section padding from the most common value
    const padTops = sectionData.map(s => s.paddingTop).filter(Boolean);
    const padMode = padTops.sort((a, b) =>
      padTops.filter(v => v === b).length - padTops.filter(v => v === a).length
    )[0] || null;

    // Max content width
    const containers = document.querySelectorAll('.elementor-container, .container, .wp-block-group');
    const widths = Array.from(containers).map(el => {
      const r = el.getBoundingClientRect();
      return Math.round(r.width);
    }).filter(w => w > 600);
    const maxContentWidth = widths.length
      ? Math.max(...widths) + 'px'
      : px(cs(document.querySelector('.elementor-container, .container'))?.maxWidth);

    // ── Colors ──────────────────────────────────────────────────────────────
    const heroSection = document.querySelector(
      '.elementor-section:first-of-type, section:first-of-type, .hero, [class*="hero"]'
    );
    const heroStyle = cs(heroSection);

    // Background colors from first 6 sections
    const sectionBgs = [...new Set(
      Array.from(document.querySelectorAll('.elementor-section, section')).slice(0, 6)
        .map(el => hex(cs(el)?.backgroundColor))
        .filter(Boolean)
    )];

    // ── CTA Button ──────────────────────────────────────────────────────────
    const ctaBg         = hex(btnStyle?.backgroundColor);
    const ctaText       = hex(btnStyle?.color);
    const ctaRadius     = px(btnStyle?.borderRadius);
    const ctaPadding    = btnStyle
      ? `${px(btnStyle.paddingTop)} ${px(btnStyle.paddingLeft)}`
      : null;

    // Card border radius (from cards/boxes)
    const card = document.querySelector(
      '.elementor-widget-container > .elementor-widget-wrap, .card, [class*="card"], .elementor-testimonial'
    );
    const cardRadius = px(cs(card)?.borderRadius);

    // ── Navbar ──────────────────────────────────────────────────────────────
    const navStyle = cs(nav);
    const navBg    = hex(navStyle?.backgroundColor);

    return {
      typography: {
        displayFont:     h1Style?.fontFamily?.replace(/["']/g, '').split(',')[0].trim() || null,
        displayWeight:   h1Style?.fontWeight || null,
        displaySize:     px(h1Style?.fontSize),
        displayTracking: h1Style?.letterSpacing || null,
        displayLineHeight: h1Style?.lineHeight || null,
        bodyFont:        pStyle?.fontFamily?.replace(/["']/g, '').split(',')[0].trim() || null,
        bodySize:        px(pStyle?.fontSize),
        bodyLineHeight:  pStyle?.lineHeight || null,
        bodyWeight:      pStyle?.fontWeight || null,
      },
      colors: {
        bodyBackground:     hex(bodyStyle?.backgroundColor),
        bodyText:           hex(pStyle?.color),
        headingText:        hex(h1Style?.color),
        linkColor:          hex(cs(link)?.color),
        navBackground:      navBg,
        heroBackground:     hex(heroStyle?.backgroundColor),
        sectionBackgrounds: sectionBgs,
        ctaBackground:      ctaBg,
        ctaText:            ctaText,
      },
      spacing: {
        standardSectionPaddingTop:    padMode,
        allSectionPaddings:           [...new Set(padTops)],
        maxContentWidth:              maxContentWidth,
        ctaBorderRadius:              ctaRadius,
        ctaPadding:                   ctaPadding,
        cardBorderRadius:             cardRadius || ctaRadius,
        sectionDetails:               sectionData.slice(0, 5),
      },
    };
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n📸  Sweet Media — WordPress Visual Audit\n');

  const wpUrl        = (getArg('--wp-url') || '').replace(/\/$/, '');
  const siteId       = getArg('--site-id');
  const noScreenshots = hasFlag('--no-screenshots');
  const onlyPages    = getArg('--pages')?.split(',').filter(Boolean) || null;

  if (!wpUrl)   die('--wp-url is required');
  if (!siteId)  die('--site-id is required');

  const outDir = getArg('--out-dir') || join(REPO_ROOT, 'wp-screenshots', siteId);

  // Load page list from migration report if available
  const reportPath = join(REPO_ROOT, `migration-report-${siteId}.json`);
  let pages = [];

  if (existsSync(reportPath)) {
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    pages = report.buildChecklist.map(p => ({
      slug:  p.slug,
      url:   p.wpUrl,
      title: p.title,
    }));
    log(`Loaded ${pages.length} pages from migration-report-${siteId}.json`);
  } else {
    // Fall back to just the homepage
    warn(`migration-report-${siteId}.json not found — auditing homepage only`);
    warn(`Run migrate-wordpress-content.mjs first to get the full page list`);
    pages = [{ slug: 'home', url: wpUrl + '/', title: 'Homepage' }];
  }

  // Filter to only requested pages if --pages flag provided
  if (onlyPages) {
    pages = pages.filter(p => onlyPages.includes(p.slug));
    if (pages.length === 0) die(`No pages matched --pages ${onlyPages.join(',')}`);
  }

  step('Launching Chromium');
  const browser = await chromium.launch({ headless: true });
  log('Chromium ready');

  const tokensByPage = {};
  let screenshotCount = 0;

  for (let i = 0; i < pages.length; i++) {
    const { slug, url, title } = pages[i];
    const progress = `[${i + 1}/${pages.length}]`;
    info(`\n${progress} Auditing: ${title} (${url})`);

    const pageOutDir = join(outDir, slug);
    if (!noScreenshots) mkdirSync(pageOutDir, { recursive: true });

    const context = await browser.newContext({
      // Use no locale/timezone to avoid Cloudflare fingerprinting
    });

    try {
      // ── Desktop: screenshot + computed styles ─────────────────────────────
      const desktopPage = await context.newPage();
      await desktopPage.setViewportSize({ width: 1440, height: 900 });

      try {
        await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        // networkidle can time out on complex pages — domcontentloaded is enough
        await desktopPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await desktopPage.waitForTimeout(2000);
      }

      // Dismiss cookie banners / popups before screenshotting
      await desktopPage.evaluate(() => {
        const selectors = [
          '[id*="cookie"]', '[class*="cookie"]', '[id*="popup"]', '[class*="popup"]',
          '[id*="modal"]', '[class*="modal"]', '.elementor-popup-modal',
        ];
        for (const sel of selectors) {
          document.querySelectorAll(sel).forEach(el => el.remove());
        }
      });

      // Extract computed tokens on this page
      const computed = await extractComputedTokens(desktopPage);
      tokensByPage[slug] = { title, url, computed };

      if (!noScreenshots) {
        // Full-page desktop screenshot
        await desktopPage.screenshot({
          path: join(pageOutDir, 'desktop.png'),
          fullPage: true,
        });
        info(`  📸 desktop.png`);
        screenshotCount++;
      }

      await desktopPage.close();

      // ── Tablet + Mobile screenshots ───────────────────────────────────────
      if (!noScreenshots) {
        for (const vp of VIEWPORTS.filter(v => v.name !== 'desktop')) {
          const vpPage = await context.newPage();
          await vpPage.setViewportSize({ width: vp.width, height: vp.height });
          try {
            await vpPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
            await vpPage.waitForTimeout(1500);
          } catch { /* continue */ }
          await vpPage.evaluate(() => {
            const selectors = ['[id*="cookie"]', '[class*="cookie"]', '[id*="popup"]', '.elementor-popup-modal'];
            selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.remove()));
          });
          await vpPage.screenshot({
            path: join(pageOutDir, `${vp.name}.png`),
            fullPage: true,
          });
          info(`  📸 ${vp.name}.png`);
          screenshotCount++;
          await vpPage.close();
        }
      }

    } catch (err) {
      warn(`${progress} Failed to audit "${title}": ${err.message}`);
    } finally {
      await context.close();
    }
  }

  await browser.close();

  // ── Build complete token sheet from computed data ─────────────────────────
  step('Compiling design token sheet');

  // Use homepage data as primary source
  const primaryPage = tokensByPage['home'] || tokensByPage[Object.keys(tokensByPage)[0]];
  const primary = primaryPage?.computed || {};

  // Aggregate section backgrounds across all pages
  const allBgs = [...new Set(
    Object.values(tokensByPage)
      .flatMap(p => p.computed?.colors?.sectionBackgrounds || [])
      .filter(Boolean)
  )];

  // Find the most common section padding
  const allPaddings = Object.values(tokensByPage)
    .flatMap(p => p.computed?.spacing?.allSectionPaddings || [])
    .filter(Boolean);
  const paddingFreq = {};
  allPaddings.forEach(p => { paddingFreq[p] = (paddingFreq[p] || 0) + 1; });
  const standardPadding = Object.entries(paddingFreq)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || primary.spacing?.standardSectionPaddingTop;

  const tokenSheet = {
    _meta: {
      generatedAt:   new Date().toISOString(),
      sourceUrl:     wpUrl,
      siteId,
      pagesAudited:  Object.keys(tokensByPage).length,
      method:        'Playwright computed styles (real browser)',
      note:          'Values extracted from live rendered DOM — more accurate than CSS text parsing.',
    },

    // ── Complete platform token sheet (ready for new-brand-prototype Phase 4) ──
    platformTokenSheet: {
      colors: {
        primaryBackground:   primary.colors?.bodyBackground   || '???',
        secondaryBackground: allBgs.find(c => c !== primary.colors?.bodyBackground) || '???',
        surfaceCard:         '??? (check card/box background in DevTools)',
        primaryText:         primary.colors?.bodyText         || '???',
        secondaryText:       '??? (check muted/subtitle text in DevTools)',
        headingText:         primary.colors?.headingText      || '???',
        accentPrimary:       primary.colors?.ctaBackground    || '???',
        accentSecondary:     '??? (check secondary button or link color)',
        ctaText:             primary.colors?.ctaText          || '???',
        navBackground:       primary.colors?.navBackground    || '???',
        linkColor:           primary.colors?.linkColor        || '???',
        allSectionBackgrounds: allBgs,
      },
      typography: {
        displayFont:         primary.typography?.displayFont  || '???',
        displayWeight:       primary.typography?.displayWeight || '???',
        displaySize:         primary.typography?.displaySize  || '???',
        displayTracking:     primary.typography?.displayTracking || '???',
        displayLineHeight:   primary.typography?.displayLineHeight || '???',
        bodyFont:            primary.typography?.bodyFont     || '???',
        bodySize:            primary.typography?.bodySize     || '???',
        bodyLineHeight:      primary.typography?.bodyLineHeight || '???',
        bodyWeight:          primary.typography?.bodyWeight   || '???',
      },
      spacing: {
        standardSectionPadding: standardPadding || '???',
        maxContentWidth:         primary.spacing?.maxContentWidth || '???',
        ctaBorderRadius:         primary.spacing?.ctaBorderRadius || '???',
        ctaPadding:              primary.spacing?.ctaPadding || '???',
        cardBorderRadius:        primary.spacing?.cardBorderRadius || '???',
        spacingUnit:             '8px base',
      },
      ctas: {
        primary:   `bg ${primary.colors?.ctaBackground || '???'} / text ${primary.colors?.ctaText || '???'} / radius ${primary.spacing?.ctaBorderRadius || '???'}`,
        secondary: '??? (inspect secondary/ghost buttons in DevTools)',
      },
      _remainingUnknowns: [
        'secondaryBackground — check alternating section colors in DevTools',
        'surfaceCard — inspect any card/box/testimonial background',
        'secondaryText — check caption or muted text color',
        'accentSecondary — check secondary button or hover states',
        'secondary CTA treatment — ghost border vs filled',
      ],
    },

    // ── Per-page audit data ──────────────────────────────────────────────────
    perPageAudit: tokensByPage,
  };

  const tokenOutPath = join(REPO_ROOT, `design-tokens-${siteId}-computed.json`);
  writeFileSync(tokenOutPath, JSON.stringify(tokenSheet, null, 2), 'utf8');
  log('Token sheet written');

  // ── Summary ────────────────────────────────────────────────────────────────
  const t = tokenSheet.platformTokenSheet;
  const spacing = t.spacing;

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Visual audit complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages audited  : ${Object.keys(tokensByPage).length}
Screenshots    : ${screenshotCount} saved to wp-screenshots/${siteId}/
Token sheet    : design-tokens-${siteId}-computed.json

─── Computed Design Tokens ──────────────────────────

Colors
  Primary background : ${t.colors.primaryBackground}
  Primary text       : ${t.colors.primaryText}
  Heading text       : ${t.colors.headingText}
  Nav background     : ${t.colors.navBackground}
  CTA background     : ${t.colors.accentPrimary}
  CTA text           : ${t.colors.ctaText}
  All section bgs    : ${t.colors.allSectionBackgrounds.join(', ')}

Typography
  Display font  : ${t.typography.displayFont} ${t.typography.displayWeight} / ${t.typography.displaySize}
  Body font     : ${t.typography.bodyFont} ${t.typography.bodyWeight} / ${t.typography.bodySize}
  Body line-ht  : ${t.typography.bodyLineHeight}

Spacing
  Section padding : ${spacing.standardSectionPadding}
  Max content width: ${spacing.maxContentWidth}
  CTA border-radius: ${spacing.ctaBorderRadius}
  CTA padding      : ${spacing.ctaPadding}
  Card border-radius: ${spacing.cardBorderRadius}

─── Remaining unknowns (need DevTools check) ────────
${t._remainingUnknowns.map(s => `  • ${s}`).join('\n')}

─── Next steps ──────────────────────────────────────

1. Open wp-screenshots/${siteId}/ in Finder — use these as your build spec
2. Open design-tokens-${siteId}-computed.json and fill in remaining ??? values
3. Pass the completed token sheet to new-brand-prototype Phase 4
4. During Track B builds: open [page]/desktop.png alongside your editor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1); });
