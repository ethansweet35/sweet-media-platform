import Image from "next/image";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY_PARENS } from "@/lib/callrailPhone";

const LOGO_URL =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos/sr_logo.png";

const EMAIL = "admissions@sullivanrecovery.com";
const ADDRESS = "24731 Via San Fernando, Mission Viejo, CA 92692";

export default function GeneralDetoxFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--sr-moss)] text-white">
      <div className="sr-container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
            <a href="#top" aria-label="Back to top of page">
              <Image
                src={LOGO_URL}
                alt="Sullivan Recovery"
                width={120}
                height={120}
                className="h-20 w-20 object-contain brightness-0 invert"
              />
            </a>
            <p className="max-w-sm text-sm text-white/70" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {ADDRESS}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/80" style={{ fontFamily: "var(--font-dm-sans)" }}>
            <CallRailPhoneLink className="text-lg font-medium text-white hover:text-[var(--sr-sage)]">
              {CALLRAIL_PHONE_DISPLAY_PARENS}
            </CallRailPhoneLink>
            <span>{EMAIL}</span>
          </div>
        </div>
        <p
          className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          © {year} Sullivan Recovery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
