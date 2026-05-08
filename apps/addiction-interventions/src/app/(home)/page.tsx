import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomePage from "@/views/home/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions | Family & Crisis Intervention Experts",
  description:
    "Compassionate, family-centered addiction and mental health interventions. 1,500+ families helped nationwide. Speak with a certified interventionist 24/7.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return <HomePage />;
}
