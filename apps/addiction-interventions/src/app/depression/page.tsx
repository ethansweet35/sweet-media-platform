import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DepressionPage from "@/views/depression/page";

const fallbackMetadata: Metadata = {
  title: "Depression Interventions for Families | Addiction Interventions",
  description:
    "Depression doesn't always look like sadness. When your loved one is shutting down, withdrawing, or hinting that life isn't worth living, our family-centred interventions give you a clear, urgent plan.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/depression", fallbackMetadata);
}

export default function Page() {
  return <DepressionPage />;
}
