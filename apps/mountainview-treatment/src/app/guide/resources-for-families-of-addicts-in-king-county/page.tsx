import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FamiliesGuidePage from "@/views/guide/FamiliesGuidePage";

const fallback: Metadata = {
  title: "Resources for Families of Addicts in King County | Mountain View Treatment",
  description:
    "Support groups, intervention guidance, treatment resources, healthy boundary-setting, and self-care for families navigating a loved one's addiction in King County and Seattle.",
  alternates: { canonical: "/guide/resources-for-families-of-addicts-in-king-county/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/resources-for-families-of-addicts-in-king-county/",
    fallback,
  );
}

export default function Page() {
  return <FamiliesGuidePage />;
}
