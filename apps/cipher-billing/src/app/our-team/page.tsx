import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurTeamPage from "@/views/our-team/page";

const fallbackMetadata: Metadata = {
  title: "Our Expert Team | Cipher Billing | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-team", fallbackMetadata);
}

export default function Page() {
  return <OurTeamPage />;
}
