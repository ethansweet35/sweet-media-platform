import { writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";

const app = join(process.cwd(), "apps/an-invite-to-life/src/app");
const routes = [
  { path: "page.tsx", route: "/", view: "HomePage", title: "An Invite To Life | Professional Intervention Services", desc: "Compassionate addiction and mental health intervention services in Orange County. Free confidential consultations available 24/7." },
  { path: "is-it-time/page.tsx", route: "/is-it-time", view: "IsItTimePage", title: "Is It Time for an Intervention?", desc: "Recognize the signs that your loved one may need professional intervention support." },
  { path: "about-us/page.tsx", route: "/about-us", view: "AboutUsPage", title: "About Us", desc: "Meet the An Invite To Life team — over two decades of compassionate intervention experience." },
  { path: "conditions/page.tsx", route: "/conditions", view: "ConditionsPage", title: "Conditions We Treat", desc: "Intervention services for addiction, mental health, and behavioral crises." },
  { path: "services/page.tsx", route: "/services", view: "ServicesPage", title: "Our Services", desc: "Professional intervention, aftercare planning, and family support services." },
  { path: "services/interventions/page.tsx", route: "/services/interventions", view: "InterventionsPage", title: "Intervention Services", desc: "Expert-led intervention services to help families begin the recovery journey." },
  { path: "services/aftercare/page.tsx", route: "/services/aftercare", view: "AftercarePage", title: "Aftercare Planning", desc: "Customized aftercare and family support for sustainable recovery." },
  { path: "services/trauma/page.tsx", route: "/services/trauma", view: "TraumaPage", title: "Trauma-Informed Care", desc: "Trauma-informed intervention approaches for lasting healing." },
  { path: "methods/page.tsx", route: "/methods", view: "MethodsPage", title: "Our Methods", desc: "Evidence-based intervention models tailored to each family." },
  { path: "service-areas/page.tsx", route: "/service-areas", view: "ServiceAreasPage", title: "Service Areas", desc: "Orange County-based intervention services with national and international reach." },
  { path: "service-areas/national/page.tsx", route: "/service-areas/national", view: "NationalPage", title: "National Services", desc: "Nationwide intervention services from our Orange County base." },
  { path: "service-areas/international/page.tsx", route: "/service-areas/international", view: "InternationalPage", title: "International Services", desc: "International intervention and sober transport coordination." },
  { path: "contact/page.tsx", route: "/contact", view: "ContactUsPage", title: "Contact Us", desc: "Reach An Invite To Life 24/7 for a free confidential consultation." },
];

for (const r of routes) {
  mkdirSync(join(app, r.path.replace(/page.tsx$/, "")), { recursive: true });
  writeFileSync(
    join(app, r.path),
    `import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ${r.view} from "@/views/${r.view}";

const fallback: Metadata = {
  title: ${JSON.stringify(r.title)},
  description: ${JSON.stringify(r.desc)},
  alternates: { canonical: ${JSON.stringify(r.route)} },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(${JSON.stringify(r.route)}, fallback);
}

export default function Page() {
  return <${r.view} />;
}
`
  );
}

for (const old of ["about", "admissions", "resources"]) {
  rmSync(join(app, old), { recursive: true, force: true });
}

console.log("pages created");
