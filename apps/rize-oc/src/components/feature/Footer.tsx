import Link from "next/link";
import Image from "next/image";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";

const IMG = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const programs = [
  { label: "Drug & Alcohol Detox",    path: "/drug-alcohol-detox" },
  { label: "PHP",                     path: "/partial-hospitalization-program-orange-county" },
  { label: "IOP",                     path: "/iop-program-orange-county" },
  { label: "Outpatient (OP)",         path: "/outpatient-program" },
  { label: "Virtual Outpatient",      path: "/virtual-outpatient-program" },
];

const conditions = [
  { label: "Anxiety", path: "/mental-health/anxiety" },
  { label: "Depression", path: "/mental-health/depression" },
  { label: "PTSD / Trauma", path: "/mental-health/ptsd" },
  { label: "Alcohol Rehab", path: "/addiction/alcohol" },
  { label: "Dual Diagnosis", path: "/dual-diagnosis" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-8 pt-16 pb-10 text-white">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Image
              src={`${IMG}/rize-logo.png`}
              alt="Rize OC"
              width={120}
              height={42}
              className="h-10 w-auto object-contain brightness-0 invert mb-5"
            />
            <p className="text-sm font-light leading-relaxed text-white/55 max-w-xs">
              A profound sanctuary for mental health &amp; addiction recovery in Orange County, CA.
              Evidence-based. Compassionate. Confidential.
            </p>
            <CallRailPhoneLink className="mt-5 inline-flex items-center gap-2 text-accent hover:text-white transition-colors">
              <i className="ri-phone-line" />
              <span className="text-sm font-medium">{CALLRAIL_PHONE_DISPLAY}</span>
            </CallRailPhoneLink>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-5">Programs</h3>
            <div className="flex flex-col gap-3">
              {programs.map(({ label, path }) => (
                <Link key={path + label} href={path} className="text-sm font-light text-white/60 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-5">Conditions</h3>
            <div className="flex flex-col gap-3">
              {conditions.map(({ label, path }) => (
                <Link key={path + label} href={path} className="text-sm font-light text-white/60 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-5">Contact</h3>
            <div className="flex flex-col gap-3 text-sm font-light text-white/60">
              <p>22792 Centre Dr Suite 104<br />Lake Forest, CA 92630</p>
              <CallRailPhoneLink className="hover:text-white transition-colors">{CALLRAIL_PHONE_DISPLAY}</CallRailPhoneLink>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
            <a
              href="#verify"
              className="mt-6 inline-block rounded-[3px] bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink hover:bg-accent/90 transition-colors"
            >
              Verify Insurance
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 text-[11px] text-white/35 border border-white/8 bg-white/[0.03] rounded-[3px] px-5 py-4 md:flex-row md:items-center md:gap-6">
            <span className="font-medium text-white/50">Certified by the State of California, Department of Health Care Services</span>
            <span className="hidden md:block text-white/15">·</span>
            <span>License&nbsp;#&nbsp;300741AP</span>
            <span className="hidden md:block text-white/15">·</span>
            <span>Expiration Date: 4/30/2027</span>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-white/30">
            <p>© {new Date().getFullYear()} Rize OC. All rights reserved.</p>
            <p>Licensed by DHCS · ASAM Certified · Joint Commission Accredited</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
