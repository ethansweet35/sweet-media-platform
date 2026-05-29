import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AboutPage from "@/components/about/AboutPage";

const fallback: Metadata = {
  title: "About Us | Missouri Behavioral Health",
  description:
    "Learn about Missouri Behavioral Health — outpatient addiction and mental health treatment in Springfield, MO. Meet our full clinical and leadership team, mission, and approach.",
  alternates: { canonical: "/about" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about", fallback);
}

export default function Page() {
  return <AboutPage />;
}
