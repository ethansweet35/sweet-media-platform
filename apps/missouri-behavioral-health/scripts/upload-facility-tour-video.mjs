#!/usr/bin/env node
/** Upload homepage facility tour video to Supabase site-assets/videos/ */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const localFile = process.argv[2];
const storageName = "mbh_facility_tour.mp4";

if (!localFile) {
  console.error("Usage: node scripts/upload-facility-tour-video.mjs <path-to-mp4>");
  process.exit(1);
}

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".upload.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "site-assets";
const projectRef =
  process.env.SUPABASE_PROJECT_REF || supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

if (!supabaseUrl || !serviceRoleKey || !projectRef) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

if (!fs.existsSync(localFile)) {
  console.error(`File not found: ${localFile}`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const buf = fs.readFileSync(localFile);
const storagePath = `videos/${storageName}`;

const { error } = await supabase.storage.from(bucket).upload(storagePath, buf, {
  contentType: "video/mp4",
  cacheControl: "31536000",
  upsert: true,
});

if (error) {
  console.error(error);
  process.exit(1);
}

const publicUrl = `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${storagePath}`;
console.log(publicUrl);
