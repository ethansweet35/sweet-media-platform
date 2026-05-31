#!/usr/bin/env node
/**
 * Optimize raster images (resize + WebP) and upload to Supabase `site-assets`.
 *
 * Usage (from a client app directory with .upload.env or .env.local):
 *   pnpm upload:images
 *   node ../../scripts/optimize-and-upload-images.mjs
 *
 * From repo root:
 *   pnpm upload:images -- --app-dir apps/northbound-treatment
 *
 * Env (.upload.env or .env.local):
 *   SUPABASE_PROJECT_REF, SUPABASE_SERVICE_ROLE_KEY
 *   SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL (optional)
 *   LOCAL_IMAGE_DIR — folder to scan (required unless default staging exists)
 *   SUPABASE_BUCKET — default site-assets
 *   UPLOAD_MAX_WIDTH — default 1280
 *   UPLOAD_WEBP_QUALITY — default 82
 *   UPLOAD_SKIP_PREFIXES — comma list, default logos,og,favicon
 *
 * Flags:
 *   --dry-run          Process and report sizes without uploading
 *   --passthrough      Upload originals (no Sharp), legacy behavior
 *   --max-width N      Override max width (default 1280)
 *   --quality N        WebP quality 1–100 (default 82)
 *   --app-dir PATH     Client app root (default cwd)
 */

import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const PASSTHROUGH_EXT = new Set([".svg", ".gif", ".ico"]);

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

function parseArgs(argv) {
  const opts = {
    appDir: process.cwd(),
    dryRun: false,
    passthrough: false,
    maxWidth: null,
    quality: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--passthrough") opts.passthrough = true;
    else if (arg === "--max-width") opts.maxWidth = Number(argv[++i]);
    else if (arg === "--quality") opts.quality = Number(argv[++i]);
    else if (arg === "--app-dir") opts.appDir = path.resolve(argv[++i]);
  }
  return opts;
}

function parseJwtPayload(secret) {
  const parts = String(secret).split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function loadEnvForApp(appRoot) {
  const envLocal = path.join(appRoot, ".env.local");
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });

  const uploadEnvName = process.env.UPLOAD_ENV_FILE || ".upload.env";
  const uploadEnvPath = path.join(appRoot, uploadEnvName);
  if (fs.existsSync(uploadEnvPath)) dotenv.config({ path: uploadEnvPath });

  return { uploadEnvName, uploadEnvPath, envLocal };
}

function resolveSupabaseConfig(appRoot) {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const jwtPayload = serviceRoleKey ? parseJwtPayload(serviceRoleKey) : null;
  let projectRef = process.env.SUPABASE_PROJECT_REF || jwtPayload?.ref || null;

  let supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    (projectRef ? `https://${projectRef}.supabase.co` : null);

  if (!projectRef && supabaseUrl) {
    const m = String(supabaseUrl).match(/https:\/\/([a-z0-9]+)\.supabase\.co/i);
    if (m) projectRef = m[1];
  }

  if (!supabaseUrl && projectRef) supabaseUrl = `https://${projectRef}.supabase.co`;

  const bucket = process.env.SUPABASE_BUCKET || "site-assets";
  const localDir = process.env.LOCAL_IMAGE_DIR;

  return { serviceRoleKey, projectRef, supabaseUrl, bucket, localDir, jwtPayload };
}

function shouldSkipOptimization(storagePath) {
  const lower = storagePath.toLowerCase().replace(/\\/g, "/");
  const skipPrefixes = (process.env.UPLOAD_SKIP_PREFIXES || "logos,og,favicon,icon")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (skipPrefixes.some((p) => lower.includes(`/${p}/`) || lower.startsWith(`${p}/`))) {
    return true;
  }
  return false;
}

async function walkImages(dir) {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkImages(full)));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (RASTER_EXT.has(ext) || PASSTHROUGH_EXT.has(ext)) files.push(full);
  }
  return files;
}

function replaceExtension(filePath, newExt) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  return path.join(dir, `${base}${newExt}`);
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * @param {{ appRoot: string, dryRun?: boolean, passthrough?: boolean, maxWidth?: number, quality?: number }} options
 */
export async function runOptimizeAndUpload(options) {
  const appRoot = path.resolve(options.appRoot);
  const cli = {
    dryRun: options.dryRun ?? false,
    passthrough: options.passthrough ?? false,
    maxWidth:
      options.maxWidth ??
      (Number(process.env.UPLOAD_MAX_WIDTH) || 1280),
    quality:
      options.quality ??
      (Number(process.env.UPLOAD_WEBP_QUALITY) || 82),
  };

  loadEnvForApp(appRoot);
  const { serviceRoleKey, projectRef, supabaseUrl, bucket, localDir, jwtPayload } =
    resolveSupabaseConfig(appRoot);

  if (!serviceRoleKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY (.env.local or .upload.env).");
    process.exit(1);
  }
  if (!projectRef || !supabaseUrl) {
    console.error("Could not resolve Supabase project (SUPABASE_PROJECT_REF or SUPABASE_URL).");
    process.exit(1);
  }
  if (!localDir || !fs.existsSync(localDir)) {
    console.error(`LOCAL_IMAGE_DIR is missing or not found: ${localDir ?? "(unset)"}`);
    process.exit(1);
  }
  if (jwtPayload?.ref && jwtPayload.ref !== projectRef) {
    console.error(`JWT ref (${jwtPayload.ref}) does not match project ref (${projectRef}).`);
    process.exit(1);
  }
  if (!supabaseUrl.includes(`${projectRef}.supabase.co`)) {
    console.error(`SUPABASE_URL does not match project ref ${projectRef}.`);
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const files = await walkImages(localDir);

  console.log(`\nOptimize & upload → ${supabaseUrl}`);
  console.log(`Bucket: ${bucket} | Local: ${localDir}`);
  console.log(
    cli.passthrough
      ? "Mode: passthrough (no optimization)"
      : `Mode: WebP max width ${cli.maxWidth}px, quality ${cli.quality}`,
  );
  if (cli.dryRun) console.log("DRY RUN — nothing uploaded\n");
  else console.log("");

  const manifest = {
    uploadedAt: new Date().toISOString(),
    projectRef,
    bucket,
    dryRun: cli.dryRun,
    files: [],
    extensionChanges: [],
  };

  let savedBytes = 0;
  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const relative = path.relative(localDir, file);
    let storagePath = `images/${relative}`.replaceAll("\\", "/");
    const ext = path.extname(file).toLowerCase();
    const originalBuf = await fsPromises.readFile(file);
    const beforeBytes = originalBuf.length;

    let body = originalBuf;
    let contentType = CONTENT_TYPES[ext] || "application/octet-stream";

    const skipOptimize =
      cli.passthrough ||
      PASSTHROUGH_EXT.has(ext) ||
      shouldSkipOptimization(storagePath);

    if (!skipOptimize && RASTER_EXT.has(ext)) {
      try {
        let pipeline = sharp(originalBuf, { failOn: "none" });
        const meta = await pipeline.metadata();
        if (meta.width && meta.width > cli.maxWidth) {
          pipeline = pipeline.resize({ width: cli.maxWidth, withoutEnlargement: true });
        }
        pipeline = pipeline.webp({ quality: cli.quality, effort: 4 });
        body = await pipeline.toBuffer();
        contentType = "image/webp";

        const newStoragePath = replaceExtension(storagePath, ".webp").replaceAll("\\", "/");
        if (newStoragePath !== storagePath) {
          manifest.extensionChanges.push({ from: storagePath, to: newStoragePath });
          storagePath = newStoragePath;
        }
      } catch (err) {
        console.error(`Optimize failed ${relative}: ${err.message} — uploading original`);
        body = originalBuf;
        contentType = CONTENT_TYPES[ext] || "application/octet-stream";
      }
    }

    const afterBytes = body.length;
    savedBytes += Math.max(0, beforeBytes - afterBytes);

    if (cli.dryRun) {
      console.log(
        `${relative} → ${storagePath} | ${formatBytes(beforeBytes)} → ${formatBytes(afterBytes)}`,
      );
      manifest.files.push({ relative, storagePath, beforeBytes, afterBytes, dryRun: true });
      continue;
    }

    const { error } = await supabase.storage.from(bucket).upload(storagePath, body, {
      contentType,
      cacheControl: "31536000",
      upsert: true,
    });

    if (error) {
      failed++;
      console.error(`✗ ${relative} — ${error.message}`);
      continue;
    }

    uploaded++;
    const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    console.log(
      `✓ ${relative} → ${storagePath} (${formatBytes(beforeBytes)} → ${formatBytes(afterBytes)})`,
    );
    console.log(`  ${data.publicUrl}`);
    manifest.files.push({
      relative,
      storagePath,
      publicUrl: data.publicUrl,
      beforeBytes,
      afterBytes,
    });
  }

  const manifestPath = path.join(appRoot, "upload-manifest.json");
  await fsPromises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log("\n────────────────────────────────────────");
  console.log(`Done: ${uploaded} uploaded, ${failed} failed, ${files.length} total`);
  if (!cli.passthrough) console.log(`Bytes saved vs originals: ${formatBytes(savedBytes)}`);
  if (manifest.extensionChanges.length > 0) {
    console.log(
      `\n⚠ ${manifest.extensionChanges.length} file(s) changed extension (.jpg/.png → .webp).`,
    );
    console.log("  Update src/ URLs if they still point at the old extension.");
    for (const { from, to } of manifest.extensionChanges) {
      console.log(`  • ${from} → ${to}`);
    }
  }
  console.log(`Manifest: ${manifestPath}\n`);

  return manifest;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const opts = parseArgs(process.argv.slice(2));
  await runOptimizeAndUpload({
    appRoot: opts.appDir,
    dryRun: opts.dryRun,
    passthrough: opts.passthrough,
    maxWidth: opts.maxWidth ?? undefined,
    quality: opts.quality ?? undefined,
  });
}
