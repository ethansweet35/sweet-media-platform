import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, "src");

const SUPABASE_BASE =
  "https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/";

const uploadedListPath = path.join(projectRoot, "uploaded-image-files.txt");

if (!fs.existsSync(uploadedListPath)) {
  console.error("Missing uploaded-image-files.txt");
  process.exit(1);
}

if (!fs.existsSync(srcRoot)) {
  console.error("Missing src directory");
  process.exit(1);
}

const uploadedFiles = fs
  .readFileSync(uploadedListPath, "utf8")
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

const fileMap = new Map();
for (const rel of uploadedFiles) {
  const base = path.basename(rel, path.extname(rel));
  if (!fileMap.has(base)) {
    fileMap.set(base, rel);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (/\.(ts|tsx|js|jsx|json|md|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const codeFiles = walk(srcRoot);

const readdyRegex =
  /https:\/\/readdy\.ai\/api\/search-image[^"'`\s)]*?[?&]seq=([^&"'`\s)]+)[^"'`\s)]*/g;

let changedFiles = 0;
let totalReplacements = 0;
const missingSeqs = new Set();

for (const filePath of codeFiles) {
  const original = fs.readFileSync(filePath, "utf8");

  let replacedCountForFile = 0;

  const updated = original.replace(readdyRegex, (full, seqRaw) => {
    const seq = decodeURIComponent(seqRaw);
    const rel = fileMap.get(seq);

    if (!rel) {
      missingSeqs.add(seq);
      return full;
    }

    replacedCountForFile += 1;
    totalReplacements += 1;
    return SUPABASE_BASE + rel;
  });

  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    changedFiles += 1;
    console.log(`Updated ${filePath} (${replacedCountForFile} replacements)`);
  }
}

console.log("");
console.log(`Done. Changed files: ${changedFiles}`);
console.log(`Total replacements: ${totalReplacements}`);

if (missingSeqs.size) {
  console.log("");
  console.log("Missing seq values with no matching uploaded file:");
  for (const seq of [...missingSeqs].sort()) {
    console.log(`- ${seq}`);
  }
}
