#!/usr/bin/env node
/** Upload homepage about-section video to Supabase site-assets/videos/ */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const localFile = process.argv[2] || "/tmp/tfrf_home_about_video.mp4";
const storageName = "tfrf_home_about_video.mp4";

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
