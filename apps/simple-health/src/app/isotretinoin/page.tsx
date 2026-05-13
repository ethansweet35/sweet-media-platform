import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { IsotretinoinPage } from "@/views/isotretinoin/page";

const fallback: Metadata = {
  title: "Isotretinoin (Accutane®) for Severe Acne | Get Simple Health",
  description:
    "Isotretinoin is the only treatment that addresses all four causes of acne simultaneously — 85% of patients achieve long-lasting clearance. Starting at $99/month.",
  alternates: { canonical: "/isotretinoin" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/isotretinoin", fallback);
}

export default function Page() {
  return <IsotretinoinPage />;
}
