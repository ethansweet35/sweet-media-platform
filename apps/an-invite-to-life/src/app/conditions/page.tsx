import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ConditionsPage from "@/views/ConditionsPage";

const fallback: Metadata = {
  title: "Conditions We Treat",
  description: "Intervention services for addiction, mental health, and behavioral crises.",
  alternates: { canonical: "/conditions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/conditions", fallback);
}

export default function Page() {
  return <ConditionsPage />;
}
