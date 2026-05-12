import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomePage from "@/views/home/page";

const fallbackMetadata: Metadata = {
  title: "Rize OC | Mental Health & Addiction Treatment in Orange County",
  description:
    "Evidence-based mental health and addiction treatment in Orange County, CA. Same-day admissions, virtual options, and compassionate care tailored to you.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return <HomePage />;
}
