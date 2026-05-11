#!/usr/bin/env node
// Adds missing resolveTrackedPageMetadata import to any page that calls it but doesn't import it.
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const pages = globSync("apps/northbound-treatment/src/app/**/page.tsx");

let fixed = 0;
for (const file of pages) {
  const src = readFileSync(file, "utf8");
  if (src.includes("resolveTrackedPageMetadata") && !src.includes('from "@sweetmedia/admin-core"')) {
    // Find the first import line and insert after it
    const updated = src.replace(
      /^(import .+ from "next";)/m,
      `$1\nimport { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";`
    );
    writeFileSync(file, updated, "utf8");
    console.log(`  ✓ fixed import: ${file}`);
    fixed++;
  }
}
console.log(`\nFixed ${fixed} files.`);
