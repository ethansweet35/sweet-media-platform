#!/usr/bin/env node
/**
 * Push AI_OPTIMIZE_VERCEL_PROJECT_ID to each brand's Vercel project.
 *
 * The optimize-pr POST route reads this env var to record which Vercel
 * project to query for the PR's preview URL after the agent finishes.
 * Idempotent.
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
  console.error("❌ VERCEL_TOKEN missing.");
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
  if (!res.ok) {
    throw new Error(`Vercel ${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : null;
}

// Each project pushes its own id as the env var value so the route
// handler can pass it through to triggerAiOptimizeRun.
const PROJECTS = [
  { name: "sweet-media-platform", id: "prj_MXaefUIOMv0xMPetvcgtyIqOWEB6" },
  { name: "inner-peak-colorado-platform", id: "prj_OmEdjHusPL2PK8yqX38vvqSl7Bbn" },
  { name: "addiction-interventions", id: "prj_OYpFeZsFIDT6uLMFMCfEOWcD43Gh" },
  { name: "northbound-treatment", id: "prj_TMhjMu0p154CCy4VRbiYbhosWuqR" },
  { name: "cipher-billing", id: "prj_5oA3n0ONJa8ogbhGT7zvHiO6L5mt" },
  { name: "rize-oc", id: "prj_lJrAPitkuqwX1InW8jhuCB64pvmZ" },
];

const TARGET = ["production", "preview"];
const KEY = "AI_OPTIMIZE_VERCEL_PROJECT_ID";

async function upsert(project) {
  const existing = await vercelApi(
    "GET",
    `/v9/projects/${project.id}/env?decrypt=false`,
  );
  const found = (existing.envs ?? []).find((e) => e.key === KEY);
  if (found) {
    await vercelApi("PATCH", `/v9/projects/${project.id}/env/${found.id}`, {
      value: project.id,
      target: TARGET,
      type: "plain",
    });
    return "updated";
  }
  await vercelApi("POST", `/v10/projects/${project.id}/env?upsert=true`, {
    key: KEY,
    value: project.id,
    target: TARGET,
    type: "plain",
  });
  return "created";
}

async function main() {
  console.log(`Pushing ${KEY} (per-project) to ${PROJECTS.length} Vercel projects…`);
  for (const project of PROJECTS) {
    try {
      const action = await upsert(project);
      console.log(`  ✅  ${project.name}: ${action} (value=${project.id})`);
    } catch (err) {
      console.log(
        `  ❌  ${project.name}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  console.log(
    "\nNext step: redeploy each project so the new env var takes effect.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
