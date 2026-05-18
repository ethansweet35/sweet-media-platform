import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DepressionPage from "@/views/what-we-treat/DepressionPage";
const fallback: Metadata = {
  title: "Depression Treatment in Seattle, WA | Mountain View Treatment",
  description: "Outpatient treatment for major depressive disorder and persistent depression in Seattle. CBT, behavioral activation, psychiatric coordination. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/mental-health/depression/" },
};
export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/mental-health/depression/", fallback);
}
export default function Page() { return <DepressionPage />; }
