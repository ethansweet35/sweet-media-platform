import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AftercareProgramsPage from "@/views/aftercare-programs/page";

const fallbackMetadata: Metadata = {
  title: "Aftercare Program | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/aftercare-programs", fallbackMetadata);
}

export default function Page() {
  return <AftercareProgramsPage />;
}
