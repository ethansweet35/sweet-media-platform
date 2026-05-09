import { type Metadata } from "next";
import AdventurePage from "@/views/signature/adventure/AdventurePage";

export const metadata: Metadata = {
  title: "Adventure Therapy Program | Northbound Treatment Services",
  description:
    "Northbound's Adventure Therapy Program takes healing into the world — building resilience, mindfulness, and purpose through nature, art, and experiential learning across Southern California.",
  alternates: { canonical: '/adventure-therapy-program' },
};

export default function Page() {
  return <AdventurePage />;
}
