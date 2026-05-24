import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ProgramsPage from "@/views/programs/page";

const fallbackMetadata: Metadata = {
  title: "Programs | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs", fallbackMetadata);
}

export default function Page() {
  return <ProgramsPage />;
}
