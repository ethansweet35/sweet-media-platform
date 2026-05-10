import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AccreditationPage from "@/views/about/AccreditationPage";

const fallback: Metadata = {
  title: "Accreditation & Recognition | Northbound Treatment",
  description: "Northbound Treatment holds JCAHO accreditation and recognition from the industry's top organizations. Learn about our certifications, awards, and commitment to the highest standard of care.",
  alternates: { canonical: "/about/accreditation-recognition" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about/accreditation-recognition", fallback);
}

export default function Page() {
  return <AccreditationPage />;
}
