#!/usr/bin/env node
/**
 * One-time port helper: copies Readdy Vite pages into src/views and applies Next.js transforms.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = join(__dirname, "..");
const READDY_PAGES = join(APP, "readdy-export/src/pages");
const VIEWS = join(APP, "src/views");
const READDY_COMPONENTS = join(APP, "readdy-export/src/components");
const COMPONENTS = join(APP, "src/components");
const READDY_MOCKS = join(APP, "readdy-export/src/mocks");
const MOCKS = join(APP, "src/mocks");

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|ts)$/.test(name)) files.push(p);
  }
  return files;
}

function transformSource(src, filePath) {
  let out = src;

  if (out.includes('from "react-router-dom"') || out.includes("from 'react-router-dom'")) {
    out = out.replace(/import\s*\{[^}]*\}\s*from\s*["']react-router-dom["'];?\n?/g, "");
    if (!out.includes('from "next/link"')) {
      out = `import Link from "next/link";\n${out}`;
    }
    out = out.replace(/\bto=\{/g, "href={").replace(/\bto="/g, 'href="').replace(/\bto='/g, "href='");
  }

  out = out.replace(/import Navbar from ["']@\/components\/feature\/Navbar["'];?\n?/g, "");
  out = out.replace(/import Footer from ["']@\/components\/feature\/Footer["'];?\n?/g, "");
  out = out.replace(/<Navbar\s*\/?>\s*/g, "");
  out = out.replace(/<Footer\s*\/?>\s*/g, "");

  const needsClient =
    /\buseState\b|\buseEffect\b|\buseRef\b|\buseCallback\b|\buseMemo\b/.test(out) &&
    !out.startsWith("'use client'") &&
    !out.startsWith('"use client"');

  if (needsClient) {
    out = `'use client';\n\n${out}`;
  }

  if (filePath.endsWith("/page.tsx") && /export default function (\w+)/.test(out)) {
    const match = out.match(/export default function (\w+)/);
    if (match && match[1] === "Home") {
      out = out.replace(/export default function Home/, "export default function HomePage");
    }
  }

  return out;
}

// Copy pages → views (preserve admin/ + blog/)
for (const name of readdirSync(READDY_PAGES)) {
  const src = join(READDY_PAGES, name);
  const dest = join(VIEWS, name);
  if (name === "NotFound.tsx") continue;
  if (statSync(src).isDirectory()) {
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    cpSync(src, dest, { recursive: true });
  }
}

// Copy base components (not feature — Navbar/Footer ported separately)
cpSync(join(READDY_COMPONENTS, "base"), join(COMPONENTS, "base"), { recursive: true });
if (existsSync(join(READDY_COMPONENTS, "feature", "Lifeline.tsx"))) {
  mkdirSync(join(COMPONENTS, "feature"), { recursive: true });
  cpSync(join(READDY_COMPONENTS, "feature", "Lifeline.tsx"), join(COMPONENTS, "feature", "Lifeline.tsx"));
}

// Mocks
if (existsSync(MOCKS)) rmSync(MOCKS, { recursive: true, force: true });
cpSync(READDY_MOCKS, MOCKS, { recursive: true });

for (const file of walk(VIEWS).concat(walk(join(COMPONENTS, "base")))) {
  const raw = readFileSync(file, "utf8");
  writeFileSync(file, transformSource(raw, file), "utf8");
}

console.log("Ported views + base components from readdy-export");
