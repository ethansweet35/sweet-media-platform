type ServiceChecklistProps = {
  items: readonly string[];
  columns?: 1 | 2;
  variant?: "light" | "dark";
};

export default function ServiceChecklist({ items, columns = 1, variant = "light" }: ServiceChecklistProps) {
  const grid = columns === 2 ? "sm:grid-cols-2" : "";
  const textCls = variant === "dark" ? "text-white/90" : "text-slate-600";
  const iconCls =
    variant === "dark"
      ? "bg-[#166C96]/35 text-[#5eb5e0]"
      : "bg-[#166C96]/10 text-[#166C96]";

  return (
    <ul className={`grid gap-3 ${grid}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 text-[15px] leading-[1.65] ${textCls}`}>
          <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${iconCls}`}>
            <i className="ri-check-line text-sm" aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
