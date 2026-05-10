import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AnthemPage from "@/views/insurance/anthem/AnthemPage";

const fallback: Metadata = {
  title: "Anthem Insurance Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound is an in-network preferred provider with Anthem Blue Cross Blue Shield. Verify your Anthem coverage for detox, residential, PHP, and IOP addiction treatment today.",
  alternates: { canonical: '/insurance/anthem-blue-cross' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/anthem-blue-cross", fallback);
}

export default function Page() {
  return <AnthemPage />;
}
