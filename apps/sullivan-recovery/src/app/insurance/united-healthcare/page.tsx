import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/united-healthcare/page";

const fallbackMetadata: Metadata = {
  title: "UnitedHealthcare Rehab Insurance | Sullivan Recovery",
  description: "Verify UnitedHealthcare and Optum benefits for detox and residential treatment at Sullivan Recovery in Mission Viejo.",
  alternates: { canonical: "/insurance/united-healthcare/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/united-healthcare/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
