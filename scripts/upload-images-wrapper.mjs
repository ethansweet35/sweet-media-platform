/**
 * Thin entry used by each client app's scripts/upload-images-to-supabase.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runOptimizeAndUpload } from "./optimize-and-upload-images.mjs";

function parseArgs(argv) {
  const opts = { dryRun: false, passthrough: false, maxWidth: undefined, quality: undefined };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--passthrough") opts.passthrough = true;
    else if (arg === "--max-width") opts.maxWidth = Number(argv[++i]);
    else if (arg === "--quality") opts.quality = Number(argv[++i]);
  }
  return opts;
}

/** @param {string} importMetaUrl — pass import.meta.url from the app script */
export async function runFromAppScript(importMetaUrl) {
  const appRoot = path.resolve(path.dirname(fileURLToPath(importMetaUrl)), "..");
  const flags = parseArgs(process.argv.slice(2));
  await runOptimizeAndUpload({ appRoot, ...flags });
}
