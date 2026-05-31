import CtmFormReactor from "@/components/feature/CtmFormReactor";

export type CtmLeadFormCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** iframe height — default matches homepage compact embed */
  height?: number;
  className?: string;
};

/** Dark frosted hero card wrapping the CTM FormReactor iframe. */
export default function CtmLeadFormCard({
  eyebrow,
  title,
  subtitle,
  height = 290,
  className = "",
}: CtmLeadFormCardProps) {
  return (
    <div
      className={`relative w-full max-w-[400px] overflow-hidden border border-white/10 bg-navy-light/60 p-6 shadow-2xl backdrop-blur-md lg:p-8 ${className}`.trim()}
    >
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-terracotta via-navy to-espresso" />

      <div className="relative z-10">
        <div className="mb-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-terracotta">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white lg:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-xs leading-relaxed text-white/50">{subtitle}</p>
          ) : null}
        </div>

        <CtmFormReactor height={height} title={title} />

        <div className="mt-4 flex items-center justify-center gap-4 pt-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
          <div className="flex items-center gap-1.5">
            <i className="ri-lock-line text-xs" />
            <span className="font-semibold">Confidential</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1.5">
            <i className="ri-shield-check-line text-xs" />
            <span className="font-semibold">HIPAA Secure</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1.5">
            <i className="ri-time-line text-xs" />
            <span className="font-semibold">Instant Response</span>
          </div>
        </div>
      </div>
    </div>
  );
}
