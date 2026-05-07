import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomePage from "@/views/home/page";

const fallbackMetadata: Metadata = {
  title: "Cipher Billing | Behavioral Health Billing Services | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return <HomePage />;
}
