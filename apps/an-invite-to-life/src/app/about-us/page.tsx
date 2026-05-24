import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AboutUsPage from "@/views/AboutUsPage";

const fallback: Metadata = {
  title: "About Us",
  description: "Meet the An Invite To Life team — over two decades of compassionate intervention experience.",
  alternates: { canonical: "/about-us" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about-us", fallback);
}

export default function Page() {
  return <AboutUsPage />;
}
