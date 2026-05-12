import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = "site-assets";
const legacyBase =
  "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const legacyPaths = [
  "accred-jc.png",
  "accred-legitscript.svg",
  "accred-dhcs.svg",
  "accred-asam.svg",
  "loc_hero01.jpg",
  "vop_hero01.jpg",
  "detox_hero02.jpg",
  "php_hero01.jpg",
  "iop_hero01.jpg",
  "detox_hero01.jpg",
  "op_hero01.jpg",
  "wp-migrated/rize-logo.png",
];

const repoRoot = path.resolve(process.cwd(), "../..");
const assetRoot = path.resolve(
  repoRoot,
  "../../.cursor/projects/Users-ethansweet-Code-sweet-media-platform/assets",
);

const localUploads = [
  {
    storagePath: "images/og-default.jpg",
    localPath: path.join(assetRoot, "ro_og-default.jpg"),
  },
  {
    storagePath: "images/og-blog.jpg",
    localPath: path.join(assetRoot, "ro_og-blog.jpg"),
  },
];

const contentTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function uploadBuffer(storagePath, body, contentType) {
  const { error } = await supabase.storage.from(bucket).upload(storagePath, body, {
    contentType,
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) throw new Error(`${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  console.log(`Uploaded ${storagePath}`);
  console.log(data.publicUrl);
}

async function migrateLegacy(relativePath) {
  const url = `${legacyBase}/${relativePath}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${relativePath}: fetch ${res.status}`);
  }
  const body = Buffer.from(await res.arrayBuffer());
  const ext = path.extname(relativePath).toLowerCase();
  const contentType = contentTypes[ext] || res.headers.get("content-type") || "application/octet-stream";
  await uploadBuffer(`images/${relativePath}`.replaceAll("\\", "/"), body, contentType);
}

for (const relativePath of legacyPaths) {
  await migrateLegacy(relativePath);
}

for (const { storagePath, localPath } of localUploads) {
  const body = await fs.readFile(localPath);
  const ext = path.extname(localPath).toLowerCase();
  const contentType = contentTypes[ext] || "application/octet-stream";
  await uploadBuffer(storagePath, body, contentType);
}
