import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { TretinoinPage } from "@/views/tretinoin/page";
const fallback: Metadata = { title: "Tretinoin — Prescription Retinoid for Acne & Anti-Aging | Get Simple Health", description: "FDA-approved prescription tretinoin for acne clearance, fine lines, and hyperpigmentation. The most clinically validated anti-aging topical available. Starting at $49/month.", alternates: { canonical: "/tretinoin" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/tretinoin", fallback); }
export default function Page() { return <TretinoinPage />; }
