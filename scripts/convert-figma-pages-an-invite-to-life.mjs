#!/usr/bin/env node
/**
 * One-time converter: Figma Make export → an-invite-to-life Next.js views.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const FIGMA = "/Users/ethansweet/Downloads/Rise Above Intervention (1)/src/app/pages";
const OUT = join(REPO, "apps/an-invite-to-life/src/views");

const PAGES = [
  { src: "Home.tsx", out: "HomePage.tsx" },
  { src: "IsItTime.tsx", out: "IsItTimePage.tsx" },
  { src: "AboutUs.tsx", out: "AboutUsPage.tsx" },
  { src: "Conditions.tsx", out: "ConditionsPage.tsx" },
  { src: "Services.tsx", out: "ServicesPage.tsx" },
  { src: "services/Interventions.tsx", out: "InterventionsPage.tsx" },
  { src: "services/Aftercare.tsx", out: "AftercarePage.tsx" },
  { src: "services/Trauma.tsx", out: "TraumaPage.tsx" },
  { src: "Methods.tsx", out: "MethodsPage.tsx" },
  { src: "ServiceAreas.tsx", out: "ServiceAreasPage.tsx" },
  { src: "service-areas/National.tsx", out: "NationalPage.tsx" },
  { src: "service-areas/International.tsx", out: "InternationalPage.tsx" },
  { src: "ContactUs.tsx", out: "ContactUsPage.tsx" },
  { src: "NotFound.tsx", out: "NotFoundPage.tsx" },
];

function convert(raw, componentName) {
  let s = raw;

  // figma asset imports → public paths
  s = s.replace(
    /import image_(\w+) from 'figma:asset\/(\w+\.png)'/g,
    "const image_$1 = '/images/$2'"
  );

  // react-router → next
  s = s.replace(/import \{ Link \} from 'react-router';?\n?/g, "import Link from 'next/link';\n");
  s = s.replace(/import \{ useState[^}]*\} from 'react';?\n?/g, (m) => m);
  s = s.replace(/\bto="/g, 'href="');
  s = s.replace(/\bto=\{/g, "href={");

  // Remove layout import/wrapper
  s = s.replace(/import Layout from '\.\.\/components\/Layout';?\n?/g, "");
  s = s.replace(/import Layout from '\.\.\/\.\.\/components\/Layout';?\n?/g, "");
  s = s.replace(/<Layout>\s*/g, "");
  s = s.replace(/\s*<\/Layout>\s*$/g, "\n");

  // lucide → remix (ContactUs)
  s = s.replace(/import \{ Phone, Mail, Clock, Shield, MapPin \} from 'lucide-react';\n?/g, "");
  s = s.replace(/<Phone([^/>]*)\/>/g, '<i className="ri-phone-line$1"></i>');
  s = s.replace(/<Mail([^/>]*)\/>/g, '<i className="ri-mail-line$1"></i>');
  s = s.replace(/<Clock([^/>]*)\/>/g, '<i className="ri-time-line$1"></i>');
  s = s.replace(/<Shield([^/>]*)\/>/g, '<i className="ri-shield-check-line$1"></i>');
  s = s.replace(/<MapPin([^/>]*)\/>/g, '<i className="ri-map-pin-2-line$1"></i>');

  // Brand updates
  s = s.replace(/aninvitetolife@gmail\.com/g, "jenat10@yahoo.com");

  // NC → Orange County in footer-style lists (Layout handled separately)
  s = s.replace(/Charlotte, NC/g, "Orange County, CA");
  s = s.replace(/Raleigh, NC/g, "Irvine");
  s = s.replace(/Winston-Salem, NC/g, "Newport Beach");
  s = s.replace(/High Point, NC/g, "Costa Mesa");

  const needsClient =
    s.includes("useState") ||
    s.includes("FormEvent") ||
    s.includes("handleSubmit") ||
    s.includes("toggleFaq");

  const header = needsClient ? "'use client';\n\n" : "";

  s = s.replace(/export default function \w+\(\)/, `export default function ${componentName}()`);

  if (needsClient && !s.startsWith("'use client'")) {
    s = header + s;
  }

  return s.trim() + "\n";
}

mkdirSync(OUT, { recursive: true });

for (const { src, out } of PAGES) {
  const srcPath = join(FIGMA, src);
  if (!existsSync(srcPath)) {
    console.error("Missing:", srcPath);
    process.exit(1);
  }
  const componentName = out.replace(/Page\.tsx$/, "Page");
  const converted = convert(readFileSync(srcPath, "utf8"), componentName);
  writeFileSync(join(OUT, out), converted);
  console.log("Wrote", out);
}

console.log("Done.");
