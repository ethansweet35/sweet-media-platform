import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { GhkCuPage } from "@/views/ghk-cu/page";
const fallback: Metadata = { title: "GHK-Cu Copper Peptide — Cellular Repair & Anti-Aging | Get Simple Health", description: "GHK-Cu resets 4,000+ genes to a younger state, promoting collagen production, hair growth, and tissue repair. Starting at $285/month.", alternates: { canonical: "/ghk-cu" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/ghk-cu", fallback); }
export default function Page() { return <GhkCuPage />; }
