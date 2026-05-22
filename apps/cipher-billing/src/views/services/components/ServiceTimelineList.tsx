type ServiceTimelineListProps = {
  items: readonly string[];
};

/** Vertical timeline — alternates visually from card grids and checklists */
export default function ServiceTimelineList({ items }: ServiceTimelineListProps) {
  return (
    <ol className="relative space-y-0 border-l-2 border-[#166C96]/25 pl-8">
      {items.map((item, i) => (
        <li key={item} className="relative pb-8 last:pb-0">
          <span
            className="absolute -left-[calc(1rem+5px)] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#166C96] text-[11px] font-bold text-white ring-4 ring-[#F5F7FA]"
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-[15px] leading-[1.65] text-slate-700">{item}</p>
        </li>
      ))}
    </ol>
  );
}
