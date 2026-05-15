import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelsOfCareIndexPage from "@/views/levels-of-care/LevelsOfCareIndexPage";

const fallbackMetadata: Metadata = {
  title: "Levels of Care | Mountain View Treatment Seattle",
  description:
    "Explore Mountain View Treatment's continuum of care — Partial Hospitalization (PHP), Intensive Outpatient (IOP), and Outpatient (OP) programs in Seattle, Washington.",
  alternates: { canonical: "/levels-of-care/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/levels-of-care/", fallbackMetadata);
}

export default function Page() {
  return <LevelsOfCareIndexPage />;
}
