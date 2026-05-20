import type { Metadata } from "next";
import CaliforniaPhpPage from "@/views/lp/galp/CaliforniaPhpPage";

export const metadata: Metadata = {
  title: "California Mental Health Partial Hospitalization Program | Rize OC",
  description:
    "Adult mental health PHP for California residents. Structured day treatment 5–6 hours daily, in-person in Orange County or virtual statewide. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CaliforniaPhpPage />;
}
