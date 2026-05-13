import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomePage from "@/views/home/HomePage";

const fallbackMetadata: Metadata = {
  title: "Simple Health | Accessible and Affordable Telehealth",
  description:
    "Physician-guided telehealth for weight loss, peptides, hair restoration, mental health, and longevity care — delivered to your door.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return <HomePage />;
}
