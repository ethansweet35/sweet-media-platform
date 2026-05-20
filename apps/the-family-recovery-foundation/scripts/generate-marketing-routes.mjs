#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP_DIR = join(APP, "src/app");

const routes = [
  { path: "", view: "@/views/home/page", title: "Home", desc: "Standing with families impacted by addiction through prevention, education, and support." },
  { path: "about", view: "@/views/about/page", title: "About", desc: "Learn about The Family Recovery Foundation mission, team, and board." },
  { path: "about-the-family-recovery-foundation", view: "@/views/about/page", title: "About the Foundation", desc: "Our story, mission, and commitment to families in recovery." },
  { path: "about/testimonials", view: "@/views/testimonials/page", title: "Testimonials", desc: "Stories from families who found hope and support through TFRF." },
  { path: "partnerships", view: "@/views/partnerships/page", title: "Partnerships", desc: "Partners and resources supporting family recovery." },
  { path: "2025-survey-results", view: "@/views/impact-report/page", title: "2025 Survey Results", desc: "Impact report and survey insights from The Family Recovery Foundation." },
  { path: "family-programming", view: "@/views/family-programming/page", title: "Family Programming", desc: "Family modules, worksheets, and programming for lasting recovery." },
  { path: "gala", view: "@/views/events/page", title: "Annual Gala", desc: "Join The Family Recovery Foundation annual gala and fundraising events." },
  { path: "gala/nashville", view: "@/views/events/nashville/page", title: "Nashville Gala", desc: "Nashville gala event details, sponsorships, and registration." },
  { path: "events-1", view: "@/views/events/page", title: "Events", desc: "Upcoming events from The Family Recovery Foundation." },
  { path: "donate", view: "@/views/donate/page", title: "Donate", desc: "Support The Family Recovery Foundation with a tax-deductible donation." },
  { path: "contact", view: "@/views/contact/page", title: "Contact", desc: "Contact The Family Recovery Foundation — we answer every call." },
  { path: "contact-menu", view: "@/views/contact/page", title: "Contact", desc: "Get in touch with The Family Recovery Foundation." },
  { path: "3-pillars", stub: true, title: "Our Three Pillars", desc: "Prevention, education, and support — the foundation of generational change." },
  { path: "prevention", stub: true, title: "Prevention", desc: "Prevention modules for families and communities." },
  { path: "education", stub: true, title: "Education", desc: "Intensive family programming and grief support resources." },
  { path: "financial-aid", stub: true, title: "Financial Aid", desc: "Financial assistance to help families access treatment and intervention." },
  { path: "resources", stub: true, title: "Resources", desc: "Information, services, and partnerships for recovery." },
  { path: "get-help", stub: true, title: "Get Help", desc: "Find support when you or a loved one is impacted by addiction." },
  { path: "get-involved", stub: true, title: "Get Involved", desc: "Volunteer, partner, and advance awareness for family recovery." },
];

function pageTemplate({ path, view, title, desc, stub }) {
  const canonical = path ? `/${path}` : "/";
  const importLine = stub
    ? `import MarketingStubPage from "@/views/marketing/MarketingStubPage";`
    : `import PageView from "${view}";`;
  const component = stub
    ? `<MarketingStubPage title=${JSON.stringify(title)} description=${JSON.stringify(desc)} relatedLinks={[{ label: "Contact us", href: "/contact" }, { label: "Donate", href: "/donate" }]} />`
    : `<PageView />`;

  return `import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
${importLine}

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata(
    ${JSON.stringify(canonical)},
    ${JSON.stringify(title)},
    ${JSON.stringify(desc)},
  );
}

export default function Page() {
  return ${component};
}
`;
}

for (const route of routes) {
  const dir = route.path ? join(APP_DIR, route.path) : APP_DIR;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "page.tsx"), pageTemplate(route), "utf8");
}

console.log(`Generated ${routes.length} marketing routes`);
