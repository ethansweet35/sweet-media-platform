import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveReportShare } from "@sweetmedia/admin-core/server";
import { MarketingReportView } from "@sweetmedia/admin-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Client reports must never be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Marketing Report",
};

interface PageProps {
  params: Promise<{ token: string }>;
}

function fmtDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

export default async function ClientReportPage({ params }: PageProps) {
  const { token } = await params;
  const resolved = await resolveReportShare(token);
  if (!resolved) notFound();

  const { payload, label } = resolved;
  const range = `${fmtDate(payload.date_ranges.current.start)} – ${fmtDate(payload.date_ranges.current.end)}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F7FB]">
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-5xl min-w-0 flex-col gap-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
            {label}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight break-words text-[#0A1F44] sm:text-3xl">
            {payload.brand.name} — Marketing Report
          </h1>
          <p className="text-sm text-[#64748B]">
            {range} · last {payload.period_days} days · updated {fmtDate(payload.generated_at)}
          </p>
        </div>
      </header>

      <div className="mx-auto min-w-0 max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <MarketingReportView data={payload} publicMode />
      </div>

      <footer className="border-t border-[#E2E8F0] py-8 text-center text-xs text-[#94A3B8]">
        Live marketing report · figures refresh automatically
      </footer>
    </main>
  );
}
