"use client";

interface AdminContentFilterPillsProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  label?: (value: T) => string;
}

export default function AdminContentFilterPills<T extends string>({
  value,
  options,
  onChange,
  label = (v) => (v === "all" ? "All" : v.charAt(0).toUpperCase() + v.slice(1)),
}: AdminContentFilterPillsProps<T>) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-xl bg-[#F4F7FB] p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all ${
            value === option
              ? "bg-white text-[#0A1F44] shadow-sm"
              : "text-[#64748B] hover:text-[#334155]"
          }`}
        >
          {label(option)}
        </button>
      ))}
    </div>
  );
}
