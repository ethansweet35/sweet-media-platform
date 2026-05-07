import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ResourcesHubPage from "@/views/resources/page";

const fallbackMetadata: Metadata = {
  title: "Resources | Cipher Billing",
  description:
    "Behavioral health billing resources: blog, FAQ, coding guide, and state reimbursement intelligence from Cipher Billing.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/resources", fallbackMetadata);
}

export default function Page() {
  return <ResourcesHubPage />;
}
