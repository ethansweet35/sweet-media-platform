import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurProcessPage from "@/views/our-process/page";

const fallbackMetadata: Metadata = {
  title: "Our Process | Cipher Billing | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-process", fallbackMetadata);
}

export default function Page() {
  return <OurProcessPage />;
}
