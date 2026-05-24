import type { ComponentProps } from "react";
import {
  CALLRAIL_PHONE_DISPLAY_PARENS,
  CALLRAIL_PHONE_HREF,
} from "@/lib/callrailPhone";

type CallRailPhoneLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href?: string;
};

/**
 * Phone link safe with CallRail swap.js — suppresses hydration warnings when
 * the script replaces the number on the client after SSR.
 */
export default function CallRailPhoneLink({
  href = CALLRAIL_PHONE_HREF,
  children = CALLRAIL_PHONE_DISPLAY_PARENS,
  ...props
}: CallRailPhoneLinkProps) {
  return (
    <a href={href} suppressHydrationWarning {...props}>
      {children}
    </a>
  );
}
