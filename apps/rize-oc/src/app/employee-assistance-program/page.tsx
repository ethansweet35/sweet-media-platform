import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import EAPPage from "@/views/eap/EAPPage";

const fallbackMetadata: Metadata = {
  title: "Employee Assistance Programs (EAPs) | Rize OC",
  description:
    "Rize OC works with all major EAP providers to help Orange County employees access confidential addiction and mental health treatment. Your employer is never notified. Call (949) 461-2620.",
  alternates: { canonical: "/employee-assistance-program" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/employee-assistance-program", fallbackMetadata);
}

export default EAPPage;
