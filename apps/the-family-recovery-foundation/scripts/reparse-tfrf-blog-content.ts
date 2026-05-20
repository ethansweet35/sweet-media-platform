#!/usr/bin/env npx tsx
/**
 * Converts blog_posts.content from raw markdown → JSON BlogSection[] in Supabase.
 * Re-normalizes existing JSON to fix embedded #### headings in list items.
 *
 * Usage:
 *   pnpm --filter @sweetmedia/the-family-recovery-foundation reparse:blogs
 *   pnpm --filter @sweetmedia/the-family-recovery-foundation reparse:blogs -- --dry-run
 */
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
  looksLikeMarkdown,
  markdownToSections,
  normalizeSections,
} from "@sweetmedia/blog-core";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dryRun = process.argv.includes("--dry-run");

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".upload.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!supabaseUrl || !serviceKey) {
    console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { data: rows, error } = await supabase.from("blog_posts").select("id, slug, title, content");

  if (error) throw error;
  if (!rows?.length) {
    console.log("No blog posts found.");
    return;
  }

  let updated = 0;
  for (const row of rows) {
    const raw = String(row.content ?? "").trim();
    if (!raw) continue;

    let sections;
    let fromMarkdown = false;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        if (
          parsed.every((s: { type?: string }) => s.type === "paragraph") &&
          looksLikeMarkdown(raw)
        ) {
          sections = markdownToSections(raw);
          fromMarkdown = true;
        } else {
          sections = normalizeSections(parsed);
        }
      } else {
        sections = markdownToSections(raw);
        fromMarkdown = true;
      }
    } catch {
      sections = markdownToSections(raw);
      fromMarkdown = true;
    }

    if (sections.length === 0) {
      console.warn(`  warn ${row.slug}: no sections parsed`);
      continue;
    }

    const json = JSON.stringify(sections);
    if (json === raw) {
      console.log(`  skip ${row.slug} (unchanged)`);
      continue;
    }

    if (!dryRun) {
      const { error: upErr } = await supabase
        .from("blog_posts")
        .update({ content: json })
        .eq("id", row.id);
      if (upErr) throw upErr;
    }

    const images = sections.filter((s) => s.type === "image").length;
    const h3 = sections.filter((s) => s.type === "h3").length;
    console.log(
      `✓ ${row.slug} → ${sections.length} blocks (${images} images, ${h3} h3)${fromMarkdown ? " [markdown]" : " [normalized]"}`,
    );
    updated++;
  }

  console.log(`\nDone — ${updated} posts ${dryRun ? "would be " : ""}updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
