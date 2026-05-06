import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IndustriesPage from "@/pages/industries/page";

const fallbackMetadata: Metadata = {
  title: "Industries We Serve | Behavioral Health Marketing | Sweet Media",
  description:
    "Sweet Media serves detox, residential, IOP, PHP, and mental health treatment programs. Specialized marketing for every level of behavioral health care.",
  alternates: { canonical: "/industries" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/industries", fallbackMetadata);
}

export default function Page() {
  return <IndustriesPage />;
}
