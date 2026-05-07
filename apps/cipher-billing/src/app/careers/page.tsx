import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CareersPage from "@/views/careers/page";

const fallbackMetadata: Metadata = {
  title: "Careers at Cipher Billing | Find Open Positions | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/careers", fallbackMetadata);
}

export default function Page() {
  return <CareersPage />;
}
