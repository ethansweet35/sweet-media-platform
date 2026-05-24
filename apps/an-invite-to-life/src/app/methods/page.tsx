import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MethodsPage from "@/views/MethodsPage";

const fallback: Metadata = {
  title: "Our Methods",
  description: "Evidence-based intervention models tailored to each family.",
  alternates: { canonical: "/methods" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/methods", fallback);
}

export default function Page() {
  return <MethodsPage />;
}
