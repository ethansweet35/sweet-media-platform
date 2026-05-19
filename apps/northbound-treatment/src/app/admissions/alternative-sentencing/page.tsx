import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlternativeSentencingPage from "@/views/admissions/AlternativeSentencingPage";

const fallback: Metadata = {
  title: "Alternative Sentencing",
  description: "Northbound offers court-approved treatment for individuals facing legal consequences due to addiction. Our alternative sentencing program has helped hundreds avoid incarceration through completion of treatment.",
  alternates: { canonical: "/admissions/alternative-sentencing" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/alternative-sentencing", fallback);
}

export default function Page() {
  return <AlternativeSentencingPage />;
}
