/**
 * Post-build: sync static App Router URLs into tracked_pages (idempotent).
 * Logic lives in @sweetmedia/admin-core — this file is a thin entry-point
 * invoked by the postbuild script via: tsx scripts/sync-tracked-pages.ts
 */
import { syncTrackedPages } from "@sweetmedia/admin-core/server";

syncTrackedPages(process.cwd()).catch((e) => {
  console.warn("[sync-tracked-pages] Unexpected error (non-fatal):", e);
  process.exitCode = 0;
});
