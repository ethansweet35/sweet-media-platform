import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { SkinCareRoutinePage } from "@/views/skin-care-routine/page";
const fallback: Metadata = { title: "Prescription Skin Care Routine | Get Simple Health", description: "Physician-designed skincare protocol combining prescription actives (tretinoin, hydroquinone, azelaic acid) with medical-grade cleansers, moisturizers, and SPF. Starting at $199/month.", alternates: { canonical: "/skin-care-routine" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/skin-care-routine", fallback); }
export default function Page() { return <SkinCareRoutinePage />; }
