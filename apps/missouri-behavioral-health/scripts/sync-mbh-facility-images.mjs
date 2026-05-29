/**
 * Download MBH facility photos from the live WordPress site and upload to Supabase.
 * Sources: homepage "Tour Our Facility" gallery + additional WP IMG_* facility shots.
 * Run from apps/missouri-behavioral-health with .env.local present.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(appRoot, ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const WP_BASE = "https://missouribehavioralhealth.com/wp-content/uploads";

/** id → { path relative to uploads, caption } — order matches live homepage tour gallery first */
const FACILITY_IMAGES = {
  IMG_7788: { file: "2026/04/IMG_7788-scaled.jpeg", caption: "Treatment center interior" },
  IMG_6016: { file: "2026/04/IMG_6016-scaled.jpeg", caption: "Common area" },
  IMG_6017: { file: "2026/04/IMG_6017-scaled.jpeg", caption: "Clinical space" },
  IMG_6013: { file: "2026/04/IMG_6013-scaled.jpeg", caption: "Reception area" },
  IMG_7789: { file: "2026/04/IMG_7789-scaled.jpeg", caption: "Facility room" },
  IMG_6021: { file: "2026/04/IMG_6021-scaled.jpeg", caption: "Treatment space" },
  IMG_7804: { file: "2025/06/IMG_7804-scaled.jpeg", caption: "Interior common area" },
  IMG_6413: { file: "2025/06/IMG_6413-scaled.jpeg", caption: "Facility interior" },
  IMG_6414: { file: "2025/06/IMG_6414-scaled.jpeg", caption: "Facility interior" },
  IMG_6415: { file: "2025/06/IMG_6415-scaled.jpeg", caption: "Facility interior" },
  IMG_6416: { file: "2025/06/IMG_6416-scaled.jpeg", caption: "Facility interior" },
  IMG_7829: { file: "2025/06/IMG_7829-scaled.jpeg", caption: "Facility space" },
  IMG_7830: { file: "2025/06/IMG_7830-scaled.jpeg", caption: "Facility space" },
};

const contentTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

const uploaded = [];

for (const [id, meta] of Object.entries(FACILITY_IMAGES)) {
  const url = `${WP_BASE}/${meta.file}`;
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  const storageName = `mbh_facility_${id}${ext === ".jpeg" ? ".jpg" : ext}`;

  const tmp = path.join(os.tmpdir(), storageName);
  try {
    execFileSync("curl", ["-sL", "--max-time", "120", "-o", tmp, url], { stdio: "pipe" });
  } catch {
    console.error(`FAIL fetch ${id}: curl ${url}`);
    continue;
  }

  const buf = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  const { error } = await supabase.storage.from("site-assets").upload(`images/${storageName}`, buf, {
    contentType: contentTypes[ext] || "image/jpeg",
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) {
    console.error(`FAIL upload ${id}:`, error.message);
  } else {
    console.log(`OK ${storageName}`);
    uploaded.push({ id, storageName, caption: meta.caption });
  }
}

console.log("\nUploaded:", uploaded.length);
