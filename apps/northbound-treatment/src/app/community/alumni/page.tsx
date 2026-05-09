import type { Metadata } from "next";
import AlumniPage from "@/views/community/alumni/AlumniPage";

export const metadata: Metadata = {
  title: "Alumni Programs & Community | Northbound Treatment Services",
  description:
    "Northbound's Alumni Association connects 500+ clean and sober former clients through weekly meetings, monthly events, sobriety milestone celebrations, and lifelong community support in Orange County, CA.",
};

export default function Page() {
  return <AlumniPage />;
}
