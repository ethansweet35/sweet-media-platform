import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IsItTimePage from "@/views/IsItTimePage";

const fallback: Metadata = {
  title: "Is It Time for an Intervention?",
  description: "Recognize the signs that your loved one may need professional intervention support.",
  alternates: { canonical: "/is-it-time" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/is-it-time", fallback);
}

export default function Page() {
  return <IsItTimePage />;
}
