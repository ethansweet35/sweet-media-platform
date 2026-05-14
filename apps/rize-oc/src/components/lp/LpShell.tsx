const PHONE_DISPLAY = "(949) 461-2620";
const PHONE_HREF = "tel:9494612620";

export default function LpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Minimal LP header — logo + phone only, no nav */}
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-[1300px] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="font-[family-name:var(--font-display)] text-xl font-normal tracking-tight text-ink"
              style={{ letterSpacing: "-0.01em" }}
            >
              Rize <em className="italic text-accent">OC</em>
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.28em] text-ink/40 ml-3 mt-0.5">
              Mental Health &amp; Addiction Treatment
            </span>
          </div>

          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 bg-accent px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
          >
            <i className="ri-phone-fill text-sm" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Minimal LP footer — address + legal only */}
      <footer className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-[1300px] px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-ink/50 leading-relaxed">
            <p className="font-medium text-ink/70">Rize OC — Mental Health &amp; Addiction Treatment</p>
            <p>22792 Centre Dr Suite 104, Lake Forest, CA 92630</p>
            <p className="mt-1">
              Certified by the State of California, Department of Health Care Services
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-ink/40">
            <a href="/terms-and-service" className="hover:text-ink/70 transition-colors">
              Terms of Service
            </a>
            <span>·</span>
            <a href="/privacy-policy" className="hover:text-ink/70 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href={PHONE_HREF} className="hover:text-ink/70 transition-colors">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
