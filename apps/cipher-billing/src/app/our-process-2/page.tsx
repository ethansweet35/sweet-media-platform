import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurProcess2Page from "@/views/our-process-2/page";

const fallbackMetadata: Metadata = {
  title: "Our Process | Cipher Billing",
  description:
    "Our proven behavioral health billing process: onboarding, partnership, and measurable results—with the stats to back it up.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-process-2", fallbackMetadata);
}

export default function Page() {
  return <OurProcess2Page />;
}
