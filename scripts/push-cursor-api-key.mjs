#!/usr/bin/env node
/**
 * Push CURSOR_API_KEY to every brand's Vercel project.
 *
 * Idempotent: if the env var already exists on a project, it's updated;
 * otherwise it's created. Targets production + preview environments.
 *
 * Required in repo-root .env:
 *   VERCEL_TOKEN=<your Vercel API token>
 *   VERCEL_TEAM_ID=<optional team id>
 *
 * Usage:
 *   CURSOR_API_KEY=cursor_xxx node scripts/push-cursor-api-key.mjs
 *
 * Or pass --value flag:
 *   node scripts/push-cursor-api-key.mjs --value cursor_xxx
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const VERCEL_API = "https://api.vercel.com";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  readFileSync(filePath, "utf8")
    .split("\n")
    .forEach((line) => {
      const withoutComment = line.replace(/\s+#.*$/, "");
      const trimmed = withoutComment.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eq = trimmed.indexOf("=");
      if (eq < 0) return;
      const k = trimmed.slice(0, eq).trim();
      let v = trimmed.slice(eq + 1);
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (k) out[k] = v;
    });
  return out;
}

const repoEnv = loadEnvFile(join(REPO_ROOT, ".env"));
const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? repoEnv.VERCEL_TOKEN;
const VERCEL_TEAM_ID =
  process.env.VERCEL_TEAM_ID ?? repoEnv.VERCEL_TEAM_ID ?? null;

if (!VERCEL_TOKEN) {
  console.error("❌ VERCEL_TOKEN missing. Set it in .env or as an env var.");
  process.exit(1);
}

const argv = process.argv.slice(2);
const valueIdx = argv.indexOf("--value");
const value =
  process.env.CURSOR_API_KEY ?? (valueIdx >= 0 ? argv[valueIdx + 1] : null);
if (!value || !value.startsWith("crsr_") && !value.startsWith("cursor_")) {
  console.error(
    '❌ CURSOR_API_KEY missing or not in expected format (should start with "crsr_" or "cursor_"). Pass --value <key> or export CURSOR_API_KEY.',
  );
  process.exit(1);
}

async function vercelApi(method, path, body) {
  const url = `${VERCEL_API}${path}${
    VERCEL_TEAM_ID ? (path.includes("?") ? "&" : "?") + `teamId=${VERCEL_TEAM_ID}` : ""
  }`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(
      `Vercel ${method} ${path} failed (${res.status}): ${text.slice(0, 400)}`,
    );
  }
  return json;
}

// Listed using the Vercel MCP earlier; these are the project IDs we control.
// Skip sweet-media-platform if you ever want to gate; for now we push to all.
const PROJECTS = [
  { name: "sweet-media-platform", id: "prj_MXaefUIOMv0xMPetvcgtyIqOWEB6" },
  { name: "inner-peak-colorado-platform", id: "prj_OmEdjHusPL2PK8yqX38vvqSl7Bbn" },
  { name: "addiction-interventions", id: "prj_OYpFeZsFIDT6uLMFMCfEOWcD43Gh" },
  { name: "northbound-treatment", id: "prj_TMhjMu0p154CCy4VRbiYbhosWuqR" },
  { name: "cipher-billing", id: "prj_5oA3n0ONJa8ogbhGT7zvHiO6L5mt" },
  { name: "rize-oc", id: "prj_lJrAPitkuqwX1InW8jhuCB64pvmZ" },
];

const TARGET = ["production", "preview"];
const KEY = "CURSOR_API_KEY";

async function upsert(project) {
  const existingList = await vercelApi(
    "GET",
    `/v9/projects/${project.id}/env?decrypt=false`,
  );
  const existing = (existingList.envs ?? []).find((e) => e.key === KEY);
  if (existing) {
    await vercelApi("PATCH", `/v9/projects/${project.id}/env/${existing.id}`, {
      value,
      target: TARGET,
      type: "encrypted",
    });
    return "updated";
  }
  await vercelApi("POST", `/v10/projects/${project.id}/env?upsert=true`, {
    key: KEY,
    value,
    target: TARGET,
    type: "encrypted",
  });
  return "created";
}

async function main() {
  console.log(`Pushing ${KEY} to ${PROJECTS.length} Vercel projects…`);
  for (const project of PROJECTS) {
    try {
      const action = await upsert(project);
      console.log(`  ✅  ${project.name}: ${action}`);
    } catch (err) {
      console.log(
        `  ❌  ${project.name}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  console.log(
    "\nNext step: trigger a redeploy on any project where the env var is new (Vercel doesn't auto-redeploy on env changes).",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
