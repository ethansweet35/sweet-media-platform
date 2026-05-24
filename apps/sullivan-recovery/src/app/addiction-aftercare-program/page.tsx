import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AddictionAftercareProgramPage from "@/views/addiction-aftercare-program/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction-aftercare-program", fallbackMetadata);
}

export default function Page() {
  return <AddictionAftercareProgramPage />;
}
