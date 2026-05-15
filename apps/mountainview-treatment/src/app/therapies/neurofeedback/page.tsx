import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NeurofeedbackPage from "@/views/therapies/NeurofeedbackPage";

const fallbackMetadata: Metadata = {
  title: "Neurofeedback Therapy in Seattle | Mountain View Treatment",
  description: "Drug-free, non-invasive neurofeedback brain training in Seattle for trauma, anxiety, ADHD, depression, and addiction \u2014 delivered by board-certified clinicians.",
  alternates: { canonical: "/therapies/neurofeedback/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/neurofeedback/", fallbackMetadata);
}

export default function Page() {
  return <NeurofeedbackPage />;
}
