/**
 * Migrate WordPress media library originals → Supabase storage
 * Usage: node scripts/migrate-wp-media.mjs --wp-base <url> --supabase-url <url> --service-role-key <key> [--prefix images/wp-media] [--dry-run]
 */

import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join, basename, extname } from "path";
import { tmpdir } from "os";

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const WP_BASE = getArg("--wp-base") || "https://northboundtdev.wpenginepowered.com";
const SUPABASE_URL = getArg("--supabase-url");
const SERVICE_ROLE_KEY = getArg("--service-role-key");
const BUCKET = getArg("--bucket") || "site-assets";
const PREFIX = getArg("--prefix") || "images/wp-media";
const DRY_RUN = args.includes("--dry-run");
const CONCURRENCY = parseInt(getArg("--concurrency") || "5");
const RESUME_FILE = join(process.cwd(), "wp-media-migration-progress.json");

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing --supabase-url or --service-role-key");
  process.exit(1);
}

const ALLOWED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

async function fetchMediaPage(page, perPage = 100) {
  const url = `${WP_BASE}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}&media_type=image`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`WP API error ${res.status} on page ${page}`);
  const total = parseInt(res.headers.get("x-wp-total") || "0");
  const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "1");
  const items = await res.json();
  return { items, total, totalPages };
}

async function getAllMediaUrls() {
  console.log("Fetching media index from WP...");
  const { items: first, total, totalPages } = await fetchMediaPage(1);
  console.log(`Total media items: ${total} across ${totalPages} pages`);

  const allItems = [...first];
  for (let page = 2; page <= totalPages; page++) {
    process.stdout.write(`\rFetching page ${page}/${totalPages}...`);
    const { items } = await fetchMediaPage(page);
    allItems.push(...items);
    // Small delay to be polite to WP server
    await new Promise(r => setTimeout(r, 100));
  }
  console.log(`\nFetched ${allItems.length} items`);

  return allItems
    .map(item => item.source_url)
    .filter(url => {
      const ext = extname(new URL(url).pathname).toLowerCase();
      return ALLOWED_EXTS.has(ext);
    });
}

async function uploadToSupabase(localPath, filename) {
  const data = await readFile(localPath);
  const ext = extname(filename).toLowerCase();
  const mimeMap = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".png": "image/png", ".webp": "image/webp",
    ".gif": "image/gif", ".svg": "image/svg+xml", ".avif": "image/avif"
  };
  const contentType = mimeMap[ext] || "application/octet-stream";
  const storagePath = `${PREFIX}/${filename}`;

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${storagePath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": contentType,
        "x-upsert": "true",
      },
      body: data,
    }
  );

  if (!res.ok && res.status !== 200) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}

async function processUrl(url, tmpDir) {
  const parsed = new URL(url);
  const filename = basename(parsed.pathname);
  const localPath = join(tmpDir, filename);

  // Download
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  const buffer = await res.arrayBuffer();
  await writeFile(localPath, Buffer.from(buffer));

  // Upload
  const publicUrl = await uploadToSupabase(localPath, filename);
  return publicUrl;
}

async function runWithConcurrency(tasks, concurrency, onDone) {
  let i = 0;
  let running = 0;
  let done = 0;
  return new Promise((resolve, reject) => {
    function next() {
      while (running < concurrency && i < tasks.length) {
        const task = tasks[i++];
        running++;
        task()
          .then(result => {
            running--;
            done++;
            onDone(result, done, tasks.length);
            next();
            if (done === tasks.length) resolve();
          })
          .catch(err => {
            running--;
            done++;
            onDone({ error: err.message }, done, tasks.length);
            next();
            if (done === tasks.length) resolve();
          });
      }
    }
    next();
  });
}

async function main() {
  console.log(`WP Base: ${WP_BASE}`);
  console.log(`Supabase: ${SUPABASE_URL}`);
  console.log(`Target: ${BUCKET}/${PREFIX}`);
  console.log(`Dry run: ${DRY_RUN}`);
  console.log("");

  // Load progress if resuming
  let completed = new Set();
  let errors = {};
  if (existsSync(RESUME_FILE)) {
    const saved = JSON.parse(await readFile(RESUME_FILE, "utf8"));
    completed = new Set(saved.completed || []);
    errors = saved.errors || {};
    console.log(`Resuming: ${completed.size} already done, ${Object.keys(errors).length} previous errors`);
  }

  const allUrls = await getAllMediaUrls();
  const pending = allUrls.filter(u => !completed.has(u));
  console.log(`\nTotal image URLs: ${allUrls.length}`);
  console.log(`Pending (not yet uploaded): ${pending.length}`);

  if (DRY_RUN) {
    console.log("\nDry run — first 20 URLs:");
    pending.slice(0, 20).forEach(u => console.log(" ", u));
    return;
  }

  const tmpDir = join(tmpdir(), "wp-media-migration");
  mkdirSync(tmpDir, { recursive: true });

  const results = [];
  const tasks = pending.map(url => async () => {
    try {
      const publicUrl = await processUrl(url, tmpDir);
      completed.add(url);
      return { url, publicUrl, ok: true };
    } catch (err) {
      errors[url] = err.message;
      return { url, error: err.message, ok: false };
    }
  });

  let lastSave = Date.now();
  await runWithConcurrency(tasks, CONCURRENCY, (result, done, total) => {
    results.push(result);
    const pct = ((done / total) * 100).toFixed(1);
    if (result.ok) {
      process.stdout.write(`\r[${pct}%] ${done}/${total} ✓ ${basename(result.url).slice(0, 40).padEnd(40)}`);
    } else {
      console.log(`\n[${pct}%] ${done}/${total} ✗ ${result.url} — ${result.error}`);
    }
    // Save progress every 30s
    if (Date.now() - lastSave > 30000) {
      writeFile(RESUME_FILE, JSON.stringify({ completed: [...completed], errors }, null, 2)).catch(() => {});
      lastSave = Date.now();
    }
  });

  // Final save
  await writeFile(RESUME_FILE, JSON.stringify({ completed: [...completed], errors }, null, 2));

  const succeeded = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n\nDone! ${succeeded} uploaded, ${failed} failed`);
  if (failed > 0) {
    console.log("Failed URLs saved to wp-media-migration-progress.json");
  }
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
