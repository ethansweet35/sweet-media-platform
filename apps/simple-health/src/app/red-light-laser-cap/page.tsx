import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { RedLightLaserCapPage } from "@/views/red-light-laser-cap/page";
const fallback: Metadata = { title: "Red Light Laser Cap — LLLT Hair Restoration | Get Simple Health", description: "FDA-cleared low-level laser therapy for drug-free hair regrowth. Increases density, reduces inflammation, activates dormant follicles. Starting at $199/month.", alternates: { canonical: "/red-light-laser-cap" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/red-light-laser-cap", fallback); }
export default function Page() { return <RedLightLaserCapPage />; }
