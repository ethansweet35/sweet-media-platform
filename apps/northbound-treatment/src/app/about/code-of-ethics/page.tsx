import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CodeOfEthicsPage from "@/views/about/CodeOfEthicsPage";

const fallback: Metadata = {
  title: { absolute: "Code of Ethics | Northbound Treatment" },
  description: "Our clients' best interest comes first — always. Learn about the core values, operating principles, and mission that have guided Northbound Treatment for over 38 years.",
  alternates: { canonical: "/about/code-of-ethics" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about/code-of-ethics", fallback);
}

export default function Page() {
  return <CodeOfEthicsPage />;
}
