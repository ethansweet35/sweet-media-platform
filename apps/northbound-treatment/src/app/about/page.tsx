import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AboutPage from "@/views/about/AboutPage";

const fallback: Metadata = {
  title: "About Northbound Treatment | Drug & Alcohol Rehab Since 1988",
  description:
    "Learn about Northbound Treatment — a leading addiction treatment center in Southern California since 1988. Our story, mission, philosophy, and the team committed to your lasting recovery.",
  alternates: { canonical: "/about" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about", fallback);
}

export default function Page() {
  return <AboutPage />;
}
