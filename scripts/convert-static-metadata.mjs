#!/usr/bin/env node
/**
 * Converts `export const metadata: Metadata = {...}` to
 * `const fallback: Metadata = {...}` + `export async function generateMetadata()`
 * for all northbound-treatment page files (excluding layout.tsx and admin).
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, relative } from "path";

const APP_DIR = resolve("apps/northbound-treatment/src/app");
const APP_PREFIX = `${APP_DIR}/`;

const files = [
  "wolf-assisted-therapy/page.tsx",
  "veterans-track-program/page.tsx",
  "telehealth-iop-services/page.tsx",
  "programs/partial-hospitalization-program/page.tsx",
  "programs/intensive-outpatient-treatment/page.tsx",
  "programs/aftercare/page.tsx",
  "programs/residential-treatment-center/christ-centered-links-residential-program/page.tsx",
  "programs/residential-treatment-center/page.tsx",
  "programs/family-therapy/page.tsx",
  "locations/washington/seattle/page.tsx",
  "locations/page.tsx",
  "locations/california/garden-grove/page.tsx",
  "locations/california/newport-beach/page.tsx",
  "locations/california/san-diego/page.tsx",
  "admissions/interventions/page.tsx",
  "treatment/alcoholism/page.tsx",
  "treatment/dual-diagnosis/ocd-treatment-and-counseling/page.tsx",
  "treatment/dual-diagnosis/treatment-for-anxiety-disorders/page.tsx",
  "treatment/dual-diagnosis/page.tsx",
  "treatment/crack-cocaine/page.tsx",
  "treatment/marijuana/page.tsx",
  "treatment/meth/page.tsx",
  "treatment/prescription/page.tsx",
  "treatment/music-program/page.tsx",
  "treatment/suboxone/page.tsx",
  "treatment/heroin/page.tsx",
  "treatment/mental-health-disorders/trauma-therapy/page.tsx",
  "treatment/mental-health-disorders/codependency/page.tsx",
  "treatment/mental-health-disorders/bipolar-disorder/page.tsx",
  "treatment/mental-health-disorders/borderline-personality-disorder/page.tsx",
  "treatment/mental-health-disorders/depression/page.tsx",
  "treatment/adderall/page.tsx",
  "treatment/opioid/page.tsx",
  "treatment/transitional-living-programs/sober-living/page.tsx",
  "adventure-therapy-program/page.tsx",
  "community/alumni/page.tsx",
  "insurance/blue-cross-blue-shield/page.tsx",
  "insurance/mhn/page.tsx",
  "insurance/ilwu/page.tsx",
  "insurance/geha-insurance/page.tsx",
  "insurance/magellan/page.tsx",
  "insurance/premera-blue-cross/page.tsx",
  "insurance/anthem-blue-cross/page.tsx",
  "insurance/health-net/page.tsx",
  "insurance/tricare/page.tsx",
  "insurance/usamco/page.tsx",
  "insurance/nyship/page.tsx",
  "insurance/cigna/page.tsx",
  "insurance/compsych/page.tsx",
  "insurance/aetna/page.tsx",
  "insurance/first-health/page.tsx",
  "insurance/page.tsx",
  "insurance/beacon/page.tsx",
];

let converted = 0;
let skipped = 0;

for (const rel of files) {
  const filePath = `${APP_PREFIX}${rel}`;
  const routePath = `/${rel.replace("/page.tsx", "")}`;

  let src;
  try {
    src = readFileSync(filePath, "utf8");
  } catch {
    console.warn(`  SKIP (not found): ${rel}`);
    skipped++;
    continue;
  }

  // Already converted
  if (src.includes("generateMetadata") || src.includes("resolveTrackedPageMetadata")) {
    console.log(`  SKIP (already dynamic): ${rel}`);
    skipped++;
    continue;
  }

  // Must have static metadata export
  if (!src.includes("export const metadata")) {
    console.log(`  SKIP (no static metadata): ${rel}`);
    skipped++;
    continue;
  }

  // 1. Add resolveTrackedPageMetadata import after the `import type { Metadata }` line
  let out = src;

  // Add import if missing
  if (!out.includes("resolveTrackedPageMetadata")) {
    out = out.replace(
      /^(import type \{ Metadata \} from "next";)/m,
      `$1\nimport { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";`
    );
  }

  // 2. Replace `export const metadata: Metadata = {` with `const fallback: Metadata = {`
  out = out.replace(
    /^export const metadata: Metadata = \{/m,
    `const fallback: Metadata = {`
  );

  // 3. After the closing `};` of metadata (which is now `fallback`), add generateMetadata
  //    We find the end of the fallback object by looking for `};\n\n` or `};\n` followed by export/const
  //    Strategy: replace `};\n\nexport default` or `};\n\nconst` pattern
  const generateFn = `\nexport async function generateMetadata(): Promise<Metadata> {\n  return resolveTrackedPageMetadata("${routePath}", fallback);\n}\n`;

  // Insert generateMetadata before `export default function`
  if (out.includes("\nexport default function") || out.includes("\nexport default ")) {
    out = out.replace(
      /(\n)(export default (function|const|\w))/,
      `\n${generateFn}\n$2`
    );
  } else {
    // Append at end
    out = out.trimEnd() + `\n${generateFn}`;
  }

  writeFileSync(filePath, out, "utf8");
  console.log(`  ✓ converted: ${rel} → ${routePath}`);
  converted++;
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped.`);
