import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/personalized-care/page";

const fallbackMetadata: Metadata = {
  title: "Personalized & Dual Diagnosis Care | Sullivan Recovery",
  description:
    "Integrated treatment when substance use and mental health intersect — individualized plans with physician-led detox and residential care.",
  alternates: { canonical: "/programs/personalized-care/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/personalized-care/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
