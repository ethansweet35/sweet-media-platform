import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CbtDbtPage from "@/views/therapies/CbtDbtPage";

const fallbackMetadata: Metadata = {
  title: "CBT & DBT Therapy in Seattle | Mountain View Treatment",
  description: "Expert Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT) in Seattle for addiction, anxiety, depression, PTSD, and co-occurring disorders.",
  alternates: { canonical: "/therapies/cognitive-dialectical/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/cognitive-dialectical/", fallbackMetadata);
}

export default function Page() {
  return <CbtDbtPage />;
}
