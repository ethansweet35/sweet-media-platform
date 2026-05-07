import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FaqPage from "@/views/faq/page";

const fallbackMetadata: Metadata = {
  title: "FAQ | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/faq", fallbackMetadata);
}

export default function Page() {
  return <FaqPage />;
}
