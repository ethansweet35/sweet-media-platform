import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BehavioralHealthCodingGuidePage from "@/views/behavioral-health-coding-guide/page";

const fallbackMetadata: Metadata = {
  title: "Behavioral Health Coding Guide | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/behavioral-health-coding-guide", fallbackMetadata);
}

export default function Page() {
  return <BehavioralHealthCodingGuidePage />;
}
