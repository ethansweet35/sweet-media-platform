import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionQuizPage from "@/views/intervention-quiz/page";

const fallbackMetadata: Metadata = {
  title: "Intervention Quiz | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/intervention-quiz", fallbackMetadata);
}

export default function Page() {
  return <InterventionQuizPage />;
}
