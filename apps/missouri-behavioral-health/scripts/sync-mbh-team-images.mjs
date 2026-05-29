/**
 * Download MBH team headshots from the live WordPress site and upload to Supabase.
 * Run from apps/missouri-behavioral-health with .env.local present.
 */
import fs from "node:fs/promises";
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

/** slug → WordPress media URL (from about-us page) */
const TEAM_IMAGES = {
  james: "https://missouribehavioralhealth.com/wp-content/uploads/2025/03/James-Voaklander-Headshot.png",
  daniel: "https://missouribehavioralhealth.com/wp-content/uploads/2025/03/Daniel-Hart-Headshot.png",
  jen: "https://missouribehavioralhealth.com/wp-content/uploads/2025/03/Jen-Rams.png",
  karynne:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/03/Karynne-Witkin-Headshot.png",
  andrew:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/06/Untitled-design-2025-06-04T172610.943.png",
  "jake-whitcomb":
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/06/image0-scaled.jpeg",
  shawn: "https://missouribehavioralhealth.com/wp-content/uploads/2025/06/Untitled-design3.png",
  stephanie:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/12/Stephanie-Behrens-Clinical-Director-for-MBH.png",
  darla: "https://missouribehavioralhealth.com/wp-content/uploads/2025/07/IMG_6798-scaled.jpg",
  mary: "https://missouribehavioralhealth.com/wp-content/uploads/2025/07/IMG_6808-scaled.jpg",
  bri: "https://missouribehavioralhealth.com/wp-content/uploads/2025/07/unnamed-scaled.jpg",
  "jake-martin":
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/09/IMG_7030-1-scaled.jpg",
  brent:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/11/Brent-Gilstrap-LPC-for-25-years.png",
  morgan:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/11/Morgan-Geier-Licensed-Professional-Counselor-LPC.png",
  philip:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/12/Philip-Immekus-Yoga-Instructor-for-MBH.png",
  alex: "https://missouribehavioralhealth.com/wp-content/uploads/2026/04/IMG_8133-scaled.jpeg",
  emily:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/12/Emily-Journagan-Provisionally-Licensed-Professional-Counselor-PLPC-for-MBH.png",
  monica:
    "https://missouribehavioralhealth.com/wp-content/uploads/2026/02/Monica-Loden-PMHNP-for-Missouri-Behavioral.png",
  brooklynn:
    "https://missouribehavioralhealth.com/wp-content/uploads/2026/02/Brooklynn-Wright-Licensed-Master-Social-Worker-MBH.png",
  tina: "https://missouribehavioralhealth.com/wp-content/uploads/2026/02/Tina-Simmons-Licensed-Master-Social-Worker-MBH.png",
  andrea:
    "https://missouribehavioralhealth.com/wp-content/uploads/2026/05/Andrea-picture-scaled.jpg",
  derrick:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/12/Derrick-Flores-Recovery-Care-Advocate-for-MBH.png",
  crystal:
    "https://missouribehavioralhealth.com/wp-content/uploads/2025/11/Crystal-Cramer-Licensed-Professional-Counselor-and-Mental-Health-Coach.png",
  kellie: "https://missouribehavioralhealth.com/wp-content/uploads/2025/07/image0.jpeg",
};

const contentTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

for (const [slug, url] of Object.entries(TEAM_IMAGES)) {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  const storageName = `mbh_team_${slug}${ext === ".jpeg" ? ".jpg" : ext}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL fetch ${slug}: ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const { error } = await supabase.storage
    .from("site-assets")
    .upload(`images/${storageName}`, buf, {
      contentType: contentTypes[ext] || "image/jpeg",
      upsert: true,
    });
  if (error) {
    console.error(`FAIL upload ${slug}:`, error.message);
  } else {
    console.log(`OK ${storageName}`);
  }
}
