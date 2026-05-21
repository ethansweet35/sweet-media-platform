#!/usr/bin/env node
/**
 * One-shot migration: replace legacy neutral/stone/teal-shadow classes in admin-core
 * with Sweet Media navy/periwinkle token equivalents.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "packages", "admin-core", "src");

const REPLACEMENTS = [
  // Teal shadows → navy
  [/rgba\(61,\s*111,\s*127,\s*0\.22\)/g, "rgba(10,31,68,0.18)"],
  [/rgba\(61,\s*111,\s*127,\s*0\.2\)/g, "rgba(10,31,68,0.18)"],
  [/rgba\(61,\s*111,\s*127,\s*0\.15\)/g, "rgba(10,31,68,0.15)"],

  // Borders & dividers
  [/border-neutral-100/g, "border-[#E2E8F0]"],
  [/border-neutral-200/g, "border-[#E2E8F0]"],
  [/border-neutral-300/g, "border-[#CBD5E1]"],
  [/divide-neutral-100/g, "divide-[#E2E8F0]"],
  [/divide-neutral-200/g, "divide-[#E2E8F0]"],
  [/border-stone-100/g, "border-[#E2E8F0]"],
  [/border-stone-200/g, "border-[#E2E8F0]"],
  [/border-stone-300/g, "border-[#CBD5E1]"],

  // Backgrounds
  [/bg-neutral-50/g, "bg-[#F4F7FB]"],
  [/bg-neutral-100/g, "bg-[#F4F7FB]"],
  [/bg-neutral-200/g, "bg-[#E2E8F0]"],
  [/bg-stone-50/g, "bg-[#F4F7FB]"],
  [/bg-stone-100/g, "bg-[#F4F7FB]"],
  [/bg-stone-200/g, "bg-[#E2E8F0]"],

  // Text
  [/text-neutral-900/g, "text-[#0A1F44]"],
  [/text-neutral-800/g, "text-[#0A1F44]"],
  [/text-neutral-700/g, "text-[#334155]"],
  [/text-neutral-600/g, "text-[#64748B]"],
  [/text-neutral-500/g, "text-[#64748B]"],
  [/text-neutral-400/g, "text-[#94A3B8]"],
  [/text-neutral-300/g, "text-[#CBD5E1]"],
  [/text-neutral-200/g, "text-[#E2E8F0]"],
  [/text-stone-900/g, "text-[#0A1F44]"],
  [/text-stone-800/g, "text-[#0A1F44]"],
  [/text-stone-700/g, "text-[#334155]"],
  [/text-stone-600/g, "text-[#64748B]"],
  [/text-stone-500/g, "text-[#64748B]"],
  [/text-stone-400/g, "text-[#94A3B8]"],
  [/text-stone-300/g, "text-[#CBD5E1]"],

  // Placeholders
  [/placeholder:text-neutral-300/g, "placeholder:text-[#94A3B8]"],
  [/placeholder-neutral-400/g, "placeholder-[#94A3B8]"],
  [/placeholder:text-neutral-400/g, "placeholder:text-[#94A3B8]"],
  [/placeholder-stone-400/g, "placeholder-[#94A3B8]"],

  // Hover states
  [/hover:bg-neutral-50/g, "hover:bg-[#F4F7FB]"],
  [/hover:bg-neutral-100/g, "hover:bg-[#F4F7FB]"],
  [/hover:bg-stone-50/g, "hover:bg-[#F4F7FB]"],
  [/hover:bg-stone-100/g, "hover:bg-[#F4F7FB]"],
  [/hover:border-neutral-200/g, "hover:border-[#E2E8F0]"],
  [/hover:border-neutral-300/g, "hover:border-[#CBD5E1]"],
  [/hover:border-stone-200/g, "hover:border-[#E2E8F0]"],
  [/hover:text-neutral-600/g, "hover:text-[#64748B]"],
  [/hover:text-neutral-700/g, "hover:text-[#0A1F44]"],
  [/hover:text-neutral-800/g, "hover:text-[#0A1F44]"],
  [/hover:text-stone-700/g, "hover:text-[#334155]"],

  // Remaining neutral/stone variants
  [/hover:bg-neutral-300/g, "hover:bg-[#CBD5E1]"],
  [/bg-neutral-300/g, "bg-[#CBD5E1]"],
  [/bg-neutral-400/g, "bg-[#94A3B8]"],
  [/bg-neutral-800/g, "bg-[#0d2a5e]"],
  [/bg-neutral-900/g, "bg-[#0A1F44]"],
  [/text-neutral-100/g, "text-[#F4F7FB]"],
  [/border-neutral-50/g, "border-[#F4F7FB]"],
  [/divide-neutral-50/g, "divide-[#F4F7FB]"],
  [/hover:border-neutral-400/g, "hover:border-[#7B9FD4]"],
  [/bg-stone-900/g, "bg-[#0A1F44]"],
  [/bg-stone-800/g, "bg-[#0d2a5e]"],
  [/border-t-stone-900/g, "border-t-[#0A1F44]"],
  [/border-t-stone-700/g, "border-t-[#0A1F44]"],
  [/placeholder-neutral-300/g, "placeholder-[#94A3B8]"],

  // Focus rings (old stone/navy → periwinkle)
  [/focus:ring-stone-900/g, "focus:ring-[#7B9FD4]/35"],
  [/focus:ring-neutral-900/g, "focus:ring-[#7B9FD4]/35"],
  [/focus:border-\[#0A1F44\]/g, "focus:border-[#7B9FD4]"],
  [/focus:border-neutral-400/g, "focus:border-[#7B9FD4]"],

  // Ring colors
  [/ring-neutral-100/g, "ring-[#E2E8F0]"],
  [/ring-neutral-200/g, "ring-[#E2E8F0]"],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(tsx?|css)$/.test(name)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let src = fs.readFileSync(file, "utf8");
  const original = src;
  for (const [pattern, replacement] of REPLACEMENTS) {
    src = src.replace(pattern, replacement);
  }
  if (src !== original) {
    fs.writeFileSync(file, src);
    changed++;
    console.log("updated:", path.relative(ROOT, file));
  }
}

console.log(`\nDone. ${changed} file(s) updated.`);
