import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OpioidsPage from "@/views/what-we-treat/OpioidsPage";

const fallback: Metadata = {
  title: "Opioid Addiction Treatment in Seattle, WA | Mountain View Treatment",
  description: "Evidence-based opioid use disorder treatment in Seattle. Buprenorphine (Suboxone) and naltrexone (Vivitrol) MAT available alongside CBT and trauma-informed care. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/addiction/opioids/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/addiction/opioids/", fallback);
}

export default function Page() {
  return <OpioidsPage />;
}
