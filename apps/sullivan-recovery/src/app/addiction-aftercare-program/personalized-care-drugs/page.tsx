import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PersonalizedCareDrugsPage from "@/views/personalized-care-drugs/page";

const fallbackMetadata: Metadata = {
  title: "Personalized Care Drugs | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/personalized-care-drugs", fallbackMetadata);
}

export default function Page() {
  return <PersonalizedCareDrugsPage />;
}
