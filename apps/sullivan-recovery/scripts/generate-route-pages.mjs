#!/usr/bin/env node
/**
 * Regenerates thin app router pages from src/views (native program + insurance views).
 * Run from apps/sullivan-recovery: node scripts/generate-route-pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "../src/app");

/** [appDir, viewImportPath, canonical, title, description?] */
const PAGES = [
  [
    "programs/detox",
    "programs/detox",
    "/programs/detox/",
    "Medical Detox Programs | Sullivan Recovery",
    "Physician-led drug and alcohol detox in Mission Viejo with same-day intake when appropriate.",
  ],
  [
    "programs/detox/drugs",
    "programs/detox/drugs",
    "/programs/detox/drugs/",
    "Drug Detox in Mission Viejo, CA | Sullivan Recovery",
    "Medical drug detox with nursing oversight and individualized treatment in Orange County.",
  ],
  [
    "programs/detox/alcohol",
    "programs/detox/alcohol",
    "/programs/detox/alcohol/",
    "Alcohol Detox in Mission Viejo, CA | Sullivan Recovery",
    "Safe alcohol detox with medical monitoring and support in Mission Viejo.",
  ],
  [
    "programs/detox/opioids",
    "programs/detox/opioids",
    "/programs/detox/opioids/",
    "Opioid Detox in Orange County | Sullivan Recovery",
    "Opioid detox with medication-assisted treatment and 24/7 clinical care.",
  ],
  [
    "programs/detox/fentanyl",
    "programs/detox/fentanyl",
    "/programs/detox/fentanyl/",
    "Fentanyl Detox in Orange County | Sullivan Recovery",
    "Physician-led fentanyl detox with close nursing oversight in Mission Viejo.",
  ],
  [
    "programs/detox/meth",
    "programs/detox/meth",
    "/programs/detox/meth/",
    "Meth Detox in Mission Viejo | Sullivan Recovery",
    "Methamphetamine detox with medical stabilization and compassionate support.",
  ],
  [
    "programs/detox/cocaine",
    "programs/detox/cocaine",
    "/programs/detox/cocaine/",
    "Cocaine Detox in California | Sullivan Recovery",
    "Cocaine detox and withdrawal management in a residential detox setting.",
  ],
  [
    "programs/detox/benzodiazepines",
    "programs/detox/benzodiazepines",
    "/programs/detox/benzodiazepines/",
    "Benzo Detox in Orange County | Sullivan Recovery",
    "Medically supervised benzodiazepine detox with tapering protocols.",
  ],
  [
    "programs/detox/suboxone",
    "programs/detox/suboxone",
    "/programs/detox/suboxone/",
    "Suboxone Detox | Sullivan Recovery",
    "Suboxone-supported opioid detox and transition planning in Mission Viejo.",
  ],
  [
    "programs/detox/stimulants",
    "programs/detox/stimulants",
    "/programs/detox/stimulants/",
    "Stimulant Detox | Sullivan Recovery",
    "Stimulant detox with medical monitoring and therapeutic support.",
  ],
  [
    "programs/detox/orange-county",
    "programs/detox/orange-county",
    "/programs/detox/orange-county/",
    "Detox in Orange County | Sullivan Recovery",
    "Orange County medical detox serving Mission Viejo and surrounding communities.",
  ],
  [
    "programs/residential-treatment",
    "programs/residential-treatment",
    "/programs/residential-treatment/",
    "Residential Treatment | Sullivan Recovery",
    "Residential addiction treatment following medical detox at Sullivan Recovery.",
  ],
  [
    "programs/aftercare",
    "programs/aftercare",
    "/programs/aftercare/",
    "Aftercare Programs | Sullivan Recovery",
    "Aftercare planning and continued recovery support after treatment.",
  ],
  [
    "programs/wellbriety",
    "programs/wellbriety",
    "/programs/wellbriety/",
    "Wellbriety Program | Sullivan Recovery",
    "Culturally grounded Wellbriety programming integrated with clinical care.",
  ],
  [
    "programs/therapies",
    "programs/therapies",
    "/programs/therapies/",
    "Addiction Therapies | Sullivan Recovery",
    "Evidence-based addiction therapies during detox and residential treatment.",
  ],
  [
    "programs/personalized-care",
    "programs/personalized-care",
    "/programs/personalized-care/",
    "Personalized Care | Sullivan Recovery",
    "Individualized treatment plans tailored to your substance use and health history.",
  ],
  ["insurance/aetna", "insurance/aetna", "/insurance/aetna/", "Aetna Rehab Insurance | Sullivan Recovery"],
  [
    "insurance/anthem",
    "insurance/anthem",
    "/insurance/anthem/",
    "Anthem Blue Cross Rehab Insurance | Sullivan Recovery",
  ],
  ["insurance/cigna", "insurance/cigna", "/insurance/cigna/", "Cigna Rehab Coverage | Sullivan Recovery"],
  [
    "insurance/beacon",
    "insurance/beacon",
    "/insurance/beacon/",
    "Beacon Health Insurance | Sullivan Recovery",
  ],
  [
    "insurance/united-healthcare",
    "insurance/united-healthcare",
    "/insurance/united-healthcare/",
    "UnitedHealthcare Rehab Insurance | Sullivan Recovery",
  ],
  ["insurance/humana", "insurance/humana", "/insurance/humana/", "Humana Rehab Insurance | Sullivan Recovery"],
  [
    "insurance/blue-cross-blue-shield",
    "insurance/blue-cross-blue-shield",
    "/insurance/blue-cross-blue-shield/",
    "Blue Cross Blue Shield Rehab | Sullivan Recovery",
  ],
  ["insurance/tricare", "insurance/tricare", "/insurance/tricare/", "Tricare Rehab Coverage | Sullivan Recovery"],
  [
    "insurance/kaiser",
    "insurance/kaiser",
    "/insurance/kaiser/",
    "Kaiser Permanente & Rehab Options | Sullivan Recovery",
  ],
  [
    "insurance/ppo-out-of-network",
    "insurance/ppo-out-of-network",
    "/insurance/ppo-out-of-network/",
    "PPO Out-of-Network Rehab Insurance | Sullivan Recovery",
  ],
];

function pageTemplate(view, canonical, title, description) {
  const tracked = canonical.replace(/\/$/, "") || "/";
  const desc = description
    ? `\n  description: ${JSON.stringify(description)},`
    : "";
  return `import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/${view}/page";

const fallbackMetadata: Metadata = {
  title: ${JSON.stringify(title)},${desc}
  alternates: { canonical: ${JSON.stringify(canonical)} },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(${JSON.stringify(tracked)}, fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
`;
}

for (const [appDir, view, canonical, title, description] of PAGES) {
  const dir = path.join(appRoot, appDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), pageTemplate(view, canonical, title, description));
  console.log("wrote", appDir);
}
