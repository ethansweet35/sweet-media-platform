import Link from "next/link";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "What We Treat", path: "/what-we-treat" },
  { label: "Levels Of Care", path: "/levels-of-care" },
  { label: "Resources", path: "/resources" },
  { label: "Contact Us", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-primary)]/12 bg-[var(--color-primary)] px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Mental Health For Teens</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            Virtual teen mental health care for adolescents ages 12 to 17. We support families across California
            with compassionate, clinically grounded programming.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Navigation
          </h3>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className="text-sm text-white/75 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Care Access
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-white/75">
            <span>Based in San Diego, serving California virtually</span>
            <span>For confidential treatment questions, our admissions team can help.</span>
            <Link href="/contact" className="mt-2 inline-flex text-white hover:text-white/85">
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Mental Health For Teens. All rights reserved.</p>
        <p>Information on this site is educational and not emergency medical care.</p>
      </div>
    </footer>
  );
}
