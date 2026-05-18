import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WhatWeTreatPage from "@/views/what-we-treat/WhatWeTreatPage";

const fallback: Metadata = {
  title: "What We Treat | Mountain View Treatment Center",
  description:
    "Mountain View Treatment Center specializes in dual diagnosis outpatient care — treating addiction and mental health conditions together in Seattle, WA.",
  alternates: { canonical: "/what-we-treat/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/", fallback);
}

export default function Page() {
  return <WhatWeTreatPage />;
}
