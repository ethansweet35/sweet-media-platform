import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { SkinHairPage } from "@/views/skin-hair/page";

const fallback: Metadata = {
  title: "Skin & Hair Treatments | Get Simple Health",
  description:
    "Physician-prescribed treatments for acne, anti-aging, hair loss, and medical-grade skincare. Isotretinoin, Tretinoin, Finasteride, Minoxidil, and more.",
  alternates: { canonical: "/skin-hair" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/skin-hair", fallback);
}

export default function Page() {
  return <SkinHairPage />;
}
