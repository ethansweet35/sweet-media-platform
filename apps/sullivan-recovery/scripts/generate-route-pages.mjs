#!/usr/bin/env node
/**
 * Generates thin app router pages from src/views.
 * Run: node scripts/generate-route-pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "../src/app");

/** [appDir, viewImportPath, canonical, title] */
const PAGES = [
  ["programs/detox", "addiction-aftercare-program", "/programs/detox/", "Medical Detox Programs | Sullivan Recovery"],
  ["programs/detox/drugs", "drug-and-alcohol-detox-mission-viejo", "/programs/detox/drugs/", "Drug Detox in Mission Viejo, CA | Sullivan Recovery"],
  ["programs/detox/alcohol", "detox-alcohol-near-me", "/programs/detox/alcohol/", "Alcohol Detox in Mission Viejo, CA | Sullivan Recovery"],
  ["programs/detox/opioids", "opioid-detox-orange-county", "/programs/detox/opioids/", "Opioid Detox in Orange County | Sullivan Recovery"],
  ["programs/detox/fentanyl", "fentanyl-detox-near-me", "/programs/detox/fentanyl/", "Fentanyl Detox Near Me | Sullivan Recovery"],
  ["programs/detox/meth", "meth-detox-mission-viejo", "/programs/detox/meth/", "Meth Detox in Mission Viejo | Sullivan Recovery"],
  ["programs/detox/cocaine", "cocaine-detox-center-california", "/programs/detox/cocaine/", "Cocaine Detox in California | Sullivan Recovery"],
  ["programs/detox/benzodiazepines", "benzo-detox-orange-county", "/programs/detox/benzodiazepines/", "Benzo Detox in Orange County | Sullivan Recovery"],
  ["programs/detox/suboxone", "suboxone-detox-centers-near-me", "/programs/detox/suboxone/", "Suboxone Detox | Sullivan Recovery"],
  ["programs/detox/stimulants", "stimulants-detox", "/programs/detox/stimulants/", "Stimulant Detox | Sullivan Recovery"],
  ["programs/detox/orange-county", "detox-in-orange-county", "/programs/detox/orange-county/", "Detox in Orange County | Sullivan Recovery"],
  ["programs/residential-treatment", "iop-treatment-mission-viejo", "/programs/residential-treatment/", "Residential Treatment | Sullivan Recovery"],
  ["programs/aftercare", "aftercare-programs", "/programs/aftercare/", "Aftercare Programs | Sullivan Recovery"],
  ["programs/wellbriety", "wellbriety-program", "/programs/wellbriety/", "Wellbriety Program | Sullivan Recovery"],
  ["programs/therapies", "addiction-therapies", "/programs/therapies/", "Addiction Therapies | Sullivan Recovery"],
  ["programs/personalized-care", "personalized-care-drugs", "/programs/personalized-care/", "Personalized Care | Sullivan Recovery"],
  ["insurance/aetna", "insurance/aetna", "/insurance/aetna/", "Aetna Rehab Insurance | Sullivan Recovery"],
  ["insurance/anthem", "insurance/anthem", "/insurance/anthem/", "Anthem Blue Cross Rehab Insurance | Sullivan Recovery"],
  ["insurance/cigna", "insurance/cigna", "/insurance/cigna/", "Cigna Rehab Coverage | Sullivan Recovery"],
  ["insurance/beacon", "insurance/beacon", "/insurance/beacon/", "Beacon Health Insurance | Sullivan Recovery"],
  ["insurance/united-healthcare", "insurance/united-healthcare", "/insurance/united-healthcare/", "UnitedHealthcare Rehab Insurance | Sullivan Recovery"],
  ["insurance/humana", "insurance/humana", "/insurance/humana/", "Humana Rehab Insurance | Sullivan Recovery"],
  ["insurance/blue-cross-blue-shield", "insurance/blue-cross-blue-shield", "/insurance/blue-cross-blue-shield/", "Blue Cross Blue Shield Rehab | Sullivan Recovery"],
  ["insurance/tricare", "insurance/tricare", "/insurance/tricare/", "Tricare Rehab Coverage | Sullivan Recovery"],
  ["insurance/kaiser", "insurance/kaiser", "/insurance/kaiser/", "Kaiser Permanente & Rehab Options | Sullivan Recovery"],
  ["insurance/ppo-out-of-network", "insurance/ppo-out-of-network", "/insurance/ppo-out-of-network/", "PPO Out-of-Network Rehab Insurance | Sullivan Recovery"],
];

function pageTemplate(view, canonical, title) {
  const tracked = canonical.replace(/\/$/, "") || "/";
  return `import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/${view}/page";

const fallbackMetadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: "",
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

for (const [appDir, view, canonical, title] of PAGES) {
  const dir = path.join(appRoot, appDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), pageTemplate(view, canonical, title));
  console.log("wrote", appDir);
}
