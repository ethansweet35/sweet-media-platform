import type { Metadata } from "next";
import Link from "next/link";
import { EditableText, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SiteHeader from "@/components/feature/SiteHeader";
import Footer from "@/components/pages/home/components/Footer";

const ROUTE = "/case-studies";

const fallbackMetadata: Metadata = {
  title: "Case Studies | Behavioral Health Marketing Results | Sweet Media",
  description:
    "See how Sweet Media helps treatment centers grow with SEO, paid media, and web development. Case studies from California Prime Recovery, Rize OC, and more.",
  alternates: { canonical: ROUTE },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(ROUTE, fallbackMetadata);
}

export const revalidate = 15;

const STUDIES = [
  {
    fieldKey: "studies.0.label",
    href: "/case-studies/california-prime-recovery",
    defaultLabel: "California Prime Recovery",
  },
  {
    fieldKey: "studies.1.label",
    href: "/case-studies/rize-oc",
    defaultLabel: "Rize OC",
  },
] as const;

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Strategy Call" ctaHref="/contact" heroTheme="light" />
      <main className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.title"
            defaultValue="Case Studies"
            as="h1"
            className="mb-3 text-4xl font-bold text-black"
          />
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.intro"
            defaultValue="Explore results from behavioral health brands we've partnered with."
            as="p"
            className="mb-10 max-w-2xl text-lg text-[#4B4B4B]"
          />
          <div className="space-y-3">
            {STUDIES.map((study) => (
              <Link
                key={study.href}
                className="block text-lg font-semibold text-[#0A1F44] hover:underline"
                href={study.href}
              >
                <EditableText
                  routePath={ROUTE}
                  fieldKey={study.fieldKey}
                  defaultValue={study.defaultLabel}
                  as="span"
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
