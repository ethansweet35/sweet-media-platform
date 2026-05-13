import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { SermorelinPage } from "@/views/sermorelin/page";
const fallback: Metadata = { title: "Sermorelin — Natural GH Production | Get Simple Health", description: "Sermorelin stimulates your pituitary to produce its own growth hormone naturally. Starting at $350/month. Nightly injection. Results in 6–8 weeks.", alternates: { canonical: "/sermorelin" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/sermorelin", fallback); }
export default function Page() { return <SermorelinPage />; }
