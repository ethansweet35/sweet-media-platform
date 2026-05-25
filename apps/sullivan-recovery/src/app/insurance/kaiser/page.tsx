import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/kaiser/page";

const fallbackMetadata: Metadata = {
  title: "Kaiser Permanente & Rehab Options | Sullivan Recovery",
  description: "Kaiser member benefits review — out-of-network, supplemental, and private pay options explained.",
  alternates: { canonical: "/insurance/kaiser/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/kaiser/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
