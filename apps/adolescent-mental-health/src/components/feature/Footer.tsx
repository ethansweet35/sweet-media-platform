import Link from "next/link";
import Image from "next/image";
import { BRAND_LOGO, CONTAINER, SITE } from "@/lib/site";

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
  { icon: "ri-award-line", label: "Licensed Clinicians" },
  { icon: "ri-bank-card-line", label: "Insurance Accepted" },
  { icon: "ri-lock-2-line", label: "Confidential" },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "var(--font-montserrat)" }} className="bg-dark text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="border-b border-white/[0.06] px-6 py-10 lg:px-10">
        <div className={`${CONTAINER} flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between`}>
          <Image
            src={BRAND_LOGO}
            alt="Adolescent Mental Health"
            width={160}
            height={75}
            className="h-10 w-auto brightness-0 invert"
          />
          <div className="flex flex-wrap gap-5">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <i className={`${b.icon} text-xs`} />
                </span>
                <span className="text-xs font-semibold text-white/50">{b.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 lg:text-right">
            <a
              href={SITE.phone.href}
              className="text-base font-bold text-white transition hover:text-accent"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {SITE.phone.display}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-xs text-white/40 transition hover:text-white/70"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="px-6 py-14 lg:px-10">
        <div className={`${CONTAINER} grid gap-10 md:grid-cols-[1.8fr_1fr_1fr_1fr]`}>
          <div>
            <p className="text-sm leading-8 text-white/45">
              Adolescent Mental Health provides evidence-based virtual intensive outpatient programs for teens ages{" "}
              {SITE.ages}. We treat anxiety, depression, trauma, ADHD, and more — all covered by major insurance plans.
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:border-accent/40 hover:text-accent"
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
              Conditions Treated
            </h3>
            <div className="flex flex-col gap-3">
              {conditions.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
                >
                  <span className="h-px w-3 bg-white/20 transition group-hover:w-4 group-hover:bg-accent" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent">Programs</h3>
            <div className="flex flex-col gap-3">
              {programs.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
                >
                  <span className="h-px w-3 bg-white/20 transition group-hover:w-4 group-hover:bg-accent" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent">Company</h3>
            <div className="flex flex-col gap-3">
              {company.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
                >
                  <span className="h-px w-3 bg-white/20 transition group-hover:w-4 group-hover:bg-accent" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-6 py-5 lg:px-10">
        <div className={`${CONTAINER} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            If you or your teen is in crisis, call or text{" "}
            <strong className="font-bold text-white/50">988</strong> (Suicide &amp; Crisis Lifeline) or{" "}
            <strong className="font-bold text-white/50">911</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}
