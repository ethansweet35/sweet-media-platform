"use client";

export default function WordCountBadge({ words }: { words: number }) {
  const label = words.toLocaleString();
  if (words < 500) {
    return (
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] font-semibold text-red-600">{label}</span>
        <span className="inline-flex items-center self-start rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-red-50 text-red-500">
          Thin
        </span>
      </div>
    );
  }
  if (words < 900) {
    return (
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] font-semibold text-amber-600">{label}</span>
        <span className="inline-flex items-center self-start rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
          Short
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[13px] font-semibold text-emerald-700">{label}</span>
      <span className="inline-flex items-center self-start rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">
        {words >= 1500 ? "Long" : "Good"}
      </span>
    </div>
  );
}
