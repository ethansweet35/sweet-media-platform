import Link from "next/link";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Resources", path: "/resources" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Northbound Treatment</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            Reusable client website starter. Replace this footer copy with client-specific positioning, trust signals, and conversion messaging.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Navigation
          </h3>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className="text-sm text-white/70 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Contact
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <span>Call anytime</span>
            <a href="mailto:hello@northboundtreatment.com" className="hover:text-white">
              hello@northboundtreatment.com
            </a>
            <Link href="/contact" className="mt-2 inline-flex text-white hover:text-white/80">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Northbound Treatment. All rights reserved.</p>
        <p>Built from the Sweet Media client template.</p>
      </div>
    </footer>
  );
}
