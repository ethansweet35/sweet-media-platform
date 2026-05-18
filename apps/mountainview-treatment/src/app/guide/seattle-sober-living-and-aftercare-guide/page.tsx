import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AftercarePage from "@/views/guide/AftercarePage";

const fallback: Metadata = {
  title: "Seattle Sober Living and Aftercare Guide | Mountain View Treatment",
  description:
    "Sober living homes, step-down programming, peer support networks, and recovery resources in King County and Seattle for life after residential treatment.",
  alternates: { canonical: "/guide/seattle-sober-living-and-aftercare-guide/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/guide/seattle-sober-living-and-aftercare-guide/", fallback);
}

export default function Page() {
  return <AftercarePage />;
}
