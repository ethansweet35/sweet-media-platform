const ITEMS = [
  { icon: "ri-group-line", label: "1,500+ Families Helped Nationwide" },
  { icon: "ri-award-line", label: "Joint Commission Accredited" },
  { icon: "ri-time-line", label: "Available 24 / 7 — Crisis Line" },
  { icon: "ri-shield-check-line", label: "100% Confidential" },
  { icon: "ri-map-pin-2-line", label: "All 50 States Covered" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#EFEFEF] bg-white py-5">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 lg:px-10">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8FAC87]/15 text-[#507969]">
              <i className={`${item.icon} text-sm`}></i>
            </span>
            <span className="text-sm font-medium text-[#1A1A17]">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
