import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");

function parseJwtPayload(secret) {
  const tokenParts = String(secret).split(".");
  if (tokenParts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(tokenParts[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

// Next.js local secrets first, then optional upload-specific overrides
dotenv.config({ path: path.join(appRoot, ".env.local") });
const uploadEnvName = process.env.UPLOAD_ENV_FILE || ".upload.env";
const uploadEnvPath = path.join(appRoot, uploadEnvName);
if (fs.existsSync(uploadEnvPath)) {
  dotenv.config({ path: uploadEnvPath });
}

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const jwtPayload = serviceRoleKey ? parseJwtPayload(serviceRoleKey) : null;
const refFromJwt = jwtPayload?.ref ?? null;

let projectRef = process.env.SUPABASE_PROJECT_REF || refFromJwt;

let supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  (projectRef ? `https://${projectRef}.supabase.co` : null);

if (!projectRef && supabaseUrl) {
  const m = String(supabaseUrl).match(/https:\/\/([a-z0-9]+)\.supabase\.co/i);
  if (m) projectRef = m[1];
}

const bucket = process.env.SUPABASE_BUCKET || "site-assets";
const localDir = process.env.LOCAL_IMAGE_DIR || path.join(appRoot, "state-upload-staging");

const envLabel = fs.existsSync(uploadEnvPath) ? `${uploadEnvName} + .env.local` : ".env.local";

if (!serviceRoleKey) {
  console.error(`Missing SUPABASE_SERVICE_ROLE_KEY (check .env.local and/or ${uploadEnvName}).`);
  process.exit(1);
}

if (!projectRef) {
  console.error(
    `Could not determine Supabase project ref. Set SUPABASE_PROJECT_REF or NEXT_PUBLIC_SUPABASE_URL / SUPABASE_URL, ` +
      `or use a valid SUPABASE_SERVICE_ROLE_KEY JWT (contains ref claim). (${envLabel})`,
  );
  process.exit(1);
}

if (!supabaseUrl) {
  supabaseUrl = `https://${projectRef}.supabase.co`;
}

if (!supabaseUrl.includes(`${projectRef}.supabase.co`)) {
  console.error(`SUPABASE_URL must match project ref ${projectRef}. Got: ${supabaseUrl}`);
  process.exit(1);
}

const tokenParts = serviceRoleKey.split(".");
if (tokenParts.length !== 3) {
  console.error(`SUPABASE_SERVICE_ROLE_KEY is not a valid JWT (${envLabel}).`);
  process.exit(1);
}

if (jwtPayload && jwtPayload.ref !== projectRef) {
  console.error(
    `Service role key JWT ref (${jwtPayload.ref}) does not match project ref (${projectRef}).`,
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const contentTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

const allowed = new Set(Object.keys(contentTypes));

async function walk(dir) {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (allowed.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}

const files = await walk(localDir);
console.log(`Using ${supabaseUrl} (ref ${projectRef})\nFound ${files.length} image files in ${localDir}`);

for (const file of files) {
  const relative = path.relative(localDir, file);
  const storagePath = `images/${relative}`.replaceAll("\\", "/");
  const ext = path.extname(file).toLowerCase();
  const contentType = contentTypes[ext] || "application/octet-stream";
  const body = await fsPromises.readFile(file);

  const { error } = await supabase.storage.from(bucket).upload(storagePath, body, {
    contentType,
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) {
    console.error(`Failed: ${relative} — ${error.message}`);
  } else {
    const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    console.log(`Uploaded: ${relative}`);
    console.log(data.publicUrl);
  }
}
