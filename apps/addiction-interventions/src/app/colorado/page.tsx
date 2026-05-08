import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ColoradoPage from "@/views/colorado/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Colorado | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/colorado", fallbackMetadata);
}

export default function Page() {
  return <ColoradoPage />;
}
