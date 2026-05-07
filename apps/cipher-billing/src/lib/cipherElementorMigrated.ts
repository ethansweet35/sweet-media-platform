import { readFileSync } from "node:fs";
import { join } from "node:path";

const BODY_MARKER = '<div class="elementor-element elementor-element-e5d3636';

function resolveCipherBillingRoot(): string {
  const cwd = process.cwd();
  return cwd.endsWith("cipher-billing") ? cwd : join(cwd, "apps/cipher-billing");
}

/**
 * Loads WP migration HTML and returns markup starting at the first main content section
 * (Elementor container `e5d3636`), after normalizing legacy phone numbers to Cipher Billing’s line.
 */
export function loadCipherElementorBody(pathUnderViews: string): string {
  const root = resolveCipherBillingRoot();
  const fullPath = join(root, "src/views", pathUnderViews);
  let html = readFileSync(fullPath, "utf8");
  const idx = html.indexOf(BODY_MARKER);
  if (idx !== -1) html = html.slice(idx);
  return normalizeCipherTelInHtml(html);
}

export function normalizeCipherTelInHtml(html: string): string {
  return html
    .replace(/href="tel:9493680575"/g, 'href="tel:+17148671331"')
    .replace(/href="tel:\(949\)%20368-0575"/g, 'href="tel:+17148671331"')
    .replace(/Call Now \| \(949\) 368-0575/g, "Call Now | (714) 867-1331")
    .replace(/\(\s*949\s*\)\s*368-0575/g, "(714) 867-1331");
}

/** Full WP export HTML for a page (no slice), with phone numbers normalized to Cipher Billing. */
export function loadCipherElementorFullPage(pathUnderViews: string): string {
  const root = resolveCipherBillingRoot();
  const fullPath = join(root, "src/views", pathUnderViews);
  const html = readFileSync(fullPath, "utf8");
  return normalizeCipherTelInHtml(html);
}
