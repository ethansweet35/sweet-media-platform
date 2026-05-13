import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WhatWeTreatPage from "@/views/what-we-treat/WhatWeTreatPage";

const fallbackMetadata: Metadata = {
  title: "What We Treat | Addiction & Mental Health | Rize OC",
  description:
    "Rize OC treats all substance use disorders and mental health conditions — alcohol, opiates, benzos, meth, cocaine, anxiety, depression, PTSD, bipolar, ADHD, and more. Integrated dual-diagnosis care in Orange County. Call (949) 461-2620.",
  alternates: { canonical: "/what-we-treat" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat", fallbackMetadata);
}

export default WhatWeTreatPage;
