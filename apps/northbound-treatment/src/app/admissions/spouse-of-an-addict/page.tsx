import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpouseOfAnAddictPage from "@/views/admissions/SpouseOfAnAddictPage";

const fallback: Metadata = {
  title: "Spouse of an Addict: How to Handle Being Married to a Drug Addict | Northbound Treatment",
  description: "If your spouse is struggling with addiction, you are not alone. Learn how to support your loved one's recovery without enabling — and how Northbound's family services team can help your whole family heal.",
  alternates: { canonical: "/admissions/spouse-of-an-addict" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/spouse-of-an-addict", fallback);
}

export default function Page() {
  return <SpouseOfAnAddictPage />;
}
