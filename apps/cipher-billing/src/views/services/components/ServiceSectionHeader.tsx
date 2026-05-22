type ServiceSectionHeaderProps = {
  eyebrow: string;
  heading: string;
  accent?: string;
  body?: string;
  dark?: boolean;
  centered?: boolean;
};

export default function ServiceSectionHeader({
  eyebrow,
  heading,
  accent,
  body,
  dark = false,
  centered = false,
}: ServiceSectionHeaderProps) {
  const align = centered ? "text-center mx-auto" : "";
  const eyebrowCls = dark ? "text-[#166C96]" : "text-[#166C96]";
  const headingCls = dark ? "text-white" : "text-[#101E3F]";
  const accentCls = dark ? "text-[#5ba3c4]" : "text-[#166C96]";
  const bodyCls = dark ? "text-white/85" : "text-slate-600";

  return (
    <div className={`max-w-3xl ${align}`}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {!centered ? <span className="h-px w-12 shrink-0 bg-[#166C96]" aria-hidden /> : null}
        <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${eyebrowCls}`}>{eyebrow}</p>
        {!centered ? null : <span className="h-px w-12 shrink-0 bg-[#166C96]" aria-hidden />}
      </div>
      <h2
        className={`mt-5 font-[var(--font-heading)] text-3xl font-medium leading-[1.12] md:text-4xl ${headingCls}`}
      >
        {heading}
        {accent ? (
          <>
            {" "}
            <span className={accentCls}>{accent}</span>
          </>
        ) : null}
      </h2>
      {body ? <p className={`mt-4 text-[15px] leading-[1.7] ${bodyCls}`}>{body}</p> : null}
    </div>
  );
}
