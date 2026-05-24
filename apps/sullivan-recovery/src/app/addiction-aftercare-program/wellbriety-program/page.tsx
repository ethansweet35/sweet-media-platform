import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WellbrietyProgramPage from "@/views/wellbriety-program/page";

const fallbackMetadata: Metadata = {
  title: "Wellbriety Program | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/wellbriety-program", fallbackMetadata);
}

export default function Page() {
  return <WellbrietyProgramPage />;
}
