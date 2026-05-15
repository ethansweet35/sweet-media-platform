import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PhpPage from "@/views/php/PhpPage";

const fallbackMetadata: Metadata = {
  title:
    "Partial Hospitalization Program (PHP) | Mountain View Treatment Seattle",
  description:
    "Mountain View's PHP in Seattle delivers 25-30 hours of intensive, evidence-based clinical care per week with same-day medical, psychiatric, and dual diagnosis support.",
  alternates: { canonical: "/levels-of-care/partial-hospitalization-program/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/levels-of-care/partial-hospitalization-program/",
    fallbackMetadata,
  );
}

export default function Page() {
  return <PhpPage />;
}
