import Link from "next/link";
import Image from "next/image";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";

const conditions = [
  { label: "Anxiety Disorders", path: "/conditions/anxiety" },
  { label: "Depression", path: "/conditions/depression" },
  { label: "Trauma & PTSD", path: "/conditions/trauma-ptsd" },
  { label: "ADHD", path: "/conditions/adhd" },
  { label: "Bipolar Disorder", path: "/conditions/bipolar" },
  { label: "Self-Harm", path: "/conditions/self-harm" },
  { label: "School Avoidance", path: "/conditions/school-avoidance" },
];

const programs = [
  { label: "Virtual IOP for Teens", path: "/virtual-iop-for-teens" },
  { label: "Individual Therapy", path: "/therapy/individual-therapy-for-teens" },
  { label: "Group Therapy", path: "/therapy/group-therapy-with-adolescents" },
  { label: "Family Therapy", path: "/therapy/adolescent-family-therapy" },
  { label: "Online CBT", path: "/online-cognitive-behavioral-therapy" },
  { label: "Insurance Coverage", path: "/insurance" },
];

const company = [
  { label: "About Us", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Admissions", path: "/admissions" },
  { label: "Privacy Policy", path: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "var(--font-montserrat)" }} className="bg-[#000000] text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10 bg-[#83B3DC]/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#83B3DC]">
              Free 30-Minute Consultation
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
              Ready to get your teen the help they need?
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#000000] hover:bg-white/90 transition-colors"
            >
              <i className="ri-phone-fill"></i>
              {PHONE}
            </a>
            <Link
              href="/admissions"
              className="flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/10 transition-colors"
            >
              Get Started Online
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image
              src="https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated/amh-logo-optimized.png"
              alt="Adolescent Mental Health"
              width={140}
              height={65}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-7 text-white/60">
              Specialized virtual mental health programs for teens ages 12–17. Evidence-based care for anxiety, depression, trauma, and more — covered by insurance.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a href={PHONE_HREF} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold">
                <i className="ri-phone-fill text-xs"></i>
                {PHONE}
              </a>
              <a href="mailto:admissions@adolescentmentalhealth.com" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <i className="ri-mail-line text-xs"></i>
                admissions@adolescentmentalhealth.com
              </a>
            </div>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">
              Conditions Treated
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {conditions.map((link) => (
                <Link key={link.path} href={link.path} className="text-sm text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">
              Programs
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {programs.map((link) => (
                <Link key={link.path} href={link.path} className="text-sm text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">
              Company
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {company.map((link) => (
                <Link key={link.path} href={link.path} className="text-sm text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Adolescent Mental Health. All rights reserved.</p>
          <p>If you or your teen is in crisis, call or text <strong className="text-white/70">988</strong> (Suicide &amp; Crisis Lifeline) or <strong className="text-white/70">911</strong>.</p>
        </div>
      </div>
    </footer>
  );
}
