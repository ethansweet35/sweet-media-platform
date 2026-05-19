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

const trustBadges = [
  { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
  { icon: "ri-award-line",        label: "Licensed Clinicians" },
  { icon: "ri-bank-card-line",    label: "Insurance Accepted" },
  { icon: "ri-lock-2-line",       label: "Confidential" },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "var(--font-montserrat)" }} className="bg-[#0A0F14] text-white">

      {/* Top accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#83B3DC]/40 to-transparent" />

      {/* Brand strip */}
      <div className="border-b border-white/[0.06] px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Image
            src="https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated/amh-logo-optimized.png"
            alt="Adolescent Mental Health"
            width={160}
            height={75}
            className="h-10 w-auto brightness-0 invert"
          />
          <div className="flex flex-wrap gap-5">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#83B3DC]/10 text-[#83B3DC]">
                  <i className={`${b.icon} text-xs`}></i>
                </span>
                <span className="text-xs font-semibold text-white/50">{b.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 lg:text-right">
            <a
              href={PHONE_HREF}
              className="text-base font-bold text-white transition hover:text-[#83B3DC]"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {PHONE}
            </a>
            <a
              href="mailto:admissions@adolescentmentalhealth.com"
              className="text-xs text-white/40 transition hover:text-white/70"
            >
              admissions@adolescentmentalhealth.com
            </a>
          </div>
        </div>
      </div>

      {/* Main link grid */}
      <div className="px-6 py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.8fr_1fr_1fr_1fr]">

          {/* Brand blurb */}
          <div>
            <p className="text-sm leading-8 text-white/45">
              Adolescent Mental Health provides evidence-based virtual intensive outpatient programs for teens ages 12–17. We treat anxiety, depression, trauma, ADHD, and more — all covered by major insurance plans.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: "ri-instagram-line", href: "#" },
                { icon: "ri-facebook-circle-line", href: "#" },
                { icon: "ri-linkedin-box-line", href: "#" },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:border-[#83B3DC]/40 hover:text-[#83B3DC]"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">
              Conditions Treated
            </h3>
            <div className="flex flex-col gap-3">
              {conditions.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
                >
                  <span className="h-px w-3 bg-white/20 transition group-hover:w-4 group-hover:bg-[#83B3DC]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">
              Programs
            </h3>
            <div className="flex flex-col gap-3">
              {programs.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
                >
                  <span className="h-px w-3 bg-white/20 transition group-hover:w-4 group-hover:bg-[#83B3DC]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#83B3DC]">
              Company
            </h3>
            <div className="flex flex-col gap-3">
              {company.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
                >
                  <span className="h-px w-3 bg-white/20 transition group-hover:w-4 group-hover:bg-[#83B3DC]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Adolescent Mental Health. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            If you or your teen is in crisis, call or text{" "}
            <strong className="font-bold text-white/50">988</strong>{" "}
            (Suicide &amp; Crisis Lifeline) or{" "}
            <strong className="font-bold text-white/50">911</strong>.
          </p>
        </div>
      </div>

    </footer>
  );
}
