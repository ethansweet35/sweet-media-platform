import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AftercarePage from "@/views/AftercarePage";

const fallback: Metadata = {
  title: "Aftercare Planning",
  description: "Customized aftercare and family support for sustainable recovery.",
  alternates: { canonical: "/services/aftercare" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services/aftercare", fallback);
}

export default function Page() {
  return <AftercarePage />;
}
