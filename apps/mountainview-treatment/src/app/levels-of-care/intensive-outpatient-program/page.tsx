import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IopPage from "@/views/iop/IopPage";

const fallbackMetadata: Metadata = {
  title: "Intensive Outpatient Program (IOP) | Mountain View Treatment Seattle",
  description:
    "Mountain View's IOP in Seattle offers 9-12 hours of structured, evidence-based clinical care per week with morning, afternoon, and evening tracks built around your schedule.",
  alternates: { canonical: "/levels-of-care/intensive-outpatient-program/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/levels-of-care/intensive-outpatient-program/",
    fallbackMetadata,
  );
}

export default function Page() {
  return <IopPage />;
}
