import type { ComponentProps } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import {
  CALLRAIL_PHONE_DISPLAY,
  CALLRAIL_PHONE_HREF,
} from "@/lib/callrailPhone";

type CallNowLinkProps = Omit<ComponentProps<"a">, "href" | "children"> & {
  href?: string;
  /** When true, desktop shows "Call Now — {number}" instead of number only */
  withPrefixOnDesktop?: boolean;
  showIcon?: boolean;
};

/**
 * Mobile: "Call Now" (tap-to-call). Desktop: visible number (no native dialer).
 */
export default function CallNowLink({
  href = CALLRAIL_PHONE_HREF,
  withPrefixOnDesktop = false,
  showIcon = true,
  className,
  ...props
}: CallNowLinkProps) {
  const desktopLabel = withPrefixOnDesktop
    ? `Call Now — ${CALLRAIL_PHONE_DISPLAY}`
    : CALLRAIL_PHONE_DISPLAY;

  return (
    <CallRailPhoneLink href={href} className={className} {...props}>
      {showIcon && <i className="ri-phone-fill text-sm" aria-hidden />}
      <span className="md:hidden">Call Now</span>
      <span className="hidden md:inline" suppressHydrationWarning>
        {desktopLabel}
      </span>
    </CallRailPhoneLink>
  );
}
