import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const envFile = process.env.UPLOAD_ENV_FILE || ".upload.env";
dotenv.config({ path: envFile });

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "site-assets";
const localDir = process.env.LOCAL_IMAGE_DIR;
const projectRef = process.env.SUPABASE_PROJECT_REF;

if (!supabaseUrl || !serviceRoleKey || !localDir) {
  console.error(
    `Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or LOCAL_IMAGE_DIR in ${envFile}`
  );
  process.exit(1);
}

if (!projectRef) {
  console.error(`Missing SUPABASE_PROJECT_REF in ${envFile}.`);
  process.exit(1);
}

if (!supabaseUrl.includes(`${projectRef}.supabase.co`)) {
  console.error(
    `SUPABASE_URL does not match SUPABASE_PROJECT_REF (${projectRef}) in ${envFile}.`
  );
  process.exit(1);
}

const tokenParts = serviceRoleKey.split(".");
if (tokenParts.length !== 3) {
  console.error(`SUPABASE_SERVICE_ROLE_KEY is not a valid JWT in ${envFile}.`);
  process.exit(1);
}

const jwtPayload = JSON.parse(Buffer.from(tokenParts[1], "base64url").toString("utf8"));
if (jwtPayload.ref !== projectRef) {
  console.error(
    `Service role key project ref (${jwtPayload.ref}) does not match SUPABASE_PROJECT_REF (${projectRef}) in ${envFile}.`
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
  const entries = await fs.readdir(dir, { withFileTypes: true });
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
console.log(`Found ${files.length} image files`);

for (const file of files) {
  const relative = path.relative(localDir, file);
  const storagePath = `images/${relative}`.replaceAll("\\", "/");
  const ext = path.extname(file).toLowerCase();
  const contentType = contentTypes[ext] || "application/octet-stream";
  const body = await fs.readFile(file);

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
