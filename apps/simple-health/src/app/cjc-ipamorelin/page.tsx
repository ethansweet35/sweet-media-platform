import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CjcIpamorelinPage } from "@/views/cjc-ipamorelin/page";
const fallback: Metadata = { title: "CJC-1295 / Ipamorelin Dual GH Stack | Get Simple Health", description: "Dual-pathway GH amplification — CJC-1295 + Ipamorelin for superior muscle development, fat loss, and anti-aging. Starting at $500/month.", alternates: { canonical: "/cjc-ipamorelin" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/cjc-ipamorelin", fallback); }
export default function Page() { return <CjcIpamorelinPage />; }
