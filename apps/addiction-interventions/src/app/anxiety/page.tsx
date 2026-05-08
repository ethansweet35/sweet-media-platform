import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AnxietyPage from "@/views/anxiety/page";

const fallbackMetadata: Metadata = {
  title: "Anxiety Interventions for Families | Addiction Interventions",
  description:
    "When anxiety takes over a loved one's life, families often feel powerless. Our compassionate interventions help you bridge the gap and connect them with the right level of mental health care.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/anxiety", fallbackMetadata);
}

export default function Page() {
  return <AnxietyPage />;
}
