import type { ReactNode } from "react";

type ServiceTopicGridItem = {
  icon: string;
  title: string;
  body: ReactNode;
};

type ServiceTopicGridProps = {
  items: readonly ServiceTopicGridItem[];
  columns?: 2 | 3;
};

export default function ServiceTopicGrid({ items, columns = 2 }: ServiceTopicGridProps) {
  const gridCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${gridCols}`}>
      {items.map((item) => (
        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#166C96]/10 text-[#166C96]">
            <i className={`${item.icon} text-xl`} aria-hidden />
          </span>
          <h3 className="mt-4 font-[var(--font-heading)] text-xl font-medium leading-snug text-[#101E3F]">
            {item.title}
          </h3>
          <div className="mt-3 text-[14px] leading-[1.7] text-slate-600">{item.body}</div>
        </article>
      ))}
    </div>
  );
}
