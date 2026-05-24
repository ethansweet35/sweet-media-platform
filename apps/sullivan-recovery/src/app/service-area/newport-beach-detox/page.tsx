import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewportBeachDetoxPage from "@/views/newport-beach-detox/page";

const fallbackMetadata: Metadata = {
  title: "Newport Beach Detox | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/newport-beach-detox", fallbackMetadata);
}

export default function Page() {
  return <NewportBeachDetoxPage />;
}
