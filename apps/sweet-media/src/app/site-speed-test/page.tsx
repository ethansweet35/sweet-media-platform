import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SiteSpeedTestPage from "@/views/site-speed-test/page";

const fallbackMetadata: Metadata = {
  title: "Free Website Speed Test | PageSpeed Insights Tool | Sweet Media",
  description:
    "Test your treatment center or healthcare website speed with Google PageSpeed Insights. Get performance scores, Core Web Vitals, and actionable fixes you can implement today.",
  alternates: { canonical: "/site-speed-test" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/site-speed-test", fallbackMetadata);
}

export default function Page() {
  return <SiteSpeedTestPage />;
}
