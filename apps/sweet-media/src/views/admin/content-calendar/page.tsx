"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AdminPageHeader } from "@sweetmedia/admin-core";
import Seo from "@/components/feature/Seo";
import { ADMIN_OCEAN } from "@sweetmedia/admin-core";
import { useBlogQueue } from "@/hooks/useBlogQueue";
import QueueCsvUpload from "@/components/pages/admin/content-calendar/components/QueueCsvUpload";
import QueueTable from "@/components/pages/admin/content-calendar/components/QueueTable";
import QueueCalendarView from "@/components/pages/admin/content-calendar/components/QueueCalendarView";
import { AI_MODELS, DEFAULT_MODEL_ID } from "@sweetmedia/admin-core";

type TabKey = "queue" | "calendar";

export default function AdminContentCalendarPage() {
  const { items, loading, error, createItems, deleteItem, cancelItem, generateNow, refetch } = useBlogQueue();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [tab, setTab] = useState<TabKey>("queue");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [batchModelId, setBatchModelId] = useState(DEFAULT_MODEL_ID);

  const notify = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const stats = useMemo(() => {
    const count = (s: string) => items.filter((i) => i.status === s).length;
    return {
      pending: count("pending"),
      generating: count("generating"),
      draft_ready: count("draft_ready"),
      failed: count("failed"),
    };
  }, [items]);

  return (
    <div className="">
      <Seo title="Content Calendar | Admin" description="Schedule and manage queued blog posts" noindex />

      <AdminPageHeader
        title="Content Calendar"
        subtitle="Schedule and manage upcoming blog posts."
        actions={
          <button
            type="button"
            onClick={() => refetch().then(() => notify("Queue refreshed."))}
            className="rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-black/55 ring-1 ring-black/10 hover:bg-black/[0.03] [font-family:var(--font-outfit-sans),system-ui,sans-serif]"
          >
            Refresh
          </button>
        }
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatChip label="Pending" value={stats.pending} muted="bg-neutral-100 text-neutral-800" />
        <StatChip label="Generating" value={stats.generating} muted="bg-sky-100 text-sky-900" />
        <StatChip label="Draft ready" value={stats.draft_ready} muted="bg-emerald-100 text-emerald-900" />
        <StatChip label="Failed" value={stats.failed} muted="bg-red-50 text-red-900" />
      </div>

      <div className="mb-6 rounded-2xl border border-black/[0.06] bg-white/80 p-6 shadow-sm [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
        <h2 className={`text-lg font-semibold tracking-tight ${"[font-family:var(--font-cormorant-garamond),serif]"}`}>
          Model for queued posts (batch)
        </h2>
        <p className="mt-1 text-sm text-black/55">
          Every row uploaded from CSV below uses this OpenRouter model when the queue processor runs.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:max-w-xl">
          <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/45">AI model</label>
          <select
            value={batchModelId}
            onChange={(e) => setBatchModelId(e.target.value)}
            className="w-full rounded-xl border border-black/[0.1] bg-white px-3 py-2.5 text-sm text-black/85"
          >
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id} title={m.description}>
                {m.displayName}
              </option>
            ))}
          </select>
          <p className="text-xs leading-relaxed text-black/55">
            {AI_MODELS.find((m) => m.id === batchModelId)?.description ??
              "Select a model for posts created from this CSV batch."}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <QueueCsvUpload batchModelId={batchModelId} createItems={createItems} notify={notify} />
      </div>

      <div className="mb-4 flex gap-2 rounded-xl bg-black/[0.03] p-1 ring-1 ring-black/[0.05] [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
        <TabButton active={tab === "queue"} onClick={() => setTab("queue")}>
          Queue table
        </TabButton>
        <TabButton active={tab === "calendar"} onClick={() => setTab("calendar")}>
          Calendar view
        </TabButton>
      </div>

      {tab === "queue" ? (
        <QueueTable
          items={items}
          loading={loading}
          highlightedId={highlightedId}
          onHighlightedConsumed={() => setHighlightedId(null)}
          onDeleteItem={deleteItem}
          onCancelItem={cancelItem}
          onGenerateNow={generateNow}
          notify={notify}
        />
      ) : (
        <QueueCalendarView
          items={items}
          highlightedId={highlightedId}
          onChipSelect={(id) => {
            setHighlightedId(id);
            setTab("queue");
          }}
        />
      )}

      {toast && (
        <div
          className={`fixed bottom-8 right-8 z-[100] rounded-xl px-5 py-3 text-sm shadow-lg [font-family:var(--font-outfit-sans),system-ui,sans-serif] ${
            toast.type === "success" ? "bg-[#faf8f5] text-black/80 ring-1 ring-black/10" : "bg-red-50 text-red-900 ring-1 ring-red-100"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
        active ? "text-white shadow-sm" : "text-black/50 hover:bg-white/40"
      }`}
      style={active ? { backgroundColor: ADMIN_OCEAN } : undefined}
    >
      {children}
    </button>
  );
}

function StatChip({ label, value, muted }: { label: string; value: number; muted: string }) {
  return (
    <div
      className={`rounded-2xl border border-black/[0.06] px-4 py-3 shadow-sm [font-family:var(--font-outfit-sans),system-ui,sans-serif] ${muted}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums [font-family:var(--font-cormorant-garamond),serif]">{value}</div>
    </div>
  );
}
