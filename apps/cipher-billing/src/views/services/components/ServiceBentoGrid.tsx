type ServiceBentoItem = {
  icon: string;
  title: string;
  body: string;
};

type ServiceBentoGridProps = {
  featured: readonly [ServiceBentoItem, ServiceBentoItem];
  compact: readonly ServiceBentoItem[];
};

/** Two hero tiles + compact tile row — typical medical template "services mosaic" */
export default function ServiceBentoGrid({ featured, compact }: ServiceBentoGridProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((item, i) => (
          <article
            key={item.title}
            className={`flex min-h-[200px] flex-col justify-between rounded-2xl p-7 ${
              i === 0 ? "bg-[#101E3F] text-white" : "border border-[#166C96]/25 bg-[#166C96]/5"
            }`}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                i === 0 ? "bg-[#166C96]/30 text-[#5eb5e0]" : "bg-[#166C96]/15 text-[#166C96]"
              }`}
            >
              <i className={`${item.icon} text-xl`} aria-hidden />
            </span>
            <div>
              <h3
                className={`font-[var(--font-heading)] text-xl font-medium leading-snug ${
                  i === 0 ? "text-white" : "text-[#101E3F]"
                }`}
              >
                {item.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-slate-600"}`}>
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {compact.map((item) => (
          <article
            key={item.title}
            className="flex gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/10 text-[#166C96]">
              <i className={`${item.icon} text-lg`} aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="font-[var(--font-heading)] text-sm font-medium leading-snug text-[#101E3F]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
