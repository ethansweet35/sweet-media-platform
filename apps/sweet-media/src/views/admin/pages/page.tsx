"use client";

import { AdminTrackedPagesPage } from "@sweetmedia/admin-core";
import Seo from "@/components/feature/Seo";

export default function AdminPagesTrackingPage() {
  return (
    <>
      <Seo title="Pages | Admin" description="Track core pages and SEO metadata" noindex />
      <AdminTrackedPagesPage />
    </>
  );
}
