import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AddictionTherapiesPage from "@/views/addiction-therapies/page";

const fallbackMetadata: Metadata = {
  title: "Therapies | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction-therapies", fallbackMetadata);
}

export default function Page() {
  return <AddictionTherapiesPage />;
}
