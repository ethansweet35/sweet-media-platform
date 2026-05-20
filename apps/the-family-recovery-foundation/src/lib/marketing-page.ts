import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";

const BRAND = "The Family Recovery Foundation";

export async function marketingMetadata(
  path: string,
  title: string,
  description: string,
): Promise<Metadata> {
  const fallback: Metadata = {
    title: `${title} | ${BRAND}`,
    description,
    alternates: { canonical: path },
  };
  return resolveTrackedPageMetadata(path, fallback);
}
