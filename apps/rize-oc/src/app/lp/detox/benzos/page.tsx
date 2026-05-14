import type { Metadata } from "next";
import BenzosPage from "@/views/lp/detox/BenzosPage";

export const metadata: Metadata = {
  title: "Medically-Supervised Benzodiazepine Detox | Rize OC",
  description: "Safely manage benzo withdrawal with customized, medically monitored tapering programs. Private, residential care in a comfortable luxury setting. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BenzosPage />;
}
